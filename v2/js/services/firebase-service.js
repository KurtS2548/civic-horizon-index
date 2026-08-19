/*
==================================================
CIVIC HORIZON INDEX V2
SHARED FIREBASE SERVICE

MONTHLY VOTING SYSTEM
==================================================
*/


import {

    auth,

    database

} from "../../../js/firebase.js";


import {

    ref,

    onValue,

    push,

    set,

    get,

    update

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/*
==================================================
EXISTING DATABASE REFERENCES
==================================================
*/

const prioritySubmissionsRef =
    ref(
        database,
        "prioritySubmissions"
    );


const communitySurveysRef =
    ref(
        database,
        "createdSurveys"
    );


const communityVotesRef =
    ref(
        database,
        "votes"
    );


const presidentialApprovalRef =
    ref(
        database,
        "civicPulse/presidentialApproval/responses"
    );


const countryDirectionRef =
    ref(
        database,
        "civicPulse/countryDirection/responses"
    );


const nationalConfidenceRef =
    ref(
        database,
        "civicPulse/nationalConfidence/responses"
    );


/*
==================================================
MONTHLY TRACKERS
==================================================
*/

const weeklyTrackerNames = [

    "presidentialApproval",

    "countryDirection"

];


const monthlyTrackerNames = [

    "nationalPriorities",

    "nationalConfidence"

];


/*
==================================================
CURRENT VOTING PERIOD

Automatically returns:

2026-08
2026-09
2026-12
2027-01

No manual reset is required.
==================================================
*/

export function getCurrentVotingPeriod() {

    const easternParts =
        getEasternDateParts();


    const year =
        easternParts.year;


    const month =
        String(
            easternParts.month
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}`;

}

    /*
==================================================
CURRENT WEEKLY VOTING PERIOD
MONDAY 12:00 AM EASTERN
==================================================
*/

export function getCurrentWeeklyVotingPeriod() {

    const easternParts =
        getEasternDateParts();


    const weekdayIndexes = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6
    };


    const weekdayIndex =
        weekdayIndexes[
            easternParts.weekday
        ];


    const daysSinceMonday =
        (
            weekdayIndex + 6
        ) % 7;


    const easternCalendarDate =
        new Date(
            Date.UTC(
                easternParts.year,
                easternParts.month - 1,
                easternParts.day
            )
        );


    easternCalendarDate.setUTCDate(
        easternCalendarDate.getUTCDate() -
        daysSinceMonday
    );


    const year =
        easternCalendarDate.getUTCFullYear();


    const month =
        String(
            easternCalendarDate.getUTCMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            easternCalendarDate.getUTCDate()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}`;

}


/*
==================================================
CURRENT WEEKLY VOTING PERIOD LABEL
==================================================
*/

export function getCurrentWeeklyVotingPeriodLabel() {

    const period =
        getCurrentWeeklyVotingPeriod();


    const [
        year,
        month,
        day
    ] =
        period
            .split("-")
            .map(
                Number
            );


    const monday =
        new Date(
            Date.UTC(
                year,
                month - 1,
                day
            )
        );


    const sunday =
        new Date(
            monday
        );


    sunday.setUTCDate(
        sunday.getUTCDate() + 6
    );


    const formatter =
        new Intl.DateTimeFormat(
            "en-US",
            {
                month: "short",
                day: "numeric",
                timeZone: "UTC"
            }
        );


    return (
        `${formatter.format(monday)} – ` +
        `${formatter.format(sunday)}`
    );

}


/*
==================================================
EASTERN DATE PARTS
==================================================
*/

function getEasternDateParts() {

    const formatter =
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone:
                    "America/New_York",

                weekday:
                    "long",

                year:
                    "numeric",

                month:
                    "numeric",

                day:
                    "numeric"
            }
        );


    const parts =
        formatter.formatToParts(
            new Date()
        );


    const values =
        {};


    parts.forEach(
        part => {

            if (
                part.type !==
                "literal"
            ) {

                values[
                    part.type
                ] =
                    part.value;

            }

        }
    );


    return {

        year:
            Number(
                values.year
            ),

        month:
            Number(
                values.month
            ),

        day:
            Number(
                values.day
            ),

        weekday:
            values.weekday

    };


}


/*
==================================================
VOTING PERIOD LABEL
==================================================
*/

export function getCurrentVotingPeriodLabel() {

    const votingPeriod =
        getCurrentVotingPeriod();


    const [
        year,
        month
    ] =
        votingPeriod
            .split("-")
            .map(
                Number
            );


    const periodDate =
        new Date(
            Date.UTC(
                year,
                month - 1,
                1
            )
        );


    return periodDate.toLocaleDateString(
        "en-US",
        {
            month:
                "long",

            year:
                "numeric",

            timeZone:
                "UTC"
        }
    );

}


/*
==================================================
CURRENT VERIFIED USER
==================================================
*/

function getVerifiedCurrentUser() {

    const user =
        auth.currentUser;


    if (!user) {

        throw new Error(
            "You must sign in before participating."
        );

    }


    if (
        !user.emailVerified
    ) {

        throw new Error(
            "Please verify your email before participating."
        );

    }


    return user;

}


/*
==================================================
VALIDATE MONTHLY TRACKER
==================================================
*/

function validateMonthlyTracker(
    tracker
) {

    if (
        !monthlyTrackerNames.includes(
            tracker
        )
    ) {

        throw new Error(
            "Invalid monthly voting tracker."
        );

    }


    return tracker;

}

/*
==================================================
VALIDATE WEEKLY TRACKER
==================================================
*/

function validateWeeklyTracker(
    tracker
) {

    if (
        !weeklyTrackerNames.includes(
            tracker
        )
    ) {

        throw new Error(
            "Invalid weekly voting tracker."
        );

    }


    return tracker;

}


/*
==================================================
MONTHLY PARTICIPANT REFERENCE

Structure:

monthlyVotes/
    YYYY-MM/
        tracker/
            Firebase UID
==================================================
*/

