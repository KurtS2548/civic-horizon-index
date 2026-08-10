/*
==================================================
CIVIC HORIZON INDEX V2
ACADEMY LESSON 7
STATE AND LOCAL GOVERNMENT
==================================================
*/


/*
==================================================
RESPONSIBILITY CHALLENGES
==================================================
*/

const stateLocalChallenges = [

    {
        category: "State Government",

        title:
            "A resident needs to renew a driver's license.",

        prompt:
            "Which level of government usually handles this responsibility?",

        answers: [
            "The federal courts",
            "State government",
            "Congress",
            "The United Nations"
        ],

        correctAnswer: 1,

        explanation:
            "Driver's licenses are generally issued and regulated by state governments."
    },

    {
        category: "Local Government",

        title:
            "A neighborhood has a problem with local trash collection.",

        prompt:
            "Which level of government is most likely responsible for addressing it?",

        answers: [
            "The U.S. Senate",
            "The Supreme Court",
            "A municipal or local government",
            "The Department of State"
        ],

        correctAnswer: 2,

        explanation:
            "Services such as sanitation and trash collection are commonly handled by municipal or other local governments."
    },

    {
        category: "Public Schools",

        title:
            "Parents want to raise a concern about the operation of a local public school.",

        prompt:
            "Which institution is often closest to this responsibility?",

        answers: [
            "A local school district or school board",
            "The president",
            "The U.S. Supreme Court",
            "The Federal Reserve"
        ],

        correctAnswer: 0,

        explanation:
            "Public schools are primarily governed through state and local systems, with local school districts and boards playing major roles."
    },

    {
        category: "Federal Government",

        title:
            "A citizen has a question about issuing United States passports.",

        prompt:
            "Which level of government handles passports?",

        answers: [
            "Municipal government",
            "County government",
            "A local school board",
            "The federal government"
        ],

        correctAnswer: 3,

        explanation:
            "United States passports are issued through the federal government."
    },

    {
        category: "County Government",

        title:
            "A resident needs information about a county courthouse or county records.",

        prompt:
            "Which level of government would usually be the most direct place to start?",

        answers: [
            "The U.S. House of Representatives",
            "County government",
            "The White House",
            "The Supreme Court"
        ],

        correctAnswer: 1,

        explanation:
            "County governments commonly administer local courts, records, elections, and other services depending on the state."
    },

    {
        category: "State Law",

        title:
            "A state legislature is considering changes to state traffic laws.",

        prompt:
            "Which body normally has authority to pass those state laws?",

        answers: [
            "Congress",
            "A city council",
            "The state legislature",
            "The U.S. Supreme Court"
        ],

        correctAnswer: 2,

        explanation:
            "State legislatures enact laws within their state's authority, including many rules involving roads, licensing, and public safety."
    },

    {
        category: "Municipal Government",

        title:
            "Residents want to comment on a proposal involving zoning in their town.",

        prompt:
            "Which government body is most likely to deal directly with the issue?",

        answers: [
            "A municipal government or local planning body",
            "The U.S. Senate",
            "The Department of Defense",
            "A federal court of appeals"
        ],

        correctAnswer: 0,

        explanation:
            "Land use and zoning are commonly handled by municipalities and local planning or zoning boards."
    },

    {
        category: "Shared Responsibility",

        title:
            "A major emergency affects a community and overwhelms local resources.",

        prompt:
            "Which statement best describes how government may respond?",

        answers: [
            "Only the federal government may respond",
            "Only the town may respond",
            "Only the state may respond",
            "Local, state, and federal governments may all have roles"
        ],

        correctAnswer: 3,

        explanation:
            "Emergency response can involve multiple levels of government, with local, state, and federal agencies providing different forms of assistance."
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

async function initializeStateLocalLesson() {

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
            "stateLocalAnswerOptions"
        );


    const nextButton =
        document.getElementById(
            "stateLocalNextButton"
        );


    const restartButton =
        document.getElementById(
            "stateLocalRestartButton"
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
        stateLocalChallenges[
            currentChallengeIndex
        ];


    const challengeNumber =
        currentChallengeIndex + 1;


    const progressPercent =
        Math.round(
            (
                challengeNumber /
                stateLocalChallenges.length
            ) * 100
        );


    challengeAnswered =
        false;


    setText(
        "stateLocalQuestionNumber",
        `Challenge ${challengeNumber} of ${stateLocalChallenges.length}`
    );


    setText(
        "stateLocalProgressPercent",
        `${progressPercent}%`
    );


    setText(
        "stateLocalScorePreview",
        `Score: ${correctAnswers} correct`
    );


    setText(
        "stateLocalCategory",
        challenge.category
    );


    setText(
        "stateLocalScenarioTitle",
        challenge.title
    );


    setText(
        "stateLocalScenarioText",
        challenge.prompt
    );


    const progressFill =
        document.getElementById(
            "stateLocalProgressFill"
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
            "stateLocalNextButton"
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
            "stateLocalAnswerOptions"
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
                            class="lesson-answer-button state-local-answer-button"
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
            ".state-local-answer-button"
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
        stateLocalChallenges[
            currentChallengeIndex
        ];


    const answerButtons =
        document.querySelectorAll(
            ".state-local-answer-button"
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
        "stateLocalScorePreview",
        `Score: ${correctAnswers} correct`
    );


    const nextButton =
        document.getElementById(
            "stateLocalNextButton"
        );


    if (nextButton) {

        nextButton.hidden =
            false;


        nextButton.textContent =
            currentChallengeIndex ===
            stateLocalChallenges.length - 1
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
            "stateLocalFeedback"
        );


    const icon =
        document.getElementById(
            "stateLocalFeedbackIcon"
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
        "stateLocalFeedbackTitle",
        correct
            ? "Correct"
            : "Not quite"
    );


    setText(
        "stateLocalFeedbackText",
        explanation
    );

}


function hideFeedback() {

    const feedback =
        document.getElementById(
            "stateLocalFeedback"
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
        stateLocalChallenges.length
    ) {

        displayFinalResults();

        return;

    }


    displayChallenge();


    document
        .getElementById(
            "stateLocalGameCard"
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
            "stateLocalGameCard"
        );


    const resultsCard =
        document.getElementById(
            "stateLocalResultsCard"
        );


    const finalPercent =
        Math.round(
            (
                correctAnswers /
                stateLocalChallenges.length
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
        "stateLocalFinalScore",
        `${correctAnswers} / ${stateLocalChallenges.length}`
    );


    setText(
        "stateLocalFinalPercent",
        `${finalPercent}%`
    );


    setText(
        "stateLocalResultMessage",
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

        return "Outstanding work. You demonstrated an excellent understanding of how responsibilities are divided among federal, state, and local governments.";

    }


    if (
        finalPercent >=
        75
    ) {

        return "Excellent work. You understand which levels of government handle many of the services people encounter in everyday life.";

    }


    if (
        finalPercent >=
        50
    ) {

        return "Good work. Review the explanations and try again to strengthen your understanding of state and local responsibilities.";

    }


    return "You completed the lesson. Try it again to reinforce which level of government is usually responsible for different public services.";

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
            "civicAcademyStateLocalCompleted",
            "true"
        );


        const previousBestScore =
            Number(
                window.localStorage.getItem(
                    "civicAcademyStateLocalBestScore"
                ) || 0
            );


        window.localStorage.setItem(
            "civicAcademyStateLocalBestScore",
            String(
                Math.max(
                    finalPercent,
                    previousBestScore
                )
            )
        );

    } catch (error) {

        console.warn(
            "State and Local Government progress could not be saved:",
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
            "stateLocalGameCard"
        );


    const resultsCard =
        document.getElementById(
            "stateLocalResultsCard"
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

initializeStateLocalLesson();