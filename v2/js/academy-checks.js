/*
==================================================
CIVIC HORIZON INDEX V2
ACADEMY LESSON 2
CHECKS AND BALANCES
==================================================
*/


/*
==================================================
CHALLENGES
==================================================
*/

const checksChallenges = [

    {
        category: "Executive Check",

        title:
            "Congress passes a bill, but the president strongly opposes it.",

        prompt:
            "Which action allows the executive branch to check Congress?",

        answers: [
            "The president vetoes the bill",
            "The Supreme Court rewrites the bill",
            "A governor cancels the bill",
            "Congress dissolves the executive branch"
        ],

        correctAnswer: 0,

        explanation:
            "The president may veto legislation passed by Congress. Congress can respond by attempting to override the veto with a two-thirds vote in both chambers."
    },

    {
        category: "Legislative Check",

        title:
            "The president vetoes a bill that received broad support in Congress.",

        prompt:
            "How can Congress check the president's veto power?",

        answers: [
            "Ask the Supreme Court to sign the bill",
            "Override the veto with a two-thirds vote in both chambers",
            "Allow the House alone to enact it",
            "Order the president to withdraw the veto"
        ],

        correctAnswer: 1,

        explanation:
            "Congress may override a presidential veto when two-thirds of both the House of Representatives and the Senate vote to approve the bill again."
    },

    {
        category: "Appointments",

        title:
            "The president nominates someone to serve on the Supreme Court.",

        prompt:
            "Which institution decides whether to confirm the nominee?",

        answers: [
            "The House of Representatives",
            "The Senate",
            "State governors",
            "The Supreme Court"
        ],

        correctAnswer: 1,

        explanation:
            "The president nominates federal judges, including Supreme Court justices. The Senate considers the nomination and votes on whether to confirm it."
    },

    {
        category: "Judicial Review",

        title:
            "A federal law is challenged in court as violating the Constitution.",

        prompt:
            "Which branch can review the law in a legal case?",

        answers: [
            "The judicial branch",
            "The executive branch alone",
            "State governors",
            "Local school boards"
        ],

        correctAnswer: 0,

        explanation:
            "Federal courts may review laws and government actions when deciding cases and controversies. A court may determine that a law cannot be enforced if it conflicts with the Constitution."
    },

    {
        category: "Oversight",

        title:
            "A federal agency may have misused public funds.",

        prompt:
            "Which branch can investigate the agency and hold oversight hearings?",

        answers: [
            "Congress",
            "The Supreme Court",
            "A city council",
            "The Electoral College"
        ],

        correctAnswer: 0,

        explanation:
            "Congress conducts oversight of executive agencies. Committees may investigate, request records, question officials, and hold public hearings."
    },

    {
        category: "Funding Power",

        title:
            "The executive branch wants to begin a major new federal program.",

        prompt:
            "Which branch generally controls whether federal money is appropriated for it?",

        answers: [
            "Congress",
            "The Supreme Court",
            "State courts",
            "The vice president acting alone"
        ],

        correctAnswer: 0,

        explanation:
            "Congress controls federal appropriations. Executive agencies generally need funding authorized and appropriated through laws passed by Congress."
    },

    {
        category: "Removal from Office",

        title:
            "A federal official is accused of serious misconduct.",

        prompt:
            "Which constitutional process can Congress use to consider removal?",

        answers: [
            "Impeachment by the House and a trial in the Senate",
            "A presidential executive order",
            "A ruling by a local court",
            "A national referendum"
        ],

        correctAnswer: 0,

        explanation:
            "The House of Representatives has the power to impeach federal officials. The Senate conducts the trial and may remove the official if the required two-thirds vote is reached."
    },

    {
        category: "Treaties",

        title:
            "The president negotiates a treaty with another country.",

        prompt:
            "Which institution must give its advice and consent before ratification?",

        answers: [
            "The Senate",
            "The House alone",
            "The Supreme Court",
            "State legislatures"
        ],

        correctAnswer: 0,

        explanation:
            "The president negotiates treaties, but the Senate must approve them by a two-thirds vote of senators present before the United States can ratify them."
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
PAGE INITIALIZATION
==================================================
*/

async function initializeChecksLesson() {

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
LESSON EVENTS
==================================================
*/

function initializeLessonEvents() {

    const answerOptions =
        document.getElementById(
            "checksAnswerOptions"
        );


    const nextButton =
        document.getElementById(
            "checksNextButton"
        );


    const restartButton =
        document.getElementById(
            "checksRestartButton"
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
DISPLAY CURRENT CHALLENGE
==================================================
*/

function displayChallenge() {

    const challenge =
        checksChallenges[
            currentChallengeIndex
        ];


    const challengeNumber =
        currentChallengeIndex + 1;


    const progressPercent =
        Math.round(
            (
                challengeNumber /
                checksChallenges.length
            ) * 100
        );


    challengeAnswered =
        false;


    setText(
        "checksQuestionNumber",
        `Challenge ${challengeNumber} of ${checksChallenges.length}`
    );


    setText(
        "checksProgressPercent",
        `${progressPercent}%`
    );


    setText(
        "checksScorePreview",
        `Score: ${correctAnswers} correct`
    );


    setText(
        "checksCategory",
        challenge.category
    );


    setText(
        "checksScenarioTitle",
        challenge.title
    );


    setText(
        "checksScenarioText",
        challenge.prompt
    );


    const progressFill =
        document.getElementById(
            "checksProgressFill"
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
            "checksNextButton"
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

    const answerOptions =
        document.getElementById(
            "checksAnswerOptions"
        );


    if (!answerOptions) {
        return;
    }


    answerOptions.innerHTML =
        challenge.answers
            .map(
                (answer, index) => {

                    return `
                        <button
                            type="button"
                            class="lesson-answer-button checks-answer-button"
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
            ".checks-answer-button"
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
        checksChallenges[
            currentChallengeIndex
        ];


    const answerButtons =
        document.querySelectorAll(
            ".checks-answer-button"
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
        "checksScorePreview",
        `Score: ${correctAnswers} correct`
    );


    const nextButton =
        document.getElementById(
            "checksNextButton"
        );


    if (nextButton) {

        nextButton.textContent =
            currentChallengeIndex ===
            checksChallenges.length - 1
                ? "View Results"
                : "Continue";


        nextButton.hidden =
            false;

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
            "checksFeedback"
        );


    const icon =
        document.getElementById(
            "checksFeedbackIcon"
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
        "checksFeedbackTitle",
        correct
            ? "Correct"
            : "Not quite"
    );


    setText(
        "checksFeedbackText",
        explanation
    );

}


function hideFeedback() {

    const feedback =
        document.getElementById(
            "checksFeedback"
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
        checksChallenges.length
    ) {

        displayFinalResults();

        return;

    }


    displayChallenge();


    document
        .getElementById(
            "checksGameCard"
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
            "checksGameCard"
        );


    const resultsCard =
        document.getElementById(
            "checksResultsCard"
        );


    const finalPercent =
        Math.round(
            (
                correctAnswers /
                checksChallenges.length
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
        "checksFinalScore",
        `${correctAnswers} / ${checksChallenges.length}`
    );


    setText(
        "checksFinalPercent",
        `${finalPercent}%`
    );


    setText(
        "checksResultMessage",
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

        return "Outstanding work. You demonstrated an excellent understanding of checks and balances.";

    }


    if (
        finalPercent >=
        75
    ) {

        return "Excellent work. You understand how the branches use constitutional powers to limit one another.";

    }


    if (
        finalPercent >=
        50
    ) {

        return "Good work. Review the explanations and try again to strengthen the areas you missed.";

    }


    return "You completed the lesson. Try it again to reinforce how each branch checks the others.";

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
            "civicAcademyChecksCompleted",
            "true"
        );


        const previousBestScore =
            Number(
                window.localStorage.getItem(
                    "civicAcademyChecksBestScore"
                ) || 0
            );


        window.localStorage.setItem(
            "civicAcademyChecksBestScore",
            String(
                Math.max(
                    finalPercent,
                    previousBestScore
                )
            )
        );

    } catch (error) {

        console.warn(
            "Checks and Balances progress could not be saved:",
            error
        );

    }

}


/*
==================================================
RESTART LESSON
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
            "checksGameCard"
        );


    const resultsCard =
        document.getElementById(
            "checksResultsCard"
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
HEADER INTERACTIONS
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
START LESSON
==================================================
*/

initializeChecksLesson();