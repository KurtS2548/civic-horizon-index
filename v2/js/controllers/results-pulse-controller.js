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
ELEMENT MAP
==================================================
*/

const resultElements = {
    "Strongly Approve": {
        percentId:
            "resultsStronglyApprovePercent",
        barId:
            "resultsStronglyApproveBar"
    },

    "Approve": {
        percentId:
            "resultsApprovePercent",
        barId:
            "resultsApproveBar"
    },

    "Neutral": {
        percentId:
            "resultsNeutralDetailedPercent",
        barId:
            "resultsNeutralBar"
    },

    "Disapprove": {
        percentId:
            "resultsDisapprovePercent",
        barId:
            "resultsDisapproveBar"
    },

    "Strongly Disapprove": {
        percentId:
            "resultsStronglyDisapprovePercent",
        barId:
            "resultsStronglyDisapproveBar"
    }
};


/*
==================================================
CONTROLLER STATE
==================================================
*/

let resultsPulseControllerInitialized = false;

let unsubscribePulseSummary = null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeResultsPulseController() {

    if (resultsPulseControllerInitialized) {
        return;
    }

    resultsPulseControllerInitialized = true;


    unsubscribePulseSummary =
        subscribeToPresidentialApprovalSummary(
            summary => {

                renderPulseSummary(summary);

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

    const results =
        Array.isArray(
            summary?.results
        )
            ? summary.results
            : [];


    setText(
        "resultsPulseTotal",
        formatNumber(totalResponses)
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


    results.forEach(result => {

        const elementMap =
            resultElements[
                result.response
            ];


        if (!elementMap) {
            return;
        }


        const percentage =
            Number(
                result.percentage
            ) || 0;


        setText(
            elementMap.percentId,
            formatPercentage(
                percentage
            )
        );


        setBarWidth(
            elementMap.barId,
            percentage
        );

    });

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


    Object
        .values(
            resultElements
        )
        .forEach(elementMap => {

            setText(
                elementMap.percentId,
                "—"
            );

            setBarWidth(
                elementMap.barId,
                0
            );

        });

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


function setBarWidth(
    elementId,
    percentage
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {
        return;
    }


    const safePercentage =
        Math.max(
            0,
            Math.min(
                100,
                Number(percentage) || 0
            )
        );


    element.style.width =
        `${safePercentage}%`;

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


function formatPercentage(
    value
) {

    const percentage =
        Number(value);


    if (!Number.isFinite(percentage)) {
        return "0.0%";
    }


    return `${percentage.toFixed(1)}%`;

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


    unsubscribePulseSummary = null;

    resultsPulseControllerInitialized = false;

}