function getMonthlyParticipantReference(
    tracker,
    userId = ""
) {

    const validatedTracker =
        validateMonthlyTracker(
            tracker
        );


    const user =
        auth.currentUser;


    const uid =
        userId ||
        user?.uid ||
        "";


    if (!uid) {

        throw new Error(
            "A signed-in participant is required."
        );

    }


    const votingPeriod =
        getCurrentVotingPeriod();


    return ref(
        database,
        `monthlyVotes/${votingPeriod}/${validatedTracker}/${uid}`
    );

}

/*
==================================================
WEEKLY PARTICIPANT REFERENCE

Structure:

weeklyVotes/
    YYYY-MM-DD/
        tracker/
            Firebase UID
==================================================
*/

function getWeeklyParticipantReference(
    tracker,
    userId = ""
) {

    const validatedTracker =
        validateWeeklyTracker(
            tracker
        );


    const user =
        auth.currentUser;


    const uid =
        userId ||
        user?.uid ||
        "";


    if (!uid) {

        throw new Error(
            "A signed-in participant is required."
        );

    }


    const votingPeriod =
        getCurrentWeeklyVotingPeriod();


    return ref(
        database,
        `weeklyVotes/${votingPeriod}/${validatedTracker}/${uid}`
    );

}


/*
==================================================
HAS PARTICIPATED THIS MONTH
==================================================
*/

export async function hasParticipatedThisMonth(
    tracker
) {

    const user =
        auth.currentUser;


    if (!user) {

        return false;

    }


    const monthlyReference =
        getMonthlyParticipantReference(
            tracker,
            user.uid
        );


    const snapshot =
        await get(
            monthlyReference
        );


    return snapshot.exists();

}

/*
==================================================
HAS PARTICIPATED THIS WEEK
==================================================
*/

export async function hasParticipatedThisWeek(
    tracker
) {

    const user =
        auth.currentUser;


    if (!user) {

        return false;

    }


    const weeklyReference =
        getWeeklyParticipantReference(
            tracker,
            user.uid
        );


    const snapshot =
        await get(
            weeklyReference
        );


    return snapshot.exists();

}


/*
==================================================
GET CURRENT MONTHLY RESPONSE
==================================================
*/

export async function getMyCurrentMonthlyVote(
    tracker
) {

    const user =
        auth.currentUser;


    if (!user) {

        return null;

    }


    const votingPeriod =
        getCurrentVotingPeriod();


    const monthlyReference =
        getMonthlyParticipantReference(
            tracker,
            user.uid
        );


    const snapshot =
        await get(
            monthlyReference
        );


    if (
        !snapshot.exists()
    ) {

        return null;

    }


    return {

        id:
            user.uid,

        votingPeriod,

        ...snapshot.val()

    };

}


/*
==================================================
MONTHLY PARTICIPATION STATUS
==================================================
*/

export async function getMonthlyParticipationStatus(
    tracker
) {

    const user =
        auth.currentUser;


    const votingPeriod =
        getCurrentVotingPeriod();


    const votingPeriodLabel =
        getCurrentVotingPeriodLabel();


    if (!user) {

        return {

            eligible:
                false,

            reason:
                "signedOut",

            alreadyParticipated:
                false,

            votingPeriod,

            votingPeriodLabel

        };

    }


    if (
        !user.emailVerified
    ) {

        return {

            eligible:
                false,

            reason:
                "emailNotVerified",

            alreadyParticipated:
                false,

            votingPeriod,

            votingPeriodLabel

        };

    }


    const alreadyParticipated =
        await hasParticipatedThisMonth(
            tracker
        );


    if (
        alreadyParticipated
    ) {

        return {

            eligible:
                false,

            reason:
                "alreadyParticipatedThisMonth",

            alreadyParticipated:
                true,

            votingPeriod,

            votingPeriodLabel

        };

    }


    return {

        eligible:
            true,

        reason:
            "eligible",

        alreadyParticipated:
            false,

        votingPeriod,

        votingPeriodLabel

    };

}

/*
==================================================
WEEKLY PARTICIPATION STATUS
==================================================
*/

export async function getWeeklyParticipationStatus(
    tracker
) {

    const user =
        auth.currentUser;


    const votingPeriod =
        getCurrentWeeklyVotingPeriod();


    const votingPeriodLabel =
        getCurrentWeeklyVotingPeriodLabel();


    if (!user) {

        return {

            eligible:
                false,

            reason:
                "signedOut",

            alreadyParticipated:
                false,

            votingPeriod,

            votingPeriodLabel

        };

    }


    if (
        !user.emailVerified
    ) {

        return {

            eligible:
                false,

            reason:
                "emailNotVerified",

            alreadyParticipated:
                false,

            votingPeriod,

            votingPeriodLabel

        };

    }


    const alreadyParticipated =
        await hasParticipatedThisWeek(
            tracker
        );


    if (
        alreadyParticipated
    ) {

        return {

            eligible:
                false,

            reason:
                "alreadyParticipatedThisWeek",

            alreadyParticipated:
                true,

            votingPeriod,

            votingPeriodLabel

        };

    }


    return {

        eligible:
            true,

        reason:
            "eligible",

        alreadyParticipated:
            false,

        votingPeriod,

        votingPeriodLabel

    };

}


/*
==================================================
SAVE MONTHLY VOTE

This is the private Firebase UID-based record that
prevents duplicate voting during the same month.

Firebase Rules provide the final enforcement layer.
==================================================
*/

