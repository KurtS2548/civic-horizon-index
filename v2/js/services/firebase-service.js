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
    ref(database, "prioritySubmissions");

const communitySurveysRef =
    ref(database, "createdSurveys");

const communityVotesRef =
    ref(database, "votes");

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

            const submissions = [];

            snapshot.forEach(childSnapshot => {

                submissions.push({
                    id: childSnapshot.key,
                    ...(childSnapshot.val() || {})
                });

            });

            callback(submissions);

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

            const surveys = [];

            snapshot.forEach(childSnapshot => {

                surveys.push({
                    id: childSnapshot.key,
                    ...(childSnapshot.val() || {})
                });

            });

            callback(surveys);

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

            const votes = [];

            snapshot.forEach(childSnapshot => {

                votes.push({
                    id: childSnapshot.key,
                    ...(childSnapshot.val() || {})
                });

            });

            callback(votes);

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

            const responses = [];

            snapshot.forEach(childSnapshot => {

                responses.push({
                    id: childSnapshot.key,
                    ...(childSnapshot.val() || {})
                });

            });

            callback(responses);

        },
        errorCallback
    );

}


/*
==================================================
PRESIDENTIAL APPROVAL VOTING
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


    if (!validResponses.includes(response)) {

        throw new Error(
            "Invalid presidential approval response."
        );

    }


    const responseReference =
        push(presidentialApprovalRef);


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
        id: responseReference.key,
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
        await get(prioritySubmissionsRef);

    return snapshotToArray(snapshot);

}


export async function getCommunitySurveys() {

    const snapshot =
        await get(communitySurveysRef);

    return snapshotToArray(snapshot);

}


export async function getCommunityVotes() {

    const snapshot =
        await get(communityVotesRef);

    return snapshotToArray(snapshot);

}


export async function getPresidentialApprovalResponses() {

    const snapshot =
        await get(presidentialApprovalRef);

    return snapshotToArray(snapshot);

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
        ref(database, path),
        updates
    );

}


/*
==================================================
UTILITY FUNCTIONS
==================================================
*/

function snapshotToArray(snapshot) {

    const records = [];

    if (!snapshot.exists()) {
        return records;
    }


    snapshot.forEach(childSnapshot => {

        records.push({
            id: childSnapshot.key,
            ...(childSnapshot.val() || {})
        });

    });


    return records;

}