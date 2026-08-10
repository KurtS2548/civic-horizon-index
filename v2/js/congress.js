/*
==================================================
CIVIC HORIZON INDEX V2
MEMBER OF CONGRESS SIMULATION
==================================================
*/


/*
==================================================
SCENARIOS
==================================================
*/

const congressScenarios = [

    {
        category: "Constituent Request",

        title:
            "A major bridge in District 14 needs expensive repairs.",

        text:
            "Residents want action, but federal infrastructure funding is competitive. How do you respond?",

        stage:
            "District Outreach",

        choices: [

            {
                text:
                    "Hold a public meeting and build a detailed infrastructure proposal",

                outcomeTitle:
                    "You build a strong public case",

                outcomeText:
                    "Residents appreciate being heard, and the detailed proposal gives you a credible starting point in Congress.",

                approval: 5,
                bipartisan: 1,
                committee: 2,
                trust: 7,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "District 14 representative launches public infrastructure initiative."
            },

            {
                text:
                    "Promise the bridge will be fully funded immediately",

                outcomeTitle:
                    "The promise generates enthusiasm",

                outcomeText:
                    "Residents like the commitment, but the promise gets ahead of what one member of Congress can guarantee.",

                approval: 4,
                bipartisan: 0,
                committee: -2,
                trust: -3,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "Representative makes ambitious bridge funding pledge."
            },

            {
                text:
                    "Tell residents the issue is entirely the state's responsibility",

                outcomeTitle:
                    "Residents feel dismissed",

                outcomeText:
                    "State and local governments have important roles, but federal infrastructure programs may also be relevant.",

                approval: -6,
                bipartisan: 0,
                committee: 0,
                trust: -8,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "District leaders criticize congressional response to bridge concerns."
            },

            {
                text:
                    "Ignore the issue and focus on national media appearances",

                outcomeTitle:
                    "District concerns go unanswered",

                outcomeText:
                    "Your visibility increases, but constituents become frustrated that a local priority received little attention.",

                approval: -8,
                bipartisan: -1,
                committee: 0,
                trust: -10,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "District groups question representative's focus on national attention."
            }

        ]
    },


    {
        category: "Legislation",

        title:
            "You are ready to introduce an infrastructure bill.",

        text:
            "How do you design the legislation before formally introducing it?",

        stage:
            "Drafting Legislation",

        choices: [

            {
                text:
                    "Write a narrowly targeted bill with clear funding rules",

                outcomeTitle:
                    "The proposal earns a serious review",

                outcomeText:
                    "The focused bill does not satisfy every group, but colleagues see it as realistic and workable.",

                approval: 2,
                bipartisan: 4,
                committee: 5,
                trust: 3,
                billsIntroduced: 1,
                billsPassed: 0,

                headline:
                    "District 14 representative introduces targeted infrastructure bill."
            },

            {
                text:
                    "Add unrelated programs to attract as many groups as possible",

                outcomeTitle:
                    "The bill becomes difficult to defend",

                outcomeText:
                    "More interests are included, but the broader package attracts criticism over cost and complexity.",

                approval: -1,
                bipartisan: -2,
                committee: -5,
                trust: -2,
                billsIntroduced: 1,
                billsPassed: 0,

                headline:
                    "Broad infrastructure package faces questions over expanding scope."
            },

            {
                text:
                    "Consult lawmakers from both parties before introduction",

                outcomeTitle:
                    "Early coalition-building pays off",

                outcomeText:
                    "The bill changes during discussions, but it enters Congress with a wider base of support.",

                approval: 3,
                bipartisan: 8,
                committee: 4,
                trust: 3,
                billsIntroduced: 1,
                billsPassed: 0,

                headline:
                    "Bipartisan lawmakers join District 14 infrastructure proposal."
            },

            {
                text:
                    "Introduce the bill without discussing it with anyone",

                outcomeTitle:
                    "The bill starts without a coalition",

                outcomeText:
                    "You maintain full control over the proposal, but colleagues have little reason to prioritize it.",

                approval: 0,
                bipartisan: -6,
                committee: -4,
                trust: -1,
                billsIntroduced: 1,
                billsPassed: 0,

                headline:
                    "Infrastructure bill introduced with limited congressional backing."
            }

        ]
    },


    {
        category: "Committee Review",

        title:
            "Your bill has been referred to a House committee.",

        text:
            "Committee members want more evidence about cost and local impact. What do you do?",

        stage:
            "Committee Review",

        choices: [

            {
                text:
                    "Provide evidence, invite experts, and accept reasonable amendments",

                outcomeTitle:
                    "The committee strengthens the bill",

                outcomeText:
                    "The process takes time, but members gain confidence in the proposal and its underlying evidence.",

                approval: 2,
                bipartisan: 5,
                committee: 10,
                trust: 4,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "Committee advances revised infrastructure proposal after detailed hearing."
            },

            {
                text:
                    "Attack committee members who question the bill",

                outcomeTitle:
                    "Relationships deteriorate",

                outcomeText:
                    "The confrontation attracts attention but makes committee members less willing to help move the legislation.",

                approval: -1,
                bipartisan: -6,
                committee: -12,
                trust: -3,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "Tensions rise during infrastructure committee review."
            },

            {
                text:
                    "Withdraw the bill rather than allow amendments",

                outcomeTitle:
                    "The proposal stops moving",

                outcomeText:
                    "You preserve the original language, but the infrastructure effort loses its path through Congress.",

                approval: -7,
                bipartisan: -2,
                committee: -5,
                trust: -7,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "District 14 infrastructure bill withdrawn during committee process."
            },

            {
                text:
                    "Accept every requested change without reviewing it",

                outcomeTitle:
                    "The bill loses focus",

                outcomeText:
                    "Committee resistance falls, but the proposal becomes harder to explain to your district.",

                approval: -2,
                bipartisan: 4,
                committee: 6,
                trust: -5,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "Heavily amended infrastructure proposal emerges from committee."
            }

        ]
    },


    {
        category: "Coalition Building",

        title:
            "The bill reaches the House floor, but you do not yet have enough votes.",

        text:
            "How do you try to build the coalition needed for passage?",

        stage:
            "House Negotiation",

        choices: [

            {
                text:
                    "Negotiate specific policy compromises with undecided members",

                outcomeTitle:
                    "A broader coalition forms",

                outcomeText:
                    "The final bill is not exactly what you started with, but the compromise brings important votes aboard.",

                approval: 2,
                bipartisan: 8,
                committee: 3,
                trust: 2,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "Infrastructure coalition expands after House negotiations."
            },

            {
                text:
                    "Refuse all compromise",

                outcomeTitle:
                    "Support stalls",

                outcomeText:
                    "Some constituents admire the firm position, but the bill remains short of the votes needed to advance.",

                approval: 0,
                bipartisan: -10,
                committee: -3,
                trust: -1,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "Infrastructure vote uncertain as negotiations stall."
            },

            {
                text:
                    "Explain which changes you will accept and why",

                outcomeTitle:
                    "Transparency helps the negotiation",

                outcomeText:
                    "Lawmakers understand your limits, while constituents can see why compromises are being considered.",

                approval: 3,
                bipartisan: 6,
                committee: 3,
                trust: 7,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "Representative outlines public framework for infrastructure compromise."
            },

            {
                text:
                    "Make private promises you may not be able to keep",

                outcomeTitle:
                    "Support grows, but credibility weakens",

                outcomeText:
                    "Some votes move your way, but colleagues become concerned about commitments that may not be realistic.",

                approval: 1,
                bipartisan: -3,
                committee: -2,
                trust: -7,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "Questions emerge about private commitments in infrastructure negotiations."
            }

        ]
    },


    {
        category: "House Vote",

        title:
            "The House is ready to vote on your infrastructure bill.",

        text:
            "You are still a few votes short. What is your final approach?",

        stage:
            "House Vote",

        choices: [

            {
                text:
                    "Make one final bipartisan policy compromise",

                outcomeTitle:
                    "The bill passes the House",

                outcomeText:
                    "The compromise costs you part of the original proposal, but enough lawmakers support the final package.",

                approval: 3,
                bipartisan: 7,
                committee: 4,
                trust: 2,
                billsIntroduced: 0,
                billsPassed: 1,

                headline:
                    "House approves bipartisan infrastructure legislation."
            },

            {
                text:
                    "Keep the original bill unchanged and accept the result",

                outcomeTitle:
                    "The bill narrowly fails",

                outcomeText:
                    "Your position remains consistent, but the legislation does not gain enough support for passage.",

                approval: -3,
                bipartisan: -6,
                committee: -2,
                trust: 0,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "Infrastructure proposal falls short in House vote."
            },

            {
                text:
                    "Remove a controversial provision to secure the final votes",

                outcomeTitle:
                    "A smaller bill passes",

                outcomeText:
                    "The measure accomplishes less than originally planned, but it moves forward with a workable majority.",

                approval: 1,
                bipartisan: 5,
                committee: 4,
                trust: 1,
                billsIntroduced: 0,
                billsPassed: 1,

                headline:
                    "Revised infrastructure bill wins House approval."
            },

            {
                text:
                    "Promise unrelated favors for votes",

                outcomeTitle:
                    "The promises produce short-term support",

                outcomeText:
                    "The bill moves forward, but your credibility suffers when colleagues question whether the promises can be kept.",

                approval: 1,
                bipartisan: -4,
                committee: -2,
                trust: -8,
                billsIntroduced: 0,
                billsPassed: 1,

                headline:
                    "Infrastructure vote succeeds amid questions about private commitments."
            }

        ]
    },


    {
        category: "Senate Negotiation",

        title:
            "The Senate passes a different version of the bill.",

        text:
            "Both chambers must agree on identical language. What approach do you support?",

        stage:
            "Resolving Differences",

        choices: [

            {
                text:
                    "Work with Senate negotiators on a compromise",

                outcomeTitle:
                    "The chambers reach agreement",

                outcomeText:
                    "Neither side gets everything it wanted, but a final version gains enough support in both chambers.",

                approval: 3,
                bipartisan: 8,
                committee: 5,
                trust: 3,
                billsIntroduced: 0,
                billsPassed: 1,

                headline:
                    "House and Senate negotiators reach infrastructure compromise."
            },

            {
                text:
                    "Demand that the Senate accept the House version",

                outcomeTitle:
                    "Negotiations break down",

                outcomeText:
                    "The firm position satisfies some supporters, but the bill remains stalled between the chambers.",

                approval: -2,
                bipartisan: -9,
                committee: -4,
                trust: -2,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "Infrastructure negotiations stall over competing versions."
            },

            {
                text:
                    "Remove the most controversial section",

                outcomeTitle:
                    "The narrower bill advances",

                outcomeText:
                    "The final package accomplishes less, but it becomes easier for both chambers to approve.",

                approval: 1,
                bipartisan: 6,
                committee: 4,
                trust: 0,
                billsIntroduced: 0,
                billsPassed: 1,

                headline:
                    "Narrower infrastructure package clears negotiations."
            },

            {
                text:
                    "Abandon the bill",

                outcomeTitle:
                    "The effort ends",

                outcomeText:
                    "You avoid further conflict, but the bridge problem remains unresolved and public disappointment grows.",

                approval: -8,
                bipartisan: -1,
                committee: -3,
                trust: -10,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "Infrastructure bill abandoned after House-Senate disagreement."
            }

        ]
    },


    {
        category: "Presidential Decision",

        title:
            "The bill reaches the president.",

        text:
            "The administration wants one final change before signing. What do you do?",

        stage:
            "Executive Review",

        choices: [

            {
                text:
                    "Negotiate a limited final change",

                outcomeTitle:
                    "The bill is signed",

                outcomeText:
                    "The final compromise preserves the core project and secures presidential approval.",

                approval: 5,
                bipartisan: 5,
                committee: 2,
                trust: 4,
                billsIntroduced: 0,
                billsPassed: 1,

                headline:
                    "President signs bipartisan infrastructure package."
            },

            {
                text:
                    "Refuse and risk a veto",

                outcomeTitle:
                    "The president vetoes the bill",

                outcomeText:
                    "Your supporters praise your position, but the bill now faces a difficult override effort.",

                approval: -1,
                bipartisan: -5,
                committee: -1,
                trust: 0,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "President vetoes infrastructure legislation after negotiations fail."
            },

            {
                text:
                    "Publicly accuse the president of bad faith",

                outcomeTitle:
                    "The conflict dominates the news",

                outcomeText:
                    "The confrontation energizes some supporters but damages future cooperation.",

                approval: 0,
                bipartisan: -8,
                committee: -2,
                trust: -2,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "Public dispute erupts over infrastructure bill."
            },

            {
                text:
                    "Withdraw support for your own bill",

                outcomeTitle:
                    "The coalition collapses",

                outcomeText:
                    "Colleagues and constituents are confused by the reversal, and your credibility declines.",

                approval: -7,
                bipartisan: -6,
                committee: -5,
                trust: -11,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "Bill sponsor withdraws support during final negotiations."
            }

        ]
    },


    {
        category: "Public Accountability",

        title:
            "Your term is nearing its end.",

        text:
            "Constituents want to know what you accomplished. How do you close your term?",

        stage:
            "End of Term",

        choices: [

            {
                text:
                    "Hold a public town hall and answer questions",

                outcomeTitle:
                    "You faced the public directly",

                outcomeText:
                    "The meeting includes criticism, but your willingness to explain your decisions increases public trust.",

                approval: 4,
                bipartisan: 1,
                committee: 0,
                trust: 9,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "Representative holds open town hall on first-term record."
            },

            {
                text:
                    "Publish a detailed report with results and setbacks",

                outcomeTitle:
                    "You chose transparency",

                outcomeText:
                    "The report acknowledges both successes and failures, strengthening your reputation for honesty.",

                approval: 3,
                bipartisan: 2,
                committee: 1,
                trust: 8,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "District 14 representative releases detailed legislative report."
            },

            {
                text:
                    "Highlight only successes and avoid difficult questions",

                outcomeTitle:
                    "The message feels incomplete",

                outcomeText:
                    "Supporters respond positively, but critics and local reporters challenge the omissions.",

                approval: -1,
                bipartisan: 0,
                committee: 0,
                trust: -6,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "Local media questions representative's account of congressional record."
            },

            {
                text:
                    "Skip public events and focus on fundraising",

                outcomeTitle:
                    "Constituents feel ignored",

                outcomeText:
                    "Your campaign resources improve, but trust and approval fall sharply.",

                approval: -9,
                bipartisan: 0,
                committee: 0,
                trust: -13,
                billsIntroduced: 0,
                billsPassed: 0,

                headline:
                    "District groups criticize representative's absence from public events."
            }

        ]
    }

];


