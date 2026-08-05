const billStages = [
    {
        id: "idea",
        title: "An idea is proposed",
        explanation:
            "A proposal may come from a member of Congress, citizens, advocacy groups, the executive branch, or other sources."
    },
    {
        id: "introduced",
        title: "A bill is introduced",
        explanation:
            "A member of the House or Senate formally introduces the bill in their chamber."
    },
    {
        id: "committee",
        title: "The bill goes to committee",
        explanation:
            "A committee studies the bill, may hold hearings, considers changes, and decides whether to advance it."
    },
    {
        id: "firstChamber",
        title: "The first chamber debates and votes",
        explanation:
            "The House or Senate debates the bill and votes on whether to pass it."
    },
    {
        id: "secondChamber",
        title: "The other chamber considers the bill",
        explanation:
            "The bill must also pass the other chamber, which may approve, reject, or change it."
    },
    {
        id: "differences",
        title: "Differences are resolved",
        explanation:
            "If the House and Senate pass different versions, they must agree on identical language."
    },
    {
        id: "president",
        title: "The bill goes to the president",
        explanation:
            "The president may sign the bill, veto it, or take no action."
    },
    {
        id: "law",
        title: "The bill becomes law",
        explanation:
            "Once enacted, agencies may be responsible for carrying out and enforcing the new law."
    }
];


const stageOptionsElement =
    document.getElementById("billStageOptions");

const timelineElement =
    document.getElementById("billTimeline");

const progressTextElement =
    document.getElementById("billProgressText");

const progressPercentElement =
    document.getElementById("billProgressPercent");

const progressFillElement =
    document.getElementById("billProgressFill");

const attemptsTextElement =
    document.getElementById("billAttemptsText");

const feedbackElement =
    document.getElementById("billFeedback");

const feedbackIconElement =
    document.getElementById("billFeedbackIcon");

const feedbackTitleElement =
    document.getElementById("billFeedbackTitle");

const feedbackTextElement =
    document.getElementById("billFeedbackText");

const resetButton =
    document.getElementById("billResetButton");

const gameCard =
    document.getElementById("billGameCard");

const resultsCard =
    document.getElementById("billResultsCard");

const finalAttemptsElement =
    document.getElementById("billFinalAttempts");

const resultMessageElement =
    document.getElementById("billResultMessage");

const playAgainButton =
    document.getElementById("billPlayAgainButton");


let currentStageIndex = 0;
let attempts = 0;
let availableStages = [];


function shuffleStages() {

    availableStages =
        [...billStages].sort(
            () => Math.random() - 0.5
        );

}


function renderStageOptions() {

    if (!stageOptionsElement) {
        console.error(
            "Could not find #billStageOptions."
        );

        return;
    }


    stageOptionsElement.innerHTML =
        availableStages
            .map(stage => {

                return `

                    <button
                        type="button"
                        class="bill-stage-option"
                        data-stage-id="${stage.id}"
                    >

                        <span class="bill-stage-option-icon">
                            +
                        </span>

                        <span>
                            ${stage.title}
                        </span>

                    </button>

                `;

            })
            .join("");


    const stageButtons =
        stageOptionsElement.querySelectorAll(
            ".bill-stage-option"
        );


    stageButtons.forEach(button => {

        button.addEventListener(
            "click",
            handleStageSelection
        );

    });

}


function renderTimeline() {

    if (!timelineElement) {
        return;
    }


    if (currentStageIndex === 0) {

        timelineElement.innerHTML = `

            <p class="bill-empty-message">
                Choose the first stage to begin.
            </p>

        `;

        return;

    }


    timelineElement.innerHTML =
        billStages
            .slice(0, currentStageIndex)
            .map((stage, index) => {

                return `

                    <div class="bill-timeline-stage">

                        <div class="bill-timeline-number">
                            ${index + 1}
                        </div>

                        <div>

                            <strong>
                                ${stage.title}
                            </strong>

                            <p>
                                ${stage.explanation}
                            </p>

                        </div>

                    </div>

                `;

            })
            .join("");

}


