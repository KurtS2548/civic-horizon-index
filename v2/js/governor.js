/*
==================================================
CIVIC HORIZON INDEX V2
GOVERNOR SIMULATION
BRANCHING STATE LEADERSHIP ENGINE
==================================================
*/


/*
==================================================
FOUNDATION SCENARIOS
==================================================
*/

const governorScenarios = [

    /*
    ==================================================
    1. STATE BUDGET
    ==================================================
    */

    {
        id:
            "stateBudget",

        category:
            "State Budget",

        title:
            "Your administration inherits a projected budget shortfall.",

        text:
            "The legislature wants a balanced budget, agencies are requesting more funding, and residents oppose major service cuts. How do you begin?",

        stage:
            "Budget Planning",

        choices: [

            {
                text:
                    "Order across-the-board cuts without reviewing which programs are most essential",

                outcomeTitle:
                    "The budget closes quickly",

                outcomeText:
                    "The shortfall shrinks, but important services and local programs are disrupted because the reductions were not prioritized.",

                approval:
                    -4,

                legislature:
                    -2,

                trust:
                    -5,

                stability:
                    -6,

                billsSigned:
                    0,

                majorActions:
                    1,

                fiscalDiscipline:
                    1,

                legislativeSkill:
                    -1,

                crisisLeadership:
                    0,

                localPartnership:
                    -2,

                accountability:
                    -1,

                budgetResult:
                    "bluntCuts",

                headline:
                    "Governor orders broad state spending reductions to close budget gap."
            },

            {
                text:
                    "Review spending, identify priorities, and negotiate a balanced package with legislative leaders",

                outcomeTitle:
                    "A workable budget strategy develops",

                outcomeText:
                    "The process takes longer, but lawmakers gain confidence that the administration is balancing fiscal limits with service needs.",

                approval:
                    4,

                legislature:
                    8,

                trust:
                    7,

                stability:
                    6,

                billsSigned:
                    1,

                majorActions:
                    1,

                fiscalDiscipline:
                    4,

                legislativeSkill:
                    4,

                crisisLeadership:
                    0,

                localPartnership:
                    1,

                accountability:
                    2,

                budgetResult:
                    "balanced",

                headline:
                    "Governor and lawmakers begin bipartisan budget negotiations."
            },

            {
                text:
                    "Promise every agency the funding it requested and deal with the deficit later",

                outcomeTitle:
                    "The immediate conflict fades",

                outcomeText:
                    "Agencies are pleased, but the state’s fiscal position worsens and lawmakers question whether the plan is sustainable.",

                approval:
                    2,

                legislature:
                    -4,

                trust:
                    -6,

                stability:
                    -4,

                billsSigned:
                    0,

                majorActions:
                    0,

                fiscalDiscipline:
                    -4,

                legislativeSkill:
                    -1,

                crisisLeadership:
                    0,

                localPartnership:
                    1,

                accountability:
                    -2,

                budgetResult:
                    "overspending",

                headline:
                    "State budget plan draws criticism over unresolved deficit."
            },

            {
                text:
                    "Refuse to release a budget proposal until the legislature acts first",

                outcomeTitle:
                    "The budget process stalls",

                outcomeText:
                    "The legislature retains its role, but the governor is expected to provide executive leadership and a workable fiscal proposal.",

                approval:
                    -5,

                legislature:
                    -5,

                trust:
                    -5,

                stability:
                    -5,

                billsSigned:
                    0,

                majorActions:
                    0,

                fiscalDiscipline:
                    0,

                legislativeSkill:
                    -3,

                crisisLeadership:
                    -1,

                localPartnership:
                    0,

                accountability:
                    -2,

                budgetResult:
                    "stalled",

                headline:
                    "State budget negotiations stall amid disagreement over executive leadership."
            }

        ]

    },


    /*
    ==================================================
    2. EDUCATION FUNDING
    ==================================================
    */

    {
        id:
            "educationFunding",

        category:
            "Education",

        title:
            "School districts across the state report major funding disparities.",

        text:
            "Urban, suburban, and rural districts all argue that the current system is unfair. What approach do you take?",

        stage:
            "Education Policy",

        choices: [

            {
                text:
                    "Send the same dollar increase to every district regardless of need or existing resources",

                outcomeTitle:
                    "The formula is simple",

                outcomeText:
                    "Every district receives more money, but large disparities remain because communities began from very different positions.",

                approval:
                    1,

                legislature:
                    1,

                trust:
                    -2,

                stability:
                    0,

                billsSigned:
                    1,

                majorActions:
                    1,

                fiscalDiscipline:
                    -1,

                legislativeSkill:
                    1,

                crisisLeadership:
                    0,

                localPartnership:
                    1,

                accountability:
                    0,

                educationResult:
                    "equalIncrease",

                headline:
                    "Governor proposes uniform statewide increase in school funding."
            },

            {
                text:
                    "Use a needs-based formula while giving districts predictable funding rules",

                outcomeTitle:
                    "The formula targets disparities",

                outcomeText:
                    "The plan is more complex, but it directs greater support to districts with higher needs while giving local leaders clearer expectations.",

                approval:
                    5,

                legislature:
                    5,

                trust:
                    7,

                stability:
                    4,

                billsSigned:
                    1,

                majorActions:
                    1,

                fiscalDiscipline:
                    2,

                legislativeSkill:
                    3,

                crisisLeadership:
                    0,

                localPartnership:
                    4,

                accountability:
                    2,

                educationResult:
                    "needsBased",

                headline:
                    "Governor proposes needs-based school funding formula."
            },

            {
                text:
                    "Take complete control of every local school budget from the governor's office",

                outcomeTitle:
                    "Local authority becomes strained",

                outcomeText:
                    "The administration gains more control, but local officials and lawmakers object to the loss of local decision-making.",

                approval:
                    -3,

                legislature:
                    -6,

                trust:
                    -5,

                stability:
                    -3,

                billsSigned:
                    0,

                majorActions:
                    1,

                fiscalDiscipline:
                    0,

                legislativeSkill:
                    -2,

                crisisLeadership:
                    0,

                localPartnership:
                    -5,

                accountability:
                    -1,

                educationResult:
                    "centralized",

                headline:
                    "Local leaders resist governor's plan for centralized school budget control."
            },

            {
                text:
                    "Avoid changing the funding system because every option will upset someone",

                outcomeTitle:
                    "The disparities remain",

                outcomeText:
                    "The administration avoids immediate conflict, but districts continue pressing for a more equitable statewide solution.",

                approval:
                    -4,

                legislature:
                    -1,

                trust:
                    -5,

                stability:
                    -2,

                billsSigned:
                    0,

                majorActions:
                    0,

                fiscalDiscipline:
                    0,

                legislativeSkill:
                    -1,

                crisisLeadership:
                    0,

                localPartnership:
                    -2,

                accountability:
                    -2,

                educationResult:
                    "unchanged",

                headline:
                    "Governor declines major school funding changes despite statewide disparities."
            }

        ]

    },


    /*
    ==================================================
    3. NATURAL DISASTER
    ==================================================
    */

    {
        id:
            "stateEmergency",

        category:
            "Emergency Management",

        title:
            "Severe flooding affects several counties across the state.",

        text:
            "Local responders are overwhelmed, transportation routes are damaged, and federal assistance may be available. What do you do?",

        stage:
            "State Emergency",

        choices: [

            {
                text:
                    "Activate state emergency resources and coordinate with counties and federal agencies",

                outcomeTitle:
                    "The response becomes coordinated",

                outcomeText:
                    "State agencies, counties, and federal partners combine resources while keeping responsibilities clearly defined.",

                approval:
                    7,

                legislature:
                    2,

                trust:
                    8,

                stability:
                    10,

                billsSigned:
                    0,

                majorActions:
                    1,

                fiscalDiscipline:
                    0,

                legislativeSkill:
                    0,

                crisisLeadership:
                    5,

                localPartnership:
                    5,

                accountability:
                    1,

                emergencyResult:
                    "coordinated",

                headline:
                    "Governor mobilizes statewide flood response with county and federal partners."
            },

            {
                text:
                    "Tell counties the disaster is entirely their responsibility",

                outcomeTitle:
                    "Local resources become overwhelmed",

                outcomeText:
                    "Counties lead many emergency operations, but the state has major coordination and assistance responsibilities during large disasters.",

                approval:
                    -8,

                legislature:
                    -2,

                trust:
                    -8,

                stability:
                    -11,

                billsSigned:
                    0,

                majorActions:
                    0,

                fiscalDiscipline:
                    0,

                legislativeSkill:
                    0,

                crisisLeadership:
                    -5,

                localPartnership:
                    -5,

                accountability:
                    -2,

                emergencyResult:
                    "abandonedLocals",

                headline:
                    "County officials criticize limited state response to widespread flooding."
            },

            {
                text:
                    "Take direct command of every municipal emergency service",

                outcomeTitle:
                    "Authority becomes confused",

                outcomeText:
                    "The state can coordinate and support the response, but local emergency departments still retain important operational roles.",

                approval:
                    -2,

                legislature:
                    -2,

                trust:
                    -4,

                stability:
                    -5,

                billsSigned:
                    0,

                majorActions:
                    1,

                fiscalDiscipline:
                    0,

                legislativeSkill:
                    0,

                crisisLeadership:
                    -1,

                localPartnership:
                    -4,

                accountability:
                    0,

                emergencyResult:
                    "overcentralized",

                headline:
                    "Questions arise over state control of local flood response."
            },

            {
                text:
                    "Focus first on blaming previous administrations for infrastructure failures",

                outcomeTitle:
                    "The emergency becomes politicized",

                outcomeText:
                    "Accountability may matter later, but residents need immediate coordination, rescue, transportation, and recovery support.",

                approval:
                    -5,

                legislature:
                    -3,

                trust:
                    -7,

                stability:
                    -8,

                billsSigned:
                    0,

                majorActions:
                    1,

                fiscalDiscipline:
                    0,

                legislativeSkill:
                    -1,

                crisisLeadership:
                    -4,

                localPartnership:
                    -2,

                accountability:
                    -2,

                emergencyResult:
                    "politicized",

                headline:
                    "Political disputes overshadow early state flood response."
            }

        ]

    },


    /*
    ==================================================
    4. INFRASTRUCTURE
    ==================================================
    */

    {
        id:
            "infrastructure",

        category:
            "Infrastructure",

        title:
            "Several major roads and bridges need repair, but the state cannot fund every project immediately.",

        text:
            "Regional leaders are competing for limited capital funding. How do you set priorities?",

        stage:
            "Capital Planning",

        choices: [

            {
                text:
                    "Fund projects based primarily on which regions supported you in the election",

                outcomeTitle:
                    "The plan appears politically motivated",

                outcomeText:
                    "Some communities benefit, but trust declines as residents question whether infrastructure decisions are being made fairly.",

                approval:
                    -2,

                legislature:
                    -3,

                trust:
                    -8,

                stability:
                    -3,

                billsSigned:
                    0,

                majorActions:
                    1,

                fiscalDiscipline:
                    -2,

                legislativeSkill:
                    -1,

                crisisLeadership:
                    0,

                localPartnership:
                    -3,

                accountability:
                    -4,

                infrastructureResult:
                    "political",

                headline:
                    "Governor faces criticism over politically targeted infrastructure spending."
            },

            {
                text:
                    "Rank projects using safety, traffic, economic importance, and readiness criteria",

                outcomeTitle:
                    "The state adopts transparent priorities",

                outcomeText:
                    "Not every region gets its first choice, but the process is easier to defend because the criteria are public and consistent.",

                approval:
                    4,

                legislature:
                    4,

                trust:
                    8,

                stability:
                    6,

                billsSigned:
                    1,

                majorActions:
                    1,

                fiscalDiscipline:
                    4,

                legislativeSkill:
                    2,

                crisisLeadership:
                    0,

                localPartnership:
                    3,

                accountability:
                    4,

                infrastructureResult:
                    "criteriaBased",

                headline:
                    "State releases transparent ranking system for major infrastructure projects."
            },

            {
                text:
                    "Promise every region that all requested projects will begin immediately",

                outcomeTitle:
                    "The commitments exceed available resources",

                outcomeText:
                    "The announcement is popular initially, but costs rise and the administration cannot deliver every promised project.",

                approval:
                    1,

                legislature:
                    -3,

                trust:
                    -6,

                stability:
                    -3,

                billsSigned:
                    0,

                majorActions:
                    1,

                fiscalDiscipline:
                    -5,

                legislativeSkill:
                    -1,

                crisisLeadership:
                    0,

                localPartnership:
                    1,

                accountability:
                    -3,

                infrastructureResult:
                    "overpromised",

                headline:
                    "Questions grow over cost of governor's statewide infrastructure promises."
            },

            {
                text:
                    "Delay all major repairs until the next administration",

                outcomeTitle:
                    "The immediate budget pressure falls",

                outcomeText:
                    "The state avoids current spending, but infrastructure conditions worsen and local leaders lose confidence in the administration.",

                approval:
                    -6,

                legislature:
                    -2,

                trust:
                    -6,

                stability:
                    -5,

                billsSigned:
                    0,

                majorActions:
                    0,

                fiscalDiscipline:
                    1,

                legislativeSkill:
                    -1,

                crisisLeadership:
                    -1,

                localPartnership:
                    -4,

                accountability:
                    -2,

                infrastructureResult:
                    "deferred",

                headline:
                    "Governor delays major transportation repairs amid budget concerns."
            }

        ]

    }

];


