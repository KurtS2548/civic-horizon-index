/*
==================================================
CIVIC HORIZON INDEX V2
PRESIDENT SIMULATION
BRANCHING EXECUTIVE LEADERSHIP ENGINE
==================================================
*/
import {

    saveSimulationCompletion

} from "./services/simulation-progress-service.js";

/*
==================================================
FOUNDATION SCENARIOS
==================================================
*/

const presidentScenarios = [

    /*
    ==================================================
    1. LEGISLATION
    ==================================================
    */

    {
        id:
            "infrastructureBill",

        category:
            "Legislation",

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

                approval:
                    -2,

                congress:
                    -9,

                trust:
                    -2,

                stability:
                    -2,

                billsSigned:
                    0,

                majorActions:
                    1,

                constitutionalRestraint:
                    0,

                legislativeSkill:
                    -2,

                crisisLeadership:
                    0,

                diplomaticCredibility:
                    0,

                accountability:
                    0,

                legislativeResult:
                    "vetoed",

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

                approval:
                    5,

                congress:
                    6,

                trust:
                    5,

                stability:
                    4,

                billsSigned:
                    1,

                majorActions:
                    1,

                constitutionalRestraint:
                    1,

                legislativeSkill:
                    3,

                crisisLeadership:
                    0,

                diplomaticCredibility:
                    0,

                accountability:
                    1,

                legislativeResult:
                    "signed",

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

                approval:
                    -1,

                congress:
                    -5,

                trust:
                    -1,

                stability:
                    -2,

                billsSigned:
                    0,

                majorActions:
                    0,

                constitutionalRestraint:
                    1,

                legislativeSkill:
                    -1,

                crisisLeadership:
                    0,

                diplomaticCredibility:
                    0,

                accountability:
                    0,

                legislativeResult:
                    "stalled",

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

                approval:
                    -7,

                congress:
                    -7,

                trust:
                    -8,

                stability:
                    -4,

                billsSigned:
                    0,

                majorActions:
                    0,

                constitutionalRestraint:
                    0,

                legislativeSkill:
                    -3,

                crisisLeadership:
                    0,

                diplomaticCredibility:
                    0,

                accountability:
                    -2,

                legislativeResult:
                    "ignored",

                headline:
                    "Lawmakers criticize White House silence on infrastructure bill."
            }

        ]

    },


    /*
    ==================================================
    2. SUPREME COURT APPOINTMENT
    ==================================================
    */

    {
        id:
            "courtAppointment",

        category:
            "Appointments",

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

                approval:
                    0,

                congress:
                    -5,

                trust:
                    -10,

                stability:
                    -3,

                billsSigned:
                    0,

                majorActions:
                    1,

                constitutionalRestraint:
                    -1,

                legislativeSkill:
                    -1,

                crisisLeadership:
                    0,

                diplomaticCredibility:
                    0,

                accountability:
                    -1,

                appointmentResult:
                    "controversial",

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

                approval:
                    -4,

                congress:
                    -3,

                trust:
                    -6,

                stability:
                    -5,

                billsSigned:
                    0,

                majorActions:
                    0,

                constitutionalRestraint:
                    0,

                legislativeSkill:
                    -1,

                crisisLeadership:
                    0,

                diplomaticCredibility:
                    0,

                accountability:
                    -1,

                appointmentResult:
                    "vacant",

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

                approval:
                    3,

                congress:
                    7,

                trust:
                    7,

                stability:
                    3,

                billsSigned:
                    0,

                majorActions:
                    1,

                constitutionalRestraint:
                    2,

                legislativeSkill:
                    2,

                crisisLeadership:
                    0,

                diplomaticCredibility:
                    0,

                accountability:
                    1,

                appointmentResult:
                    "credible",

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

                approval:
                    -2,

                congress:
                    -8,

                trust:
                    -5,

                stability:
                    -2,

                billsSigned:
                    0,

                majorActions:
                    0,

                constitutionalRestraint:
                    -2,

                legislativeSkill:
                    -2,

                crisisLeadership:
                    0,

                diplomaticCredibility:
                    0,

                accountability:
                    -1,

                appointmentResult:
                    "conflict",

                headline:
                    "Confirmation dispute escalates before nominee is announced."
            }

        ]

    },


    /*
    ==================================================
    3. HURRICANE
    ==================================================
    */

    {
        id:
            "hurricane",

        category:
            "Emergency Response",

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

                approval:
                    -6,

                congress:
                    -2,

                trust:
                    -7,

                stability:
                    -9,

                billsSigned:
                    0,

                majorActions:
                    1,

                constitutionalRestraint:
                    0,

                legislativeSkill:
                    0,

                crisisLeadership:
                    -3,

                diplomaticCredibility:
                    0,

                accountability:
                    -1,

                emergencyResult:
                    "poor",

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

                approval:
                    7,

                congress:
                    3,

                trust:
                    8,

                stability:
                    10,

                billsSigned:
                    0,

                majorActions:
                    1,

                constitutionalRestraint:
                    2,

                legislativeSkill:
                    0,

                crisisLeadership:
                    4,

                diplomaticCredibility:
                    0,

                accountability:
                    1,

                emergencyResult:
                    "strong",

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

                approval:
                    -8,

                congress:
                    -4,

                trust:
                    -8,

                stability:
                    -11,

                billsSigned:
                    0,

                majorActions:
                    0,

                constitutionalRestraint:
                    0,

                legislativeSkill:
                    0,

                crisisLeadership:
                    -4,

                diplomaticCredibility:
                    0,

                accountability:
                    -1,

                emergencyResult:
                    "weak",

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

                approval:
                    -3,

                congress:
                    -3,

                trust:
                    -5,

                stability:
                    -5,

                billsSigned:
                    0,

                majorActions:
                    1,

                constitutionalRestraint:
                    -2,

                legislativeSkill:
                    0,

                crisisLeadership:
                    -1,

                diplomaticCredibility:
                    0,

                accountability:
                    0,

                emergencyResult:
                    "overreach",

                headline:
                    "Questions arise over federal role in local disaster operations."
            }

        ]

    },


    /*
    ==================================================
    4. EXECUTIVE AUTHORITY
    ==================================================
    */

    {
        id:
            "executiveAuthority",

        category:
            "Executive Authority",

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

                approval:
                    -3,

                congress:
                    -10,

                trust:
                    -12,

                stability:
                    -7,

                billsSigned:
                    0,

                majorActions:
                    1,

                constitutionalRestraint:
                    -4,

                legislativeSkill:
                    -1,

                crisisLeadership:
                    0,

                diplomaticCredibility:
                    0,

                accountability:
                    -2,

                executivePowerResult:
                    "overreach",

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

                approval:
                    -4,

                congress:
                    1,

                trust:
                    -2,

                stability:
                    -3,

                billsSigned:
                    0,

                majorActions:
                    0,

                constitutionalRestraint:
                    1,

                legislativeSkill:
                    -1,

                crisisLeadership:
                    0,

                diplomaticCredibility:
                    0,

                accountability:
                    0,

                executivePowerResult:
                    "underuse",

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

                approval:
                    -5,

                congress:
                    -10,

                trust:
                    -14,

                stability:
                    -9,

                billsSigned:
                    0,

                majorActions:
                    1,

                constitutionalRestraint:
                    -5,

                legislativeSkill:
                    -2,

                crisisLeadership:
                    0,

                diplomaticCredibility:
                    0,

                accountability:
                    -3,

                executivePowerResult:
                    "illegal",

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

                approval:
                    3,

                congress:
                    -1,

                trust:
                    7,

                stability:
                    4,

                billsSigned:
                    0,

                majorActions:
                    1,

                constitutionalRestraint:
                    4,

                legislativeSkill:
                    1,

                crisisLeadership:
                    0,

                diplomaticCredibility:
                    0,

                accountability:
                    1,

                executivePowerResult:
                    "lawful",

                headline:
                    "President issues targeted executive order under existing authority."
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

    approval:
        62,

    congress:
        55,

    trust:
        68,

    stability:
        70,

    billsSigned:
        0,

    majorActions:
        0,


    /*
    ----------------------------------------------
    HIDDEN LEADERSHIP METRICS
    ----------------------------------------------
    */

    constitutionalRestraint:
        0,

    legislativeSkill:
        0,

    crisisLeadership:
        0,

    diplomaticCredibility:
        0,

    accountability:
        0,


    /*
    ----------------------------------------------
    BRANCHING RESULTS
    ----------------------------------------------
    */

    legislativeResult:
        "pending",

    appointmentResult:
        "pending",

    emergencyResult:
        "pending",

    executivePowerResult:
        "pending",

    foreignPolicyResult:
        "pending",

    budgetResult:
        "pending",

    oversightResult:
        "pending",

    constitutionalCrisis:
        false,

    administrationOutcome:
        "Your presidency is still unfolding."

};


