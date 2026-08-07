/*
==================================================
CIVIC HORIZON INDEX V2
ADMIN POLL EDITOR CONTROLLER
==================================================
*/

import {
    subscribeToCommunitySurveys,
    createCommunitySurvey,
    updateCommunitySurvey
} from "../services/firebase-service.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let controllerInitialized = false;

let unsubscribeSurveys = null;

let surveys = [];

let editingPollId = null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeAdminPollEditorController() {

    if (controllerInitialized) {
        return;
    }

    controllerInitialized = true;

    initializeEditorEvents();

    subscribeToSurveyData();

}


/*
==================================================
LIVE SURVEY DATA
==================================================
*/

function subscribeToSurveyData() {

    unsubscribeSurveys =
        subscribeToCommunitySurveys(
            records => {

                surveys =
                    Array.isArray(records)
                        ? records
                        : [];

                checkForRequestedEdit();

            },
            error => {

                console.error(
                    "Admin poll editor survey data error:",
                    error
                );

            }
        );

}


/*
==================================================
EVENTS
==================================================
*/

function initializeEditorEvents() {

    const form =
        document.getElementById(
            "adminPollEditorForm"
        );


    if (form) {

        form.addEventListener(
            "submit",
            handleEditorSubmit
        );

    }


    const addChoiceButton =
        document.getElementById(
            "adminAddPollChoice"
        );


    if (addChoiceButton) {

        addChoiceButton.addEventListener(
            "click",
            handleAddChoice
        );

    }


    const choicesContainer =
        document.getElementById(
            "adminPollChoices"
        );


    if (choicesContainer) {

        choicesContainer.addEventListener(
            "click",
            handleChoiceRemove
        );

    }


    const cancelButton =
        document.getElementById(
            "adminPollEditorCancel"
        );


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            resetEditor
        );

    }

}


/*
==================================================
REQUESTED EDIT
==================================================
*/

function checkForRequestedEdit() {

    const editorContainer =
        document.getElementById(
            "adminCreatePollContainer"
        );


    if (!editorContainer) {
        return;
    }


    const requestedPollId =
        editorContainer.dataset
            .editPollId;


    if (!requestedPollId) {
        return;
    }


    if (
        requestedPollId ===
        editingPollId
    ) {
        return;
    }


    const poll =
        surveys.find(
            item => {

                return (
                    String(item.id) ===
                    String(requestedPollId)
                );

            }
        );


    if (!poll) {
        return;
    }


    loadPollIntoEditor(
        poll
    );

}


/*
==================================================
LOAD POLL INTO EDITOR
==================================================
*/

function loadPollIntoEditor(
    poll
) {

    editingPollId =
        poll.id;


    setValue(
        "adminPollId",
        poll.id
    );


    setValue(
        "adminPollQuestion",
        poll.question || ""
    );


    const activeCheckbox =
        document.getElementById(
            "adminPollActive"
        );


    if (activeCheckbox) {

        activeCheckbox.checked =
            poll.active === true;

    }


    renderChoiceInputs(
        getPollChoices(
            poll
        )
    );


    setText(
        "adminPollEditorHeading",
        "Edit community poll"
    );


    setText(
        "adminPollEditorMode",
        "Editing an existing poll"
    );


    const submitButton =
        document.getElementById(
            "adminPollEditorSubmit"
        );


    if (submitButton) {

        submitButton.textContent =
            "Save Changes";

    }


    const cancelButton =
        document.getElementById(
            "adminPollEditorCancel"
        );


    if (cancelButton) {

        cancelButton.hidden =
            false;

    }


    clearEditorMessage();

}


/*
==================================================
FORM SUBMISSION
==================================================
*/

