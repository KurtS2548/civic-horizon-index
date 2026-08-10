const congressScenarios = [
    {
        category: "Constituent Request",
        title: "A bridge in your district has become unsafe.",
        text:
            "Residents, local officials, and emergency responders are asking for federal help. What do you do first?",
        stage: "District Outreach",
        choices: [
            {
                text: "Visit the bridge and meet local officials",
                outcomeTitle: "You listened before acting",
                outcomeText:
                    "The visit builds trust and gives you useful information, although it delays the legislative process slightly.",
                approval: 5,
                bipartisan: 0,
                committee: 2,
                trust: 8,
                billsIntroduced: 0,
                billsPassed: 0,
                headline:
                    "Representative visits unsafe bridge and meets community leaders."
            },
            {
                text: "Immediately draft a federal infrastructure bill",
                outcomeTitle: "You moved quickly",
                outcomeText:
                    "Your fast response impresses some constituents, but the proposal lacks technical details and congressional support.",
                approval: 3,
                bipartisan: -2,
                committee: -4,
                trust: 3,
                billsIntroduced: 1,
                billsPassed: 0,
                headline:
                    "New infrastructure bill introduced after bridge complaints."
            },
            {
                text: "Ask engineers to prepare a formal assessment",
                outcomeTitle: "You gathered evidence",
                outcomeText:
                    "The study creates a stronger factual record and improves your position with the committee.",
                approval: 1,
                bipartisan: 2,
                committee: 7,
                trust: 4,
                billsIntroduced: 0,
                billsPassed: 0,
                headline:
                    "Engineering review ordered for District 14 bridge."
            },
            {
                text: "Ignore the request and focus on national issues",
                outcomeTitle: "The district noticed",
                outcomeText:
                    "Residents feel overlooked, and local coverage becomes sharply critical.",
                approval: -10,
                bipartisan: 0,
                committee: 0,
                trust: -14,
                billsIntroduced: 0,
                billsPassed: 0,
                headline:
                    "Local leaders criticize representative's response to bridge concerns."
            }
        ]
    },
    {
        category: "Bill Development",
        title: "You decide to pursue infrastructure funding.",
        text:
            "Which strategy gives your proposal the strongest chance of moving forward?",
        stage: "Writing Legislation",
        choices: [
            {
                text: "Write a bill focused only on your district",
                outcomeTitle: "The proposal is locally focused",
                outcomeText:
                    "Your district appreciates the attention, but lawmakers from other areas have little reason to support it.",
                approval: 5,
                bipartisan: -4,
                committee: -2,
                trust: 4,
                billsIntroduced: 1,
                billsPassed: 0,
                headline:
                    "District-specific bridge bill introduced in the House."
            },
            {
                text: "Build a regional infrastructure coalition",
                outcomeTitle: "You expanded the coalition",
                outcomeText:
                    "Members from several states join the effort, improving bipartisan and committee support.",
                approval: 3,
                bipartisan: 9,
                committee: 7,
                trust: 3,
                billsIntroduced: 1,
                billsPassed: 0,
                headline:
                    "Bipartisan regional infrastructure coalition announces new bill."
            },
            {
                text: "Attach the funding to an unrelated bill",
                outcomeTitle: "The strategy creates controversy",
                outcomeText:
                    "The tactic may move quickly, but critics object that the funding was added without enough debate.",
                approval: -2,
                bipartisan: -5,
                committee: -3,
                trust: -4,
                billsIntroduced: 1,
                billsPassed: 0,
                headline:
                    "Bridge funding added to unrelated legislation, drawing criticism."
            },
            {
                text: "Wait for someone else to introduce a bill",
                outcomeTitle: "You avoided the risk",
                outcomeText:
                    "You preserve political capital, but constituents question whether you are leading.",
                approval: -4,
                bipartisan: 1,
                committee: 1,
                trust: -6,
                billsIntroduced: 0,
                billsPassed: 0,
                headline:
                    "District leaders ask when their representative will act."
            }
        ]
    },
    {
        category: "Committee Work",
        title: "Your bill has been referred to committee.",
        text:
            "The committee chair has not promised a hearing. What do you do?",
        stage: "Committee Review",
        choices: [
            {
                text: "Gather expert testimony and request a hearing",
                outcomeTitle: "You strengthened the record",
                outcomeText:
                    "Engineers, emergency officials, and residents provide evidence that helps the committee take the bill seriously.",
                approval: 3,
                bipartisan: 3,
                committee: 10,
                trust: 4,
                billsIntroduced: 0,
                billsPassed: 0,
                headline:
                    "Experts testify on infrastructure safety before House committee."
            },
            {
                text: "Publicly attack the committee chair",
                outcomeTitle: "The confrontation backfires",
                outcomeText:
                    "The criticism attracts attention but damages your relationship with committee leadership.",
                approval: 1,
                bipartisan: -6,
                committee: -12,
                trust: -1,
                billsIntroduced: 0,
                billsPassed: 0,
                headline:
                    "Lawmaker clashes with committee chair over stalled bill."
            },
            {
                text: "Negotiate changes requested by committee members",
                outcomeTitle: "You chose negotiation",
                outcomeText:
                    "The bill becomes less ambitious, but it gains broader support and a clearer path forward.",
                approval: 1,
                bipartisan: 8,
                committee: 8,
                trust: 1,
                billsIntroduced: 0,
                billsPassed: 0,
                headline:
                    "Infrastructure proposal revised after committee negotiations."
            },
            {
                text: "Do nothing and wait",
                outcomeTitle: "The bill stalls",
                outcomeText:
                    "Without active support, the committee takes no action and the bill loses momentum.",
                approval: -5,
                bipartisan: 0,
                committee: -6,
                trust: -5,
                billsIntroduced: 0,
                billsPassed: 0,
                headline:
                    "Infrastructure bill remains stalled in committee."
            }
        ]
    },
    {
        category: "Negotiation",
        title: "Another member offers support for your bill.",
        text:
            "They want limited rural hospital funding included in the package. How do you respond?",
        stage: "Coalition Building",
        choices: [
            {
                text: "Accept the addition without reviewing its cost",
                outcomeTitle: "You gained a vote but created risk",
                outcomeText:
                    "The coalition grows, but concerns about cost and scope make the bill harder to defend.",
                approval: -1,
                bipartisan: 5,
                committee: -3,
                trust: -2,
                billsIntroduced: 0,
                billsPassed: 0,
                headline:
                    "Infrastructure bill expands to include rural hospital funding."
            },
            {
                text: "Reject any changes to the bill",
                outcomeTitle: "You protected the original proposal",
                outcomeText:
                    "The bill stays focused, but you lose an opportunity to broaden support.",
                approval: 1,
                bipartisan: -7,
                committee: -2,
                trust: 1,
                billsIntroduced: 0,
                billsPassed: 0,
                headline:
                    "Representative rejects proposed infrastructure compromise."
            },
            {
                text: "Negotiate a limited, paid-for addition",
                outcomeTitle: "You found a workable compromise",
                outcomeText:
                    "The revised agreement attracts support while limiting the additional cost.",
                approval: 4,
                bipartisan: 10,
                committee: 5,
                trust: 4,
                billsIntroduced: 0,
                billsPassed: 0,
                headline:
                    "Bipartisan compromise expands support for infrastructure package."
            },
            {
                text: "Delay the decision until after the vote",
                outcomeTitle: "Your colleague loses confidence",
                outcomeText:
                    "The delay avoids immediate conflict, but potential supporters question whether they can rely on you.",
                approval: -2,
                bipartisan: -5,
                committee: -1,
                trust: -3,
                billsIntroduced: 0,
                billsPassed: 0,
                headline:
                    "Uncertainty grows around infrastructure coalition."
            }
        ]
    },
    {
        category: "House Vote",
        title: "Your bill reaches the House floor.",
        text:
            "Support is close, and several undecided members are asking for changes. What do you do?",
        stage: "House Floor",
        choices: [
            {
                text: "Accept a reasonable amendment to gain support",
                outcomeTitle: "The amendment secures votes",
                outcomeText:
                    "The bill changes slightly, but the coalition becomes large enough to pass it through the House.",
                approval: 3,
                bipartisan: 7,
                committee: 2,
                trust: 2,
                billsIntroduced: 0,
                billsPassed: 1,
                headline:
                    "Infrastructure bill passes House after bipartisan amendment."
            },
            {
                text: "Refuse all changes and demand a vote",
                outcomeTitle: "The bill falls short",
                outcomeText:
                    "Your supporters remain loyal, but the bill fails because several undecided members vote against it.",
                approval: -4,
                bipartisan: -8,
                committee: -3,
                trust: -3,
                billsIntroduced: 0,
                billsPassed: 0,
                headline:
                    "Infrastructure proposal fails in closely divided House vote."
            },
            {
                text: "Withdraw the bill before the vote",
                outcomeTitle: "You avoid a public defeat",
                outcomeText:
                    "The bill can be revised later, but constituents are frustrated that the effort did not reach a final vote.",
                approval: -2,
                bipartisan: 1,
                committee: 0,
                trust: -5,
                billsIntroduced: 0,
                billsPassed: 0,
                headline:
                    "Representative withdraws infrastructure bill before House vote."
            },
            {
                text: "Make promises you cannot guarantee",
                outcomeTitle: "The promises produce short-term support",
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
        title: "The Senate passes a different version of the bill.",
        text:
            "Both chambers must agree on identical language. What approach do you support?",
        stage: "Resolving Differences",
        choices: [
            {
                text: "Work with Senate negotiators on a compromise",
                outcomeTitle: "The chambers reach agreement",
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
                text: "Demand that the Senate accept the House version",
                outcomeTitle: "Negotiations break down",
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
                text: "Remove the most controversial section",
                outcomeTitle: "The narrower bill advances",
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
                text: "Abandon the bill",
                outcomeTitle: "The effort ends",
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
        title: "The bill reaches the president.",
        text:
            "The administration wants one final change before signing. What do you do?",
        stage: "Executive Review",
        choices: [
            {
                text: "Negotiate a limited final change",
                outcomeTitle: "The bill is signed",
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
                text: "Refuse and risk a veto",
                outcomeTitle: "The president vetoes the bill",
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
                text: "Publicly accuse the president of bad faith",
                outcomeTitle: "The conflict dominates the news",
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
                text: "Withdraw support for your own bill",
                outcomeTitle: "The coalition collapses",
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
        title: "Your term is nearing its end.",
        text:
            "Constituents want to know what you accomplished. How do you close your term?",
        stage: "End of Term",
        choices: [
            {
                text: "Hold a public town hall and answer questions",
                outcomeTitle: "You faced the public directly",
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
                text: "Publish a detailed report with results and setbacks",
                outcomeTitle: "You chose transparency",
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
                text: "Highlight only successes and avoid difficult questions",
                outcomeTitle: "The message feels incomplete",
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
                text: "Skip public events and focus on fundraising",
                outcomeTitle: "Constituents feel ignored",
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


const startScreen =
    document.getElementById("congressStartScreen");

const gameScreen =
    document.getElementById("congressGameScreen");

const resultsScreen =
    document.getElementById("congressResultsScreen");

const startButton =
    document.getElementById("congressStartButton");

const restartButton =
    document.getElementById("congressRestartButton");

const continueButton =
    document.getElementById("congressContinueButton");

const scenarioCategory =
    document.getElementById("congressScenarioCategory");

const scenarioProgress =
    document.getElementById("congressScenarioProgress");

const scenarioTitle =
    document.getElementById("congressScenarioTitle");

const scenarioText =
    document.getElementById("congressScenarioText");

const choiceContainer =
    document.getElementById("congressChoiceContainer");

const outcome =
    document.getElementById("congressOutcome");

const outcomeIcon =
    document.getElementById("congressOutcomeIcon");

const outcomeTitle =
    document.getElementById("congressOutcomeTitle");

const outcomeText =
    document.getElementById("congressOutcomeText");

const newsFeed =
    document.getElementById("congressNewsFeed");


function clamp(value) {

    return Math.max(
        0,
        Math.min(100, value)
    );

}


function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {
        element.textContent = value;
    }

}


function updateMetric(
    valueID,
    barID,
    value
) {

    setText(
        valueID,
        `${value}%`
    );


    const bar =
        document.getElementById(barID);


    if (bar) {
        bar.style.width = `${value}%`;
    }

}


function updateDashboard() {

    gameState.approval =
        clamp(gameState.approval);

    gameState.bipartisan =
        clamp(gameState.bipartisan);

    gameState.committee =
        clamp(gameState.committee);

    gameState.trust =
        clamp(gameState.trust);


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


function renderScenario() {

    const scenario =
        congressScenarios[
            currentScenarioIndex
        ];


    if (!scenario) {
        showFinalResults();
        return;
    }


    decisionLocked = false;

    outcome.hidden = true;

    continueButton.hidden = true;


    scenarioCategory.textContent =
        scenario.category;

    scenarioProgress.textContent =
        `Decision ${currentScenarioIndex + 1} of ${congressScenarios.length}`;

    scenarioTitle.textContent =
        scenario.title;

    scenarioText.textContent =
        scenario.text;


    setText(
        "congressTurnLabel",
        `Week ${1 + currentScenarioIndex * 6}`
    );

    setText(
        "congressCurrentStage",
        scenario.stage
    );


    choiceContainer.innerHTML =
        scenario.choices
            .map((choice, index) => {

                return `

                    <button
                        type="button"
                        class="congress-choice-button"
                        data-choice-index="${index}"
                    >

                        <span>
                            ${String.fromCharCode(
                                65 + index
                            )}
                        </span>

                        <strong>
                            ${choice.text}
                        </strong>

                    </button>

                `;

            })
            .join("");


    const choiceButtons =
        choiceContainer.querySelectorAll(
            ".congress-choice-button"
        );


    choiceButtons.forEach(button => {

        button.addEventListener(
            "click",
            handleChoice
        );

    });


    updateDashboard();

}


function handleChoice(event) {

    if (decisionLocked) {
        return;
    }


    decisionLocked = true;


    const selectedButton =
        event.currentTarget;

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
        choiceContainer.querySelectorAll(
            ".congress-choice-button"
        );


    choiceButtons.forEach(button => {
        button.disabled = true;
    });


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


    if (totalChange >= 10) {

        outcomeIcon.textContent = "✓";

    } else if (totalChange <= -10) {

        outcomeIcon.textContent = "!";

    } else {

        outcomeIcon.textContent = "•";

    }


    outcomeTitle.textContent =
        choice.outcomeTitle;

    outcomeText.textContent =
        choice.outcomeText;

    outcome.hidden = false;


    continueButton.textContent =
        currentScenarioIndex ===
        congressScenarios.length - 1
            ? "View Report Card"
            : "Continue";

    continueButton.hidden = false;

}


function addHeadline(
    category,
    headline
) {

    const newsItem =
        document.createElement("div");


    newsItem.className =
        "congress-news-item";


    newsItem.innerHTML = `

        <span>
            ${category}
        </span>

        <p>
            ${headline}
        </p>

    `;


    newsFeed.prepend(newsItem);


    const newsItems =
        newsFeed.querySelectorAll(
            ".congress-news-item"
        );


    if (newsItems.length > 5) {

        newsItems[
            newsItems.length - 1
        ].remove();

    }

}


function continueSimulation() {

    if (!decisionLocked) {
        return;
    }


    currentScenarioIndex += 1;


    if (
        currentScenarioIndex >=
        congressScenarios.length
    ) {

        showFinalResults();

        return;

    }


    renderScenario();


    const scenarioCard =
        document.getElementById(
            "congressScenarioCard"
        );


    scenarioCard?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


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


    if (finalScore >= 92) {
        return "A+";
    }

    if (finalScore >= 86) {
        return "A";
    }

    if (finalScore >= 80) {
        return "A−";
    }

    if (finalScore >= 74) {
        return "B+";
    }

    if (finalScore >= 68) {
        return "B";
    }

    if (finalScore >= 62) {
        return "B−";
    }

    if (finalScore >= 56) {
        return "C+";
    }

    if (finalScore >= 50) {
        return "C";
    }

    return "Needs Improvement";

}


function showFinalResults() {

    gameScreen.hidden = true;

    resultsScreen.hidden = false;


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


    localStorage.setItem(
        "civicCongressSimulationCompleted",
        "true"
    );

    localStorage.setItem(
        "civicCongressSimulationLastGrade",
        grade
    );


    const previousRuns =
        Number(
            localStorage.getItem(
                "civicCongressSimulationRuns"
            ) || 0
        );


    localStorage.setItem(
        "civicCongressSimulationRuns",
        String(previousRuns + 1)
    );


    resultsScreen.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


function resetSimulation() {

    gameState.approval = 70;
    gameState.bipartisan = 50;
    gameState.committee = 50;
    gameState.trust = 70;
    gameState.billsIntroduced = 0;
    gameState.billsPassed = 0;


    currentScenarioIndex = 0;

    decisionLocked = false;


    resultsScreen.hidden = true;

    startScreen.hidden = true;

    gameScreen.hidden = false;


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


    renderScenario();


    gameScreen.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


function startSimulation() {

    startScreen.hidden = true;

    gameScreen.hidden = false;

    resultsScreen.hidden = true;


    renderScenario();


    gameScreen.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


if (startButton) {

    startButton.addEventListener(
        "click",
        startSimulation
    );

}


if (continueButton) {

    continueButton.addEventListener(
        "click",
        continueSimulation
    );

}


if (restartButton) {

    restartButton.addEventListener(
        "click",
        resetSimulation
    );

}


updateDashboard();