/*
==================================================
CIVIC HORIZON INDEX V2
RESULTS PULSE CONTROLLER
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

let resultsPulseControllerInitialized =
    false;

let unsubscribePulseSummary =
    null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeResultsPulseController() {

    if (
        resultsPulseControllerInitialized
    ) {

        return;

    }


    resultsPulseControllerInitialized =
        true;


    unsubscribePulseSummary =
        subscribeToPresidentialApprovalSummary(

            summary => {

                renderPulseSummary(
                    summary
                );

            },

            error => {

                console.error(
                    "Results Civic Pulse error:",
                    error
                );


                renderPulseError();

            }

        );

}


/*
==================================================
SUMMARY RENDERING
==================================================
*/

function renderPulseSummary(
    summary
) {

    const totalResponses =
        Number(
            summary?.totalResponses
        ) || 0;


    const approvalPercentage =
        Number(
            summary?.approvalPercentage
        ) || 0;


    const neutralPercentage =
        Number(
            summary?.neutralPercentage
        ) || 0;


    const disapprovalPercentage =
        Number(
            summary?.disapprovalPercentage
        ) || 0;


    setText(
        "resultsPulseTotal",
        formatNumber(
            totalResponses
        )
    );


    setText(
        "resultsApprovalPercent",
        formatPercentage(
            approvalPercentage
        )
    );


    setText(
        "resultsNeutralPercent",
        formatPercentage(
            neutralPercentage
        )
    );


    setText(
        "resultsDisapprovalPercent",
        formatPercentage(
            disapprovalPercentage
        )
    );

}


/*
==================================================
ERROR STATE
==================================================
*/

function renderPulseError() {

    setText(
        "resultsPulseTotal",
        "—"
    );


    setText(
        "resultsApprovalPercent",
        "—"
    );


    setText(
        "resultsNeutralPercent",
        "—"
    );


    setText(
        "resultsDisapprovalPercent",
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


    return (
        `${percentage.toFixed(
            1
        )}%`
    );

}


/*
==================================================
CLEANUP
==================================================
*/

export function destroyResultsPulseController() {

    if (
        typeof unsubscribePulseSummary ===
        "function"
    ) {

        unsubscribePulseSummary();

    }


    unsubscribePulseSummary =
        null;


    resultsPulseControllerInitialized =
        false;

}