/*
==================================================
CIVIC HORIZON INDEX V2
CONGRESSIONAL APPROVAL SERVICE
==================================================

Monthly congressional approval voting.

Security structure:

1. Private monthly UID-based vote lock
2. Anonymous public result
3. Public result must match the private lock

If the public result fails after the private lock
is created, the service can automatically repair it.
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
    onValue,
    push

} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/*
==================================================
MONTHLY PERIOD
==================================================
*/

import {

    getCurrentVotingPeriod,
    getCurrentVotingPeriodLabel

} from "./firebase-service.js";


/*
==================================================
VALID RESPONSES
==================================================
*/

const validApprovalResponses = [

    "Strongly Approve",
    "Approve",
    "Neutral",
    "Disapprove",
    "Strongly Disapprove"

];


/*
==================================================
VERIFIED USER
==================================================
*/

function getVerifiedCurrentUser() {

    const user =
        auth.currentUser;


    if (!user) {

        throw new Error(
            "You must sign in before participating."
        );

    }


    if (!user.emailVerified) {

        throw new Error(
            "Please verify your email before participating."
        );

    }


    return user;

}


/*
==================================================
MEMBER ID
==================================================
*/

function normalizeMemberId(
    memberId
) {

    const cleaned =
        String(
            memberId || ""
        )
            .trim()
            .toLowerCase();


    if (
        !/^[a-z0-9-]+$/.test(
            cleaned
        )
    ) {

        throw new Error(
            "A valid congressional member ID is required."
        );

    }


    return cleaned;

}


/*
==================================================
SEAT KEY
==================================================
*/

function normalizeSeatKey(
    seatKey
) {

    const cleaned =
        String(
            seatKey || ""
        )
            .trim()
            .toLowerCase();


    if (
        !/^[a-z0-9-]+$/.test(
            cleaned
        )
    ) {

        throw new Error(
            "A valid congressional seat ID is required."
        );

    }


    return cleaned;

}


/*
==================================================
STATE CODE
==================================================
*/

function normalizeStateCode(
    stateCode
) {

    const cleaned =
        String(
            stateCode || ""
        )
            .trim()
            .toUpperCase();


    if (
        !/^[A-Z]{2}$/.test(
            cleaned
        )
    ) {

        throw new Error(
            "A valid state code is required."
        );

    }


    return cleaned;

}


/*
==================================================
DISTRICT
==================================================
*/

function normalizeDistrict(
    value
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return null;

    }


    const cleaned =
        String(
            value
        ).trim();


    if (
        cleaned.length === 0 ||
        cleaned.length > 20
    ) {

        throw new Error(
            "A valid congressional district is required."
        );

    }


    return cleaned;

}


/*
==================================================
APPROVAL RESPONSE
==================================================
*/

function normalizeApprovalResponse(
    response
) {

    const cleaned =
        String(
            response || ""
        ).trim();


    if (
        !validApprovalResponses.includes(
            cleaned
        )
    ) {

        throw new Error(
            "Invalid congressional approval response."
        );

    }


    return cleaned;

}


/*
==================================================
PRIVATE MONTHLY VOTE REFERENCE
==================================================
*/

function getParticipantVoteReference(
    memberId,
    userId = ""
) {

    const user =
        auth.currentUser;


    const uid =
        userId ||
        user?.uid ||
        "";


    if (!uid) {

        throw new Error(
            "A signed-in participant is required."
        );

    }


    const votingPeriod =
        getCurrentVotingPeriod();


    const normalizedMemberId =
        normalizeMemberId(
            memberId
        );


    return ref(
        database,
        `congressionalApprovalVotes/${votingPeriod}/${normalizedMemberId}/${uid}`
    );

}


/*
==================================================
PUBLIC RESULTS PATH
==================================================
*/

function getPublicResultPath(
    memberId,
    votingPeriod
) {

    const normalizedMemberId =
        normalizeMemberId(
            memberId
        );


    return (
        `congressionalApproval/` +
        `${normalizedMemberId}/responses/` +
        `${votingPeriod}`
    );

}