/*
==================================================
INITIAL SIMULATION FLOW
==================================================
*/

let simulationFlow = [

    presidentScenarios[0],

    presidentScenarios[1],

    presidentScenarios[2],

    presidentScenarios[3]

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
FOREIGN POLICY — STABLE ADMINISTRATION
==================================================
*/

const foreignPolicyStableScenario = {

    id:
        "foreignPolicyStable",

    category:
        "Foreign Policy",

    title:
        "A close ally faces a sudden international crisis.",

    text:
        "Your administration has maintained reasonable stability at home. How do you respond abroad?",

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

            approval:
                5,

            congress:
                2,

            trust:
                7,

            stability:
                8,

            billsSigned:
                0,

            majorActions:
                1,

            constitutionalRestraint:
                2,

            legislativeSkill:
                0,

            crisisLeadership:
                2,

            diplomaticCredibility:
                4,

            accountability:
                1,

            foreignPolicyResult:
                "coordinated",

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

            approval:
                -3,

            congress:
                -5,

            trust:
                -6,

            stability:
                -8,

            billsSigned:
                0,

            majorActions:
                1,

            constitutionalRestraint:
                -2,

            legislativeSkill:
                0,

            crisisLeadership:
                -2,

            diplomaticCredibility:
                -3,

            accountability:
                -1,

            foreignPolicyResult:
                "reckless",

            headline:
                "Questions grow over rapid White House military announcement."
        },

        {
            text:
                "Ignore the crisis because it is outside the United States",

            outcomeTitle:
                "Allied confidence falls",

            outcomeText:
                "Not every crisis requires U.S. intervention, but refusing even to assess its implications damages allied confidence.",

            approval:
                -4,

            congress:
                -1,

            trust:
                -4,

            stability:
                -6,

            billsSigned:
                0,

            majorActions:
                0,

            constitutionalRestraint:
                0,

            legislativeSkill:
                0,

            crisisLeadership:
                -2,

            diplomaticCredibility:
                -4,

            accountability:
                -1,

            foreignPolicyResult:
                "withdrawn",

            headline:
                "Allies seek clarity after limited U.S. response to crisis."
        },

        {
            text:
                "Promise every requested action without considering consequences",

            outcomeTitle:
                "Commitments expand quickly",

            outcomeText:
                "The broad promises reassure some allies but create uncertainty over resources, legal authority, and long-term obligations.",

            approval:
                0,

            congress:
                -4,

            trust:
                -3,

            stability:
                -5,

            billsSigned:
                0,

            majorActions:
                1,

            constitutionalRestraint:
                -1,

            legislativeSkill:
                0,

            crisisLeadership:
                -1,

            diplomaticCredibility:
                -2,

            accountability:
                -1,

            foreignPolicyResult:
                "overcommitted",

            headline:
                "Administration faces questions over sweeping international commitments."
        }

    ]

};


