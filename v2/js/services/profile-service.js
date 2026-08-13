/*
==================================================
CIVIC HORIZON INDEX V2
PROFILE DATA SERVICE
==================================================
*/


import {

    auth,
    database

} from "../../../js/firebase.js";


import {

    ref,
    get

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/*
==================================================
AUTHENTICATED PARTICIPANT
==================================================
*/

function getVerifiedUser() {

    const user =
        auth.currentUser;


    if (!user) {

        throw new Error(
            "A signed-in participant is required."
        );

    }


    if (
        !user.emailVerified
    ) {

        throw new Error(
            "A verified participant is required."
        );

    }


    return user;

}


/*
==================================================
PRIVATE NATIONAL PRIORITIES HISTORY
==================================================
*/

export async function getMyNationalPriorityHistory() {

    const user =
        getVerifiedUser();


    const historyRef =
        ref(
            database,
            `userActivity/${user.uid}/nationalPriorities`
        );


    const snapshot =
        await get(
            historyRef
        );


    if (
        !snapshot.exists()
    ) {

        return [];

    }


    const data =
        snapshot.val();


    return Object.entries(
        data
    )
        .map(
            ([id, submission]) => {

                return {

                    id,

                    submittedAt:
                        submission?.submittedAt ||
                        "",

                    ratings:
                        submission?.ratings &&
                        typeof submission.ratings ===
                            "object"
                            ? {
                                ...submission.ratings
                            }
                            : {}

                };

            }
        )
        .sort(
            sortBySubmittedAt
        );

}


/*
==================================================
LATEST NATIONAL PRIORITY SUBMISSION
==================================================
*/

export async function getMyLatestNationalPrioritySubmission() {

    const history =
        await getMyNationalPriorityHistory();


    if (
        history.length ===
        0
    ) {

        return null;

    }


    return history[
        history.length - 1
    ];

}


/*
==================================================
NATIONAL PRIORITIES COUNT
==================================================
*/

export async function getMyNationalPrioritySubmissionCount() {

    const history =
        await getMyNationalPriorityHistory();


    return history.length;

}


/*
==================================================
PRESIDENTIAL APPROVAL HISTORY
==================================================
*/

export async function getMyPresidentialApprovalHistory() {

    const user =
        getVerifiedUser();


    const historyRef =
        ref(
            database,
            `userActivity/${user.uid}/civicPulse/presidentialApproval`
        );


    const snapshot =
        await get(
            historyRef
        );


    if (
        !snapshot.exists()
    ) {

        return [];

    }


    const data =
        snapshot.val();


    return Object.entries(
        data
    )
        .map(
            ([id, submission]) => {

                return {

                    id,

                    response:
                        String(
                            submission?.response ||
                            ""
                        ),

                    submittedAt:
                        submission?.submittedAt ||
                        "",

                    tracker:
                        submission?.tracker ||
                        "presidentialApproval",

                    trackerVersion:
                        submission?.trackerVersion ||
                        ""

                };

            }
        )
        .sort(
            sortBySubmittedAt
        );

}


/*
==================================================
COUNTRY DIRECTION HISTORY
==================================================
*/

export async function getMyCountryDirectionHistory() {

    const user =
        getVerifiedUser();


    const historyRef =
        ref(
            database,
            `userActivity/${user.uid}/civicPulse/countryDirection`
        );


    const snapshot =
        await get(
            historyRef
        );


    if (
        !snapshot.exists()
    ) {

        return [];

    }


    const data =
        snapshot.val();


    return Object.entries(
        data
    )
        .map(
            ([id, submission]) => {

                return {

                    id,

                    response:
                        String(
                            submission?.response ||
                            ""
                        ),

                    submittedAt:
                        submission?.submittedAt ||
                        "",

                    tracker:
                        submission?.tracker ||
                        "countryDirection",

                    trackerVersion:
                        submission?.trackerVersion ||
                        ""

                };

            }
        )
        .sort(
            sortBySubmittedAt
        );

}


/*
==================================================
NATIONAL CONFIDENCE HISTORY
==================================================
*/

export async function getMyNationalConfidenceHistory() {

    const user =
        getVerifiedUser();


    const historyRef =
        ref(
            database,
            `userActivity/${user.uid}/civicPulse/nationalConfidence`
        );


    const snapshot =
        await get(
            historyRef
        );


    if (
        !snapshot.exists()
    ) {

        return [];

    }


    const data =
        snapshot.val();


    return Object.entries(
        data
    )
        .map(
            ([id, submission]) => {

                return {

                    id,

                    submittedAt:
                        submission?.submittedAt ||
                        "",

                    tracker:
                        submission?.tracker ||
                        "nationalConfidence",

                    trackerVersion:
                        submission?.trackerVersion ||
                        "",

                    ratings:
                        submission?.ratings &&
                        typeof submission.ratings ===
                            "object"
                            ? {
                                ...submission.ratings
                            }
                            : {}

                };

            }
        )
        .sort(
            sortBySubmittedAt
        );

}


/*
==================================================
FULL CIVIC PULSE HISTORY
==================================================
*/

export async function getMyCivicPulseHistory() {

    const results =
        await Promise.all([

            getMyPresidentialApprovalHistory(),

            getMyCountryDirectionHistory(),

            getMyNationalConfidenceHistory()

        ]);


    return {

        presidentialApproval:
            results[0],

        countryDirection:
            results[1],

        nationalConfidence:
            results[2]

    };

}


/*
==================================================
LATEST CIVIC PULSE RESPONSES
==================================================
*/

export async function getMyLatestCivicPulseResponses() {

    const history =
        await getMyCivicPulseHistory();


    return {

        presidentialApproval:
            getLatestRecord(
                history.presidentialApproval
            ),

        countryDirection:
            getLatestRecord(
                history.countryDirection
            ),

        nationalConfidence:
            getLatestRecord(
                history.nationalConfidence
            )

    };

}


/*
==================================================
TOTAL PERSONAL ACTIVITY COUNT
==================================================
*/

export async function getMyTotalActivityCount() {

    const results =
        await Promise.all([

            getMyNationalPriorityHistory(),

            getMyPresidentialApprovalHistory(),

            getMyCountryDirectionHistory(),

            getMyNationalConfidenceHistory()

        ]);


    return (
        results[0].length +
        results[1].length +
        results[2].length +
        results[3].length
    );

}


/*
==================================================
LATEST RECORD
==================================================
*/

function getLatestRecord(
    history
) {

    if (
        !Array.isArray(
            history
        ) ||
        history.length ===
            0
    ) {

        return null;

    }


    return history[
        history.length - 1
    ];

}


/*
==================================================
SORT BY SUBMISSION DATE
==================================================
*/

function sortBySubmittedAt(
    recordA,
    recordB
) {

    const timeA =
        new Date(
            recordA?.submittedAt ||
            0
        ).getTime();


    const timeB =
        new Date(
            recordB?.submittedAt ||
            0
        ).getTime();


    const safeTimeA =
        Number.isFinite(
            timeA
        )
            ? timeA
            : 0;


    const safeTimeB =
        Number.isFinite(
            timeB
        )
            ? timeB
            : 0;


    return (
        safeTimeA -
        safeTimeB
    );

}