/*
==================================================
CIVIC HORIZON INDEX V2
STATE QUESTION PARTICIPATION
==================================================
*/


import {

    subscribeToStateQuestions

} from "../services/state-question-service.js";


import {

    getStateQuestionVote,
    submitStateQuestionVote,
    subscribeToStateQuestionResults

} from "../services/state-question-vote-service.js";


import {

    auth

} from "../../../js/firebase.js";


const resultSubscriptions =
    [];


/*
==================================================
INITIALIZE
==================================================
*/

export function initializeStateQuestionParticipation(
    stateCode,
    stateName,
    participantJurisdiction
) {

    clearResultSubscriptions();


    const container =
        document.getElementById(
            "stateQuestions"
        );

    const heading =
        document.getElementById(
            "stateQuestionsHeading"
        );


    if (!container) {

        return null;

    }


    if (heading) {

        heading.textContent =
            `What ${stateName} participants are being asked`;

    }


    const unsubscribe =
        subscribeToStateQuestions(

            stateCode,

            questions => {

                const activeQuestions =
                    questions.filter(
                        question =>
                            question.active === true
                    );


                renderQuestions(
                    container,
                    stateCode,
                    stateName,
                    activeQuestions,
                    participantJurisdiction
                );

            },

            error => {

                console.error(
                    "State questions could not be loaded:",
                    error
                );


                container.innerHTML = `

                    <div class="state-placeholder-card">

                        <strong>
                            State questions unavailable
                        </strong>

                        <p>
                            State-specific questions could not be loaded
                            right now.
                        </p>

                    </div>

                `;

            }

        );


    return () => {

        if (
            typeof unsubscribe ===
            "function"
        ) {

            unsubscribe();

        }


        clearResultSubscriptions();

    };

}


/*
==================================================
RENDER QUESTIONS
==================================================
*/

async function renderQuestions(
    container,
    stateCode,
    stateName,
    questions,
    participantJurisdiction
) {

    clearResultSubscriptions();


    if (
        !Array.isArray(
            questions
        ) ||
        questions.length === 0
    ) {

        container.innerHTML = `

            <div class="state-placeholder-card">

                <strong>
                    No active ${escapeHtml(stateName)} questions
                </strong>

                <p>
                    New state-specific questions will appear here
                    when they are available.
                </p>

            </div>

        `;


        return;

    }


    container.innerHTML =
        questions
            .map(
                (
                    question,
                    index
                ) => createQuestionCard(
                    question,
                    index
                )
            )
            .join("");


    questions.forEach(
        question => {

            initializeQuestionResults(
                question
            );

        }
    );


    for (
        const question
        of questions
    ) {

        await initializeQuestionCard(
            question,
            stateCode,
            participantJurisdiction
        );

    }

}


/*
==================================================
QUESTION CARD
==================================================
*/

function createQuestionCard(
    question,
    index
) {

    return `

        <article
            class="state-question-card"
            data-state-question-id="${escapeHtml(question.id)}"
        >

            <span class="state-question-card__number">
                Question ${index + 1}
            </span>

            <h3>
                ${escapeHtml(question.question)}
            </h3>


            <div class="state-question-card__results">

                <div>
                    <span>Yes</span>

                    <strong data-result-yes>
                        0%
                    </strong>
                </div>

                <div>
                    <span>No</span>

                    <strong data-result-no>
                        0%
                    </strong>
                </div>

                <div>
                    <span>Unsure</span>

                    <strong data-result-unsure>
                        0%
                    </strong>
                </div>

                <div>
                    <span>Responses</span>

                    <strong data-result-total>
                        0
                    </strong>
                </div>

            </div>


            <div class="state-question-card__options">

                <button
                    type="button"
                    data-state-question-response="Yes"
                    disabled
                >
                    Yes
                </button>

                <button
                    type="button"
                    data-state-question-response="No"
                    disabled
                >
                    No
                </button>

                <button
                    type="button"
                    data-state-question-response="Unsure"
                    disabled
                >
                    Unsure
                </button>

            </div>


            <p
                class="state-question-card__message"
                data-state-question-message
            >
                Checking participation eligibility...
            </p>

        </article>

    `;

}


/*
==================================================
QUESTION RESULTS
==================================================
*/

function initializeQuestionResults(
    question
) {

    const card =
        document.querySelector(
            `[data-state-question-id="${cssEscape(question.id)}"]`
        );


    if (!card) {

        return;

    }


    const yesElement =
        card.querySelector(
            "[data-result-yes]"
        );

    const noElement =
        card.querySelector(
            "[data-result-no]"
        );

    const unsureElement =
        card.querySelector(
            "[data-result-unsure]"
        );

    const totalElement =
        card.querySelector(
            "[data-result-total]"
        );


    if (
        !yesElement ||
        !noElement ||
        !unsureElement ||
        !totalElement
    ) {

        return;

    }


    const unsubscribe =
        subscribeToStateQuestionResults(

            question.id,

            summary => {

                const total =
                    Number(
                        summary?.total ||
                        0
                    );


                yesElement.textContent =
                    formatPercentage(
                        summary?.yes,
                        total
                    );


                noElement.textContent =
                    formatPercentage(
                        summary?.no,
                        total
                    );


                unsureElement.textContent =
                    formatPercentage(
                        summary?.unsure,
                        total
                    );


                totalElement.textContent =
                    formatNumber(
                        total
                    );

            },

            error => {

                console.error(
                    "State question results could not be loaded:",
                    error
                );


                yesElement.textContent =
                    "—";

                noElement.textContent =
                    "—";

                unsureElement.textContent =
                    "—";

                totalElement.textContent =
                    "—";

            }

        );


    if (
        typeof unsubscribe ===
        "function"
    ) {

        resultSubscriptions.push(
            unsubscribe
        );

    }

}