/*
==================================================
STATE LEADERSHIP STATE
==================================================
*/

const gameState = {

    approval:
        64,

    legislature:
        58,

    trust:
        68,

    stability:
        72,

    billsSigned:
        0,

    majorActions:
        0,


    /*
    ----------------------------------------------
    HIDDEN GOVERNING METRICS
    ----------------------------------------------
    */

    fiscalDiscipline:
        0,

    legislativeSkill:
        0,

    crisisLeadership:
        0,

    localPartnership:
        0,

    accountability:
        0,


    /*
    ----------------------------------------------
    BRANCHING RESULTS
    ----------------------------------------------
    */

    budgetResult:
        "pending",

    educationResult:
        "pending",

    emergencyResult:
        "pending",

    infrastructureResult:
        "pending",

    legislatureResult:
        "pending",

    federalismResult:
        "pending",

    stateCrisis:
        false,

    administrationOutcome:
        "Your term is still unfolding."

};


/*
==================================================
INITIAL FLOW
==================================================
*/

let simulationFlow = [

    governorScenarios[0],

    governorScenarios[1],

    governorScenarios[2],

    governorScenarios[3]

];


let currentScenarioIndex =
    0;


let decisionLocked =
    false;


/*
==================================================
DOM REFERENCES
==================================================
*/

const startScreen =
    document.getElementById(
        "governorStartScreen"
    );


const gameScreen =
    document.getElementById(
        "governorGameScreen"
    );


const resultsScreen =
    document.getElementById(
        "governorResultsScreen"
    );


const startButton =
    document.getElementById(
        "governorStartButton"
    );


const restartButton =
    document.getElementById(
        "governorRestartButton"
    );


const continueButton =
    document.getElementById(
        "governorContinueButton"
    );


const scenarioCategory =
    document.getElementById(
        "governorScenarioCategory"
    );


const scenarioProgress =
    document.getElementById(
        "governorScenarioProgress"
    );


const scenarioTitle =
    document.getElementById(
        "governorScenarioTitle"
    );


const scenarioText =
    document.getElementById(
        "governorScenarioText"
    );


const choiceContainer =
    document.getElementById(
        "governorChoiceContainer"
    );


const outcome =
    document.getElementById(
        "governorOutcome"
    );


const outcomeIcon =
    document.getElementById(
        "governorOutcomeIcon"
    );


