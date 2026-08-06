/*
==================================================
CIVIC HORIZON INDEX V2
HOMEPAGE CONTROLLER
==================================================
*/

import {
    initializeHeroController,
    destroyHeroController
} from "./controllers/hero-controller.js";

import {
    initializeSnapshotController,
    destroySnapshotController
} from "./controllers/snapshot-controller.js";

import {
    initializeNationalPulseController,
    destroyNationalPulseController
} from "./controllers/national-pulse-controller.js";

import {
    initializeNationalPrioritiesController,
    destroyNationalPrioritiesController
} from "./controllers/national-priorities-controller.js";

import {
    initializeCommunityPollsController,
    destroyCommunityPollsController
} from "./controllers/community-polls-controller.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let homepageControllerInitialized = false;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeHomepageController() {

    if (homepageControllerInitialized) {
        return;
    }

    homepageControllerInitialized = true;

    initializeHeroController();

    initializeSnapshotController();

    initializeNationalPulseController();

    initializeNationalPrioritiesController();

    initializeCommunityPollsController();

}


/*
==================================================
PUBLIC CLEANUP
==================================================
*/

export function destroyHomepageController() {

    if (!homepageControllerInitialized) {
        return;
    }

    destroyHeroController();

    destroySnapshotController();

    destroyNationalPulseController();

    destroyNationalPrioritiesController();

    destroyCommunityPollsController();

    homepageControllerInitialized = false;

}


/*
==================================================
PAGE CLEANUP
==================================================
*/

window.addEventListener(
    "beforeunload",
    () => {

        destroyHomepageController();

    }
);