/*
==================================================
CIVIC HORIZON INDEX V2
POLLS PRESIDENTIAL APPROVAL CONTROLLER
==================================================
*/

import {
    subscribeToPresidentialApprovalSummary,
    submitPresidentialApprovalResponse,
    hasSubmittedPresidentialApproval,
    markPresidentialApprovalSubmitted
} from "../services/pulse-service.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let controllerInitialized = false;

let unsubscribePulseSummary = null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializePollsPresidentialApprovalController() {

    if (controllerInitialized) {
        return;
    }

    controllerInitialized = true;

    initializeForm();
    subscribeToLiveResults();

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


    if (
        hasSubmittedPresidentialApproval()
    ) {

        lockForm(
            "You have already responded to this tracker on this device."
        );

    }

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


    if (
        hasSubmittedPresidentialApproval()
    ) {

        lockForm(
            "You have already responded to this tracker on this device."
        );

        return;

    }


    if (!selectedInput) {

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
            "Your response could not be submitted. Please try again.",
            "error"
        );

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

                renderLiveResults(summary);

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


function renderLiveResults(
    summary
) {

    const totalResponses =
        Number(
            summary?.totalResponses
        ) || 0;

    const approvalPercentage =
        Number(
            summary?.approvalPercentage
        ) || 0;

    const disapprovalPercentage =
        Number(
            summary?.disapprovalPercentage
        ) || 0;

    const neutralPercentage =
        Number(
            summary?.neutralPercentage
        ) || 0;


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

    if (!submitButton) {
        return;
    }


    submitButton.disabled =
        isSubmitting;


    submitButton.textContent =
        isSubmitting
            ? "Submitting..."
            : "Submit Response";

}


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


    form
        .querySelectorAll(
            'input[name="presidentialApproval"]'
        )
        .forEach(input => {

            input.disabled = true;

        });


    const submitButton =
        form.querySelector(
            ".approval-poll__submit"
        );


    if (submitButton) {

        submitButton.disabled = true;

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


    if (!messageElement) {
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


function formatPercentage(
    value
) {

    const percentage =
        Number(value);


    if (!Number.isFinite(percentage)) {
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


    if (form) {

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


    unsubscribePulseSummary = null;

    controllerInitialized = false;

}