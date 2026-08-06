/*
==================================================
CIVIC HORIZON INDEX V2
NATIONAL PULSE CONTROLLER
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
RESULT ELEMENT MAP
==================================================
*/

const resultElements = {
    "Strongly Approve": {
        percentId: "stronglyApprovePercent",
        barId: "stronglyApproveBar"
    },

    "Approve": {
        percentId: "approvePercent",
        barId: "approveBar"
    },

    "Neutral": {
        percentId: "neutralPercent",
        barId: "neutralBar"
    },

    "Disapprove": {
        percentId: "disapprovePercent",
        barId: "disapproveBar"
    },

    "Strongly Disapprove": {
        percentId: "stronglyDisapprovePercent",
        barId: "stronglyDisapproveBar"
    }
};


/*
==================================================
CONTROLLER STATE
==================================================
*/

let nationalPulseControllerInitialized = false;

let unsubscribePulseSummary = null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeNationalPulseController() {

    if (nationalPulseControllerInitialized) {
        return;
    }

    nationalPulseControllerInitialized = true;

    initializeApprovalForm();
    subscribeToApprovalData();

}


/*
==================================================
LIVE RESULTS
==================================================
*/

function subscribeToApprovalData() {

    unsubscribePulseSummary =
        subscribeToPresidentialApprovalSummary(
            summary => {

                renderApprovalResults(summary);

            },
            error => {

                console.error(
                    "National Pulse data error:",
                    error
                );

                renderApprovalError();

            }
        );

}


function renderApprovalResults(summary) {

    const totalResponses =
        Number(summary?.totalResponses) || 0;

    const results =
        Array.isArray(summary?.results)
            ? summary.results
            : [];


    setText(
        "pulseResponseCount",
        formatNumber(totalResponses)
    );


    results.forEach(result => {

        const elementMap =
            resultElements[result.response];

        if (!elementMap) {
            return;
        }


        const percentage =
            Number(result.percentage) || 0;


        setText(
            elementMap.percentId,
            `${percentage.toFixed(1)}%`
        );


        setBarWidth(
            elementMap.barId,
            percentage
        );

    });


    const updatedAt =
        summary?.updatedAt
            ? new Date(summary.updatedAt)
            : new Date();


    setText(
        "pulseUpdatedText",
        `Updated ${formatTime(updatedAt)}`
    );

}


/*
==================================================
FORM INITIALIZATION
==================================================
*/

function initializeApprovalForm() {

    const form =
        document.getElementById(
            "presidentialApprovalForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        handleApprovalSubmit
    );


    if (
        hasSubmittedPresidentialApproval()
    ) {

        lockApprovalForm(
            "You have already responded to this tracker on this device."
        );

    }

}


/*
==================================================
FORM SUBMISSION
==================================================
*/

async function handleApprovalSubmit(event) {

    event.preventDefault();


    const form =
        event.currentTarget;

    const selectedInput =
        form.querySelector(
            'input[name="presidentialApproval"]:checked'
        );

    const submitButton =
        form.querySelector(
            ".pulse-poll__submit"
        );


    if (
        hasSubmittedPresidentialApproval()
    ) {

        lockApprovalForm(
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


        lockApprovalForm(
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


function lockApprovalForm(message) {

    const form =
        document.getElementById(
            "presidentialApprovalForm"
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
            ".pulse-poll__submit"
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
ERROR STATE
==================================================
*/

function renderApprovalError() {

    setText(
        "pulseResponseCount",
        "—"
    );

    setText(
        "pulseUpdatedText",
        "Results unavailable"
    );


    Object
        .values(resultElements)
        .forEach(elementMap => {

            setText(
                elementMap.percentId,
                "—"
            );

            setBarWidth(
                elementMap.barId,
                0
            );

        });


    const submitButton =
        document.querySelector(
            ".pulse-poll__submit"
        );


    if (submitButton) {

        submitButton.disabled = true;

    }


    showMessage(
        "Live voting is temporarily unavailable.",
        "error"
    );

}


/*
==================================================
MESSAGE HELPER
==================================================
*/

function showMessage(
    message,
    type
) {

    const messageElement =
        document.getElementById(
            "presidentialApprovalMessage"
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


function setBarWidth(
    elementId,
    percentage
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {
        return;
    }


    const safePercentage =
        Math.max(
            0,
            Math.min(
                100,
                Number(percentage) || 0
            )
        );


    element.style.width =
        `${safePercentage}%`;

}


/*
==================================================
FORMAT HELPERS
==================================================
*/

function formatNumber(value) {

    const number =
        Number(value);


    if (!Number.isFinite(number)) {
        return "0";
    }


    return number.toLocaleString();

}


function formatTime(date) {

    if (
        !(date instanceof Date) ||
        Number.isNaN(date.getTime())
    ) {

        return "live";

    }


    return date.toLocaleTimeString(
        undefined,
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );

}


/*
==================================================
CLEANUP
==================================================
*/

export function destroyNationalPulseController() {

    if (
        typeof unsubscribePulseSummary ===
        "function"
    ) {

        unsubscribePulseSummary();

    }


    const form =
        document.getElementById(
            "presidentialApprovalForm"
        );


    if (form) {

        form.removeEventListener(
            "submit",
            handleApprovalSubmit
        );

    }


    unsubscribePulseSummary = null;

    nationalPulseControllerInitialized = false;

}