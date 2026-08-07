/*
==================================================
CIVIC HORIZON INDEX V2
SHARED FIREBASE SERVICE
==================================================
*/

import {
    database
} from "../../../js/firebase.js";

import {
    ref,
    onValue,
    push,
    set,
    get,
    update
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/*
==================================================
DATABASE REFERENCES
==================================================
*/

const prioritySubmissionsRef =
    ref(
        database,
        "prioritySubmissions"
    );

const communitySurveysRef =
    ref(
        database,
        "createdSurveys"
    );

const communityVotesRef =
    ref(
        database,
        "votes"
    );

const presidentialApprovalRef =
    ref(
        database,
        "civicPulse/presidentialApproval/responses"
    );


/*
==================================================
LIVE DATA SUBSCRIPTIONS
==================================================
*/

export function subscribeToPrioritySubmissions(
    callback,
    errorCallback = console.error
) {

    return onValue(
        prioritySubmissionsRef,
        snapshot => {

            callback(
                snapshotToArray(snapshot)
            );

        },
        errorCallback
    );

}


export function subscribeToCommunitySurveys(
    callback,
    errorCallback = console.error
) {

    return onValue(
        communitySurveysRef,
        snapshot => {

            callback(
                snapshotToArray(snapshot)
            );

        },
        errorCallback
    );

}


export function subscribeToCommunityVotes(
    callback,
    errorCallback = console.error
) {

    return onValue(
        communityVotesRef,
        snapshot => {

            callback(
                snapshotToArray(snapshot)
            );

        },
        errorCallback
    );

}


export function subscribeToPresidentialApproval(
    callback,
    errorCallback = console.error
) {

    return onValue(
        presidentialApprovalRef,
        snapshot => {

            callback(
                snapshotToArray(snapshot)
            );

        },
        errorCallback
    );

}


/*
==================================================
NATIONAL PRIORITIES SUBMISSION
==================================================
*/

export async function submitPrioritySubmission(
    ratings,
    additionalData = {}
) {

    if (
        !ratings ||
        typeof ratings !== "object"
    ) {

        throw new Error(
            "National priority ratings are required."
        );

    }


    const submissionReference =
        push(
            prioritySubmissionsRef
        );


    const submissionData = {

        ratings,

        submittedAt:
            new Date().toISOString(),

        survey:
            "nationalPriorities",

        surveyVersion:
            "2.0",

        ...additionalData

    };


    await set(
        submissionReference,
        submissionData
    );


    return {

        id:
            submissionReference.key,

        ...submissionData

    };

}


/*
==================================================
COMMUNITY POLL SUBMISSION
==================================================
*/

export async function submitCommunityVote(
    surveyId,
    choice
) {

    if (
        !surveyId ||
        typeof surveyId !== "string"
    ) {

        throw new Error(
            "A valid community poll is required."
        );

    }


    if (
        !choice ||
        typeof choice !== "string"
    ) {

        throw new Error(
            "A valid poll response is required."
        );

    }


    const voteReference =
        push(
            communityVotesRef
        );


    const voteData = {

        surveyId:
            surveyId.trim(),

        choice:
            choice.trim(),

        submittedAt:
            new Date().toISOString(),

        source:
            "v2PollsCenter"

    };


    await set(
        voteReference,
        voteData
    );


    return {

        id:
            voteReference.key,

        ...voteData

    };

}


/*
==================================================
PRESIDENTIAL APPROVAL SUBMISSION
==================================================
*/

export async function submitPresidentialApproval(
    response
) {

    const validResponses = [
        "Strongly Approve",
        "Approve",
        "Neutral",
        "Disapprove",
        "Strongly Disapprove"
    ];


    if (
        !validResponses.includes(
            response
        )
    ) {

        throw new Error(
            "Invalid presidential approval response."
        );

    }


    const responseReference =
        push(
            presidentialApprovalRef
        );


    const responseData = {

        response,

        submittedAt:
            new Date().toISOString(),

        tracker:
            "presidentialApproval",

        trackerVersion:
            "1.0"

    };


    await set(
        responseReference,
        responseData
    );


    return {

        id:
            responseReference.key,

        ...responseData

    };

}


/*
==================================================
ONE-TIME READ HELPERS
==================================================
*/

export async function getPrioritySubmissions() {

    const snapshot =
        await get(
            prioritySubmissionsRef
        );


    return snapshotToArray(
        snapshot
    );

}


export async function getCommunitySurveys() {

    const snapshot =
        await get(
            communitySurveysRef
        );


    return snapshotToArray(
        snapshot
    );

}


export async function getCommunityVotes() {

    const snapshot =
        await get(
            communityVotesRef
        );


    return snapshotToArray(
        snapshot
    );

}


export async function getPresidentialApprovalResponses() {

    const snapshot =
        await get(
            presidentialApprovalRef
        );


    return snapshotToArray(
        snapshot
    );

}


/*
==================================================
GENERAL DATABASE HELPERS
==================================================
*/

export async function updateDatabasePath(
    path,
    updates
) {

    if (
        !path ||
        typeof path !== "string"
    ) {

        throw new Error(
            "A valid Firebase database path is required."
        );

    }


    if (
        !updates ||
        typeof updates !== "object"
    ) {

        throw new Error(
            "Valid update data is required."
        );

    }


    await update(
        ref(
            database,
            path
        ),
        updates
    );

}


/*
==================================================
UTILITY FUNCTIONS
==================================================
*/

function snapshotToArray(
    snapshot
) {

    const records = [];


    if (
        !snapshot ||
        !snapshot.exists()
    ) {

        return records;

    }


    snapshot.forEach(
        childSnapshot => {

            const value =
                childSnapshot.val();


            records.push({

                id:
                    childSnapshot.key,

                ...(value || {})

            });

        }
    );


    return records;

}