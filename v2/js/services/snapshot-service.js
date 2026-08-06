/*
==================================================
CIVIC HORIZON INDEX V2
HOMEPAGE SNAPSHOT SERVICE
==================================================
*/

import {
    subscribeToCommunitySurveys,
    subscribeToCommunityVotes
} from "./firebase-service.js";


/*
==================================================
INTERNAL STATE
==================================================
*/

let communitySurveys = [];
let communityVotes = [];

let surveysLoaded = false;
let votesLoaded = false;

const subscribers = new Set();


/*
==================================================
PUBLIC SUBSCRIPTION
==================================================
*/

export function subscribeToSnapshotSummary(
    callback,
    errorCallback = console.error
) {

    if (typeof callback !== "function") {

        throw new Error(
            "Snapshot callback must be a function."
        );

    }


    subscribers.add(callback);


    if (
        surveysLoaded &&
        votesLoaded
    ) {

        callback(
            createSnapshotSummary()
        );

    }


    const unsubscribeSurveys =
        subscribeToCommunitySurveys(
            surveys => {

                communitySurveys =
                    Array.isArray(surveys)
                        ? surveys
                        : [];

                surveysLoaded = true;

                notifySubscribers();

            },
            error => {

                console.error(
                    "Snapshot survey subscription error:",
                    error
                );

                errorCallback(error);

            }
        );


    const unsubscribeVotes =
        subscribeToCommunityVotes(
            votes => {

                communityVotes =
                    Array.isArray(votes)
                        ? votes
                        : [];

                votesLoaded = true;

                notifySubscribers();

            },
            error => {

                console.error(
                    "Snapshot vote subscription error:",
                    error
                );

                errorCallback(error);

            }
        );


    return function unsubscribeSnapshot() {

        subscribers.delete(callback);

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

    };

}


/*
==================================================
SUMMARY CALCULATION
==================================================
*/

export function createSnapshotSummary(
    surveys = communitySurveys,
    votes = communityVotes
) {

    const safeSurveys =
        Array.isArray(surveys)
            ? surveys
            : [];

    const safeVotes =
        Array.isArray(votes)
            ? votes
            : [];


    const activeSurveys =
        safeSurveys.filter(
            survey => {

                return (
                    survey &&
                    survey.active === true
                );

            }
        );


    return {

        activePollCount:
            activeSurveys.length,

        communityVoteCount:
            safeVotes.length,

        totalPollCount:
            safeSurveys.length,

        archivedPollCount:
            Math.max(
                0,
                safeSurveys.length -
                activeSurveys.length
            ),

        activeSurveys:
            [...activeSurveys],

        communityVotes:
            [...safeVotes]

    };

}


/*
==================================================
POLL-SPECIFIC HELPERS
==================================================
*/

export function getVotesForSurvey(
    surveyId,
    votes = communityVotes
) {

    if (!surveyId) {
        return [];
    }


    const safeVotes =
        Array.isArray(votes)
            ? votes
            : [];


    return safeVotes.filter(
        vote => {

            if (!vote) {
                return false;
            }

            return (
                vote.surveyId === surveyId ||
                vote.pollId === surveyId ||
                vote.surveyID === surveyId
            );

        }
    );

}


export function getMostParticipatedSurvey(
    surveys = communitySurveys,
    votes = communityVotes
) {

    const safeSurveys =
        Array.isArray(surveys)
            ? surveys
            : [];


    if (safeSurveys.length === 0) {
        return null;
    }


    const rankedSurveys =
        safeSurveys
            .map(survey => {

                return {

                    ...survey,

                    voteCount:
                        getVotesForSurvey(
                            survey.id,
                            votes
                        ).length

                };

            })
            .sort(
                (surveyA, surveyB) => {

                    return (
                        surveyB.voteCount -
                        surveyA.voteCount
                    );

                }
            );


    return rankedSurveys[0] || null;

}


/*
==================================================
SUBSCRIBER NOTIFICATION
==================================================
*/

function notifySubscribers() {

    if (
        !surveysLoaded ||
        !votesLoaded
    ) {
        return;
    }


    const summary =
        createSnapshotSummary();


    subscribers.forEach(
        callback => {

            try {

                callback(summary);

            } catch (error) {

                console.error(
                    "Snapshot subscriber error:",
                    error
                );

            }

        }
    );

}