const outcomeTitle =
    document.getElementById(
        "governorOutcomeTitle"
    );


const outcomeText =
    document.getElementById(
        "governorOutcomeText"
    );


const newsFeed =
    document.getElementById(
        "governorNewsFeed"
    );
    /*
==================================================
LEGISLATURE — COOPERATIVE PATH
==================================================
*/

const legislatureCooperativeScenario = {

    id:
        "legislatureCooperative",

    category:
        "Legislative Relations",

    title:
        "Your administration has a workable relationship with the state legislature.",

    text:
        "Lawmakers send you a major public-services bill that includes several provisions you support and several you oppose. What do you do?",

    stage:
        "Legislative Negotiation",

    choices: [

        {
            text:
                "Meet with legislative leaders and negotiate targeted changes",

            outcomeTitle:
                "The compromise improves the bill",

            outcomeText:
                "The final package keeps most of the public-service funding while removing several provisions your administration considered unworkable.",

            approval:
                4,

            legislature:
                8,

            trust:
                6,

            stability:
                5,

            billsSigned:
                1,

            majorActions:
                1,

            fiscalDiscipline:
                2,

            legislativeSkill:
                5,

            crisisLeadership:
                0,

            localPartnership:
                1,

            accountability:
                2,

            legislatureResult:
                "agreement",

            headline:
                "Governor and legislative leaders reach compromise on major public-services bill."
        },

        {
            text:
                "Sign the bill without reviewing the disputed provisions",

            outcomeTitle:
                "The bill becomes law quickly",

            outcomeText:
                "The rapid signature avoids conflict, but several poorly reviewed provisions create implementation problems later.",

            approval:
                2,

            legislature:
                4,

            trust:
                -3,

            stability:
                -2,

            billsSigned:
                1,

            majorActions:
                1,

            fiscalDiscipline:
                -2,

            legislativeSkill:
                0,

            crisisLeadership:
                0,

            localPartnership:
                0,

            accountability:
                -2,

            legislatureResult:
                "rushed",

            headline:
                "Governor signs major services bill amid questions over implementation."
        },

        {
            text:
                "Veto the entire bill and refuse further negotiations",

            outcomeTitle:
                "The relationship deteriorates",

            outcomeText:
                "You protect your objections, but lawmakers who were willing to compromise become less cooperative.",

            approval:
                -2,

            legislature:
                -9,

            trust:
                -2,

            stability:
                -3,

            billsSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                1,

            legislativeSkill:
                -4,

            crisisLeadership:
                0,

            localPartnership:
                0,

            accountability:
                -1,

            legislatureResult:
                "vetoConflict",

            headline:
                "Governor vetoes public-services bill as legislative tensions rise."
        },

        {
            text:
                "Threaten to punish lawmakers' districts if they oppose your position",

            outcomeTitle:
                "The dispute becomes personal",

            outcomeText:
                "The pressure tactic may influence some votes, but it damages trust with lawmakers and local communities.",

            approval:
                -5,

            legislature:
                -12,

            trust:
                -9,

            stability:
                -5,

            billsSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                0,

            legislativeSkill:
                -5,

            crisisLeadership:
                -1,

            localPartnership:
                -5,

            accountability:
                -4,

            legislatureResult:
                "retaliatory",

            headline:
                "Governor faces criticism over threats toward lawmakers' districts."
        }

    ]

};


/*
==================================================
LEGISLATURE — HOSTILE PATH
==================================================
*/

const legislatureHostileScenario = {

    id:
        "legislatureHostile",

    category:
        "Legislative Conflict",

    title:
        "Relations between your administration and the legislature have become badly strained.",

    text:
        "A major deadline is approaching and neither side trusts the other. What do you do?",

    stage:
        "Capitol Conflict",

    choices: [

        {
            text:
                "Invite leaders from both parties to restart negotiations",

            outcomeTitle:
                "Communication reopens",

            outcomeText:
                "The meeting does not erase earlier conflict, but it creates a path toward a limited agreement.",

            approval:
                2,

            legislature:
                9,

            trust:
                6,

            stability:
                6,

            billsSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                1,

            legislativeSkill:
                5,

            crisisLeadership:
                2,

            localPartnership:
                1,

            accountability:
                2,

            legislatureResult:
                "recovery",

            headline:
                "Governor reopens bipartisan negotiations after months of legislative conflict."
        },

        {
            text:
                "Bypass the legislature on matters that require legislative approval",

            outcomeTitle:
                "A state constitutional dispute develops",

            outcomeText:
                "The governor has significant executive authority, but some major actions still require legislative approval or appropriation.",

            approval:
                -4,

            legislature:
                -14,

            trust:
                -12,

            stability:
                -10,

            billsSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                -1,

            legislativeSkill:
                -5,

            crisisLeadership:
                -3,

            localPartnership:
                -1,

            accountability:
                -4,

            legislatureResult:
                "constitutionalConflict",

            stateCrisis:
                true,

            headline:
                "Governor faces legal challenge over attempt to bypass state legislature."
        },

        {
            text:
                "Support a narrow compromise on the most urgent issue",

            outcomeTitle:
                "The immediate crisis eases",

            outcomeText:
                "The broader relationship remains difficult, but both sides prove they can still govern when necessary.",

            approval:
                1,

            legislature:
                6,

            trust:
                5,

            stability:
                7,

            billsSigned:
                1,

            majorActions:
                1,

            fiscalDiscipline:
                2,

            legislativeSkill:
                4,

            crisisLeadership:
                2,

            localPartnership:
                0,

            accountability:
                1,

            legislatureResult:
                "limitedDeal",

            headline:
                "Governor and lawmakers reach narrow agreement despite strained relations."
        },

        {
            text:
                "Use public appearances only to blame the legislature",

            outcomeTitle:
                "The conflict deepens",

            outcomeText:
                "The messaging energizes some supporters but leaves the underlying governing problem unresolved.",

            approval:
                -1,

            legislature:
                -9,

            trust:
                -6,

            stability:
                -6,

            billsSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                0,

            legislativeSkill:
                -4,

            crisisLeadership:
                -2,

            localPartnership:
                -1,

            accountability:
                -4,

            legislatureResult:
                "blame",

            headline:
                "Capitol dispute intensifies as governor and lawmakers trade blame."
        }

    ]

};


/*
==================================================
FEDERAL-STATE RELATIONS — STABLE PATH
==================================================
*/

const federalRelationsStableScenario = {

    id:
        "federalRelationsStable",

    category:
        "Federal-State Relations",

    title:
        "The federal government offers major infrastructure and recovery funding with detailed conditions.",

    text:
        "State agencies support accepting the money, but several lawmakers argue the requirements are too restrictive. What do you do?",

    stage:
        "Federal Partnership",

    choices: [

        {
            text:
                "Review the conditions carefully and accept funding that fits state law and priorities",

            outcomeTitle:
                "The state secures useful federal support",

            outcomeText:
                "The administration gains resources while clearly identifying the conditions the state is agreeing to follow.",

            approval:
                4,

            legislature:
                3,

            trust:
                6,

            stability:
                7,

            billsSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                4,

            legislativeSkill:
                1,

            crisisLeadership:
                1,

            localPartnership:
                3,

            accountability:
                3,

            federalismResult:
                "cooperative",

            headline:
                "Governor accepts targeted federal funding after state review."
        },

        {
            text:
                "Accept every federal condition without reviewing state obligations",

            outcomeTitle:
                "The state gains funding but loses clarity",

            outcomeText:
                "The money arrives quickly, but lawmakers and agencies later question whether the administration understood all of the commitments.",

            approval:
                1,

            legislature:
                -3,

            trust:
                -4,

            stability:
                1,

            billsSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                1,

            legislativeSkill:
                -1,

            crisisLeadership:
                0,

            localPartnership:
                1,

            accountability:
                -3,

            federalismResult:
                "unreviewed",

            headline:
                "Questions emerge over state commitments tied to federal funding."
        },

        {
            text:
                "Reject all federal cooperation on principle",

            outcomeTitle:
                "The state loses major resources",

            outcomeText:
                "The decision preserves complete distance from the federal program, but communities lose funding that could have supported recovery and infrastructure.",

            approval:
                -5,

            legislature:
                -1,

            trust:
                -4,

            stability:
                -7,

            billsSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                -2,

            legislativeSkill:
                0,

            crisisLeadership:
                -1,

            localPartnership:
                -4,

            accountability:
                -1,

            federalismResult:
                "rejected",

            headline:
                "State rejects major federal infrastructure and recovery funding."
        },

        {
            text:
                "Accept the money but announce that the state will ignore the attached legal conditions",

            outcomeTitle:
                "A federal-state legal conflict begins",

            outcomeText:
                "The state cannot generally accept conditional funding while simply disregarding lawful conditions attached to it.",

            approval:
                -4,

            legislature:
                -4,

            trust:
                -10,

            stability:
                -8,

            billsSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                -2,

            legislativeSkill:
                -2,

            crisisLeadership:
                -3,

            localPartnership:
                -1,

            accountability:
                -5,

            federalismResult:
                "legalConflict",

            stateCrisis:
                true,

            headline:
                "Federal-state dispute erupts over conditions attached to major grant."
        }

    ]

};


