/*
==================================================
CIVIC HORIZON INDEX V2
ADMIN STATE QUESTIONS
==================================================
*/


import {

    createStateQuestion,
    subscribeToStateQuestions,
    updateStateQuestion,
    deleteStateQuestion

} from "../services/state-question-service.js";


const states = {

    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming"

};


let activeStateSubscription =
    null;


/*
==================================================
INITIALIZE
==================================================
*/

export function initializeAdminStateQuestions() {

    const select =
        document.getElementById(
            "adminStateQuestionState"
        );

    const list =
        document.getElementById(
            "adminStateQuestionsList"
        );

    const editor =
        document.getElementById(
            "adminStateQuestionEditor"
        );

    const questionInput =
        document.getElementById(
            "adminStateQuestionText"
        );

    const addButton =
        document.getElementById(
            "adminAddStateQuestionButton"
        );


    if (
        !select ||
        !list
    ) {

        return;

    }


    buildStateOptions(
        select
    );


    select.addEventListener(
        "change",
        () => {

            const stateCode =
                select.value;


            stopActiveSubscription();


            if (
                !stateCode ||
                !states[stateCode]
            ) {

                if (editor) {

                    editor.hidden =
                        true;

                }


                renderChooseState(
                    list
                );


                return;

            }


            if (editor) {

                editor.hidden =
                    false;

            }


            if (questionInput) {

                questionInput.value =
                    "";

            }


            renderLoadingState(
                list,
                stateCode
            );


            activeStateSubscription =
                subscribeToStateQuestions(

                    stateCode,

                    questions => {

                        renderStateQuestions(
                            list,
                            stateCode,
                            questions
                        );

                    },

                    error => {

                        console.error(
                            "State questions could not be loaded:",
                            error
                        );


                        renderLoadError(
                            list,
                            stateCode
                        );

                    }

                );

        }
    );


    if (
        addButton &&
        questionInput
    ) {

        addButton.addEventListener(
            "click",
            async () => {

                const stateCode =
                    select.value;

                const question =
                    questionInput
                        .value
                        .trim();


                if (
                    !stateCode ||
                    !states[stateCode]
                ) {

                    return;

                }


                if (!question) {

                    questionInput.focus();

                    return;

                }


                addButton.disabled =
                    true;


                addButton.textContent =
                    "Adding...";


                try {

                    await createStateQuestion(
                        stateCode,
                        question
                    );


                    questionInput.value =
                        "";


                    questionInput.focus();


                } catch (error) {

                    console.error(
                        "State question could not be created:",
                        error
                    );


                    window.alert(
                        error?.message ||
                        "The state question could not be added."
                    );


                } finally {

                    addButton.disabled =
                        false;


                    addButton.textContent =
                        "Add Question";

                }

            }
        );

    }


    list.addEventListener(
        "click",
        async event => {

            const button =
                event.target.closest(
                    "[data-state-question-action]"
                );


            if (!button) {

                return;

            }


            const action =
                button.dataset
                    .stateQuestionAction;

            const questionId =
                button.dataset
                    .questionId;

            const stateCode =
                select.value;


            if (
                !stateCode ||
                !questionId
            ) {

                return;

            }


            if (
                action ===
                "edit"
            ) {

                await handleEditQuestion(
                    stateCode,
                    questionId,
                    button
                );


                return;

            }


            if (
                action ===
                "toggle"
            ) {

                await handleToggleQuestion(
                    stateCode,
                    questionId,
                    button
                );


                return;

            }


            if (
                action ===
                "delete"
            ) {

                await handleDeleteQuestion(
                    stateCode,
                    questionId,
                    button
                );

            }

        }
    );

}


/*
==================================================
EDIT QUESTION
==================================================
*/

