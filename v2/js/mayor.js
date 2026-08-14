/*
==================================================
CIVIC HORIZON INDEX V2
MAYOR SIMULATION
BRANCHING CITY LEADERSHIP ENGINE
==================================================
*/


/*
==================================================
FOUNDATION SCENARIOS
==================================================
*/

const mayorScenarios = [

    /*
    ==================================================
    1. CITY BUDGET
    ==================================================
    */

    {
        id:
            "cityBudget",

        category:
            "City Budget",

        title:
            "Your city faces a projected budget shortfall.",

        text:
            "Departments are requesting more funding, residents want services preserved, and the city council expects a balanced plan. What do you do?",

        stage:
            "Budget Planning",

        choices: [

            {
                text:
                    "Order broad cuts across every department without reviewing service priorities",

                outcomeTitle:
                    "The budget gap shrinks quickly",

                outcomeText:
                    "The city reduces spending, but essential services are disrupted because the cuts were not targeted.",

                approval:
                    -4,

                council:
                    -2,

                trust:
                    -5,

                stability:
                    -6,

                ordinancesSigned:
                    0,

                majorActions:
                    1,

                fiscalDiscipline:
                    1,

                councilSkill:
                    -1,

                serviceManagement:
                    -3,

                neighborhoodTrust:
                    -2,

                accountability:
                    -1,

                budgetResult:
                    "bluntCuts",

                headline:
                    "Mayor orders broad city spending cuts to address budget shortfall."
            },

            {
                text:
                    "Review spending priorities and negotiate a balanced package with the city council",

                outcomeTitle:
                    "A workable budget plan develops",

                outcomeText:
                    "The process takes longer, but the city protects core services while addressing the fiscal gap.",

                approval:
                    5,

                council:
                    8,

                trust:
                    7,

                stability:
                    6,

                ordinancesSigned:
                    1,

                majorActions:
                    1,

                fiscalDiscipline:
                    4,

                councilSkill:
                    4,

                serviceManagement:
                    3,

                neighborhoodTrust:
                    2,

                accountability:
                    2,

                budgetResult:
                    "balanced",

                headline:
                    "Mayor and city council begin negotiations on balanced budget plan."
            },

            {
                text:
                    "Promise every department full funding and deal with the deficit later",

                outcomeTitle:
                    "The immediate conflict fades",

                outcomeText:
                    "Departments are relieved, but the city's financial position worsens and council members question the plan's sustainability.",

                approval:
                    2,

                council:
                    -4,

                trust:
                    -6,

                stability:
                    -4,

                ordinancesSigned:
                    0,

                majorActions:
                    0,

                fiscalDiscipline:
                    -4,

                councilSkill:
                    -1,

                serviceManagement:
                    1,

                neighborhoodTrust:
                    1,

                accountability:
                    -2,

                budgetResult:
                    "overspending",

                headline:
                    "City budget plan draws criticism over unresolved deficit."
            },

            {
                text:
                    "Refuse to release a budget plan until the city council acts first",

                outcomeTitle:
                    "The process stalls",

                outcomeText:
                    "The council has an important role, but residents expect the mayor to provide executive leadership and a workable proposal.",

                approval:
                    -5,

                council:
                    -5,

                trust:
                    -5,

                stability:
                    -5,

                ordinancesSigned:
                    0,

                majorActions:
                    0,

                fiscalDiscipline:
                    0,

                councilSkill:
                    -3,

                serviceManagement:
                    -1,

                neighborhoodTrust:
                    -1,

                accountability:
                    -2,

                budgetResult:
                    "stalled",

                headline:
                    "City budget negotiations stall amid disagreement over mayoral leadership."
            }

        ]

    },


    /*
    ==================================================
    2. PUBLIC SAFETY
    ==================================================
    */

    {
        id:
            "publicSafety",

        category:
            "Public Safety",

        title:
            "Residents report rising concerns about safety in several neighborhoods.",

        text:
            "Police, community organizations, and residents propose different solutions. How do you respond?",

        stage:
            "Public Safety",

        choices: [

            {
                text:
                    "Increase enforcement everywhere without reviewing local conditions or community concerns",

                outcomeTitle:
                    "Police activity increases quickly",

                outcomeText:
                    "Some residents feel reassured, but others question whether the response is too broad and disconnected from neighborhood needs.",

                approval:
                    1,

                council:
                    -1,

                trust:
                    -4,

                stability:
                    1,

                ordinancesSigned:
                    0,

                majorActions:
                    1,

                fiscalDiscipline:
                    -1,

                councilSkill:
                    0,

                serviceManagement:
                    1,

                neighborhoodTrust:
                    -3,

                accountability:
                    -1,

                safetyResult:
                    "broadEnforcement",

                headline:
                    "Mayor orders citywide enforcement increase amid safety concerns."
            },

            {
                text:
                    "Use crime data, community input, prevention programs, and targeted enforcement",

                outcomeTitle:
                    "The city adopts a focused public-safety strategy",

                outcomeText:
                    "The plan combines enforcement with prevention and neighborhood partnerships rather than treating every area the same.",

                approval:
                    6,

                council:
                    4,

                trust:
                    7,

                stability:
                    8,

                ordinancesSigned:
                    0,

                majorActions:
                    1,

                fiscalDiscipline:
                    1,

                councilSkill:
                    2,

                serviceManagement:
                    4,

                neighborhoodTrust:
                    5,

                accountability:
                    2,

                safetyResult:
                    "targeted",

                headline:
                    "City launches targeted public-safety strategy with community partnerships."
            },

            {
                text:
                    "Tell neighborhoods to solve safety problems on their own",

                outcomeTitle:
                    "Residents lose confidence",

                outcomeText:
                    "Community involvement matters, but local government still has major responsibilities for public safety and coordination.",

                approval:
                    -7,

                council:
                    -2,

                trust:
                    -8,

                stability:
                    -9,

                ordinancesSigned:
                    0,

                majorActions:
                    0,

                fiscalDiscipline:
                    1,

                councilSkill:
                    -1,

                serviceManagement:
                    -5,

                neighborhoodTrust:
                    -5,

                accountability:
                    -2,

                safetyResult:
                    "abandoned",

                headline:
                    "Neighborhood leaders criticize limited city response to safety concerns."
            },

            {
                text:
                    "Focus mainly on blaming previous city leadership",

                outcomeTitle:
                    "The issue becomes politicized",

                outcomeText:
                    "The criticism may be partly justified, but residents still expect an immediate plan for current conditions.",

                approval:
                    -4,

                council:
                    -3,

                trust:
                    -6,

                stability:
                    -5,

                ordinancesSigned:
                    0,

                majorActions:
                    0,

                fiscalDiscipline:
                    0,

                councilSkill:
                    -2,

                serviceManagement:
                    -2,

                neighborhoodTrust:
                    -2,

                accountability:
                    -3,

                safetyResult:
                    "politicized",

                headline:
                    "Political blame dominates city debate over public safety."
            }

        ]

    },


    /*
    ==================================================
    3. HOUSING
    ==================================================
    */

    {
        id:
            "housing",

        category:
            "Housing",

        title:
            "Housing costs are rising rapidly and residents are being priced out of several neighborhoods.",

        text:
            "Developers want faster approvals, residents want affordability protections, and the council is divided. What do you do?",

        stage:
            "Housing Policy",

        choices: [

            {
                text:
                    "Approve every proposed development immediately regardless of infrastructure or affordability concerns",

                outcomeTitle:
                    "Construction accelerates",

                outcomeText:
                    "More housing may be built, but neighborhoods raise concerns about infrastructure capacity, displacement, and lack of planning.",

                approval:
                    0,

                council:
                    -2,

                trust:
                    -4,

                stability:
                    -2,

                ordinancesSigned:
                    1,

                majorActions:
                    1,

                fiscalDiscipline:
                    0,

                councilSkill:
                    -1,

                serviceManagement:
                    -1,

                neighborhoodTrust:
                    -4,

                accountability:
                    -1,

                housingResult:
                    "unplannedGrowth",

                headline:
                    "Mayor accelerates development approvals amid housing shortage."
            },

            {
                text:
                    "Create a housing plan combining new supply, affordability tools, zoning review, and infrastructure planning",

                outcomeTitle:
                    "The city adopts a broader housing strategy",

                outcomeText:
                    "The plan does not solve affordability immediately, but it addresses both housing supply and neighborhood capacity.",

                approval:
                    6,

                council:
                    6,

                trust:
                    8,

                stability:
                    6,

                ordinancesSigned:
                    1,

                majorActions:
                    1,

                fiscalDiscipline:
                    2,

                councilSkill:
                    4,

                serviceManagement:
                    3,

                neighborhoodTrust:
                    4,

                accountability:
                    3,

                housingResult:
                    "balancedPlan",

                headline:
                    "City unveils comprehensive housing and neighborhood growth strategy."
            },

            {
                text:
                    "Block nearly all new housing to prevent neighborhood change",

                outcomeTitle:
                    "Development slows sharply",

                outcomeText:
                    "Some residents welcome slower growth, but housing scarcity and affordability pressures worsen.",

                approval:
                    -2,

                council:
                    -3,

                trust:
                    -3,

                stability:
                    -4,

                ordinancesSigned:
                    0,

                majorActions:
                    1,

                fiscalDiscipline:
                    0,

                councilSkill:
                    -2,

                serviceManagement:
                    -2,

                neighborhoodTrust:
                    1,

                accountability:
                    -1,

                housingResult:
                    "blocked",

                headline:
                    "City sharply limits new housing amid neighborhood opposition."
            },

            {
                text:
                    "Avoid taking a position because the issue is politically difficult",

                outcomeTitle:
                    "Housing pressure continues",

                outcomeText:
                    "The city avoids immediate conflict, but residents, developers, and council members receive no clear direction.",

                approval:
                    -5,

                council:
                    -2,

                trust:
                    -6,

                stability:
                    -4,

                ordinancesSigned:
                    0,

                majorActions:
                    0,

                fiscalDiscipline:
                    0,

                councilSkill:
                    -2,

                serviceManagement:
                    -2,

                neighborhoodTrust:
                    -2,

                accountability:
                    -3,

                housingResult:
                    "avoided",

                headline:
                    "Mayor avoids major housing proposal despite rising affordability pressure."
            }

        ]

    },


    /*
    ==================================================
    4. ESSENTIAL SERVICES
    ==================================================
    */

    {
        id:
            "cityServices",

        category:
            "Essential Services",

        title:
            "Residents complain about delayed trash collection, potholes, and unreliable city services.",

        text:
            "Department leaders say staffing and equipment shortages are creating backlogs. What do you do?",

        stage:
            "City Operations",

        choices: [

            {
                text:
                    "Set public performance targets, review staffing, and prioritize the worst service failures",

                outcomeTitle:
                    "City operations become more focused",

                outcomeText:
                    "Departments receive clearer priorities, residents gain visibility into performance, and the most serious backlogs begin improving.",

                approval:
                    6,

                council:
                    3,

                trust:
                    8,

                stability:
                    7,

                ordinancesSigned:
                    0,

                majorActions:
                    1,

                fiscalDiscipline:
                    2,

                councilSkill:
                    1,

                serviceManagement:
                    5,

                neighborhoodTrust:
                    4,

                accountability:
                    4,

                servicesResult:
                    "performancePlan",

                headline:
                    "Mayor launches city service performance and backlog reduction plan."
            },

            {
                text:
                    "Promise that every service problem will be fixed immediately",

                outcomeTitle:
                    "Expectations rise quickly",

                outcomeText:
                    "Residents welcome the promise, but the administration lacks enough staff and resources to deliver everything at once.",

                approval:
                    1,

                council:
                    -1,

                trust:
                    -5,

                stability:
                    -2,

                ordinancesSigned:
                    0,

                majorActions:
                    1,

                fiscalDiscipline:
                    -3,

                councilSkill:
                    0,

                serviceManagement:
                    -2,

                neighborhoodTrust:
                    -2,

                accountability:
                    -3,

                servicesResult:
                    "overpromised",

                headline:
                    "Questions grow over mayor's promise to quickly eliminate all service backlogs."
            },

            {
                text:
                    "Tell departments to handle the problems without additional oversight",

                outcomeTitle:
                    "The backlogs continue",

                outcomeText:
                    "Department managers retain flexibility, but citywide coordination and accountability remain weak.",

                approval:
                    -4,

                council:
                    -1,

                trust:
                    -5,

                stability:
                    -5,

                ordinancesSigned:
                    0,

                majorActions:
                    0,

                fiscalDiscipline:
                    0,

                councilSkill:
                    0,

                serviceManagement:
                    -4,

                neighborhoodTrust:
                    -2,

                accountability:
                    -3,

                servicesResult:
                    "unmanaged",

                headline:
                    "Residents report continuing service delays across the city."
            },

            {
                text:
                    "Prioritize service improvements only in neighborhoods that supported you politically",

                outcomeTitle:
                    "The administration faces favoritism accusations",

                outcomeText:
                    "Some neighborhoods improve quickly, but confidence in fair city government deteriorates.",

                approval:
                    -3,

                council:
                    -4,

                trust:
                    -10,

                stability:
                    -5,

                ordinancesSigned:
                    0,

                majorActions:
                    1,

                fiscalDiscipline:
                    -1,

                councilSkill:
                    -2,

                serviceManagement:
                    -1,

                neighborhoodTrust:
                    -6,

                accountability:
                    -5,

                servicesResult:
                    "favoritism",

                cityCrisis:
                    true,

                headline:
                    "Mayor faces criticism over politically targeted city services."
            }

        ]

    }

];


