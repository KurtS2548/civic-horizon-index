/*
==================================================
CIVIC HORIZON INDEX V2
NATIONAL PRIORITIES SERVICE
==================================================
*/

import {
    subscribeToPrioritySubmissions,
    submitPrioritySubmission
} from "./firebase-service.js";


/*
==================================================
NATIONAL ISSUE DEFINITIONS
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


/*
==================================================
PUBLIC SUBSCRIPTION
==================================================
*/

export function subscribeToNationalPrioritySummary(
    callback,
    errorCallback = console.error
) {

    return subscribeToPrioritySubmissions(
        submissions => {

            const rankings =
                calculatePriorityRankings(
                    submissions
                );

            const topIssue =
                getTopIssue(
                    rankings,
                    submissions.length
                );

            callback({
                submissions,
                rankings,
                topIssue,
                participantCount:
                    submissions.length
            });

        },
        errorCallback
    );

}


/*
==================================================
SUBMISSION
==================================================
*/

export async function submitNationalPriorityRatings(
    ratings,
    additionalData = {}
) {

    const validatedRatings =
        validatePriorityRatings(
            ratings
        );


    return submitPrioritySubmission(
        validatedRatings,
        additionalData
    );

}


/*
==================================================
VALIDATION
==================================================
*/

export function validatePriorityRatings(
    ratings
) {

    if (
        !ratings ||
        typeof ratings !== "object"
    ) {

        throw new Error(
            "National priority ratings are required."
        );

    }


    const validatedRatings = {};


    nationalIssues.forEach(issue => {

        const rating =
            Number(
                ratings[issue.id]
            );


        if (
            !Number.isFinite(rating) ||
            rating < 1 ||
            rating > 10
        ) {

            throw new Error(
                `A valid rating from 1 to 10 is required for ${issue.name}.`
            );

        }


        validatedRatings[
            issue.id
        ] = rating;

    });


    return validatedRatings;

}


/*
==================================================
RANKING CALCULATION
==================================================
*/

export function calculatePriorityRankings(
    submissions
) {

    const safeSubmissions =
        Array.isArray(submissions)
            ? submissions
            : [];

    const totals = {};
    const counts = {};


    nationalIssues.forEach(issue => {

        totals[issue.id] = 0;
        counts[issue.id] = 0;

    });


    safeSubmissions.forEach(submission => {

        const ratings =
            submission &&
            typeof submission.ratings === "object"
                ? submission.ratings
                : {};

        nationalIssues.forEach(issue => {

            const rating =
                Number(
                    ratings[issue.id]
                );

            if (
                Number.isFinite(rating) &&
                rating >= 1 &&
                rating <= 10
            ) {

                totals[issue.id] += rating;
                counts[issue.id] += 1;

            }

        });

    });


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
                id: issue.id,
                name: issue.name,
                average,
                responseCount
            };

        })
        .sort((issueA, issueB) => {

            if (
                issueB.average !==
                issueA.average
            ) {

                return (
                    issueB.average -
                    issueA.average
                );

            }

            return (
                issueA.name.localeCompare(
                    issueB.name
                )
            );

        });

}


/*
==================================================
SUMMARY HELPERS
==================================================
*/

export function getTopIssue(
    rankings,
    participantCount
) {

    if (
        !Array.isArray(rankings) ||
        rankings.length === 0 ||
        participantCount === 0
    ) {

        return null;

    }


    const topIssue =
        rankings[0];


    if (
        !topIssue ||
        topIssue.responseCount === 0
    ) {

        return null;

    }


    return topIssue;

}


export function getNationalAverage(
    rankings
) {

    if (!Array.isArray(rankings)) {
        return 0;
    }


    const ratedIssues =
        rankings.filter(issue => {

            return (
                issue.responseCount > 0
            );

        });


    if (ratedIssues.length === 0) {
        return 0;
    }


    const total =
        ratedIssues.reduce(
            (sum, issue) => {

                return (
                    sum +
                    issue.average
                );

            },
            0
        );


    return total / ratedIssues.length;

}


export function getNationalIssues() {

    return nationalIssues.map(issue => {

        return {
            ...issue
        };

    });

}