async function handleEditQuestion(
    stateCode,
    questionId,
    button
) {

    const currentQuestion =
        button.dataset.question ||
        "";


    const updatedQuestion =
        window.prompt(
            "Edit state question:",
            currentQuestion
        );


    if (
        updatedQuestion ===
        null
    ) {

        return;

    }


    const cleanQuestion =
        updatedQuestion.trim();


    if (!cleanQuestion) {

        return;

    }


    try {

        button.disabled =
            true;


        await updateStateQuestion(
            stateCode,
            questionId,
            {
                question:
                    cleanQuestion
            }
        );


    } catch (error) {

        console.error(
            "State question could not be updated:",
            error
        );


        window.alert(
            error?.message ||
            "The state question could not be updated."
        );


    } finally {

        button.disabled =
            false;

    }

}


/*
==================================================
TOGGLE ACTIVE STATUS
==================================================
*/

async function handleToggleQuestion(
    stateCode,
    questionId,
    button
) {

    const isActive =
        button.dataset.active ===
        "true";


    try {

        button.disabled =
            true;


        await updateStateQuestion(
            stateCode,
            questionId,
            {
                active:
                    !isActive
            }
        );


    } catch (error) {

        console.error(
            "State question status could not be updated:",
            error
        );


        window.alert(
            error?.message ||
            "The question status could not be updated."
        );


    } finally {

        button.disabled =
            false;

    }

}


/*
==================================================
DELETE QUESTION
==================================================
*/

async function handleDeleteQuestion(
    stateCode,
    questionId,
    button
) {

    const confirmed =
        window.confirm(
            "Permanently delete this state question?\n\nThis cannot be undone."
        );


    if (!confirmed) {

        return;

    }


    try {

        button.disabled =
            true;


        button.textContent =
            "Deleting...";


        await deleteStateQuestion(
            stateCode,
            questionId
        );


    } catch (error) {

        console.error(
            "State question could not be deleted:",
            error
        );


        window.alert(
            error?.message ||
            "The state question could not be deleted."
        );


        button.disabled =
            false;


        button.textContent =
            "Delete";

    }

}


/*
==================================================
STATE OPTIONS
==================================================
*/

function buildStateOptions(
    select
) {

    if (
        select.options.length >
        1
    ) {

        return;

    }


    const options =
        Object.entries(
            states
        )
            .map(
                (
                    [
                        stateCode,
                        stateName
                    ]
                ) => `

                    <option value="${stateCode}">
                        ${stateName}
                    </option>

                `
            )
            .join("");


    select.insertAdjacentHTML(
        "beforeend",
        options
    );

}


/*
==================================================
CHOOSE STATE
==================================================
*/

function renderChooseState(
    list
) {

    list.innerHTML = `

        <div class="admin-placeholder-card">

            <strong>
                Choose a state
            </strong>

            <p>
                State-specific questions will appear here.
            </p>

        </div>

    `;

}


/*
==================================================
LOADING
==================================================
*/

function renderLoadingState(
    list,
    stateCode
) {

    list.innerHTML = `

        <div class="admin-placeholder-card">

            <strong>
                Loading ${escapeHtml(states[stateCode])} Questions
            </strong>

            <p>
                Retrieving saved state questions...
            </p>

        </div>

    `;

}


/*
==================================================
LOAD ERROR
==================================================
*/

function renderLoadError(
    list,
    stateCode
) {

    list.innerHTML = `

        <div class="admin-placeholder-card">

            <strong>
                ${escapeHtml(states[stateCode])} Questions
            </strong>

            <p>
                State questions could not be loaded.
            </p>

        </div>

    `;

}


/*
==================================================
RENDER QUESTIONS
==================================================
*/