/*
==================================================
CITY LEADERSHIP STATE
==================================================
*/

const gameState = {

    approval:
        66,

    council:
        60,

    trust:
        69,

    stability:
        71,

    ordinancesSigned:
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

    councilSkill:
        0,

    serviceManagement:
        0,

    neighborhoodTrust:
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

    safetyResult:
        "pending",

    housingResult:
        "pending",

    servicesResult:
        "pending",

    councilResult:
        "pending",

    emergencyResult:
        "pending",

    fiscalResult:
        "pending",

    cityCrisis:
        false,

    administrationOutcome:
        "Your mayoral term is still unfolding."

};


/*
==================================================
INITIAL FLOW
==================================================
*/

let simulationFlow = [

    mayorScenarios[0],

    mayorScenarios[1],

    mayorScenarios[2],

    mayorScenarios[3]

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
        "mayorStartScreen"
    );


const gameScreen =
    document.getElementById(
        "mayorGameScreen"
    );


const resultsScreen =
    document.getElementById(
        "mayorResultsScreen"
    );


const startButton =
    document.getElementById(
        "mayorStartButton"
    );


const restartButton =
    document.getElementById(
        "mayorRestartButton"
    );


const continueButton =
    document.getElementById(
        "mayorContinueButton"
    );


const scenarioCategory =
    document.getElementById(
        "mayorScenarioCategory"
    );