/*
==================================================
FOREIGN POLICY — FRAGILE ADMINISTRATION
==================================================
*/

const foreignPolicyFragileScenario = {

    id:
        "foreignPolicyFragile",

    category:
        "Foreign Policy Crisis",

    title:
        "An international crisis erupts while confidence in your administration is already strained.",

    text:
        "Your advisers warn that a poorly handled foreign-policy decision could deepen instability at home. What do you do?",

    stage:
        "Foreign Affairs Under Pressure",

    choices: [

        {
            text:
                "Slow the process down and require intelligence, legal, and allied review",

            outcomeTitle:
                "The deliberate process steadies the administration",

            outcomeText:
                "The slower response draws some criticism, but the disciplined process reduces the risk of a larger mistake.",

            approval:
                1,

            congress:
                2,

            trust:
                7,

            stability:
                7,

            billsSigned:
                0,

            majorActions:
                1,

            constitutionalRestraint:
                3,

            legislativeSkill:
                0,

            crisisLeadership:
                3,

            diplomaticCredibility:
                3,

            accountability:
                2,

            foreignPolicyResult:
                "stabilized",

            headline:
                "White House adopts deliberate international crisis process amid domestic pressure."
        },

        {
            text:
                "Take dramatic unilateral action to project strength",

            outcomeTitle:
                "The gamble deepens uncertainty",

            outcomeText:
                "The move dominates the news, but weak consultation and unclear legal footing further damage confidence.",

            approval:
                -2,

            congress:
                -7,

            trust:
                -9,

            stability:
                -10,

            billsSigned:
                0,

            majorActions:
                1,

            constitutionalRestraint:
                -3,

            legislativeSkill:
                0,

            crisisLeadership:
                -3,

            diplomaticCredibility:
                -3,

            accountability:
                -2,

            foreignPolicyResult:
                "escalated",

            headline:
                "Unilateral foreign-policy move intensifies concern over White House decision-making."
        },

        {
            text:
                "Ask Congress for formal support before taking major action",

            outcomeTitle:
                "The process becomes slower but more legitimate",

            outcomeText:
                "Debate takes time, but broader institutional participation improves legitimacy and political durability.",

            approval:
                0,

            congress:
                7,

            trust:
                8,

            stability:
                5,

            billsSigned:
                0,

            majorActions:
                1,

            constitutionalRestraint:
                4,

            legislativeSkill:
                2,

            crisisLeadership:
                1,

            diplomaticCredibility:
                2,

            accountability:
                2,

            foreignPolicyResult:
                "sharedAuthority",

            headline:
                "President seeks congressional backing for major international response."
        },

        {
            text:
                "Avoid making any decision and hope the crisis resolves itself",

            outcomeTitle:
                "The vacuum creates more instability",

            outcomeText:
                "Delay without a process leaves allies, Congress, and the public uncertain about U.S. intentions.",

            approval:
                -6,

            congress:
                -2,

            trust:
                -6,

            stability:
                -8,

            billsSigned:
                0,

            majorActions:
                0,

            constitutionalRestraint:
                0,

            legislativeSkill:
                -1,

            crisisLeadership:
                -4,

            diplomaticCredibility:
                -4,

            accountability:
                -2,

            foreignPolicyResult:
                "paralyzed",

            headline:
                "Allies and lawmakers question White House inaction during international crisis."
        }

    ]

};


/*
==================================================
BUDGET — COOPERATIVE PATH
==================================================
*/

const budgetCooperativeScenario = {

    id:
        "budgetCooperative",

    category:
        "Budget Negotiation",

    title:
        "Congress and the White House are approaching a major budget deadline.",

    text:
        "Your relationship with Congress remains workable. How do you use that advantage?",

    stage:
        "Budget Negotiation",

    choices: [

        {
            text:
                "Meet with congressional leaders and negotiate a workable compromise",

            outcomeTitle:
                "A budget agreement becomes possible",

            outcomeText:
                "Neither side gets everything it wants, but negotiations reduce the risk of disruption.",

            approval:
                4,

            congress:
                9,

            trust:
                6,

            stability:
                8,

            billsSigned:
                1,

            majorActions:
                1,

            constitutionalRestraint:
                2,

            legislativeSkill:
                4,

            crisisLeadership:
                1,

            diplomaticCredibility:
                0,

            accountability:
                1,

            budgetResult:
                "agreement",

            headline:
                "White House and congressional leaders reach budget framework."
        },

        {
            text:
                "Use the deadline to demand every major administration priority",

            outcomeTitle:
                "The cooperative atmosphere deteriorates",

            outcomeText:
                "The strategy may produce some concessions, but lawmakers begin to question whether negotiations are being conducted in good faith.",

            approval:
                -1,

            congress:
                -6,

            trust:
                -4,

            stability:
                -5,

            billsSigned:
                0,

            majorActions:
                0,

            constitutionalRestraint:
                0,

            legislativeSkill:
                -2,

            crisisLeadership:
                -1,

            diplomaticCredibility:
                0,

            accountability:
                -1,

            budgetResult:
                "stalled",

            headline:
                "Budget talks weaken as White House presses broad last-minute demands."
        },

        {
            text:
                "Accept a temporary funding measure while negotiations continue",

            outcomeTitle:
                "You avoid immediate disruption",

            outcomeText:
                "The short-term agreement does not solve every dispute, but it creates more time for a durable budget deal.",

            approval:
                2,

            congress:
                5,

            trust:
                4,

            stability:
                6,

            billsSigned:
                1,

            majorActions:
                1,

            constitutionalRestraint:
                2,

            legislativeSkill:
                3,

            crisisLeadership:
                1,

            diplomaticCredibility:
                0,

            accountability:
                1,

            budgetResult:
                "temporary",

            headline:
                "President signs temporary funding measure as budget negotiations continue."
        },

        {
            text:
                "Refuse to negotiate and allow the deadline to pass",

            outcomeTitle:
                "The funding breakdown begins",

            outcomeText:
                "The decision turns a manageable disagreement into a broader governance crisis.",

            approval:
                -6,

            congress:
                -9,

            trust:
                -8,

            stability:
                -10,

            billsSigned:
                0,

            majorActions:
                0,

            constitutionalRestraint:
                0,

            legislativeSkill:
                -4,

            crisisLeadership:
                -3,

            diplomaticCredibility:
                0,

            accountability:
                -2,

            budgetResult:
                "shutdown",

            headline:
                "Federal funding lapses after White House and Congress fail to reach agreement."
        }

    ]

};


