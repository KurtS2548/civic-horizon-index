/*
==================================================
CIVIC HORIZON INDEX V2
POLLS NATIONAL PRIORITIES CONTROLLER
==================================================
*/

import {
    submitNationalPriorityRatings,
    getNationalIssues
} from "../services/priority-service.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let controllerInitialized = false;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializePollsNationalPrioritiesController() {

    if (controllerInitialized) {
        return;
    }

    controllerInitialized = true;

    initializeSliders();
    initializeForm();

}


/*
==================================================
SLIDERS
==================================================
*/

function initializeSliders() {

    const issues =
        getNationalIssues();


    issues.forEach(issue => {

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

    });

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


    const ratings =
        collectRatings(form);


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
            "Thank you. Your national priority ratings have been recorded.",
            "success"
        );


        setSubmittingState(
            submitButton,
            false
        );


        submitButton.textContent =
            "Response Submitted";


        submitButton.disabled =
            true;


        disableFormControls(
            form
        );

    } catch (error) {

        console.error(
            "National priorities submission error:",
            error
        );


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
COLLECT RATINGS
==================================================
*/

function collectRatings(
    form
) {

    const issues =
        getNationalIssues();


    return issues.reduce(
        (ratings, issue) => {

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

    form
        .querySelectorAll(
            'input[type="range"]'
        )
        .forEach(input => {

            input.disabled = true;

        });

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


    if (form) {

        form.removeEventListener(
            "submit",
            handleFormSubmit
        );

    }


    controllerInitialized = false;

}