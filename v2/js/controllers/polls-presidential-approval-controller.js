/*
==================================================
CIVIC HORIZON INDEX V2
PRESIDENTIAL APPROVAL POLL CONTROLLER
==================================================
*/


import {

    subscribeToPresidentialApprovalSummary,

    submitPresidentialApprovalResponse,

    hasSubmittedPresidentialApproval,

    markPresidentialApprovalSubmitted

} from "../services/pulse-service.js";


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


let unsubscribePulseSummary =
    null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializePollsPresidentialApprovalController() {

    if (
        controllerInitialized
    ) {

        return;

    }


    controllerInitialized =
        true;


    initializeForm();

    initializeVotingAccess();

    subscribeToLiveResults();

}


/*
==================================================
INITIAL VOTING ACCESS
==================================================
*/

async function initializeVotingAccess() {

    const form =
        document.getElementById(
            "pollsPresidentialApprovalForm"
        );


    if (!form) {

        return;

    }


    /*
    ----------------------------------------------
    DEVICE RESPONSE LOCK
    ----------------------------------------------
    */

    if (
        hasSubmittedPresidentialApproval()
    ) {

        lockForm(
            "You have already responded to this tracker on this device."
        );


        return;

    }


    try {

        const eligibility =
            await getCurrentUserVotingEligibility();


        if (
            eligibility?.eligible
        ) {

            enableForm(
                form
            );


            return;

        }


        blockIneligibleVoting(
            form,
            eligibility
        );

    } catch (error) {

        console.error(
            "Presidential approval eligibility check failed:",
            error
        );


        disableForm(
            form
        );


        showMessage(
            "Voting access could not be confirmed. Please sign in again.",
            "error"
        );

    }

}


/*
==================================================
FORM
==================================================
*/

function initializeForm() {

    const form =
        document.getElementById(
            "pollsPresidentialApprovalForm"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        handleFormSubmit
    );

}


/*
==================================================
FORM SUBMISSION
==================================================
*/