async function saveMonthlyVote(
    tracker,
    responseData
) {

    const user =
        getVerifiedCurrentUser();


    const validatedTracker =
        validateMonthlyTracker(
            tracker
        );


    if (
        !responseData ||
        typeof responseData !==
            "object"
    ) {

        throw new Error(
            "Valid monthly voting data is required."
        );

    }


    const votingPeriod =
        getCurrentVotingPeriod();


    const monthlyReference =
        getMonthlyParticipantReference(
            validatedTracker,
            user.uid
        );


    /*
    ----------------------------------------------
    FRIENDLY DUPLICATE CHECK

    Firebase Rules also prevent overwriting the
    record. This check simply gives the participant
    a clearer message before the write is attempted.
    ----------------------------------------------
    */

    const existingSnapshot =
        await get(
            monthlyReference
        );


    if (
        existingSnapshot.exists()
    ) {

        const error =
            new Error(
                `You have already participated in ${getCurrentVotingPeriodLabel()}. Voting will reopen automatically next month.`
            );


        error.code =
            "already-participated-this-month";


        throw error;

    }


    const record = {

        ...responseData,

        votingPeriod

    };


    await set(
        monthlyReference,
        record
    );


    return {

        id:
            user.uid,

        votingPeriod,

        ...record

    };

}


/*
==================================================
LIVE DATA SUBSCRIPTIONS

These continue reading the existing public result
paths during the monthly-voting migration.
==================================================
*/

export function subscribeToPrioritySubmissions(
    callback,
    errorCallback = console.error
) {

    return onValue(
        prioritySubmissionsRef,

        snapshot => {

            callback(
                snapshotToArray(
                    snapshot
                )
            );

        },

        errorCallback
    );

}


export function subscribeToCommunitySurveys(
    callback,
    errorCallback = console.error
) {

    return onValue(
        communitySurveysRef,

        snapshot => {

            callback(
                snapshotToArray(
                    snapshot
                )
            );

        },

        errorCallback
    );

}


export function subscribeToCommunityVotes(
    callback,
    errorCallback = console.error
) {

    return onValue(
        communityVotesRef,

        snapshot => {

            callback(
                snapshotToArray(
                    snapshot
                )
            );

        },

        errorCallback
    );

}


/*
==================================================
PRESIDENTIAL APPROVAL SUBSCRIPTION
==================================================
*/

export function subscribeToPresidentialApproval(
    callback,
    errorCallback = console.error
) {

    return onValue(
        presidentialApprovalRef,

        snapshot => {

            callback(
                snapshotToArray(
                    snapshot
                )
            );

        },

        errorCallback
    );

}


/*
==================================================
COUNTRY DIRECTION SUBSCRIPTION
==================================================
*/

export function subscribeToCountryDirection(
    callback,
    errorCallback = console.error
) {

    return onValue(
        countryDirectionRef,

        snapshot => {

            callback(
                snapshotToArray(
                    snapshot
                )
            );

        },

        errorCallback
    );

}


/*
==================================================
NATIONAL CONFIDENCE SUBSCRIPTION
==================================================
*/

export function subscribeToNationalConfidence(
    callback,
    errorCallback = console.error
) {

    return onValue(
        nationalConfidenceRef,

        snapshot => {

            callback(
                snapshotToArray(
                    snapshot
                )
            );

        },

        errorCallback
    );

}
/*
==================================================
NATIONAL PRIORITIES MONTHLY SUBMISSION
==================================================
*/

export async function submitPrioritySubmission(
    ratings,
    additionalData = {}
) {

    if (
        !ratings ||
        typeof ratings !==
            "object"
    ) {

        throw new Error(
            "National priority ratings are required."
        );

    }


    const user =
        getVerifiedCurrentUser();


    const ageGroup =
        additionalData?.ageGroup ===
            "youth"
            ? "youth"
            : additionalData?.ageGroup ===
                "adult"
                ? "adult"
                : null;


    if (!ageGroup) {

        throw new Error(
            "A valid participant age group is required."
        );

    }


    const submittedAt =
        new Date().toISOString();


    const votingPeriod =
        getCurrentVotingPeriod();


    const monthlyData = {

        ratings,

        ageGroup,

        submittedAt,

        survey:
            "nationalPriorities",

        surveyVersion:
            "2.1"

    };


    /*
    ----------------------------------------------
    PRIVATE MONTHLY RECORD

    This prevents the same account from submitting
    National Priorities more than once in the same
    YYYY-MM voting period.
    ----------------------------------------------
    */

    await saveMonthlyVote(
        "nationalPriorities",
        monthlyData
    );


    /*
    ----------------------------------------------
    CURRENT PUBLIC RESULTS

    Keep the existing anonymous public results path
    working during the migration.

    No UID, email, birthday, name, or ZIP is copied
    into this public record.
    ----------------------------------------------
    */

    const submissionReference =
        push(
            prioritySubmissionsRef
        );


    const publicSubmissionData = {

    ratings,

    ageGroup,

    submittedAt,

    survey:
        "nationalPriorities",

    surveyVersion:
        "2.1"

};


    await set(
        submissionReference,
        publicSubmissionData
    );


    /*
    ----------------------------------------------
    PRIVATE PARTICIPANT HISTORY
    ----------------------------------------------
    */

    await safelySavePrivateNationalPriorityHistory(
        user,
        {
            submittedAt,
            ratings,
            votingPeriod
        }
    );


    return {

        id:
            submissionReference.key,

        votingPeriod,

        ...publicSubmissionData

    };

}


/*
==================================================
PRIVATE NATIONAL PRIORITY HISTORY
==================================================
*/

async function safelySavePrivateNationalPriorityHistory(
    user,
    responseData
) {

    try {

        return await savePrivateNationalPriorityHistory(
            user,
            responseData
        );

    } catch (error) {

        /*
        ----------------------------------------------
        IMPORTANT

        The monthly vote and public anonymous result
        have already succeeded.

        A private-history error must not make the
        participant believe the entire vote failed.
        ----------------------------------------------
        */

        console.error(
            "Private National Priorities history could not be saved:",
            error
        );


        return null;

    }

}


async function savePrivateNationalPriorityHistory(
    user,
    responseData
) {

    if (
        !user ||
        !user.uid ||
        !user.emailVerified
    ) {

        return null;

    }


    if (
        !responseData ||
        typeof responseData !==
            "object"
    ) {

        throw new Error(
            "National Priorities history data is required."
        );

    }


    const historyReference =
        ref(
            database,
            `userActivity/${user.uid}/nationalPriorities`
        );


    const submissionReference =
        push(
            historyReference
        );


    await set(
        submissionReference,
        {
            ...responseData
        }
    );


    return {

        id:
            submissionReference.key,

        ...responseData

    };

}


