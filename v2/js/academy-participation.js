/*
==================================================
CIVIC HORIZON INDEX V2
ACADEMY LESSON 8
ELECTIONS AND CIVIC PARTICIPATION
==================================================
*/


/*
==================================================
CIVIC ACTION CHALLENGES
==================================================
*/

const participationChallenges = [

    {
        category: "Voting",

        title:
            "A citizen wants to help choose representatives in government.",

        prompt:
            "Which action is the most direct way to participate in an election?",

        answers: [
            "Serve on a jury",
            "Vote",
            "File a federal lawsuit",
            "Attend a zoning hearing"
        ],

        correctAnswer: 1,

        explanation:
            "Voting allows eligible citizens to choose among candidates and, in some elections, decide ballot questions."
    },

    {
        category: "Contacting Officials",

        title:
            "A resident wants a state legislator to know their position on a proposed law.",

        prompt:
            "Which action is an appropriate way to communicate that view?",

        answers: [
            "Contact the legislator's office",
            "Ask a federal judge to change the bill",
            "Order the legislature to vote a certain way",
            "Cancel the legislative session"
        ],

        correctAnswer: 0,

        explanation:
            "Citizens may contact elected officials by phone, email, letter, public meeting, or other lawful channels to share their views."
    },

    {
        category: "Public Meetings",

        title:
            "A town council is considering a change that affects a neighborhood.",

        prompt:
            "Which action may give residents a chance to speak directly about the proposal?",

        answers: [
            "Petition the Supreme Court automatically",
            "Ask Congress to take over the town",
            "Attend the public meeting and provide comment",
            "Wait until a presidential election"
        ],

        correctAnswer: 2,

        explanation:
            "Many local governments provide public-comment opportunities at meetings or hearings where residents can speak about community issues."
    },

    {
        category: "Organizing",

        title:
            "Several residents share the same concern about a local issue.",

        prompt:
            "Which activity is a lawful form of civic participation?",

        answers: [
            "Prevent other residents from speaking",
            "Ignore all public processes",
            "Impersonate government officials",
            "Organize with others and advocate for a position"
        ],

        correctAnswer: 3,

        explanation:
            "People may lawfully organize, form groups, advocate, petition, volunteer, and communicate with officials around issues they care about."
    },

    {
        category: "Local Participation",

        title:
            "A parent wants to learn more about decisions affecting the local public school system.",

        prompt:
            "Where could the parent often participate most directly?",

        answers: [
            "A local school board meeting",
            "A meeting of the United Nations",
            "The U.S. Supreme Court",
            "The Federal Reserve"
        ],

        correctAnswer: 0,

        explanation:
            "Local school boards often hold public meetings where residents can learn about policies, budgets, and other school district decisions."
    },

    {
        category: "Petitioning Government",

        title:
            "Citizens want government officials to consider changing a policy.",

        prompt:
            "Which activity reflects the right to petition government?",

        answers: [
            "Canceling an election",
            "Submitting a petition or formal request to public officials",
            "Removing an official without a legal process",
            "Ordering a court to rule a certain way"
        ],

        correctAnswer: 1,

        explanation:
            "The right to petition allows people to ask government to address grievances or consider changes through lawful civic processes."
    },

    {
        category: "Community Service",

        title:
            "A resident wants to help improve the community without running for office.",

        prompt:
            "Which is an example of civic participation?",

        answers: [
            "Avoiding all community activity",
            "Preventing neighbors from voting",
            "Volunteering with a community organization",
            "Claiming to hold a public office"
        ],

        correctAnswer: 2,

        explanation:
            "Civic participation can include volunteering and working with community organizations as well as voting and contacting government."
    },

    {
        category: "Between Elections",

        title:
            "Election Day has passed, but a citizen wants to remain involved in public affairs.",

        prompt:
            "Which statement is most accurate?",

        answers: [
            "Citizens may only participate during elections",
            "Only candidates may contact public officials",
            "Public meetings are closed to all residents",
            "Civic participation can continue between elections in many lawful ways"
        ],

        correctAnswer: 3,

        explanation:
            "Citizens can remain involved between elections by contacting officials, attending meetings, volunteering, organizing, submitting public comments, and participating in community organizations."
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

async function initializeParticipationLesson() {

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
            "participationAnswerOptions"
        );


    const nextButton =
        document.getElementById(
            "participationNextButton"
        );


    const restartButton =
        document.getElementById(
            "participationRestartButton"
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
        participationChallenges[
            currentChallengeIndex
        ];


    const challengeNumber =
        currentChallengeIndex + 1;


    const progressPercent =
        Math.round(
            (
                challengeNumber /
                participationChallenges.length
            ) * 100
        );


    challengeAnswered =
        false;


    setText(
        "participationQuestionNumber",
        `Challenge ${challengeNumber} of ${participationChallenges.length}`
    );


    setText(
        "participationProgressPercent",
        `${progressPercent}%`
    );


    setText(
        "participationScorePreview",
        `Score: ${correctAnswers} correct`
    );


    setText(
        "participationCategory",
        challenge.category
    );


    setText(
        "participationScenarioTitle",
        challenge.title
    );


    setText(
        "participationScenarioText",
        challenge.prompt
    );


    const progressFill =
        document.getElementById(
            "participationProgressFill"
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
            "participationNextButton"
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
            "participationAnswerOptions"
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
                            class="lesson-answer-button participation-answer-button"
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
            ".participation-answer-button"
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
        participationChallenges[
            currentChallengeIndex
        ];


    const answerButtons =
        document.querySelectorAll(
            ".participation-answer-button"
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
        "participationScorePreview",
        `Score: ${correctAnswers} correct`
    );


    const nextButton =
        document.getElementById(
            "participationNextButton"
        );


    if (nextButton) {

        nextButton.hidden =
            false;


        nextButton.textContent =
            currentChallengeIndex ===
            participationChallenges.length - 1
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
            "participationFeedback"
        );


    const icon =
        document.getElementById(
            "participationFeedbackIcon"
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
        "participationFeedbackTitle",
        correct
            ? "Correct"
            : "Not quite"
    );


    setText(
        "participationFeedbackText",
        explanation
    );

}


function hideFeedback() {

    const feedback =
        document.getElementById(
            "participationFeedback"
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
        participationChallenges.length
    ) {

        displayFinalResults();

        return;

    }


    displayChallenge();


    document
        .getElementById(
            "participationGameCard"
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
            "participationGameCard"
        );


    const resultsCard =
        document.getElementById(
            "participationResultsCard"
        );


    const finalPercent =
        Math.round(
            (
                correctAnswers /
                participationChallenges.length
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
        "participationFinalScore",
        `${correctAnswers} / ${participationChallenges.length}`
    );


    setText(
        "participationFinalPercent",
        `${finalPercent}%`
    );


    setText(
        "participationResultMessage",
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

        return "Outstanding work. You completed the Civic Academy with an excellent understanding of elections and civic participation.";

    }


    if (
        finalPercent >=
        75
    ) {

        return "Excellent work. You understand that civic participation includes voting as well as many ways to stay involved between elections.";

    }


    if (
        finalPercent >=
        50
    ) {

        return "Good work. Review the explanations and try again to strengthen your understanding of the many ways citizens can participate.";

    }


    return "You completed the lesson. Try it again to reinforce the different ways citizens can take part in civic life.";

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
            "civicAcademyParticipationCompleted",
            "true"
        );


        const previousBestScore =
            Number(
                window.localStorage.getItem(
                    "civicAcademyParticipationBestScore"
                ) || 0
            );


        window.localStorage.setItem(
            "civicAcademyParticipationBestScore",
            String(
                Math.max(
                    finalPercent,
                    previousBestScore
                )
            )
        );

    } catch (error) {

        console.warn(
            "Civic Participation progress could not be saved:",
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
            "participationGameCard"
        );


    const resultsCard =
        document.getElementById(
            "participationResultsCard"
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

initializeParticipationLesson();