function handleStageSelection(event) {

    const selectedButton =
        event.currentTarget;

    const selectedStageID =
        selectedButton.dataset.stageId;

    const correctStage =
        billStages[currentStageIndex];


    attempts += 1;


    if (
        selectedStageID ===
        correctStage.id
    ) {

        selectedButton.classList.add(
            "bill-stage-correct"
        );


        feedbackElement.className =
            "lesson-feedback correct-feedback";

        feedbackIconElement.textContent =
            "✓";

        feedbackTitleElement.textContent =
            "Correct stage";

        feedbackTextElement.textContent =
            correctStage.explanation;

        feedbackElement.hidden = false;


        availableStages =
            availableStages.filter(
                stage =>
                    stage.id !== selectedStageID
            );


        currentStageIndex += 1;

        updateProgress();


        window.setTimeout(() => {

            renderTimeline();

            renderStageOptions();


            if (
                currentStageIndex >=
                billStages.length
            ) {

                displayFinalResults();

            }

        }, 350);

    } else {

        selectedButton.classList.add(
            "bill-stage-incorrect"
        );


        feedbackElement.className =
            "lesson-feedback incorrect-feedback";

        feedbackIconElement.textContent =
            "!";

        feedbackTitleElement.textContent =
            "Not yet";

        feedbackTextElement.textContent =
            `That stage comes later. Look for the step that should happen before “${correctStage.title}.”`;

        feedbackElement.hidden = false;


        window.setTimeout(() => {

            selectedButton.classList.remove(
                "bill-stage-incorrect"
            );

        }, 650);

    }


    updateProgress();

}


function updateProgress() {

    const progressPercent =
        Math.round(
            (
                currentStageIndex /
                billStages.length
            ) * 100
        );


    progressTextElement.textContent =
        `${currentStageIndex} of ${billStages.length} stages placed`;

    progressPercentElement.textContent =
        `${progressPercent}%`;

    progressFillElement.style.width =
        `${progressPercent}%`;

    attemptsTextElement.textContent =
        `Attempts: ${attempts}`;

}


function displayFinalResults() {

    gameCard.hidden = true;

    resultsCard.hidden = false;

    finalAttemptsElement.textContent =
        attempts;


    if (attempts === billStages.length) {

        resultMessageElement.textContent =
            "Perfect sequence. You placed every stage correctly on your first attempt.";

    } else if (attempts <= 11) {

        resultMessageElement.textContent =
            "Excellent work. You showed a strong understanding of the federal lawmaking process.";

    } else if (attempts <= 15) {

        resultMessageElement.textContent =
            "Good work. You successfully completed the legislative sequence.";

    } else {

        resultMessageElement.textContent =
            "You completed the process. Playing again will help reinforce the correct sequence.";

    }


    localStorage.setItem(
        "civicAcademyBillCompleted",
        "true"
    );


    const previousBest =
        Number(
            localStorage.getItem(
                "civicAcademyBillBestAttempts"
            ) || 999
        );


    localStorage.setItem(
        "civicAcademyBillBestAttempts",
        String(
            Math.min(
                attempts,
                previousBest
            )
        )
    );


    resultsCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


function resetGame() {

    currentStageIndex = 0;

    attempts = 0;

    shuffleStages();

    feedbackElement.hidden = true;

    resultsCard.hidden = true;

    gameCard.hidden = false;

    renderTimeline();

    renderStageOptions();

    updateProgress();

}


if (resetButton) {

    resetButton.addEventListener(
        "click",
        resetGame
    );

}


if (playAgainButton) {

    playAgainButton.addEventListener(
        "click",
        resetGame
    );

}


/*
START THE GAME
*/

if (
    stageOptionsElement &&
    timelineElement
) {

    shuffleStages();

    renderTimeline();

    renderStageOptions();

    updateProgress();

} else {

    console.error(
        "The bill game could not start because required HTML elements were not found."
    );

}