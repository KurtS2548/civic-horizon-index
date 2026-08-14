/*
==================================================
CIVIC HORIZON INDEX V2
NATIONAL PRIORITIES POLL CONTROLLER

MONTHLY VOTING
==================================================
*/


import {

    submitNationalPriorityRatings,

    getNationalIssues

} from "../services/priority-service.js";


import {

    subscribeToAuthState,

    refreshCurrentUser,

    getCurrentUserVotingEligibility

} from "../services/auth-service.js";


import {

    getMonthlyParticipationStatus,

    getMonthlyParticipationMessage

} from "../services/firebase-service.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let controllerInitialized =
    false;


let unsubscribeAuthState =
    null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializePollsNationalPrioritiesController() {

    if (
        controllerInitialized
    ) {

        return;

    }


    controllerInitialized =
        true;


    initializeSliders();

    initializeForm();

    initializeVotingAccess();

}


/*
==================================================
VOTING ACCESS
==================================================
*/

function initializeVotingAccess() {

    const form =
        document.getElementById(
            "nationalPrioritiesForm"
        );


    if (!form) {

        return;

    }


    const submitButton =
        form.querySelector(
            ".national-priorities-form__submit"
        );


    disableFormControls(
        form
    );


    if (
        submitButton
    ) {

        submitButton.disabled =
            true;


        submitButton.textContent =
            "Checking Participation Access...";

    }


    showMessage(
        "Checking your participation access...",
        "info"
    );


    unsubscribeAuthState =
        subscribeToAuthState(

            async user => {

                if (!user) {

                    blockIneligibleVoting(
                        form,
                        submitButton,
                        {
                            reason:
                                "signedOut"
                        }
                    );


                    return;

                }


                try {

                    const refreshedUser =
                        await refreshCurrentUser();


                    if (!refreshedUser) {

                        blockIneligibleVoting(
                            form,
                            submitButton,
                            {
                                reason:
                                    "signedOut"
                            }
                        );


                        return;

                    }


                    await refreshVotingAccess(
                        form,
                        submitButton
                    );

                } catch (error) {

                    console.error(
                        "National priorities auth initialization failed:",
                        error
                    );


                    blockAccessFailure(
                        form,
                        submitButton
                    );

                }

            },

            error => {

                console.error(
                    "National priorities auth state error:",
                    error
                );


                blockAccessFailure(
                    form,
                    submitButton
                );

            }

        );

}


/*
==================================================
REFRESH VOTING ACCESS
==================================================
*/

async function refreshVotingAccess(
    form,
    submitButton
) {

    try {

        /*
        ----------------------------------------------
        ACCOUNT ELIGIBILITY
        ----------------------------------------------
        */

        const eligibility =
            await getCurrentUserVotingEligibility();


        if (
            !eligibility?.eligible
        ) {

            blockIneligibleVoting(
                form,
                submitButton,
                eligibility
            );


            return;

        }


        /*
        ----------------------------------------------
        MONTHLY PARTICIPATION CHECK
        ----------------------------------------------
        */

        const monthlyStatus =
            await getMonthlyParticipationStatus(
                "nationalPriorities"
            );


        if (
            !monthlyStatus?.eligible
        ) {

            blockMonthlyVoting(
                form,
                submitButton,
                monthlyStatus
            );


            return;

        }


        enableEligibleVoting(
            form,
            submitButton
        );

    } catch (error) {

        console.error(
            "National priorities eligibility check failed:",
            error
        );


        blockAccessFailure(
            form,
            submitButton
        );

    }

}


/*
==================================================
ENABLE ELIGIBLE VOTING
==================================================
*/

function enableEligibleVoting(
    form,
    submitButton
) {

    enableFormControls(
        form
    );


    if (
        submitButton
    ) {

        submitButton.disabled =
            false;


        submitButton.textContent =
            "Submit National Priorities";

    }


    showMessage(
        "",
        "info"
    );

}


/*
==================================================
MONTHLY BLOCK
==================================================
*/

