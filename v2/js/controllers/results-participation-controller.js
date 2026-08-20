/*
==================================================
CIVIC HORIZON INDEX V2
RESULTS PARTICIPATION CONTROLLER
==================================================
*/

import {

    subscribeToPrioritySubmissions,
    subscribeToCommunityVotes,
    subscribeToPresidentialApproval,
    subscribeToCountryDirection,
    subscribeToNationalConfidence,
    getCurrentWeeklyVotingPeriod

} from "../services/firebase-service.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let resultsParticipationControllerInitialized =
    false;


const unsubscribeFunctions =
    [];


const participationState = {

    priorityResponses: [],

    communityVotes: [],

    presidentialApproval: [],

    countryDirection: [],

    nationalConfidence: []

};


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeResultsParticipationController() {

    if (
        resultsParticipationControllerInitialized
    ) {

        return;

    }


    resultsParticipationControllerInitialized =
        true;


    initializeParticipationSubscriptions();

    renderParticipationSummary();

}


/*
==================================================
LIVE SUBSCRIPTIONS
==================================================
*/

function initializeParticipationSubscriptions() {

    unsubscribeFunctions.push(

        subscribeToPrioritySubmissions(

            responses => {

                participationState.priorityResponses =
                    normalizeArray(
                        responses
                    );

                renderParticipationSummary();

            },

            error => {

                console.error(
                    "Participation priority responses error:",
                    error
                );

                participationState.priorityResponses =
                    [];

                renderParticipationSummary();

            }

        )

    );


    unsubscribeFunctions.push(

        subscribeToCommunityVotes(

            responses => {

                participationState.communityVotes =
                    normalizeArray(
                        responses
                    );

                renderParticipationSummary();

            },

            error => {

                console.error(
                    "Participation community votes error:",
                    error
                );

                participationState.communityVotes =
                    [];

                renderParticipationSummary();

            }

        )

    );


    unsubscribeFunctions.push(

        subscribeToPresidentialApproval(

            responses => {

                participationState.presidentialApproval =
                    normalizeArray(
                        responses
                    );

                renderParticipationSummary();

            },

            error => {

                console.error(
                    "Participation presidential approval error:",
                    error
                );

                participationState.presidentialApproval =
                    [];

                renderParticipationSummary();

            }

        )

    );


    unsubscribeFunctions.push(

        subscribeToCountryDirection(

            responses => {

                participationState.countryDirection =
                    normalizeArray(
                        responses
                    );

                renderParticipationSummary();

            },

            error => {

                console.error(
                    "Participation country direction error:",
                    error
                );

                participationState.countryDirection =
                    [];

                renderParticipationSummary();

            }

        )

    );


    unsubscribeFunctions.push(

        subscribeToNationalConfidence(

            responses => {

                participationState.nationalConfidence =
                    normalizeArray(
                        responses
                    );

                renderParticipationSummary();

            },

            error => {

                console.error(
                    "Participation national confidence error:",
                    error
                );

                participationState.nationalConfidence =
                    [];

                renderParticipationSummary();

            }

        )

    );

}


/*
==================================================
PARTICIPATION SUMMARY
==================================================
*/

function renderParticipationSummary() {

    const allResponses = [

        ...participationState.priorityResponses,

        ...participationState.communityVotes,

        ...participationState.presidentialApproval,

        ...participationState.countryDirection,

        ...participationState.nationalConfidence

    ];


    const totalResponses =
        allResponses.length;


    setText(
        "resultsTotalResponses",
        formatNumber(
            totalResponses
        )
    );


    const weeklyResponses =
        allResponses.filter(
            record =>
                recordIsFromCurrentWeek(
                    record
                )
        ).length;


    setText(
        "resultsWeeklyResponses",
        formatNumber(
            weeklyResponses
        )
    );


    setText(
        "resultsStatesParticipating",
        "Coming soon"
    );

}


/*
==================================================
CURRENT WEEK CHECK
==================================================
*/

function recordIsFromCurrentWeek(
    record
) {

    const submittedAt =
        record?.submittedAt;


    if (
        typeof submittedAt !==
        "string"
    ) {

        return false;

    }


    const submittedDate =
        new Date(
            submittedAt
        );


    if (
        Number.isNaN(
            submittedDate.getTime()
        )
    ) {

        return false;

    }


    const submittedDateKey =
        getEasternDateKey(
            submittedDate
        );


    const weekStartKey =
        getCurrentWeeklyVotingPeriod();


    const weekEndKey =
        addDaysToDateKey(
            weekStartKey,
            7
        );


    return (
        submittedDateKey >=
            weekStartKey &&
        submittedDateKey <
            weekEndKey
    );

}


/*
==================================================
EASTERN DATE KEY
==================================================
*/

function getEasternDateKey(
    date
) {

    const formatter =
        new Intl.DateTimeFormat(
            "en-CA",
            {

                timeZone:
                    "America/New_York",

                year:
                    "numeric",

                month:
                    "2-digit",

                day:
                    "2-digit"

            }
        );


    const parts =
        formatter.formatToParts(
            date
        );


    const values =
        {};


    parts.forEach(
        part => {

            if (
                part.type !==
                "literal"
            ) {

                values[
                    part.type
                ] =
                    part.value;

            }

        }
    );


    return (
        `${values.year}-` +
        `${values.month}-` +
        `${values.day}`
    );

}


/*
==================================================
DATE KEY HELPER
==================================================
*/

function addDaysToDateKey(
    dateKey,
    numberOfDays
) {

    const [
        year,
        month,
        day
    ] =
        dateKey
            .split("-")
            .map(
                Number
            );


    const date =
        new Date(
            Date.UTC(
                year,
                month - 1,
                day
            )
        );


    date.setUTCDate(
        date.getUTCDate() +
        numberOfDays
    );


    const nextYear =
        date.getUTCFullYear();


    const nextMonth =
        String(
            date.getUTCMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const nextDay =
        String(
            date.getUTCDate()
        ).padStart(
            2,
            "0"
        );


    return (
        `${nextYear}-` +
        `${nextMonth}-` +
        `${nextDay}`
    );

}


/*
==================================================
ARRAY NORMALIZATION
==================================================
*/

function normalizeArray(
    value
) {

    return Array.isArray(
        value
    )
        ? value
        : [];

}


/*
==================================================
DOM HELPER
==================================================
*/

function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        return;

    }


    element.textContent =
        String(
            value
        );

}


/*
==================================================
NUMBER FORMAT
==================================================
*/

function formatNumber(
    value
) {

    const number =
        Number(
            value
        );


    if (
        !Number.isFinite(
            number
        )
    ) {

        return "0";

    }


    return number
        .toLocaleString();

}


/*
==================================================
CLEANUP
==================================================
*/

export function destroyResultsParticipationController() {

    unsubscribeFunctions
        .forEach(
            unsubscribe => {

                if (
                    typeof unsubscribe ===
                    "function"
                ) {

                    unsubscribe();

                }

            }
        );


    unsubscribeFunctions.length =
        0;


    resultsParticipationControllerInitialized =
        false;

}