async function handleFormSubmit(
    event
) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const selectedInput =
        form.querySelector(
            'input[name="presidentialApproval"]:checked'
        );


    const submitButton =
        form.querySelector(
            ".approval-poll__submit"
        );


    /*
    ----------------------------------------------
    DEVICE RESPONSE LOCK
    ----------------------------------------------
    */

    if (
        hasSubmittedPresidentialApproval()
    ) {

        lockForm(
            "You have already responded to this tracker on this device."
        );


        return;

    }


    /*
    ----------------------------------------------
    FULL ACCOUNT ELIGIBILITY CHECK

    Re-check at submit time so stale page state
    cannot bypass voting requirements.
    ----------------------------------------------
    */

    try {

        const eligibility =
            await getCurrentUserVotingEligibility();


        if (
            !eligibility?.eligible
        ) {

            blockIneligibleVoting(
                form,
                eligibility
            );


            return;

        }

    } catch (error) {

        console.error(
            "Presidential approval submit eligibility check failed:",
            error
        );


        showMessage(
            "Voting access could not be confirmed. Please sign in again.",
            "error"
        );


        return;

    }


    if (
        !selectedInput
    ) {

        showMessage(
            "Please select one response.",
            "error"
        );


        return;

    }


    setSubmittingState(
        submitButton,
        true
    );


    showMessage(
        "Saving your response...",
        "info"
    );


    try {

        await submitPresidentialApprovalResponse(
            selectedInput.value
        );


        markPresidentialApprovalSubmitted();


        lockForm(
            "Thank you. Your response has been recorded."
        );

    } catch (error) {

        console.error(
            "Presidential approval submission error:",
            error
        );


        setSubmittingState(
            submitButton,
            false
        );


        showMessage(
            error?.message ||
            "Your response could not be submitted. Please try again.",
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
    form,
    eligibility
) {

    disableForm(
        form
    );


    const submitButton =
        form?.querySelector(
            ".approval-poll__submit"
        );


    if (
        submitButton
    ) {

        submitButton.disabled =
            true;


        submitButton.textContent =
            getBlockedButtonText(
                eligibility?.reason
            );

    }


    showMessage(
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

            return "Sign in to participate in Presidential Approval.";

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

            return "Your account verification is still being finalized. Please try again.";

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

        default:

            return "Participation Unavailable";

    }

}


/*
==================================================
LIVE RESULTS
==================================================
*/

function subscribeToLiveResults() {

    unsubscribePulseSummary =
        subscribeToPresidentialApprovalSummary(

            summary => {

                renderLiveResults(
                    summary
                );

            },

            error => {

                console.error(
                    "Polls presidential approval live results error:",
                    error
                );


                renderLiveResultsError();

            }

        );

}


/*
==================================================
RENDER LIVE RESULTS
==================================================
*/

function renderLiveResults(
    summary
) {

    const totalResponses =
        Number(
            summary?.totalResponses
        ) ||
        0;


    const approvalPercentage =
        Number(
            summary?.approvalPercentage
        ) ||
        0;


    const disapprovalPercentage =
        Number(
            summary?.disapprovalPercentage
        ) ||
        0;


    const neutralPercentage =
        Number(
            summary?.neutralPercentage
        ) ||
        0;


    setText(
        "pollsApprovalHeadline",
        formatPercentage(
            approvalPercentage
        )
    );


    setText(
        "pollsDisapprovalHeadline",
        formatPercentage(
            disapprovalPercentage
        )
    );


    setText(
        "pollsNeutralHeadline",
        formatPercentage(
            neutralPercentage
        )
    );


    setText(
        "pollsApprovalResponseCount",
        formatNumber(
            totalResponses
        )
    );

}


/*
==================================================
FORM STATE
==================================================
*/

function setSubmittingState(
    submitButton,
    isSubmitting
) {

    if (
        !submitButton
    ) {

        return;

    }


    submitButton.disabled =
        isSubmitting;


    submitButton.textContent =
        isSubmitting
            ? "Submitting..."
            : "Submit Response";

}


/*
==================================================
ENABLE FORM
==================================================
*/

function enableForm(
    form
) {

    if (!form) {

        return;

    }


    form
        .querySelectorAll(
            'input[name="presidentialApproval"]'
        )
        .forEach(
            input => {

                input.disabled =
                    false;

            }
        );


    const submitButton =
        form.querySelector(
            ".approval-poll__submit"
        );


    if (
        submitButton
    ) {

        submitButton.disabled =
            false;


        submitButton.textContent =
            "Submit Response";

    }

}


/*
==================================================
DISABLE FORM
==================================================
*/

function disableForm(
    form
) {

    if (!form) {

        return;

    }


    form
        .querySelectorAll(
            'input[name="presidentialApproval"]'
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
LOCK FORM AFTER RESPONSE
==================================================
*/

function lockForm(
    message
) {

    const form =
        document.getElementById(
            "pollsPresidentialApprovalForm"
        );


    if (!form) {

        return;

    }


    disableForm(
        form
    );


    const submitButton =
        form.querySelector(
            ".approval-poll__submit"
        );


    if (
        submitButton
    ) {

        submitButton.disabled =
            true;


        submitButton.textContent =
            "Response Submitted";

    }


    showMessage(
        message,
        "success"
    );

}


/*
==================================================
MESSAGE
==================================================
*/

function showMessage(
    message,
    type
) {

    const messageElement =
        document.getElementById(
            "pollsPresidentialApprovalMessage"
        );


    if (
        !messageElement
    ) {

        return;

    }


    messageElement.textContent =
        message;


    messageElement.dataset.messageType =
        type;

}


/*
==================================================
ERROR STATE
==================================================
*/

function renderLiveResultsError() {

    setText(
        "pollsApprovalHeadline",
        "—"
    );


    setText(
        "pollsDisapprovalHeadline",
        "—"
    );


    setText(
        "pollsNeutralHeadline",
        "—"
    );


    setText(
        "pollsApprovalResponseCount",
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


function formatPercentage(
    value
) {

    const percentage =
        Number(
            value
        );


    if (
        !Number.isFinite(
            percentage
        )
    ) {

        return "0.0%";

    }


    return `${percentage.toFixed(1)}%`;

}


/*
==================================================
CLEANUP
==================================================
*/

export function destroyPollsPresidentialApprovalController() {

    const form =
        document.getElementById(
            "pollsPresidentialApprovalForm"
        );


    if (
        form
    ) {

        form.removeEventListener(
            "submit",
            handleFormSubmit
        );

    }


    if (
        typeof unsubscribePulseSummary ===
        "function"
    ) {

        unsubscribePulseSummary();

    }


    unsubscribePulseSummary =
        null;


    controllerInitialized =
        false;

}