/*
==================================================
GAME STATE
==================================================
*/

const gameState = {

    approval: 70,
    bipartisan: 50,
    committee: 50,
    trust: 70,
    billsIntroduced: 0,
    billsPassed: 0

};


let currentScenarioIndex = 0;

let decisionLocked = false;


/*
==================================================
DOM REFERENCES
==================================================
*/

const startScreen =
    document.getElementById(
        "congressStartScreen"
    );


const gameScreen =
    document.getElementById(
        "congressGameScreen"
    );


const resultsScreen =
    document.getElementById(
        "congressResultsScreen"
    );


const startButton =
    document.getElementById(
        "congressStartButton"
    );


const restartButton =
    document.getElementById(
        "congressRestartButton"
    );


const continueButton =
    document.getElementById(
        "congressContinueButton"
    );


const scenarioCategory =
    document.getElementById(
        "congressScenarioCategory"
    );


const scenarioProgress =
    document.getElementById(
        "congressScenarioProgress"
    );


const scenarioTitle =
    document.getElementById(
        "congressScenarioTitle"
    );


const scenarioText =
    document.getElementById(
        "congressScenarioText"
    );


const choiceContainer =
    document.getElementById(
        "congressChoiceContainer"
    );


const outcome =
    document.getElementById(
        "congressOutcome"
    );