/*
==================================================
FEDERAL-STATE RELATIONS — CRISIS PATH
==================================================
*/

const federalRelationsCrisisScenario = {

    id:
        "federalRelationsCrisis",

    category:
        "Federalism Crisis",

    title:
        "Your administration enters a major dispute with the federal government while state confidence is already weakened.",

    text:
        "The disagreement affects funding, emergency planning, and several state agencies. How do you proceed?",

    stage:
        "Federalism Crisis",

    choices: [

        {
            text:
                "Challenge the disputed federal requirement through legal and administrative channels while maintaining other cooperation",

            outcomeTitle:
                "The conflict stays within institutional channels",

            outcomeText:
                "The state preserves its objections without disrupting unrelated federal partnerships or services.",

            approval:
                2,

            legislature:
                4,

            trust:
                8,

            stability:
                7,

            billsSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                2,

            legislativeSkill:
                2,

            crisisLeadership:
                3,

            localPartnership:
                2,

            accountability:
                4,

            federalismResult:
                "managed",

            stateCrisis:
                false,

            headline:
                "State challenges federal requirement while maintaining broader cooperation."
        },

        {
            text:
                "Order state agencies to ignore every federal rule",

            outcomeTitle:
                "The confrontation expands dramatically",

            outcomeText:
                "The blanket directive creates conflicts far beyond the original dispute and increases legal uncertainty.",

            approval:
                -6,

            legislature:
                -8,

            trust:
                -12,

            stability:
                -12,

            billsSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                -2,

            legislativeSkill:
                -4,

            crisisLeadership:
                -4,

            localPartnership:
                -2,

            accountability:
                -5,

            federalismResult:
                "defiance",

            stateCrisis:
                true,

            headline:
                "Governor orders broad state defiance of federal rules."
        },

        {
            text:
                "Negotiate a temporary compliance agreement while courts review the dispute",

            outcomeTitle:
                "The state preserves stability",

            outcomeText:
                "Neither side gives up its legal position, but agencies continue operating while the dispute is reviewed.",

            approval:
                2,

            legislature:
                3,

            trust:
                7,

            stability:
                8,

            billsSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                2,

            legislativeSkill:
                2,

            crisisLeadership:
                4,

            localPartnership:
                2,

            accountability:
                3,

            federalismResult:
                "temporaryAgreement",

            stateCrisis:
                false,

            headline:
                "State and federal officials reach temporary agreement during legal dispute."
        },

        {
            text:
                "Use the dispute mainly as a political campaign issue",

            outcomeTitle:
                "The underlying problem remains unresolved",

            outcomeText:
                "Public attention rises, but agencies still lack clear direction about funding and legal obligations.",

            approval:
                0,

            legislature:
                -2,

            trust:
                -6,

            stability:
                -7,

            billsSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                -1,

            legislativeSkill:
                -2,

            crisisLeadership:
                -3,

            localPartnership:
                -2,

            accountability:
                -4,

            federalismResult:
                "politicized",

            stateCrisis:
                true,

            headline:
                "Federal-state dispute becomes major political battle as agencies await guidance."
        }

    ]

};


/*
==================================================
FISCAL STRESS — STABLE PATH
==================================================
*/

const fiscalStableScenario = {

    id:
        "fiscalStable",

    category:
        "Fiscal Management",

    title:
        "State revenues fall unexpectedly midway through your term.",

    text:
        "Your earlier fiscal choices left the state with some flexibility, but a new budget gap is emerging. What do you do?",

    stage:
        "Midterm Fiscal Review",

    choices: [

        {
            text:
                "Use part of the reserve fund while making targeted spending adjustments",

            outcomeTitle:
                "The state absorbs the shock",

            outcomeText:
                "The reserve cushions the downturn while targeted adjustments preserve the most important services.",

            approval:
                3,

            legislature:
                4,

            trust:
                6,

            stability:
                7,

            billsSigned:
                1,

            majorActions:
                1,

            fiscalDiscipline:
                4,

            legislativeSkill:
                2,

            crisisLeadership:
                2,

            localPartnership:
                1,

            accountability:
                2,

            fiscalResult:
                "managed",

            headline:
                "Governor uses reserves and targeted reductions to manage revenue decline."
        },

        {
            text:
                "Spend the entire reserve fund immediately",

            outcomeTitle:
                "The immediate gap closes",

            outcomeText:
                "The state avoids near-term cuts but loses most of its protection against another emergency or downturn.",

            approval:
                2,

            legislature:
                -1,

            trust:
                -3,

            stability:
                -2,

            billsSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                -3,

            legislativeSkill:
                0,

            crisisLeadership:
                0,

            localPartnership:
                0,

            accountability:
                -1,

            fiscalResult:
                "reserveDepleted",

            headline:
                "State drains reserve fund to cover unexpected budget shortfall."
        },

        {
            text:
                "Borrow heavily without a repayment plan",

            outcomeTitle:
                "The problem shifts into the future",

            outcomeText:
                "Programs continue in the short term, but the state takes on new obligations without a clear long-term strategy.",

            approval:
                1,

            legislature:
                -4,

            trust:
                -6,

            stability:
                -4,

            billsSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                -5,

            legislativeSkill:
                -1,

            crisisLeadership:
                -1,

            localPartnership:
                0,

            accountability:
                -3,

            fiscalResult:
                "unsustainableDebt",

            headline:
                "State borrowing plan raises concerns about long-term fiscal stability."
        },

        {
            text:
                "Hide the revised revenue forecast until after the next election",

            outcomeTitle:
                "A transparency scandal develops",

            outcomeText:
                "The delayed disclosure damages confidence in the administration and makes the eventual fiscal adjustment more difficult.",

            approval:
                -8,

            legislature:
                -7,

            trust:
                -14,

            stability:
                -8,

            billsSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                -4,

            legislativeSkill:
                -3,

            crisisLeadership:
                -2,

            localPartnership:
                -1,

            accountability:
                -6,

            fiscalResult:
                "concealed",

            stateCrisis:
                true,

            headline:
                "Governor faces criticism after delayed disclosure of state revenue shortfall."
        }

    ]

};


/*
==================================================
FISCAL CRISIS — WEAK PATH
==================================================
*/

