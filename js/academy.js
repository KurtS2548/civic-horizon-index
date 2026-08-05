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
LESSON 1 PAGE ELEMENTS
*/

const quizCard =
    document.getElementById("lessonQuizCard");

const resultsCard =
    document.getElementById("lessonResultsCard");

const questionNumberElement =
    document.getElementById("lessonQuestionNumber");

const progressPercentElement =
    document.getElementById("lessonProgressPercent");

const progressFillElement =
    document.getElementById("lessonProgressFill");

const scorePreviewElement =
    document.getElementById("lessonScorePreview");

const questionCategoryElement =
    document.getElementById("lessonQuestionCategory");

const questionTextElement =
    document.getElementById("lessonQuestionText");

const answerOptionsElement =
    document.getElementById("lessonAnswerOptions");

const feedbackElement =
    document.getElementById("lessonFeedback");

const feedbackIconElement =
    document.getElementById("lessonFeedbackIcon");

const feedbackTitleElement =
    document.getElementById("lessonFeedbackTitle");

const feedbackTextElement =
    document.getElementById("lessonFeedbackText");

const nextButton =
    document.getElementById("lessonNextButton");

const restartButton =
    document.getElementById("lessonRestartButton");

const finalScoreElement =
    document.getElementById("lessonFinalScore");

const finalPercentElement =
    document.getElementById("lessonFinalPercent");

const resultMessageElement =
    document.getElementById("lessonResultMessage");


let currentQuestionIndex = 0;
let correctAnswers = 0;
let questionAnswered = false;


/*
DISPLAY THE CURRENT QUESTION
*/

function displayQuestion() {

    if (
        !questionTextElement ||
        !answerOptionsElement
    ) {
        return;
    }


    const question =
        lessonQuestions[currentQuestionIndex];

    const questionNumber =
        currentQuestionIndex + 1;

    const progressPercent =
        Math.round(
            (
                questionNumber /
                lessonQuestions.length
            ) * 100
        );


    questionAnswered = false;

    feedbackElement.hidden = true;
    nextButton.hidden = true;


    questionNumberElement.textContent =
        `Question ${questionNumber} of ${lessonQuestions.length}`;

    progressPercentElement.textContent =
        `${progressPercent}%`;

    progressFillElement.style.width =
        `${progressPercent}%`;

    scorePreviewElement.textContent =
        `Score: ${correctAnswers} correct`;

    questionCategoryElement.textContent =
        question.category;

    questionTextElement.textContent =
        question.question;


    answerOptionsElement.innerHTML =
        question.answers
            .map((answer, answerIndex) => {

                return `

                    <button
                        type="button"
                        class="lesson-answer-button"
                        data-answer-index="${answerIndex}"
                    >

                        <span class="lesson-answer-letter">
                            ${String.fromCharCode(
                                65 + answerIndex
                            )}
                        </span>

                        <span>
                            ${answer}
                        </span>

                    </button>

                `;

            })
            .join("");


    const answerButtons =
        answerOptionsElement.querySelectorAll(
            ".lesson-answer-button"
        );


    answerButtons.forEach(button => {

        button.addEventListener(
            "click",
            handleAnswer
        );

    });

}


/*
HANDLE AN ANSWER SELECTION
*/

function handleAnswer(event) {

    if (questionAnswered) {
        return;
    }


    questionAnswered = true;


    const selectedButton =
        event.currentTarget;

    const selectedAnswerIndex =
        Number(
            selectedButton.dataset.answerIndex
        );

    const question =
        lessonQuestions[currentQuestionIndex];

    const answerButtons =
        answerOptionsElement.querySelectorAll(
            ".lesson-answer-button"
        );


    answerButtons.forEach(
        (button, buttonIndex) => {

            button.disabled = true;


            if (
                buttonIndex ===
                question.correctAnswer
            ) {

                button.classList.add(
                    "correct-answer"
                );

            }

        }
    );


    if (
        selectedAnswerIndex ===
        question.correctAnswer
    ) {

        correctAnswers += 1;

        selectedButton.classList.add(
            "selected-correct"
        );

        feedbackElement.className =
            "lesson-feedback correct-feedback";

        feedbackIconElement.textContent =
            "✓";

        feedbackTitleElement.textContent =
            "Correct";

    } else {

        selectedButton.classList.add(
            "incorrect-answer"
        );

        feedbackElement.className =
            "lesson-feedback incorrect-feedback";

        feedbackIconElement.textContent =
            "!";

        feedbackTitleElement.textContent =
            "Not quite";

    }


    feedbackTextElement.textContent =
        question.explanation;

    feedbackElement.hidden = false;

    scorePreviewElement.textContent =
        `Score: ${correctAnswers} correct`;

    nextButton.textContent =
        currentQuestionIndex ===
        lessonQuestions.length - 1
            ? "View Results"
            : "Continue";

    nextButton.hidden = false;

}


/*
MOVE TO THE NEXT QUESTION
*/

