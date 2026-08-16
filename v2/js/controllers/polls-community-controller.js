/*
==================================================
CIVIC HORIZON INDEX V2
POLLS COMMUNITY CONTROLLER
==================================================

COMMUNITY POLL SECURITY MODEL

- Signed-in participant required
- Verified email required for voting
- Participant eligibility checked before voting
- Firebase UID-based vote lock determines whether
  the account has already voted
- No localStorage/device vote lock
- Firebase Realtime Database Rules provide the
  final server-side protection
==================================================
*/


import {

    subscribeToSnapshotSummary,

    getVotesForSurvey

} from "../services/snapshot-service.js";


import {

    submitCommunityVote,

    hasVotedInCommunityPoll,

    getCommunityPollParticipationMessage

} from "../services/firebase-service.js";


import {

    getCurrentUserVotingEligibility

} from "../services/auth-service.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let controllerInitialized =
    false;


let unsubscribeSnapshotSummary =
    null;


let activeSurveys =
    [];


let communityVotes =
    [];


let selectedSurvey =
    null;


let votingAccessCheckId =
    0;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializePollsCommunityController() {

    if (
        controllerInitialized
    ) {

        return;

    }


    controllerInitialized =
        true;


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


    if (
        pollsContainer
    ) {

        pollsContainer.addEventListener(
            "click",
            handlePollListClick
        );

    }


    const backButton =
        document.getElementById(
            "communityVoteBackButton"
        );


    if (
        backButton
    ) {

        backButton.addEventListener(
            "click",
            closeCommunityVote
        );

    }


    const voteForm =
        document.getElementById(
            "communityVoteForm"
        );


    if (
        voteForm
    ) {

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


    if (
        !container
    ) {

        return;

    }


    const sortedSurveys =
        [...activeSurveys]
            .sort(
                (
                    surveyA,
                    surveyB
                ) => {

                    return (
                        getSurveyTimestamp(
                            surveyB
                        ) -
                        getSurveyTimestamp(
                            surveyA
                        )
                    );

                }
            );


    if (
        sortedSurveys.length ===
        0
    ) {

        renderEmptyState(
            container
        );


        return;

    }


    container.innerHTML =
        sortedSurveys
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
        escapeHtml(
            survey.id ||
            ""
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
        voteCount ===
            1
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


    if (
        !button
    ) {

        return;

    }


    const pollId =
        button.dataset.pollId;


    if (
        !pollId
    ) {

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
                    String(
                        item.id
                    ) ===
                    String(
                        pollId
                    )
                );

            }
        );


    if (
        !survey
    ) {

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


    /*
    ----------------------------------------------
    CHECK ACCOUNT + FIREBASE VOTE LOCK

    The form stays disabled until both checks finish.
    ----------------------------------------------
    */

    checkVotingAccessForSelectedPoll();

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


    /*
    ----------------------------------------------
    SAFE INITIAL STATE

    Inputs are disabled until Firebase confirms:
    - eligibility
    - account has not already voted
    ----------------------------------------------
    */

    disableVoteForm(
        "Checking Voting Access..."
    );

}


/*
==================================================
CHECK VOTING ACCESS
==================================================
*/

async function checkVotingAccessForSelectedPoll() {

    if (
        !selectedSurvey
    ) {

        return;

    }


    const surveyId =
        String(
            selectedSurvey.id
        );


    /*
    ----------------------------------------------
    STALE REQUEST PROTECTION

    If the user switches polls while this check is
    running, the old result cannot enable the new
    poll accidentally.
    ----------------------------------------------
    */

    const checkId =
        ++votingAccessCheckId;


    disableVoteForm(
        "Checking Voting Access..."
    );


    showVoteMessage(
        "Checking your voting access...",
        "info"
    );


    try {

        /*
        ----------------------------------------------
        STEP 1
        PARTICIPANT ELIGIBILITY
        ----------------------------------------------
        */

        const eligibility =
            await getCurrentUserVotingEligibility();


        if (
            isStaleVotingCheck(
                checkId,
                surveyId
            )
        ) {

            return;

        }


        if (
            !eligibility?.eligible
        ) {

            blockIneligibleVoting(
                eligibility
            );


            return;

        }


        /*
        ----------------------------------------------
        STEP 2
        FIREBASE ACCOUNT VOTE LOCK

        This replaces the old localStorage/device
        system completely.
        ----------------------------------------------
        */

        const alreadyVoted =
            await hasVotedInCommunityPoll(
                surveyId
            );


        if (
            isStaleVotingCheck(
                checkId,
                surveyId
            )
        ) {

            return;

        }


        if (
            alreadyVoted
        ) {

            lockVoteForm(
                "You have already voted in this community poll."
            );


            return;

        }


        /*
        ----------------------------------------------
        ELIGIBLE + NO EXISTING FIREBASE LOCK
        ----------------------------------------------
        */

        enableVoteForm();

        clearVoteMessage();

    } catch (error) {

        console.error(
            "Community poll voting access check failed:",
            error
        );


        if (
            isStaleVotingCheck(
                checkId,
                surveyId
            )
        ) {

            return;

        }


        disableVoteForm(
            "Participation Unavailable"
        );


        showVoteMessage(
            "Voting access could not be confirmed. Please refresh the page and try again.",
            "error"
        );

    }

}


/*
==================================================
STALE VOTING CHECK
==================================================
*/

function isStaleVotingCheck(
    checkId,
    surveyId
) {

    if (
        checkId !==
        votingAccessCheckId
    ) {

        return true;

    }


    if (
        !selectedSurvey
    ) {

        return true;

    }


    return (
        String(
            selectedSurvey.id
        ) !==
        String(
            surveyId
        )
    );

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


    if (
        !container
    ) {

        return;

    }


    const choices =
        getSurveyChoices(
            survey
        );


    if (
        choices.length ===
        0
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
            .map(
                choice => {

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
                                disabled
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

                }
            )
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
            Array.isArray(
                candidate
            )
        ) {

            return candidate
                .map(
                    choice => {

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

                    }
                )
                .filter(
                    Boolean
                );

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

    if (
        !selectedSurvey
    ) {

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


    if (
        !selectedSurvey
    ) {

        showVoteMessage(
            "Please select a community poll first.",
            "error"
        );


        return;

    }


    const surveyId =
        String(
            selectedSurvey.id
        );


    const form =
        event.currentTarget;


    const selectedChoice =
        form.querySelector(
            'input[name="communityVoteChoice"]:checked'
        );


    if (
        !selectedChoice
    ) {

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


    /*
    ----------------------------------------------
    LOCK FORM WHILE CHECKING/SUBMITTING
    ----------------------------------------------
    */

    setVoteSubmittingState(
        submitButton,
        true
    );


    disableVoteChoiceInputs();


    showVoteMessage(
        "Confirming your voting access...",
        "info"
    );


    try {

        /*
        ----------------------------------------------
        RE-CHECK ELIGIBILITY AT SUBMISSION

        Never trust only the earlier page check.
        ----------------------------------------------
        */

        const eligibility =
            await getCurrentUserVotingEligibility();


        if (
            !eligibility?.eligible
        ) {

            blockIneligibleVoting(
                eligibility
            );


            return;

        }


        /*
        ----------------------------------------------
        RE-CHECK FIREBASE DUPLICATE LOCK

        This catches refreshes, second tabs, or other
        browser sessions for the same account.
        ----------------------------------------------
        */

        const alreadyVoted =
            await hasVotedInCommunityPoll(
                surveyId
            );


        if (
            alreadyVoted
        ) {

            lockVoteForm(
                "You have already voted in this community poll."
            );


            return;

        }


        showVoteMessage(
            "Saving your vote...",
            "info"
        );


        /*
        ----------------------------------------------
        SUBMIT

        firebase-service.js creates:
        1. private UID vote lock
        2. anonymous public vote record

        Firebase Rules enforce both.
        ----------------------------------------------
        */

        await submitCommunityVote(
            surveyId,
            selectedChoice.value
        );


        lockVoteForm(
            "Thank you. Your vote has been recorded."
        );

    } catch (error) {

        console.error(
            "Community poll vote submission error:",
            error
        );


        /*
        ----------------------------------------------
        FIREBASE DUPLICATE PROTECTION

        The server may detect a duplicate even if
        the earlier browser check did not.
        ----------------------------------------------
        */

        if (
            error?.code ===
            "already-voted-community-poll"
        ) {

            lockVoteForm(
                getCommunityPollParticipationMessage(
                    error
                )
            );


            return;

        }


        enableVoteChoiceInputs();


        setVoteSubmittingState(
            submitButton,
            false
        );


        showVoteMessage(
            getCommunityPollParticipationMessage(
                error
            ),
            "error"
        );

    }

}


/*
==================================================
BLOCK INELIGIBLE VOTING
==================================================
*/

function blockIneligibleVoting(
    eligibility
) {

    disableVoteForm(
        getBlockedButtonText(
            eligibility?.reason
        )
    );


    showVoteMessage(
        getEligibilityMessage(
            eligibility?.reason
        ),
        "error"
    );

}


/*
==================================================
ELIGIBILITY MESSAGE
==================================================
*/

function getEligibilityMessage(
    reason
) {

    switch (
        reason
    ) {

        case "signedOut":

            return "Sign in to participate in Community Polls.";


        case "emailNotVerified":

            return "Verify your email before participating.";


        case "zipMissing":

            return "Add a valid ZIP code to your profile before participating.";


        case "birthdayMissing":

            return "Your birthday is required before participating.";


        case "underMinimumAge":

            return "This account is not eligible to participate.";


        case "agreementMissing":

            return "The participation agreement must be accepted before voting.";


        case "verificationSyncPending":

            return "Your account verification is still being finalized. Please sign out and sign back in once.";


        case "profileMissing":

            return "Your participant profile could not be loaded.";


        default:

            return "Your account is not currently eligible to participate.";

    }

}


/*
==================================================
BLOCKED BUTTON TEXT
==================================================
*/

function getBlockedButtonText(
    reason
) {

    switch (
        reason
    ) {

        case "signedOut":

            return "Sign In Required";


        case "emailNotVerified":

            return "Verification Required";


        case "zipMissing":

            return "ZIP Code Required";


        case "birthdayMissing":

            return "Birthday Required";


        case "agreementMissing":

            return "Agreement Required";


        case "verificationSyncPending":

            return "Verification Pending";


        default:

            return "Participation Unavailable";

    }

}


/*
==================================================
VOTE SUBMITTING STATE
==================================================
*/

function setVoteSubmittingState(
    button,
    isSubmitting
) {

    if (
        !button
    ) {

        return;

    }


    button.disabled =
        isSubmitting;


    button.textContent =
        isSubmitting
            ? "Submitting..."
            : "Submit Vote";

}


/*
==================================================
ENABLE VOTE FORM
==================================================
*/

function enableVoteForm() {

    enableVoteChoiceInputs();


    const button =
        document.querySelector(
            ".community-vote__submit"
        );


    if (
        button
    ) {

        button.disabled =
            false;


        button.textContent =
            "Submit Vote";

    }

}


/*
==================================================
DISABLE VOTE FORM
==================================================
*/

function disableVoteForm(
    buttonText =
        "Participation Unavailable"
) {

    disableVoteChoiceInputs();


    const button =
        document.querySelector(
            ".community-vote__submit"
        );


    if (
        button
    ) {

        button.disabled =
            true;


        button.textContent =
            buttonText;

    }

}


/*
==================================================
ENABLE CHOICE INPUTS
==================================================
*/

function enableVoteChoiceInputs() {

    document
        .querySelectorAll(
            'input[name="communityVoteChoice"]'
        )
        .forEach(
            input => {

                input.disabled =
                    false;

            }
        );

}


/*
==================================================
DISABLE CHOICE INPUTS
==================================================
*/

function disableVoteChoiceInputs() {

    document
        .querySelectorAll(
            'input[name="communityVoteChoice"]'
        )
        .forEach(
            input => {

                input.disabled =
                    true;

            }
        );

}


/*
==================================================
RESET VOTE BUTTON
==================================================
*/

function resetVoteButton() {

    const button =
        document.querySelector(
            ".community-vote__submit"
        );


    if (
        !button
    ) {

        return;

    }


    button.disabled =
        true;


    button.textContent =
        "Checking Voting Access...";


    disableVoteChoiceInputs();

}


/*
==================================================
DISABLE VOTE BUTTON
==================================================
*/

function disableVoteButton() {

    const button =
        document.querySelector(
            ".community-vote__submit"
        );


    if (
        button
    ) {

        button.disabled =
            true;

    }

}


/*
==================================================
LOCK FORM
==================================================
*/

function lockVoteForm(
    message
) {

    disableVoteChoiceInputs();


    const button =
        document.querySelector(
            ".community-vote__submit"
        );


    if (
        button
    ) {

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


    if (
        !voteSection
    ) {

        return;

    }


    voteSection.hidden =
        false;


    window.requestAnimationFrame(
        () => {

            voteSection.scrollIntoView({

                behavior:
                    "smooth",

                block:
                    "start"

            });

        }
    );

}


/*
==================================================
CLOSE COMMUNITY VOTE
==================================================
*/

function closeCommunityVote() {

    /*
    Invalidate pending eligibility / Firebase lock
    checks for the poll being closed.
    */

    votingAccessCheckId +=
        1;


    const voteSection =
        document.getElementById(
            "communityVoteSection"
        );


    if (
        voteSection
    ) {

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


    if (
        communitySection
    ) {

        communitySection.scrollIntoView({

            behavior:
                "smooth",

            block:
                "start"

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


/*
==================================================
CLEAR POLL FROM URL
==================================================
*/

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


/*
==================================================
OPEN POLL FROM URL
==================================================
*/

function openPollFromUrl() {

    if (
        selectedSurvey
    ) {

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


    if (
        !pollId
    ) {

        return;

    }


    const surveyExists =
        activeSurveys.some(
            survey => {

                return (
                    String(
                        survey.id
                    ) ===
                    String(
                        pollId
                    )
                );

            }
        );


    if (
        surveyExists
    ) {

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


    if (
        !message
    ) {

        return;

    }


    message.textContent =
        "";


    delete message.dataset
        .messageType;

}


/*
==================================================
SHOW VOTE MESSAGE
==================================================
*/

function showVoteMessage(
    message,
    type
) {

    const messageElement =
        document.getElementById(
            "communityVoteMessage"
        );


    if (
        !messageElement
    ) {

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
EMPTY STATE
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


/*
==================================================
COMMUNITY ERROR STATE
==================================================
*/

function renderCommunityError() {

    const container =
        document.getElementById(
            "communityPollsPage"
        );


    if (
        !container
    ) {

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


/*
==================================================
FORMAT SURVEY DATE
==================================================
*/

function formatSurveyDate(
    timestamp
) {

    if (
        !timestamp
    ) {

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

            month:
                "short",

            day:
                "numeric",

            year:
                "numeric"

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


    if (
        !element
    ) {

        return;

    }


    element.textContent =
        String(
            value
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
        Number(
            value
        );


    if (
        !Number.isFinite(
            number
        )
    ) {

        return "0";

    }


    return number.toLocaleString();

}


/*
==================================================
ESCAPE HTML
==================================================
*/

function escapeHtml(
    value
) {

    return String(
        value
    )
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

    /*
    Invalidate pending async voting checks.
    */

    votingAccessCheckId +=
        1;


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


    if (
        pollsContainer
    ) {

        pollsContainer.removeEventListener(
            "click",
            handlePollListClick
        );

    }


    const backButton =
        document.getElementById(
            "communityVoteBackButton"
        );


    if (
        backButton
    ) {

        backButton.removeEventListener(
            "click",
            closeCommunityVote
        );

    }


    const voteForm =
        document.getElementById(
            "communityVoteForm"
        );


    if (
        voteForm
    ) {

        voteForm.removeEventListener(
            "submit",
            handleVoteFormSubmit
        );

    }


    unsubscribeSnapshotSummary =
        null;


    activeSurveys =
        [];


    communityVotes =
        [];


    selectedSurvey =
        null;


    controllerInitialized =
        false;

}