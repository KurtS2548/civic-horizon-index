/*
==================================================
CIVIC HORIZON INDEX V2
RESULTS COMMUNITY CONTROLLER
==================================================
*/

import {
    subscribeToSnapshotSummary,
    getVotesForSurvey,
    getMostParticipatedSurvey
} from "../services/snapshot-service.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let resultsCommunityControllerInitialized = false;

let unsubscribeSnapshotSummary = null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeResultsCommunityController() {

    if (resultsCommunityControllerInitialized) {
        return;
    }

    resultsCommunityControllerInitialized = true;

    unsubscribeSnapshotSummary =
        subscribeToSnapshotSummary(
            summary => {

                renderCommunityAnalytics(summary);

            },
            error => {

                console.error(
                    "Results community analytics error:",
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

function renderCommunityAnalytics(summary) {

    const activeSurveys =
        Array.isArray(summary?.activeSurveys)
            ? summary.activeSurveys
            : [];

    const communityVotes =
        Array.isArray(summary?.communityVotes)
            ? summary.communityVotes
            : [];

    const activePollCount =
        Number(summary?.activePollCount) || 0;

    const communityVoteCount =
        Number(summary?.communityVoteCount) || 0;

    const mostParticipatedSurvey =
        getMostParticipatedSurvey(
            activeSurveys,
            communityVotes
        );


    setText(
        "resultsCommunityActivePolls",
        formatNumber(activePollCount)
    );

    setText(
        "resultsCommunityVoteTotal",
        formatNumber(communityVoteCount)
    );


    if (mostParticipatedSurvey) {

        const topPollVotes =
            getVotesForSurvey(
                mostParticipatedSurvey.id,
                communityVotes
            ).length;

        setText(
            "resultsTopCommunityPoll",
            mostParticipatedSurvey.question ||
            "Untitled community poll"
        );

        setText(
            "resultsTopCommunityPollVotes",
            `${formatNumber(topPollVotes)} ${
                topPollVotes === 1
                    ? "vote"
                    : "votes"
            }`
        );

    } else {

        setText(
            "resultsTopCommunityPoll",
            "No active polls"
        );

        setText(
            "resultsTopCommunityPollVotes",
            "0 votes"
        );

    }


    renderActivePollList(
        activeSurveys,
        communityVotes
    );

}


/*
==================================================
ACTIVE POLL LIST
==================================================
*/

function renderActivePollList(
    activeSurveys,
    communityVotes
) {

    const container =
        document.getElementById(
            "resultsCommunityPollList"
        );

    if (!container) {
        return;
    }


    const rankedPolls =
        [...activeSurveys]
            .map(survey => {

                const voteCount =
                    getVotesForSurvey(
                        survey.id,
                        communityVotes
                    ).length;

                return {
                    ...survey,
                    voteCount
                };

            })
            .sort((pollA, pollB) => {

                if (
                    pollB.voteCount !==
                    pollA.voteCount
                ) {

                    return (
                        pollB.voteCount -
                        pollA.voteCount
                    );

                }

                return (
                    getSurveyTimestamp(pollB) -
                    getSurveyTimestamp(pollA)
                );

            });


    if (rankedPolls.length === 0) {

        container.innerHTML = `
            <div class="results-community__empty">
                <p>
                    No active community polls are currently
                    available.
                </p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        rankedPolls
            .map(createCommunityRow)
            .join("");

}


/*
==================================================
COMMUNITY POLL ROW
==================================================
*/

function createCommunityRow(
    survey
) {

    const voteCount =
        Number(survey.voteCount) || 0;

    const dateText =
        formatSurveyDate(
            getSurveyTimestamp(survey)
        );

    const question =
        escapeHtml(
            survey.question ||
            "Untitled community poll"
        );


    return `
        <article class="results-community-row">

            <div class="results-community-row__content">

                <span class="results-community-row__status">
                    Open for Voting
                </span>

                <h4>
                    ${question}
                </h4>

                <div class="results-community-row__meta">

                    <span>
                        ${dateText}
                    </span>

                    <span>
                        Active community poll
                    </span>

                </div>

            </div>


            <div class="results-community-row__count">

                <strong>
                    ${formatNumber(voteCount)}
                </strong>

                <span>
                    ${voteCount === 1
                        ? "Vote"
                        : "Votes"}
                </span>

            </div>

        </article>
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
ERROR STATE
==================================================
*/

function renderCommunityError() {

    setText(
        "resultsCommunityActivePolls",
        "—"
    );

    setText(
        "resultsCommunityVoteTotal",
        "—"
    );

    setText(
        "resultsTopCommunityPoll",
        "Unavailable"
    );

    setText(
        "resultsTopCommunityPollVotes",
        "Participation data unavailable"
    );


    const container =
        document.getElementById(
            "resultsCommunityPollList"
        );


    if (container) {

        container.innerHTML = `
            <div class="results-community__empty">

                <p>
                    Community poll analytics are temporarily
                    unavailable.
                </p>

            </div>
        `;

    }

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

export function destroyResultsCommunityController() {

    if (
        typeof unsubscribeSnapshotSummary ===
        "function"
    ) {

        unsubscribeSnapshotSummary();

    }

    unsubscribeSnapshotSummary = null;

    resultsCommunityControllerInitialized = false;

}