/*
==================================================
BUDGET — HOSTILE PATH
==================================================
*/

const budgetHostileScenario = {

    id:
        "budgetHostile",

    category:
        "Budget Crisis",

    title:
        "Budget negotiations begin with relations between the White House and Congress already badly damaged.",

    text:
        "A funding deadline is approaching quickly. What do you do?",

    stage:
        "Budget Crisis",

    choices: [

        {
            text:
                "Invite leaders from both parties to restart negotiations",

            outcomeTitle:
                "Communication reopens",

            outcomeText:
                "The meeting does not erase earlier conflict, but it creates a realistic path toward avoiding a shutdown.",

            approval:
                2,

            congress:
                8,

            trust:
                6,

            stability:
                6,

            billsSigned:
                0,

            majorActions:
                1,

            constitutionalRestraint:
                2,

            legislativeSkill:
                4,

            crisisLeadership:
                2,

            diplomaticCredibility:
                0,

            accountability:
                2,

            budgetResult:
                "recovery",

            headline:
                "White House reopens bipartisan budget talks ahead of funding deadline."
        },

        {
            text:
                "Declare that Congress alone will be responsible for any shutdown",

            outcomeTitle:
                "The blame strategy hardens positions",

            outcomeText:
                "Public messaging intensifies, but substantive negotiations become even more difficult.",

            approval:
                -1,

            congress:
                -8,

            trust:
                -5,

            stability:
                -7,

            billsSigned:
                0,

            majorActions:
                0,

            constitutionalRestraint:
                0,

            legislativeSkill:
                -3,

            crisisLeadership:
                -2,

            diplomaticCredibility:
                0,

            accountability:
                -3,

            budgetResult:
                "stalled",

            headline:
                "White House and Congress trade blame as shutdown deadline approaches."
        },

        {
            text:
                "Support a narrow temporary funding bill",

            outcomeTitle:
                "You prevent immediate disruption",

            outcomeText:
                "The underlying conflict remains, but federal operations continue while negotiations resume.",

            approval:
                1,

            congress:
                4,

            trust:
                5,

            stability:
                7,

            billsSigned:
                1,

            majorActions:
                1,

            constitutionalRestraint:
                2,

            legislativeSkill:
                3,

            crisisLeadership:
                2,

            diplomaticCredibility:
                0,

            accountability:
                1,

            budgetResult:
                "temporary",

            headline:
                "Temporary spending bill prevents shutdown despite strained White House relations."
        },

        {
            text:
                "Claim the president can spend federal money without congressional appropriations",

            outcomeTitle:
                "A constitutional dispute erupts",

            outcomeText:
                "Congress controls appropriations, and the claim creates a serious institutional confrontation.",

            approval:
                -5,

            congress:
                -14,

            trust:
                -12,

            stability:
                -10,

            billsSigned:
                0,

            majorActions:
                1,

            constitutionalRestraint:
                -5,

            legislativeSkill:
                -3,

            crisisLeadership:
                -3,

            diplomaticCredibility:
                0,

            accountability:
                -3,

            budgetResult:
                "constitutionalConflict",

            constitutionalCrisis:
                true,

            headline:
                "Budget dispute becomes constitutional confrontation over presidential spending authority."
        }

    ]

};


/*
==================================================
OVERSIGHT — NORMAL PATH
==================================================
*/

