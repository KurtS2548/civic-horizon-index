/*
==================================================
CIVIC HORIZON INDEX V2
RESULTS PRIORITIES CONTROLLER
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

let resultsPrioritiesControllerInitialized = false;

let unsubscribePrioritySummary = null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeResultsPrioritiesController() {

    if (resultsPrioritiesControllerInitialized) {
        return;
    }

    resultsPrioritiesControllerInitialized = true;


    unsubscribePrioritySummary =
        subscribeToNationalPrioritySummary(
            summary => {

                renderPriorityRankings(summary);

            },
            error => {

                console.error(
                    "Results priority rankings error:",
                    error
                );

                renderPriorityRankingsError();

            }
        );

}


/*
==================================================
RANKINGS RENDERING
==================================================
*/

function renderPriorityRankings(
    summary
) {

    const container =
        document.getElementById(
            "resultsPriorityRankings"
        );


    if (!container) {
        return;
    }


    const participantCount =
        Number(
            summary?.participantCount
        ) || 0;


    const rankings =
        Array.isArray(
            summary?.rankings
        )
            ? summary.rankings
            : [];


    const rankedIssues =
        rankings.filter(issue => {

            return (
                issue &&
                Number(
                    issue.responseCount
                ) > 0
            );

        });


    setParticipantSummary(
        participantCount
    );


    if (
        participantCount === 0 ||
        rankedIssues.length === 0
    ) {

        renderEmptyState(container);

        return;

    }


    container.innerHTML =
        rankedIssues
            .map(
                (issue, index) => {

                    return createPriorityRow(
                        issue,
                        index
                    );

                }
            )
            .join("");

}


/*
==================================================
PRIORITY ROW
==================================================
*/

function createPriorityRow(
    issue,
    index
) {

    const average =
        Number(
            issue.average
        ) || 0;


    const responseCount =
        Number(
            issue.responseCount
        ) || 0;


    const barWidth =
        Math.max(
            0,
            Math.min(
                100,
                average * 10
            )
        );


    const responseLabel =
        responseCount === 1
            ? "rating"
            : "ratings";


    return `
        <article class="results-priority-row">

            <span class="results-priority-rank">
                ${index + 1}
            </span>

            <div class="results-priority-content">

                <div class="results-priority-heading">

                    <h3>
                        ${escapeHtml(issue.name)}
                    </h3>

                    <strong>
                        ${average.toFixed(1)}
                    </strong>

                </div>


                <div class="results-priority-meta">

                    <span>
                        ${formatNumber(responseCount)}
                        ${responseLabel}
                    </span>

                    <span>
                        Score out of 10
                    </span>

                </div>


                <div
                    class="results-priority-track"
                    aria-hidden="true"
                >

                    <div
                        class="results-priority-bar"
                        style="width: ${barWidth}%"
                    ></div>

                </div>

            </div>

        </article>
    `;

}


/*
==================================================
EMPTY AND ERROR STATES
==================================================
*/

function renderEmptyState(
    container
) {

    container.innerHTML = `
        <div class="results-priorities__empty">

            <p>
                National priority rankings will appear after
                survey responses are submitted.
            </p>

        </div>
    `;

}


function renderPriorityRankingsError() {

    const container =
        document.getElementById(
            "resultsPriorityRankings"
        );


    if (container) {

        container.innerHTML = `
            <div class="results-priorities__empty">

                <p>
                    National priority rankings are temporarily
                    unavailable.
                </p>

            </div>
        `;

    }


    setText(
        "resultsPriorityParticipantSummary",
        "Participation data unavailable"
    );

}


/*
==================================================
PARTICIPANT SUMMARY
==================================================
*/

function setParticipantSummary(
    participantCount
) {

    const label =
        participantCount === 1
            ? "participant contributed"
            : "participants contributed";


    setText(
        "resultsPriorityParticipantSummary",
        `${formatNumber(participantCount)} ${label}`
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


function escapeHtml(
    value
) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/*
==================================================
CLEANUP
==================================================
*/

export function destroyResultsPrioritiesController() {

    if (
        typeof unsubscribePrioritySummary ===
        "function"
    ) {

        unsubscribePrioritySummary();

    }


    unsubscribePrioritySummary = null;

    resultsPrioritiesControllerInitialized = false;

}