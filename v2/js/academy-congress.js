/*
==================================================
CIVIC HORIZON INDEX V2
ACADEMY LESSON 4
CONGRESS
==================================================
*/


/*
==================================================
CHALLENGES
==================================================
*/

const congressChallenges = [

    {
        category: "Two Chambers",

        title:
            "A proposal has passed the House of Representatives.",

        prompt:
            "What must generally happen next before the proposal can be sent to the president?",

        answers: [
            "The Senate must also pass the legislation",
            "The Supreme Court must approve it",
            "The president may sign it immediately",
            "State governors must vote on it"
        ],

        correctAnswer: 0,

        explanation:
            "Federal legislation generally must pass both the House and the Senate before it can be presented to the president."
    },

    {
        category: "Committees",

        title:
            "A new bill has just been introduced in Congress.",

        prompt:
            "What role do congressional committees often play?",

        answers: [
            "They study legislation, hold hearings, and consider changes",
            "They replace the president",
            "They conduct state elections",
            "They interpret the Constitution for the courts"
        ],

        correctAnswer: 0,

        explanation:
            "Committees examine bills in detail, may hold hearings, consider amendments, and decide whether legislation should advance."
    },

    {
        category: "House and Senate",

        title:
            "A senator and a representative are discussing their chambers.",

        prompt:
            "Which statement correctly describes Congress?",

        answers: [
            "Congress includes both the House of Representatives and the Senate",
            "Congress consists only of the Senate",
            "Congress consists only of the House",
            "Congress is part of the judicial branch"
        ],

        correctAnswer: 0,

        explanation:
            "The legislative branch is bicameral. Congress consists of the House of Representatives and the Senate."
    },

    {
        category: "Representation",

        title:
            "Two states have very different populations.",

        prompt:
            "How is representation different between the House and Senate?",

        answers: [
            "House seats are based on population, while each state has two senators",
            "Every state has the same number of House members and senators",
            "Senate seats are based only on population",
            "House seats are assigned by the president"
        ],

        correctAnswer: 0,

        explanation:
            "House representation is apportioned largely by state population, while every state has two senators."
    },

    {
        category: "Spending",

        title:
            "A federal agency wants money for a new national program.",

        prompt:
            "Which institution generally has to approve federal appropriations?",

        answers: [
            "Congress",
            "The Supreme Court",
            "The Federal Reserve acting alone",
            "State legislatures"
        ],

        correctAnswer: 0,

        explanation:
            "Congress exercises the power of the purse by passing laws that authorize and appropriate federal spending."
    },

    {
        category: "Oversight",

        title:
            "Lawmakers believe a federal agency may be mismanaging a program.",

        prompt:
            "What can Congress do?",

        answers: [
            "Conduct oversight hearings and investigate the agency",
            "Remove all federal judges",
            "Cancel state elections",
            "Rewrite the Constitution by simple majority"
        ],

        correctAnswer: 0,

        explanation:
            "Congress uses oversight to examine executive agencies, request information, question officials, and investigate government programs."
    },

    {
        category: "Senate Powers",

        title:
            "The president nominates a federal judge.",

        prompt:
            "Which chamber considers whether to confirm the nominee?",

        answers: [
            "The Senate",
            "The House of Representatives",
            "Both chambers meeting as one body",
            "State legislatures"
        ],

        correctAnswer: 0,

        explanation:
            "The Senate considers and votes on many presidential nominations, including federal judges."
    },

    {
        category: "Impeachment",

        title:
            "Congress is considering whether a federal official committed serious misconduct.",

        prompt:
            "How are the impeachment responsibilities divided?",

        answers: [
            "The House may impeach, and the Senate conducts the trial",
            "The Senate impeaches, and the House conducts the trial",
            "The Supreme Court impeaches officials",
            "State governors decide federal impeachment cases"
        ],

        correctAnswer: 0,

        explanation:
            "The House of Representatives has the power to impeach federal officials. The Senate conducts the impeachment trial."
    }

];


/*
==================================================
STATE
==================================================
*/

let currentChallengeIndex = 0;
let correctAnswers = 0;
let challengeAnswered = false;


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

async function initializeCongressLesson() {

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

    displayChallenge();

}


/*
==================================================
EVENTS
==================================================
*/

