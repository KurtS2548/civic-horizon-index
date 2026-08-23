/*
==================================================
CIVIC HORIZON INDEX V2
MAYOR APPROVAL SERVICE
==================================================

Mayor approval cadence:

- Monthly
- One rating per verified participant
- Per mayor
- Per voting month

Eligibility:

- Participant must be signed in
- Email must be verified
- Participant municipality must be confirmed
- Participant municipality GEOID must match the mayor
- Firebase security rules enforce the same rule

Public results contain no UID.
Private monthly locks contain the UID.
==================================================
*/


/*
==================================================
FIREBASE
==================================================
*/

import {

    auth,
    database

} from "../../../js/firebase.js";


import {

    ref,
    get,
    set,
    push,
    onValue

} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/*
==================================================
PARTICIPANT JURISDICTION
==================================================
*/

import {

    getCurrentParticipantJurisdiction

} from "./participant-jurisdiction-service.js";


/*
==================================================
RESPONSES
==================================================
*/

const allowedResponses = [

    "Strongly Approve",
    "Approve",
    "Neutral",
    "Disapprove",
    "Strongly Disapprove"

];


/*
==================================================
GET CURRENT MONTH
==================================================
*/

export function getMayorVotingPeriod(
    date =
        new Date()
) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    return (
        `${year}-${month}`
    );

}


/*
==================================================
MONTH LABEL
==================================================
*/

export function getMayorVotingPeriodLabel(
    date =
        new Date()
) {

    return date.toLocaleDateString(
        "en-US",
        {

            month:
                "long",

            year:
                "numeric"

        }
    );

}


/*
==================================================
STATUS
==================================================
*/

export async function getMayorApprovalStatus(
    mayor
) {

    const user =
        auth.currentUser;


    if (!user) {

        return {

            eligible:
                false,

            reason:
                "signedOut",

            votingPeriod:
                getMayorVotingPeriod(),

            votingPeriodLabel:
                getMayorVotingPeriodLabel()

        };

    }


    if (
        !user.emailVerified
    ) {

        return {

            eligible:
                false,

            reason:
                "emailNotVerified",

            votingPeriod:
                getMayorVotingPeriod(),

            votingPeriodLabel:
                getMayorVotingPeriodLabel()

        };

    }


    if (
        !mayor ||
        mayor.officeType !==
            "mayor"
    ) {

        return {

            eligible:
                false,

            reason:
                "invalidMayor",

            votingPeriod:
                getMayorVotingPeriod(),

            votingPeriodLabel:
                getMayorVotingPeriodLabel()

        };

    }


    const mayorMunicipalityGeoid =
        normalizeMunicipalityGeoid(
            mayor.municipalityGeoid ||
            mayor.jurisdiction
                ?.municipalityGeoid
        );


    if (
        !mayorMunicipalityGeoid
    ) {

        return {

            eligible:
                false,

            reason:
                "mayorMunicipalityUnverified",

            votingPeriod:
                getMayorVotingPeriod(),

            votingPeriodLabel:
                getMayorVotingPeriodLabel()

        };

    }


    const participant =
        await getCurrentParticipantJurisdiction();


    const participantMunicipalityGeoid =
        normalizeMunicipalityGeoid(
            participant
                ?.municipalityGeoid
        );


    if (
        !participant
            ?.eligibility
            ?.municipality ||
        !participantMunicipalityGeoid ||
        participant.stateCode !==
            mayor.stateCode ||
        participantMunicipalityGeoid !==
            mayorMunicipalityGeoid
    ) {

        return {

            eligible:
                false,

            reason:
                "outsideJurisdiction",

            votingPeriod:
                getMayorVotingPeriod(),

            votingPeriodLabel:
                getMayorVotingPeriodLabel()

        };

    }


    const period =
        getMayorVotingPeriod();


    const voteReference =
        getMayorVoteReference(
            period,
            mayor.id,
            user.uid
        );


    const snapshot =
        await get(
            voteReference
        );


    if (
        snapshot.exists()
    ) {

        return {

            eligible:
                false,

            reason:
                "alreadyParticipatedThisMonth",

            votingPeriod:
                period,

            votingPeriodLabel:
                getMayorVotingPeriodLabel()

        };

    }


    return {

        eligible:
            true,

        reason:
            "eligible",

        votingPeriod:
            period,

        votingPeriodLabel:
            getMayorVotingPeriodLabel()

    };

}


/*
==================================================
MY VOTE
==================================================
*/

export async function getMyMayorApprovalVote(
    mayorId
) {

    const user =
        auth.currentUser;


    if (!user) {

        return null;

    }


    const period =
        getMayorVotingPeriod();


    const snapshot =
        await get(
            getMayorVoteReference(
                period,
                mayorId,
                user.uid
            )
        );


    if (
        !snapshot.exists()
    ) {

        return null;

    }


    return snapshot.val();

}


/*
==================================================
SUBMIT
==================================================
*/

