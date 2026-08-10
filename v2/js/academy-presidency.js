/*
==================================================
CIVIC HORIZON INDEX V2
ACADEMY LESSON 5
THE PRESIDENCY
==================================================
*/


/*
==================================================
SCENARIOS
==================================================
*/


const presidencyScenarios = [

    {
        category: "Veto Power",

        title:
            "Congress passes a bill that the president strongly opposes.",

        prompt:
            "Which constitutional option can the president use?",

        answers: [
            "Ask the Supreme Court to cancel the bill",
            "Veto the bill",
            "Dissolve Congress",
            "Cancel the next election"
        ],

        correctAnswer: 1,

        explanation:
            "The president may veto legislation passed by Congress. Congress can attempt to override that veto with a two-thirds vote in both chambers."
    },

    {
        category: "Appointments",

        title:
            "A vacancy opens on the United States Supreme Court.",

        prompt:
            "What role does the president have in filling the vacancy?",

        answers: [
            "Let state governors choose",
            "Ask the House to elect a justice",
            "Nominate a candidate, subject to Senate confirmation",
            "Appoint anyone permanently without review"
        ],

        correctAnswer: 2,

        explanation:
            "The president nominates Supreme Court justices, but the Senate decides whether to confirm the nominee."
    },

    {
        category: "Commander in Chief",

        title:
            "The United States military is carrying out an operation overseas.",

        prompt:
            "Which statement best describes the president's military role?",

        answers: [
            "State governors control the entire U.S. military",
            "The Supreme Court commands the armed forces",
            "The president alone has the constitutional power to declare war",
            "The president serves as Commander in Chief"
        ],

        correctAnswer: 3,

        explanation:
            "The president is Commander in Chief of the armed forces, while Congress has separate constitutional powers related to war, military funding, and regulation."
    },

    {
        category: "Executive Orders",

        title:
            "The president wants to direct how executive agencies carry out existing federal law.",

        prompt:
            "Which tool may the president use within lawful executive authority?",

        answers: [
            "An executive order",
            "A constitutional amendment",
            "A Supreme Court opinion",
            "A state referendum"
        ],

        correctAnswer: 0,

        explanation:
            "Presidents may issue executive orders directing executive branch operations, but those orders must remain within constitutional and statutory authority."
    },

    {
        category: "Treaties",

        title:
            "The president negotiates a treaty with another country.",

        prompt:
            "What must generally happen before the United States can ratify the treaty?",

        answers: [
            "Every governor must agree",
            "The House alone must approve it",
            "The Senate must give its advice and consent",
            "The Supreme Court must sign it"
        ],

        correctAnswer: 2,

        explanation:
            "The president negotiates treaties, but the Constitution requires approval by two-thirds of senators present before ratification."
    },

    {
        category: "Federal Spending",

        title:
            "The president proposes a major new federal program.",

        prompt:
            "Can the president generally spend unlimited federal money without Congress?",

        answers: [
            "Yes, if the vice president agrees",
            "No, Congress controls federal appropriations",
            "Yes, the president controls all federal money",
            "Only the Supreme Court controls federal spending"
        ],

        correctAnswer: 1,

        explanation:
            "Congress exercises the power of the purse. Executive programs generally depend on funding authorized and appropriated through federal law."
    },

    {
        category: "Judicial Review",

        title:
            "A presidential action is challenged in federal court.",

        prompt:
            "Can federal courts review whether the action complies with the Constitution and federal law?",

        answers: [
            "Only state governors may review it",
            "No, presidential actions can never be reviewed",
            "Only Congress can hear court cases",
            "Yes"
        ],

        correctAnswer: 3,

        explanation:
            "Federal courts may review executive actions when resolving cases and controversies within their jurisdiction."
    },

    {
        category: "Limits on Presidential Power",

        title:
            "A president wants to create a new federal law without Congress passing legislation.",

        prompt:
            "Which statement is most accurate?",

        answers: [
            "The president cannot unilaterally enact a new federal statute",
            "An executive order automatically becomes a constitutional amendment",
            "The president can permanently eliminate Congress",
            "The president can pass any law alone"
        ],

        correctAnswer: 0,

        explanation:
            "Federal statutes are enacted through the legislative process involving Congress and the president. Executive authority does not allow a president to simply replace Congress's lawmaking role."
    }

];


/*
==================================================
STATE
==================================================
*/

let currentScenarioIndex = 0;
let correctAnswers = 0;
let scenarioAnswered = false;


/*
==================================================
COMPONENT LOADING
==================================================
*/

async function loadComponent(
    containerId,
    componentPath
) {

    const container =
        document.getElementById(
            containerId
        );


    if (!container) {
        return false;
    }


    try {

        const response =
            await fetch(
                componentPath
            );


        if (!response.ok) {

            throw new Error(
                `Component request failed: ${response.status}`
            );

        }


        container.innerHTML =
            await response.text();


        return true;

    } catch (error) {

        console.error(
            `Could not load ${componentPath}:`,
            error
        );


        return false;

    }

}


/*
==================================================
INITIALIZE PAGE
==================================================
*/