/*
==================================================
COMMUNITY POLL CREATION
==================================================
*/

export async function createCommunitySurvey(
    surveyData
) {

    const validatedSurvey =
        validateCommunitySurvey(
            surveyData
        );


    const surveyReference =
        push(
            communitySurveysRef
        );


    const createdAt =
        new Date().toISOString();


    const record = {

        ...validatedSurvey,

        createdAt,

        updatedAt:
            createdAt

    };


    await set(
        surveyReference,
        record
    );


    return {

        id:
            surveyReference.key,

        ...record

    };

}


/*
==================================================
COMMUNITY POLL UPDATE
==================================================
*/

export async function updateCommunitySurvey(
    surveyId,
    surveyData
) {

    if (
        !surveyId ||
        typeof surveyId !==
            "string"
    ) {

        throw new Error(
            "A valid community poll ID is required."
        );

    }


    const validatedSurvey =
        validateCommunitySurvey(
            surveyData
        );


    const updates = {

        ...validatedSurvey,

        updatedAt:
            new Date().toISOString()

    };


    await update(
        ref(
            database,
            `createdSurveys/${surveyId}`
        ),
        updates
    );


    return {

        id:
            surveyId,

        ...updates

    };

}


/*
==================================================
COMMUNITY POLL VALIDATION
==================================================
*/

function validateCommunitySurvey(
    surveyData
) {

    if (
        !surveyData ||
        typeof surveyData !==
            "object"
    ) {

        throw new Error(
            "Community poll data is required."
        );

    }


    const question =
        String(
            surveyData.question ||
            ""
        ).trim();


    if (
        question.length <
        5
    ) {

        throw new Error(
            "The poll question must be at least 5 characters long."
        );

    }


    const choices =
        Array.isArray(
            surveyData.choices
        )
            ? surveyData.choices
            : [];


    const cleanedChoices =
        choices
            .map(
                choice => {

                    return String(
                        choice ||
                        ""
                    ).trim();

                }
            )
            .filter(
                Boolean
            );


    if (
        cleanedChoices.length <
        2
    ) {

        throw new Error(
            "A community poll must have at least two answer choices."
        );

    }


    const uniqueChoices =
        [
            ...new Set(
                cleanedChoices
                    .map(
                        choice =>
                            choice.toLowerCase()
                    )
            )
        ];


    if (
        uniqueChoices.length !==
        cleanedChoices.length
    ) {

        throw new Error(
            "Poll choices must be unique."
        );

    }


    return {

        question,

        choices:
            cleanedChoices,

        active:
            surveyData.active ===
            true

    };

}


/*
==================================================
COMMUNITY POLL PARTICIPATION LOCK
==================================================

Private structure:

communityPollVotes/
    pollId/
        Firebase UID/
            surveyId
            choice
            publicVoteId
            submittedAt

The Firebase UID never appears in the public votes
collection.

The private lock is created once and cannot be
overwritten by the participant.
==================================================
*/

function getCommunityPollVoteLockReference(
    surveyId,
    userId = ""
) {

    const cleanSurveyId =
        String(
            surveyId || ""
        ).trim();


    if (!cleanSurveyId) {

        throw new Error(
            "A valid community poll is required."
        );

    }


    const user =
        auth.currentUser;


    const uid =
        userId ||
        user?.uid ||
        "";


    if (!uid) {

        throw new Error(
            "A signed-in participant is required."
        );

    }


    return ref(
        database,
        `communityPollVotes/${cleanSurveyId}/${uid}`
    );

}


/*
==================================================
HAS VOTED IN COMMUNITY POLL
==================================================
*/

export async function hasVotedInCommunityPoll(
    surveyId
) {

    const user =
        auth.currentUser;


    if (!user) {

        return false;

    }


    const lockReference =
        getCommunityPollVoteLockReference(
            surveyId,
            user.uid
        );


    const snapshot =
        await get(
            lockReference
        );


    return snapshot.exists();

}


/*
==================================================
GET MY COMMUNITY POLL VOTE
==================================================
*/

export async function getMyCommunityPollVote(
    surveyId
) {

    const user =
        auth.currentUser;


    if (!user) {

        return null;

    }


    const lockReference =
        getCommunityPollVoteLockReference(
            surveyId,
            user.uid
        );


    const snapshot =
        await get(
            lockReference
        );


    if (
        !snapshot.exists()
    ) {

        return null;

    }


    return {

        ...snapshot.val()

    };

}


/*
==================================================
COMMUNITY POLL VOTE SUBMISSION
==================================================
*/