function renderStateQuestions(
    list,
    stateCode,
    questions
) {

    const stateName =
        states[
            stateCode
        ];


    const cleanQuestions =
        Array.isArray(
            questions
        )
            ? questions
            : [];


    const activeCount =
        cleanQuestions.filter(
            item =>
                item.active ===
                true
        ).length;


    const inactiveCount =
        cleanQuestions.length -
        activeCount;


    if (
        cleanQuestions.length ===
        0
    ) {

        list.innerHTML = `

            <div class="admin-state-question-group">

                ${createStateSummary(
                    stateName,
                    0,
                    0,
                    0
                )}


                <div class="admin-placeholder-card">

                    <strong>
                        No ${escapeHtml(stateName)} questions yet
                    </strong>

                    <p>
                        Add the first state-specific question above.
                    </p>

                </div>

            </div>

        `;


        return;

    }


    list.innerHTML = `

        <div class="admin-state-question-group">

            ${createStateSummary(
                stateName,
                cleanQuestions.length,
                activeCount,
                inactiveCount
            )}


            <div class="admin-state-question-items">

                ${
                    cleanQuestions
                        .map(
                            (
                                item,
                                index
                            ) => createQuestionItem(
                                item,
                                index
                            )
                        )
                        .join("")
                }

            </div>

        </div>

    `;

}


/*
==================================================
STATE SUMMARY
==================================================
*/

function createStateSummary(
    stateName,
    totalCount,
    activeCount,
    inactiveCount
) {

    return `

        <div class="admin-state-question-summary">

            <div>

                <span>
                    ${escapeHtml(stateName)}
                </span>

                <strong>
                    ${formatQuestionCount(totalCount)}
                </strong>

            </div>


            <div>

                <span>
                    Active
                </span>

                <strong>
                    ${formatNumber(activeCount)}
                </strong>

            </div>


            <div>

                <span>
                    Inactive
                </span>

                <strong>
                    ${formatNumber(inactiveCount)}
                </strong>

            </div>

        </div>

    `;

}


/*
==================================================
QUESTION ITEM
==================================================
*/

function createQuestionItem(
    item,
    index
) {

    const isActive =
        item.active ===
        true;


    return `

        <div class="admin-state-question-item">

            <div class="admin-state-question-item__top">

                <span class="admin-state-question-item__number">
                    Question ${index + 1}
                </span>


                <span
                    class="
                        admin-state-question-item__status
                        ${
                            isActive
                                ? "is-active"
                                : "is-inactive"
                        }
                    "
                >
                    ${
                        isActive
                            ? "Active"
                            : "Inactive"
                    }
                </span>

            </div>


            <p>
                ${escapeHtml(item.question)}
            </p>


            <div class="admin-state-question-actions">

                <button
                    type="button"
                    data-state-question-action="edit"
                    data-question-id="${escapeHtml(item.id)}"
                    data-question="${escapeHtml(item.question)}"
                >
                    Edit
                </button>


                <button
                    type="button"
                    data-state-question-action="toggle"
                    data-question-id="${escapeHtml(item.id)}"
                    data-active="${isActive}"
                >
                    ${
                        isActive
                            ? "Set Inactive"
                            : "Set Active"
                    }
                </button>


                ${
                    !isActive
                        ? `
                            <button
                                type="button"
                                class="admin-state-question-delete"
                                data-state-question-action="delete"
                                data-question-id="${escapeHtml(item.id)}"
                            >
                                Delete
                            </button>
                        `
                        : ""
                }

            </div>

        </div>

    `;

}


/*
==================================================
QUESTION COUNT
==================================================
*/

function formatQuestionCount(
    count
) {

    return (
        count ===
        1
            ? "1 Question"
            : `${formatNumber(count)} Questions`
    );

}


/*
==================================================
FORMAT NUMBER
==================================================
*/

function formatNumber(
    value
) {

    const number =
        Number(
            value
        );


    if (
        !Number.isFinite(
            number
        )
    ) {

        return "0";

    }


    return number
        .toLocaleString();

}


/*
==================================================
STOP SUBSCRIPTION
==================================================
*/

function stopActiveSubscription() {

    if (
        typeof activeStateSubscription ===
        "function"
    ) {

        activeStateSubscription();

    }


    activeStateSubscription =
        null;

}


/*
==================================================
HTML ESCAPE
==================================================
*/

function escapeHtml(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}