export async function submitMayorApproval(
    mayor,
    response
) {

    const user =
        auth.currentUser;


    if (!user) {

        throw createMayorError(
            "signed-out",
            "Sign in before submitting a Mayor rating."
        );

    }


    if (
        !user.emailVerified
    ) {

        throw createMayorError(
            "email-not-verified",
            "Verify your email before participating."
        );

    }


    if (
        !mayor ||
        mayor.officeType !==
            "mayor"
    ) {

        throw createMayorError(
            "invalid-mayor",
            "A valid mayor is required."
        );

    }


    if (
        !allowedResponses.includes(
            response
        )
    ) {

        throw createMayorError(
            "invalid-response",
            "Choose a valid job-performance rating."
        );

    }


    const mayorMunicipalityGeoid =
        normalizeMunicipalityGeoid(
            mayor.municipalityGeoid ||
            mayor.jurisdiction
                ?.municipalityGeoid
        );


    if (
        !mayorMunicipalityGeoid
    ) {

        throw createMayorError(
            "mayor-municipality-unverified",
            "This mayor's municipality could not be securely verified."
        );

    }


    const participant =
        await getCurrentParticipantJurisdiction();


    const participantMunicipalityGeoid =
        normalizeMunicipalityGeoid(
            participant
                ?.municipalityGeoid
        );


    if (
        !participant
            ?.eligibility
            ?.municipality ||
        !participantMunicipalityGeoid ||
        participant.stateCode !==
            mayor.stateCode ||
        participantMunicipalityGeoid !==
            mayorMunicipalityGeoid
    ) {

        throw createMayorError(
            "outside-jurisdiction",
            "Mayor voting is limited to residents of this municipality."
        );

    }


    const period =
        getMayorVotingPeriod();


    const privateVoteReference =
        getMayorVoteReference(
            period,
            mayor.id,
            user.uid
        );


    const existingSnapshot =
        await get(
            privateVoteReference
        );


    if (
        existingSnapshot.exists()
    ) {

        throw createMayorError(
            "already-participated-this-month",
            "You have already rated this mayor this month."
        );

    }


    const publicResponsesReference =
        ref(
            database,
            `mayorApproval/${mayor.id}/responses/${period}`
        );


    const publicResponseReference =
        push(
            publicResponsesReference
        );


    const publicResponseId =
        publicResponseReference.key;


    if (
        !publicResponseId
    ) {

        throw createMayorError(
            "response-id-failed",
            "Your rating could not be prepared."
        );

    }


    const submittedAt =
        new Date()
            .toISOString();


    const privateVote = {

        mayorId:
            mayor.id,

        seatKey:
            mayor.seatKey,

        stateCode:
            mayor.stateCode,

        municipalityGeoid:
            mayorMunicipalityGeoid,

        response,

        submittedAt,

        votingPeriod:
            period,

        publicResponseId

    };


    const publicVote = {

        mayorId:
            mayor.id,

        seatKey:
            mayor.seatKey,

        stateCode:
            mayor.stateCode,

        municipalityGeoid:
            mayorMunicipalityGeoid,

        response,

        submittedAt,

        votingPeriod:
            period

    };


    /*
    ----------------------------------------------
    PRIVATE LOCK FIRST

    Firebase rules require the private monthly lock
    before the anonymous public response is accepted.
    ----------------------------------------------
    */

    await set(
        privateVoteReference,
        privateVote
    );


    try {

        await set(
            publicResponseReference,
            publicVote
        );

    } catch (error) {

        console.error(
            "Mayor public response failed:",
            error
        );


        throw createMayorError(
            "public-write-failed",
            "Your Mayor rating could not be completed."
        );

    }


    return {

        mayorId:
            mayor.id,

        response,

        votingPeriod:
            period,

        submittedAt

    };

}


/*
==================================================
LIVE RESULTS
==================================================
*/

export function subscribeToMayorApproval(
    mayorId,
    callback,
    errorCallback
) {

    const period =
        getMayorVotingPeriod();


    const responsesReference =
        ref(
            database,
            `mayorApproval/${mayorId}/responses/${period}`
        );


    return onValue(

        responsesReference,

        snapshot => {

            const responses =
                [];


            snapshot.forEach(
                childSnapshot => {

                    responses.push(
                        childSnapshot.val()
                    );

                }
            );


            callback(
                summarizeMayorApproval(
                    responses
                )
            );

        },

        error => {

            if (
                typeof errorCallback ===
                "function"
            ) {

                errorCallback(
                    error
                );

            }

        }

    );

}


/*
==================================================
SUMMARY
==================================================
*/

function summarizeMayorApproval(
    responses
) {

    let totalResponses =
        0;


    let approveResponses =
        0;


    responses.forEach(
        item => {

            const response =
                item?.response;


            if (
                !allowedResponses.includes(
                    response
                )
            ) {

                return;

            }


            totalResponses +=
                1;


            if (
                response ===
                    "Strongly Approve" ||
                response ===
                    "Approve"
            ) {

                approveResponses +=
                    1;

            }

        }
    );


    const approvalPercentage =
        totalResponses >
        0
            ? (
                approveResponses /
                totalResponses
            ) *
                100
            : 0;


    return {

        totalResponses,

        approveResponses,

        approvalPercentage,

        votingPeriod:
            getMayorVotingPeriod()

    };

}


/*
==================================================
PRIVATE VOTE REFERENCE
==================================================
*/

function getMayorVoteReference(
    period,
    mayorId,
    uid
) {

    return ref(
        database,
        `monthlyMayorVotes/${period}/${mayorId}/${uid}`
    );

}


/*
==================================================
MUNICIPALITY GEOID
==================================================
*/

function normalizeMunicipalityGeoid(
    value
) {

    const geoid =
        String(
            value || ""
        ).trim();


    if (
        !/^\d{10}$/.test(
            geoid
        )
    ) {

        return "";

    }


    return geoid;

}


/*
==================================================
ERROR
==================================================
*/

function createMayorError(
    code,
    message
) {

    const error =
        new Error(
            message
        );


    error.code =
        code;


    return error;

}