export async function submitCommunityVote(
    surveyId,
    choice
) {

    /*
    ----------------------------------------------
    VERIFIED ACCOUNT REQUIRED
    ----------------------------------------------
    */

    const user =
        getVerifiedCurrentUser();


    const cleanSurveyId =
        String(
            surveyId || ""
        ).trim();


    const cleanChoice =
        String(
            choice || ""
        ).trim();


    if (!cleanSurveyId) {

        throw new Error(
            "A valid community poll is required."
        );

    }


    if (!cleanChoice) {

        throw new Error(
            "A valid poll response is required."
        );

    }


    /*
    ----------------------------------------------
    CONFIRM POLL EXISTS
    ----------------------------------------------
    */

    const surveyReference =
        ref(
            database,
            `createdSurveys/${cleanSurveyId}`
        );


    const surveySnapshot =
        await get(
            surveyReference
        );


    if (
        !surveySnapshot.exists()
    ) {

        throw new Error(
            "This community poll could not be found."
        );

    }


    const survey =
        surveySnapshot.val() ||
        {};


    /*
    ----------------------------------------------
    POLL MUST BE ACTIVE
    ----------------------------------------------
    */

    if (
        survey.active !==
        true
    ) {

        throw new Error(
            "This community poll is no longer accepting responses."
        );

    }


    /*
    ----------------------------------------------
    VALIDATE CHOICE AGAINST REAL POLL

    Do not trust arbitrary text supplied by the
    browser.
    ----------------------------------------------
    */

    const allowedChoices =
        Array.isArray(
            survey.choices
        )
            ? survey.choices
                .map(
                    item => {

                        return String(
                            item || ""
                        ).trim();

                    }
                )
                .filter(
                    Boolean
                )
            : [];


    if (
        !allowedChoices.includes(
            cleanChoice
        )
    ) {

        throw new Error(
            "That response is not a valid choice for this poll."
        );

    }


    /*
    ----------------------------------------------
    PRIVATE PARTICIPATION LOCK
    ----------------------------------------------
    */

    const lockReference =
        getCommunityPollVoteLockReference(
            cleanSurveyId,
            user.uid
        );


    const existingLockSnapshot =
        await get(
            lockReference
        );


    /*
    ----------------------------------------------
    EXISTING LOCK

    If a public vote already exists, this account
    has already voted.

    If the private lock exists but the public write
    failed during a previous attempt, the SAME vote
    can safely finish using the SAME public vote ID.
    ----------------------------------------------
    */

    if (
        existingLockSnapshot.exists()
    ) {

        const existingLock =
            existingLockSnapshot.val() ||
            {};


        const existingPublicVoteId =
            String(
                existingLock.publicVoteId ||
                ""
            ).trim();


        const existingChoice =
            String(
                existingLock.choice ||
                ""
            ).trim();


        if (
            !existingPublicVoteId ||
            !existingChoice
        ) {

            throw new Error(
                "Your previous community poll participation record is incomplete. Please contact Civic Horizon support."
            );

        }


        const existingPublicVoteReference =
            ref(
                database,
                `votes/${existingPublicVoteId}`
            );


        const existingPublicVoteSnapshot =
            await get(
                existingPublicVoteReference
            );


        /*
        ------------------------------------------
        ALREADY COMPLETED
        ------------------------------------------
        */

        if (
            existingPublicVoteSnapshot.exists()
        ) {

            const error =
                new Error(
                    "You have already voted in this community poll."
                );


            error.code =
                "already-voted-community-poll";


            throw error;

        }


        /*
        ------------------------------------------
        LOCKED CHOICE CANNOT BE CHANGED
        ------------------------------------------
        */

        if (
            existingChoice !==
            cleanChoice
        ) {

            const error =
                new Error(
                    "You have already selected a response for this community poll."
                );


            error.code =
                "already-voted-community-poll";


            throw error;

        }


        /*
        ------------------------------------------
        RECOVER INCOMPLETE PUBLIC WRITE
        ------------------------------------------
        */

        const recoveredVoteData = {

            surveyId:
                cleanSurveyId,

            choice:
                existingChoice,

            submittedAt:
                existingLock.submittedAt ||
                new Date().toISOString(),

            source:
                "v2PollsCenter"

        };


        await set(
            existingPublicVoteReference,
            recoveredVoteData
        );


        return {

            id:
                existingPublicVoteId,

            recovered:
                true,

            ...recoveredVoteData

        };

    }


    /*
    ----------------------------------------------
    GENERATE ANONYMOUS PUBLIC VOTE ID

    This is NOT the participant's Firebase UID.
    ----------------------------------------------
    */

    const voteReference =
        push(
            communityVotesRef
        );


    const publicVoteId =
        voteReference.key;


    if (!publicVoteId) {

        throw new Error(
            "A community vote ID could not be created."
        );

    }


    const submittedAt =
        new Date().toISOString();


    /*
    ----------------------------------------------
    PRIVATE LOCK DATA
    ----------------------------------------------
    */

    const lockData = {

        surveyId:
            cleanSurveyId,

        choice:
            cleanChoice,

        publicVoteId,

        submittedAt

    };


    /*
    ----------------------------------------------
    CREATE ONE-TIME PRIVATE LOCK

    Firebase Rules will allow only:

    verified user
        +
    own Firebase UID
        +
    nonexistent lock

    Once this succeeds, that account has claimed
    its one vote for this poll.
    ----------------------------------------------
    */

    try {

        await set(
            lockReference,
            lockData
        );

    } catch (error) {

        /*
        ------------------------------------------
        HANDLE TWO TABS / FAST DOUBLE CLICK
        ------------------------------------------
        */

        const latestSnapshot =
            await get(
                lockReference
            );


        if (
            latestSnapshot.exists()
        ) {

            const duplicateError =
                new Error(
                    "You have already voted in this community poll."
                );


            duplicateError.code =
                "already-voted-community-poll";


            throw duplicateError;

        }


        throw error;

    }


    /*
    ----------------------------------------------
    PUBLIC ANONYMOUS VOTE

    UID is intentionally NOT included.
    ----------------------------------------------
    */

    const voteData = {

        surveyId:
            cleanSurveyId,

        choice:
            cleanChoice,

        submittedAt,

        source:
            "v2PollsCenter"

    };


    await set(
        voteReference,
        voteData
    );


    return {

        id:
            publicVoteId,

        recovered:
            false,

        ...voteData

    };

}


/*
==================================================
COMMUNITY POLL PARTICIPATION MESSAGE
==================================================
*/

export function getCommunityPollParticipationMessage(
    error
) {

    if (
        error?.code ===
        "already-voted-community-poll"
    ) {

        return (
            "You have already voted in this community poll."
        );

    }


    return (
        error?.message ||
        "Your community poll vote could not be submitted."
    );

}


/*
==================================================
PRIVATE CIVIC PULSE HISTORY
==================================================
*/

