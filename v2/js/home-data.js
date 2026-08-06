/*
==================================================
CIVIC HORIZON INDEX V2
HOMEPAGE LIVE DATA
==================================================
*/

import {
    subscribeToPrioritySubmissions,
    subscribeToCommunitySurveys,
    subscribeToCommunityVotes,
    subscribeToPresidentialApproval,
    submitPresidentialApproval
} from "./services/firebase-service.js";


/*
==================================================
NATIONAL PRIORITY DEFINITIONS
==================================================
*/

const nationalIssues = [
    {
        id: "economy",
        name: "Economy & Cost of Living"
    },
    {
        id: "healthcare",
        name: "Healthcare"
    },
    {
        id: "education",
        name: "Education"
    },
    {
        id: "housing",
        name: "Housing"
    },
    {
        id: "immigration",
        name: "Immigration"
    },
    {
        id: "publicSafety",
        name: "Public Safety"
    },
    {
        id: "nationalSecurity",
        name: "National Security"
    },
    {
        id: "environment",
        name: "Environment"
    },
    {
        id: "governmentAccountability",
        name: "Government Accountability"
    },
    {
        id: "childrenFamilies",
        name: "Children & Families"
    }
];


const approvalChoices = [
    {
        response: "Strongly Approve",
        percentId: "stronglyApprovePercent",
        barId: "stronglyApproveBar"
    },
    {
        response: "Approve",
        percentId: "approvePercent",
        barId: "approveBar"
    },
    {
        response: "Neutral",
        percentId: "neutralPercent",
        barId: "neutralBar"
    },
    {
        response: "Disapprove",
        percentId: "disapprovePercent",
        barId: "disapproveBar"
    },
    {
        response: "Strongly Disapprove",
        percentId: "stronglyDisapprovePercent",
        barId: "stronglyDisapproveBar"
    }
];


/*
==================================================
PAGE DATA
==================================================
*/

let prioritySubmissions = [];
let communitySurveys = [];
let communityVotes = [];
let presidentialApprovalResponses = [];

let homepageInitialized = false;


/*
==================================================
INITIALIZATION
==================================================
*/

export function initializeHomepageData() {

    if (homepageInitialized) {
        return;
    }

    homepageInitialized = true;

    initializePresidentialApprovalForm();
    startLiveSubscriptions();

}


function startLiveSubscriptions() {

    subscribeToPrioritySubmissions(
        submissions => {

            prioritySubmissions = submissions;

            updateNationalPriorityData();

        },
        error => {

            console.error(
                "Priority submission subscription error:",
                error
            );

            showNationalDataError();

        }
    );


    subscribeToCommunitySurveys(
        surveys => {

            communitySurveys = surveys;

            updateSnapshot();

        },
        error => {

            console.error(
                "Community survey subscription error:",
                error
            );

        }
    );


    subscribeToCommunityVotes(
        votes => {

            communityVotes = votes;

            updateSnapshot();

        },
        error => {

            console.error(
                "Community vote subscription error:",
                error
            );

        }
    );


    subscribeToPresidentialApproval(
        responses => {

            presidentialApprovalResponses =
                responses;

            renderPresidentialApprovalResults();

        },
        error => {

            console.error(
                "Presidential approval subscription error:",
                error
            );

            showPulseError();

        }
    );

}


/*
==================================================
NATIONAL PRIORITY DATA
==================================================
*/