const scenarioProgress =
    document.getElementById(
        "mayorScenarioProgress"
    );


const scenarioTitle =
    document.getElementById(
        "mayorScenarioTitle"
    );


const scenarioText =
    document.getElementById(
        "mayorScenarioText"
    );


const choiceContainer =
    document.getElementById(
        "mayorChoiceContainer"
    );


const outcome =
    document.getElementById(
        "mayorOutcome"
    );


const outcomeIcon =
    document.getElementById(
        "mayorOutcomeIcon"
    );


const outcomeTitle =
    document.getElementById(
        "mayorOutcomeTitle"
    );


const outcomeText =
    document.getElementById(
        "mayorOutcomeText"
    );


const newsFeed =
    document.getElementById(
        "mayorNewsFeed"
    );
    /*
==================================================
CITY COUNCIL — COOPERATIVE PATH
==================================================
*/

const councilCooperativeScenario = {

    id:
        "councilCooperative",

    category:
        "City Council",

    title:
        "Your administration has a workable relationship with the city council.",

    text:
        "The council sends you a major neighborhood investment ordinance that includes several priorities you support and several you want changed. What do you do?",

    stage:
        "Council Negotiation",

    choices: [

        {
            text:
                "Meet with council leaders and negotiate targeted changes",

            outcomeTitle:
                "A compromise improves the ordinance",

            outcomeText:
                "The final package keeps most of the neighborhood investment while addressing several concerns raised by your administration.",

            approval:
                4,

            council:
                8,

            trust:
                6,

            stability:
                5,

            ordinancesSigned:
                1,

            majorActions:
                1,

            fiscalDiscipline:
                2,

            councilSkill:
                5,

            serviceManagement:
                1,

            neighborhoodTrust:
                3,

            accountability:
                2,

            councilResult:
                "agreement",

            headline:
                "Mayor and city council reach compromise on neighborhood investment package."
        },

        {
            text:
                "Sign the ordinance without reviewing the disputed provisions",

            outcomeTitle:
                "The ordinance becomes law quickly",

            outcomeText:
                "The city avoids political conflict, but several provisions later create implementation and cost problems.",

            approval:
                2,

            council:
                4,

            trust:
                -3,

            stability:
                -2,

            ordinancesSigned:
                1,

            majorActions:
                1,

            fiscalDiscipline:
                -2,

            councilSkill:
                0,

            serviceManagement:
                -1,

            neighborhoodTrust:
                1,

            accountability:
                -2,

            councilResult:
                "rushed",

            headline:
                "Mayor signs neighborhood ordinance amid questions over implementation."
        },

        {
            text:
                "Veto the entire ordinance and refuse further talks",

            outcomeTitle:
                "The relationship deteriorates",

            outcomeText:
                "You protect your objections, but council members who were willing to negotiate become less cooperative.",

            approval:
                -2,

            council:
                -9,

            trust:
                -2,

            stability:
                -3,

            ordinancesSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                1,

            councilSkill:
                -4,

            serviceManagement:
                0,

            neighborhoodTrust:
                -1,

            accountability:
                -1,

            councilResult:
                "vetoConflict",

            headline:
                "Mayor vetoes neighborhood package as council tensions rise."
        },

        {
            text:
                "Threaten to withhold city attention from council districts that oppose you",

            outcomeTitle:
                "The dispute becomes personal",

            outcomeText:
                "The tactic may pressure some council members, but it damages trust with both lawmakers and neighborhoods.",

            approval:
                -5,

            council:
                -12,

            trust:
                -10,

            stability:
                -5,

            ordinancesSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                0,

            councilSkill:
                -5,

            serviceManagement:
                -1,

            neighborhoodTrust:
                -6,

            accountability:
                -5,

            councilResult:
                "retaliatory",

            cityCrisis:
                true,

            headline:
                "Mayor faces criticism over threats toward opposing council districts."
        }

    ]

};


/*
==================================================
CITY COUNCIL — HOSTILE PATH
==================================================
*/

