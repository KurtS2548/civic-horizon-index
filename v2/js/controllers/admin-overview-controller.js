/*
==================================================
CIVIC HORIZON INDEX V2
ADMIN OVERVIEW CONTROLLER
==================================================
*/

import {
    subscribeToSnapshotSummary
} from "../services/snapshot-service.js";

import {
    subscribeToNationalPrioritySummary
} from "../services/priority-service.js";

import {
    subscribeToPresidentialApprovalSummary
} from "../services/pulse-service.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let controllerInitialized = false;

let unsubscribeSnapshotSummary = null;
let unsubscribePrioritySummary = null;
let unsubscribeApprovalSummary = null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeAdminOverviewController() {

    if (controllerInitialized) {
        return;
    }

    controllerInitialized = true;

    subscribeToCommunityData();
    subscribeToPriorityData();
    subscribeToApprovalData();

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
                    "adminActivePollCount",
                    formatNumber(
                        summary?.activePollCount
                    )
                );

                setText(
                    "adminCommunityVoteCount",
                    formatNumber(
                        summary?.communityVoteCount
                    )
                );

            },
            error => {

                console.error(
                    "Admin community overview error:",
                    error
                );

                setText(
                    "adminActivePollCount",
                    "—"
                );

                setText(
                    "adminCommunityVoteCount",
                    "—"
                );

            }
        );

}


/*
==================================================
NATIONAL PRIORITIES DATA
==================================================
*/

function subscribeToPriorityData() {

    unsubscribePrioritySummary =
        subscribeToNationalPrioritySummary(
            summary => {

                setText(
                    "adminPriorityParticipantCount",
                    formatNumber(
                        summary?.participantCount
                    )
                );

            },
            error => {

                console.error(
                    "Admin priority overview error:",
                    error
                );

                setText(
                    "adminPriorityParticipantCount",
                    "—"
                );

            }
        );

}


/*
==================================================
PRESIDENTIAL APPROVAL DATA
==================================================
*/

function subscribeToApprovalData() {

    unsubscribeApprovalSummary =
        subscribeToPresidentialApprovalSummary(
            summary => {

                setText(
                    "adminApprovalResponseCount",
                    formatNumber(
                        summary?.totalResponses
                    )
                );

            },
            error => {

                console.error(
                    "Admin approval overview error:",
                    error
                );

                setText(
                    "adminApprovalResponseCount",
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

export function destroyAdminOverviewController() {

    if (
        typeof unsubscribeSnapshotSummary ===
        "function"
    ) {
        unsubscribeSnapshotSummary();
    }

    if (
        typeof unsubscribePrioritySummary ===
        "function"
    ) {
        unsubscribePrioritySummary();
    }

    if (
        typeof unsubscribeApprovalSummary ===
        "function"
    ) {
        unsubscribeApprovalSummary();
    }

    unsubscribeSnapshotSummary = null;
    unsubscribePrioritySummary = null;
    unsubscribeApprovalSummary = null;

    controllerInitialized = false;

}