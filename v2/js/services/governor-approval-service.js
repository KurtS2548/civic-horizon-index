/*
==================================================
CIVIC HORIZON INDEX V2
GOVERNOR APPROVAL SERVICE
==================================================

Governor approval cadence:

- Weekly
- One rating per verified participant
- Per governor
- Per voting week

Eligibility:

- Participant must be signed in
- Email must be verified
- Participant ZIP must resolve to the governor's state
- Firebase security rules will enforce the same rule

Public results contain no UID.
Private weekly locks contain the UID.
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
GET CURRENT WEEK
==================================================
*/

export function getGovernorVotingPeriod(
    date =
        new Date()
) {

    const workingDate =
        new Date(
            Date.UTC(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            )
        );


    const dayNumber =
        workingDate.getUTCDay() ||
        7;


    workingDate.setUTCDate(
        workingDate.getUTCDate() +
        4 -
        dayNumber
    );


    const yearStart =
        new Date(
            Date.UTC(
                workingDate.getUTCFullYear(),
                0,
                1
            )
        );


    const weekNumber =
        Math.ceil(
            (
                (
                    workingDate -
                    yearStart
                ) /
                86400000 +
                1
            ) /
            7
        );


    return (
        `${workingDate.getUTCFullYear()}-W${String(
            weekNumber
        ).padStart(
            2,
            "0"
        )}`
    );

}


/*
==================================================
WEEK LABEL
==================================================
*/

export function getGovernorVotingPeriodLabel(
    date =
        new Date()
) {

    const period =
        getGovernorVotingPeriod(
            date
        );


    return (
        `week ${period}`
    );

}


/*
==================================================
STATUS
==================================================
*/

export async function getGovernorApprovalStatus(
    governor
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
                getGovernorVotingPeriod(),

            votingPeriodLabel:
                getGovernorVotingPeriodLabel()

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
                getGovernorVotingPeriod(),

            votingPeriodLabel:
                getGovernorVotingPeriodLabel()

        };

    }


    const participant =
        await getCurrentParticipantJurisdiction();


    if (
        !participant
            ?.eligibility
            ?.state ||
        participant.stateCode !==
            governor.stateCode
    ) {

        return {

            eligible:
                false,

            reason:
                "outsideJurisdiction",

            votingPeriod:
                getGovernorVotingPeriod(),

            votingPeriodLabel:
                getGovernorVotingPeriodLabel()

        };

    }


    const period =
        getGovernorVotingPeriod();


    const voteReference =
        getGovernorVoteReference(
            period,
            governor.id,
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
                "alreadyParticipatedThisWeek",

            votingPeriod:
                period,

            votingPeriodLabel:
                getGovernorVotingPeriodLabel()

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
            getGovernorVotingPeriodLabel()

    };

}


/*
==================================================
MY VOTE
==================================================
*/

export async function getMyGovernorApprovalVote(
    governorId
) {

    const user =
        auth.currentUser;


    if (!user) {

        return null;

    }


    const period =
        getGovernorVotingPeriod();


    const snapshot =
        await get(
            getGovernorVoteReference(
                period,
                governorId,
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

export async function submitGovernorApproval(
    governor,
    response
) {

    const user =
        auth.currentUser;


    if (!user) {

        throw createGovernorError(
            "signed-out",
            "Sign in before submitting a Governor rating."
        );

    }


    if (
        !user.emailVerified
    ) {

        throw createGovernorError(
            "email-not-verified",
            "Verify your email before participating."
        );

    }


    if (
        !governor ||
        governor.officeType !==
            "governor"
    ) {

        throw createGovernorError(
            "invalid-governor",
            "A valid governor is required."
        );

    }


    if (
        !allowedResponses.includes(
            response
        )
    ) {

        throw createGovernorError(
            "invalid-response",
            "Choose a valid job-performance rating."
        );

    }


    const participant =
        await getCurrentParticipantJurisdiction();


    if (
        !participant
            ?.eligibility
            ?.state ||
        participant.stateCode !==
            governor.stateCode
    ) {

        throw createGovernorError(
            "outside-jurisdiction",
            "Governor voting is limited to residents of this state."
        );

    }


    const period =
        getGovernorVotingPeriod();


    const privateVoteReference =
        getGovernorVoteReference(
            period,
            governor.id,
            user.uid
        );


    const existingSnapshot =
        await get(
            privateVoteReference
        );


    if (
        existingSnapshot.exists()
    ) {

        throw createGovernorError(
            "already-participated-this-week",
            "You have already rated this governor this week."
        );

    }


    const publicResponsesReference =
        ref(
            database,
            `governorApproval/${governor.id}/responses/${period}`
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

        throw createGovernorError(
            "response-id-failed",
            "Your rating could not be prepared."
        );

    }


    const submittedAt =
        new Date()
            .toISOString();


    const privateVote = {

        governorId:
            governor.id,

        seatKey:
            governor.seatKey,

        stateCode:
            governor.stateCode,

        response,

        submittedAt,

        votingPeriod:
            period,

        publicResponseId

    };


    const publicVote = {

        governorId:
            governor.id,

        seatKey:
            governor.seatKey,

        stateCode:
            governor.stateCode,

        response,

        submittedAt,

        votingPeriod:
            period

    };


    /*
    ----------------------------------------------
    PRIVATE LOCK FIRST

    Firebase rules will require the private lock
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
            "Governor public response failed:",
            error
        );


        throw createGovernorError(
            "public-write-failed",
            "Your Governor rating could not be completed."
        );

    }


    return {

        governorId:
            governor.id,

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

export function subscribeToGovernorApproval(
    governorId,
    callback,
    errorCallback
) {

    const period =
        getGovernorVotingPeriod();


    const responsesReference =
        ref(
            database,
            `governorApproval/${governorId}/responses/${period}`
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
                summarizeGovernorApproval(
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

function summarizeGovernorApproval(
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
            getGovernorVotingPeriod()

    };

}


/*
==================================================
PRIVATE VOTE REFERENCE
==================================================
*/

function getGovernorVoteReference(
    period,
    governorId,
    uid
) {

    return ref(
        database,
        `weeklyGovernorVotes/${period}/${governorId}/${uid}`
    );

}


/*
==================================================
ERROR
==================================================
*/

function createGovernorError(
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