const outcomeIcon =
    document.getElementById(
        "congressOutcomeIcon"
    );


const outcomeTitle =
    document.getElementById(
        "congressOutcomeTitle"
    );


const outcomeText =
    document.getElementById(
        "congressOutcomeText"
    );


const newsFeed =
    document.getElementById(
        "congressNewsFeed"
    );


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
HELPERS
==================================================
*/

function clamp(
    value
) {

    return Math.max(
        0,
        Math.min(
            100,
            value
        )
    );

}


function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            String(value);

    }

}


function updateMetric(
    valueId,
    barId,
    value
) {

    setText(
        valueId,
        `${value}%`
    );


    const bar =
        document.getElementById(
            barId
        );


    if (bar) {

        bar.style.width =
            `${value}%`;

    }

}


/*
==================================================
DASHBOARD
==================================================
*/

function updateDashboard() {

    gameState.approval =
        clamp(
            gameState.approval
        );


    gameState.bipartisan =
        clamp(
            gameState.bipartisan
        );


    gameState.committee =
        clamp(
            gameState.committee
        );


    gameState.trust =
        clamp(
            gameState.trust
        );


    setText(
        "congressApproval",
        `${gameState.approval}%`
    );


    setText(
        "congressBipartisan",
        `${gameState.bipartisan}%`
    );


    setText(
        "congressCommittee",
        `${gameState.committee}%`
    );


    setText(
        "congressTrust",
        `${gameState.trust}%`
    );


    setText(
        "congressBillsIntroduced",
        gameState.billsIntroduced
    );


    setText(
        "congressBillsPassed",
        gameState.billsPassed
    );


    setText(
        "districtApproval",
        `${gameState.approval}%`
    );


    setText(
        "districtTrust",
        `${gameState.trust}%`
    );


    setText(
        "sideBillsIntroduced",
        gameState.billsIntroduced
    );


    setText(
        "sideBillsPassed",
        gameState.billsPassed
    );


    updateMetric(
        "sideApproval",
        "sideApprovalBar",
        gameState.approval
    );


    updateMetric(
        "sideBipartisan",
        "sideBipartisanBar",
        gameState.bipartisan
    );


    updateMetric(
        "sideCommittee",
        "sideCommitteeBar",
        gameState.committee
    );


    updateMetric(
        "sideTrust",
        "sideTrustBar",
        gameState.trust
    );


    const progress =
        Math.round(
            (
                currentScenarioIndex /
                congressScenarios.length
            ) * 100
        );


    setText(
        "congressTermProgress",
        `${progress}%`
    );

}


