/*
==================================================
CIVIC HORIZON INDEX V2
SNAPSHOT CONTROLLER
==================================================
*/

import {
    subscribeToNationalPrioritySummary
} from "../services/priority-service.js";

import {
    subscribeToSnapshotSummary
} from "../services/snapshot-service.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let snapshotControllerInitialized = false;

let unsubscribePrioritySummary = null;
let unsubscribeSnapshotSummary = null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeSnapshotController() {

    if (snapshotControllerInitialized) {
        return;
    }

    snapshotControllerInitialized = true;

    subscribeToPriorityData();
    subscribeToCommunityData();

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

                renderPrioritySnapshot(summary);

            },
            error => {

                console.error(
                    "Snapshot priority data error:",
                    error
                );

                setText(
                    "snapshotParticipants",
                    "—"
                );

                setText(
                    "snapshotTopPriority",
                    "Unavailable"
                );

            }
        );

}


function renderPrioritySnapshot(summary) {

    const participantCount =
        Number(
            summary?.participantCount
        ) || 0;

    const topIssue =
        summary?.topIssue || null;


    setText(
        "snapshotParticipants",
        formatNumber(participantCount)
    );


    setText(
        "snapshotTopPriority",
        topIssue
            ? topIssue.name
            : "No results yet"
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
                    "snapshotActivePolls",
                    formatNumber(
                        summary?.activePollCount
                    )
                );

                setText(
                    "snapshotCommunityVotes",
                    formatNumber(
                        summary?.communityVoteCount
                    )
                );

            },
            error => {

                console.error(
                    "Snapshot community data error:",
                    error
                );

                setText(
                    "snapshotActivePolls",
                    "—"
                );

                setText(
                    "snapshotCommunityVotes",
                    "—"
                );

            }
        );

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

function formatNumber(value) {

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

export function destroySnapshotController() {

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


    unsubscribePrioritySummary = null;
    unsubscribeSnapshotSummary = null;

    snapshotControllerInitialized = false;

}