async function savePrivateCivicPulseHistory(
    tracker,
    responseData
) {

    const user =
        auth.currentUser;


    if (
        !user ||
        !user.emailVerified
    ) {

        return null;

    }


    const allowedTrackers = [

        "presidentialApproval",

        "countryDirection",

        "nationalConfidence"

    ];


    if (
        !allowedTrackers.includes(
            tracker
        )
    ) {

        throw new Error(
            "Invalid Civic Pulse history tracker."
        );

    }


    if (
        !responseData ||
        typeof responseData !==
            "object"
    ) {

        throw new Error(
            "Civic Pulse history data is required."
        );

    }


    const historyReference =
        ref(
            database,
            `userActivity/${user.uid}/civicPulse/${tracker}`
        );


    const submissionReference =
        push(
            historyReference
        );


    await set(
        submissionReference,
        {
            ...responseData
        }
    );


    return {

        id:
            submissionReference.key,

        ...responseData

    };

}


/*
==================================================
SAFE PRIVATE CIVIC PULSE HISTORY
==================================================
*/

async function safelySavePrivateCivicPulseHistory(
    tracker,
    responseData
) {

    try {

        return await savePrivateCivicPulseHistory(
            tracker,
            responseData
        );

    } catch (error) {

        console.error(
            `Private ${tracker} history could not be saved:`,
            error
        );


        return null;

    }

}

/*
==================================================
ATOMIC WEEKLY CIVIC PULSE WRITE
==================================================
*/

async function saveWeeklyCivicPulseResponse(
    tracker,
    responseData,
    publicPath,
    participantId = ""
) {

    const user =
        getVerifiedCurrentUser();


    const validatedTracker =
        validateWeeklyTracker(
            tracker
        );


    const votingPeriod =
        getCurrentWeeklyVotingPeriod();


    const weeklyReference =
        getWeeklyParticipantReference(
            validatedTracker,
            user.uid
        );


    const existingSnapshot =
        await get(
            weeklyReference
        );


    if (
        existingSnapshot.exists()
    ) {

        const error =
            new Error(
                `You have already participated in ${getCurrentWeeklyVotingPeriodLabel()}. Voting will reopen automatically next Monday.`
            );


        error.code =
            "already-participated-this-week";


        throw error;

    }


    const cleanedParticipantId =
        validateParticipantId(
            participantId
        );


    let publicResponseId;


    if (
        cleanedParticipantId
    ) {

        publicResponseId =
            `${votingPeriod}-${cleanedParticipantId}`;

    } else {

        const temporaryReference =
            push(
                ref(
                    database,
                    publicPath
                )
            );


        publicResponseId =
            temporaryReference.key;

    }


    if (
        !publicResponseId
    ) {

        throw new Error(
            "A public response ID could not be created."
        );

    }


    /*
    ==================================================
    CRITICAL WEEKLY VOTE

    Only the duplicate-vote lock and anonymous
    public response are part of this atomic write.
    ==================================================
    */

    const updates =
        {};


    updates[
        `weeklyVotes/${votingPeriod}/${validatedTracker}/${user.uid}`
    ] = {

        ...responseData,

        votingPeriod,

        votingCadence:
            "weekly"

    };


    updates[
        `${publicPath}/${publicResponseId}`
    ] = {

        ...responseData,

        votingPeriod,

        votingCadence:
            "weekly",

        ...(cleanedParticipantId
            ? {
                participantId:
                    cleanedParticipantId
            }
            : {})

    };


    await update(
        ref(
            database
        ),
        updates
    );


    /*
    ==================================================
    PRIVATE HISTORY

    History is intentionally saved AFTER the vote.
    A history error must never undo a valid vote.
    ==================================================
    */

    await safelySavePrivateCivicPulseHistory(
        validatedTracker,
        responseData
    );


    return {

        id:
            publicResponseId,

        participantId:
            cleanedParticipantId,

        votingPeriod,

        votingCadence:
            "weekly",

        ...responseData

    };

}

/*
==================================================
ATOMIC MONTHLY CIVIC PULSE WRITE
==================================================
*/

async function saveMonthlyCivicPulseResponse(
    tracker,
    responseData,
    publicPath,
    participantId = ""
) {

    const user =
        getVerifiedCurrentUser();


    const validatedTracker =
        validateMonthlyTracker(
            tracker
        );


    const votingPeriod =
        getCurrentVotingPeriod();


    const monthlyReference =
        getMonthlyParticipantReference(
            validatedTracker,
            user.uid
        );


    /*
    ----------------------------------------------
    FRIENDLY DUPLICATE CHECK

    Firebase Rules remain the final protection.
    ----------------------------------------------
    */

    const existingSnapshot =
        await get(
            monthlyReference
        );


    if (
        existingSnapshot.exists()
    ) {

        const error =
            new Error(
                `You have already participated in ${getCurrentVotingPeriodLabel()}. Voting will reopen automatically next month.`
            );


        error.code =
            "already-participated-this-month";


        throw error;

    }


    /*
    ----------------------------------------------
    ANONYMOUS PUBLIC PARTICIPANT ID

    The Firebase UID is NEVER placed into the
    public Civic Pulse record.
    ----------------------------------------------
    */

    const cleanedParticipantId =
        validateParticipantId(
            participantId
        );


    let publicResponseId;


    if (
        cleanedParticipantId
    ) {

        /*
        Example:

        2026-08-participant-abc123

        When September arrives it naturally becomes:

        2026-09-participant-abc123

        Therefore the public record can be created again
        without overwriting the August response.
        */

        publicResponseId =
            `${votingPeriod}-${cleanedParticipantId}`;

    } else {

        const temporaryReference =
            push(
                ref(
                    database,
                    publicPath
                )
            );


        publicResponseId =
            temporaryReference.key;

    }


    if (
        !publicResponseId
    ) {

        throw new Error(
            "A public response ID could not be created."
        );

    }


    /*
    ----------------------------------------------
    PRIVATE HISTORY ID
    ----------------------------------------------
    */

    const privateHistoryReference =
        push(
            ref(
                database,
                `userActivity/${user.uid}/civicPulse/${validatedTracker}`
            )
        );


    const historyId =
        privateHistoryReference.key;


    if (
        !historyId
    ) {

        throw new Error(
            "A private history record could not be created."
        );

    }


    /*
    ----------------------------------------------
    MULTI-LOCATION ATOMIC UPDATE

    All three records succeed together or fail
    together.

    1. Private monthly eligibility record
    2. Anonymous public result
    3. Private account history
    ----------------------------------------------
    */

    const updates = {};


    updates[
        `monthlyVotes/${votingPeriod}/${validatedTracker}/${user.uid}`
    ] = {

        ...responseData,

        votingPeriod

    };


    updates[
        `${publicPath}/${publicResponseId}`
    ] = {

        ...responseData,

        votingPeriod,

        ...(cleanedParticipantId
            ? {
                participantId:
                    cleanedParticipantId
            }
            : {})

    };


    /*
    The existing userActivity rules do not require
    votingPeriod, so private history keeps its current
    compatible structure. submittedAt still preserves
    the exact month and year.
    */

    updates[
    `userActivity/${user.uid}/civicPulse/${validatedTracker}/${historyId}`
] = {

    ...responseData

};


    await update(
        ref(
            database
        ),
        updates
    );


    return {

        id:
            publicResponseId,

        participantId:
            cleanedParticipantId,

        votingPeriod,

        ...responseData

    };

}


