/*
==================================================
CIVIC HORIZON INDEX V2
HOMEPAGE CONTROLLER
==================================================
*/

import {
    subscribeToNationalPrioritySummary
} from "./services/priority-service.js";

import {
    subscribeToSnapshotSummary
} from "./services/snapshot-service.js";

import {
    subscribeToPresidentialApprovalSummary,
    submitPresidentialApprovalResponse,
    hasSubmittedPresidentialApproval,
    markPresidentialApprovalSubmitted
} from "./services/pulse-service.js";


/*
==================================================
RESULT ELEMENT MAP
==================================================
*/

const approvalResultElements = {
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

let homepageControllerInitialized = false;

const unsubscribeFunctions = [];


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeHomepageController() {

    if (homepageControllerInitialized) {
        return;
    }

    homepageControllerInitialized = true;

    initializePresidentialApprovalForm();

    subscribeToPriorityData();
    subscribeToSnapshotData();
    subscribeToPulseData();

}


/*
==================================================
NATIONAL PRIORITIES
==================================================
*/

function subscribeToPriorityData() {

    const unsubscribe =
        subscribeToNationalPrioritySummary(
            summary => {

                renderNationalPrioritySummary(
                    summary
                );

            },
            error => {

                console.error(
                    "Homepage priority data error:",
                    error
                );

                renderNationalPriorityError();

            }
        );


    storeUnsubscribeFunction(
        unsubscribe
    );

}


function renderNationalPrioritySummary(
    summary
) {

    const participantCount =
        Number(
            summary.participantCount
        ) || 0;

    const topIssue =
        summary.topIssue;


    setText(
        "participantCount",
        formatNumber(
            participantCount
        )
    );

    setText(
        "snapshotParticipants",
        formatNumber(
            participantCount
        )
    );


    if (!topIssue) {

        setText(
            "topIssue",
            "Waiting for responses"
        );

        setText(
            "topScore",
            "0.0 / 10"
        );

        setText(
            "snapshotTopPriority",
            "No results yet"
        );

        return;
    }


    setText(
        "topIssue",
        topIssue.name
    );

    setText(
        "topScore",
        `${topIssue.average.toFixed(1)} / 10`
    );

    setText(
        "snapshotTopPriority",
        topIssue.name
    );

}


function renderNationalPriorityError() {

    setText(
        "participantCount",
        "—"
    );

    setText(
        "snapshotParticipants",
        "—"
    );

    setText(
        "topIssue",
        "Results unavailable"
    );

    setText(
        "topScore",
        "—"
    );

    setText(
        "snapshotTopPriority",
        "Unavailable"
    );

}


/*
==================================================
TODAY'S SNAPSHOT
==================================================
*/

function subscribeToSnapshotData() {

    const unsubscribe =
        subscribeToSnapshotSummary(
            summary => {

                setText(
                    "snapshotActivePolls",
                    formatNumber(
                        summary.activePollCount
                    )
                );

                setText(
                    "snapshotCommunityVotes",
                    formatNumber(
                        summary.communityVoteCount
                    )
                );

            },
            error => {

                console.error(
                    "Homepage snapshot data error:",
                    error
                );

                setText(
                    "snapshotActivePolls",
                    "—"
                );

                setText(
                    "snapshotCommunityVotes",
                    "—"
                );

            }
        );


    storeUnsubscribeFunction(
        unsubscribe
    );

}


/*
==================================================
NATIONAL PULSE RESULTS
==================================================
*/

function subscribeToPulseData() {

    const unsubscribe =
        subscribeToPresidentialApprovalSummary(
            summary => {

                renderPresidentialApprovalResults(
                    summary
                );

            },
            error => {

                console.error(
                    "Homepage pulse data error:",
                    error
                );

                renderPulseError();

            }
        );


    storeUnsubscribeFunction(
        unsubscribe
    );

}


function renderPresidentialApprovalResults(
    summary
) {

    setText(
        "pulseResponseCount",
        formatNumber(
            summary.totalResponses
        )
    );


    summary.results.forEach(
        result => {

            const elementMap =
                approvalResultElements[
                    result.response
                ];


            if (!elementMap) {
                return;
            }


            setText(
                elementMap.percentId,
                `${result.percentage.toFixed(1)}%`
            );


            setBarWidth(
                elementMap.barId,
                result.percentage
            );

        }
    );


    const updatedDate =
        new Date(
            summary.updatedAt
        );


    setText(
        "pulseUpdatedText",
        `Updated ${formatTime(updatedDate)}`
    );

}


function renderPulseError() {

    setText(
        "pulseResponseCount",
        "—"
    );

    setText(
        "pulseUpdatedText",
        "Results unavailable"
    );


    Object
        .values(
            approvalResultElements
        )
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

}


/*
==================================================
PRESIDENTIAL APPROVAL FORM
==================================================
*/

function initializePresidentialApprovalForm() {

    const form =
        document.getElementById(
            "presidentialApprovalForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        handlePresidentialApprovalSubmit
    );


    if (
        hasSubmittedPresidentialApproval()
    ) {

        lockPresidentialApprovalForm(
            "You have already responded to this tracker on this device."
        );

    }

}


async function handlePresidentialApprovalSubmit(
    event
) {

    event.preventDefault();


    const form =
        event.currentTarget;

    const submitButton =
        form.querySelector(
            ".pulse-poll__submit"
        );

    const selectedInput =
        form.querySelector(
            'input[name="presidentialApproval"]:checked'
        );


    if (
        hasSubmittedPresidentialApproval()
    ) {

        lockPresidentialApprovalForm(
            "You have already responded to this tracker on this device."
        );

        return;

    }


    if (!selectedInput) {

        showPulseMessage(
            "Please select one response.",
            "error"
        );

        return;

    }


    setPulseFormBusy(
        true,
        submitButton
    );


    showPulseMessage(
        "Saving your response...",
        "info"
    );


    try {

        await submitPresidentialApprovalResponse(
            selectedInput.value
        );


        markPresidentialApprovalSubmitted();


        lockPresidentialApprovalForm(
            "Thank you. Your response has been recorded."
        );

    } catch (error) {

        console.error(
            "Presidential approval submission error:",
            error
        );


        setPulseFormBusy(
            false,
            submitButton
        );


        showPulseMessage(
            "Your response could not be submitted. Please try again.",
            "error"
        );

    }

}


function setPulseFormBusy(
    isBusy,
    submitButton
) {

    if (!submitButton) {
        return;
    }


    submitButton.disabled =
        isBusy;

    submitButton.textContent =
        isBusy
            ? "Submitting..."
            : "Submit Response";

}


function lockPresidentialApprovalForm(
    message
) {

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


    showPulseMessage(
        message,
        "success"
    );

}


function showPulseMessage(
    message,
    messageType
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
        messageType;

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
GENERAL HELPERS
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


function formatTime(
    date
) {

    if (
        !(date instanceof Date) ||
        Number.isNaN(
            date.getTime()
        )
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


function storeUnsubscribeFunction(
    unsubscribe
) {

    if (
        typeof unsubscribe ===
        "function"
    ) {

        unsubscribeFunctions.push(
            unsubscribe
        );

    }

}


/*
==================================================
CLEANUP
==================================================
*/

window.addEventListener(
    "beforeunload",
    () => {

        unsubscribeFunctions
            .forEach(
                unsubscribe => {

                    try {

                        unsubscribe();

                    } catch (error) {

                        console.warn(
                            "Homepage subscription cleanup error:",
                            error
                        );

                    }

                }
            );

    }
);