const fiscalCrisisScenario = {

    id:
        "fiscalCrisis",

    category:
        "Fiscal Crisis",

    title:
        "The state enters a serious fiscal crisis after earlier budget decisions reduced its flexibility.",

    text:
        "Agencies are warning about service disruptions and lawmakers are demanding a plan. What do you do?",

    stage:
        "Fiscal Emergency",

    choices: [

        {
            text:
                "Present a transparent recovery plan combining targeted cuts, revenue review, and legislative negotiation",

            outcomeTitle:
                "The state begins stabilizing",

            outcomeText:
                "The plan is politically difficult, but it gives lawmakers and residents a credible path out of the crisis.",

            approval:
                0,

            legislature:
                7,

            trust:
                9,

            stability:
                8,

            billsSigned:
                1,

            majorActions:
                1,

            fiscalDiscipline:
                5,

            legislativeSkill:
                4,

            crisisLeadership:
                4,

            localPartnership:
                1,

            accountability:
                5,

            fiscalResult:
                "recovery",

            stateCrisis:
                false,

            headline:
                "Governor unveils comprehensive state fiscal recovery plan."
        },

        {
            text:
                "Make another round of broad cuts without public explanation",

            outcomeTitle:
                "Services deteriorate further",

            outcomeText:
                "The budget gap narrows somewhat, but residents and local governments receive little guidance about which services will remain available.",

            approval:
                -5,

            legislature:
                -3,

            trust:
                -8,

            stability:
                -8,

            billsSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                0,

            legislativeSkill:
                -2,

            crisisLeadership:
                -3,

            localPartnership:
                -4,

            accountability:
                -4,

            fiscalResult:
                "serviceCuts",

            stateCrisis:
                true,

            headline:
                "State agencies face widespread cuts amid unresolved fiscal crisis."
        },

        {
            text:
                "Insist there is no fiscal problem despite agency reports",

            outcomeTitle:
                "Confidence collapses",

            outcomeText:
                "The denial delays corrective action and damages the administration's credibility with lawmakers, agencies, and residents.",

            approval:
                -8,

            legislature:
                -8,

            trust:
                -14,

            stability:
                -10,

            billsSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                -5,

            legislativeSkill:
                -3,

            crisisLeadership:
                -4,

            localPartnership:
                -2,

            accountability:
                -6,

            fiscalResult:
                "denial",

            stateCrisis:
                true,

            headline:
                "Lawmakers challenge governor's denial of worsening state fiscal crisis."
        },

        {
            text:
                "Ask independent fiscal analysts to review the budget and publish recommendations",

            outcomeTitle:
                "The state gains a clearer picture",

            outcomeText:
                "The review does not solve the deficit by itself, but transparent analysis creates a stronger basis for legislative action.",

            approval:
                1,

            legislature:
                5,

            trust:
                8,

            stability:
                4,

            billsSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                3,

            legislativeSkill:
                2,

            crisisLeadership:
                2,

            localPartnership:
                0,

            accountability:
                5,

            fiscalResult:
                "independentReview",

            headline:
                "Independent analysts begin public review of state fiscal crisis."
        }

    ]

};


/*
==================================================
ACCOUNTABILITY — STABLE TERM
==================================================
*/

const governorAccountabilityStableScenario = {

    id:
        "governorAccountabilityStable",

    category:
        "Public Accountability",

    title:
        "Your term is nearing its end.",

    text:
        "Residents want to know what your administration accomplished, what remains unfinished, and how state resources were used. How do you close the term?",

    stage:
        "End of Term",

    choices: [

        {
            text:
                "Publish a detailed statewide report and hold public forums in several regions",

            outcomeTitle:
                "The administration closes with transparency",

            outcomeText:
                "Residents receive a clear account of spending, major decisions, accomplishments, and unfinished work.",

            approval:
                5,

            legislature:
                2,

            trust:
                10,

            stability:
                5,

            billsSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                1,

            legislativeSkill:
                0,

            crisisLeadership:
                0,

            localPartnership:
                4,

            accountability:
                6,

            headline:
                "Governor releases detailed end-of-term statewide performance report."
        },

        {
            text:
                "Take credit for every success and blame the legislature for every failure",

            outcomeTitle:
                "The final message becomes partisan",

            outcomeText:
                "Supporters respond positively, but lawmakers and residents question whether the administration is presenting a fair record.",

            approval:
                0,

            legislature:
                -5,

            trust:
                -7,

            stability:
                -3,

            billsSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                0,

            legislativeSkill:
                -1,

            crisisLeadership:
                0,

            localPartnership:
                -2,

            accountability:
                -5,

            headline:
                "End-of-term governor address draws criticism over blame and credit claims."
        },

        {
            text:
                "Release agency performance data and invite independent review",

            outcomeTitle:
                "The record receives outside scrutiny",

            outcomeText:
                "The review may reveal weaknesses, but it strengthens confidence that the administration is willing to be evaluated.",

            approval:
                3,

            legislature:
                3,

            trust:
                11,

            stability:
                4,

            billsSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                2,

            legislativeSkill:
                0,

            crisisLeadership:
                0,

            localPartnership:
                2,

            accountability:
                7,

            headline:
                "Governor opens agency performance record to independent review."
        },

        {
            text:
                "Avoid public questions and communicate only through political advertising",

            outcomeTitle:
                "Trust declines",

            outcomeText:
                "The administration controls its message, but residents receive little direct accountability for the state's record.",

            approval:
                -5,

            legislature:
                -1,

            trust:
                -10,

            stability:
                -2,

            billsSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                0,

            legislativeSkill:
                0,

            crisisLeadership:
                0,

            localPartnership:
                -2,

            accountability:
                -6,

            headline:
                "Governor faces criticism for limited public access at end of term."
        }

    ]

};


/*
==================================================
ACCOUNTABILITY — CRISIS TERM
==================================================
*/