/*
==================================================
PRESIDENTIAL APPROVAL SUBMISSION
==================================================
*/

export async function submitPresidentialApproval(
    response,
    participantId = ""
) {

    const validResponses = [

        "Strongly Approve",

        "Approve",

        "Neutral",

        "Disapprove",

        "Strongly Disapprove"

    ];


    if (
        !validResponses.includes(
            response
        )
    ) {

        throw new Error(
            "Invalid presidential approval response."
        );

    }


    const responseData = {

        response,

        submittedAt:
            new Date().toISOString(),

        tracker:
            "presidentialApproval",

        trackerVersion:
            "2.1"

    };


    return saveWeeklyCivicPulseResponse(

    "presidentialApproval",

    responseData,

    "civicPulse/presidentialApproval/responses",

    participantId

);

}


/*
==================================================
COUNTRY DIRECTION SUBMISSION
==================================================
*/

export async function submitCountryDirection(
    response,
    participantId = ""
) {

    const validResponses = [

        "Right Direction",

        "Wrong Track"

    ];


    if (
        !validResponses.includes(
            response
        )
    ) {

        throw new Error(
            "Invalid country direction response."
        );

    }


    const responseData = {

        response,

        submittedAt:
            new Date().toISOString(),

        tracker:
            "countryDirection",

        trackerVersion:
            "1.1"

    };


    return saveWeeklyCivicPulseResponse(

    "countryDirection",

    responseData,

    "civicPulse/countryDirection/responses",

    participantId

);

}


/*
==================================================
NATIONAL CONFIDENCE SUBMISSION
==================================================
*/

export async function submitNationalConfidence(
    ratings,
    participantId = ""
) {

    const validatedRatings =
        validateConfidenceRatings(
            ratings
        );


    const responseData = {

        ratings:
            validatedRatings,

        submittedAt:
            new Date().toISOString(),

        tracker:
            "nationalConfidence",

        trackerVersion:
            "1.1"

    };


    return saveMonthlyCivicPulseResponse(

        "nationalConfidence",

        responseData,

        "civicPulse/nationalConfidence/responses",

        participantId

    );

}


/*
==================================================
CONFIDENCE VALIDATION
==================================================
*/

function validateConfidenceRatings(
    ratings
) {

    if (
        !ratings ||
        typeof ratings !==
            "object"
    ) {

        throw new Error(
            "National confidence ratings are required."
        );

    }


    const requiredCategories = [

        "government",

        "congress",

        "court",

        "economy",

        "media",

        "democracy"

    ];


    const validValues = [

        20,

        40,

        60,

        80,

        100

    ];


    const cleanedRatings =
        {};


    requiredCategories.forEach(
        category => {

            const value =
                Number(
                    ratings[
                        category
                    ]
                );


            if (
                !validValues.includes(
                    value
                )
            ) {

                throw new Error(
                    `Invalid confidence rating for ${category}.`
                );

            }


            cleanedRatings[
                category
            ] =
                value;

        }
    );


    return cleanedRatings;

}
/*
==================================================
ONE-TIME READ HELPERS
==================================================
*/

export async function getPrioritySubmissions() {

    const snapshot =
        await get(
            prioritySubmissionsRef
        );


    return snapshotToArray(
        snapshot
    );

}


export async function getCommunitySurveys() {

    const snapshot =
        await get(
            communitySurveysRef
        );


    return snapshotToArray(
        snapshot
    );

}


export async function getCommunityVotes() {

    const snapshot =
        await get(
            communityVotesRef
        );


    return snapshotToArray(
        snapshot
    );

}


export async function getPresidentialApprovalResponses() {

    const snapshot =
        await get(
            presidentialApprovalRef
        );


    return snapshotToArray(
        snapshot
    );

}


export async function getCountryDirectionResponses() {

    const snapshot =
        await get(
            countryDirectionRef
        );


    return snapshotToArray(
        snapshot
    );

}


export async function getNationalConfidenceResponses() {

    const snapshot =
        await get(
            nationalConfidenceRef
        );


    return snapshotToArray(
        snapshot
    );

}


/*
==================================================
GENERAL DATABASE HELPER
==================================================
*/

export async function updateDatabasePath(
    path,
    updates
) {

    if (
        !path ||
        typeof path !==
            "string"
    ) {

        throw new Error(
            "A valid Firebase database path is required."
        );

    }


    if (
        !updates ||
        typeof updates !==
            "object"
    ) {

        throw new Error(
            "Valid update data is required."
        );

    }


    await update(
        ref(
            database,
            path
        ),
        updates
    );

}


/*
==================================================
PARTICIPANT ID VALIDATION
==================================================
*/

function validateParticipantId(
    participantId
) {

    if (
        !participantId
    ) {

        return "";

    }


    const cleaned =
        String(
            participantId
        ).trim();


    if (
        !cleaned
    ) {

        return "";

    }


    /*
    Firebase Realtime Database keys cannot contain:

    .  #  $  [  ]  /
    */

    if (
        /[.#$\[\]\/]/.test(
            cleaned
        )
    ) {

        throw new Error(
            "Invalid Civic Pulse participant ID."
        );

    }


    return cleaned;

}