async function handleEditorSubmit(
    event
) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const submitButton =
        document.getElementById(
            "adminPollEditorSubmit"
        );


    const surveyData =
        collectEditorData(
            form
        );


    setSubmittingState(
        submitButton,
        true
    );


    showEditorMessage(
        editingPollId
            ? "Saving poll changes..."
            : "Creating community poll...",
        "info"
    );


    try {

        if (editingPollId) {

            await updateCommunitySurvey(
                String(
                    editingPollId
                ),
                surveyData
            );


            showEditorMessage(
                "Poll changes saved successfully.",
                "success"
            );

        } else {

            await createCommunitySurvey(
                surveyData
            );


            showEditorMessage(
                "Community poll created successfully.",
                "success"
            );

        }


        window.setTimeout(
            () => {

                resetEditor();

            },
            600
        );

    } catch (error) {

        console.error(
            "Admin poll editor save error:",
            error
        );


        setSubmittingState(
            submitButton,
            false
        );


        showEditorMessage(
            error?.message ||
            "The poll could not be saved.",
            "error"
        );

    }

}


/*
==================================================
COLLECT FORM DATA
==================================================
*/

function collectEditorData(
    form
) {

    const question =
        String(
            form.elements.question?.value ||
            ""
        ).trim();


    const active =
        Boolean(
            form.elements.active?.checked
        );


    const choices =
        Array
            .from(
                document.querySelectorAll(
                    ".admin-poll-choice-input"
                )
            )
            .map(
                input =>
                    input.value.trim()
            )
            .filter(Boolean);


    return {
        question,
        choices,
        active
    };

}


/*
==================================================
ADD CHOICE
==================================================
*/

function handleAddChoice() {

    const container =
        document.getElementById(
            "adminPollChoices"
        );


    if (!container) {
        return;
    }


    const currentCount =
        container.querySelectorAll(
            ".admin-poll-choice-row"
        ).length;


    const choiceNumber =
        currentCount + 1;


    container.insertAdjacentHTML(
        "beforeend",
        createChoiceRowHtml(
            "",
            choiceNumber
        )
    );


    const inputs =
        container.querySelectorAll(
            ".admin-poll-choice-input"
        );


    const newestInput =
        inputs[
            inputs.length - 1
        ];


    if (newestInput) {

        newestInput.focus();

    }

}


/*
==================================================
REMOVE CHOICE
==================================================
*/

function handleChoiceRemove(
    event
) {

    const button =
        event.target.closest(
            ".admin-poll-choice-remove"
        );


    if (!button) {
        return;
    }


    const container =
        document.getElementById(
            "adminPollChoices"
        );


    if (!container) {
        return;
    }


    const rows =
        container.querySelectorAll(
            ".admin-poll-choice-row"
        );


    if (
        rows.length <= 2
    ) {

        showEditorMessage(
            "A poll must keep at least two answer choices.",
            "error"
        );

        return;

    }


    const row =
        button.closest(
            ".admin-poll-choice-row"
        );


    if (row) {

        row.remove();

    }


    renumberChoicePlaceholders();

}


/*
==================================================
CHOICE RENDERING
==================================================
*/

function renderChoiceInputs(
    choices
) {

    const container =
        document.getElementById(
            "adminPollChoices"
        );


    if (!container) {
        return;
    }


    const safeChoices =
        Array.isArray(choices)
            ? choices
            : [];


    const normalizedChoices =
        safeChoices.length >= 2
            ? safeChoices
            : ["", ""];


    container.innerHTML =
        normalizedChoices
            .map(
                (choice, index) => {

                    return createChoiceRowHtml(
                        choice,
                        index + 1
                    );

                }
            )
            .join("");

}


/*
==================================================
CHOICE ROW HTML
==================================================
*/

function createChoiceRowHtml(
    choice,
    index
) {

    const safeChoice =
        escapeHtml(
            choice
        );


    return `
        <div class="admin-poll-choice-row">

            <input
                type="text"
                class="admin-poll-choice-input"
                placeholder="Choice ${index}"
                maxlength="120"
                value="${safeChoice}"
                required
            >

            <button
                type="button"
                class="admin-poll-choice-remove"
                aria-label="Remove choice"
            >
                Remove
            </button>

        </div>
    `;

}


/*
==================================================
RENUMBER CHOICES
==================================================
*/

function renumberChoicePlaceholders() {

    document
        .querySelectorAll(
            ".admin-poll-choice-input"
        )
        .forEach(
            (input, index) => {

                input.placeholder =
                    `Choice ${index + 1}`;

            }
        );

}


