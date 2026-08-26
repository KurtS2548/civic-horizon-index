/*
==================================================
CIVIC HORIZON INDEX V2
PROFILE POLL SUGGESTIONS
==================================================
*/


import {

    database,
    auth

} from "../../js/firebase.js";


import {

    ref,
    push,
    get,
    update

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


import {

    reload,
    getIdToken

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {

    getGuardedCurrentUser

} from "./services/auth-guard.js";


/*
==================================================
DATABASE PATH
==================================================
*/

const pollSuggestionsRef =
    ref(
        database,
        "pollSuggestions"
    );


/*
==================================================
INITIALIZE
==================================================
*/

function initializeProfilePollSuggestions() {

    document
        .getElementById(
            "profilePollSuggestionForm"
        )
        ?.addEventListener(
            "submit",
            handlePollSuggestion
        );

}


/*
==================================================
SUBMIT POLL SUGGESTION
==================================================
*/

async function handlePollSuggestion(
    event
) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const submitButton =
        document.getElementById(
            "profilePollSuggestionButton"
        );


    const level =
        getInputValue(
            "profileSuggestionLevel"
        );


    const topic =
        getInputValue(
            "profileSuggestionTopic"
        );


    const question =
        getInputValue(
            "profileSuggestionQuestion"
        );


    const reason =
        getInputValue(
            "profileSuggestionReason"
        );


    /*
    ----------------------------------------------
    VALIDATION
    ----------------------------------------------
    */

    if (
        ![
            "national",
            "state",
            "local",
            "community"
        ].includes(
            level
        )
    ) {

        showMessage(
            "Choose the level that best fits your suggestion.",
            "error"
        );

        return;

    }


    if (
        topic.length <
        3
    ) {

        showMessage(
            "Enter a topic or issue.",
            "error"
        );

        return;

    }


    if (
        topic.length >
        150
    ) {

        showMessage(
            "The topic must be 150 characters or fewer.",
            "error"
        );

        return;

    }


    if (
        question.length <
        10
    ) {

        showMessage(
            "Enter the question or issue you would like Civic Horizon to consider.",
            "error"
        );

        return;

    }


    if (
        question.length >
        500
    ) {

        showMessage(
            "The proposed question must be 500 characters or fewer.",
            "error"
        );

        return;

    }


    if (
        reason.length <
        10
    ) {

        showMessage(
            "Briefly explain why you believe this issue should be considered.",
            "error"
        );

        return;

    }


    if (
        reason.length >
        750
    ) {

        showMessage(
            "The explanation must be 750 characters or fewer.",
            "error"
        );

        return;

    }


    /*
    ----------------------------------------------
    AUTHENTICATED PARTICIPANT
    ----------------------------------------------
    */

    let user =
        getGuardedCurrentUser() ||
        auth.currentUser;


    if (
        !user
    ) {

        showMessage(
            "You must be signed in to submit a poll suggestion.",
            "error"
        );

        return;

    }


    /*
    ----------------------------------------------
    REFRESH ACCOUNT STATE
    ----------------------------------------------
    */

    try {

        await reload(
            user
        );


        user =
            auth.currentUser ||
            user;


        try {

            await getIdToken(
                user,
                true
            );

        } catch (tokenError) {

            console.warn(
                "Poll suggestion token refresh could not be completed:",
                tokenError
            );

        }

    } catch (reloadError) {

        console.warn(
            "Poll suggestion account refresh could not be completed:",
            reloadError
        );


        user =
            auth.currentUser ||
            user;

    }


    if (
        !user ||
        !user.emailVerified
    ) {

        showMessage(
            "Please verify your email before submitting a poll suggestion.",
            "error"
        );

        return;

    }


    /*
    ----------------------------------------------
    NORMALIZED QUESTION
    ----------------------------------------------
    */

    const questionKey =
        normalizeQuestion(
            question
        );


    /*
    ----------------------------------------------
    SUGGESTION HISTORY CHECK
    ----------------------------------------------
    */

    const suggestionHistoryReference =
        ref(
            database,
            `userActivity/${user.uid}/pollSuggestions`
        );


    try {

        const historySnapshot =
            await get(
                suggestionHistoryReference
            );


        if (
            historySnapshot.exists()
        ) {

            const historyValue =
                historySnapshot.val() ||
                {};


            const previousSuggestions =
                Object.values(
                    historyValue
                );


            /*
            ------------------------------------------
            DUPLICATE CHECK
            ------------------------------------------
            */

            const duplicateFound =
                previousSuggestions.some(
                    previousSuggestion => {

                        return (
                            String(
                                previousSuggestion
                                    ?.questionKey ||
                                ""
                            ) ===
                            questionKey
                        );

                    }
                );


            if (
                duplicateFound
            ) {

                showMessage(
                    "You have already submitted this poll question.",
                    "error"
                );

                return;

            }


            /*
            ------------------------------------------
            24-HOUR SUBMISSION LIMIT
            ------------------------------------------
            */

            const submissionTimes =
                previousSuggestions
                    .map(
                        previousSuggestion => {

                            return Date.parse(
                                previousSuggestion
                                    ?.submittedAt ||
                                ""
                            );

                        }
                    )
                    .filter(
                        Number.isFinite
                    );


            const mostRecentSubmission =
                submissionTimes.length >
                0
                    ? Math.max(
                        ...submissionTimes
                    )
                    : null;


            const twentyFourHours =
                24 *
                60 *
                60 *
                1000;


            if (
                Number.isFinite(
                    mostRecentSubmission
                ) &&
                Date.now() -
                    mostRecentSubmission <
                    twentyFourHours
            ) {

                showMessage(
                    "You can submit one poll suggestion every 24 hours.",
                    "error"
                );

                return;

            }

        }

    } catch (error) {

        console.error(
            "Poll suggestion history could not be checked:",
            error
        );


        showMessage(
            "Your suggestion history could not be checked. Please try again.",
            "error"
        );

        return;

    }


    /*
    ----------------------------------------------
    SUBMIT
    ----------------------------------------------
    */

    setButtonBusy(
        submitButton,
        true,
        "Submitting..."
    );


    showMessage(
        "Submitting your suggestion...",
        "info"
    );


    try {

        const suggestionReference =
            push(
                pollSuggestionsRef
            );


        if (
            !suggestionReference.key
        ) {

            throw new Error(
                "A suggestion ID could not be created."
            );

        }


        const suggestionId =
            suggestionReference.key;


        const submittedAt =
            new Date()
                .toISOString();


        const record = {

            level,

            topic,

            proposedQuestion:
                question,

            reason,

            status:
                "pendingReview",

            submittedAt,

            source:
                "profilePage",

            submittedByUid:
                user.uid,

            submittedByVerifiedAccount:
                true

        };


        /*
        ------------------------------------------
        WRITE PUBLIC QUEUE + PRIVATE HISTORY
        TOGETHER
        ------------------------------------------
        */

        const updates =
            {};


        updates[
            `pollSuggestions/${suggestionId}`
        ] =
            record;


        updates[
            `userActivity/${user.uid}/pollSuggestions/${suggestionId}`
        ] = {

            questionKey,

            submittedAt

        };


        await update(
            ref(
                database
            ),
            updates
        );


        form.reset();


        showMessage(
            "Thank you. Your suggestion has been submitted for review.",
            "success"
        );

    } catch (error) {

        console.error(
            "Profile poll suggestion could not be submitted:",
            error
        );


        showMessage(
            `Your suggestion could not be submitted right now. ${error?.code || ""}`,
            "error"
        );

    } finally {

        setButtonBusy(
            submitButton,
            false,
            "Submit Suggestion"
        );

    }

}


/*
==================================================
NORMALIZE QUESTION
==================================================
*/

function normalizeQuestion(
    value
) {

    return String(
        value ||
        ""
    )
        .trim()
        .toLowerCase()
        .replace(
            /[^a-z0-9\s]/g,
            ""
        )
        .replace(
            /\s+/g,
            " "
        );

}


/*
==================================================
INPUT HELPER
==================================================
*/

function getInputValue(
    elementId
) {

    const element =
        document.getElementById(
            elementId
        );


    if (
        !element
    ) {

        return "";

    }


    return String(
        element.value ||
        ""
    ).trim();

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

    const element =
        document.getElementById(
            "profilePollSuggestionMessage"
        );


    if (
        !element
    ) {

        return;

    }


    element.textContent =
        message;


    element.dataset.messageType =
        type;

}


/*
==================================================
BUTTON STATE
==================================================
*/

function setButtonBusy(
    button,
    busy,
    text
) {

    if (
        !button
    ) {

        return;

    }


    button.disabled =
        busy;


    button.textContent =
        text;

}


/*
==================================================
START
==================================================
*/

initializeProfilePollSuggestions();