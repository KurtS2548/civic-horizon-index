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
PRIVATE NATIONAL PRIORITIES HISTORY
==================================================
*/

export async function getMyNationalPriorityHistory() {

    const user =
        auth.currentUser;


    if (!user) {

        throw new Error(
            "A signed-in participant is required."
        );

    }


    if (!user.emailVerified) {

        throw new Error(
            "A verified participant is required."
        );

    }


    const historyRef =
        ref(
            database,
            `userActivity/${user.uid}/nationalPriorities`
        );


    const snapshot =
        await get(
            historyRef
        );


    if (!snapshot.exists()) {

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
            (a, b) => {

                return (
                    new Date(
                        a.submittedAt
                    ).getTime() -
                    new Date(
                        b.submittedAt
                    ).getTime()
                );

            }
        );

}


/*
==================================================
LATEST PRIORITY SUBMISSION
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
PARTICIPATION COUNT
==================================================
*/

export async function getMyNationalPrioritySubmissionCount() {

    const history =
        await getMyNationalPriorityHistory();


    return history.length;

}