const oversightNormalScenario = {

    id:
        "oversightNormal",

    category:
        "Congressional Oversight",

    title:
        "A congressional committee requests records from an executive agency.",

    text:
        "Your advisers disagree over how cooperative the administration should be. What do you do?",

    stage:
        "Oversight",

    choices: [

        {
            text:
                "Provide responsive information while reviewing legitimate confidentiality concerns",

            outcomeTitle:
                "Oversight proceeds with negotiation",

            outcomeText:
                "The administration protects appropriate interests while recognizing Congress's oversight role.",

            approval:
                3,

            congress:
                7,

            trust:
                9,

            stability:
                4,

            billsSigned:
                0,

            majorActions:
                1,

            constitutionalRestraint:
                4,

            legislativeSkill:
                2,

            crisisLeadership:
                0,

            diplomaticCredibility:
                0,

            accountability:
                4,

            oversightResult:
                "cooperative",

            headline:
                "White House and congressional committee negotiate oversight request."
        },

        {
            text:
                "Refuse every request and declare Congress has no oversight authority",

            outcomeTitle:
                "The conflict escalates",

            outcomeText:
                "Congress has significant oversight responsibilities, though legitimate executive confidentiality interests can also arise.",

            approval:
                -4,

            congress:
                -12,

            trust:
                -10,

            stability:
                -6,

            billsSigned:
                0,

            majorActions:
                1,

            constitutionalRestraint:
                -4,

            legislativeSkill:
                -2,

            crisisLeadership:
                -1,

            diplomaticCredibility:
                0,

            accountability:
                -4,

            oversightResult:
                "defiant",

            headline:
                "Oversight dispute deepens between Congress and White House."
        },

        {
            text:
                "Release every sensitive record publicly without review",

            outcomeTitle:
                "Transparency creates new risks",

            outcomeText:
                "Oversight cooperation matters, but lawful confidentiality and national-security concerns may require careful handling.",

            approval:
                -1,

            congress:
                2,

            trust:
                -4,

            stability:
                -6,

            billsSigned:
                0,

            majorActions:
                1,

            constitutionalRestraint:
                -1,

            legislativeSkill:
                0,

            crisisLeadership:
                -1,

            diplomaticCredibility:
                -1,

            accountability:
                1,

            oversightResult:
                "recklessDisclosure",

            headline:
                "Sensitive records release raises new security and privacy concerns."
        },

        {
            text:
                "Destroy the requested records",

            outcomeTitle:
                "A serious institutional crisis develops",

            outcomeText:
                "Destroying records to frustrate lawful oversight creates severe legal and public-trust consequences.",

            approval:
                -12,

            congress:
                -15,

            trust:
                -18,

            stability:
                -12,

            billsSigned:
                0,

            majorActions:
                1,

            constitutionalRestraint:
                -6,

            legislativeSkill:
                -3,

            crisisLeadership:
                -2,

            diplomaticCredibility:
                -1,

            accountability:
                -6,

            oversightResult:
                "recordsDestroyed",

            constitutionalCrisis:
                true,

            headline:
                "Administration faces major controversy over missing federal records."
        }

    ]

};


/*
==================================================
OVERSIGHT — CRISIS PATH
==================================================
*/

const oversightCrisisScenario = {

    id:
        "oversightCrisis",

    category:
        "Constitutional Crisis",

    title:
        "Congress launches an aggressive oversight investigation after repeated conflicts with your administration.",

    text:
        "Public trust is already strained. How do you respond?",

    stage:
        "Institutional Confrontation",

    choices: [

        {
            text:
                "Negotiate document access and allow lawful testimony",

            outcomeTitle:
                "The confrontation begins to cool",

            outcomeText:
                "The investigation continues, but cooperation reduces the risk of a deeper constitutional breakdown.",

            approval:
                1,

            congress:
                8,

            trust:
                10,

            stability:
                8,

            billsSigned:
                0,

            majorActions:
                1,

            constitutionalRestraint:
                5,

            legislativeSkill:
                2,

            crisisLeadership:
                3,

            diplomaticCredibility:
                0,

            accountability:
                5,

            oversightResult:
                "crisisManaged",

            constitutionalCrisis:
                false,

            headline:
                "White House and Congress reach oversight accommodation amid constitutional tensions."
        },

        {
            text:
                "Challenge disputed demands in court while complying with others",

            outcomeTitle:
                "The dispute moves into constitutional channels",

            outcomeText:
                "The conflict remains serious, but the administration uses legal review rather than simply rejecting institutional limits.",

            approval:
                0,

            congress:
                2,

            trust:
                6,

            stability:
                5,

            billsSigned:
                0,

            majorActions:
                1,

            constitutionalRestraint:
                4,

            legislativeSkill:
                1,

            crisisLeadership:
                2,

            diplomaticCredibility:
                0,

            accountability:
                3,

            oversightResult:
                "judicialReview",

            constitutionalCrisis:
                false,

            headline:
                "White House seeks judicial review of disputed congressional oversight demands."
        },

        {
            text:
                "Order the executive branch to ignore all congressional subpoenas",

            outcomeTitle:
                "The constitutional crisis deepens",

            outcomeText:
                "The blanket refusal intensifies conflict over separation of powers and accountability.",

            approval:
                -6,

            congress:
                -15,

            trust:
                -14,

            stability:
                -12,

            billsSigned:
                0,

            majorActions:
                1,

            constitutionalRestraint:
                -6,

            legislativeSkill:
                -4,

            crisisLeadership:
                -4,

            diplomaticCredibility:
                -1,

            accountability:
                -6,

            oversightResult:
                "crisisDeepened",

            constitutionalCrisis:
                true,

            headline:
                "White House blanket subpoena refusal intensifies constitutional confrontation."
        },

        {
            text:
                "Attack investigators personally and refuse to discuss the underlying issues",

            outcomeTitle:
                "Institutional confidence falls further",

            outcomeText:
                "The strategy shifts attention away from the legal dispute but does little to resolve it.",

            approval:
                -4,

            congress:
                -10,

            trust:
                -11,

            stability:
                -9,

            billsSigned:
                0,

            majorActions:
                0,

            constitutionalRestraint:
                -3,

            legislativeSkill:
                -3,

            crisisLeadership:
                -3,

            diplomaticCredibility:
                0,

            accountability:
                -5,

            oversightResult:
                "politicized",

            constitutionalCrisis:
                true,

            headline:
                "Personal attacks dominate escalating White House oversight dispute."
        }

    ]

};


