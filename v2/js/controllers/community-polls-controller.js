/*
==================================================
CIVIC HORIZON INDEX V2
COMMUNITY POLLS CONTROLLER
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

let communityPollsControllerInitialized = false;

let unsubscribeSnapshotSummary = null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeCommunityPollsController() {

    if (communityPollsControllerInitialized) {
        return;
    }

    communityPollsControllerInitialized = true;


    unsubscribeSnapshotSummary =
        subscribeToSnapshotSummary(
            summary => {

                renderCommunityPolls(summary);

            },
            error => {

                console.error(
                    "Community Polls data error:",
                    error
                );

                renderCommunityPollsError();

            }
        );

}


/*
==================================================
RENDERING
==================================================
*/

function renderCommunityPolls(summary) {

    const container =
        document.getElementById(
            "homepageCommunityPolls"
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


    const newestActiveSurveys =
        [...activeSurveys]
            .sort(
                (surveyA, surveyB) => {

                    return (
                        getSurveyTimestamp(surveyB) -
                        getSurveyTimestamp(surveyA)
                    );

                }
            )
            .slice(0, 3);


    if (
        newestActiveSurveys.length === 0
    ) {

        renderEmptyState(container);

        return;

    }


    container.innerHTML =
        newestActiveSurveys
            .map(
                survey => {

                    const voteCount =
                        getVotesForSurvey(
                            survey.id,
                            communityVotes
                        ).length;


                    return createPollCard(
                        survey,
                        voteCount
                    );

                }
            )
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


    const displayDate =
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
        <a
            href="polls.html?poll=${surveyId}#community-polls"
            class="community-poll-card"
        >

            <span class="community-poll-card__top">

                <span class="community-poll-card__status">
                    Open for Voting
                </span>

                <span class="community-poll-card__date">
                    ${displayDate}
                </span>

            </span>


            <h3>
                ${question}
            </h3>


            <span class="community-poll-card__footer">

                <span class="community-poll-card__votes">

                    <strong>
                        ${formatNumber(voteCount)}
                    </strong>

                    <span>
                        ${voteLabel}
                    </span>

                </span>


                <span class="community-poll-card__action">
                    Vote Now →
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
        <div class="community-polls__empty">

            <h3>
                No community polls are open
            </h3>

            <p>
                New community polls will appear here when they
                become available.
            </p>

        </div>
    `;

}


function renderCommunityPollsError() {

    const container =
        document.getElementById(
            "homepageCommunityPolls"
        );


    if (!container) {
        return;
    }


    container.innerHTML = `
        <div class="community-polls__empty">

            <h3>
                Community polls are unavailable
            </h3>

            <p>
                Active poll information could not be loaded.
                Please refresh the page and try again.
            </p>

        </div>
    `;

}


/*
==================================================
SURVEY DATE HELPERS
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
            day: "numeric"
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

export function destroyCommunityPollsController() {

    if (
        typeof unsubscribeSnapshotSummary ===
        "function"
    ) {

        unsubscribeSnapshotSummary();

    }


    unsubscribeSnapshotSummary = null;

    communityPollsControllerInitialized = false;

}