const governorAccountabilityCrisisScenario = {

    id:
        "governorAccountabilityCrisis",

    category:
        "Public Accountability",

    title:
        "Your term ends after a period of serious fiscal or institutional strain.",

    text:
        "Residents, lawmakers, and local officials want an explanation of what went wrong and what the state should do next. How do you respond?",

    stage:
        "Statewide Reckoning",

    choices: [

        {
            text:
                "Acknowledge mistakes and publish a detailed recovery and transition report",

            outcomeTitle:
                "The administration begins rebuilding confidence",

            outcomeText:
                "The report cannot erase the problems of the term, but it gives the state a clearer path forward.",

            approval:
                1,

            legislature:
                4,

            trust:
                11,

            stability:
                7,

            billsSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                3,

            legislativeSkill:
                1,

            crisisLeadership:
                3,

            localPartnership:
                3,

            accountability:
                7,

            stateCrisis:
                false,

            headline:
                "Governor acknowledges mistakes and releases statewide recovery report."
        },

        {
            text:
                "Defend every administration decision and reject all criticism",

            outcomeTitle:
                "The crisis remains unresolved",

            outcomeText:
                "The response reassures some supporters but does little to rebuild confidence among institutions or communities.",

            approval:
                -1,

            legislature:
                -6,

            trust:
                -9,

            stability:
                -6,

            billsSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                -1,

            legislativeSkill:
                -2,

            crisisLeadership:
                -2,

            localPartnership:
                -3,

            accountability:
                -6,

            stateCrisis:
                true,

            headline:
                "Governor rejects criticism as state crisis continues."
        },

        {
            text:
                "Invite independent auditors and policy experts to review the administration's record",

            outcomeTitle:
                "Outside review strengthens the transition",

            outcomeText:
                "The state receives an independent assessment of the fiscal, operational, and institutional problems that developed during the term.",

            approval:
                2,

            legislature:
                5,

            trust:
                12,

            stability:
                6,

            billsSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                3,

            legislativeSkill:
                1,

            crisisLeadership:
                2,

            localPartnership:
                2,

            accountability:
                8,

            stateCrisis:
                false,

            headline:
                "Independent review begins after difficult gubernatorial term."
        },

        {
            text:
                "Refuse to discuss the state's problems before leaving office",

            outcomeTitle:
                "The state receives little closure",

            outcomeText:
                "Major questions about the budget, administration, and institutional conflict remain unanswered.",

            approval:
                -7,

            legislature:
                -4,

            trust:
                -12,

            stability:
                -7,

            billsSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                -2,

            legislativeSkill:
                -1,

            crisisLeadership:
                -3,

            localPartnership:
                -3,

            accountability:
                -7,

            stateCrisis:
                true,

            headline:
                "Governor declines end-of-term review despite unresolved state problems."
        }

    ]

};
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


        if (
            !response.ok
        ) {

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


    if (
        element
    ) {

        element.textContent =
            String(
                value
            );

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


    if (
        bar
    ) {

        bar.style.width =
            `${value}%`;

    }

}


/*
==================================================
RESET FLOW
==================================================
*/

function resetSimulationFlow() {

    simulationFlow =
        [

            governorScenarios[0],

            governorScenarios[1],

            governorScenarios[2],

            governorScenarios[3]

        ];

}


/*
==================================================
EXPECTED TERM LENGTH
==================================================
*/

function getEstimatedDecisionCount() {

    return 8;

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


    gameState.legislature =
        clamp(
            gameState.legislature
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
        "governorApproval",
        `${gameState.approval}%`
    );


    setText(
        "governorLegislature",
        `${gameState.legislature}%`
    );


    setText(
        "governorTrust",
        `${gameState.trust}%`
    );


    setText(
        "governorStability",
        `${gameState.stability}%`
    );


    setText(
        "governorBillsSigned",
        gameState.billsSigned
    );


    setText(
        "governorMajorActions",
        gameState.majorActions
    );


    setText(
        "executiveGovernorApproval",
        `${gameState.approval}%`
    );


    setText(
        "executiveGovernorLegislature",
        `${gameState.legislature}%`
    );


    setText(
        "executiveGovernorTrust",
        `${gameState.trust}%`
    );


    setText(
        "executiveGovernorStability",
        `${gameState.stability}%`
    );


    setText(
        "sideGovernorBillsSigned",
        gameState.billsSigned
    );


    setText(
        "sideGovernorMajorActions",
        gameState.majorActions
    );


    updateMetric(
        "sideGovernorApproval",
        "sideGovernorApprovalBar",
        gameState.approval
    );


    updateMetric(
        "sideGovernorLegislature",
        "sideGovernorLegislatureBar",
        gameState.legislature
    );


    updateMetric(
        "sideGovernorTrust",
        "sideGovernorTrustBar",
        gameState.trust
    );


    updateMetric(
        "sideGovernorStability",
        "sideGovernorStabilityBar",
        gameState.stability
    );


    const progress =
        Math.min(
            100,
            Math.round(
                (
                    currentScenarioIndex /
                    getEstimatedDecisionCount()
                ) * 100
            )
        );


    setText(
        "governorTermProgress",
        `${progress}%`
    );

}


/*
==================================================
SELECT LEGISLATURE PATH
==================================================
*/

function determineLegislatureScenario() {

    const cooperationScore =
        gameState.legislature +
        (
            gameState.legislativeSkill * 4
        );


    if (
        cooperationScore >=
        64
    ) {

        return legislatureCooperativeScenario;

    }


    return legislatureHostileScenario;

}


/*
==================================================
SELECT FEDERAL-STATE PATH
==================================================
*/

function determineFederalRelationsScenario() {

    const institutionalRisk =
        gameState.stateCrisis ||
        gameState.trust <
            48 ||
        gameState.localPartnership <=
            -4;


    if (
        institutionalRisk
    ) {

        return federalRelationsCrisisScenario;

    }


    return federalRelationsStableScenario;

}


/*
==================================================
SELECT FISCAL PATH
==================================================
*/

function determineFiscalScenario() {

    const fiscalStrength =
        (
            gameState.fiscalDiscipline * 4
        ) +
        gameState.trust +
        gameState.stability;


    if (
        fiscalStrength >=
        135
    ) {

        return fiscalStableScenario;

    }


    return fiscalCrisisScenario;

}


/*
==================================================
SELECT ACCOUNTABILITY PATH
==================================================
*/

function determineGovernorAccountabilityScenario() {

    if (
        gameState.stateCrisis ||
        gameState.trust <
            45 ||
        gameState.accountability <=
            -5
    ) {

        return governorAccountabilityCrisisScenario;

    }


    return governorAccountabilityStableScenario;

}


/*
==================================================
RENDER SCENARIO
==================================================
*/

function renderScenario() {

    const scenario =
        simulationFlow[
            currentScenarioIndex
        ];


    if (
        !scenario
    ) {

        showFinalResults();

        return;

    }


    decisionLocked =
        false;


    if (
        outcome
    ) {

        outcome.hidden =
            true;

    }


    if (
        continueButton
    ) {

        continueButton.hidden =
            true;

    }


    if (
        scenarioCategory
    ) {

        scenarioCategory.textContent =
            scenario.category;

    }


    if (
        scenarioProgress
    ) {

        scenarioProgress.textContent =
            `Decision ${currentScenarioIndex + 1} of ${getEstimatedDecisionCount()}`;

    }


    if (
        scenarioTitle
    ) {

        scenarioTitle.textContent =
            scenario.title;

    }


    if (
        scenarioText
    ) {

        scenarioText.textContent =
            scenario.text;

    }


    setText(
        "governorTurnLabel",
        `Month ${1 + currentScenarioIndex * 6}`
    );


    setText(
        "governorCurrentStage",
        scenario.stage
    );


    if (
        !choiceContainer
    ) {

        return;

    }


    choiceContainer.innerHTML =
        scenario.choices
            .map(
                (
                    choice,
                    index
                ) => {

                    return `
                        <button
                            type="button"
                            class="governor-choice-button"
                            data-choice-index="${index}"
                        >

                            <span>
                                ${String.fromCharCode(
                                    65 + index
                                )}
                            </span>

                            <strong>
                                ${escapeHtml(
                                    choice.text
                                )}
                            </strong>

                        </button>
                    `;

                }
            )
            .join("");


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
            ".governor-choice-button"
        );


    if (
        !selectedButton ||
        decisionLocked
    ) {

        return;

    }


    const scenario =
        simulationFlow[
            currentScenarioIndex
        ];


    if (
        !scenario
    ) {

        return;

    }


    const choiceIndex =
        Number(
            selectedButton.dataset.choiceIndex
        );


    const choice =
        scenario.choices[
            choiceIndex
        ];


    if (
        !choice
    ) {

        return;

    }


    decisionLocked =
        true;


    choiceContainer
        ?.querySelectorAll(
            ".governor-choice-button"
        )
        .forEach(
            button => {

                button.disabled =
                    true;

            }
        );


    selectedButton.classList.add(
        "governor-choice-selected"
    );


    applyChoiceEffects(
        choice
    );


    updateStateFromChoice(
        choice
    );


    updateDashboard();


    addHeadline(
        scenario.category,
        choice.headline
    );


    renderChoiceOutcome(
        choice
    );


    prepareNextBranch(
        scenario
    );


    if (
        continueButton
    ) {

        continueButton.textContent =
            isFinalScenario()
                ? "View Report Card"
                : "Continue";


        continueButton.hidden =
            false;

    }

}


/*
==================================================
APPLY CHOICE EFFECTS
==================================================
*/

function applyChoiceEffects(
    choice
) {

    gameState.approval +=
        Number(
            choice.approval ||
            0
        );


    gameState.legislature +=
        Number(
            choice.legislature ||
            0
        );


    gameState.trust +=
        Number(
            choice.trust ||
            0
        );


    gameState.stability +=
        Number(
            choice.stability ||
            0
        );


    gameState.billsSigned +=
        Number(
            choice.billsSigned ||
            0
        );


    gameState.majorActions +=
        Number(
            choice.majorActions ||
            0
        );


    gameState.fiscalDiscipline +=
        Number(
            choice.fiscalDiscipline ||
            0
        );


    gameState.legislativeSkill +=
        Number(
            choice.legislativeSkill ||
            0
        );


    gameState.crisisLeadership +=
        Number(
            choice.crisisLeadership ||
            0
        );


    gameState.localPartnership +=
        Number(
            choice.localPartnership ||
            0
        );


    gameState.accountability +=
        Number(
            choice.accountability ||
            0
        );

}


/*
==================================================
UPDATE STATE FLAGS
==================================================
*/