const councilHostileScenario = {

    id:
        "councilHostile",

    category:
        "Council Conflict",

    title:
        "Relations between City Hall and the council have become badly strained.",

    text:
        "A major deadline is approaching, and neither side trusts the other. What do you do?",

    stage:
        "City Hall Conflict",

    choices: [

        {
            text:
                "Invite council leaders to restart negotiations around a narrow set of shared priorities",

            outcomeTitle:
                "Communication reopens",

            outcomeText:
                "The meeting does not erase earlier conflict, but it creates a realistic path toward governing again.",

            approval:
                2,

            council:
                9,

            trust:
                6,

            stability:
                6,

            ordinancesSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                1,

            councilSkill:
                5,

            serviceManagement:
                1,

            neighborhoodTrust:
                2,

            accountability:
                2,

            councilResult:
                "recovery",

            headline:
                "Mayor reopens council negotiations after months of City Hall conflict."
        },

        {
            text:
                "Bypass the council on matters that legally require council approval",

            outcomeTitle:
                "A city legal dispute develops",

            outcomeText:
                "The mayor has executive authority, but major local actions can still require council approval, ordinances, or appropriations.",

            approval:
                -4,

            council:
                -14,

            trust:
                -12,

            stability:
                -10,

            ordinancesSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                -1,

            councilSkill:
                -5,

            serviceManagement:
                -1,

            neighborhoodTrust:
                -2,

            accountability:
                -5,

            councilResult:
                "legalConflict",

            cityCrisis:
                true,

            headline:
                "Mayor faces legal challenge over attempt to bypass city council."
        },

        {
            text:
                "Support a narrow compromise on the most urgent city issue",

            outcomeTitle:
                "The immediate crisis eases",

            outcomeText:
                "The broader relationship remains difficult, but both sides show they can still govern when necessary.",

            approval:
                1,

            council:
                6,

            trust:
                5,

            stability:
                7,

            ordinancesSigned:
                1,

            majorActions:
                1,

            fiscalDiscipline:
                2,

            councilSkill:
                4,

            serviceManagement:
                1,

            neighborhoodTrust:
                2,

            accountability:
                1,

            councilResult:
                "limitedDeal",

            headline:
                "Mayor and council reach narrow agreement despite strained relations."
        },

        {
            text:
                "Use public appearances only to blame the council",

            outcomeTitle:
                "The conflict deepens",

            outcomeText:
                "The messaging may energize supporters, but the underlying governing problem remains unresolved.",

            approval:
                -1,

            council:
                -9,

            trust:
                -6,

            stability:
                -6,

            ordinancesSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                0,

            councilSkill:
                -4,

            serviceManagement:
                -1,

            neighborhoodTrust:
                -2,

            accountability:
                -4,

            councilResult:
                "blame",

            headline:
                "City Hall dispute intensifies as mayor and council trade blame."
        }

    ]

};


/*
==================================================
CITY EMERGENCY — STABLE PATH
==================================================
*/

const emergencyStableScenario = {

    id:
        "emergencyStable",

    category:
        "Emergency Response",

    title:
        "A severe storm causes flooding, power outages, and transportation problems across the city.",

    text:
        "Emergency services are stretched, several neighborhoods need immediate assistance, and regional partners offer support. What do you do?",

    stage:
        "City Emergency",

    choices: [

        {
            text:
                "Activate the emergency operations center and coordinate city, county, utility, and neighborhood response",

            outcomeTitle:
                "The response becomes coordinated",

            outcomeText:
                "Agencies share information, neighborhoods receive clearer guidance, and regional assistance is directed where it is most needed.",

            approval:
                7,

            council:
                3,

            trust:
                8,

            stability:
                10,

            ordinancesSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                0,

            councilSkill:
                1,

            serviceManagement:
                5,

            neighborhoodTrust:
                5,

            accountability:
                2,

            emergencyResult:
                "coordinated",

            headline:
                "Mayor coordinates citywide storm response with regional partners."
        },

        {
            text:
                "Tell individual neighborhoods to manage the emergency largely on their own",

            outcomeTitle:
                "Local resources become overwhelmed",

            outcomeText:
                "Neighborhood organizations can help, but city government still has major responsibilities for emergency coordination and essential services.",

            approval:
                -8,

            council:
                -2,

            trust:
                -8,

            stability:
                -11,

            ordinancesSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                1,

            councilSkill:
                -1,

            serviceManagement:
                -5,

            neighborhoodTrust:
                -6,

            accountability:
                -3,

            emergencyResult:
                "abandoned",

            headline:
                "Residents criticize limited City Hall response during severe storm."
        },

        {
            text:
                "Focus first on assigning blame for old infrastructure failures",

            outcomeTitle:
                "The emergency becomes politicized",

            outcomeText:
                "Infrastructure accountability may matter later, but residents currently need rescue, information, transportation, and service restoration.",

            approval:
                -5,

            council:
                -3,

            trust:
                -7,

            stability:
                -8,

            ordinancesSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                0,

            councilSkill:
                -2,

            serviceManagement:
                -4,

            neighborhoodTrust:
                -3,

            accountability:
                -3,

            emergencyResult:
                "politicized",

            headline:
                "Political blame overshadows early city storm response."
        },

        {
            text:
                "Promise that every service will be restored immediately despite uncertain conditions",

            outcomeTitle:
                "Expectations exceed capacity",

            outcomeText:
                "Residents initially welcome the promise, but confidence falls when restoration timelines prove unrealistic.",

            approval:
                -2,

            council:
                -1,

            trust:
                -5,

            stability:
                -4,

            ordinancesSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                -1,

            councilSkill:
                0,

            serviceManagement:
                -2,

            neighborhoodTrust:
                -3,

            accountability:
                -3,

            emergencyResult:
                "overpromised",

            headline:
                "City struggles to meet aggressive restoration promises after major storm."
        }

    ]

};


/*
==================================================
CITY EMERGENCY — CRISIS PATH
==================================================
*/

