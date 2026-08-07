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


/*
==================================================
CONTROLLER STATE
==================================================
*/

let pollsControllerInitialized = false;


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