/*
==================================================
CIVIC HORIZON INDEX V2
PRESIDENT SIMULATION
==================================================
*/


const presidentScenarios = [

    {
        category: "Legislation",

        title:
            "Congress sends you a major infrastructure bill.",

        text:
            "The bill contains most of your priorities but also includes spending you oppose. What do you do?",

        stage:
            "Legislative Review",

        choices: [

            {
                text:
                    "Veto the bill immediately and refuse further talks",

                outcomeTitle:
                    "Negotiations harden",

                outcomeText:
                    "You protect your position, but relations with Congress deteriorate and the legislation stalls.",

                approval: -2,
                congress: -9,
                trust: -2,
                stability: -2,
                billsSigned: 0,
                majorActions: 1,

                headline:
                    "President vetoes infrastructure package as congressional tensions rise."
            },

            {
                text:
                    "Sign the bill while publicly explaining the compromises",

                outcomeTitle:
                    "The bill becomes law",

                outcomeText:
                    "You secure a major legislative accomplishment while acknowledging the parts you would have preferred to change.",

                approval: 5,
                congress: 6,
                trust: 5,
                stability: 4,
                billsSigned: 1,
                majorActions: 1,

                headline:
                    "President signs bipartisan infrastructure legislation."
            },

            {
                text:
                    "Demand that Congress completely rewrite the bill",

                outcomeTitle:
                    "The process slows",

                outcomeText:
                    "Some changes may be possible, but the all-or-nothing approach risks losing the coalition behind the bill.",

                approval: -1,
                congress: -5,
                trust: -1,
                stability: -2,
                billsSigned: 0,
                majorActions: 0,

                headline:
                    "White House seeks major rewrite of infrastructure agreement."
            },

            {
                text:
                    "Ignore the bill until Congress gives up",

                outcomeTitle:
                    "Leadership questions grow",

                outcomeText:
                    "The lack of engagement creates uncertainty and frustrates lawmakers from both parties.",

                approval: -7,
                congress: -7,
                trust: -8,
                stability: -4,
                billsSigned: 0,
                majorActions: 0,

                headline:
                    "Lawmakers criticize White House silence on infrastructure bill."
            }

        ]
    },


    {
        category: "Appointments",

        title:
            "A vacancy opens on the Supreme Court.",

        text:
            "You must nominate a justice who can survive Senate confirmation. How do you proceed?",

        stage:
            "Judicial Appointment",

        choices: [

            {
                text:
                    "Choose a close political ally with limited legal experience",

                outcomeTitle:
                    "The nomination faces immediate criticism",

                outcomeText:
                    "Supporters rally around the choice, but questions about qualifications damage institutional confidence.",

                approval: 0,
                congress: -5,
                trust: -10,
                stability: -3,
                billsSigned: 0,
                majorActions: 1,

                headline:
                    "Supreme Court nomination draws questions over qualifications."
            },

            {
                text:
                    "Refuse to nominate anyone for the remainder of your term",

                outcomeTitle:
                    "The vacancy remains open",

                outcomeText:
                    "You avoid a confirmation fight, but the prolonged vacancy creates institutional uncertainty.",

                approval: -4,
                congress: -3,
                trust: -6,
                stability: -5,
                billsSigned: 0,
                majorActions: 0,

                headline:
                    "White House leaves Supreme Court vacancy unresolved."
            },

            {
                text:
                    "Nominate a qualified candidate and consult senators before announcing",

                outcomeTitle:
                    "The nomination starts with broad credibility",

                outcomeText:
                    "Consultation does not guarantee confirmation, but it improves communication and reduces unnecessary surprises.",

                approval: 3,
                congress: 7,
                trust: 7,
                stability: 3,
                billsSigned: 0,
                majorActions: 1,

                headline:
                    "White House begins Senate consultations on Supreme Court nominee."
            },

            {
                text:
                    "Demand that the Senate promise confirmation before you name anyone",

                outcomeTitle:
                    "The Senate resists the demand",

                outcomeText:
                    "The president nominates, but the Senate retains its constitutional role in confirmation.",

                approval: -2,
                congress: -8,
                trust: -5,
                stability: -2,
                billsSigned: 0,
                majorActions: 0,

                headline:
                    "Confirmation dispute escalates before nominee is announced."
            }

        ]
    },


    {
        category: "Emergency Response",

        title:
            "A major hurricane strikes several states.",

        text:
            "Governors request federal assistance while local responders are overwhelmed. What is your approach?",

        stage:
            "National Emergency",

        choices: [

            {
                text:
                    "Focus first on assigning blame for preparedness failures",

                outcomeTitle:
                    "The response becomes politicized",

                outcomeText:
                    "Accountability may matter later, but the immediate public need is coordination and emergency assistance.",

                approval: -6,
                congress: -2,
                trust: -7,
                stability: -9,
                billsSigned: 0,
                majorActions: 1,

                headline:
                    "Political conflict overshadows early hurricane response."
            },

            {
                text:
                    "Coordinate federal agencies with governors and local officials",

                outcomeTitle:
                    "The response becomes more organized",

                outcomeText:
                    "Federal, state, and local governments combine resources while maintaining their separate responsibilities.",

                approval: 7,
                congress: 3,
                trust: 8,
                stability: 10,
                billsSigned: 0,
                majorActions: 1,

                headline:
                    "Federal and state officials coordinate major hurricane response."
            },

            {
                text:
                    "Tell states they must handle the emergency entirely alone",

                outcomeTitle:
                    "Resources become strained",

                outcomeText:
                    "States lead many emergency operations, but major disasters can require federal support.",

                approval: -8,
                congress: -4,
                trust: -8,
                stability: -11,
                billsSigned: 0,
                majorActions: 0,

                headline:
                    "Governors criticize limited federal disaster assistance."
            },

            {
                text:
                    "Take direct control of every local emergency department",

                outcomeTitle:
                    "Authority becomes confused",

                outcomeText:
                    "The federal government can provide major assistance, but local and state governments retain important emergency responsibilities.",

                approval: -3,
                congress: -3,
                trust: -5,
                stability: -5,
                billsSigned: 0,
                majorActions: 1,

                headline:
                    "Questions arise over federal role in local disaster operations."
            }

        ]
    },


    {
        category: "Executive Authority",

        title:
            "Congress has not passed one of your major policy proposals.",

        text:
            "Advisers suggest using executive authority instead. What do you do?",

        stage:
            "Executive Action",

        choices: [

            {
                text:
                    "Declare that executive orders can replace Congress on any issue",

                outcomeTitle:
                    "Constitutional concerns grow",

                outcomeText:
                    "Executive orders cannot simply replace Congress's lawmaking role.",

                approval: -3,
                congress: -10,
                trust: -12,
                stability: -7,
                billsSigned: 0,
                majorActions: 1,

                headline:
                    "Legal scholars question sweeping presidential claim of authority."
            },

            {
                text:
                    "Refuse to use any executive authority under any circumstances",

                outcomeTitle:
                    "The administration becomes less effective",

                outcomeText:
                    "Presidents do have lawful executive powers and responsibilities that do not require new legislation each time.",

                approval: -4,
                congress: 1,
                trust: -2,
                stability: -3,
                billsSigned: 0,
                majorActions: 0,

                headline:
                    "White House declines executive action despite existing authority."
            },

            {
                text:
                    "Order federal agencies to ignore laws you dislike",

                outcomeTitle:
                    "Institutional conflict intensifies",

                outcomeText:
                    "The executive branch is responsible for faithfully executing federal law, not disregarding statutes at will.",

                approval: -5,
                congress: -10,
                trust: -14,
                stability: -9,
                billsSigned: 0,
                majorActions: 1,

                headline:
                    "Administration faces legal challenge over refusal to enforce federal law."
            },

            {
                text:
                    "Use an executive order only where existing law gives the executive branch authority",

                outcomeTitle:
                    "You act within defined executive power",

                outcomeText:
                    "The action may still face political or legal challenges, but it is tied to existing statutory and constitutional authority.",

                approval: 3,
                congress: -1,
                trust: 7,
                stability: 4,
                billsSigned: 0,
                majorActions: 1,

                headline:
                    "President issues targeted executive order under existing authority."
            }

        ]
    },


    {
        category: "Foreign Policy",

        title:
            "A close ally faces a sudden international crisis.",

        text:
            "Military, diplomatic, and economic options are all being discussed. What do you do first?",

        stage:
            "Foreign Affairs",

        choices: [

            {
                text:
                    "Review intelligence, consult advisers, and coordinate with allies",

                outcomeTitle:
                    "The administration develops a coordinated response",

                outcomeText:
                    "Careful consultation helps clarify objectives, risks, legal authorities, and allied commitments.",

                approval: 5,
                congress: 2,
                trust: 7,
                stability: 8,
                billsSigned: 0,
                majorActions: 1,

                headline:
                    "White House coordinates allied response to international crisis."
            },

            {
                text:
                    "Announce military action before consulting national security officials",

                outcomeTitle:
                    "Uncertainty increases",

                outcomeText:
                    "Rapid action may appear decisive, but major security decisions benefit from reliable intelligence and legal review.",

                approval: -3,
                congress: -5,
                trust: -6,
                stability: -8,
                billsSigned: 0,
                majorActions: 1,

                headline:
                    "Questions grow over rapid White House military announcement."
            },

            {
                text:
                    "Ignore the crisis because it is outside the United States",

                outcomeTitle:
                    "Allied confidence falls",

                outcomeText:
                    "Not every crisis requires U.S. intervention, but refusing even to assess its implications can damage relationships.",

                approval: -4,
                congress: -1,
                trust: -4,
                stability: -6,
                billsSigned: 0,
                majorActions: 0,

                headline:
                    "Allies seek clarity after limited U.S. response to crisis."
            },

            {
                text:
                    "Promise every requested action without considering consequences",

                outcomeTitle:
                    "Commitments expand quickly",

                outcomeText:
                    "The broad promises reassure some allies but create uncertainty over resources and long-term obligations.",

                approval: 0,
                congress: -4,
                trust: -3,
                stability: -5,
                billsSigned: 0,
                majorActions: 1,

                headline:
                    "Administration faces questions over sweeping international commitments."
            }

        ]
    },


    {
        category: "Budget Negotiation",

        title:
            "Congress and the White House are approaching a major budget deadline.",

        text:
            "Both parties disagree over spending priorities. How do you proceed?",

        stage:
            "Budget Negotiation",

        choices: [

            {
                text:
                    "Refuse to meet with anyone who disagrees with you",

                outcomeTitle:
                    "The deadline becomes more dangerous",

                outcomeText:
                    "The lack of communication makes a funding breakdown more likely.",

                approval: -5,
                congress: -10,
                trust: -6,
                stability: -9,
                billsSigned: 0,
                majorActions: 0,

                headline:
                    "Budget negotiations stall as deadline approaches."
            },

            {
                text:
                    "Meet with congressional leaders and negotiate a workable compromise",

                outcomeTitle:
                    "A budget agreement becomes possible",

                outcomeText:
                    "Neither side gets everything it wants, but negotiations reduce the risk of disruption.",

                approval: 4,
                congress: 9,
                trust: 6,
                stability: 8,
                billsSigned: 1,
                majorActions: 1,

                headline:
                    "White House and congressional leaders reach budget framework."
            },

            {
                text:
                    "Promise every side all of its spending priorities",

                outcomeTitle:
                    "The numbers stop adding up",

                outcomeText:
                    "The promises temporarily reduce conflict but make a credible final agreement harder to reach.",

                approval: 1,
                congress: 0,
                trust: -8,
                stability: -4,
                billsSigned: 0,
                majorActions: 0,

                headline:
                    "Budget talks face questions over competing White House commitments."
            },

            {
                text:
                    "Claim that the president can set the federal budget alone",

                outcomeTitle:
                    "Congress rejects the claim",

                outcomeText:
                    "Federal spending requires legislation and appropriations involving Congress.",

                approval: -4,
                congress: -12,
                trust: -10,
                stability: -6,
                billsSigned: 0,
                majorActions: 1,

                headline:
                    "Constitutional dispute erupts during federal budget negotiations."
            }

        ]
    },


    {
        category: "Congressional Oversight",

        title:
            "A congressional committee requests records from an executive agency.",

        text:
            "Your advisers disagree over how cooperative the administration should be. What do you do?",

        stage:
            "Oversight",

        choices: [

            {
                text:
                    "Refuse every request and declare Congress has no oversight authority",

                outcomeTitle:
                    "The conflict escalates",

                outcomeText:
                    "Congress has significant oversight responsibilities, though legitimate executive confidentiality interests can also arise.",

                approval: -4,
                congress: -12,
                trust: -10,
                stability: -6,
                billsSigned: 0,
                majorActions: 1,

                headline:
                    "Oversight dispute deepens between Congress and White House."
            },

            {
                text:
                    "Release every sensitive government record publicly without review",

                outcomeTitle:
                    "Transparency creates new risks",

                outcomeText:
                    "Oversight cooperation matters, but lawful confidentiality and national-security concerns may require careful handling.",

                approval: -1,
                congress: 2,
                trust: -4,
                stability: -6,
                billsSigned: 0,
                majorActions: 1,

                headline:
                    "Sensitive records release raises new security and privacy concerns."
            },

            {
                text:
                    "Provide responsive information while reviewing legitimate confidentiality concerns",

                outcomeTitle:
                    "Oversight proceeds with negotiation",

                outcomeText:
                    "The administration protects appropriate interests while recognizing Congress's oversight role.",

                approval: 3,
                congress: 7,
                trust: 9,
                stability: 4,
                billsSigned: 0,
                majorActions: 1,

                headline:
                    "White House and congressional committee negotiate oversight request."
            },

            {
                text:
                    "Destroy the requested records",

                outcomeTitle:
                    "A serious institutional crisis develops",

                outcomeText:
                    "Destroying records to frustrate lawful oversight can create major legal and public-trust consequences.",

                approval: -12,
                congress: -15,
                trust: -18,
                stability: -12,
                billsSigned: 0,
                majorActions: 1,

                headline:
                    "Administration faces major controversy over missing federal records."
            }

        ]
    },


    {
        category: "Public Accountability",

        title:
            "Your term is nearing its end.",

        text:
            "The public wants an accounting of your administration's successes, failures, and major decisions. How do you respond?",

        stage:
            "End of Term",

        choices: [

            {
                text:
                    "Avoid questions and communicate only through campaign advertisements",

                outcomeTitle:
                    "Public trust weakens",

                outcomeText:
                    "The strategy may reinforce supporters, but it provides little accountability for the administration's record.",

                approval: -5,
                congress: -1,
                trust: -10,
                stability: -3,
                billsSigned: 0,
                majorActions: 0,

                headline:
                    "Critics question limited presidential access at end of term."
            },

            {
                text:
                    "Take credit for every success and blame others for every failure",

                outcomeTitle:
                    "The message energizes supporters but divides the public",

                outcomeText:
                    "The approach avoids admitting mistakes, but it can undermine credibility.",

                approval: 0,
                congress: -3,
                trust: -7,
                stability: -4,
                billsSigned: 0,
                majorActions: 0,

                headline:
                    "End-of-term presidential address draws criticism over accountability."
            },

            {
                text:
                    "Hold a public address explaining achievements, setbacks, and remaining challenges",

                outcomeTitle:
                    "The administration closes with transparency",

                outcomeText:
                    "Acknowledging both accomplishments and limitations strengthens the credibility of the final public record.",

                approval: 5,
                congress: 2,
                trust: 10,
                stability: 5,
                billsSigned: 0,
                majorActions: 0,

                headline:
                    "President delivers detailed end-of-term public report."
            },

            {
                text:
                    "Refuse to discuss the administration's record",

                outcomeTitle:
                    "Questions remain unanswered",

                outcomeText:
                    "The lack of explanation leaves the public and other institutions with less clarity about major decisions.",

                approval: -7,
                congress: -2,
                trust: -11,
                stability: -4,
                billsSigned: 0,
                majorActions: 0,

                headline:
                    "White House declines end-of-term review of presidential record."
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

    approval: 62,
    congress: 55,
    trust: 68,
    stability: 70,
    billsSigned: 0,
    majorActions: 0

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
        "presidentStartScreen"
    );


const gameScreen =
    document.getElementById(
        "presidentGameScreen"
    );


const resultsScreen =
    document.getElementById(
        "presidentResultsScreen"
    );


const startButton =
    document.getElementById(
        "presidentStartButton"
    );


const restartButton =
    document.getElementById(
        "presidentRestartButton"
    );


const continueButton =
    document.getElementById(
        "presidentContinueButton"
    );


const scenarioCategory =
    document.getElementById(
        "presidentScenarioCategory"
    );


const scenarioProgress =
    document.getElementById(
        "presidentScenarioProgress"
    );


const scenarioTitle =
    document.getElementById(
        "presidentScenarioTitle"
    );


const scenarioText =
    document.getElementById(
        "presidentScenarioText"
    );


const choiceContainer =
    document.getElementById(
        "presidentChoiceContainer"
    );


const outcome =
    document.getElementById(
        "presidentOutcome"
    );


const outcomeIcon =
    document.getElementById(
        "presidentOutcomeIcon"
    );


const outcomeTitle =
    document.getElementById(
        "presidentOutcomeTitle"
    );


const outcomeText =
    document.getElementById(
        "presidentOutcomeText"
    );


const newsFeed =
    document.getElementById(
        "presidentNewsFeed"
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


    gameState.congress =
        clamp(
            gameState.congress
        );


    gameState.trust =
        clamp(
            gameState.trust
        );


    gameState.stability =
        clamp(
            gameState.stability
        );


    setText(
        "presidentApproval",
        `${gameState.approval}%`
    );


    setText(
        "presidentCongress",
        `${gameState.congress}%`
    );


    setText(
        "presidentTrust",
        `${gameState.trust}%`
    );


    setText(
        "presidentStability",
        `${gameState.stability}%`
    );


    setText(
        "presidentBillsSigned",
        gameState.billsSigned
    );


    setText(
        "presidentMajorActions",
        gameState.majorActions
    );


    setText(
        "executiveApproval",
        `${gameState.approval}%`
    );


    setText(
        "executiveCongress",
        `${gameState.congress}%`
    );


    setText(
        "executiveTrust",
        `${gameState.trust}%`
    );


    setText(
        "executiveStability",
        `${gameState.stability}%`
    );


    setText(
        "sidePresidentBillsSigned",
        gameState.billsSigned
    );


    setText(
        "sidePresidentMajorActions",
        gameState.majorActions
    );


    updateMetric(
        "sidePresidentApproval",
        "sidePresidentApprovalBar",
        gameState.approval
    );


    updateMetric(
        "sidePresidentCongress",
        "sidePresidentCongressBar",
        gameState.congress
    );


    updateMetric(
        "sidePresidentTrust",
        "sidePresidentTrustBar",
        gameState.trust
    );


    updateMetric(
        "sidePresidentStability",
        "sidePresidentStabilityBar",
        gameState.stability
    );


    const progress =
        Math.round(
            (
                currentScenarioIndex /
                presidentScenarios.length
            ) * 100
        );


    setText(
        "presidentTermProgress",
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
        presidentScenarios[
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
            `Decision ${currentScenarioIndex + 1} of ${presidentScenarios.length}`;

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
        "presidentTurnLabel",
        `Month ${1 + currentScenarioIndex * 6}`
    );


    setText(
        "presidentCurrentStage",
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
                                class="president-choice-button"
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
            ".president-choice-button"
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
        presidentScenarios[
            currentScenarioIndex
        ];


    const choice =
        scenario.choices[
            choiceIndex
        ];


    choiceContainer
        ?.querySelectorAll(
            ".president-choice-button"
        )
        .forEach(
            button => {

                button.disabled =
                    true;

            }
        );


    selectedButton.classList.add(
        "president-choice-selected"
    );


    gameState.approval +=
        choice.approval;


    gameState.congress +=
        choice.congress;


    gameState.trust +=
        choice.trust;


    gameState.stability +=
        choice.stability;


    gameState.billsSigned +=
        choice.billsSigned;


    gameState.majorActions +=
        choice.majorActions;


    updateDashboard();


    addHeadline(
        scenario.category,
        choice.headline
    );


    const totalChange =
        choice.approval +
        choice.congress +
        choice.trust +
        choice.stability;


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
            presidentScenarios.length - 1
                ? "View Report Card"
                : "Continue";


        continueButton.hidden =
            false;

    }

}


/*
==================================================
NEWS
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
        "president-news-item";


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
            ".president-news-item"
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
CONTINUE
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
        presidentScenarios.length
    ) {

        showFinalResults();

        return;

    }


    renderScenario();


    document
        .getElementById(
            "presidentScenarioCard"
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
            gameState.congress +
            gameState.trust +
            gameState.stability
        ) / 4;


    const accomplishmentBonus =
        Math.min(
            (
                gameState.billsSigned * 3
            ) +
            gameState.majorActions,
            10
        );


    const finalScore =
        performanceAverage +
        accomplishmentBonus;


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


/*
==================================================
RESULTS
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
        "finalPresidentApproval",
        `${gameState.approval}%`
    );


    setText(
        "finalPresidentCongress",
        `${gameState.congress}%`
    );


    setText(
        "finalPresidentTrust",
        `${gameState.trust}%`
    );


    setText(
        "finalPresidentStability",
        `${gameState.stability}%`
    );


    setText(
        "finalPresidentBillsSigned",
        gameState.billsSigned
    );


    setText(
        "finalPresidentMajorActions",
        gameState.majorActions
    );


    setText(
        "presidentFinalGrade",
        grade
    );


    const finalMessage =
        document.getElementById(
            "presidentFinalMessage"
        );


    if (finalMessage) {

        if (
            grade === "A+" ||
            grade === "A"
        ) {

            finalMessage.textContent =
                "Outstanding term. You combined effective leadership with strong institutional trust, stability, and cooperation.";

        } else if (
            grade === "A−" ||
            grade === "B+"
        ) {

            finalMessage.textContent =
                "Strong term. You handled major presidential responsibilities while maintaining credible relationships and public confidence.";

        } else if (
            grade === "B" ||
            grade === "B−"
        ) {

            finalMessage.textContent =
                "Solid term. You achieved meaningful results, though some decisions reduced cooperation or trust.";

        } else if (
            grade === "C+" ||
            grade === "C"
        ) {

            finalMessage.textContent =
                "Mixed term. Stronger respect for institutional relationships, transparency, and careful decision-making would improve your results.";

        } else {

            finalMessage.textContent =
                "A difficult term. Review how constitutional limits, congressional relationships, public trust, and national stability shaped your presidency.";

        }

    }


    saveSimulationRecord(
        grade
    );


    resultsScreen
        ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

}


/*
==================================================
SAVE RECORD
==================================================
*/

function saveSimulationRecord(
    grade
) {

    try {

        window.localStorage.setItem(
            "civicPresidentSimulationCompleted",
            "true"
        );


        window.localStorage.setItem(
            "civicPresidentSimulationLastGrade",
            grade
        );


        const previousRuns =
            Number(
                window.localStorage.getItem(
                    "civicPresidentSimulationRuns"
                ) || 0
            );


        window.localStorage.setItem(
            "civicPresidentSimulationRuns",
            String(
                previousRuns + 1
            )
        );

    } catch (error) {

        console.warn(
            "President simulation record could not be saved:",
            error
        );

    }

}


/*
==================================================
RESET
==================================================
*/

function resetSimulation() {

    gameState.approval =
        62;


    gameState.congress =
        55;


    gameState.trust =
        68;


    gameState.stability =
        70;


    gameState.billsSigned =
        0;


    gameState.majorActions =
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
            <div class="president-news-item">

                <span>
                    White House
                </span>

                <p>
                    President begins another term.
                </p>

            </div>
        `;

    }


    renderScenario();


    gameScreen
        ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

}


/*
==================================================
START
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


    gameScreen
        ?.scrollIntoView({
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
DROPDOWNS
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
EVENTS
==================================================
*/

choiceContainer
    ?.addEventListener(
        "click",
        handleChoice
    );


startButton
    ?.addEventListener(
        "click",
        startSimulation
    );


continueButton
    ?.addEventListener(
        "click",
        continueSimulation
    );


restartButton
    ?.addEventListener(
        "click",
        resetSimulation
    );


/*
==================================================
INITIALIZE PAGE
==================================================
*/

async function initializePresidentPage() {

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


initializePresidentPage();