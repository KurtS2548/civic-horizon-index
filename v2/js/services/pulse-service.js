/*
==================================================
CIVIC HORIZON INDEX V2
NATIONAL PULSE SERVICE
==================================================
*/

import {
    subscribeToPresidentialApproval,
    submitPresidentialApproval
} from "./firebase-service.js";


/*
==================================================
TRACKER DEFINITIONS
==================================================
*/

const presidentialApprovalChoices = [
    "Strongly Approve",
    "Approve",
    "Neutral",
    "Disapprove",
    "Strongly Disapprove"
];


/*
==================================================
LIVE PRESIDENTIAL APPROVAL SUBSCRIPTION
==================================================
*/

export function subscribeToPresidentialApprovalSummary(
    callback,
    errorCallback = console.error
) {

    if (typeof callback !== "function") {

        throw new Error(
            "Presidential approval callback must be a function."
        );

    }


    return subscribeToPresidentialApproval(
        responses => {

            const safeResponses =
                Array.isArray(responses)
                    ? responses
                    : [];

            callback(
                calculatePresidentialApprovalResults(
                    safeResponses
                )
            );

        },
        errorCallback
    );

}


/*
==================================================
RESULT CALCULATION
==================================================
*/

export function calculatePresidentialApprovalResults(
    responses
) {

    const safeResponses =
        Array.isArray(responses)
            ? responses
            : [];

    const counts =
        createEmptyApprovalCounts();


    safeResponses.forEach(record => {

        const response =
            record &&
            typeof record.response === "string"
                ? record.response.trim()
                : "";

        if (
            Object.prototype.hasOwnProperty.call(
                counts,
                response
            )
        ) {

            counts[response] += 1;

        }

    });


    const totalResponses =
        Object.values(counts)
            .reduce(
                (total, count) => {

                    return total + count;

                },
                0
            );


    const results =
        presidentialApprovalChoices
            .map(response => {

                const count =
                    counts[response];

                const percentage =
                    totalResponses > 0
                        ? (
                            count /
                            totalResponses
                        ) * 100
                        : 0;

                return {
                    response,
                    count,
                    percentage
                };

            });


    const approvalCount =
        counts["Strongly Approve"] +
        counts.Approve;

    const disapprovalCount =
        counts.Disapprove +
        counts["Strongly Disapprove"];


    const approvalPercentage =
        totalResponses > 0
            ? (
                approvalCount /
                totalResponses
            ) * 100
            : 0;

    const disapprovalPercentage =
        totalResponses > 0
            ? (
                disapprovalCount /
                totalResponses
            ) * 100
            : 0;

    const neutralPercentage =
        totalResponses > 0
            ? (
                counts.Neutral /
                totalResponses
            ) * 100
            : 0;


    return {
        trackerId:
            "presidentialApproval",

        trackerName:
            "Presidential Approval",

        question:
            "How would you rate the current president’s job performance?",

        choices:
            [...presidentialApprovalChoices],

        results,

        counts,

        totalResponses,

        approvalCount,

        disapprovalCount,

        approvalPercentage,

        disapprovalPercentage,

        neutralPercentage,

        updatedAt:
            new Date().toISOString()
    };

}


/*
==================================================
RESPONSE SUBMISSION
==================================================
*/

export async function submitPresidentialApprovalResponse(
    response
) {

    const normalizedResponse =
        typeof response === "string"
            ? response.trim()
            : "";


    if (
        !presidentialApprovalChoices.includes(
            normalizedResponse
        )
    ) {

        throw new Error(
            "Please select a valid presidential approval response."
        );

    }


    return submitPresidentialApproval(
        normalizedResponse
    );

}


/*
==================================================
DEVICE SUBMISSION STATE
==================================================
*/

const presidentialApprovalStorageKey =
    "chiPresidentialApprovalSubmitted";


export function hasSubmittedPresidentialApproval() {

    try {

        return (
            localStorage.getItem(
                presidentialApprovalStorageKey
            ) === "true"
        );

    } catch (error) {

        console.warn(
            "Presidential approval submission state could not be read:",
            error
        );

        return false;

    }

}


export function markPresidentialApprovalSubmitted() {

    try {

        localStorage.setItem(
            presidentialApprovalStorageKey,
            "true"
        );

    } catch (error) {

        console.warn(
            "Presidential approval submission state could not be saved:",
            error
        );

    }

}


export function clearPresidentialApprovalSubmissionState() {

    try {

        localStorage.removeItem(
            presidentialApprovalStorageKey
        );

    } catch (error) {

        console.warn(
            "Presidential approval submission state could not be cleared:",
            error
        );

    }

}


/*
==================================================
TRACKER HELPERS
==================================================
*/

export function getPresidentialApprovalChoices() {

    return [
        ...presidentialApprovalChoices
    ];

}


export function isValidPresidentialApprovalResponse(
    response
) {

    return (
        typeof response === "string" &&
        presidentialApprovalChoices.includes(
            response.trim()
        )
    );

}


/*
==================================================
INTERNAL HELPERS
==================================================
*/

function createEmptyApprovalCounts() {

    return presidentialApprovalChoices
        .reduce(
            (counts, response) => {

                counts[response] = 0;

                return counts;

            },
            {}
        );

}