/*
==================================================
RENDER SCENARIO
==================================================
*/

function renderScenario() {

    const scenario =
        congressScenarios[
            currentScenarioIndex
        ];


    if (!scenario) {

        showFinalResults();

        return;

    }


    decisionLocked =
        false;


    if (outcome) {

        outcome.hidden =
            true;

    }


    if (continueButton) {

        continueButton.hidden =
            true;

    }


    if (scenarioCategory) {

        scenarioCategory.textContent =
            scenario.category;

    }


    if (scenarioProgress) {

        scenarioProgress.textContent =
            `Decision ${currentScenarioIndex + 1} of ${congressScenarios.length}`;

    }


    if (scenarioTitle) {

        scenarioTitle.textContent =
            scenario.title;

    }


    if (scenarioText) {

        scenarioText.textContent =
            scenario.text;

    }


    setText(
        "congressTurnLabel",
        `Week ${1 + currentScenarioIndex * 6}`
    );


    setText(
        "congressCurrentStage",
        scenario.stage
    );


    if (choiceContainer) {

        choiceContainer.innerHTML =
            scenario.choices
                .map(
                    (choice, index) => {

                        return `
                            <button
                                type="button"
                                class="congress-choice-button"
                                data-choice-index="${index}"
                            >

                                <span>
                                    ${String.fromCharCode(65 + index)}
                                </span>

                                <strong>
                                    ${escapeHtml(choice.text)}
                                </strong>

                            </button>
                        `;

                    }
                )
                .join("");

    }


    updateDashboard();

}