function blockMonthlyVoting(
    form,
    submitButton,
    monthlyStatus
) {

    disableFormControls(
        form
    );


    if (
        submitButton
    ) {

        submitButton.disabled =
            true;


        if (
            monthlyStatus?.reason ===
            "alreadyParticipatedThisMonth"
        ) {

            submitButton.textContent =
                "Response Submitted";

        } else {

            submitButton.textContent =
                "Participation Unavailable";

        }

    }


    showMessage(
        getMonthlyParticipationMessage(
            monthlyStatus
        ),
        monthlyStatus?.reason ===
            "alreadyParticipatedThisMonth"
            ? "success"
            : "error"
    );

}


/*
==================================================
ACCESS FAILURE
==================================================
*/

function blockAccessFailure(
    form,
    submitButton
) {

    disableFormControls(
        form
    );


    if (
        submitButton
    ) {

        submitButton.disabled =
            true;


        submitButton.textContent =
            "Participation Unavailable";

    }


    showMessage(
        "Voting access could not be confirmed. Please sign in again.",
        "error"
    );

}


/*
==================================================
SLIDERS
==================================================
*/

function initializeSliders() {

    const issues =
        getNationalIssues();


    issues.forEach(
        issue => {

            const input =
                document.querySelector(
                    `[name="${issue.id}"]`
                );


            if (!input) {

                return;

            }


            const output =
                document.querySelector(
                    `output[for="${input.id}"]`
                );


            updateOutput(
                input,
                output
            );


            input.addEventListener(
                "input",
                () => {

                    updateOutput(
                        input,
                        output
                    );

                }
            );

        }
    );

}


function updateOutput(
    input,
    output
) {

    if (
        !input ||
        !output
    ) {

        return;

    }


    output.value =
        input.value;


    output.textContent =
        input.value;

}


/*
==================================================
FORM
==================================================
*/

function initializeForm() {

    const form =
        document.getElementById(
            "nationalPrioritiesForm"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        handleFormSubmit
    );

}


/*
==================================================
FORM SUBMISSION
==================================================
*/

async function handleFormSubmit(
    event
) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const submitButton =
        form.querySelector(
            ".national-priorities-form__submit"
        );


    try {

        const refreshedUser =
            await refreshCurrentUser();


        if (!refreshedUser) {

            blockIneligibleVoting(
                form,
                submitButton,
                {
                    reason:
                        "signedOut"
                }
            );


            return;

        }


        const eligibility =
            await getCurrentUserVotingEligibility();


        if (
            !eligibility?.eligible
        ) {

            blockIneligibleVoting(
                form,
                submitButton,
                eligibility
            );


            return;

        }


        const monthlyStatus =
            await getMonthlyParticipationStatus(
                "nationalPriorities"
            );


        if (
            !monthlyStatus?.eligible
        ) {

            blockMonthlyVoting(
                form,
                submitButton,
                monthlyStatus
            );


            return;

        }

    } catch (error) {

        console.error(
            "National priorities submit eligibility check failed:",
            error
        );


        blockAccessFailure(
            form,
            submitButton
        );


        return;

    }


    const ratings =
        collectRatings(
            form
        );


    setSubmittingState(
        submitButton,
        true
    );


    showMessage(
        "Saving your national priority ratings...",
        "info"
    );


    try {

        await submitNationalPriorityRatings(
            ratings
        );


        showMessage(
            "Thank you. Your national priority ratings have been recorded for this month.",
            "success"
        );


        if (
            submitButton
        ) {

            submitButton.textContent =
                "Response Submitted";


            submitButton.disabled =
                true;

        }


        disableFormControls(
            form
        );

    } catch (error) {

        console.error(
            "National priorities submission error:",
            error
        );


        if (
            error?.code ===
            "already-participated-this-month"
        ) {

            await refreshVotingAccess(
                form,
                submitButton
            );


            return;

        }


        setSubmittingState(
            submitButton,
            false
        );


        showMessage(
            error?.message ||
            "Your response could not be submitted. Please try again.",
            "error"
        );

    }

}