async function initializePresidencyLesson() {

    await Promise.all([

        loadComponent(
            "headerContainer",
            "components/header.html"
        ),

        loadComponent(
            "footerContainer",
            "components/footer.html"
        )

    ]);


    initializeHeader();

    initializeLessonEvents();

    displayScenario();

}


/*
==================================================
EVENTS
==================================================
*/

function initializeLessonEvents() {

    const answerOptions =
        document.getElementById(
            "presidencyAnswerOptions"
        );


    const nextButton =
        document.getElementById(
            "presidencyNextButton"
        );


    const restartButton =
        document.getElementById(
            "presidencyRestartButton"
        );


    if (answerOptions) {

        answerOptions.addEventListener(
            "click",
            handleAnswer
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            goToNextScenario
        );

    }


    if (restartButton) {

        restartButton.addEventListener(
            "click",
            restartLesson
        );

    }

}


/*
==================================================
DISPLAY SCENARIO
==================================================
*/

function displayScenario() {

    const scenario =
        presidencyScenarios[
            currentScenarioIndex
        ];


    const scenarioNumber =
        currentScenarioIndex + 1;


    const progressPercent =
        Math.round(
            (
                scenarioNumber /
                presidencyScenarios.length
            ) * 100
        );


    scenarioAnswered =
        false;


    setText(
        "presidencyQuestionNumber",
        `Scenario ${scenarioNumber} of ${presidencyScenarios.length}`
    );


    setText(
        "presidencyProgressPercent",
        `${progressPercent}%`
    );


    setText(
        "presidencyScorePreview",
        `Score: ${correctAnswers} correct`
    );


    setText(
        "presidencyCategory",
        scenario.category
    );


    setText(
        "presidencyScenarioTitle",
        scenario.title
    );


    setText(
        "presidencyScenarioText",
        scenario.prompt
    );


    const progressFill =
        document.getElementById(
            "presidencyProgressFill"
        );


    if (progressFill) {

        progressFill.style.width =
            `${progressPercent}%`;

    }


    renderAnswers(
        scenario
    );


    hideFeedback();


    const nextButton =
        document.getElementById(
            "presidencyNextButton"
        );


    if (nextButton) {

        nextButton.hidden =
            true;

    }

}


/*
==================================================
RENDER ANSWERS
==================================================
*/

