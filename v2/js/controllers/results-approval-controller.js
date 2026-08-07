/*
==================================================
CIVIC HORIZON INDEX V2
RESULTS APPROVAL CONTROLLER
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

let resultsApprovalControllerInitialized = false;

let unsubscribeApprovalSummary = null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeResultsApprovalController() {

    if (resultsApprovalControllerInitialized) {
        return;
    }

    resultsApprovalControllerInitialized = true;


    unsubscribeApprovalSummary =
        subscribeToPresidentialApprovalSummary(
            summary => {

                renderApprovalSummary(summary);

            },
            error => {

                console.error(
                    "Results approval tracker error:",
                    error
                );

                renderApprovalError();

            }
        );

}


/*
==================================================
MAIN RENDERING
==================================================
*/

function renderApprovalSummary(
    summary
) {

    const totalResponses =
        Number(
            summary?.totalResponses
        ) || 0;

    const approvalCount =
        Number(
            summary?.approvalCount
        ) || 0;

    const disapprovalCount =
        Number(
            summary?.disapprovalCount
        ) || 0;

    const neutralCount =
        getNeutralCount(summary);

    const approvalPercentage =
        Number(
            summary?.approvalPercentage
        ) || 0;

    const disapprovalPercentage =
        Number(
            summary?.disapprovalPercentage
        ) || 0;

    const neutralPercentage =
        Number(
            summary?.neutralPercentage
        ) || 0;

    const netApproval =
        approvalPercentage -
        disapprovalPercentage;


    setText(
        "approvalApprovePercent",
        formatPercentage(
            approvalPercentage
        )
    );

    setText(
        "approvalDisapprovePercent",
        formatPercentage(
            disapprovalPercentage
        )
    );

    setText(
        "approvalNeutralPercent",
        formatPercentage(
            neutralPercentage
        )
    );


    setText(
        "approvalApproveVotes",
        formatVoteCount(
            approvalCount
        )
    );

    setText(
        "approvalDisapproveVotes",
        formatVoteCount(
            disapprovalCount
        )
    );

    setText(
        "approvalNeutralVotes",
        formatVoteCount(
            neutralCount
        )
    );


    setBarWidth(
        "approvalApproveBar",
        approvalPercentage
    );

    setBarWidth(
        "approvalDisapproveBar",
        disapprovalPercentage
    );

    setBarWidth(
        "approvalNeutralBar",
        neutralPercentage
    );


    setText(
        "approvalHeadlinePercent",
        formatPercentage(
            approvalPercentage
        )
    );

    setText(
        "approvalTotalResponses",
        formatNumber(
            totalResponses
        )
    );

    setText(
        "approvalNetScore",
        formatNetApproval(
            netApproval
        )
    );

}


/*
==================================================
NEUTRAL COUNT
==================================================
*/

function getNeutralCount(
    summary
) {

    const results =
        Array.isArray(
            summary?.results
        )
            ? summary.results
            : [];


    const neutralResult =
        results.find(
            result => {

                return (
                    result?.response ===
                    "Neutral"
                );

            }
        );


    return Number(
        neutralResult?.count
    ) || 0;

}


/*
==================================================
ERROR STATE
==================================================
*/

function renderApprovalError() {

    setText(
        "approvalApprovePercent",
        "—"
    );

    setText(
        "approvalDisapprovePercent",
        "—"
    );

    setText(
        "approvalNeutralPercent",
        "—"
    );

    setText(
        "approvalApproveVotes",
        "Unavailable"
    );

    setText(
        "approvalDisapproveVotes",
        "Unavailable"
    );

    setText(
        "approvalNeutralVotes",
        "Unavailable"
    );

    setText(
        "approvalHeadlinePercent",
        "—"
    );

    setText(
        "approvalTotalResponses",
        "—"
    );

    setText(
        "approvalNetScore",
        "—"
    );


    setBarWidth(
        "approvalApproveBar",
        0
    );

    setBarWidth(
        "approvalDisapproveBar",
        0
    );

    setBarWidth(
        "approvalNeutralBar",
        0
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


function formatVoteCount(
    value
) {

    const count =
        Number(value) || 0;


    return `${formatNumber(count)} ${
        count === 1
            ? "vote"
            : "votes"
    }`;

}


function formatNetApproval(
    value
) {

    const score =
        Number(value);


    if (!Number.isFinite(score)) {
        return "—";
    }


    const rounded =
        score.toFixed(1);


    if (score > 0) {
        return `+${rounded}`;
    }


    return rounded;

}


/*
==================================================
CLEANUP
==================================================
*/

export function destroyResultsApprovalController() {

    if (
        typeof unsubscribeApprovalSummary ===
        "function"
    ) {

        unsubscribeApprovalSummary();

    }


    unsubscribeApprovalSummary = null;

    resultsApprovalControllerInitialized = false;

}