/*
==================================================
BLOCK INELIGIBLE VOTING
==================================================
*/

function blockIneligibleVoting(
    form,
    submitButton,
    eligibility
) {

    disableFormControls(
        form
    );


    if (
        submitButton
    ) {

        submitButton.disabled =
            true;


        submitButton.textContent =
            getBlockedButtonText(
                eligibility?.reason
            );

    }


    showMessage(
        getEligibilityMessage(
            eligibility?.reason
        ),
        "error"
    );

}


/*
==================================================
ELIGIBILITY MESSAGE
==================================================
*/

function getEligibilityMessage(
    reason
) {

    switch (
        reason
    ) {

        case "signedOut":

            return "Sign in to participate in National Priorities.";


        case "emailNotVerified":

            return "Verify your email before participating.";


        case "zipMissing":

            return "Add a valid ZIP code to your profile before participating.";


        case "birthdayMissing":

            return "Your birthday is required before participating.";


        case "underMinimumAge":

            return "This account is not eligible to participate.";


        case "agreementMissing":

            return "The participation agreement must be accepted before voting.";


        case "verificationSyncPending":

            return "Your account verification is still being finalized. Please try again.";


        case "profileMissing":

            return "Your participant profile could not be loaded.";


        case "accessCheckFailed":

            return "Voting access could not be confirmed. Please sign in again.";


        default:

            return "Your account is not currently eligible to participate.";

    }

}


/*
==================================================
BLOCKED BUTTON TEXT
==================================================
*/

function getBlockedButtonText(
    reason
) {

    switch (
        reason
    ) {

        case "signedOut":

            return "Sign In Required";


        case "emailNotVerified":

            return "Verification Required";


        case "zipMissing":

            return "ZIP Code Required";


        case "birthdayMissing":

            return "Birthday Required";


        case "agreementMissing":

            return "Agreement Required";


        case "verificationSyncPending":

            return "Verification Pending";


        default:

            return "Participation Unavailable";

    }

}


/*
==================================================
COLLECT RATINGS
==================================================
*/

function collectRatings(
    form
) {

    const issues =
        getNationalIssues();


    return issues.reduce(
        (
            ratings,
            issue
        ) => {

            const input =
                form.elements[
                    issue.id
                ];


            ratings[
                issue.id
            ] =
                Number(
                    input?.value
                );


            return ratings;

        },
        {}
    );

}


/*
==================================================
FORM STATE
==================================================
*/

function setSubmittingState(
    button,
    isSubmitting
) {

    if (!button) {

        return;

    }


    button.disabled =
        isSubmitting;


    button.textContent =
        isSubmitting
            ? "Submitting..."
            : "Submit National Priorities";

}


function disableFormControls(
    form
) {

    if (!form) {

        return;

    }


    form
        .querySelectorAll(
            'input[type="range"]'
        )
        .forEach(
            input => {

                input.disabled =
                    true;

            }
        );

}


function enableFormControls(
    form
) {

    if (!form) {

        return;

    }


    form
        .querySelectorAll(
            'input[type="range"]'
        )
        .forEach(
            input => {

                input.disabled =
                    false;

            }
        );

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

    const messageElement =
        document.getElementById(
            "nationalPrioritiesMessage"
        );


    if (!messageElement) {

        return;

    }


    messageElement.textContent =
        message;


    messageElement.dataset.messageType =
        type;

}


/*
==================================================
CLEANUP
==================================================
*/

export function destroyPollsNationalPrioritiesController() {

    const form =
        document.getElementById(
            "nationalPrioritiesForm"
        );


    if (
        form
    ) {

        form.removeEventListener(
            "submit",
            handleFormSubmit
        );

    }


    if (
        typeof unsubscribeAuthState ===
        "function"
    ) {

        unsubscribeAuthState();

    }


    unsubscribeAuthState =
        null;


    controllerInitialized =
        false;

}