/*
==================================================
PUBLIC RESULT REFERENCE
==================================================
*/

function getPublicResultReference(
    memberId,
    votingPeriod,
    responseId
) {

    return ref(
        database,
        `${getPublicResultPath(
            memberId,
            votingPeriod
        )}/${responseId}`
    );

}


/*
==================================================
CREATE PUBLIC RESPONSE ID
==================================================
*/

function createPublicResponseId(
    memberId,
    votingPeriod
) {

    const temporaryReference =
        push(
            ref(
                database,
                getPublicResultPath(
                    memberId,
                    votingPeriod
                )
            )
        );


    const responseId =
        temporaryReference.key;


    if (!responseId) {

        throw new Error(
            "A congressional approval response ID could not be created."
        );

    }


    return responseId;

}


/*
==================================================
CREATE PUBLIC RECORD FROM PRIVATE RECORD
==================================================
*/

function createPublicRecordFromPrivate(
    privateRecord
) {

    const publicRecord = {

        memberId:
            privateRecord.memberId,

        seatKey:
            privateRecord.seatKey,

        stateCode:
            privateRecord.stateCode,

        chamber:
            privateRecord.chamber,

        response:
            privateRecord.response,

        submittedAt:
            privateRecord.submittedAt,

        votingPeriod:
            privateRecord.votingPeriod

    };


    if (
        privateRecord.district
    ) {

        publicRecord.district =
            privateRecord.district;

    }


    return publicRecord;

}


/*
==================================================
REPAIR PUBLIC RESULT
==================================================

If the private monthly lock exists but its anonymous
public result is missing, recreate the public result.

This protects against a connection failure between
the two writes.
==================================================
*/

async function repairPublicResultIfNeeded(
    privateRecord
) {

    if (
        !privateRecord ||
        !privateRecord.memberId ||
        !privateRecord.votingPeriod ||
        !privateRecord.publicResponseId
    ) {

        return;

    }


    try {

        const publicReference =
            getPublicResultReference(
                privateRecord.memberId,
                privateRecord.votingPeriod,
                privateRecord.publicResponseId
            );


        const publicSnapshot =
            await get(
                publicReference
            );


        if (
            publicSnapshot.exists()
        ) {

            return;

        }


        const publicRecord =
            createPublicRecordFromPrivate(
                privateRecord
            );


        await set(
            publicReference,
            publicRecord
        );

    } catch (error) {

        console.error(
            "Congressional approval public-result repair failed:",
            error
        );

    }

}


/*
==================================================
HAS VOTED THIS MONTH
==================================================
*/

export async function hasVotedForMemberThisMonth(
    memberId
) {

    const user =
        auth.currentUser;


    if (!user) {

        return false;

    }


    const participantReference =
        getParticipantVoteReference(
            memberId,
            user.uid
        );


    const snapshot =
        await get(
            participantReference
        );


    if (
        snapshot.exists()
    ) {

        await repairPublicResultIfNeeded(
            snapshot.val()
        );


        return true;

    }


    return false;

}


/*
==================================================
GET MY CURRENT VOTE
==================================================
*/

export async function getMyCongressionalApprovalVote(
    memberId
) {

    const user =
        auth.currentUser;


    if (!user) {

        return null;

    }


    const votingPeriod =
        getCurrentVotingPeriod();


    const participantReference =
        getParticipantVoteReference(
            memberId,
            user.uid
        );


    const snapshot =
        await get(
            participantReference
        );


    if (
        !snapshot.exists()
    ) {

        return null;

    }


    const record =
        snapshot.val();


    await repairPublicResultIfNeeded(
        record
    );


    return {

        votingPeriod,

        ...record

    };

}


/*
==================================================
MONTHLY ELIGIBILITY
==================================================
*/

