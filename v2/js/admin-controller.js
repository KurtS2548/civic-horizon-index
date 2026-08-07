/*
==================================================
CIVIC HORIZON INDEX V2
ADMIN CENTER CONTROLLER
==================================================
*/

import {
    initializeAdminOverviewController,
    destroyAdminOverviewController
} from "./controllers/admin-overview-controller.js";

import {
    initializeAdminCommunityPollsController,
    destroyAdminCommunityPollsController
} from "./controllers/admin-community-polls-controller.js";

import {
    initializeAdminPollEditorController,
    destroyAdminPollEditorController
} from "./controllers/admin-poll-editor-controller.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let adminControllerInitialized = false;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeAdminController() {

    if (adminControllerInitialized) {
        return;
    }

    adminControllerInitialized = true;

    initializeAdminOverviewController();

    initializeAdminCommunityPollsController();

    initializeAdminPollEditorController();

}


/*
==================================================
PUBLIC CLEANUP
==================================================
*/

export function destroyAdminController() {

    if (!adminControllerInitialized) {
        return;
    }

    destroyAdminOverviewController();

    destroyAdminCommunityPollsController();

    destroyAdminPollEditorController();

    adminControllerInitialized = false;

}


/*
==================================================
PAGE CLEANUP
==================================================
*/

window.addEventListener(
    "beforeunload",
    () => {

        destroyAdminController();

    }
);