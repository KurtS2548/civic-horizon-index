/*
==================================================
CIVIC HORIZON INDEX V2
RESULTS CENTER CONTROLLER
==================================================
*/

import {
    initializeResultsOverviewController,
    destroyResultsOverviewController
} from "./controllers/results-overview-controller.js";

import {
    initializeResultsPrioritiesController,
    destroyResultsPrioritiesController
} from "./controllers/results-priorities-controller.js";

import {
    initializeResultsPulseController,
    destroyResultsPulseController
} from "./controllers/results-pulse-controller.js";

import {
    initializeResultsApprovalController,
    destroyResultsApprovalController
} from "./controllers/results-approval-controller.js";

import {
    initializeResultsMapController,
    destroyResultsMapController
} from "./controllers/results-map-controller.js";

import {
    initializeResultsCommunityController,
    destroyResultsCommunityController
} from "./controllers/results-community-controller.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let resultsControllerInitialized = false;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeResultsController() {

    if (resultsControllerInitialized) {
        return;
    }

    resultsControllerInitialized = true;

    initializeResultsOverviewController();

    initializeResultsPrioritiesController();

    initializeResultsPulseController();

    initializeResultsApprovalController();

    initializeResultsMapController();

    initializeResultsCommunityController();

}


/*
==================================================
PUBLIC CLEANUP
==================================================
*/

export function destroyResultsController() {

    if (!resultsControllerInitialized) {
        return;
    }

    destroyResultsOverviewController();

    destroyResultsPrioritiesController();

    destroyResultsPulseController();

    destroyResultsApprovalController();

    destroyResultsMapController();

    destroyResultsCommunityController();

    resultsControllerInitialized = false;

}


/*
==================================================
PAGE CLEANUP
==================================================
*/

window.addEventListener(
    "beforeunload",
    () => {

        destroyResultsController();

    }
);