function updateStateFromChoice(
    choice
) {

    const stateProperties = [

        "budgetResult",

        "educationResult",

        "emergencyResult",

        "infrastructureResult",

        "legislatureResult",

        "federalismResult",

        "fiscalResult"

    ];


    stateProperties.forEach(
        property => {

            if (
                choice[
                    property
                ]
            ) {

                gameState[
                    property
                ] =
                    choice[
                        property
                    ];

            }

        }
    );


    if (
        typeof choice.stateCrisis ===
        "boolean"
    ) {

        gameState.stateCrisis =
            choice.stateCrisis;

    }

}


/*
==================================================
RENDER CHOICE OUTCOME
==================================================
*/

function renderChoiceOutcome(
    choice
) {

    const totalChange =
        Number(
            choice.approval ||
            0
        ) +
        Number(
            choice.legislature ||
            0
        ) +
        Number(
            choice.trust ||
            0
        ) +
        Number(
            choice.stability ||
            0
        );


    if (
        outcomeIcon
    ) {

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


    if (
        outcomeTitle
    ) {

        outcomeTitle.textContent =
            choice.outcomeTitle;

    }


    if (
        outcomeText
    ) {

        outcomeText.textContent =
            choice.outcomeText;

    }


    if (
        outcome
    ) {

        outcome.hidden =
            false;

    }

}


/*
==================================================
BRANCH PREPARATION
==================================================
*/

function prepareNextBranch(
    scenario
) {

    /*
    ----------------------------------------------
    AFTER FOUNDATION DECISIONS
    ----------------------------------------------
    */

    if (
        scenario.id ===
        "infrastructure"
    ) {

        appendScenarioIfMissing(
            determineLegislatureScenario()
        );


        return;

    }


    /*
    ----------------------------------------------
    AFTER LEGISLATURE
    ----------------------------------------------
    */

    if (
        scenario.id ===
            "legislatureCooperative" ||
        scenario.id ===
            "legislatureHostile"
    ) {

        appendScenarioIfMissing(
            determineFederalRelationsScenario()
        );


        return;

    }


    /*
    ----------------------------------------------
    AFTER FEDERAL RELATIONS
    ----------------------------------------------
    */

    if (
        scenario.id ===
            "federalRelationsStable" ||
        scenario.id ===
            "federalRelationsCrisis"
    ) {

        appendScenarioIfMissing(
            determineFiscalScenario()
        );


        return;

    }


    /*
    ----------------------------------------------
    AFTER FISCAL DECISION
    ----------------------------------------------
    */

    if (
        scenario.id ===
            "fiscalStable" ||
        scenario.id ===
            "fiscalCrisis"
    ) {

        appendScenarioIfMissing(
            determineGovernorAccountabilityScenario()
        );

    }

}


/*
==================================================
APPEND SCENARIO
==================================================
*/

function appendScenarioIfMissing(
    scenario
) {

    if (
        !scenario
    ) {

        return;

    }


    const exists =
        simulationFlow.some(
            item =>
                item.id ===
                scenario.id
        );


    if (
        exists
    ) {

        return;

    }


    simulationFlow.push(
        scenario
    );

}


/*
==================================================
FINAL SCENARIO
==================================================
*/

function isFinalScenario() {

    const scenario =
        simulationFlow[
            currentScenarioIndex
        ];


    if (
        !scenario
    ) {

        return false;

    }


    return (
        scenario.id ===
            "governorAccountabilityStable" ||
        scenario.id ===
            "governorAccountabilityCrisis"
    );

}


/*
==================================================
STATE NEWS
==================================================
*/

function addHeadline(
    category,
    headline
) {

    if (
        !newsFeed
    ) {

        return;

    }


    const item =
        document.createElement(
            "div"
        );


    item.className =
        "governor-news-item";


    const categoryElement =
        document.createElement(
            "span"
        );


    categoryElement.textContent =
        String(
            category ||
            "State Capitol"
        );


    const headlineElement =
        document.createElement(
            "p"
        );


    headlineElement.textContent =
        String(
            headline ||
            ""
        );


    item.append(
        categoryElement,
        headlineElement
    );


    newsFeed.prepend(
        item
    );


    const newsItems =
        newsFeed.querySelectorAll(
            ".governor-news-item"
        );


    if (
        newsItems.length >
        5
    ) {

        newsItems[
            newsItems.length - 1
        ]?.remove();

    }

}


/*
==================================================
CONTINUE
==================================================
*/

function continueSimulation() {

    if (
        !decisionLocked
    ) {

        return;

    }


    currentScenarioIndex +=
        1;


    if (
        currentScenarioIndex >=
        simulationFlow.length
    ) {

        showFinalResults();

        return;

    }


    renderScenario();


    document
        .getElementById(
            "governorScenarioCard"
        )
        ?.scrollIntoView(
            {

                behavior:
                    "smooth",

                block:
                    "start"

            }
        );

}
/*
==================================================
FINAL ADMINISTRATION OUTCOME
==================================================
*/

function finalizeAdministrationOutcome() {

    if (
        gameState.stateCrisis
    ) {

        gameState.administrationOutcome =
            "Your term ended with unresolved fiscal or institutional strain that weakened confidence in state government.";

        return;

    }


    if (
        gameState.trust >= 75 &&
        gameState.stability >= 75 &&
        gameState.legislature >= 65
    ) {

        gameState.administrationOutcome =
            "Your administration completed the term with strong public trust, workable legislative relationships, and a stable state government.";

        return;

    }


    if (
        gameState.trust >= 60 &&
        gameState.stability >= 60
    ) {

        gameState.administrationOutcome =
            "Your administration completed the term with generally stable state government, though several decisions created difficult fiscal and political tradeoffs.";

        return;

    }


    if (
        gameState.trust < 45 ||
        gameState.stability < 45
    ) {

        gameState.administrationOutcome =
            "Your term ended with significant strain on public confidence or state stability.";

        return;

    }


    gameState.administrationOutcome =
        "Your governorship produced a mixed record of accomplishments, compromise, fiscal pressure, and institutional consequences.";

}


/*
==================================================
CALCULATE GRADE
==================================================
*/

function calculateGrade() {

    const performanceAverage =
        (
            gameState.approval +
            gameState.legislature +
            gameState.trust +
            gameState.stability
        ) / 4;


    /*
    ----------------------------------------------
    ACCOMPLISHMENT BONUS
    ----------------------------------------------
    */

    const accomplishmentBonus =
        Math.min(
            8,
            (
                gameState.billsSigned *
                2
            ) +
            (
                gameState.majorActions *
                0.75
            )
        );


    /*
    ----------------------------------------------
    GOVERNING QUALITY
    ----------------------------------------------
    */

    const governingQuality =
        gameState.fiscalDiscipline +
        gameState.legislativeSkill +
        gameState.crisisLeadership +
        gameState.localPartnership +
        gameState.accountability;


    const governingBonus =
        Math.max(
            -10,
            Math.min(
                10,
                governingQuality
            )
        );


    /*
    ----------------------------------------------
    STATE CRISIS PENALTY
    ----------------------------------------------
    */

    const crisisPenalty =
        gameState.stateCrisis
            ? 12
            : 0;


    const finalScore =
        performanceAverage +
        accomplishmentBonus +
        governingBonus -
        crisisPenalty;


    if (
        finalScore >= 94
    ) {

        return "A+";

    }


    if (
        finalScore >= 88
    ) {

        return "A";

    }


    if (
        finalScore >= 82
    ) {

        return "A−";

    }


    if (
        finalScore >= 76
    ) {

        return "B+";

    }


    if (
        finalScore >= 70
    ) {

        return "B";

    }


    if (
        finalScore >= 64
    ) {

        return "B−";

    }


    if (
        finalScore >= 58
    ) {

        return "C+";

    }


    if (
        finalScore >= 52
    ) {

        return "C";

    }


    return "Needs Improvement";

}


/*
==================================================
FINAL MESSAGE
==================================================
*/

function getFinalPerformanceMessage(
    grade
) {

    const outcome =
        gameState.administrationOutcome;


    if (
        grade === "A+" ||
        grade === "A"
    ) {

        return (
            `Outstanding term. You balanced fiscal responsibility, legislative cooperation, emergency leadership, local partnerships, and public accountability with strong results. ${outcome}`
        );

    }


    if (
        grade === "A−" ||
        grade === "B+"
    ) {

        return (
            `Strong term. You managed major state responsibilities while maintaining generally effective relationships and institutional stability. ${outcome}`
        );

    }


    if (
        grade === "B" ||
        grade === "B−"
    ) {

        return (
            `Solid term. You achieved meaningful results, though some decisions reduced fiscal flexibility, legislative cooperation, or public confidence. ${outcome}`
        );

    }


    if (
        grade === "C+" ||
        grade === "C"
    ) {

        return (
            `Mixed term. Stronger fiscal planning, legislative negotiation, emergency coordination, local partnership, and accountability would improve a future administration. ${outcome}`
        );

    }


    return (
        `A difficult term. Review how budgeting, legislative relationships, crisis decisions, local government cooperation, federal-state relations, and accountability affected your governorship. ${outcome}`
    );

}


/*
==================================================
SHOW FINAL RESULTS
==================================================
*/

function showFinalResults() {

    finalizeAdministrationOutcome();


    if (
        gameScreen
    ) {

        gameScreen.hidden =
            true;

    }


    if (
        resultsScreen
    ) {

        resultsScreen.hidden =
            false;

    }


    const grade =
        calculateGrade();


    setText(
        "finalGovernorApproval",
        `${gameState.approval}%`
    );


    setText(
        "finalGovernorLegislature",
        `${gameState.legislature}%`
    );


    setText(
        "finalGovernorTrust",
        `${gameState.trust}%`
    );


    setText(
        "finalGovernorStability",
        `${gameState.stability}%`
    );


    setText(
        "finalGovernorBillsSigned",
        gameState.billsSigned
    );


    setText(
        "finalGovernorMajorActions",
        gameState.majorActions
    );


    setText(
        "governorFinalGrade",
        grade
    );


    const finalMessage =
        document.getElementById(
            "governorFinalMessage"
        );


    if (
        finalMessage
    ) {

        finalMessage.textContent =
            getFinalPerformanceMessage(
                grade
            );

    }


    saveSimulationRecord(
        grade
    );


    setText(
        "governorTermProgress",
        "100%"
    );


    resultsScreen
        ?.scrollIntoView(
            {

                behavior:
                    "smooth",

                block:
                    "start"

            }
        );

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

        /*
        ----------------------------------------------
        SIMULATION CENTER COMPATIBILITY
        ----------------------------------------------
        */

        window.localStorage.setItem(
            "civicGovernorSimulationCompleted",
            "true"
        );


        window.localStorage.setItem(
            "civicGovernorSimulationLastGrade",
            grade
        );


        const previousRuns =
            Number(
                window.localStorage.getItem(
                    "civicGovernorSimulationRuns"
                ) ||
                0
            );


        window.localStorage.setItem(
            "civicGovernorSimulationRuns",
            String(
                previousRuns +
                1
            )
        );


        /*
        ----------------------------------------------
        GOVERNOR RECORD
        ----------------------------------------------
        */

        window.localStorage.setItem(
            "civicGovernorSimulationLastOutcome",
            gameState.administrationOutcome
        );


        window.localStorage.setItem(
            "civicGovernorSimulationLastApproval",
            String(
                gameState.approval
            )
        );


        window.localStorage.setItem(
            "civicGovernorSimulationLastLegislature",
            String(
                gameState.legislature
            )
        );


        window.localStorage.setItem(
            "civicGovernorSimulationLastTrust",
            String(
                gameState.trust
            )
        );


        window.localStorage.setItem(
            "civicGovernorSimulationLastStability",
            String(
                gameState.stability
            )
        );


        window.localStorage.setItem(
            "civicGovernorSimulationLastStateCrisis",
            String(
                gameState.stateCrisis
            )
        );

    } catch (error) {

        console.warn(
            "Governor simulation record could not be saved:",
            error
        );

    }

}


