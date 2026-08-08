/*
==================================================
CIVIC HORIZON INDEX V2
ACADEMY LESSON 3
HOW A BILL BECOMES LAW
==================================================
*/


/*
==================================================
BILL STAGES
==================================================
*/

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


/*
==================================================
STATE
==================================================
*/

let currentStageIndex = 0;
let attempts = 0;
let availableStages = [];


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

async function initializeBillLesson() {

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

    resetGame();

}


/*
==================================================
EVENTS
==================================================
*/

function initializeLessonEvents() {

    const options =
        document.getElementById(
            "billStageOptions"
        );


    const resetButton =
        document.getElementById(
            "billResetButton"
        );


    const playAgainButton =
        document.getElementById(
            "billPlayAgainButton"
        );


    if (options) {

        options.addEventListener(
            "click",
            handleStageSelection
        );

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

}


/*
==================================================
SHUFFLE
==================================================
*/

function shuffleStages() {

    availableStages =
        [...billStages];


    for (
        let index =
            availableStages.length - 1;

        index > 0;

        index -= 1
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                (index + 1)
            );


        [
            availableStages[index],
            availableStages[randomIndex]
        ] = [
            availableStages[randomIndex],
            availableStages[index]
        ];

    }

}


/*
==================================================
STAGE OPTIONS
==================================================
*/

function renderStageOptions() {

    const container =
        document.getElementById(
            "billStageOptions"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        availableStages
            .map(
                stage => {

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
                                ${escapeHtml(stage.title)}
                            </span>

                        </button>
                    `;

                }
            )
            .join("");

}


/*
==================================================
TIMELINE
==================================================
*/

function renderTimeline() {

    const timeline =
        document.getElementById(
            "billTimeline"
        );


    if (!timeline) {
        return;
    }


    if (
        currentStageIndex ===
        0
    ) {

        timeline.innerHTML = `
            <p class="bill-empty-message">
                Choose the first stage to begin.
            </p>
        `;

        return;

    }


    timeline.innerHTML =
        billStages
            .slice(
                0,
                currentStageIndex
            )
            .map(
                (stage, index) => {

                    return `
                        <div class="bill-timeline-stage">

                            <div class="bill-timeline-number">
                                ${index + 1}
                            </div>

                            <div>

                                <strong>
                                    ${escapeHtml(stage.title)}
                                </strong>

                                <p>
                                    ${escapeHtml(stage.explanation)}
                                </p>

                            </div>

                        </div>
                    `;

                }
            )
            .join("");

}


/*
==================================================
STAGE SELECTION
==================================================
*/

function handleStageSelection(
    event
) {

    const selectedButton =
        event.target.closest(
            ".bill-stage-option"
        );


    if (!selectedButton) {
        return;
    }


    const selectedStageId =
        selectedButton.dataset.stageId;


    const correctStage =
        billStages[
            currentStageIndex
        ];


    attempts += 1;


    if (
        selectedStageId ===
        correctStage.id
    ) {

        selectedButton.classList.add(
            "bill-stage-correct"
        );


        showFeedback(
            true,
            "Correct stage",
            correctStage.explanation
        );


        availableStages =
            availableStages.filter(
                stage =>
                    stage.id !==
                    selectedStageId
            );


        currentStageIndex +=
            1;


        updateProgress();


        window.setTimeout(
            () => {

                renderTimeline();

                renderStageOptions();


                if (
                    currentStageIndex >=
                    billStages.length
                ) {

                    displayFinalResults();

                }

            },
            350
        );

    } else {

        selectedButton.classList.add(
            "bill-stage-incorrect"
        );


        showFeedback(
            false,
            "Not yet",
            `That stage comes later. Look for the step that should happen before “${correctStage.title}.”`
        );


        window.setTimeout(
            () => {

                selectedButton.classList.remove(
                    "bill-stage-incorrect"
                );

            },
            650
        );

    }


    updateProgress();

}


/*
==================================================
PROGRESS
==================================================
*/

function updateProgress() {

    const progressPercent =
        Math.round(
            (
                currentStageIndex /
                billStages.length
            ) * 100
        );


    setText(
        "billProgressText",
        `${currentStageIndex} of ${billStages.length} stages placed`
    );


    setText(
        "billProgressPercent",
        `${progressPercent}%`
    );


    setText(
        "billAttemptsText",
        `Attempts: ${attempts}`
    );


    const progressFill =
        document.getElementById(
            "billProgressFill"
        );


    if (progressFill) {

        progressFill.style.width =
            `${progressPercent}%`;

    }

}


/*
==================================================
FEEDBACK
==================================================
*/

function showFeedback(
    correct,
    title,
    explanation
) {

    const feedback =
        document.getElementById(
            "billFeedback"
        );


    const icon =
        document.getElementById(
            "billFeedbackIcon"
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
        "billFeedbackTitle",
        title
    );


    setText(
        "billFeedbackText",
        explanation
    );

}


/*
==================================================
FINAL RESULTS
==================================================
*/

function displayFinalResults() {

    const gameCard =
        document.getElementById(
            "billGameCard"
        );


    const resultsCard =
        document.getElementById(
            "billResultsCard"
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
        "billFinalAttempts",
        attempts
    );


    setText(
        "billResultMessage",
        getResultMessage()
    );


    saveLessonProgress();


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

function getResultMessage() {

    if (
        attempts ===
        billStages.length
    ) {

        return "Perfect sequence. You placed every stage correctly on your first attempt.";

    }


    if (
        attempts <=
        11
    ) {

        return "Excellent work. You showed a strong understanding of the federal lawmaking process.";

    }


    if (
        attempts <=
        15
    ) {

        return "Good work. You successfully completed the legislative sequence.";

    }


    return "You completed the process. Playing again will help reinforce the correct sequence.";

}


/*
==================================================
SAVE PROGRESS
==================================================
*/

function saveLessonProgress() {

    try {

        window.localStorage.setItem(
            "civicAcademyBillCompleted",
            "true"
        );


        const previousBest =
            Number(
                window.localStorage.getItem(
                    "civicAcademyBillBestAttempts"
                ) || 999
            );


        window.localStorage.setItem(
            "civicAcademyBillBestAttempts",
            String(
                Math.min(
                    attempts,
                    previousBest
                )
            )
        );

    } catch (error) {

        console.warn(
            "Bill lesson progress could not be saved:",
            error
        );

    }

}


/*
==================================================
RESET GAME
==================================================
*/

function resetGame() {

    currentStageIndex =
        0;


    attempts =
        0;


    shuffleStages();


    const feedback =
        document.getElementById(
            "billFeedback"
        );


    const gameCard =
        document.getElementById(
            "billGameCard"
        );


    const resultsCard =
        document.getElementById(
            "billResultsCard"
        );


    if (feedback) {

        feedback.hidden =
            true;

    }


    if (resultsCard) {

        resultsCard.hidden =
            true;

    }


    if (gameCard) {

        gameCard.hidden =
            false;

    }


    renderTimeline();

    renderStageOptions();

    updateProgress();


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

initializeBillLesson();