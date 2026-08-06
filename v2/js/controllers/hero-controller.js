/*
==================================================
CIVIC HORIZON INDEX V2
HERO CONTROLLER
==================================================
*/

import {
    subscribeToNationalPrioritySummary
} from "../services/priority-service.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let heroControllerInitialized = false;

let unsubscribePrioritySummary = null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeHeroController() {

    if (heroControllerInitialized) {
        return;
    }

    heroControllerInitialized = true;


    unsubscribePrioritySummary =
        subscribeToNationalPrioritySummary(
            summary => {

                renderHeroSummary(summary);

            },
            error => {

                console.error(
                    "Hero priority data error:",
                    error
                );

                renderHeroError();

            }
        );

}


/*
==================================================
HERO RENDERING
==================================================
*/

function renderHeroSummary(summary) {

    const participantCount =
        Number(summary?.participantCount) || 0;

    const topIssue =
        summary?.topIssue || null;


    setText(
        "participantCount",
        formatNumber(participantCount)
    );


    if (!topIssue) {

        setText(
            "topIssue",
            "Waiting for responses"
        );

        setText(
            "topScore",
            "0.0 / 10"
        );

        return;

    }


    setText(
        "topIssue",
        topIssue.name
    );

    setText(
        "topScore",
        `${topIssue.average.toFixed(1)} / 10`
    );

}


/*
==================================================
ERROR STATE
==================================================
*/

function renderHeroError() {

    setText(
        "participantCount",
        "—"
    );

    setText(
        "topIssue",
        "Results unavailable"
    );

    setText(
        "topScore",
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
        document.getElementById(elementId);


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

function formatNumber(value) {

    const number =
        Number(value);


    if (!Number.isFinite(number)) {
        return "0";
    }


    return number.toLocaleString();

}


/*
==================================================
CLEANUP
==================================================
*/

export function destroyHeroController() {

    if (
        typeof unsubscribePrioritySummary ===
        "function"
    ) {

        unsubscribePrioritySummary();

    }


    unsubscribePrioritySummary = null;

    heroControllerInitialized = false;

}