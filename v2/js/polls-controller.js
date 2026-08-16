/*
==================================================
CIVIC HORIZON INDEX V2
POLLS CENTER CONTROLLER
==================================================
*/

import {
    initializePollsNationalPrioritiesController,
    destroyPollsNationalPrioritiesController
} from "./controllers/polls-national-priorities-controller.js";

import {
    initializePollsPresidentialApprovalController,
    destroyPollsPresidentialApprovalController
} from "./controllers/polls-presidential-approval-controller.js";

import {
    initializePollsCommunityController,
    destroyPollsCommunityController
} from "./controllers/polls-community-controller.js";

import {
    subscribeToNationalPrioritySummary
} from "./services/priority-service.js";

import {
    subscribeToSnapshotSummary
} from "./services/snapshot-service.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let pollsControllerInitialized = false;

let unsubscribePrioritySummary = null;
let unsubscribeSnapshotSummary = null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializePollsController() {

    if (pollsControllerInitialized) {
        return;
    }

    pollsControllerInitialized = true;

    initializePollsNationalPrioritiesController();

    initializePollsPresidentialApprovalController();

    initializePollsCommunityController();

    initializePollsHeroData();

}


/*
==================================================
POLLS HERO LIVE DATA
==================================================
*/

function initializePollsHeroData() {

    /*
    ----------------------------------------------
    NATIONAL PRIORITY PARTICIPANTS
    ----------------------------------------------
    */

    unsubscribePrioritySummary =
        subscribeToNationalPrioritySummary(
            summary => {

                const participantCount =
                    Number(
                        summary?.participantCount
                    ) || 0;


                setText(
                    "pollsHeroParticipantCount",
                    formatNumber(
                        participantCount
                    )
                );

            },
            error => {

                console.error(
                    "Polls hero priority summary error:",
                    error
                );


                setText(
                    "pollsHeroParticipantCount",
                    "—"
                );

            }
        );


    /*
    ----------------------------------------------
    ACTIVE COMMUNITY POLLS
    ----------------------------------------------
    */

    unsubscribeSnapshotSummary =
        subscribeToSnapshotSummary(
            summary => {

                const activePollCount =
                    Number(
                        summary?.activePollCount
                    ) || 0;


                setText(
                    "pollsHeroActivePollCount",
                    formatNumber(
                        activePollCount
                    )
                );

            },
            error => {

                console.error(
                    "Polls hero community summary error:",
                    error
                );


                setText(
                    "pollsHeroActivePollCount",
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


    return number.toLocaleString();

}


/*
==================================================
PUBLIC CLEANUP
==================================================
*/

export function destroyPollsController() {

    if (!pollsControllerInitialized) {
        return;
    }


    destroyPollsNationalPrioritiesController();

    destroyPollsPresidentialApprovalController();

    destroyPollsCommunityController();


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

    pollsControllerInitialized = false;

}


/*
==================================================
PAGE CLEANUP
==================================================
*/

window.addEventListener(
    "beforeunload",
    () => {

        destroyPollsController();

    }
);