function updateNationalPriorityData() {

    const rankings =
        calculateNationalPriorityRankings();

    const topIssue =
        rankings[0];

    const participantCount =
        prioritySubmissions.length;


    setText(
        "participantCount",
        participantCount.toLocaleString()
    );

    setText(
        "snapshotParticipants",
        participantCount.toLocaleString()
    );


    if (
        !topIssue ||
        participantCount === 0
    ) {

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


function calculateNationalPriorityRankings() {

    const totals = {};
    const counts = {};


    nationalIssues.forEach(issue => {

        totals[issue.id] = 0;
        counts[issue.id] = 0;

    });


    prioritySubmissions.forEach(
        submission => {

            const ratings =
                submission.ratings || {};

            nationalIssues.forEach(
                issue => {

                    const rating =
                        Number(
                            ratings[issue.id]
                        );

                    if (
                        Number.isFinite(rating) &&
                        rating >= 1 &&
                        rating <= 10
                    ) {

                        totals[issue.id] +=
                            rating;

                        counts[issue.id] +=
                            1;

                    }

                }
            );

        }
    );


    return nationalIssues
        .map(issue => {

            const responseCount =
                counts[issue.id];

            const average =
                responseCount > 0
                    ? totals[issue.id] /
                        responseCount
                    : 0;

            return {
                ...issue,
                average,
                responseCount
            };

        })
        .sort(
            (issueA, issueB) => {

                return (
                    issueB.average -
                    issueA.average
                );

            }
        );

}


/*
==================================================
TODAY'S SNAPSHOT
==================================================
*/

function updateSnapshot() {

    const activePollCount =
        communitySurveys.filter(
            survey => {

                return survey.active === true;

            }
        ).length;


    setText(
        "snapshotActivePolls",
        activePollCount.toLocaleString()
    );

    setText(
        "snapshotCommunityVotes",
        communityVotes.length.toLocaleString()
    );

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


    const hasAlreadyVoted =
        localStorage.getItem(
            "chiPresidentialApprovalSubmitted"
        ) === "true";


    if (hasAlreadyVoted) {

        lockPresidentialApprovalForm(
            "You have already responded to this tracker on this device."
        );

    }


    form.addEventListener(
        "submit",
        handlePresidentialApprovalSubmit
    );

}


async function handlePresidentialApprovalSubmit(
    event
) {

    event.preventDefault();

    const form =
        event.currentTarget;

    const message =
        document.getElementById(
            "presidentialApprovalMessage"
        );

    const submitButton =
        form.querySelector(
            ".pulse-poll__submit"
        );

    const selectedResponse =
        form.querySelector(
            'input[name="presidentialApproval"]:checked'
        );


    if (
        localStorage.getItem(
            "chiPresidentialApprovalSubmitted"
        ) === "true"
    ) {

        setMessage(
            message,
            "You have already responded to this tracker on this device.",
            "info"
        );

        return;
    }


    if (!selectedResponse) {

        setMessage(
            message,
            "Please select one response.",
            "error"
        );

        return;
    }


    submitButton.disabled = true;

    submitButton.textContent =
        "Submitting...";

    setMessage(
        message,
        "Saving your response...",
        "info"
    );


    try {

        await submitPresidentialApproval(
            selectedResponse.value
        );


        localStorage.setItem(
            "chiPresidentialApprovalSubmitted",
            "true"
        );


        lockPresidentialApprovalForm(
            "Thank you. Your response has been recorded."
        );

    } catch (error) {

        console.error(
            "Presidential approval submission error:",
            error
        );

        submitButton.disabled = false;

        submitButton.textContent =
            "Submit Response";

        setMessage(
            message,
            "Your response could not be submitted. Please try again.",
            "error"
        );

    }

}


function lockPresidentialApprovalForm(
    messageText
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
            "input"
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


    const message =
        document.getElementById(
            "presidentialApprovalMessage"
        );


    setMessage(
        message,
        messageText,
        "success"
    );

}


/*
==================================================
PRESIDENTIAL APPROVAL RESULTS
==================================================
*/

function renderPresidentialApprovalResults() {

    const responseCounts = {};


    approvalChoices.forEach(choice => {

        responseCounts[choice.response] = 0;

    });


    presidentialApprovalResponses.forEach(
        record => {

            const response =
                record.response;

            if (
                Object.prototype.hasOwnProperty.call(
                    responseCounts,
                    response
                )
            ) {

                responseCounts[response] += 1;

            }

        }
    );


    const totalResponses =
        presidentialApprovalResponses.length;


    setText(
        "pulseResponseCount",
        totalResponses.toLocaleString()
    );


    approvalChoices.forEach(choice => {

        const responseCount =
            responseCounts[
                choice.response
            ];

        const percentage =
            totalResponses > 0
                ? (
                    responseCount /
                    totalResponses
                ) * 100
                : 0;


        setText(
            choice.percentId,
            `${percentage.toFixed(1)}%`
        );


        const bar =
            document.getElementById(
                choice.barId
            );

        if (bar) {

            bar.style.width =
                `${percentage}%`;

        }

    });


    setText(
        "pulseUpdatedText",
        `Updated ${formatCurrentTime()}`
    );

}


/*
==================================================
ERROR STATES
==================================================
*/

function showNationalDataError() {

    setText(
        "topIssue",
        "Results unavailable"
    );

    setText(
        "topScore",
        "—"
    );

    setText(
        "snapshotParticipants",
        "—"
    );

    setText(
        "snapshotTopPriority",
        "Unavailable"
    );

}


function showPulseError() {

    setText(
        "pulseUpdatedText",
        "Results unavailable"
    );

}


/*
==================================================
HELPERS
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

    if (element) {

        element.textContent =
            value;

    }

}


function setMessage(
    element,
    message,
    type
) {

    if (!element) {
        return;
    }


    element.textContent =
        message;

    element.dataset.messageType =
        type;

}


function formatCurrentTime() {

    return new Date().toLocaleTimeString(
        undefined,
        {
            hour: "