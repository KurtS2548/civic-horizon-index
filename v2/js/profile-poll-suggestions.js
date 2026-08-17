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
    set

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


    if (!user) {

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


        const record = {

            level,

            topic,

            proposedQuestion:
                question,

            reason,

            status:
                "pendingReview",

            submittedAt:
                new Date().toISOString(),

            /*
            Firebase currently validates this existing
            source value for poll suggestions.
            */

            source:
                "contactPage",

            submittedByUid:
                user.uid,

            submittedByVerifiedAccount:
                true

        };


        await set(
            suggestionReference,
            record
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


    if (!element) {

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


    if (!element) {

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

    if (!button) {

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