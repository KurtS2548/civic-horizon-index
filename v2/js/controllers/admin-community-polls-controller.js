/*
==================================================
CIVIC HORIZON INDEX V2
ADMIN COMMUNITY POLLS CONTROLLER
==================================================
*/

import {
    subscribeToCommunitySurveys,
    subscribeToCommunityVotes,
    updateDatabasePath
} from "../services/firebase-service.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let controllerInitialized = false;

let unsubscribeSurveys = null;
let unsubscribeVotes = null;

let surveys = [];
let votes = [];

let currentFilter = "all";


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeAdminCommunityPollsController() {

    if (controllerInitialized) {
        return;
    }

    controllerInitialized = true;

    initializeFilters();
    initializePollActions();

    subscribeToSurveyData();
    subscribeToVoteData();

}


/*
==================================================
LIVE SURVEY DATA
==================================================
*/

function subscribeToSurveyData() {

    unsubscribeSurveys =
        subscribeToCommunitySurveys(
            records => {

                surveys =
                    Array.isArray(records)
                        ? records
                        : [];

                renderPolls();

            },
            error => {

                console.error(
                    "Admin community polls error:",
                    error
                );

                renderError();

            }
        );

}


function subscribeToVoteData() {

    unsubscribeVotes =
        subscribeToCommunityVotes(
            records => {

                votes =
                    Array.isArray(records)
                        ? records
                        : [];

                renderPolls();

            },
            error => {

                console.error(
                    "Admin community vote data error:",
                    error
                );

            }
        );

}


/*
==================================================
FILTERS
==================================================
*/

function initializeFilters() {

    document.addEventListener(
        "click",
        handleFilterClick
    );

}


function handleFilterClick(
    event
) {

    const button =
        event.target.closest(
            ".admin-poll-filter"
        );


    if (!button) {
        return;
    }


    const filter =
        button.dataset.filter;


    if (
        ![
            "all",
            "active",
            "inactive"
        ].includes(filter)
    ) {
        return;
    }


    currentFilter =
        filter;


    document
        .querySelectorAll(
            ".admin-poll-filter"
        )
        .forEach(item => {

            item.classList.toggle(
                "is-active",
                item === button
            );

        });


    renderPolls();

}


/*
==================================================
POLL ACTIONS
==================================================
*/

function initializePollActions() {

    const container =
        document.getElementById(
            "adminCommunityPollList"
        );


    if (!container) {
        return;
    }


    container.addEventListener(
        "click",
        handlePollActionClick
    );

}


async function handlePollActionClick(
    event
) {

    const button =
        event.target.closest(
            ".admin-poll-action"
        );


    if (!button) {
        return;
    }


    const pollId =
        button.dataset.pollId;


    const action =
        button.dataset.action;


    if (!pollId) {
        return;
    }


    if (
        action ===
        "activate"
    ) {

        await updatePollActiveState(
            pollId,
            true,
            button
        );

        return;

    }


    if (
        action ===
        "deactivate"
    ) {

        await updatePollActiveState(
            pollId,
            false,
            button
        );

        return;

    }


    if (
        action ===
        "edit"
    ) {

        openPollEditor(
            pollId
        );

    }

}


/*
==================================================
ACTIVATE / DEACTIVATE
==================================================
*/

async function updatePollActiveState(
    pollId,
    active,
    button
) {

    const originalText =
        button.textContent;


    button.disabled =
        true;


    button.textContent =
        active
            ? "Activating..."
            : "Deactivating...";


    try {

        await updateDatabasePath(
            `createdSurveys/${pollId}`,
            {
                active
            }
        );

    } catch (error) {

        console.error(
            "Poll status update failed:",
            error
        );


        window.alert(
            "The poll status could not be updated."
        );

    } finally {

        button.disabled =
            false;


        button.textContent =
            originalText;

    }

}


/*
==================================================
EDIT ACTION
==================================================
*/

