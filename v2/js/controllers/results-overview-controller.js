/*
==================================================
CIVIC HORIZON INDEX V2
RESULTS OVERVIEW CONTROLLER
==================================================
*/

import {
    subscribeToNationalPrioritySummary
} from "../services/priority-service.js";

import {
    subscribeToSnapshotSummary
} from "../services/snapshot-service.js";

import {
    subscribeToPresidentialApprovalSummary
} from "../services/pulse-service.js";


let resultsOverviewControllerInitialized = false;

let unsubscribePrioritySummary = null;
let unsubscribeSnapshotSummary = null;
let unsubscribePulseSummary = null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeResultsOverviewController() {

    if (resultsOverviewControllerInitialized) {
        return;
    }

    resultsOverviewControllerInitialized = true;

    subscribeToPriorityData();
    subscribeToCommunityData();
    subscribeToPulseData();

}


/*
==================================================
NATIONAL PRIORITY DATA
==================================================
*/

function subscribeToPriorityData() {

    unsubscribePrioritySummary =
        subscribeToNationalPrioritySummary(
            summary => {

                const participantCount =
                    Number(
                        summary?.participantCount
                    ) || 0;

                const topIssue =
                    summary?.topIssue || null;


                setText(
                    "resultsParticipantCount",
                    formatNumber(participantCount)
                );


                setText(
                    "resultsTopPriority",
                    topIssue
                        ? topIssue.name
                        : "No results yet"
                );


                updateTimestamp();

            },
            error => {

                console.error(
                    "Results priority data error:",
                    error
                );

                setText(
                    "resultsParticipantCount",
                    "—"
                );

                setText(
                    "resultsTopPriority",
                    "Unavailable"
                );

            }
        );

}


/*
==================================================
COMMUNITY DATA
==================================================
*/

function subscribeToCommunityData() {

    unsubscribeSnapshotSummary =
        subscribeToSnapshotSummary(
            summary => {

                setText(
                    "resultsActivePollCount",
                    formatNumber(
                        summary?.activePollCount
                    )
                );

                updateTimestamp();

            },
            error => {

                console.error(
                    "Results community data error:",
                    error
                );

                setText(
                    "resultsActivePollCount",
                    "—"
                );

            }
        );

}


/*
==================================================
CIVIC PULSE DATA
==================================================
*/

function subscribeToPulseData() {

    unsubscribePulseSummary =
        subscribeToPresidentialApprovalSummary(
            summary => {

                setText(
                    "resultsPulseResponses",
                    formatNumber(
                        summary?.totalResponses
                    )
                );

                updateTimestamp();

            },
            error => {

                console.error(
                    "Results Civic Pulse data error:",
                    error
                );

                setText(
                    "resultsPulseResponses",
                    "—"
                );

            }
        );

}


/*
==================================================
TIMESTAMP
==================================================
*/

function updateTimestamp() {

    const element =
        document.getElementById(
            "resultsLastUpdated"
        );

    if (!element) {
        return;
    }


    const currentTime =
        new Date().toLocaleTimeString(
            undefined,
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );


    element.textContent =
        `Last updated ${currentTime}`;

}


/*
==================================================
DOM HELPERS
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
        String(value);

}


/*
==================================================
FORMAT HELPERS
==================================================
*/

function formatNumber(
    value
) {

    const number =
        Number(value);

    if (!Number.isFinite(number)) {
        return "0";
    }

    return number.toLocaleString();

}


/*
==================================================
CLEANUP
==================================================
*/

export function destroyResultsOverviewController() {

    if (
        typeof unsubscribePrioritySummary ===
        "function"
    ) {
        unsubscribePrioritySummary();
    }

    if (
        typeof unsubscribeSnapshotSummary ===
        "function"
    ) {
        unsubscribeSnapshotSummary();
    }

    if (
        typeof unsubscribePulseSummary ===
        "function"
    ) {
        unsubscribePulseSummary();
    }

    unsubscribePrioritySummary = null;
    unsubscribeSnapshotSummary = null;
    unsubscribePulseSummary = null;

    resultsOverviewControllerInitialized = false;

}