/*
==================================================
ACCOUNTABILITY — STABLE TERM
==================================================
*/

const accountabilityStableScenario = {

    id:
        "accountabilityStable",

    category:
        "Public Accountability",

    title:
        "Your term is nearing its end.",

    text:
        "The public wants an accounting of your administration's achievements, compromises, and mistakes. How do you respond?",

    stage:
        "End of Term",

    choices: [

        {
            text:
                "Deliver a detailed public address covering successes and setbacks",

            outcomeTitle:
                "The administration closes with transparency",

            outcomeText:
                "Acknowledging both accomplishments and limitations strengthens the credibility of the final public record.",

            approval:
                5,

            congress:
                2,

            trust:
                10,

            stability:
                5,

            billsSigned:
                0,

            majorActions:
                0,

            constitutionalRestraint:
                1,

            legislativeSkill:
                0,

            crisisLeadership:
                0,

            diplomaticCredibility:
                0,

            accountability:
                5,

            headline:
                "President delivers detailed end-of-term public report."
        },

        {
            text:
                "Take credit for every success and blame others for every failure",

            outcomeTitle:
                "The message energizes supporters but divides the public",

            outcomeText:
                "The approach avoids admitting mistakes, but it weakens the credibility of the final record.",

            approval:
                0,

            congress:
                -3,

            trust:
                -7,

            stability:
                -4,

            billsSigned:
                0,

            majorActions:
                0,

            constitutionalRestraint:
                0,

            legislativeSkill:
                0,

            crisisLeadership:
                0,

            diplomaticCredibility:
                0,

            accountability:
                -4,

            headline:
                "End-of-term presidential address draws criticism over accountability."
        },

        {
            text:
                "Release a written administration report and hold a press conference",

            outcomeTitle:
                "The record receives sustained scrutiny",

            outcomeText:
                "The administration gives the public and institutions a detailed record that can be examined beyond a single speech.",

            approval:
                3,

            congress:
                2,

            trust:
                9,

            stability:
                4,

            billsSigned:
                0,

            majorActions:
                0,

            constitutionalRestraint:
                1,

            legislativeSkill:
                0,

            crisisLeadership:
                0,

            diplomaticCredibility:
                0,

            accountability:
                5,

            headline:
                "White House releases comprehensive end-of-term administration report."
        },

        {
            text:
                "Avoid questions and communicate only through campaign advertising",

            outcomeTitle:
                "Public trust weakens",

            outcomeText:
                "The strategy may reinforce supporters, but it provides little accountability for the administration's record.",

            approval:
                -5,

            congress:
                -1,

            trust:
                -10,

            stability:
                -3,

            billsSigned:
                0,

            majorActions:
                0,

            constitutionalRestraint:
                0,

            legislativeSkill:
                0,

            crisisLeadership:
                0,

            diplomaticCredibility:
                0,

            accountability:
                -5,

            headline:
                "Critics question limited presidential access at end of term."
        }

    ]

};


/*
==================================================
ACCOUNTABILITY — CRISIS TERM
==================================================
*/