/*
==================================================
INITIALIZE QUESTION
==================================================
*/

async function initializeQuestionCard(
    question,
    stateCode,
    participantJurisdiction
) {

    const card =
        document.querySelector(
            `[data-state-question-id="${cssEscape(question.id)}"]`
        );


    if (!card) {

        return;

    }


    const buttons =
        Array.from(
            card.querySelectorAll(
                "[data-state-question-response]"
            )
        );


    const message =
        card.querySelector(
            "[data-state-question-message]"
        );


    if (
        !message ||
        buttons.length === 0
    ) {

        return;

    }


    const user =
        auth.currentUser;


    if (!user) {

        message.textContent =
            "Sign in to participate.";

        return;

    }


    if (
        !user.emailVerified
    ) {

        message.textContent =
            "Verify your email before participating.";

        return;

    }


    const participantStateCode =
        String(
            participantJurisdiction
                ?.stateCode ||
            ""
        )
            .trim()
            .toUpperCase();


    if (
        participantStateCode !==
        stateCode
    ) {

        message.textContent =
            "Read only — this question is limited to participants in this state.";

        return;

    }


    try {

        const existingVote =
            await getStateQuestionVote(
                question.id,
                user.uid
            );


        if (
            existingVote
                ?.response
        ) {

            highlightResponse(
                buttons,
                existingVote.response
            );


            message.textContent =
                "Your response has already been recorded.";

            return;

        }


        enableButtons(
            buttons
        );


        message.textContent =
            "Choose one response.";


        buttons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    async () => {

                        const response =
                            button.dataset
                                .stateQuestionResponse;


                        await submitResponse(
                            question,
                            stateCode,
                            response,
                            user,
                            buttons,
                            message
                        );

                    }
                );

            }
        );


    } catch (error) {

        console.error(
            "State question participation status could not be loaded:",
            error
        );


        message.textContent =
            "Participation is temporarily unavailable.";

    }

}


/*
==================================================
SUBMIT RESPONSE
==================================================
*/

async function submitResponse(
    question,
    stateCode,
    response,
    user,
    buttons,
    message
) {

    disableButtons(
        buttons
    );


    message.textContent =
        "Saving your response...";


    try {

        await submitStateQuestionVote({

            questionId:
                question.id,

            stateCode,

            response,

            uid:
                user.uid

        });


        highlightResponse(
            buttons,
            response
        );


        message.textContent =
            "Your response has been recorded.";


    } catch (error) {

        console.error(
            "State question response could not be saved:",
            error
        );


        if (
            error?.code ===
            "already-voted"
        ) {

            message.textContent =
                "Your response has already been recorded.";

            return;

        }


        message.textContent =
            error?.message ||
            "Your response could not be recorded.";


        enableButtons(
            buttons
        );

    }

}


/*
==================================================
CLEAR RESULT SUBSCRIPTIONS
==================================================
*/

function clearResultSubscriptions() {

    while (
        resultSubscriptions.length >
        0
    ) {

        const unsubscribe =
            resultSubscriptions.pop();


        if (
            typeof unsubscribe ===
            "function"
        ) {

            unsubscribe();

        }

    }

}


/*
==================================================
BUTTON HELPERS
==================================================
*/

function enableButtons(
    buttons
) {

    buttons.forEach(
        button => {

            button.disabled =
                false;

        }
    );

}


function disableButtons(
    buttons
) {

    buttons.forEach(
        button => {

            button.disabled =
                true;

        }
    );

}


function highlightResponse(
    buttons,
    response
) {

    buttons.forEach(
        button => {

            button.classList.toggle(
                "is-selected",
                button.dataset
                    .stateQuestionResponse ===
                    response
            );

        }
    );

}


/*
==================================================
FORMAT PERCENTAGE
==================================================
*/

function formatPercentage(
    count,
    total
) {

    const cleanCount =
        Number(
            count ||
            0
        );

    const cleanTotal =
        Number(
            total ||
            0
        );


    if (
        cleanTotal <= 0
    ) {

        return "0%";

    }


    const percentage =
        (
            cleanCount /
            cleanTotal
        ) *
        100;


    return `${percentage.toFixed(1)}%`;

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


/*
==================================================
CSS ESCAPE
==================================================
*/

function cssEscape(
    value
) {

    if (
        window.CSS &&
        typeof window.CSS.escape ===
            "function"
    ) {

        return window.CSS.escape(
            String(
                value
            )
        );

    }


    return String(
        value
    ).replace(
        /["\\]/g,
        "\\$&"
    );

}