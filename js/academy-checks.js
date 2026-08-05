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


const gameCard =
    document.getElementById("checksGameCard");

const resultsCard =
    document.getElementById("checksResultsCard");

const questionNumberElement =
    document.getElementById("checksQuestionNumber");

const progressPercentElement =
    document.getElementById("checksProgressPercent");

const progressFillElement =
    document.getElementById("checksProgressFill");

const scorePreviewElement =
    document.getElementById("checksScorePreview");

const categoryElement =
    document.getElementById("checksCategory");

const scenarioTitleElement =
    document.getElementById("checksScenarioTitle");

const scenarioTextElement =
    document.getElementById("checksScenarioText");

const answerOptionsElement =
    document.getElementById("checksAnswerOptions");

const feedbackElement =
    document.getElementById("checksFeedback");

const feedbackIconElement =
    document.getElementById("checksFeedbackIcon");

const feedbackTitleElement =
    document.getElementById("checksFeedbackTitle");

const feedbackTextElement =
    document.getElementById("checksFeedbackText");

const nextButton =
    document.getElementById("checksNextButton");

const restartButton =
    document.getElementById("checksRestartButton");

const finalScoreElement =
    document.getElementById("checksFinalScore");

const finalPercentElement =
    document.getElementById("checksFinalPercent");

const resultMessageElement =
    document.getElementById("checksResultMessage");


let currentChallengeIndex = 0;
let correctAnswers = 0;
let challengeAnswered = false;


/*
DISPLAY THE CURRENT CHALLENGE
*/

function displayChallenge() {

    const challenge =
        checksChallenges[currentChallengeIndex];

    const challengeNumber =
        currentChallengeIndex + 1;

    const progressPercent =
        Math.round(
            (
                challengeNumber /
                checksChallenges.length
            ) * 100
        );


    challengeAnswered = false;

    feedbackElement.hidden = true;
    nextButton.hidden = true;


    questionNumberElement.textContent =
        `Challenge ${challengeNumber} of ${checksChallenges.length}`;

    progressPercentElement.textContent =
        `${progressPercent}%`;

    progressFillElement.style.width =
        `${progressPercent}%`;

    scorePreviewElement.textContent =
        `Score: ${correctAnswers} correct`;

    categoryElement.textContent =
        challenge.category;

    scenarioTitleElement.textContent =
        challenge.title;

    scenarioTextElement.textContent =
        challenge.prompt;


    answerOptionsElement.innerHTML =
        challenge.answers
            .map((answer, answerIndex) => {

                return `

                    <button
                        type="button"
                        class="lesson-answer-button checks-answer-button"
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
        document.querySelectorAll(
            ".checks-answer-button"
        );


    answerButtons.forEach(button => {

        button.addEventListener(
            "click",
            handleAnswer
        );

    });

}


/*
HANDLE THE SELECTED ANSWER
*/

function handleAnswer(event) {

    if (challengeAnswered) {
        return;
    }


    challengeAnswered = true;


    const selectedButton =
        event.currentTarget;

    const selectedAnswerIndex =
        Number(
            selectedButton.dataset.answerIndex
        );

    const challenge =
        checksChallenges[currentChallengeIndex];

    const answerButtons =
        document.querySelectorAll(
            ".checks-answer-button"
        );


    answerButtons.forEach(
        (button, buttonIndex) => {

            button.disabled = true;


            if (
                buttonIndex ===
                challenge.correctAnswer
            ) {

                button.classList.add(
                    "correct-answer"
                );

            }

        }
    );


    if (
        selectedAnswerIndex ===
        challenge.correctAnswer
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
        challenge.explanation;

    feedbackElement.hidden = false;

    scorePreviewElement.textContent =
        `Score: ${correctAnswers} correct`;

    nextButton.textContent =
        currentChallengeIndex ===
        checksChallenges.length - 1
            ? "View Results"
            : "Continue";

    nextButton.hidden = false;

}


/*
MOVE TO THE NEXT CHALLENGE
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


    gameCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/*
DISPLAY FINAL RESULTS
*/

function displayFinalResults() {

    const finalPercent =
        Math.round(
            (
                correctAnswers /
                checksChallenges.length
            ) * 100
        );


    gameCard.hidden = true;
    resultsCard.hidden = false;


    finalScoreElement.textContent =
        `${correctAnswers} / ${checksChallenges.length}`;

    finalPercentElement.textContent =
        `${finalPercent}%`;


    if (finalPercent === 100) {

        resultMessageElement.textContent =
            "Outstanding work. You demonstrated an excellent understanding of checks and balances.";

    } else if (finalPercent >= 75) {

        resultMessageElement.textContent =
            "Excellent work. You understand how the branches use constitutional powers to limit one another.";

    } else if (finalPercent >= 50) {

        resultMessageElement.textContent =
            "Good work. Review the explanations and try again to strengthen the areas you missed.";

    } else {

        resultMessageElement.textContent =
            "You completed the lesson. Try it again to reinforce how each branch checks the others.";

    }


    localStorage.setItem(
        "civicAcademyChecksCompleted",
        "true"
    );


    const previousBestScore =
        Number(
            localStorage.getItem(
                "civicAcademyChecksBestScore"
            ) || 0
        );


    localStorage.setItem(
        "civicAcademyChecksBestScore",
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
RESTART THE LESSON
*/

function restartLesson() {

    currentChallengeIndex = 0;
    correctAnswers = 0;
    challengeAnswered = false;


    resultsCard.hidden = true;
    gameCard.hidden = false;


    displayChallenge();


    gameCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/*
EVENT LISTENERS
*/

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


/*
START THE GAME
*/

if (
    scenarioTitleElement &&
    answerOptionsElement
) {

    displayChallenge();

}