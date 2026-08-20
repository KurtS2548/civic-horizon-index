/*
==================================================
CIVIC HORIZON INDEX V2
RESULTS CENTER CONTROLLER
==================================================
*/


/*
==================================================
CONTROLLER STATE
==================================================
*/

let resultsControllerInitialized =
    false;

const loadedControllers =
    [];


/*
==================================================
SAFE CONTROLLER LOADER
==================================================
*/

async function loadController(
    name,
    modulePath,
    initializeName,
    destroyName
) {

    try {

        const module =
            await import(
                modulePath
            );


        const initializeFunction =
            module[
                initializeName
            ];


        const destroyFunction =
            module[
                destroyName
            ];


        if (
            typeof initializeFunction !==
            "function"
        ) {

            throw new Error(
                `${initializeName} was not found in ${modulePath}`
            );

        }


        initializeFunction();


        loadedControllers.push({
            name,
            destroyFunction
        });

    } catch (error) {

        console.error(
            `${name} could not initialize:`,
            error
        );

    }

}


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export async function initializeResultsController() {

    if (
        resultsControllerInitialized
    ) {

        return;

    }


    resultsControllerInitialized =
        true;


    /*
    ----------------------------------------------
    RESULTS OVERVIEW
    ----------------------------------------------
    */

    await loadController(

        "Results Overview",

        "./controllers/results-overview-controller.js",

        "initializeResultsOverviewController",

        "destroyResultsOverviewController"

    );


    /*
    ----------------------------------------------
    NATIONAL PRIORITIES
    ----------------------------------------------
    */

    await loadController(

        "National Priorities",

        "./controllers/results-priorities-controller.js",

        "initializeResultsPrioritiesController",

        "destroyResultsPrioritiesController"

    );


    /*
    ----------------------------------------------
    PRESIDENTIAL APPROVAL
    ----------------------------------------------
    */

    await loadController(

        "Presidential Approval",

        "./controllers/results-pulse-controller.js",

        "initializeResultsPulseController",

        "destroyResultsPulseController"

    );


    /*
    ----------------------------------------------
    PARTICIPATION ACROSS AMERICA
    ----------------------------------------------
    */

    await loadController(

        "Participation Across America",

        "./controllers/results-participation-controller.js",

        "initializeResultsParticipationController",

        "destroyResultsParticipationController"

    );


    /*
    ----------------------------------------------
    COMMUNITY RESULTS
    ----------------------------------------------
    */

    await loadController(

        "Community Results",

        "./controllers/results-community-controller.js",

        "initializeResultsCommunityController",

        "destroyResultsCommunityController"

    );

}


/*
==================================================
PUBLIC CLEANUP
==================================================
*/

export function destroyResultsController() {

    loadedControllers
        .forEach(
            controller => {

                try {

                    if (
                        typeof controller
                            .destroyFunction ===
                        "function"
                    ) {

                        controller
                            .destroyFunction();

                    }

                } catch (error) {

                    console.error(
                        `${controller.name} cleanup failed:`,
                        error
                    );

                }

            }
        );


    loadedControllers.length =
        0;


    resultsControllerInitialized =
        false;

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