/*
==================================================
HANDLE CHOICE
==================================================
*/

function handleChoice(
    event
) {

    const selectedButton =
        event.target.closest(
            ".congress-choice-button"
        );


    if (
        !selectedButton ||
        decisionLocked
    ) {

        return;

    }


    decisionLocked =
        true;


    const choiceIndex =
        Number(
            selectedButton.dataset.choiceIndex
        );


    const scenario =
        congressScenarios[
            currentScenarioIndex
        ];


    const choice =
        scenario.choices[
            choiceIndex
        ];


    const choiceButtons =
        choiceContainer
            ?.querySelectorAll(
                ".congress-choice-button"
            );


    choiceButtons?.forEach(
        button => {

            button.disabled =
                true;

        }
    );


    selectedButton.classList.add(
        "congress-choice-selected"
    );


    gameState.approval +=
        choice.approval;


    gameState.bipartisan +=
        choice.bipartisan;


    gameState.committee +=
        choice.committee;


    gameState.trust +=
        choice.trust;


    gameState.billsIntroduced +=
        choice.billsIntroduced;


    gameState.billsPassed +=
        choice.billsPassed;


    updateDashboard();


    addHeadline(
        scenario.category,
        choice.headline
    );


    const totalChange =
        choice.approval +
        choice.bipartisan +
        choice.committee +
        choice.trust;


    if (outcomeIcon) {

        if (
            totalChange >=
            10
        ) {

            outcomeIcon.textContent =
                "✓";

        } else if (
            totalChange <=
            -10
        ) {

            outcomeIcon.textContent =
                "!";

        } else {

            outcomeIcon.textContent =
                "•";

        }

    }


    if (outcomeTitle) {

        outcomeTitle.textContent =
            choice.outcomeTitle;

    }


    if (outcomeText) {

        outcomeText.textContent =
            choice.outcomeText;

    }


    if (outcome) {

        outcome.hidden =
            false;

    }


    if (continueButton) {

        continueButton.textContent =
            currentScenarioIndex ===
            congressScenarios.length - 1
                ? "View Report Card"
                : "Continue";


        continueButton.hidden =
            false;

    }

}


