/*
==================================================
CIVIC HORIZON INDEX V2
ACADEMY LESSON 6
THE FEDERAL COURTS
==================================================
*/


/*
==================================================
CASE CHALLENGES
==================================================
*/

const courtsCases = [

    {
        category: "Judicial Review",

        title:
            "A federal law is challenged as violating the Constitution.",

        prompt:
            "What can a federal court do when deciding the case?",

        answers: [
            "Rewrite the Constitution",
            "Review whether the law conflicts with the Constitution",
            "Order Congress to dissolve",
            "Create a new federal agency"
        ],

        correctAnswer: 1,

        explanation:
            "Federal courts may review laws and government actions when deciding cases and controversies. If a law conflicts with the Constitution, a court may determine that it cannot be enforced."
    },

    {
        category: "Federal Jurisdiction",

        title:
            "Two parties are arguing over whether a federal law was violated.",

        prompt:
            "Which court system may hear disputes involving federal law?",

        answers: [
            "Only local school boards",
            "Only state governors",
            "The federal courts",
            "The Electoral College"
        ],

        correctAnswer: 2,

        explanation:
            "Federal courts have jurisdiction over many cases involving the Constitution, federal laws, treaties, and other matters assigned to them by law."
    },

    {
        category: "Supreme Court",

        title:
            "A major constitutional dispute reaches the highest court in the federal judiciary.",

        prompt:
            "Which court is at the top of the federal judicial system?",

        answers: [
            "The United States Supreme Court",
            "A federal district court",
            "A state trial court",
            "The Senate"
        ],

        correctAnswer: 0,

        explanation:
            "The United States Supreme Court is the highest court in the federal judiciary."
    },

    {
        category: "Court Decisions",

        title:
            "A federal judge is deciding a legal dispute.",

        prompt:
            "Which source should guide the judge's decision?",

        answers: [
            "Personal political preferences",
            "Instructions from a governor",
            "Public opinion alone",
            "The Constitution, applicable law, and legal precedent"
        ],

        correctAnswer: 3,

        explanation:
            "Judges are expected to decide cases according to the Constitution, applicable laws, legal precedent, and the facts presented in the case."
    },

    {
        category: "Trial Courts",

        title:
            "A federal criminal case is beginning and evidence must be presented.",

        prompt:
            "Where do federal cases commonly begin?",

        answers: [
            "The Supreme Court",
            "Federal district courts",
            "Congress",
            "The White House"
        ],

        correctAnswer: 1,

        explanation:
            "Federal district courts are the main trial courts of the federal system. They hear evidence, determine facts, and apply the law."
    },

    {
        category: "Appeals",

        title:
            "A party believes a federal trial court made a legal error.",

        prompt:
            "What is the usual next step?",

        answers: [
            "Ask the president to reverse the ruling",
            "Hold a national referendum",
            "Appeal to a federal court of appeals",
            "Ask Congress to retry the case"
        ],

        correctAnswer: 2,

        explanation:
            "Federal courts of appeals review many decisions from district courts to determine whether legal errors occurred."
    },

    {
        category: "Judicial Independence",

        title:
            "A federal judge is deciding an unpopular case.",

        prompt:
            "Which principle is meant to help judges decide cases based on law rather than political pressure?",

        answers: [
            "Judicial independence",
            "Executive privilege",
            "Congressional redistricting",
            "The veto power"
        ],

        correctAnswer: 0,

        explanation:
            "Judicial independence is intended to allow judges to apply the law without improper pressure from elected officials or temporary public opinion."
    },

    {
        category: "Limits of Courts",

        title:
            "A federal court disagrees with a policy choice but no legal dispute is properly before it.",

        prompt:
            "Which statement best describes the court's role?",

        answers: [
            "Courts may replace Congress whenever they disagree with policy",
            "Courts may write any law they believe is better",
            "Courts may run executive agencies directly",
            "Courts generally resolve actual legal cases and controversies rather than making policy on their own"
        ],

        correctAnswer: 3,

        explanation:
            "Federal courts generally exercise judicial power through actual cases and controversies. Their role is not to function as a substitute legislature or executive branch."
    }

];


/*
==================================================
STATE
==================================================
*/

let currentCaseIndex = 0;
let correctAnswers = 0;
let caseAnswered = false;


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

async function initializeCourtsLesson() {

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

    displayCase();

}


/*
==================================================
EVENTS
==================================================
*/