function openPollEditor(
    pollId
) {

    const poll =
        surveys.find(
            item => {

                return (
                    String(item.id) ===
                    String(pollId)
                );

            }
        );


    if (!poll) {
        return;
    }


    const editorContainer =
        document.getElementById(
            "adminCreatePollContainer"
        );


    if (!editorContainer) {

        console.warn(
            "Poll editor container is not available yet."
        );

        return;

    }


    /*
    ==================================================
    THE FULL EDITOR WILL BE BUILT NEXT
    ==================================================
    */

    editorContainer.dataset.editPollId =
        poll.id;


    editorContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/*
==================================================
RENDER POLLS
==================================================
*/

function renderPolls() {

    const container =
        document.getElementById(
            "adminCommunityPollList"
        );


    if (!container) {
        return;
    }


    const filteredPolls =
        surveys
            .filter(
                poll => {

                    if (
                        currentFilter ===
                        "active"
                    ) {

                        return (
                            poll.active ===
                            true
                        );

                    }


                    if (
                        currentFilter ===
                        "inactive"
                    ) {

                        return (
                            poll.active !==
                            true
                        );

                    }


                    return true;

                }
            )
            .sort(
                (pollA, pollB) => {

                    return (
                        getPollTimestamp(
                            pollB
                        ) -
                        getPollTimestamp(
                            pollA
                        )
                    );

                }
            );


    if (
        filteredPolls.length ===
        0
    ) {

        renderEmptyState(
            container
        );

        return;

    }


    container.innerHTML =
        filteredPolls
            .map(
                createPollRow
            )
            .join("");

}


/*
==================================================
POLL ROW
==================================================
*/

function createPollRow(
    poll
) {

    const isActive =
        poll.active ===
        true;


    const voteCount =
        getPollVoteCount(
            poll.id
        );


    const choiceCount =
        getChoiceCount(
            poll
        );


    const dateText =
        formatPollDate(
            getPollTimestamp(
                poll
            )
        );


    const question =
        escapeHtml(
            poll.question ||
            "Untitled community poll"
        );


    const pollId =
        escapeHtml(
            poll.id ||
            ""
        );


    const statusClass =
        isActive
            ? "admin-poll-row__status--active"
            : "admin-poll-row__status--inactive";


    const statusText =
        isActive
            ? "Active"
            : "Inactive";


    const actionClass =
        isActive
            ? "admin-poll-action--deactivate"
            : "admin-poll-action--activate";


    const actionName =
        isActive
            ? "deactivate"
            : "activate";


    const actionText =
        isActive
            ? "Deactivate"
            : "Activate";


    return `
        <article class="admin-poll-row">

            <div class="admin-poll-row__content">

                <div class="admin-poll-row__topline">

                    <span
                        class="
                            admin-poll-row__status
                            ${statusClass}
                        "
                    >
                        ${statusText}
                    </span>

                    <span class="admin-poll-row__date">
                        ${dateText}
                    </span>

                </div>


                <h4>
                    ${question}
                </h4>


                <div class="admin-poll-row__meta">

                    <span>
                        ${formatNumber(voteCount)}
                        ${voteCount === 1
                            ? "vote"
                            : "votes"}
                    </span>

                    <span>
                        ${formatNumber(choiceCount)}
                        ${choiceCount === 1
                            ? "choice"
                            : "choices"}
                    </span>

                </div>

            </div>


            <div class="admin-poll-row__actions">

                <button
                    type="button"
                    class="
                        admin-poll-action
                        admin-poll-action--edit
                    "
                    data-action="edit"
                    data-poll-id="${pollId}"
                >
                    Edit
                </button>


                <button
                    type="button"
                    class="
                        admin-poll-action
                        ${actionClass}
                    "
                    data-action="${actionName}"
                    data-poll-id="${pollId}"
                >
                    ${actionText}
                </button>

            </div>

        </article>
    `;

}


/*
==================================================
VOTE COUNT
==================================================
*/

function getPollVoteCount(
    pollId
) {

    return votes.filter(
        vote => {

            return (
                String(
                    vote?.surveyId
                ) ===
                String(
                    pollId
                )
            );

        }
    ).length;

}


/*
==================================================
CHOICE COUNT
==================================================
*/

function getChoiceCount(
    poll
) {

    const candidates = [
        poll?.choices,
        poll?.options,
        poll?.answers
    ];


    for (
        const candidate
        of candidates
    ) {

        if (
            Array.isArray(
                candidate
            )
        ) {

            return candidate.length;

        }

    }


    return 0;

}


/*
==================================================
EMPTY / ERROR STATES
==================================================
*/

function renderEmptyState(
    container
) {

    let message =
        "No community polls are available.";


    if (
        currentFilter ===
        "active"
    ) {

        message =
            "No active community polls are currently available.";

    }


    if (
        currentFilter ===
        "inactive"
    ) {

        message =
            "No inactive community polls are currently available.";

    }


    container.innerHTML = `
        <div class="admin-polls-empty">

            <p>
                ${message}
            </p>

        </div>
    `;

}


function renderError() {

    const container =
        document.getElementById(
            "adminCommunityPollList"
        );


    if (!container) {
        return;
    }


    container.innerHTML = `
        <div class="admin-polls-empty">

            <p>
                Community polls could not be loaded.
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

function getPollTimestamp(
    poll
) {

    const candidates = [
        poll?.createdAt,
        poll?.timestamp,
        poll?.dateCreated,
        poll?.submittedAt,
        poll?.updatedAt
    ];


    for (
        const candidate
        of candidates
    ) {

        if (
            typeof candidate ===
                "number" &&
            Number.isFinite(
                candidate
            )
        ) {

            return candidate;

        }


        if (
            typeof candidate ===
                "string" &&
            candidate.trim()
        ) {

            const parsedDate =
                Date.parse(
                    candidate
                );


            if (
                Number.isFinite(
                    parsedDate
                )
            ) {

                return parsedDate;

            }

        }

    }


    return 0;

}


function formatPollDate(
    timestamp
) {

    if (!timestamp) {
        return "Date unavailable";
    }


    const date =
        new Date(
            timestamp
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "Date unavailable";

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


    if (
        !Number.isFinite(
            number
        )
    ) {
        return "0";
    }


    return number.toLocaleString();

}


function escapeHtml(
    value
) {

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


/*
==================================================
CLEANUP
==================================================
*/

export function destroyAdminCommunityPollsController() {

    if (
        typeof unsubscribeSurveys ===
        "function"
    ) {

        unsubscribeSurveys();

    }


    if (
        typeof unsubscribeVotes ===
        "function"
    ) {

        unsubscribeVotes();

    }


    document.removeEventListener(
        "click",
        handleFilterClick
    );


    const container =
        document.getElementById(
            "adminCommunityPollList"
        );


    if (container) {

        container.removeEventListener(
            "click",
            handlePollActionClick
        );

    }


    unsubscribeSurveys = null;
    unsubscribeVotes = null;

    surveys = [];
    votes = [];

    currentFilter =
        "all";

    controllerInitialized =
        false;

}