/*
==================================================
CAPITOL NEWS
==================================================
*/

function addHeadline(
    category,
    headline
) {

    if (!newsFeed) {
        return;
    }


    const newsItem =
        document.createElement(
            "div"
        );


    newsItem.className =
        "congress-news-item";


    const categoryElement =
        document.createElement(
            "span"
        );


    categoryElement.textContent =
        category;


    const headlineElement =
        document.createElement(
            "p"
        );


    headlineElement.textContent =
        headline;


    newsItem.append(
        categoryElement,
        headlineElement
    );


    newsFeed.prepend(
        newsItem
    );


    const newsItems =
        newsFeed.querySelectorAll(
            ".congress-news-item"
        );


    if (
        newsItems.length >
        5
    ) {

        newsItems[
            newsItems.length - 1
        ].remove();

    }

}


/*
==================================================
CONTINUE SIMULATION
==================================================
*/

function continueSimulation() {

    if (!decisionLocked) {
        return;
    }


    currentScenarioIndex +=
        1;


    if (
        currentScenarioIndex >=
        congressScenarios.length
    ) {

        showFinalResults();

        return;

    }


    renderScenario();


    document
        .getElementById(
            "congressScenarioCard"
        )
        ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

}


/*
==================================================
GRADE
==================================================
*/

function calculateGrade() {

    const performanceAverage =
        (
            gameState.approval +
            gameState.bipartisan +
            gameState.committee +
            gameState.trust
        ) / 4;


    const legislativeBonus =
        Math.min(
            gameState.billsPassed * 3,
            10
        );


    const finalScore =
        performanceAverage +
        legislativeBonus;


    if (
        finalScore >=
        92
    ) {
        return "A+";
    }


    if (
        finalScore >=
        86
    ) {
        return "A";
    }


    if (
        finalScore >=
        80
    ) {
        return "A−";
    }


    if (
        finalScore >=
        74
    ) {
        return "B+";
    }


    if (
        finalScore >=
        68
    ) {
        return "B";
    }


    if (
        finalScore >=
        62
    ) {
        return "B−";
    }


    if (
        finalScore >=
        56
    ) {
        return "C+";
    }


    if (
        finalScore >=
        50
    ) {
        return "C";
    }


    return "Needs Improvement";

}


/*
==================================================
FINAL RESULTS
==================================================
*/

