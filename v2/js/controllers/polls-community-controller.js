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

import {
    submitCommunityVote
} from "../services/firebase-service.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let controllerInitialized = false;

let unsubscribeSnapshotSummary = null;

let activeSurveys = [];
let communityVotes = [];

let selectedSurvey = null;


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

    initializeCommunityEvents();

    unsubscribeSnapshotSummary =
        subscribeToSnapshotSummary(
            summary => {

                activeSurveys =
                    Array.isArray(
                        summary?.activeSurveys
                    )
                        ? summary.activeSurveys
                        : [];

                communityVotes =
                    Array.isArray(
                        summary?.communityVotes
                    )
                        ? summary.communityVotes
                        : [];


                renderCommunityPolls();

                updateSelectedPollTotal();

                openPollFromUrl();

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
EVENT INITIALIZATION
==================================================
*/

function initializeCommunityEvents() {

    const pollsContainer =
        document.getElementById(
            "communityPollsPage"
        );


    if (pollsContainer) {

        pollsContainer.addEventListener(
            "click",
            handlePollListClick
        );

    }


    const backButton =
        document.getElementById(
            "communityVoteBackButton"
        );


    if (backButton) {

        backButton.addEventListener(
            "click",
            closeCommunityVote
        );

    }


    const voteForm =
        document.getElementById(
            "communityVoteForm"
        );


    if (voteForm) {

        voteForm.addEventListener(
            "submit",
            handleVoteFormSubmit
        );

    }

}


/*
==================================================
COMMUNITY POLL LIST
==================================================
*/

function renderCommunityPolls() {

    const container =
        document.getElementById(
            "communityPollsPage"
        );


    if (!container) {
        return;
    }


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
        escapeHtml(
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
POLL LIST CLICK
==================================================
*/

function handlePollListClick(
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


    openCommunityVote(
        pollId
    );

}


/*
==================================================
OPEN COMMUNITY POLL
==================================================
*/

function openCommunityVote(
    pollId
) {

    const survey =
        activeSurveys.find(
            item => {

                return (
                    String(item.id) ===
                    String(pollId)
                );

            }
        );


    if (!survey) {

        console.warn(
            "Community poll could not be found:",
            pollId
        );

        return;

    }


    selectedSurvey =
        survey;


    renderSelectedPoll(
        survey
    );


    showCommunityVoteSection();


    updatePollUrl(
        survey.id
    );

}


/*
==================================================
RENDER SELECTED POLL
==================================================
*/

function renderSelectedPoll(
    survey
) {

    setText(
        "communityVoteQuestion",
        survey.question ||
        "Community Poll"
    );


    renderPollChoices(
        survey
    );


    updateSelectedPollTotal();


    clearVoteMessage();


    resetVoteButton();


    if (
        hasVotedOnPoll(
            survey.id
        )
    ) {

        lockVoteForm(
            "You have already voted in this poll on this device."
        );

    }

}


/*
==================================================
POLL CHOICES
==================================================
*/

function renderPollChoices(
    survey
) {

    const container =
        document.getElementById(
            "communityVoteChoices"
        );


    if (!container) {
        return;
    }


    const choices =
        getSurveyChoices(
            survey
        );


    if (
        choices.length === 0
    ) {

        container.innerHTML = `
            <div class="community-polls-page__empty">

                <p>
                    This poll does not currently have
                    any voting options available.
                </p>

            </div>
        `;

        disableVoteButton();

        return;

    }


    container.innerHTML =
        choices
            .map(choice => {

                const safeChoice =
                    escapeHtml(
                        choice
                    );


                return `
                    <label class="community-vote-choice">

                        <input
                            type="radio"
                            name="communityVoteChoice"
                            value="${safeChoice}"
                        >

                        <span
                            class="community-vote-choice__control"
                        ></span>

                        <span
                            class="community-vote-choice__text"
                        >
                            ${safeChoice}
                        </span>

                    </label>
                `;

            })
            .join("");

}


/*
==================================================
SURVEY CHOICE NORMALIZATION
==================================================
*/

function getSurveyChoices(
    survey
) {

    const possibleChoices = [
        survey?.choices,
        survey?.options,
        survey?.answers
    ];


    for (
        const candidate
        of possibleChoices
    ) {

        if (
            Array.isArray(candidate)
        ) {

            return candidate
                .map(choice => {

                    if (
                        typeof choice ===
                        "string"
                    ) {

                        return choice.trim();

                    }


                    if (
                        choice &&
                        typeof choice ===
                        "object"
                    ) {

                        return String(
                            choice.label ??
                            choice.text ??
                            choice.value ??
                            ""
                        ).trim();

                    }


                    return "";

                })
                .filter(Boolean);

        }

    }


    return [];

}


/*
==================================================
LIVE VOTE TOTAL
==================================================
*/

function updateSelectedPollTotal() {

    if (!selectedSurvey) {
        return;
    }


    const votes =
        getVotesForSurvey(
            selectedSurvey.id,
            communityVotes
        );


    setText(
        "communityVoteCurrentTotal",
        formatNumber(
            votes.length
        )
    );

}


/*
==================================================
VOTE SUBMISSION
==================================================
*/

async function handleVoteFormSubmit(
    event
) {

    event.preventDefault();


    if (!selectedSurvey) {

        showVoteMessage(
            "Please select a community poll first.",
            "error"
        );

        return;

    }


    if (
        hasVotedOnPoll(
            selectedSurvey.id
        )
    ) {

        lockVoteForm(
            "You have already voted in this poll on this device."
        );

        return;

    }


    const form =
        event.currentTarget;


    const selectedChoice =
        form.querySelector(
            'input[name="communityVoteChoice"]:checked'
        );


    if (!selectedChoice) {

        showVoteMessage(
            "Please select one response.",
            "error"
        );

        return;

    }


    const submitButton =
        form.querySelector(
            ".community-vote__submit"
        );


    setVoteSubmittingState(
        submitButton,
        true
    );


    showVoteMessage(
        "Saving your vote...",
        "info"
    );


    try {

        await submitCommunityVote(
            String(
                selectedSurvey.id
            ),
            selectedChoice.value
        );


        markPollAsVoted(
            selectedSurvey.id
        );


        lockVoteForm(
            "Thank you. Your vote has been recorded."
        );

    } catch (error) {

        console.error(
            "Community poll vote submission error:",
            error
        );


        setVoteSubmittingState(
            submitButton,
            false
        );


        showVoteMessage(
            "Your vote could not be submitted. Please try again.",
            "error"
        );

    }

}


/*
==================================================
ONE-VOTE DEVICE CHECK
==================================================
*/

function getVoteStorageKey(
    surveyId
) {

    return (
        `chi-community-poll-voted-${surveyId}`
    );

}


function hasVotedOnPoll(
    surveyId
) {

    try {

        return (
            window.localStorage.getItem(
                getVoteStorageKey(
                    surveyId
                )
            ) ===
            "true"
        );

    } catch (error) {

        return false;

    }

}


function markPollAsVoted(
    surveyId
) {

    try {

        window.localStorage.setItem(
            getVoteStorageKey(
                surveyId
            ),
            "true"
        );

    } catch (error) {

        console.warn(
            "Community vote could not be stored locally:",
            error
        );

    }

}


/*
==================================================
VOTE FORM STATE
==================================================
*/

function setVoteSubmittingState(
    button,
    isSubmitting
) {

    if (!button) {
        return;
    }


    button.disabled =
        isSubmitting;


    button.textContent =
        isSubmitting
            ? "Submitting..."
            : "Submit Vote";

}


function resetVoteButton() {

    const button =
        document.querySelector(
            ".community-vote__submit"
        );


    if (!button) {
        return;
    }


    button.disabled =
        false;


    button.textContent =
        "Submit Vote";


    document
        .querySelectorAll(
            'input[name="communityVoteChoice"]'
        )
        .forEach(input => {

            input.disabled =
                false;

        });

}


function disableVoteButton() {

    const button =
        document.querySelector(
            ".community-vote__submit"
        );


    if (button) {

        button.disabled =
            true;

    }

}


function lockVoteForm(
    message
) {

    document
        .querySelectorAll(
            'input[name="communityVoteChoice"]'
        )
        .forEach(input => {

            input.disabled =
                true;

        });


    const button =
        document.querySelector(
            ".community-vote__submit"
        );


    if (button) {

        button.disabled =
            true;


        button.textContent =
            "Vote Submitted";

    }


    showVoteMessage(
        message,
        "success"
    );

}


/*
==================================================
VOTE PANEL VISIBILITY
==================================================
*/

function showCommunityVoteSection() {

    const voteSection =
        document.getElementById(
            "communityVoteSection"
        );


    if (!voteSection) {
        return;
    }


    voteSection.hidden =
        false;


    window.requestAnimationFrame(
        () => {

            voteSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

}


function closeCommunityVote() {

    const voteSection =
        document.getElementById(
            "communityVoteSection"
        );


    if (voteSection) {

        voteSection.hidden =
            true;

    }


    selectedSurvey =
        null;


    clearPollFromUrl();


    const communitySection =
        document.getElementById(
            "community-polls"
        );


    if (communitySection) {

        communitySection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/*
==================================================
URL SUPPORT
==================================================
*/

function updatePollUrl(
    pollId
) {

    const url =
        new URL(
            window.location.href
        );


    url.searchParams.set(
        "poll",
        pollId
    );


    url.hash =
        "community-vote";


    window.history.replaceState(
        {},
        "",
        url
    );

}


function clearPollFromUrl() {

    const url =
        new URL(
            window.location.href
        );


    url.searchParams.delete(
        "poll"
    );


    url.hash =
        "community-polls";


    window.history.replaceState(
        {},
        "",
        url
    );

}


function openPollFromUrl() {

    if (selectedSurvey) {
        return;
    }


    const parameters =
        new URLSearchParams(
            window.location.search
        );


    const pollId =
        parameters.get(
            "poll"
        );


    if (!pollId) {
        return;
    }


    const surveyExists =
        activeSurveys.some(
            survey => {

                return (
                    String(survey.id) ===
                    String(pollId)
                );

            }
        );


    if (surveyExists) {

        openCommunityVote(
            pollId
        );

    }

}


/*
==================================================
VOTE MESSAGE
==================================================
*/

function clearVoteMessage() {

    const message =
        document.getElementById(
            "communityVoteMessage"
        );


    if (!message) {
        return;
    }


    message.textContent =
        "";


    delete message.dataset
        .messageType;

}


function showVoteMessage(
    message,
    type
) {

    const messageElement =
        document.getElementById(
            "communityVoteMessage"
        );


    if (!messageElement) {
        return;
    }


    messageElement.textContent =
        message;


    messageElement.dataset
        .messageType =
        type;

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
                No community polls are currently
                open for voting.
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
                Community polls are temporarily
                unavailable. Please refresh the
                page and try again.
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


function formatSurveyDate(
    timestamp
) {

    if (!timestamp) {
        return "Current";
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

export function destroyPollsCommunityController() {

    if (
        typeof unsubscribeSnapshotSummary ===
        "function"
    ) {

        unsubscribeSnapshotSummary();

    }


    const pollsContainer =
        document.getElementById(
            "communityPollsPage"
        );


    if (pollsContainer) {

        pollsContainer.removeEventListener(
            "click",
            handlePollListClick
        );

    }


    const backButton =
        document.getElementById(
            "communityVoteBackButton"
        );


    if (backButton) {

        backButton.removeEventListener(
            "click",
            closeCommunityVote
        );

    }


    const voteForm =
        document.getElementById(
            "communityVoteForm"
        );


    if (voteForm) {

        voteForm.removeEventListener(
            "submit",
            handleVoteFormSubmit
        );

    }


    unsubscribeSnapshotSummary =
        null;

    activeSurveys = [];

    communityVotes = [];

    selectedSurvey =
        null;

    controllerInitialized =
        false;

}