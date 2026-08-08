/*
==================================================
CIVIC HORIZON INDEX V2
ACADEMY LESSON 1
FOUNDATIONS OF AMERICAN GOVERNMENT
==================================================
*/


/*
==================================================
LESSON QUESTIONS
==================================================
*/

const lessonQuestions = [

    {
        category: "Foundations",

        question:
            "Where does the authority of the United States government ultimately come from?",

        answers: [
            "Congress",
            "The President",
            "The people",
            "The Supreme Court"
        ],

        correctAnswer: 2,

        explanation:
            "The Constitution begins with “We the People.” Government officials exercise powers granted through the Constitution and laws, but the system’s authority ultimately comes from the people."
    },

    {
        category: "Three Branches",

        question:
            "Which branch of the federal government passes legislation?",

        answers: [
            "Legislative branch",
            "Executive branch",
            "Judicial branch",
            "State governments"
        ],

        correctAnswer: 0,

        explanation:
            "Congress is the legislative branch. It includes the House of Representatives and the Senate, and it considers and passes federal legislation."
    },

    {
        category: "Executive Branch",

        question:
            "Who can sign or veto a bill passed by Congress?",

        answers: [
            "The Chief Justice",
            "The President",
            "The Speaker of the House",
            "A state governor"
        ],

        correctAnswer: 1,

        explanation:
            "The president may sign a bill into law or veto it. Congress may override a veto if the required two-thirds majority votes to do so in both chambers."
    },

    {
        category: "Judicial Branch",

        question:
            "What is the primary role of the federal courts?",

        answers: [
            "Writing the federal budget",
            "Conducting elections",
            "Resolving legal disputes and interpreting laws",
            "Appointing members of Congress"
        ],

        correctAnswer: 2,

        explanation:
            "Federal courts resolve cases and controversies under federal law and the Constitution. Courts may also review whether government actions comply with the Constitution."
    },

    {
        category: "Congress",

        question:
            "Which part of the federal government has the constitutional power to declare war?",

        answers: [
            "Congress",
            "The President acting alone",
            "The Supreme Court",
            "State legislatures"
        ],

        correctAnswer: 0,

        explanation:
            "The Constitution gives Congress the power to declare war. The president serves as Commander in Chief, and the two branches have different responsibilities involving military action."
    },

    {
        category: "Appointments",

        question:
            "Who confirms presidential nominees to the United States Supreme Court?",

        answers: [
            "The House of Representatives",
            "The Senate",
            "State governors",
            "The Supreme Court"
        ],

        correctAnswer: 1,

        explanation:
            "The president nominates Supreme Court justices, and the Senate decides whether to confirm those nominees."
    },

    {
        category: "Federalism",

        question:
            "Which level of government usually issues driver's licenses?",

        answers: [
            "Federal government",
            "State government",
            "Congress",
            "Supreme Court"
        ],

        correctAnswer: 1,

        explanation:
            "Driver’s licenses are generally issued and regulated by state governments, although federal laws may establish requirements affecting how identification is accepted."
    },

    {
        category: "State and Local Government",

        question:
            "Which level of government has the largest direct role in operating public schools?",

        answers: [
            "State and local governments",
            "The President",
            "The Supreme Court alone",
            "The United Nations"
        ],

        correctAnswer: 0,

        explanation:
            "Public education is primarily governed by states and local school districts. The federal government also provides funding and enforces applicable federal laws."
    },

    {
        category: "Constitution",

        question:
            "Can the president change the United States Constitution alone?",

        answers: [
            "Yes, through an executive order",
            "Yes, during an emergency",
            "No",
            "Only during the final year of a term"
        ],

        correctAnswer: 2,

        explanation:
            "No single president can amend the Constitution. Amendments require approval through the process described in Article V, involving Congress or a convention and ratification by the states."
    },

    {
        category: "Elections",

        question:
            "Who elects members of the United States Congress?",

        answers: [
            "The President",
            "Eligible voters",
            "The Supreme Court",
            "State governors"
        ],

        correctAnswer: 1,

        explanation:
            "Eligible voters elect members of the House of Representatives and the Senate. Each member represents a particular state or congressional district."
    }

];


/*
==================================================
LESSON STATE
==================================================
*/

let currentQuestionIndex = 0;

let correctAnswers = 0;

let answerLocked = false;


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

async function initializeLessonPage() {

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

    renderQuestion();

}


/*
==================================================
LESSON EVENTS
==================================================
*/