function goToNextQuestion() {

    if (!questionAnswered) {
        return;
    }


    currentQuestionIndex += 1;


    if (
        currentQuestionIndex >=
        lessonQuestions.length
    ) {

        displayFinalResults();

        return;

    }


    displayQuestion();


    quizCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/*
DISPLAY FINAL LESSON 1 RESULTS
*/

function displayFinalResults() {

    const finalPercent =
        Math.round(
            (
                correctAnswers /
                lessonQuestions.length
            ) * 100
        );


    quizCard.hidden = true;

    resultsCard.hidden = false;


    finalScoreElement.textContent =
        `${correctAnswers} / ${lessonQuestions.length}`;

    finalPercentElement.textContent =
        `${finalPercent}%`;


    if (finalPercent === 100) {

        resultMessageElement.textContent =
            "Outstanding work. You demonstrated a strong understanding of the foundations of American government.";

    } else if (finalPercent >= 80) {

        resultMessageElement.textContent =
            "Excellent work. You have a strong foundation and are ready for the next Civic Academy challenge.";

    } else if (finalPercent >= 60) {

        resultMessageElement.textContent =
            "Good work. Review the explanations and try again to strengthen the areas you missed.";

    } else {

        resultMessageElement.textContent =
            "You completed the lesson. Trying it again will help reinforce the key ideas.";

    }


    localStorage.setItem(
        "civicAcademyFoundationsCompleted",
        "true"
    );


    const previousBestScore =
        Number(
            localStorage.getItem(
                "civicAcademyFoundationsBestScore"
            ) || 0
        );


    localStorage.setItem(
        "civicAcademyFoundationsBestScore",
        String(
            Math.max(
                finalPercent,
                previousBestScore
            )
        )
    );


    resultsCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/*
RESTART LESSON 1
*/

function restartLesson() {

    currentQuestionIndex = 0;
    correctAnswers = 0;
    questionAnswered = false;


    resultsCard.hidden = true;
    quizCard.hidden = false;


    displayQuestion();


    quizCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/*
ACADEMY LESSON DEFINITIONS
*/

const academyLessons = [
    {
        number: 1,
        completedKey:
            "civicAcademyFoundationsCompleted"
    },
    {
        number: 2,
        completedKey:
            "civicAcademyChecksCompleted"
    },
    {
        number: 3,
        completedKey:
            "civicAcademyBillCompleted"
    },
    {
        number: 4,
        completedKey:
            "civicAcademyCongressCompleted"
    },
    {
        number: 5,
        completedKey:
            "civicAcademyPresidencyCompleted"
    },
    {
        number: 6,
        completedKey:
            "civicAcademyCourtsCompleted"
    },
    {
        number: 7,
        completedKey:
            "civicAcademyStateLocalCompleted"
    },
    {
        number: 8,
        completedKey:
            "civicAcademyParticipationCompleted"
    }
];


/*
UPDATE THE CIVIC ACADEMY LANDING PAGE
*/

function updateAcademyProgress() {

    const academyProgressFill =
        document.getElementById(
            "academyProgressFill"
        );

    const academyProgressPercent =
        document.getElementById(
            "academyProgressPercent"
        );

    const academyProgressText =
        document.getElementById(
            "academyProgressText"
        );

    const academyRank =
        document.getElementById(
            "academyRank"
        );


    if (
        !academyProgressFill ||
        !academyProgressPercent ||
        !academyProgressText ||
        !academyRank
    ) {
        return;
    }


    const completedLessons =
        academyLessons.filter(lesson => {

            return (
                localStorage.getItem(
                    lesson.completedKey
                ) === "true"
            );

        });


    const completedCount =
        completedLessons.length;

    const totalLessons =
        academyLessons.length;

    const academyProgress =
        Math.round(
            (
                completedCount /
                totalLessons
            ) * 100
        );


    academyProgressFill.style.width =
        `${academyProgress}%`;

    academyProgressPercent.textContent =
        `${academyProgress}%`;

    academyProgressText.textContent =
        `${completedCount} of ${totalLessons} lessons completed`;

    academyRank.textContent =
        getAcademyRank(completedCount);


    academyLessons.forEach(lesson => {

        const isCompleted =
            localStorage.getItem(
                lesson.completedKey
            ) === "true";


        updateLessonCard(
            lesson.number,
            isCompleted
        );

    });

}


/*
GET THE CURRENT ACADEMY RANK
*/

function getAcademyRank(completedCount) {

    const ranks = {
        0: "New Civic Explorer",
        1: "Civic Explorer I",
        2: "Civic Explorer II",
        3: "Civic Explorer III",
        4: "Civic Scholar I",
        5: "Civic Scholar II",
        6: "Civic Scholar III",
        7: "Constitution Scholar",
        8: "Civic Academy Graduate"
    };


    return (
        ranks[completedCount] ||
        "New Civic Explorer"
    );

}


/*
UPDATE A COMPLETED LESSON CARD
*/

function updateLessonCard(
    lessonNumber,
    isCompleted
) {

    if (!isCompleted) {
        return;
    }


    const lessonCards =
        document.querySelectorAll(
            ".academy-lesson-card"
        );


    const lessonCard =
        lessonCards[
            lessonNumber - 1
        ];


    if (!lessonCard) {
        return;
    }


    const statusBadge =
        lessonCard.querySelector(
            ".academy-status-badge"
        );

    const lessonButton =
        lessonCard.querySelector(
            ".academy-lesson-button"
        );


    if (statusBadge) {

        statusBadge.textContent =
            "Completed";

        statusBadge.classList.remove(
            "available"
        );

        statusBadge.classList.remove(
            "coming-soon"
        );

        statusBadge.classList.add(
            "completed"
        );

    }


    if (lessonButton) {

        lessonButton.textContent =
            "Review Lesson";

    }

}


/*
EVENT LISTENERS
*/

if (nextButton) {

    nextButton.addEventListener(
        "click",
        goToNextQuestion
    );

}


if (restartButton) {

    restartButton.addEventListener(
        "click",
        restartLesson
    );

}


/*
START THE FOUNDATIONS LESSON WHEN ON ITS PAGE
*/

if (
    questionTextElement &&
    answerOptionsElement
) {

    displayQuestion();

}


/*
UPDATE THE ACADEMY LANDING PAGE WHEN PRESENT
*/

updateAcademyProgress();