function showFinalResults() {

    if (gameScreen) {

        gameScreen.hidden =
            true;

    }


    if (resultsScreen) {

        resultsScreen.hidden =
            false;

    }


    const grade =
        calculateGrade();


    setText(
        "finalApproval",
        `${gameState.approval}%`
    );


    setText(
        "finalBipartisan",
        `${gameState.bipartisan}%`
    );


    setText(
        "finalCommittee",
        `${gameState.committee}%`
    );


    setText(
        "finalTrust",
        `${gameState.trust}%`
    );


    setText(
        "finalBillsIntroduced",
        gameState.billsIntroduced
    );


    setText(
        "finalBillsPassed",
        gameState.billsPassed
    );


    setText(
        "congressFinalGrade",
        grade
    );


    const finalMessage =
        document.getElementById(
            "congressFinalMessage"
        );


    if (finalMessage) {

        if (
            grade === "A+" ||
            grade === "A"
        ) {

            finalMessage.textContent =
                "Outstanding term. You maintained public trust, built strong relationships, and produced meaningful legislative results.";

        } else if (
            grade === "A−" ||
            grade === "B+"
        ) {

            finalMessage.textContent =
                "Strong term. You balanced district needs with congressional realities and built a credible record.";

        } else if (
            grade === "B" ||
            grade === "B−"
        ) {

            finalMessage.textContent =
                "Solid term. You achieved meaningful progress, although some choices limited your support or effectiveness.";

        } else if (
            grade === "C+" ||
            grade === "C"
        ) {

            finalMessage.textContent =
                "Mixed term. Stronger coalition-building and public accountability could improve your future results.";

        } else {

            finalMessage.textContent =
                "A difficult term. Review how negotiation, committee relationships, trust, and communication affected your outcomes.";

        }

    }


    saveSimulationRecord(
        grade
    );


    resultsScreen?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/*
==================================================
SAVE SIMULATION RECORD
==================================================
*/

function saveSimulationRecord(
    grade
) {

    try {

        window.localStorage.setItem(
            "civicCongressSimulationCompleted",
            "true"
        );


        window.localStorage.setItem(
            "civicCongressSimulationLastGrade",
            grade
        );


        const previousRuns =
            Number(
                window.localStorage.getItem(
                    "civicCongressSimulationRuns"
                ) || 0
            );


        window.localStorage.setItem(
            "civicCongressSimulationRuns",
            String(
                previousRuns + 1
            )
        );

    } catch (error) {

        console.warn(
            "Congress simulation record could not be saved:",
            error
        );

    }

}


/*
==================================================
RESET SIMULATION
==================================================
*/

function resetSimulation() {

    gameState.approval =
        70;


    gameState.bipartisan =
        50;


    gameState.committee =
        50;


    gameState.trust =
        70;


    gameState.billsIntroduced =
        0;


    gameState.billsPassed =
        0;


    currentScenarioIndex =
        0;


    decisionLocked =
        false;


    if (resultsScreen) {

        resultsScreen.hidden =
            true;

    }


    if (startScreen) {

        startScreen.hidden =
            true;

    }


    if (gameScreen) {

        gameScreen.hidden =
            false;

    }


    if (newsFeed) {

        newsFeed.innerHTML = `
            <div class="congress-news-item">

                <span>
                    District 14
                </span>

                <p>
                    Newly elected representative begins another term.
                </p>

            </div>
        `;

    }


    renderScenario();


    gameScreen?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/*
==================================================
START SIMULATION
==================================================
*/

function startSimulation() {

    if (startScreen) {

        startScreen.hidden =
            true;

    }


    if (gameScreen) {

        gameScreen.hidden =
            false;

    }


    if (resultsScreen) {

        resultsScreen.hidden =
            true;

    }


    renderScenario();


    gameScreen?.scrollIntoView({
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
ESCAPE HTML
==================================================
*/

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
EVENT LISTENERS
==================================================
*/

choiceContainer?.addEventListener(
    "click",
    handleChoice
);


startButton?.addEventListener(
    "click",
    startSimulation
);


continueButton?.addEventListener(
    "click",
    continueSimulation
);


restartButton?.addEventListener(
    "click",
    resetSimulation
);


/*
==================================================
INITIALIZE
==================================================
*/

async function initializeCongressPage() {

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

    updateDashboard();

}


initializeCongressPage();