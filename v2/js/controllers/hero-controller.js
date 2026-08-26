/*
==================================================
CIVIC HORIZON INDEX V2
HOMEPAGE HERO CONTROLLER
==================================================
*/

import {
    subscribeToPresidentialApprovalSummary
} from "../services/pulse-service.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let heroControllerInitialized =
    false;

let unsubscribePresidentialApproval =
    null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeHeroController() {

    if (
        heroControllerInitialized
    ) {

        return;

    }


    heroControllerInitialized =
        true;


    unsubscribePresidentialApproval =
        subscribeToPresidentialApprovalSummary(

            summary => {

                renderPresidentialPollSummary(
                    summary
                );

            },

            error => {

                console.error(
                    "Homepage Presidential Poll error:",
                    error
                );


                renderHeroError();

            }

        );

}


/*
==================================================
PRESIDENTIAL POLL SUMMARY
==================================================
*/

function renderPresidentialPollSummary(
    summary
) {

    const approvalPercentage =
        Number(
            summary?.approvalPercentage
        ) || 0;


    const disapprovalPercentage =
        Number(
            summary?.disapprovalPercentage
        ) || 0;


    const totalResponses =
        Number(
            summary?.totalResponses
        ) || 0;


    setText(
        "homePresidentApproval",
        formatPercentage(
            approvalPercentage
        )
    );


    setText(
        "homePresidentDisapproval",
        formatPercentage(
            disapprovalPercentage
        )
    );


    setText(
        "homePresidentResponses",
        formatNumber(
            totalResponses
        )
    );

}


/*
==================================================
ERROR STATE
==================================================
*/

function renderHeroError() {

    setText(
        "homePresidentApproval",
        "—"
    );


    setText(
        "homePresidentDisapproval",
        "—"
    );


    setText(
        "homePresidentResponses",
        "—"
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
        String(
            value
        );

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


    return number
        .toLocaleString();

}


function formatPercentage(
    value
) {

    const percentage =
        Number(
            value
        );


    if (
        !Number.isFinite(
            percentage
        )
    ) {

        return "0.0%";

    }


    return `${percentage.toFixed(1)}%`;

}


/*
==================================================
CLEANUP
==================================================
*/

export function destroyHeroController() {

    if (
        typeof unsubscribePresidentialApproval ===
        "function"
    ) {

        unsubscribePresidentialApproval();

    }


    unsubscribePresidentialApproval =
        null;


    heroControllerInitialized =
        false;

}