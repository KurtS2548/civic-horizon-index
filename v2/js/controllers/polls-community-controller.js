/*
==================================================
CIVIC HORIZON INDEX V2
POLLS COMMUNITY CONTROLLER
==================================================
*/

import {
    subscribeToSnapshotSummary,
    getVotesForSurvey
} from "../services/snapshot-service.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let controllerInitialized = false;

let unsubscribeSnapshotSummary = null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializePollsCommunityController() {

    if (controllerInitialized) {
        return;
    }

    controllerInitialized = true;

    unsubscribeSnapshotSummary =
        subscribeToSnapshotSummary(
            summary => {

                renderCommunityPolls(summary);

            },
            error => {

                console.error(
                    "Community Polls page error:",
                    error
                );

                renderCommunityError();

            }
        );

}


/*
==================================================
MAIN RENDERING
==================================================
*/

function renderCommunityPolls(
    summary
) {

    const container =
        document.getElementById(
            "communityPollsPage"
        );


    if (!container) {
        return;
    }


    const activeSurveys =
        Array.isArray(
            summary?.activeSurveys
        )
            ? summary.activeSurveys
            : [];


    const communityVotes =
        Array.isArray(
            summary?.communityVotes
        )
            ? summary.communityVotes
            : [];


    const sortedSurveys =
        [...activeSurveys]
            .sort(
                (surveyA, surveyB) => {

                    return (
                        getSurveyTimestamp(surveyB) -
                        getSurveyTimestamp(surveyA)
                    );

                }
            );


    if (
        sortedSurveys.length === 0
    ) {

        renderEmptyState(
            container
        );

        return;

    }


    container.innerHTML =
        sortedSurveys
            .map(survey => {

                const voteCount =
                    getVotesForSurvey(
                        survey.id,
                        communityVotes
                    ).length;


                return createPollCard(
                    survey,
                    voteCount
                );

            })
            .join("");

}


/*
==================================================
POLL CARD
==================================================
*/

function createPollCard(
    survey,
    voteCount
) {

    const surveyId =
        encodeURIComponent(
            survey.id || ""
        );


    const question =
        escapeHtml(
            survey.question ||
            "Untitled community poll"
        );


    const dateText =
        formatSurveyDate(
            getSurveyTimestamp(
                survey
            )
        );


    const voteLabel =
        voteCount === 1
            ? "vote"
            : "votes";


    return `
        <article class="community-polls-page__card">

            <div class="community-polls-page__content">

                <span class="community-polls-page__status">
                    Open for Voting
                </span>

                <h3>
                    ${question}
                </h3>

                <div class="community-polls-page__meta">

                    <span>
                        ${dateText}
                    </span>

                    <span>
                        Community-created poll
                    </span>

                </div>

            </div>


            <div class="community-polls-page__action">

                <span class="community-polls-page__votes">
                    ${formatNumber(voteCount)}
                    ${voteLabel}
                </span>

                <button
                    type="button"
                    class="community-polls-page__button"
                    data-poll-id="${surveyId}"
                >
                    Vote Now
                </button>

            </div>

        </article>
    `;

}


/*
==================================================
CLICK HANDLING
==================================================
*/

function initializePollButtons() {

    const container =
        document.getElementById(
            "communityPollsPage"
        );


    if (!container) {
        return;
    }


    container.addEventListener(
        "click",
        handlePollClick
    );

}


function handlePollClick(
    event
) {

    const button =
        event.target.closest(
            ".community-polls-page__button"
        );


    if (!button) {
        return;
    }


    const pollId =
        button.dataset.pollId;


    if (!pollId) {
        return;
    }


    window.location.href =
        `polls.html?poll=${pollId}#community-polls`;

}


/*
==================================================
EMPTY / ERROR STATES
==================================================
*/

function renderEmptyState(
    container
) {

    container.innerHTML = `
        <div class="community-polls-page__empty">

            <p>
                No community polls are currently open for voting.
            </p>

        </div>
    `;

}


function renderCommunityError() {

    const container =
        document.getElementById(
            "communityPollsPage"
        );


    if (!container) {
        return;
    }


    container.innerHTML = `
        <div class="community-polls-page__empty">

            <p>
                Community polls are temporarily unavailable.
                Please refresh the page and try again.
            </p>

        </div>
    `;

}


/*
==================================================
DATE HELPERS
==================================================
*/

function getSurveyTimestamp(
    survey
) {

    const candidates = [
        survey?.createdAt,
        survey?.timestamp,
        survey?.dateCreated,
        survey?.submittedAt,
        survey?.updatedAt
    ];


    for (const candidate of candidates) {

        if (
            typeof candidate === "number" &&
            Number.isFinite(candidate)
        ) {

            return candidate;

        }


        if (
            typeof candidate === "string" &&
            candidate.trim()
        ) {

            const parsedDate =
                Date.parse(candidate);


            if (
                Number.isFinite(parsedDate)
            ) {

                return parsedDate;

            }

        }

    }


    return 0;

}


function formatSurveyDate(
    timestamp
) {

    if (!timestamp) {
        return "Current";
    }


    const date =
        new Date(timestamp);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "Current";

    }


    return date.toLocaleDateString(
        undefined,
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
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

export function destroyPollsCommunityController() {

    if (
        typeof unsubscribeSnapshotSummary ===
        "function"
    ) {

        unsubscribeSnapshotSummary();

    }


    const container =
        document.getElementById(
            "communityPollsPage"
        );


    if (container) {

        container.removeEventListener(
            "click",
            handlePollClick
        );

    }


    unsubscribeSnapshotSummary = null;

    controllerInitialized = false;

}


/*
==================================================
START BUTTON HANDLING
==================================================
*/

initializePollButtons();