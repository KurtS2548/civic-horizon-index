/*
==================================================
CIVIC HORIZON INDEX V2
NATIONAL PRIORITIES CONTROLLER
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

let nationalPrioritiesControllerInitialized = false;

let unsubscribePrioritySummary = null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeNationalPrioritiesController() {

    if (nationalPrioritiesControllerInitialized) {
        return;
    }

    nationalPrioritiesControllerInitialized = true;


    unsubscribePrioritySummary =
        subscribeToNationalPrioritySummary(
            summary => {

                renderNationalPriorities(summary);

            },
            error => {

                console.error(
                    "National Priorities data error:",
                    error
                );

                renderNationalPrioritiesError();

            }
        );

}


/*
==================================================
RENDERING
==================================================
*/

function renderNationalPriorities(summary) {

    const container =
        document.getElementById(
            "homepagePriorityRankings"
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
        rankings
            .filter(issue => {

                return (
                    issue &&
                    Number(issue.responseCount) > 0
                );

            })
            .slice(0, 5);


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

                    return createRankingRow(
                        issue,
                        index
                    );

                }
            )
            .join("");

}


/*
==================================================
RANKING ROW
==================================================
*/

function createRankingRow(
    issue,
    index
) {

    const average =
        Number(issue.average) || 0;


    const barWidth =
        Math.max(
            0,
            Math.min(
                100,
                average * 10
            )
        );


    return `
        <a
            href="results.html#national-priorities"
            class="priority-ranking-row"
        >

            <span class="priority-ranking-number">
                ${index + 1}
            </span>

            <span class="priority-ranking-content">

                <span class="priority-ranking-heading">

                    <h3>
                        ${escapeHtml(issue.name)}
                    </h3>

                    <strong>
                        ${average.toFixed(1)}
                    </strong>

                </span>

                <span
                    class="priority-ranking-track"
                    aria-hidden="true"
                >

                    <span
                        class="priority-ranking-bar"
                        style="width: ${barWidth}%"
                    ></span>

                </span>

            </span>

        </a>
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
        <div class="priority-ranking-empty">

            <p>
                National rankings will appear after survey
                responses are submitted.
            </p>

        </div>
    `;

}


function renderNationalPrioritiesError() {

    const container =
        document.getElementById(
            "homepagePriorityRankings"
        );


    if (container) {

        container.innerHTML = `
            <div class="priority-ranking-empty">

                <p>
                    National priority rankings are temporarily
                    unavailable.
                </p>

            </div>
        `;

    }


    setText(
        "priorityParticipantSummary",
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
        "priorityParticipantSummary",
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

export function destroyNationalPrioritiesController() {

    if (
        typeof unsubscribePrioritySummary ===
        "function"
    ) {

        unsubscribePrioritySummary();

    }


    unsubscribePrioritySummary = null;

    nationalPrioritiesControllerInitialized = false;

}