function initializeLessonEvents() {

    const answerOptions =
        document.getElementById(
            "congressAnswerOptions"
        );


    const nextButton =
        document.getElementById(
            "congressNextButton"
        );


    const restartButton =
        document.getElementById(
            "congressRestartButton"
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
            goToNextChallenge
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
DISPLAY CHALLENGE
==================================================
*/

function displayChallenge() {

    const challenge =
        congressChallenges[
            currentChallengeIndex
        ];


    const challengeNumber =
        currentChallengeIndex + 1;


    const progressPercent =
        Math.round(
            (
                challengeNumber /
                congressChallenges.length
            ) * 100
        );


    challengeAnswered =
        false;


    setText(
        "congressQuestionNumber",
        `Challenge ${challengeNumber} of ${congressChallenges.length}`
    );


    setText(
        "congressProgressPercent",
        `${progressPercent}%`
    );


    setText(
        "congressScorePreview",
        `Score: ${correctAnswers} correct`
    );


    setText(
        "congressCategory",
        challenge.category
    );


    setText(
        "congressScenarioTitle",
        challenge.title
    );


    setText(
        "congressScenarioText",
        challenge.prompt
    );


    const progressFill =
        document.getElementById(
            "congressProgressFill"
        );


    if (progressFill) {

        progressFill.style.width =
            `${progressPercent}%`;

    }


    renderAnswers(
        challenge
    );


    hideFeedback();


    const nextButton =
        document.getElementById(
            "congressNextButton"
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
    challenge
) {

    const container =
        document.getElementById(
            "congressAnswerOptions"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        challenge.answers
            .map(
                (answer, index) => {

                    return `
                        <button
                            type="button"
                            class="lesson-answer-button congress-answer-button"
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
            ".congress-answer-button"
        );


    if (
        !selectedButton ||
        challengeAnswered
    ) {

        return;

    }


    challengeAnswered =
        true;


    const selectedAnswerIndex =
        Number(
            selectedButton.dataset.answerIndex
        );


    const challenge =
        congressChallenges[
            currentChallengeIndex
        ];


    const answerButtons =
        document.querySelectorAll(
            ".congress-answer-button"
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
                challenge.correctAnswer
            ) {

                button.classList.add(
                    "is-correct"
                );

            }

        }
    );


    if (
        selectedAnswerIndex ===
        challenge.correctAnswer
    ) {

        correctAnswers += 1;


        showFeedback(
            true,
            challenge.explanation
        );

    } else {

        selectedButton.classList.add(
            "is-incorrect"
        );


        showFeedback(
            false,
            challenge.explanation
        );

    }


    setText(
        "congressScorePreview",
        `Score: ${correctAnswers} correct`
    );


    const nextButton =
        document.getElementById(
            "congressNextButton"
        );


    if (nextButton) {

        nextButton.hidden =
            false;


        nextButton.textContent =
            currentChallengeIndex ===
            congressChallenges.length - 1
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
            "congressFeedback"
        );


    const icon =
        document.getElementById(
            "congressFeedbackIcon"
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
        "congressFeedbackTitle",
        correct
            ? "Correct"
            : "Not quite"
    );


    setText(
        "congressFeedbackText",
        explanation
    );

}


function hideFeedback() {

    const feedback =
        document.getElementById(
            "congressFeedback"
        );


    if (feedback) {

        feedback.hidden =
            true;

    }

}


/*
==================================================
NEXT CHALLENGE
==================================================
*/

function goToNextChallenge() {

    if (!challengeAnswered) {
        return;
    }


    currentChallengeIndex += 1;


    if (
        currentChallengeIndex >=
        congressChallenges.length
    ) {

        displayFinalResults();

        return;

    }


    displayChallenge();


    document
        .getElementById(
            "congressGameCard"
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
            "congressGameCard"
        );


    const resultsCard =
        document.getElementById(
            "congressResultsCard"
        );


    const finalPercent =
        Math.round(
            (
                correctAnswers /
                congressChallenges.length
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
        "congressFinalScore",
        `${correctAnswers} / ${congressChallenges.length}`
    );


    setText(
        "congressFinalPercent",
        `${finalPercent}%`
    );


    setText(
        "congressResultMessage",
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

        return "Outstanding work. You demonstrated an excellent understanding of Congress and its major constitutional responsibilities.";

    }


    if (
        finalPercent >=
        75
    ) {

        return "Excellent work. You understand the major roles of the House, Senate, committees, spending power, and congressional oversight.";

    }


    if (
        finalPercent >=
        50
    ) {

        return "Good work. Review the explanations and try again to strengthen your understanding of congressional responsibilities.";

    }


    return "You completed the lesson. Try it again to reinforce how Congress works and where its major powers come from.";

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
            "civicAcademyCongressCompleted",
            "true"
        );


        const previousBestScore =
            Number(
                window.localStorage.getItem(
                    "civicAcademyCongressBestScore"
                ) || 0
            );


        window.localStorage.setItem(
            "civicAcademyCongressBestScore",
            String(
                Math.max(
                    finalPercent,
                    previousBestScore
                )
            )
        );

    } catch (error) {

        console.warn(
            "Congress lesson progress could not be saved:",
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

    currentChallengeIndex =
        0;


    correctAnswers =
        0;


    challengeAnswered =
        false;


    const gameCard =
        document.getElementById(
            "congressGameCard"
        );


    const resultsCard =
        document.getElementById(
            "congressResultsCard"
        );


    if (resultsCard) {

        resultsCard.hidden =
            true;

    }


    if (gameCard) {

        gameCard.hidden =
            false;

    }


    displayChallenge();


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

initializeCongressLesson();