/*
==================================================
POLL CHOICE NORMALIZATION
==================================================
*/

function getPollChoices(
    poll
) {

    const candidates = [
        poll?.choices,
        poll?.options,
        poll?.answers
    ];


    for (
        const candidate
        of candidates
    ) {

        if (
            Array.isArray(
                candidate
            )
        ) {

            return candidate
                .map(
                    choice => {

                        if (
                            typeof choice ===
                            "string"
                        ) {

                            return choice;

                        }


                        if (
                            choice &&
                            typeof choice ===
                            "object"
                        ) {

                            return String(
                                choice.label ??
                                choice.text ??
                                choice.value ??
                                ""
                            );

                        }


                        return "";

                    }
                )
                .filter(Boolean);

        }

    }


    return [];

}


/*
==================================================
RESET EDITOR
==================================================
*/

function resetEditor() {

    editingPollId =
        null;


    const editorContainer =
        document.getElementById(
            "adminCreatePollContainer"
        );


    if (editorContainer) {

        delete editorContainer.dataset
            .editPollId;

    }


    const form =
        document.getElementById(
            "adminPollEditorForm"
        );


    if (form) {

        form.reset();

    }


    setValue(
        "adminPollId",
        ""
    );


    renderChoiceInputs(
        ["", ""]
    );


    setText(
        "adminPollEditorHeading",
        "Create a community poll"
    );


    setText(
        "adminPollEditorMode",
        "Creating a new poll"
    );


    const activeCheckbox =
        document.getElementById(
            "adminPollActive"
        );


    if (activeCheckbox) {

        activeCheckbox.checked =
            true;

    }


    const submitButton =
        document.getElementById(
            "adminPollEditorSubmit"
        );


    if (submitButton) {

        submitButton.disabled =
            false;

        submitButton.textContent =
            "Create Poll";

    }


    const cancelButton =
        document.getElementById(
            "adminPollEditorCancel"
        );


    if (cancelButton) {

        cancelButton.hidden =
            true;

    }


    clearEditorMessage();

}


/*
==================================================
SUBMIT STATE
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
            ? "Saving..."
            : (
                editingPollId
                    ? "Save Changes"
                    : "Create Poll"
            );

}


/*
==================================================
MESSAGE
==================================================
*/

function showEditorMessage(
    message,
    type
) {

    const element =
        document.getElementById(
            "adminPollEditorMessage"
        );


    if (!element) {
        return;
    }


    element.textContent =
        message;


    element.dataset.messageType =
        type;

}


function clearEditorMessage() {

    const element =
        document.getElementById(
            "adminPollEditorMessage"
        );


    if (!element) {
        return;
    }


    element.textContent =
        "";


    delete element.dataset
        .messageType;

}


/*
==================================================
DOM HELPERS
==================================================
*/

function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            String(value);

    }

}


function setValue(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.value =
            String(value);

    }

}


/*
==================================================
ESCAPE HTML
==================================================
*/

function escapeHtml(
    value
) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/*
==================================================
CLEANUP
==================================================
*/

export function destroyAdminPollEditorController() {

    if (
        typeof unsubscribeSurveys ===
        "function"
    ) {

        unsubscribeSurveys();

    }


    const form =
        document.getElementById(
            "adminPollEditorForm"
        );


    if (form) {

        form.removeEventListener(
            "submit",
            handleEditorSubmit
        );

    }


    const addChoiceButton =
        document.getElementById(
            "adminAddPollChoice"
        );


    if (addChoiceButton) {

        addChoiceButton.removeEventListener(
            "click",
            handleAddChoice
        );

    }


    const choicesContainer =
        document.getElementById(
            "adminPollChoices"
        );


    if (choicesContainer) {

        choicesContainer.removeEventListener(
            "click",
            handleChoiceRemove
        );

    }


    const cancelButton =
        document.getElementById(
            "adminPollEditorCancel"
        );


    if (cancelButton) {

        cancelButton.removeEventListener(
            "click",
            resetEditor
        );

    }


    unsubscribeSurveys = null;

    surveys = [];

    editingPollId = null;

    controllerInitialized = false;

}