const emergencyCrisisScenario = {

    id:
        "emergencyCrisis",

    category:
        "City Crisis",

    title:
        "A major storm strikes while confidence in City Hall is already badly weakened.",

    text:
        "Residents are skeptical of official information, departments are under pressure, and council members demand immediate answers. What do you do?",

    stage:
        "Emergency Under Pressure",

    choices: [

        {
            text:
                "Centralize verified information, coordinate agencies, and give residents regular public updates",

            outcomeTitle:
                "The city begins rebuilding confidence",

            outcomeText:
                "The emergency remains difficult, but consistent information and coordinated operations reduce confusion.",

            approval:
                3,

            council:
                4,

            trust:
                10,

            stability:
                9,

            ordinancesSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                0,

            councilSkill:
                2,

            serviceManagement:
                5,

            neighborhoodTrust:
                5,

            accountability:
                5,

            emergencyResult:
                "stabilized",

            cityCrisis:
                false,

            headline:
                "City Hall stabilizes storm response with coordinated public updates."
        },

        {
            text:
                "Limit information because bad news could hurt approval",

            outcomeTitle:
                "Rumors and confusion spread",

            outcomeText:
                "Residents receive less reliable information, and trust deteriorates as conditions become harder to verify.",

            approval:
                -6,

            council:
                -5,

            trust:
                -13,

            stability:
                -10,

            ordinancesSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                0,

            councilSkill:
                -2,

            serviceManagement:
                -4,

            neighborhoodTrust:
                -6,

            accountability:
                -6,

            emergencyResult:
                "informationFailure",

            cityCrisis:
                true,

            headline:
                "City faces criticism over limited emergency information during storm."
        },

        {
            text:
                "Ask outside emergency managers to review operations while city departments continue responding",

            outcomeTitle:
                "Independent support strengthens the response",

            outcomeText:
                "Outside expertise identifies coordination gaps while local agencies remain responsible for immediate operations.",

            approval:
                2,

            council:
                5,

            trust:
                8,

            stability:
                7,

            ordinancesSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                0,

            councilSkill:
                2,

            serviceManagement:
                4,

            neighborhoodTrust:
                3,

            accountability:
                5,

            emergencyResult:
                "outsideSupport",

            cityCrisis:
                false,

            headline:
                "Outside emergency specialists support city response during institutional strain."
        },

        {
            text:
                "Use the emergency mainly to attack political opponents",

            outcomeTitle:
                "The crisis deepens",

            outcomeText:
                "The political conflict consumes attention while residents and agencies still need clear operational leadership.",

            approval:
                -5,

            council:
                -8,

            trust:
                -10,

            stability:
                -9,

            ordinancesSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                0,

            councilSkill:
                -4,

            serviceManagement:
                -3,

            neighborhoodTrust:
                -5,

            accountability:
                -6,

            emergencyResult:
                "weaponized",

            cityCrisis:
                true,

            headline:
                "Political conflict dominates City Hall during major emergency."
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
        "City revenue falls unexpectedly midway through your term.",

    text:
        "Earlier budgeting left some flexibility, but a new gap is emerging. What do you do?",

    stage:
        "Midterm Fiscal Review",

    choices: [

        {
            text:
                "Use part of city reserves while making targeted spending adjustments",

            outcomeTitle:
                "The city absorbs the shortfall",

            outcomeText:
                "Reserves cushion the downturn while targeted changes preserve the most important local services.",

            approval:
                3,

            council:
                4,

            trust:
                6,

            stability:
                7,

            ordinancesSigned:
                1,

            majorActions:
                1,

            fiscalDiscipline:
                4,

            councilSkill:
                2,

            serviceManagement:
                2,

            neighborhoodTrust:
                1,

            accountability:
                2,

            fiscalResult:
                "managed",

            headline:
                "Mayor uses reserves and targeted adjustments to manage city revenue decline."
        },

        {
            text:
                "Spend the entire reserve fund immediately",

            outcomeTitle:
                "The immediate gap closes",

            outcomeText:
                "The city avoids near-term cuts but loses much of its protection against another emergency or downturn.",

            approval:
                2,

            council:
                -1,

            trust:
                -3,

            stability:
                -2,

            ordinancesSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                -3,

            councilSkill:
                0,

            serviceManagement:
                0,

            neighborhoodTrust:
                0,

            accountability:
                -1,

            fiscalResult:
                "reserveDepleted",

            headline:
                "City drains reserve fund to cover unexpected revenue shortfall."
        },

        {
            text:
                "Borrow heavily without presenting a repayment strategy",

            outcomeTitle:
                "The problem shifts into the future",

            outcomeText:
                "Services continue in the short term, but the city takes on new obligations without a clear long-term plan.",

            approval:
                1,

            council:
                -4,

            trust:
                -6,

            stability:
                -4,

            ordinancesSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                -5,

            councilSkill:
                -1,

            serviceManagement:
                0,

            neighborhoodTrust:
                -1,

            accountability:
                -3,

            fiscalResult:
                "unsustainableDebt",

            headline:
                "City borrowing plan raises concerns over long-term fiscal stability."
        },

        {
            text:
                "Hide the revised revenue forecast until after the next election",

            outcomeTitle:
                "A transparency scandal develops",

            outcomeText:
                "The delayed disclosure damages confidence in City Hall and makes the eventual fiscal adjustment more difficult.",

            approval:
                -8,

            council:
                -7,

            trust:
                -14,

            stability:
                -8,

            ordinancesSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                -4,

            councilSkill:
                -3,

            serviceManagement:
                -1,

            neighborhoodTrust:
                -4,

            accountability:
                -7,

            fiscalResult:
                "concealed",

            cityCrisis:
                true,

            headline:
                "Mayor faces criticism after delayed disclosure of city revenue shortfall."
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
        "The city enters a serious fiscal crisis after earlier decisions reduced its flexibility.",

    text:
        "Departments warn about service disruptions and council members demand a credible recovery plan. What do you do?",

    stage:
        "Fiscal Emergency",

    choices: [

        {
            text:
                "Present a transparent recovery plan combining targeted reductions, revenue review, and council negotiation",

            outcomeTitle:
                "The city begins stabilizing",

            outcomeText:
                "The plan is politically difficult, but it gives residents and council members a credible path out of the crisis.",

            approval:
                0,

            council:
                7,

            trust:
                9,

            stability:
                8,

            ordinancesSigned:
                1,

            majorActions:
                1,

            fiscalDiscipline:
                5,

            councilSkill:
                4,

            serviceManagement:
                2,

            neighborhoodTrust:
                2,

            accountability:
                5,

            fiscalResult:
                "recovery",

            cityCrisis:
                false,

            headline:
                "Mayor unveils comprehensive city fiscal recovery plan."
        },

        {
            text:
                "Make another round of broad cuts without explaining priorities",

            outcomeTitle:
                "Services deteriorate further",

            outcomeText:
                "The budget gap narrows somewhat, but residents receive little guidance about which services will remain reliable.",

            approval:
                -5,

            council:
                -3,

            trust:
                -8,

            stability:
                -8,

            ordinancesSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                0,

            councilSkill:
                -2,

            serviceManagement:
                -4,

            neighborhoodTrust:
                -4,

            accountability:
                -4,

            fiscalResult:
                "serviceCuts",

            cityCrisis:
                true,

            headline:
                "City departments face widespread cuts amid unresolved fiscal crisis."
        },

        {
            text:
                "Insist there is no fiscal problem despite department reports",

            outcomeTitle:
                "Confidence collapses",

            outcomeText:
                "The denial delays corrective action and damages the administration's credibility with council members, employees, and residents.",

            approval:
                -8,

            council:
                -8,

            trust:
                -14,

            stability:
                -10,

            ordinancesSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                -5,

            councilSkill:
                -3,

            serviceManagement:
                -3,

            neighborhoodTrust:
                -4,

            accountability:
                -7,

            fiscalResult:
                "denial",

            cityCrisis:
                true,

            headline:
                "Council challenges mayor's denial of worsening city fiscal crisis."
        },

        {
            text:
                "Ask independent fiscal analysts to review the budget and publish recommendations",

            outcomeTitle:
                "The city gains a clearer picture",

            outcomeText:
                "The review does not solve the deficit by itself, but transparent analysis creates a stronger basis for action.",

            approval:
                1,

            council:
                5,

            trust:
                8,

            stability:
                4,

            ordinancesSigned:
                0,

            majorActions:
                1,

            fiscalDiscipline:
                3,

            councilSkill:
                2,

            serviceManagement:
                1,

            neighborhoodTrust:
                2,

            accountability:
                5,

            fiscalResult:
                "independentReview",

            headline:
                "Independent analysts begin public review of city fiscal crisis."
        }

    ]

};


/*
==================================================
ACCOUNTABILITY — STABLE TERM
==================================================
*/

const mayorAccountabilityStableScenario = {

    id:
        "mayorAccountabilityStable",

    category:
        "Public Accountability",

    title:
        "Your term is nearing its end.",

    text:
        "Residents want to know what City Hall accomplished, what remains unfinished, and how city resources were used. How do you close the term?",

    stage:
        "End of Term",

    choices: [

        {
            text:
                "Publish a detailed city performance report and hold neighborhood forums",

            outcomeTitle:
                "The administration closes with transparency",

            outcomeText:
                "Residents receive a clear account of spending, services, major decisions, accomplishments, and unfinished work.",

            approval:
                5,

            council:
                2,

            trust:
                10,

            stability:
                5,

            ordinancesSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                1,

            councilSkill:
                0,

            serviceManagement:
                2,

            neighborhoodTrust:
                5,

            accountability:
                6,

            headline:
                "Mayor releases detailed end-of-term city performance report."
        },

        {
            text:
                "Take credit for every success and blame the council for every failure",

            outcomeTitle:
                "The final message becomes partisan",

            outcomeText:
                "Supporters respond positively, but residents and council members question whether the administration is presenting a fair record.",

            approval:
                0,

            council:
                -5,

            trust:
                -7,

            stability:
                -3,

            ordinancesSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                0,

            councilSkill:
                -2,

            serviceManagement:
                0,

            neighborhoodTrust:
                -2,

            accountability:
                -5,

            headline:
                "End-of-term mayor address draws criticism over blame and credit claims."
        },

        {
            text:
                "Release department performance data and invite independent review",

            outcomeTitle:
                "The record receives outside scrutiny",

            outcomeText:
                "The review may reveal weaknesses, but it strengthens confidence that City Hall is willing to be evaluated.",

            approval:
                3,

            council:
                3,

            trust:
                11,

            stability:
                4,

            ordinancesSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                2,

            councilSkill:
                0,

            serviceManagement:
                2,

            neighborhoodTrust:
                3,

            accountability:
                7,

            headline:
                "City Hall opens department performance record to independent review."
        },

        {
            text:
                "Avoid public questions and communicate only through campaign advertising",

            outcomeTitle:
                "Trust declines",

            outcomeText:
                "The administration controls its message, but residents receive little direct accountability for the city's record.",

            approval:
                -5,

            council:
                -1,

            trust:
                -10,

            stability:
                -2,

            ordinancesSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                0,

            councilSkill:
                0,

            serviceManagement:
                0,

            neighborhoodTrust:
                -4,

            accountability:
                -6,

            headline:
                "Mayor faces criticism for limited public access at end of term."
        }

    ]

};


/*
==================================================
ACCOUNTABILITY — CRISIS TERM
==================================================
*/

const mayorAccountabilityCrisisScenario = {

    id:
        "mayorAccountabilityCrisis",

    category:
        "Public Accountability",

    title:
        "Your term ends after a period of serious fiscal or institutional strain.",

    text:
        "Residents, council members, and neighborhood leaders want an explanation of what went wrong and what the city should do next. How do you respond?",

    stage:
        "Citywide Reckoning",

    choices: [

        {
            text:
                "Acknowledge mistakes and publish a detailed recovery and transition report",

            outcomeTitle:
                "The administration begins rebuilding confidence",

            outcomeText:
                "The report cannot erase the problems of the term, but it gives the city a clearer path forward.",

            approval:
                1,

            council:
                4,

            trust:
                11,

            stability:
                7,

            ordinancesSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                3,

            councilSkill:
                1,

            serviceManagement:
                2,

            neighborhoodTrust:
                4,

            accountability:
                7,

            cityCrisis:
                false,

            headline:
                "Mayor acknowledges mistakes and releases city recovery report."
        },

        {
            text:
                "Defend every administration decision and reject all criticism",

            outcomeTitle:
                "The crisis remains unresolved",

            outcomeText:
                "The response reassures some supporters but does little to rebuild confidence across the city.",

            approval:
                -1,

            council:
                -6,

            trust:
                -9,

            stability:
                -6,

            ordinancesSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                -1,

            councilSkill:
                -2,

            serviceManagement:
                -1,

            neighborhoodTrust:
                -4,

            accountability:
                -6,

            cityCrisis:
                true,

            headline:
                "Mayor rejects criticism as city crisis continues."
        },

        {
            text:
                "Invite independent auditors and civic organizations to review the administration's record",

            outcomeTitle:
                "Outside review strengthens the transition",

            outcomeText:
                "The city receives an independent assessment of fiscal, service, and institutional problems that developed during the term.",

            approval:
                2,

            council:
                5,

            trust:
                12,

            stability:
                6,

            ordinancesSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                3,

            councilSkill:
                1,

            serviceManagement:
                2,

            neighborhoodTrust:
                4,

            accountability:
                8,

            cityCrisis:
                false,

            headline:
                "Independent review begins after difficult mayoral term."
        },

        {
            text:
                "Refuse to discuss the city's problems before leaving office",

            outcomeTitle:
                "The city receives little closure",

            outcomeText:
                "Major questions about finances, services, and City Hall conflict remain unanswered.",

            approval:
                -7,

            council:
                -4,

            trust:
                -12,

            stability:
                -7,

            ordinancesSigned:
                0,

            majorActions:
                0,

            fiscalDiscipline:
                -2,

            councilSkill:
                -1,

            serviceManagement:
                -2,

            neighborhoodTrust:
                -4,

            accountability:
                -7,

            cityCrisis:
                true,

            headline:
                "Mayor declines end-of-term review despite unresolved city problems."
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


    if (bar) {

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

    simulationFlow = [

        mayorScenarios[0],

        mayorScenarios[1],

        mayorScenarios[2],

        mayorScenarios[3]

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


    gameState.council =
        clamp(
            gameState.council
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
        "mayorApproval",
        `${gameState.approval}%`
    );


    setText(
        "mayorCouncil",
        `${gameState.council}%`
    );


    setText(
        "mayorTrust",
        `${gameState.trust}%`
    );


    setText(
        "mayorStability",
        `${gameState.stability}%`
    );


    setText(
        "mayorOrdinancesSigned",
        gameState.ordinancesSigned
    );


    setText(
        "mayorMajorActions",
        gameState.majorActions
    );


    setText(
        "executiveMayorApproval",
        `${gameState.approval}%`
    );


    setText(
        "executiveMayorCouncil",
        `${gameState.council}%`
    );


    setText(
        "executiveMayorTrust",
        `${gameState.trust}%`
    );


    setText(
        "executiveMayorStability",
        `${gameState.stability}%`
    );


    setText(
        "sideMayorOrdinancesSigned",
        gameState.ordinancesSigned
    );


    setText(
        "sideMayorMajorActions",
        gameState.majorActions
    );


    updateMetric(
        "sideMayorApproval",
        "sideMayorApprovalBar",
        gameState.approval
    );


    updateMetric(
        "sideMayorCouncil",
        "sideMayorCouncilBar",
        gameState.council
    );


    updateMetric(
        "sideMayorTrust",
        "sideMayorTrustBar",
        gameState.trust
    );


    updateMetric(
        "sideMayorStability",
        "sideMayorStabilityBar",
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
        "mayorTermProgress",
        `${progress}%`
    );

}


/*
==================================================
SELECT COUNCIL PATH
==================================================
*/

function determineCouncilScenario() {

    const cooperationScore =
        gameState.council +
        (
            gameState.councilSkill *
            4
        );


    if (
        cooperationScore >=
        66
    ) {

        return councilCooperativeScenario;

    }


    return councilHostileScenario;

}


/*
==================================================
SELECT EMERGENCY PATH
==================================================
*/

function determineEmergencyScenario() {

    const institutionalRisk =
        gameState.cityCrisis ||
        gameState.trust <
            48 ||
        gameState.neighborhoodTrust <=
            -4;


    if (
        institutionalRisk
    ) {

        return emergencyCrisisScenario;

    }


    return emergencyStableScenario;

}


/*
==================================================
SELECT FISCAL PATH
==================================================
*/

function determineFiscalScenario() {

    const fiscalStrength =
        (
            gameState.fiscalDiscipline *
            4
        ) +
        gameState.trust +
        gameState.stability;


    if (
        fiscalStrength >=
        138
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

function determineMayorAccountabilityScenario() {

    if (
        gameState.cityCrisis ||
        gameState.trust <
            45 ||
        gameState.accountability <=
            -5
    ) {

        return mayorAccountabilityCrisisScenario;

    }


    return mayorAccountabilityStableScenario;

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
            `Decision ${currentScenarioIndex + 1} of ${getEstimatedDecisionCount()}`;

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
        "mayorTurnLabel",
        `Month ${1 + currentScenarioIndex * 6}`
    );


    setText(
        "mayorCurrentStage",
        scenario.stage
    );


    if (!choiceContainer) {

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
                            class="mayor-choice-button"
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
            ".mayor-choice-button"
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


    if (!scenario) {

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


    if (!choice) {

        return;

    }


    decisionLocked =
        true;


    choiceContainer
        ?.querySelectorAll(
            ".mayor-choice-button"
        )
        .forEach(
            button => {

                button.disabled =
                    true;

            }
        );


    selectedButton.classList.add(
        "mayor-choice-selected"
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


    if (continueButton) {

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


    gameState.council +=
        Number(
            choice.council ||
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


    gameState.ordinancesSigned +=
        Number(
            choice.ordinancesSigned ||
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


    gameState.councilSkill +=
        Number(
            choice.councilSkill ||
            0
        );


    gameState.serviceManagement +=
        Number(
            choice.serviceManagement ||
            0
        );


    gameState.neighborhoodTrust +=
        Number(
            choice.neighborhoodTrust ||
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

        "safetyResult",

        "housingResult",

        "servicesResult",

        "councilResult",

        "emergencyResult",

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
        typeof choice.cityCrisis ===
        "boolean"
    ) {

        gameState.cityCrisis =
            choice.cityCrisis;

    }

}


/*
==================================================
RENDER OUTCOME
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
            choice.council ||
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
        "cityServices"
    ) {

        appendScenarioIfMissing(
            determineCouncilScenario()
        );


        return;

    }


    if (
        scenario.id ===
            "councilCooperative" ||
        scenario.id ===
            "councilHostile"
    ) {

        appendScenarioIfMissing(
            determineEmergencyScenario()
        );


        return;

    }


    if (
        scenario.id ===
            "emergencyStable" ||
        scenario.id ===
            "emergencyCrisis"
    ) {

        appendScenarioIfMissing(
            determineFiscalScenario()
        );


        return;

    }


    if (
        scenario.id ===
            "fiscalStable" ||
        scenario.id ===
            "fiscalCrisis"
    ) {

        appendScenarioIfMissing(
            determineMayorAccountabilityScenario()
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

    if (!scenario) {

        return;

    }


    const exists =
        simulationFlow.some(
            item =>
                item.id ===
                scenario.id
        );


    if (exists) {

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


    if (!scenario) {

        return false;

    }


    return (
        scenario.id ===
            "mayorAccountabilityStable" ||
        scenario.id ===
            "mayorAccountabilityCrisis"
    );

}


/*
==================================================
CITY NEWS
==================================================
*/

function addHeadline(
    category,
    headline
) {

    if (!newsFeed) {

        return;

    }


    const item =
        document.createElement(
            "div"
        );


    item.className =
        "mayor-news-item";


    const categoryElement =
        document.createElement(
            "span"
        );


    categoryElement.textContent =
        String(
            category ||
            "City Hall"
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
            ".mayor-news-item"
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

    if (!decisionLocked) {

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
            "mayorScenarioCard"
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
        gameState.cityCrisis
    ) {

        gameState.administrationOutcome =
            "Your term ended with unresolved fiscal, service, or institutional strain that weakened confidence in City Hall.";

        return;

    }


    if (
        gameState.trust >= 75 &&
        gameState.stability >= 75 &&
        gameState.council >= 65
    ) {

        gameState.administrationOutcome =
            "Your administration completed the term with strong public trust, workable council relationships, and stable city services.";

        return;

    }


    if (
        gameState.trust >= 60 &&
        gameState.stability >= 60
    ) {

        gameState.administrationOutcome =
            "Your administration completed the term with generally stable city government, though several decisions created difficult fiscal and neighborhood tradeoffs.";

        return;

    }


    if (
        gameState.trust < 45 ||
        gameState.stability < 45
    ) {

        gameState.administrationOutcome =
            "Your term ended with significant strain on public confidence or city stability.";

        return;

    }


    gameState.administrationOutcome =
        "Your mayoral term produced a mixed record of services, budgeting, neighborhood policy, council relations, and public accountability.";

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
            gameState.council +
            gameState.trust +
            gameState.stability
        ) / 4;


    const accomplishmentBonus =
        Math.min(
            8,
            (
                gameState.ordinancesSigned *
                2
            ) +
            (
                gameState.majorActions *
                0.75
            )
        );


    const governingQuality =
        gameState.fiscalDiscipline +
        gameState.councilSkill +
        gameState.serviceManagement +
        gameState.neighborhoodTrust +
        gameState.accountability;


    const governingBonus =
        Math.max(
            -10,
            Math.min(
                10,
                governingQuality
            )
        );


    const crisisPenalty =
        gameState.cityCrisis
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
            `Outstanding term. You balanced city services, neighborhood needs, council cooperation, fiscal responsibility, and public accountability with strong results. ${outcome}`
        );

    }


    if (
        grade === "A−" ||
        grade === "B+"
    ) {

        return (
            `Strong term. You managed major local responsibilities while maintaining generally effective relationships and city stability. ${outcome}`
        );

    }


    if (
        grade === "B" ||
        grade === "B−"
    ) {

        return (
            `Solid term. You achieved meaningful results, though some decisions reduced fiscal flexibility, neighborhood trust, service quality, or council cooperation. ${outcome}`
        );

    }


    if (
        grade === "C+" ||
        grade === "C"
    ) {

        return (
            `Mixed term. Stronger budgeting, council negotiation, service management, neighborhood engagement, and accountability would improve a future administration. ${outcome}`
        );

    }


    return (
        `A difficult term. Review how budgeting, public safety, housing, city services, council relations, emergency response, and accountability affected your mayoral record. ${outcome}`
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
        "finalMayorApproval",
        `${gameState.approval}%`
    );


    setText(
        "finalMayorCouncil",
        `${gameState.council}%`
    );


    setText(
        "finalMayorTrust",
        `${gameState.trust}%`
    );


    setText(
        "finalMayorStability",
        `${gameState.stability}%`
    );


    setText(
        "finalMayorOrdinancesSigned",
        gameState.ordinancesSigned
    );


    setText(
        "finalMayorMajorActions",
        gameState.majorActions
    );


    setText(
        "mayorFinalGrade",
        grade
    );


    const finalMessage =
        document.getElementById(
            "mayorFinalMessage"
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
        "mayorTermProgress",
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

        window.localStorage.setItem(
            "civicMayorSimulationCompleted",
            "true"
        );


        window.localStorage.setItem(
            "civicMayorSimulationLastGrade",
            grade
        );


        const previousRuns =
            Number(
                window.localStorage.getItem(
                    "civicMayorSimulationRuns"
                ) ||
                0
            );


        window.localStorage.setItem(
            "civicMayorSimulationRuns",
            String(
                previousRuns +
                1
            )
        );


        window.localStorage.setItem(
            "civicMayorSimulationLastOutcome",
            gameState.administrationOutcome
        );


        window.localStorage.setItem(
            "civicMayorSimulationLastApproval",
            String(
                gameState.approval
            )
        );


        window.localStorage.setItem(
            "civicMayorSimulationLastCouncil",
            String(
                gameState.council
            )
        );


        window.localStorage.setItem(
            "civicMayorSimulationLastTrust",
            String(
                gameState.trust
            )
        );


        window.localStorage.setItem(
            "civicMayorSimulationLastStability",
            String(
                gameState.stability
            )
        );


        window.localStorage.setItem(
            "civicMayorSimulationLastCityCrisis",
            String(
                gameState.cityCrisis
            )
        );

    } catch (error) {

        console.warn(
            "Mayor simulation record could not be saved:",
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
        66;


    gameState.council =
        60;


    gameState.trust =
        69;


    gameState.stability =
        71;


    gameState.ordinancesSigned =
        0;


    gameState.majorActions =
        0;


    gameState.fiscalDiscipline =
        0;


    gameState.councilSkill =
        0;


    gameState.serviceManagement =
        0;


    gameState.neighborhoodTrust =
        0;


    gameState.accountability =
        0;


    gameState.budgetResult =
        "pending";


    gameState.safetyResult =
        "pending";


    gameState.housingResult =
        "pending";


    gameState.servicesResult =
        "pending";


    gameState.councilResult =
        "pending";


    gameState.emergencyResult =
        "pending";


    gameState.fiscalResult =
        "pending";


    gameState.cityCrisis =
        false;


    gameState.administrationOutcome =
        "Your mayoral term is still unfolding.";

}


/*
==================================================
RESET CITY NEWS
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
        "mayor-news-item";


    const label =
        document.createElement(
            "span"
        );


    label.textContent =
        "City Hall";


    const headline =
        document.createElement(
            "p"
        );


    headline.textContent =
        anotherTerm
            ? "Mayor begins another term in office."
            : "New mayor begins first term.";


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

async function initializeMayorPage() {

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

initializeMayorPage();