export async function getCongressionalApprovalStatus(
    memberId
) {

    const user =
        auth.currentUser;


    const votingPeriod =
        getCurrentVotingPeriod();


    const votingPeriodLabel =
        getCurrentVotingPeriodLabel();


    if (!user) {

        return {

            eligible: false,

            reason:
                "signedOut",

            alreadyParticipated:
                false,

            votingPeriod,

            votingPeriodLabel

        };

    }


    if (
        !user.emailVerified
    ) {

        return {

            eligible: false,

            reason:
                "emailNotVerified",

            alreadyParticipated:
                false,

            votingPeriod,

            votingPeriodLabel

        };

    }


    const participantReference =
        getParticipantVoteReference(
            memberId,
            user.uid
        );


    const snapshot =
        await get(
            participantReference
        );


    if (
        snapshot.exists()
    ) {

        await repairPublicResultIfNeeded(
            snapshot.val()
        );


        return {

            eligible: false,

            reason:
                "alreadyParticipatedThisMonth",

            alreadyParticipated:
                true,

            votingPeriod,

            votingPeriodLabel

        };

    }


    return {

        eligible: true,

        reason:
            "eligible",

        alreadyParticipated:
            false,

        votingPeriod,

        votingPeriodLabel

    };

}


/*
==================================================
SUBMIT CONGRESSIONAL APPROVAL
==================================================
*/

export async function submitCongressionalApproval(
    member,
    response
) {

    const user =
        getVerifiedCurrentUser();


    if (
        !member ||
        typeof member !==
            "object"
    ) {

        throw new Error(
            "Congressional member information is required."
        );

    }


    const memberId =
        normalizeMemberId(
            member.id
        );


    const seatKey =
        normalizeSeatKey(
            member.seatKey
        );


    const stateCode =
        normalizeStateCode(
            member.stateCode
        );


    const district =
        normalizeDistrict(
            member.district
        );


    const approvalResponse =
        normalizeApprovalResponse(
            response
        );


    const chamber =
        member.chamber ===
            "senate" ||
        member.chamber ===
            "house"
            ? member.chamber
            : "";


    if (!chamber) {

        throw new Error(
            "A valid congressional chamber is required."
        );

    }


    if (
        chamber ===
            "senate" &&
        district !==
            null
    ) {

        throw new Error(
            "Senate approval records cannot contain a congressional district."
        );

    }


    if (
        chamber ===
            "house" &&
        district ===
            null
    ) {

        throw new Error(
            "House approval records require a congressional district."
        );

    }


    const votingPeriod =
        getCurrentVotingPeriod();


    const participantReference =
        getParticipantVoteReference(
            memberId,
            user.uid
        );


    /*
    ----------------------------------------------
    DUPLICATE CHECK
    ----------------------------------------------
    */

    const existingSnapshot =
        await get(
            participantReference
        );


    if (
        existingSnapshot.exists()
    ) {

        await repairPublicResultIfNeeded(
            existingSnapshot.val()
        );


        const error =
            new Error(
                `You have already rated this member in ${getCurrentVotingPeriodLabel()}. Voting will reopen automatically next month.`
            );


        error.code =
            "already-participated-this-month";


        throw error;

    }


    const submittedAt =
        new Date()
            .toISOString();


    const publicResponseId =
        createPublicResponseId(
            memberId,
            votingPeriod
        );


    /*
    ----------------------------------------------
    PRIVATE MONTHLY RECORD
    ----------------------------------------------
    */

    const privateRecord = {

        memberId,

        seatKey,

        stateCode,

        chamber,

        response:
            approvalResponse,

        submittedAt,

        votingPeriod,

        publicResponseId

    };


    if (
        district !==
        null
    ) {

        privateRecord.district =
            district;

    }


    /*
    ----------------------------------------------
    PUBLIC ANONYMOUS RECORD
    ----------------------------------------------
    */

    const publicRecord =
        createPublicRecordFromPrivate(
            privateRecord
        );


    /*
    ----------------------------------------------
    STEP 1

    Create the private monthly lock first.

    Firebase rules prevent this record from being
    overwritten during the same month.
    ----------------------------------------------
    */

    await set(
        participantReference,
        privateRecord
    );


    /*
    ----------------------------------------------
    STEP 2

    Now create the anonymous public result.

    The public Firebase rule can verify the private
    lock because it already exists.
    ----------------------------------------------
    */

    const publicReference =
        getPublicResultReference(
            memberId,
            votingPeriod,
            publicResponseId
        );


    try {

        await set(
            publicReference,
            publicRecord
        );

    } catch (error) {

        console.error(
            "Congressional approval public result could not be saved:",
            error
        );


        /*
        Try one immediate repair before reporting
        an error to the participant.
        */

        await repairPublicResultIfNeeded(
            privateRecord
        );


        const repairedSnapshot =
            await get(
                publicReference
            );


        if (
            !repairedSnapshot.exists()
        ) {

            throw new Error(
                "Your monthly rating was secured, but the public result could not finish syncing. Refresh the page and it will try again automatically."
            );

        }

    }


    return {

        id:
            publicResponseId,

        memberId,

        seatKey,

        stateCode,

        chamber,

        district,

        response:
            approvalResponse,

        submittedAt,

        votingPeriod

    };

}