const accountabilityCrisisScenario = {

    id:
        "accountabilityCrisis",

    category:
        "Public Accountability",

    title:
        "Your term ends after a period of serious institutional conflict.",

    text:
        "Public confidence has been tested. How do you account for the administration's record?",

    stage:
        "End-of-Term Reckoning",

    choices: [

        {
            text:
                "Acknowledge mistakes and explain what constitutional limits required",

            outcomeTitle:
                "The admission begins rebuilding trust",

            outcomeText:
                "The administration cannot erase the conflict, but accepting responsibility improves the credibility of the final record.",

            approval:
                1,

            congress:
                3,

            trust:
                10,

            stability:
                7,

            billsSigned:
                0,

            majorActions:
                0,

            constitutionalRestraint:
                3,

            legislativeSkill:
                0,

            crisisLeadership:
                2,

            diplomaticCredibility:
                0,

            accountability:
                6,

            headline:
                "President acknowledges mistakes in end-of-term constitutional review."
        },

        {
            text:
                "Defend every administration action without qualification",

            outcomeTitle:
                "The conflict remains unresolved",

            outcomeText:
                "The uncompromising defense satisfies some supporters but leaves institutional concerns largely unanswered.",

            approval:
                -1,

            congress:
                -6,

            trust:
                -8,

            stability:
                -6,

            billsSigned:
                0,

            majorActions:
                0,

            constitutionalRestraint:
                -2,

            legislativeSkill:
                0,

            crisisLeadership:
                -2,

            diplomaticCredibility:
                0,

            accountability:
                -5,

            headline:
                "President rejects criticism in final address after institutional conflict."
        },

        {
            text:
                "Publish a full record and permit independent review",

            outcomeTitle:
                "Transparency improves the historical record",

            outcomeText:
                "The review may expose mistakes, but it strengthens accountability and institutional confidence.",

            approval:
                2,

            congress:
                4,

            trust:
                11,

            stability:
                6,

            billsSigned:
                0,

            majorActions:
                0,

            constitutionalRestraint:
                3,

            legislativeSkill:
                0,

            crisisLeadership:
                1,

            diplomaticCredibility:
                0,

            accountability:
                7,

            headline:
                "White House opens administration record to independent end-of-term review."
        },

        {
            text:
                "Refuse to discuss the administration's record",

            outcomeTitle:
                "Questions remain unanswered",

            outcomeText:
                "The lack of explanation leaves the public and other institutions with less clarity about major decisions.",

            approval:
                -7,

            congress:
                -3,

            trust:
                -12,

            stability:
                -6,

            billsSigned:
                0,

            majorActions:
                0,

            constitutionalRestraint:
                -1,

            legislativeSkill:
                0,

            crisisLeadership:
                -2,

            diplomaticCredibility:
                0,

            accountability:
                -6,

            headline:
                "White House declines end-of-term review after constitutional disputes."
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


    if (
        !container
    ) {

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

            presidentScenarios[0],

            presidentScenarios[1],

            presidentScenarios[2],

            presidentScenarios[3]

        ];

}


/*
==================================================
ESTIMATED TERM LENGTH
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
        "presidentTermProgress",
        `${progress}%`
    );

}


/*
==================================================
SELECT FOREIGN POLICY PATH
==================================================
*/

function determineForeignPolicyScenario() {

    const administrationStrength =
        (
            gameState.trust +
            gameState.stability
        ) / 2;


    const leadershipStrength =
        (
            gameState.crisisLeadership * 3
        ) +
        (
            gameState.constitutionalRestraint * 2
        );


    if (
        administrationStrength +
        leadershipStrength >=
        68
    ) {

        return foreignPolicyStableScenario;

    }


    return foreignPolicyFragileScenario;

}


/*
==================================================
SELECT BUDGET PATH
==================================================
*/

function determineBudgetScenario() {

    const cooperationScore =
        gameState.congress +
        (
            gameState.legislativeSkill * 4
        );


    if (
        cooperationScore >=
        62
    ) {

        return budgetCooperativeScenario;

    }


    return budgetHostileScenario;

}


/*
==================================================
SELECT OVERSIGHT PATH
==================================================
*/

function determineOversightScenario() {

    const institutionalRisk =
        (
            gameState.trust <
            45
        ) ||
        (
            gameState.constitutionalRestraint <=
            -4
        ) ||
        gameState.constitutionalCrisis ===
            true;


    if (
        institutionalRisk
    ) {

        return oversightCrisisScenario;

    }


    return oversightNormalScenario;

}


/*
==================================================
SELECT ACCOUNTABILITY PATH
==================================================
*/

function determineAccountabilityScenario() {

    if (
        gameState.constitutionalCrisis ||
        gameState.trust <
            45 ||
        gameState.accountability <=
            -4
    ) {

        return accountabilityCrisisScenario;

    }


    return accountabilityStableScenario;

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
        "presidentTurnLabel",
        `Month ${1 + currentScenarioIndex * 6}`
    );


    setText(
        "presidentCurrentStage",
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
                            class="president-choice-button"
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
CHOICE PROCESSING
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
        scenario,
        choice
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
APPLY EFFECTS
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


    gameState.congress +=
        Number(
            choice.congress ||
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


    gameState.constitutionalRestraint +=
        Number(
            choice.constitutionalRestraint ||
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


    gameState.diplomaticCredibility +=
        Number(
            choice.diplomaticCredibility ||
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
STATE FLAGS
==================================================
*/

function updateStateFromChoice(
    choice
) {

    const stateProperties = [

        "legislativeResult",

        "appointmentResult",

        "emergencyResult",

        "executivePowerResult",

        "foreignPolicyResult",

        "budgetResult",

        "oversightResult"

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
        typeof choice.constitutionalCrisis ===
        "boolean"
    ) {

        gameState.constitutionalCrisis =
            choice.constitutionalCrisis;

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
            choice.congress ||
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

    if (
        scenario.id ===
        "executiveAuthority"
    ) {

        appendScenarioIfMissing(
            determineForeignPolicyScenario()
        );


        return;

    }


    if (
        scenario.id ===
            "foreignPolicyStable" ||
        scenario.id ===
            "foreignPolicyFragile"
    ) {

        appendScenarioIfMissing(
            determineBudgetScenario()
        );


        return;

    }


    if (
        scenario.id ===
            "budgetCooperative" ||
        scenario.id ===
            "budgetHostile"
    ) {

        appendScenarioIfMissing(
            determineOversightScenario()
        );


        return;

    }


    if (
        scenario.id ===
            "oversightNormal" ||
        scenario.id ===
            "oversightCrisis"
    ) {

        appendScenarioIfMissing(
            determineAccountabilityScenario()
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


    const alreadyExists =
        simulationFlow.some(
            item =>
                item.id ===
                scenario.id
        );


    if (
        alreadyExists
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
            "accountabilityStable" ||
        scenario.id ===
            "accountabilityCrisis"
    );

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

    if (
        !newsFeed
    ) {

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
        String(
            category ||
            "White House"
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
            "presidentScenarioCard"
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
        gameState.constitutionalCrisis
    ) {

        gameState.administrationOutcome =
            "Your term ended with unresolved constitutional conflict and weakened institutional confidence.";

        return;

    }


    if (
        gameState.trust >= 75 &&
        gameState.stability >= 75 &&
        gameState.congress >= 65
    ) {

        gameState.administrationOutcome =
            "Your administration completed the term with strong institutional trust, workable congressional relationships, and national stability.";

        return;

    }


    if (
        gameState.trust >= 60 &&
        gameState.stability >= 60
    ) {

        gameState.administrationOutcome =
            "Your administration completed the term with generally stable institutions, though several decisions created political or governing tradeoffs.";

        return;

    }


    if (
        gameState.trust < 45 ||
        gameState.stability < 45
    ) {

        gameState.administrationOutcome =
            "Your term ended with significant strain on public trust or national stability.";

        return;

    }


    gameState.administrationOutcome =
        "Your presidency produced a mixed record of accomplishments, conflict, and institutional consequences.";

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
            gameState.congress +
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
    LEADERSHIP QUALITY BONUS

    A president should not receive a high grade
    merely for taking many actions if those
    actions damaged constitutional governance.
    ----------------------------------------------
    */

    const leadershipTotal =
        gameState.constitutionalRestraint +
        gameState.legislativeSkill +
        gameState.crisisLeadership +
        gameState.diplomaticCredibility +
        gameState.accountability;


    const leadershipBonus =
        Math.max(
            -10,
            Math.min(
                10,
                leadershipTotal
            )
        );


    /*
    ----------------------------------------------
    CONSTITUTIONAL CRISIS PENALTY
    ----------------------------------------------
    */

    const crisisPenalty =
        gameState.constitutionalCrisis
            ? 12
            : 0;


    const finalScore =
        performanceAverage +
        accomplishmentBonus +
        leadershipBonus -
        crisisPenalty;


    if (
        finalScore >=
        94
    ) {

        return "A+";

    }


    if (
        finalScore >=
        88
    ) {

        return "A";

    }


    if (
        finalScore >=
        82
    ) {

        return "A−";

    }


    if (
        finalScore >=
        76
    ) {

        return "B+";

    }


    if (
        finalScore >=
        70
    ) {

        return "B";

    }


    if (
        finalScore >=
        64
    ) {

        return "B−";

    }


    if (
        finalScore >=
        58
    ) {

        return "C+";

    }


    if (
        finalScore >=
        52
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
            `Outstanding term. You combined effective executive leadership with strong respect for institutions, constitutional limits, and public accountability. ${outcome}`
        );

    }


    if (
        grade === "A−" ||
        grade === "B+"
    ) {

        return (
            `Strong term. You handled major presidential responsibilities while maintaining credible relationships, stability, and institutional trust. ${outcome}`
        );

    }


    if (
        grade === "B" ||
        grade === "B−"
    ) {

        return (
            `Solid term. You achieved meaningful results, though some decisions reduced cooperation, trust, or long-term stability. ${outcome}`
        );

    }


    if (
        grade === "C+" ||
        grade === "C"
    ) {

        return (
            `Mixed term. Stronger constitutional restraint, congressional cooperation, crisis management, and accountability would improve a future presidency. ${outcome}`
        );

    }


    return (
        `A difficult term. Review how executive power, congressional relationships, transparency, constitutional limits, and crisis decisions affected your presidency. ${outcome}`
    );

}


/*
==================================================
SHOW FINAL RESULTS
==================================================
*/

async function showFinalResults() {

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
    
    /*
    ----------------------------------------------
    ACCOUNT-BASED SIMULATION RECORD
    ----------------------------------------------
    */

    try {

        await saveSimulationCompletion(
            "president",
            {

                grade,

                result:
                    gameState.administrationOutcome

            }
        );

    } catch (error) {

        console.warn(
            "President simulation account progress could not be saved:",
            error
        );

    }

    setText(
        "presidentTermProgress",
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
SAVE RECORD
==================================================
*/

function saveSimulationRecord(
    grade
) {

    try {

        /*
        ----------------------------------------------
        EXISTING SIMULATION CENTER KEYS

        Keep these unchanged.
        ----------------------------------------------
        */

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
                ) ||
                0
            );


        window.localStorage.setItem(
            "civicPresidentSimulationRuns",
            String(
                previousRuns +
                1
            )
        );


        /*
        ----------------------------------------------
        PRESIDENT 2.0 RECORD
        ----------------------------------------------
        */

        window.localStorage.setItem(
            "civicPresidentSimulationLastOutcome",
            gameState.administrationOutcome
        );


        window.localStorage.setItem(
            "civicPresidentSimulationLastApproval",
            String(
                gameState.approval
            )
        );


        window.localStorage.setItem(
            "civicPresidentSimulationLastCongress",
            String(
                gameState.congress
            )
        );


        window.localStorage.setItem(
            "civicPresidentSimulationLastTrust",
            String(
                gameState.trust
            )
        );


        window.localStorage.setItem(
            "civicPresidentSimulationLastStability",
            String(
                gameState.stability
            )
        );


        window.localStorage.setItem(
            "civicPresidentSimulationLastConstitutionalCrisis",
            String(
                gameState.constitutionalCrisis
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
RESET GAME STATE
==================================================
*/

function resetGameState() {

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


    gameState.constitutionalRestraint =
        0;


    gameState.legislativeSkill =
        0;


    gameState.crisisLeadership =
        0;


    gameState.diplomaticCredibility =
        0;


    gameState.accountability =
        0;


    gameState.legislativeResult =
        "pending";


    gameState.appointmentResult =
        "pending";


    gameState.emergencyResult =
        "pending";


    gameState.executivePowerResult =
        "pending";


    gameState.foreignPolicyResult =
        "pending";


    gameState.budgetResult =
        "pending";


    gameState.oversightResult =
        "pending";


    gameState.constitutionalCrisis =
        false;


    gameState.administrationOutcome =
        "Your presidency is still unfolding.";

}


/*
==================================================
RESET NEWS FEED
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


    const newsItem =
        document.createElement(
            "div"
        );


    newsItem.className =
        "president-news-item";


    const label =
        document.createElement(
            "span"
        );


    label.textContent =
        "White House";


    const headline =
        document.createElement(
            "p"
        );


    headline.textContent =
        anotherTerm
            ? "President begins another term."
            : "New administration begins first term.";


    newsItem.append(
        label,
        headline
    );


    newsFeed.appendChild(
        newsItem
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


                if (
                    menuButton
                ) {

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuButton.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }

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


    resetSimulationFlow();

    updateDashboard();

}


/*
==================================================
START
==================================================
*/

initializePresidentPage();