function initializeLessonEvents() {

    const answers =
        document.getElementById(
            "lessonAnswerOptions"
        );


    const nextButton =
        document.getElementById(
            "lessonNextButton"
        );


    const restartButton =
        document.getElementById(
            "lessonRestartButton"
        );


    if (answers) {

        answers.addEventListener(
            "click",
            handleAnswerClick
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            handleNextQuestion
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
RENDER QUESTION
==================================================
*/

function renderQuestion() {

    answerLocked = false;


    const question =
        lessonQuestions[
            currentQuestionIndex
        ];


    const questionNumber =
        currentQuestionIndex + 1;


    const progressPercent =
        Math.round(
            (
                questionNumber /
                lessonQuestions.length
            ) * 100
        );


    setText(
        "lessonQuestionNumber",
        `Question ${questionNumber} of ${lessonQuestions.length}`
    );


    setText(
        "lessonProgressPercent",
        `${progressPercent}%`
    );


    setText(
        "lessonScorePreview",
        `Score: ${correctAnswers}`
    );


    setText(
        "lessonQuestionCategory",
        question.category
    );


    setText(
        "lessonQuestionText",
        question.question
    );


    const progressFill =
        document.getElementById(
            "lessonProgressFill"
        );


    if (progressFill) {

        progressFill.style.width =
            `${progressPercent}%`;

    }


    renderAnswerOptions(
        question
    );


    hideFeedback();


    const nextButton =
        document.getElementById(
            "lessonNextButton"
        );


    if (nextButton) {

        nextButton.hidden =
            true;

    }

}


/*
==================================================
ANSWER OPTIONS
==================================================
*/

function renderAnswerOptions(
    question
) {

    const container =
        document.getElementById(
            "lessonAnswerOptions"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        question.answers
            .map(
                (answer, index) => {

                    return `
                        <button
                            type="button"
                            class="lesson-answer-button"
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
ANSWER SELECTION
==================================================
*/

function handleAnswerClick(
    event
) {

    const button =
        event.target.closest(
            ".lesson-answer-button"
        );


    if (
        !button ||
        answerLocked
    ) {

        return;

    }


    answerLocked =
        true;


    const selectedIndex =
        Number(
            button.dataset.answerIndex
        );


    const question =
        lessonQuestions[
            currentQuestionIndex
        ];


    const correctIndex =
        question.correctAnswer;


    const buttons =
        document.querySelectorAll(
            ".lesson-answer-button"
        );


    buttons.forEach(
        answerButton => {

            answerButton.disabled =
                true;


            const answerIndex =
                Number(
                    answerButton.dataset.answerIndex
                );


            if (
                answerIndex ===
                correctIndex
            ) {

                answerButton.classList.add(
                    "is-correct"
                );

            }

        }
    );


    if (
        selectedIndex ===
        correctIndex
    ) {

        correctAnswers += 1;


        showFeedback(
            true,
            question.explanation
        );

    } else {

        button.classList.add(
            "is-incorrect"
        );


        showFeedback(
            false,
            question.explanation
        );

    }


    setText(
        "lessonScorePreview",
        `Score: ${correctAnswers}`
    );


    const nextButton =
        document.getElementById(
            "lessonNextButton"
        );


    if (nextButton) {

        nextButton.hidden =
            false;


        nextButton.textContent =
            currentQuestionIndex ===
            lessonQuestions.length - 1
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
            "lessonFeedback"
        );


    const icon =
        document.getElementById(
            "lessonFeedbackIcon"
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
        "lessonFeedbackTitle",
        correct
            ? "Correct"
            : "Not quite"
    );


    setText(
        "lessonFeedbackText",
        explanation
    );

}


function hideFeedback() {

    const feedback =
        document.getElementById(
            "lessonFeedback"
        );


    if (feedback) {

        feedback.hidden =
            true;

    }

}


/*
==================================================
NEXT QUESTION
==================================================
*/

function handleNextQuestion() {

    currentQuestionIndex += 1;


    if (
        currentQuestionIndex >=
        lessonQuestions.length
    ) {

        displayFinalResults();

        return;

    }


    renderQuestion();


    window.scrollTo({
        top:
            document
                .querySelector(
                    ".academy-lesson-section"
                )
                ?.offsetTop || 0,

        behavior: "smooth"
    });

}


/*
==================================================
FINAL RESULTS
==================================================
*/

function displayFinalResults() {

    const quizCard =
        document.getElementById(
            "lessonQuizCard"
        );


    const resultsCard =
        document.getElementById(
            "lessonResultsCard"
        );


    if (quizCard) {

        quizCard.hidden =
            true;

    }


    if (resultsCard) {

        resultsCard.hidden =
            false;

    }


    const finalPercent =
        Math.round(
            (
                correctAnswers /
                lessonQuestions.length
            ) * 100
        );


    setText(
        "lessonFinalScore",
        `${correctAnswers} / ${lessonQuestions.length}`
    );


    setText(
        "lessonFinalPercent",
        `${finalPercent}%`
    );


    setText(
        "lessonResultMessage",
        getResultMessage(
            finalPercent
        )
    );


    saveLessonCompletion(
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
    percentage
) {

    if (
        percentage >=
        90
    ) {

        return "Excellent work. You completed the lesson with a strong understanding of the foundations of American government.";

    }


    if (
        percentage >=
        70
    ) {

        return "Great start. You completed the lesson and strengthened your understanding of the basic structure of American government.";

    }


    return "You completed the lesson. Trying it again will help reinforce the key ideas.";

}


/*
==================================================
SAVE PROGRESS
==================================================
*/

function saveLessonCompletion(
    finalPercent
) {

    try {

        window.localStorage.setItem(
            "civicAcademyFoundationsCompleted",
            "true"
        );


        const previousBestScore =
            Number(
                window.localStorage.getItem(
                    "civicAcademyFoundationsBestScore"
                ) || 0
            );


        const bestScore =
            Math.max(
                previousBestScore,
                finalPercent
            );


        window.localStorage.setItem(
            "civicAcademyFoundationsBestScore",
            String(
                bestScore
            )
        );

    } catch (error) {

        console.warn(
            "Lesson progress could not be saved:",
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

    currentQuestionIndex =
        0;


    correctAnswers =
        0;


    answerLocked =
        false;


    const quizCard =
        document.getElementById(
            "lessonQuizCard"
        );


    const resultsCard =
        document.getElementById(
            "lessonResultsCard"
        );


    if (quizCard) {

        quizCard.hidden =
            false;

    }


    if (resultsCard) {

        resultsCard.hidden =
            true;

    }


    renderQuestion();


    quizCard?.scrollIntoView({
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
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


/*
==================================================
START LESSON
==================================================
*/

initializeLessonPage();