function initializeLessonEvents() {

    const answerOptions =
        document.getElementById(
            "courtsAnswerOptions"
        );


    const nextButton =
        document.getElementById(
            "courtsNextButton"
        );


    const restartButton =
        document.getElementById(
            "courtsRestartButton"
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
            goToNextCase
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
DISPLAY CASE
==================================================
*/

function displayCase() {

    const currentCase =
        courtsCases[
            currentCaseIndex
        ];


    const caseNumber =
        currentCaseIndex + 1;


    const progressPercent =
        Math.round(
            (
                caseNumber /
                courtsCases.length
            ) * 100
        );


    caseAnswered =
        false;


    setText(
        "courtsQuestionNumber",
        `Case ${caseNumber} of ${courtsCases.length}`
    );


    setText(
        "courtsProgressPercent",
        `${progressPercent}%`
    );


    setText(
        "courtsScorePreview",
        `Score: ${correctAnswers} correct`
    );


    setText(
        "courtsCategory",
        currentCase.category
    );


    setText(
        "courtsScenarioTitle",
        currentCase.title
    );


    setText(
        "courtsScenarioText",
        currentCase.prompt
    );


    const progressFill =
        document.getElementById(
            "courtsProgressFill"
        );


    if (progressFill) {

        progressFill.style.width =
            `${progressPercent}%`;

    }


    renderAnswers(
        currentCase
    );


    hideFeedback();


    const nextButton =
        document.getElementById(
            "courtsNextButton"
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
    currentCase
) {

    const container =
        document.getElementById(
            "courtsAnswerOptions"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        currentCase.answers
            .map(
                (answer, index) => {

                    return `
                        <button
                            type="button"
                            class="lesson-answer-button courts-answer-button"
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
            ".courts-answer-button"
        );


    if (
        !selectedButton ||
        caseAnswered
    ) {

        return;

    }


    caseAnswered =
        true;


    const selectedAnswerIndex =
        Number(
            selectedButton.dataset.answerIndex
        );


    const currentCase =
        courtsCases[
            currentCaseIndex
        ];


    const answerButtons =
        document.querySelectorAll(
            ".courts-answer-button"
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
                currentCase.correctAnswer
            ) {

                button.classList.add(
                    "is-correct"
                );

            }

        }
    );


    if (
        selectedAnswerIndex ===
        currentCase.correctAnswer
    ) {

        correctAnswers += 1;


        showFeedback(
            true,
            currentCase.explanation
        );

    } else {

        selectedButton.classList.add(
            "is-incorrect"
        );


        showFeedback(
            false,
            currentCase.explanation
        );

    }


    setText(
        "courtsScorePreview",
        `Score: ${correctAnswers} correct`
    );


    const nextButton =
        document.getElementById(
            "courtsNextButton"
        );


    if (nextButton) {

        nextButton.hidden =
            false;


        nextButton.textContent =
            currentCaseIndex ===
            courtsCases.length - 1
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
            "courtsFeedback"
        );


    const icon =
        document.getElementById(
            "courtsFeedbackIcon"
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
        "courtsFeedbackTitle",
        correct
            ? "Correct"
            : "Not quite"
    );


    setText(
        "courtsFeedbackText",
        explanation
    );

}


function hideFeedback() {

    const feedback =
        document.getElementById(
            "courtsFeedback"
        );


    if (feedback) {

        feedback.hidden =
            true;

    }

}


/*
==================================================
NEXT CASE
==================================================
*/

function goToNextCase() {

    if (!caseAnswered) {
        return;
    }


    currentCaseIndex += 1;


    if (
        currentCaseIndex >=
        courtsCases.length
    ) {

        displayFinalResults();

        return;

    }


    displayCase();


    document
        .getElementById(
            "courtsGameCard"
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
            "courtsGameCard"
        );


    const resultsCard =
        document.getElementById(
            "courtsResultsCard"
        );


    const finalPercent =
        Math.round(
            (
                correctAnswers /
                courtsCases.length
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
        "courtsFinalScore",
        `${correctAnswers} / ${courtsCases.length}`
    );


    setText(
        "courtsFinalPercent",
        `${finalPercent}%`
    );


    setText(
        "courtsResultMessage",
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

        return "Outstanding work. You demonstrated an excellent understanding of the federal court system and judicial power.";

    }


    if (
        finalPercent >=
        75
    ) {

        return "Excellent work. You understand how federal courts resolve disputes, review legal questions, and operate within constitutional limits.";

    }


    if (
        finalPercent >=
        50
    ) {

        return "Good work. Review the explanations and try again to strengthen your understanding of the federal judiciary.";

    }


    return "You completed the lesson. Try it again to reinforce how federal courts work and what judicial power does — and does not — allow.";

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
            "civicAcademyCourtsCompleted",
            "true"
        );


        const previousBestScore =
            Number(
                window.localStorage.getItem(
                    "civicAcademyCourtsBestScore"
                ) || 0
            );


        window.localStorage.setItem(
            "civicAcademyCourtsBestScore",
            String(
                Math.max(
                    finalPercent,
                    previousBestScore
                )
            )
        );

    } catch (error) {

        console.warn(
            "Federal Courts lesson progress could not be saved:",
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

    currentCaseIndex =
        0;


    correctAnswers =
        0;


    caseAnswered =
        false;


    const gameCard =
        document.getElementById(
            "courtsGameCard"
        );


    const resultsCard =
        document.getElementById(
            "courtsResultsCard"
        );


    if (resultsCard) {

        resultsCard.hidden =
            true;

    }


    if (gameCard) {

        gameCard.hidden =
            false;

    }


    displayCase();


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

initializeCourtsLesson();