function renderAnswers(
    scenario
) {

    const container =
        document.getElementById(
            "presidencyAnswerOptions"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        scenario.answers
            .map(
                (answer, index) => {

                    return `
                        <button
                            type="button"
                            class="lesson-answer-button presidency-answer-button"
                            data-answer-index="${index}"
                        >

                            <span class="lesson-answer-letter">
                                ${String.fromCharCode(65 + index)}
                            </span>

                            <span>
                                ${escapeHtml(answer)}
                            </span>

                        </button>
                    `;

                }
            )
            .join("");

}


/*
==================================================
HANDLE ANSWER
==================================================
*/

function handleAnswer(
    event
) {

    const selectedButton =
        event.target.closest(
            ".presidency-answer-button"
        );


    if (
        !selectedButton ||
        scenarioAnswered
    ) {

        return;

    }


    scenarioAnswered =
        true;


    const selectedAnswerIndex =
        Number(
            selectedButton.dataset.answerIndex
        );


    const scenario =
        presidencyScenarios[
            currentScenarioIndex
        ];


    const answerButtons =
        document.querySelectorAll(
            ".presidency-answer-button"
        );


    answerButtons.forEach(
        button => {

            button.disabled =
                true;


            const answerIndex =
                Number(
                    button.dataset.answerIndex
                );


            if (
                answerIndex ===
                scenario.correctAnswer
            ) {

                button.classList.add(
                    "is-correct"
                );

            }

        }
    );


    if (
        selectedAnswerIndex ===
        scenario.correctAnswer
    ) {

        correctAnswers += 1;


        showFeedback(
            true,
            scenario.explanation
        );

    } else {

        selectedButton.classList.add(
            "is-incorrect"
        );


        showFeedback(
            false,
            scenario.explanation
        );

    }


    setText(
        "presidencyScorePreview",
        `Score: ${correctAnswers} correct`
    );


    const nextButton =
        document.getElementById(
            "presidencyNextButton"
        );


    if (nextButton) {

        nextButton.hidden =
            false;


        nextButton.textContent =
            currentScenarioIndex ===
            presidencyScenarios.length - 1
                ? "View Results"
                : "Continue";

    }

}


/*
==================================================
FEEDBACK
==================================================
*/

function showFeedback(
    correct,
    explanation
) {

    const feedback =
        document.getElementById(
            "presidencyFeedback"
        );


    const icon =
        document.getElementById(
            "presidencyFeedbackIcon"
        );


    if (!feedback) {
        return;
    }


    feedback.hidden =
        false;


    feedback.className =
        correct
            ? "lesson-feedback correct-feedback"
            : "lesson-feedback incorrect-feedback";


    if (icon) {

        icon.textContent =
            correct
                ? "✓"
                : "!";

    }


    setText(
        "presidencyFeedbackTitle",
        correct
            ? "Correct"
            : "Not quite"
    );


    setText(
        "presidencyFeedbackText",
        explanation
    );

}


function hideFeedback() {

    const feedback =
        document.getElementById(
            "presidencyFeedback"
        );


    if (feedback) {

        feedback.hidden =
            true;

    }

}


/*
==================================================
NEXT SCENARIO
==================================================
*/

function goToNextScenario() {

    if (!scenarioAnswered) {
        return;
    }


    currentScenarioIndex += 1;


    if (
        currentScenarioIndex >=
        presidencyScenarios.length
    ) {

        displayFinalResults();

        return;

    }


    displayScenario();


    document
        .getElementById(
            "presidencyGameCard"
        )
        ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

}


/*
==================================================
FINAL RESULTS
==================================================
*/

function displayFinalResults() {

    const gameCard =
        document.getElementById(
            "presidencyGameCard"
        );


    const resultsCard =
        document.getElementById(
            "presidencyResultsCard"
        );


    const finalPercent =
        Math.round(
            (
                correctAnswers /
                presidencyScenarios.length
            ) * 100
        );


    if (gameCard) {

        gameCard.hidden =
            true;

    }


    if (resultsCard) {

        resultsCard.hidden =
            false;

    }


    setText(
        "presidencyFinalScore",
        `${correctAnswers} / ${presidencyScenarios.length}`
    );


    setText(
        "presidencyFinalPercent",
        `${finalPercent}%`
    );


    setText(
        "presidencyResultMessage",
        getResultMessage(
            finalPercent
        )
    );


    saveLessonProgress(
        finalPercent
    );


    resultsCard?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/*
==================================================
RESULT MESSAGE
==================================================
*/

function getResultMessage(
    finalPercent
) {

    if (
        finalPercent ===
        100
    ) {

        return "Outstanding work. You demonstrated an excellent understanding of presidential powers and constitutional limits.";

    }


    if (
        finalPercent >=
        75
    ) {

        return "Excellent work. You understand the major powers of the presidency and how those powers interact with Congress and the courts.";

    }


    if (
        finalPercent >=
        50
    ) {

        return "Good work. Review the explanations and try again to strengthen your understanding of presidential authority and its limits.";

    }


    return "You completed the lesson. Try it again to reinforce which powers belong to the president and which require other branches of government.";

}


/*
==================================================
SAVE PROGRESS
==================================================
*/

function saveLessonProgress(
    finalPercent
) {

    try {

        window.localStorage.setItem(
            "civicAcademyPresidencyCompleted",
            "true"
        );


        const previousBestScore =
            Number(
                window.localStorage.getItem(
                    "civicAcademyPresidencyBestScore"
                ) || 0
            );


        window.localStorage.setItem(
            "civicAcademyPresidencyBestScore",
            String(
                Math.max(
                    finalPercent,
                    previousBestScore
                )
            )
        );

    } catch (error) {

        console.warn(
            "Presidency lesson progress could not be saved:",
            error
        );

    }

}


/*
==================================================
RESTART
==================================================
*/

function restartLesson() {

    currentScenarioIndex =
        0;


    correctAnswers =
        0;


    scenarioAnswered =
        false;


    const gameCard =
        document.getElementById(
            "presidencyGameCard"
        );


    const resultsCard =
        document.getElementById(
            "presidencyResultsCard"
        );


    if (resultsCard) {

        resultsCard.hidden =
            true;

    }


    if (gameCard) {

        gameCard.hidden =
            false;

    }


    displayScenario();


    gameCard?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/*
==================================================
HEADER
==================================================
*/

function initializeHeader() {

    const menuButton =
        document.getElementById(
            "mobileMenuButton"
        );


    const navigation =
        document.getElementById(
            "primaryNavigation"
        );


    const dropdownButtons =
        document.querySelectorAll(
            ".navigation-group__button"
        );


    if (
        menuButton &&
        navigation
    ) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    navigation.classList.toggle(
                        "open"
                    );


                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                menuButton.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );


                if (!isOpen) {

                    closeDropdowns();

                }

            }
        );

    }


    dropdownButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    const group =
                        button.closest(
                            ".navigation-group"
                        );


                    if (!group) {
                        return;
                    }


                    const isOpen =
                        group.classList.contains(
                            "open"
                        );


                    closeDropdowns();


                    if (!isOpen) {

                        group.classList.add(
                            "open"
                        );


                        button.setAttribute(
                            "aria-expanded",
                            "true"
                        );

                    }

                }
            );

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                !event.target.closest(
                    ".navigation-group"
                )
            ) {

                closeDropdowns();

            }

        }
    );

}


/*
==================================================
DROPDOWN HELPERS
==================================================
*/

function closeDropdowns() {

    document
        .querySelectorAll(
            ".navigation-group.open"
        )
        .forEach(
            group => {

                group.classList.remove(
                    "open"
                );


                const button =
                    group.querySelector(
                        ".navigation-group__button"
                    );


                if (button) {

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

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
START
==================================================
*/

initializePresidencyLesson();