/*
==================================================
RESET GAME STATE
==================================================
*/

function resetGameState() {

    gameState.approval =
        64;


    gameState.legislature =
        58;


    gameState.trust =
        68;


    gameState.stability =
        72;


    gameState.billsSigned =
        0;


    gameState.majorActions =
        0;


    gameState.fiscalDiscipline =
        0;


    gameState.legislativeSkill =
        0;


    gameState.crisisLeadership =
        0;


    gameState.localPartnership =
        0;


    gameState.accountability =
        0;


    gameState.budgetResult =
        "pending";


    gameState.educationResult =
        "pending";


    gameState.emergencyResult =
        "pending";


    gameState.infrastructureResult =
        "pending";


    gameState.legislatureResult =
        "pending";


    gameState.federalismResult =
        "pending";


    gameState.fiscalResult =
        "pending";


    gameState.stateCrisis =
        false;


    gameState.administrationOutcome =
        "Your term is still unfolding.";

}


/*
==================================================
RESET STATE NEWS
==================================================
*/

function resetNewsFeed(
    anotherTerm =
        false
) {

    if (
        !newsFeed
    ) {

        return;

    }


    newsFeed.innerHTML =
        "";


    const item =
        document.createElement(
            "div"
        );


    item.className =
        "governor-news-item";


    const label =
        document.createElement(
            "span"
        );


    label.textContent =
        "State Capitol";


    const headline =
        document.createElement(
            "p"
        );


    headline.textContent =
        anotherTerm
            ? "Governor begins another term in office."
            : "New governor begins first term.";


    item.append(
        label,
        headline
    );


    newsFeed.appendChild(
        item
    );

}


/*
==================================================
RESET SIMULATION
==================================================
*/

function resetSimulation() {

    resetGameState();

    resetSimulationFlow();


    currentScenarioIndex =
        0;


    decisionLocked =
        false;


    if (
        resultsScreen
    ) {

        resultsScreen.hidden =
            true;

    }


    if (
        startScreen
    ) {

        startScreen.hidden =
            true;

    }


    if (
        gameScreen
    ) {

        gameScreen.hidden =
            false;

    }


    resetNewsFeed(
        true
    );


    updateDashboard();

    renderScenario();


    gameScreen
        ?.scrollIntoView(
            {

                behavior:
                    "smooth",

                block:
                    "start"

            }
        );

}


/*
==================================================
START SIMULATION
==================================================
*/

function startSimulation() {

    resetGameState();

    resetSimulationFlow();


    currentScenarioIndex =
        0;


    decisionLocked =
        false;


    if (
        startScreen
    ) {

        startScreen.hidden =
            true;

    }


    if (
        gameScreen
    ) {

        gameScreen.hidden =
            false;

    }


    if (
        resultsScreen
    ) {

        resultsScreen.hidden =
            true;

    }


    resetNewsFeed(
        false
    );


    updateDashboard();

    renderScenario();


    gameScreen
        ?.scrollIntoView(
            {

                behavior:
                    "smooth",

                block:
                    "start"

            }
        );

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
                    String(
                        isOpen
                    )
                );


                menuButton.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );


                if (
                    !isOpen
                ) {

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


                    if (
                        !group
                    ) {

                        return;

                    }


                    const isOpen =
                        group.classList.contains(
                            "open"
                        );


                    closeDropdowns();


                    if (
                        !isOpen
                    ) {

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


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !==
                "Escape"
            ) {

                return;

            }


            closeDropdowns();


            if (
                navigation &&
                navigation.classList.contains(
                    "open"
                )
            ) {

                navigation.classList.remove(
                    "open"
                );


                menuButton?.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuButton?.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

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


                if (
                    button
                ) {

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

    return String(
        value
    )
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

async function initializeGovernorPage() {

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


    resetSimulationFlow();

    updateDashboard();

}


/*
==================================================
START
==================================================
*/

initializeGovernorPage();