/*
==================================================
SUBSCRIBE TO CURRENT MONTH RESULTS
==================================================
*/

export function subscribeToCongressionalApproval(
    memberId,
    callback,
    errorCallback = console.error
) {

    const votingPeriod =
        getCurrentVotingPeriod();


    const resultsReference =
        ref(
            database,
            getPublicResultPath(
                memberId,
                votingPeriod
            )
        );


    return onValue(

        resultsReference,

        snapshot => {

            const responses =
                snapshot.exists()
                    ? Object.entries(
                        snapshot.val()
                    )
                        .map(
                            ([id, value]) => ({

                                id,

                                ...value

                            })
                        )
                    : [];


            callback(
                createApprovalSummary(
                    responses
                )
            );

        },

        errorCallback

    );

}


/*
==================================================
APPROVAL SUMMARY
==================================================
*/

function createApprovalSummary(
    responses
) {

    const safeResponses =
        Array.isArray(
            responses
        )
            ? responses
            : [];


    const totalResponses =
        safeResponses.length;


    const counts = {

        "Strongly Approve": 0,

        "Approve": 0,

        "Neutral": 0,

        "Disapprove": 0,

        "Strongly Disapprove": 0

    };


    safeResponses.forEach(
        record => {

            const response =
                record?.response;


            if (
                Object.prototype
                    .hasOwnProperty
                    .call(
                        counts,
                        response
                    )
            ) {

                counts[
                    response
                ] +=
                    1;

            }

        }
    );


    const approvalCount =
        counts[
            "Strongly Approve"
        ] +
        counts[
            "Approve"
        ];


    const neutralCount =
        counts[
            "Neutral"
        ];


    const disapprovalCount =
        counts[
            "Disapprove"
        ] +
        counts[
            "Strongly Disapprove"
        ];


    return {

        totalResponses,

        approvalCount,

        neutralCount,

        disapprovalCount,

        approvalPercentage:
            calculatePercentage(
                approvalCount,
                totalResponses
            ),

        neutralPercentage:
            calculatePercentage(
                neutralCount,
                totalResponses
            ),

        disapprovalPercentage:
            calculatePercentage(
                disapprovalCount,
                totalResponses
            ),

        results:
            validApprovalResponses
                .map(
                    response => ({

                        response,

                        count:
                            counts[
                                response
                            ],

                        percentage:
                            calculatePercentage(
                                counts[
                                    response
                                ],
                                totalResponses
                            )

                    })
                )

    };

}


/*
==================================================
PERCENTAGE
==================================================
*/

function calculatePercentage(
    count,
    total
) {

    if (
        total <=
        0
    ) {

        return 0;

    }


    return (
        count /
        total
    ) * 100;

}