/*
==================================================
CURRENT MONTH RECORD CHECK
==================================================
*/

function recordBelongsToCurrentVotingPeriod(
    record
) {

    if (
        !record ||
        typeof record !==
            "object"
    ) {

        return false;

    }


    const tracker =
        typeof record.tracker ===
            "string"
            ? record.tracker
            : "";


    const votingPeriod =
        typeof record.votingPeriod ===
            "string"
            ? record.votingPeriod
            : "";


    /*
    ----------------------------------------------
    WEEKLY TRACKERS
    ----------------------------------------------
    */

    if (
        weeklyTrackerNames.includes(
            tracker
        )
    ) {

        if (!votingPeriod) {

            return false;

        }


        return (
            votingPeriod ===
            getCurrentWeeklyVotingPeriod()
        );

    }


    /*
    ----------------------------------------------
    MONTHLY TRACKERS
    ----------------------------------------------
    */

    if (
        monthlyTrackerNames.includes(
            tracker
        )
    ) {

        if (!votingPeriod) {

            return false;

        }


        return (
            votingPeriod ===
            getCurrentVotingPeriod()
        );

    }


    /*
    ----------------------------------------------
    NATIONAL PRIORITIES LEGACY RECORDS

    Older public National Priorities records may
    not contain votingPeriod, so fall back to
    submittedAt.
    ----------------------------------------------
    */

    if (
        typeof record.submittedAt !==
            "string"
    ) {

        return false;

    }


    const submittedDate =
        new Date(
            record.submittedAt
        );


    if (
        Number.isNaN(
            submittedDate.getTime()
        )
    ) {

        return false;

    }


    const submittedYear =
        submittedDate.getFullYear();


    const submittedMonth =
        String(
            submittedDate.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const submittedPeriod =
        `${submittedYear}-${submittedMonth}`;


    return (
        submittedPeriod ===
        getCurrentVotingPeriod()
    );

}


    


/*
==================================================
SHOULD FILTER SNAPSHOT BY MONTH
==================================================
*/

function shouldFilterSnapshotByMonth(
    snapshot
) {

    if (
        !snapshot ||
        !snapshot.ref
    ) {

        return false;

    }


    const currentKey =
        snapshot.ref.key ||
        "";


    const parentKey =
        snapshot.ref.parent?.key ||
        "";


    const grandparentKey =
        snapshot.ref.parent?.parent?.key ||
        "";


    /*
    ----------------------------------------------
    NATIONAL PRIORITIES
    ----------------------------------------------
    */

    if (
        currentKey ===
        "prioritySubmissions"
    ) {

        return true;

    }


    /*
    ----------------------------------------------
    CIVIC PULSE PUBLIC RESPONSES
    ----------------------------------------------
    */

    if (
        currentKey ===
            "responses" &&
        grandparentKey ===
            "civicPulse" &&
        (
            parentKey ===
                "presidentialApproval" ||
            parentKey ===
                "countryDirection" ||
            parentKey ===
                "nationalConfidence"
        )
    ) {

        return true;

    }


    return false;

}


/*
==================================================
SNAPSHOT TO ARRAY

For recurring national trackers, this automatically
returns only records belonging to the current
YYYY-MM voting period.

Community polls and other data remain unfiltered.
==================================================
*/

function snapshotToArray(
    snapshot
) {

    const records =
        [];


    if (
        !snapshot ||
        !snapshot.exists()
    ) {

        return records;

    }


    snapshot.forEach(
        childSnapshot => {

            const value =
                childSnapshot.val();


            records.push({

                id:
                    childSnapshot.key,

                ...(value || {})

            });

        }
    );


    if (
        !shouldFilterSnapshotByMonth(
            snapshot
        )
    ) {

        return records;

    }


    return records.filter(
        record =>
            recordBelongsToCurrentVotingPeriod(
                record
            )
    );

}


/*
==================================================
MONTHLY PARTICIPATION MESSAGE
==================================================
*/

export function getMonthlyParticipationMessage(
    status
) {

    if (
        !status
    ) {

        return "";

    }


    switch (
        status.reason
    ) {

        case "alreadyParticipatedThisMonth":

            return (
                `You have already participated in ${status.votingPeriodLabel}. Voting will reopen automatically next month.`
            );


        case "signedOut":

            return (
                "Sign in to participate."
            );


        case "emailNotVerified":

            return (
                "Verify your email before participating."
            );


        case "eligible":

            return "";


        default:

            return (
                "Participation is currently unavailable."
            );

    }

}

/*
==================================================
WEEKLY PARTICIPATION MESSAGE
==================================================
*/

export function getWeeklyParticipationMessage(
    status
) {

    if (
        !status
    ) {

        return "";

    }


    switch (
        status.reason
    ) {

        case "alreadyParticipatedThisWeek":

            return (
                `You have already participated in ${status.votingPeriodLabel}. Voting will reopen automatically next Monday.`
            );


        case "signedOut":

            return (
                "Sign in to participate."
            );


        case "emailNotVerified":

            return (
                "Verify your email before participating."
            );


        case "eligible":

            return "";


        default:

            return (
                "Participation is currently unavailable."
            );

    }

}


/*
==================================================
NEXT VOTING PERIOD
==================================================
*/

export function getNextVotingPeriodLabel() {

    const now =
        new Date();


    const nextMonth =
        new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
        );


    return nextMonth.toLocaleDateString(
        "en-US",
        {
            month:
                "long",

            year:
                "numeric"
        }
    );

}


/*
==================================================
NEXT VOTING PERIOD KEY
==================================================
*/

export function getNextVotingPeriod() {

    const now =
        new Date();


    const nextMonth =
        new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
        );


    const year =
        nextMonth.getFullYear();


    const month =
        String(
            nextMonth.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}`;

}