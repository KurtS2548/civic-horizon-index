/*
==================================================
CIVIC HORIZON INDEX V2
SUPREME COURT SIMULATION
BRANCHING JUDICIAL ENGINE
==================================================
*/


/*
==================================================
FOUNDATION CASES
==================================================
*/

const courtCases = [

    /*
    ==================================================
    1. FREE SPEECH
    ==================================================
    */

    {
        id:
            "speechCase",

        category:
            "First Amendment",

        title:
            "A state law restricts political demonstrations near government buildings.",

        text:
            "The state argues that the restriction protects public safety. The challengers argue that it burdens political speech. How do you approach the case?",

        stage:
            "Constitutional Rights",

        choices: [

            {
                text:
                    "Strike down the law broadly without analyzing narrower alternatives",

                outcomeTitle:
                    "The ruling strongly protects speech",

                outcomeText:
                    "The decision expands constitutional protection but raises questions about whether the Court reached further than necessary.",

                trust:
                    1,

                legitimacy:
                    -2,

                precedent:
                    -2,

                restraint:
                    -5,

                casesDecided:
                    1,

                majorOpinions:
                    1,

                precedentDiscipline:
                    -2,

                constitutionalClarity:
                    1,

                institutionalCare:
                    -2,

                rightsProtection:
                    3,

                speechResult:
                    "broadStrike",

                headline:
                    "Supreme Court issues sweeping ruling against state protest restriction."
            },

            {
                text:
                    "Uphold the law because public safety automatically outweighs speech concerns",

                outcomeTitle:
                    "The Court defers heavily to the state",

                outcomeText:
                    "The ruling avoids disrupting state policy, but it gives limited attention to the constitutional burden on political speech.",

                trust:
                    -3,

                legitimacy:
                    -3,

                precedent:
                    -1,

                restraint:
                    3,

                casesDecided:
                    1,

                majorOpinions:
                    0,

                precedentDiscipline:
                    -1,

                constitutionalClarity:
                    -2,

                institutionalCare:
                    0,

                rightsProtection:
                    -3,

                speechResult:
                    "deferential",

                headline:
                    "Court upholds state protest restriction in narrow public-safety ruling."
            },

            {
                text:
                    "Apply established First Amendment standards and ask whether the restriction is narrowly tailored",

                outcomeTitle:
                    "The Court uses a structured constitutional test",

                outcomeText:
                    "The opinion focuses on the actual burden on speech, the government's interests, and whether less restrictive alternatives exist.",

                trust:
                    5,

                legitimacy:
                    6,

                precedent:
                    6,

                restraint:
                    4,

                casesDecided:
                    1,

                majorOpinions:
                    1,

                precedentDiscipline:
                    3,

                constitutionalClarity:
                    3,

                institutionalCare:
                    2,

                rightsProtection:
                    3,

                speechResult:
                    "structuredReview",

                headline:
                    "Supreme Court applies established First Amendment framework to protest law."
            },

            {
                text:
                    "Avoid deciding the constitutional question and dismiss the case despite clear jurisdiction",

                outcomeTitle:
                    "The dispute remains unresolved",

                outcomeText:
                    "The Court avoids a difficult ruling, but the lack of resolution creates uncertainty for lower courts and future cases.",

                trust:
                    -4,

                legitimacy:
                    -5,

                precedent:
                    -4,

                restraint:
                    2,

                casesDecided:
                    0,

                majorOpinions:
                    0,

                precedentDiscipline:
                    -1,

                constitutionalClarity:
                    -3,

                institutionalCare:
                    -2,

                rightsProtection:
                    -1,

                speechResult:
                    "avoided",

                headline:
                    "Court declines to resolve major protest-speech dispute."
            }

        ]

    },


    /*
    ==================================================
    2. FEDERAL POWER
    ==================================================
    */

    {
        id:
            "federalPowerCase",

        category:
            "Federalism",

        title:
            "Congress passes a federal law regulating activity traditionally handled by states.",

        text:
            "The challenge asks whether Congress acted within its constitutional authority. How do you evaluate the law?",

        stage:
            "Federal Power",

        choices: [

            {
                text:
                    "Assume Congress can regulate anything it considers nationally important",

                outcomeTitle:
                    "Federal power expands sharply",

                outcomeText:
                    "The ruling simplifies federal authority but weakens meaningful constitutional limits on congressional power.",

                trust:
                    -2,

                legitimacy:
                    -4,

                precedent:
                    -4,

                restraint:
                    -5,

                casesDecided:
                    1,

                majorOpinions:
                    1,

                precedentDiscipline:
                    -2,

                constitutionalClarity:
                    -2,

                institutionalCare:
                    -1,

                rightsProtection:
                    0,

                federalismResult:
                    "broadFederalPower",

                headline:
                    "Court adopts expansive view of congressional authority."
            },

            {
                text:
                    "Strike down the law because states always control local matters",

                outcomeTitle:
                    "State authority receives strong protection",

                outcomeText:
                    "The ruling protects federalism, but it risks ignoring circumstances in which the Constitution does authorize federal action.",

                trust:
                    0,

                legitimacy:
                    -1,

                precedent:
                    -2,

                restraint:
                    -2,

                casesDecided:
                    1,

                majorOpinions:
                    1,

                precedentDiscipline:
                    -1,

                constitutionalClarity:
                    -1,

                institutionalCare:
                    0,

                rightsProtection:
                    0,

                federalismResult:
                    "broadStatePower",

                headline:
                    "Supreme Court sharply limits federal law in state-regulated area."
            },

            {
                text:
                    "Examine the specific constitutional source of authority and the law's connection to it",

                outcomeTitle:
                    "The Court defines the constitutional boundary",

                outcomeText:
                    "The opinion distinguishes legitimate federal authority from areas where Congress would exceed the powers granted to it.",

                trust:
                    4,

                legitimacy:
                    6,

                precedent:
                    6,

                restraint:
                    5,

                casesDecided:
                    1,

                majorOpinions:
                    1,

                precedentDiscipline:
                    3,

                constitutionalClarity:
                    4,

                institutionalCare:
                    2,

                rightsProtection:
                    0,

                federalismResult:
                    "boundedPower",

                headline:
                    "Court defines limits of congressional authority in federalism ruling."
            },

            {
                text:
                    "Decide the case based on which level of government you personally prefer",

                outcomeTitle:
                    "The legal reasoning appears political",

                outcomeText:
                    "The result may satisfy one side, but the opinion provides little neutral constitutional guidance for future cases.",

                trust:
                    -7,

                legitimacy:
                    -9,

                precedent:
                    -6,

                restraint:
                    -4,

                casesDecided:
                    1,

                majorOpinions:
                    0,

                precedentDiscipline:
                    -4,

                constitutionalClarity:
                    -4,

                institutionalCare:
                    -4,

                rightsProtection:
                    0,

                federalismResult:
                    "political",

                headline:
                    "Court federalism decision draws criticism over legal reasoning."
            }

        ]

    },


    /*
    ==================================================
    3. PRECEDENT
    ==================================================
    */

    {
        id:
            "precedentCase",

        category:
            "Precedent",

        title:
            "A major constitutional precedent is directly challenged.",

        text:
            "The precedent has shaped the law for decades, but serious arguments are made that its reasoning was flawed. What matters most in your analysis?",

        stage:
            "Stare Decisis",

        choices: [

            {
                text:
                    "Overrule the precedent simply because you would have decided the original case differently",

                outcomeTitle:
                    "The Court changes course quickly",

                outcomeText:
                    "The ruling replaces the earlier interpretation but gives limited weight to reliance, stability, or institutional continuity.",

                trust:
                    -4,

                legitimacy:
                    -6,

                precedent:
                    -12,

                restraint:
                    -5,

                casesDecided:
                    1,

                majorOpinions:
                    1,

                precedentDiscipline:
                    -5,

                constitutionalClarity:
                    0,

                institutionalCare:
                    -4,

                rightsProtection:
                    0,

                precedentResult:
                    "casualOverrule",

                headline:
                    "Supreme Court overturns longstanding precedent in major constitutional ruling."
            },

            {
                text:
                    "Refuse to reconsider precedent under any circumstances",

                outcomeTitle:
                    "The law remains stable",

                outcomeText:
                    "The approach protects continuity, but it leaves little room to correct precedent that may be seriously inconsistent with law or constitutional structure.",

                trust:
                    1,

                legitimacy:
                    1,

                precedent:
                    7,

                restraint:
                    5,

                casesDecided:
                    1,

                majorOpinions:
                    0,

                precedentDiscipline:
                    2,

                constitutionalClarity:
                    -1,

                institutionalCare:
                    2,

                rightsProtection:
                    0,

                precedentResult:
                    "absoluteStareDecisis",

                headline:
                    "Court declines invitation to reconsider longstanding precedent."
            },

            {
                text:
                    "Evaluate the precedent's reasoning, workability, reliance interests, and consistency with later law",

                outcomeTitle:
                    "The Court conducts a full stare decisis analysis",

                outcomeText:
                    "The opinion treats precedent as important but not automatically permanent, explaining carefully why stability should or should not yield.",

                trust:
                    6,

                legitimacy:
                    7,

                precedent:
                    5,

                restraint:
                    5,

                casesDecided:
                    1,

                majorOpinions:
                    1,

                precedentDiscipline:
                    5,

                constitutionalClarity:
                    3,

                institutionalCare:
                    4,

                rightsProtection:
                    0,

                precedentResult:
                    "structuredReview",

                headline:
                    "Supreme Court conducts detailed stare decisis review in major case."
            },

            {
                text:
                    "Base the decision primarily on current public opinion",

                outcomeTitle:
                    "The Court appears responsive to politics",

                outcomeText:
                    "Public sentiment may provide context, but constitutional precedent becomes unstable when judicial doctrine changes primarily with political popularity.",

                trust:
                    -5,

                legitimacy:
                    -10,

                precedent:
                    -9,

                restraint:
                    -4,

                casesDecided:
                    1,

                majorOpinions:
                    0,

                precedentDiscipline:
                    -5,

                constitutionalClarity:
                    -3,

                institutionalCare:
                    -5,

                rightsProtection:
                    0,

                precedentResult:
                    "political",

                headline:
                    "Court precedent ruling sparks debate over political influence."
            }

        ]

    },


    /*
    ==================================================
    4. EXECUTIVE POWER
    ==================================================
    */

    {
        id:
            "executivePowerCase",

        category:
            "Separation of Powers",

        title:
            "The president claims broad emergency authority that Congress never clearly granted.",

        text:
            "The administration argues that urgent national circumstances justify the action. Congress argues that the president exceeded executive power. How do you proceed?",

        stage:
            "Executive Authority",

        choices: [

            {
                text:
                    "Accept the emergency claim because presidents need flexibility in every crisis",

                outcomeTitle:
                    "Executive power expands",

                outcomeText:
                    "The ruling gives the president substantial freedom but provides few meaningful limits for future emergencies.",

                trust:
                    -2,

                legitimacy:
                    -5,

                precedent:
                    -4,

                restraint:
                    -5,

                casesDecided:
                    1,

                majorOpinions:
                    1,

                precedentDiscipline:
                    -2,

                constitutionalClarity:
                    -3,

                institutionalCare:
                    -2,

                rightsProtection:
                    -1,

                executiveResult:
                    "broadDeference",

                headline:
                    "Court grants president broad emergency authority."
            },

            {
                text:
                    "Reject any presidential emergency authority unless Congress expressly describes every action",

                outcomeTitle:
                    "Executive flexibility narrows sharply",

                outcomeText:
                    "The ruling strongly protects legislative authority but may be too rigid about powers the Constitution assigns to the executive branch.",

                trust:
                    0,

                legitimacy:
                    0,

                precedent:
                    1,

                restraint:
                    2,

                casesDecided:
                    1,

                majorOpinions:
                    1,

                precedentDiscipline:
                    1,

                constitutionalClarity:
                    0,

                institutionalCare:
                    1,

                rightsProtection:
                    0,

                executiveResult:
                    "strictLimit",

                headline:
                    "Supreme Court sharply limits presidential emergency authority."
            },

            {
                text:
                    "Examine constitutional text, congressional statutes, and the relationship between executive and legislative authority",

                outcomeTitle:
                    "The Court defines the separation-of-powers boundary",

                outcomeText:
                    "The opinion recognizes legitimate executive responsibility while identifying where presidential action requires congressional authorization.",

                trust:
                    5,

                legitimacy:
                    7,

                precedent:
                    6,

                restraint:
                    5,

                casesDecided:
                    1,

                majorOpinions:
                    1,

                precedentDiscipline:
                    4,

                constitutionalClarity:
                    5,

                institutionalCare:
                    4,

                rightsProtection:
                    1,

                executiveResult:
                    "boundedAuthority",

                headline:
                    "Court defines constitutional limits on presidential emergency power."
            },

            {
                text:
                    "Avoid ruling because the dispute involves the other branches",

                outcomeTitle:
                    "The institutional conflict continues",

                outcomeText:
                    "Courts sometimes avoid disputes they lack authority to decide, but refusing a properly presented constitutional case leaves major uncertainty unresolved.",

                trust:
                    -4,

                legitimacy:
                    -5,

                precedent:
                    -3,

                restraint:
                    2,

                casesDecided:
                    0,

                majorOpinions:
                    0,

                precedentDiscipline:
                    -1,

                constitutionalClarity:
                    -4,

                institutionalCare:
                    -2,

                rightsProtection:
                    0,

                executiveResult:
                    "unresolved",

                headline:
                    "Court declines to resolve major executive-power dispute."
            }

        ]

    }

];


/*
==================================================
JUDICIAL STATE
==================================================
*/

const gameState = {

    trust:
        68,

    legitimacy:
        72,

    precedent:
        70,

    restraint:
        65,

    casesDecided:
        0,

    majorOpinions:
        0,


    /*
    ----------------------------------------------
    HIDDEN JUDICIAL METRICS
    ----------------------------------------------
    */

    precedentDiscipline:
        0,

    constitutionalClarity:
        0,

    institutionalCare:
        0,

    rightsProtection:
        0,


    /*
    ----------------------------------------------
    CASE RESULTS
    ----------------------------------------------
    */

    speechResult:
        "pending",

    federalismResult:
        "pending",

    precedentResult:
        "pending",

    executiveResult:
        "pending",

    emergencyRightsResult:
        "pending",

    stateFederalResult:
        "pending",

    legitimacyCrisis:
        false,

    judicialOutcome:
        "Your judicial record is still developing."

};


/*
==================================================
INITIAL FLOW
==================================================
*/

let simulationFlow = [

    courtCases[0],

    courtCases[1],

    courtCases[2],

    courtCases[3]

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
        "courtStartScreen"
    );


const gameScreen =
    document.getElementById(
        "courtGameScreen"
    );


const resultsScreen =
    document.getElementById(
        "courtResultsScreen"
    );


const startButton =
    document.getElementById(
        "courtStartButton"
    );


const restartButton =
    document.getElementById(
        "courtRestartButton"
    );


const continueButton =
    document.getElementById(
        "courtContinueButton"
    );


const scenarioCategory =
    document.getElementById(
        "courtScenarioCategory"
    );


const scenarioProgress =
    document.getElementById(
        "courtScenarioProgress"
    );


const scenarioTitle =
    document.getElementById(
        "courtScenarioTitle"
    );


const scenarioText =
    document.getElementById(
        "courtScenarioText"
    );


const choiceContainer =
    document.getElementById(
        "courtChoiceContainer"
    );


const outcome =
    document.getElementById(
        "courtOutcome"
    );


const outcomeIcon =
    document.getElementById(
        "courtOutcomeIcon"
    );


const outcomeTitle =
    document.getElementById(
        "courtOutcomeTitle"
    );


const outcomeText =
    document.getElementById(
        "courtOutcomeText"
    );


const newsFeed =
    document.getElementById(
        "courtNewsFeed"
    );
    /*
==================================================
EMERGENCY RIGHTS — STABLE COURT PATH
==================================================
*/

const emergencyRightsStableScenario = {

    id:
        "emergencyRightsStable",

    category:
        "Emergency Powers",

    title:
        "A national emergency leads the government to restrict movement and public gatherings.",

    text:
        "The government argues that the restrictions are temporary and necessary. Challengers argue that the measures burden constitutional rights. How do you review the case?",

    stage:
        "Emergency Rights",

    choices: [

        {
            text:
                "Defer completely because courts should never question emergency measures",

            outcomeTitle:
                "Judicial review weakens",

            outcomeText:
                "The ruling gives officials broad flexibility but leaves few meaningful constitutional checks during emergencies.",

            trust:
                -3,

            legitimacy:
                -5,

            precedent:
                -3,

            restraint:
                1,

            casesDecided:
                1,

            majorOpinions:
                1,

            precedentDiscipline:
                -1,

            constitutionalClarity:
                -3,

            institutionalCare:
                -2,

            rightsProtection:
                -4,

            emergencyRightsResult:
                "totalDeference",

            headline:
                "Supreme Court gives government broad deference during national emergency."
        },

        {
            text:
                "Strike down every emergency restriction regardless of duration or necessity",

            outcomeTitle:
                "Rights receive absolute protection",

            outcomeText:
                "The ruling strongly protects liberty but gives little room for lawful emergency measures tailored to genuine public needs.",

            trust:
                1,

            legitimacy:
                -1,

            precedent:
                -2,

            restraint:
                -4,

            casesDecided:
                1,

            majorOpinions:
                1,

            precedentDiscipline:
                -1,

            constitutionalClarity:
                0,

            institutionalCare:
                -1,

            rightsProtection:
                4,

            emergencyRightsResult:
                "absoluteRights",

            headline:
                "Court invalidates broad emergency restrictions in sweeping ruling."
        },

        {
            text:
                "Apply constitutional review while considering necessity, tailoring, duration, and available alternatives",

            outcomeTitle:
                "The Court balances emergency authority with constitutional limits",

            outcomeText:
                "The opinion recognizes legitimate emergency powers while requiring the government to justify burdens on protected rights.",

            trust:
                6,

            legitimacy:
                7,

            precedent:
                6,

            restraint:
                5,

            casesDecided:
                1,

            majorOpinions:
                1,

            precedentDiscipline:
                4,

            constitutionalClarity:
                5,

            institutionalCare:
                4,

            rightsProtection:
                4,

            emergencyRightsResult:
                "structuredReview",

            headline:
                "Supreme Court sets constitutional framework for emergency restrictions."
        },

        {
            text:
                "Base the decision primarily on whether the restrictions are popular",

            outcomeTitle:
                "The Court appears politically responsive",

            outcomeText:
                "Public opinion may matter politically, but constitutional review becomes unstable when legal protection changes with popularity.",

            trust:
                -5,

            legitimacy:
                -9,

            precedent:
                -6,

            restraint:
                -3,

            casesDecided:
                1,

            majorOpinions:
                0,

            precedentDiscipline:
                -3,

            constitutionalClarity:
                -4,

            institutionalCare:
                -5,

            rightsProtection:
                -2,

            emergencyRightsResult:
                "political",

            headline:
                "Emergency-rights ruling draws criticism over political influence."
        }

    ]

};


/*
==================================================
EMERGENCY RIGHTS — LEGITIMACY PRESSURE PATH
==================================================
*/

const emergencyRightsPressureScenario = {

    id:
        "emergencyRightsPressure",

    category:
        "Emergency Powers",

    title:
        "A major emergency reaches the Court while confidence in the institution is already strained.",

    text:
        "The public expects a fast decision, political leaders are attacking the Court from both sides, and constitutional rights are at stake. How do you proceed?",

    stage:
        "Emergency Review Under Pressure",

    choices: [

        {
            text:
                "Issue a narrow ruling tied closely to the facts and existing law",

            outcomeTitle:
                "The Court limits the reach of its decision",

            outcomeText:
                "The opinion resolves the immediate dispute without unnecessarily deciding broader constitutional questions.",

            trust:
                4,

            legitimacy:
                8,

            precedent:
                6,

            restraint:
                7,

            casesDecided:
                1,

            majorOpinions:
                1,

            precedentDiscipline:
                4,

            constitutionalClarity:
                3,

            institutionalCare:
                5,

            rightsProtection:
                2,

            emergencyRightsResult:
                "narrow",

            headline:
                "Court issues narrow emergency ruling amid intense political pressure."
        },

        {
            text:
                "Use the case to settle several unrelated constitutional questions",

            outcomeTitle:
                "The ruling reaches beyond the dispute",

            outcomeText:
                "The Court provides sweeping doctrine, but critics argue that the justices decided issues that were not necessary to resolve the case.",

            trust:
                -4,

            legitimacy:
                -7,

            precedent:
                -4,

            restraint:
                -7,

            casesDecided:
                1,

            majorOpinions:
                1,

            precedentDiscipline:
                -3,

            constitutionalClarity:
                1,

            institutionalCare:
                -5,

            rightsProtection:
                1,

            emergencyRightsResult:
                "sweeping",

            headline:
                "Supreme Court uses emergency case for broad constitutional ruling."
        },

        {
            text:
                "Delay the case until the emergency is over even though immediate rights remain affected",

            outcomeTitle:
                "The Court avoids the immediate controversy",

            outcomeText:
                "The delay reduces short-term political pressure but leaves unresolved constitutional burdens in place.",

            trust:
                -5,

            legitimacy:
                -6,

            precedent:
                -2,

            restraint:
                3,

            casesDecided:
                0,

            majorOpinions:
                0,

            precedentDiscipline:
                -1,

            constitutionalClarity:
                -4,

            institutionalCare:
                -3,

            rightsProtection:
                -3,

            emergencyRightsResult:
                "delayed",

            headline:
                "Court postpones major emergency-rights dispute."
        },

        {
            text:
                "Write the opinion to satisfy whichever political coalition currently supports the Court",

            outcomeTitle:
                "Institutional legitimacy deteriorates",

            outcomeText:
                "The ruling may reduce immediate criticism from one side, but it reinforces the perception that constitutional law is being shaped by political pressure.",

            trust:
                -10,

            legitimacy:
                -14,

            precedent:
                -8,

            restraint:
                -5,

            casesDecided:
                1,

            majorOpinions:
                0,

            precedentDiscipline:
                -5,

            constitutionalClarity:
                -4,

            institutionalCare:
                -7,

            rightsProtection:
                -1,

            emergencyRightsResult:
                "politicized",

            legitimacyCrisis:
                true,

            headline:
                "Court faces legitimacy crisis after politically charged emergency ruling."
        }

    ]

};


/*
==================================================
STATE-FEDERAL CONFLICT — STABLE PATH
==================================================
*/

const stateFederalStableScenario = {

    id:
        "stateFederalStable",

    category:
        "Federalism",

    title:
        "A state openly refuses to comply with a valid federal court judgment.",

    text:
        "State officials argue that they disagree with the constitutional ruling and should be free to ignore it. What principle guides your response?",

    stage:
        "Judicial Authority",

    choices: [

        {
            text:
                "Explain that binding federal judgments must be followed while recognizing lawful avenues for further review",

            outcomeTitle:
                "The Court reinforces the rule of law",

            outcomeText:
                "The opinion distinguishes disagreement with a judgment from lawful authority to disregard it.",

            trust:
                6,

            legitimacy:
                8,

            precedent:
                6,

            restraint:
                5,

            casesDecided:
                1,

            majorOpinions:
                1,

            precedentDiscipline:
                4,

            constitutionalClarity:
                5,

            institutionalCare:
                5,

            rightsProtection:
                2,

            stateFederalResult:
                "judgmentEnforced",

            headline:
                "Supreme Court reaffirms binding force of federal judgments."
        },

        {
            text:
                "Allow states to ignore federal judgments whenever they disagree",

            outcomeTitle:
                "Judicial authority weakens sharply",

            outcomeText:
                "The approach would undermine the ability of federal courts to resolve disputes under federal law.",

            trust:
                -6,

            legitimacy:
                -12,

            precedent:
                -8,

            restraint:
                -2,

            casesDecided:
                1,

            majorOpinions:
                1,

            precedentDiscipline:
                -4,

            constitutionalClarity:
                -5,

            institutionalCare:
                -6,

            rightsProtection:
                -3,

            stateFederalResult:
                "defianceAllowed",

            legitimacyCrisis:
                true,

            headline:
                "Court ruling raises uncertainty over enforcement of federal judgments."
        },

        {
            text:
                "Order sweeping federal control over the entire state government",

            outcomeTitle:
                "The remedy exceeds the dispute",

            outcomeText:
                "The Court may enforce its judgment, but judicial remedies still need to remain tied to the actual legal violation.",

            trust:
                -2,

            legitimacy:
                -4,

            precedent:
                -2,

            restraint:
                -7,

            casesDecided:
                1,

            majorOpinions:
                1,

            precedentDiscipline:
                -1,

            constitutionalClarity:
                1,

            institutionalCare:
                -3,

            rightsProtection:
                1,

            stateFederalResult:
                "overbroadRemedy",

            headline:
                "Supreme Court enforcement order criticized as overly broad."
        },

        {
            text:
                "Avoid addressing enforcement because compliance is politically controversial",

            outcomeTitle:
                "The conflict continues",

            outcomeText:
                "The Court leaves uncertainty over whether its own judgments will be obeyed.",

            trust:
                -7,

            legitimacy:
                -10,

            precedent:
                -5,

            restraint:
                1,

            casesDecided:
                0,

            majorOpinions:
                0,

            precedentDiscipline:
                -2,

            constitutionalClarity:
                -4,

            institutionalCare:
                -6,

            rightsProtection:
                -2,

            stateFederalResult:
                "unresolved",

            legitimacyCrisis:
                true,

            headline:
                "Federal-state confrontation continues after Court avoids enforcement question."
        }

    ]

};


/*
==================================================
STATE-FEDERAL CONFLICT — CRISIS PATH
==================================================
*/

const stateFederalCrisisScenario = {

    id:
        "stateFederalCrisis",

    category:
        "Institutional Crisis",

    title:
        "A state challenges a federal judgment while the Court itself faces unusually low confidence.",

    text:
        "The dispute now tests both federalism and whether institutions will continue to respect judicial judgments. How do you respond?",

    stage:
        "Court Legitimacy Crisis",

    choices: [

        {
            text:
                "Issue a carefully limited enforcement ruling grounded in existing precedent",

            outcomeTitle:
                "The Court strengthens its legal footing",

            outcomeText:
                "The opinion avoids escalating the conflict beyond what is necessary while clearly defending the authority of lawful judgments.",

            trust:
                5,

            legitimacy:
                10,

            precedent:
                8,

            restraint:
                7,

            casesDecided:
                1,

            majorOpinions:
                1,

            precedentDiscipline:
                5,

            constitutionalClarity:
                5,

            institutionalCare:
                7,

            rightsProtection:
                2,

            stateFederalResult:
                "crisisManaged",

            legitimacyCrisis:
                false,

            headline:
                "Court issues narrow enforcement ruling during institutional crisis."
        },

        {
            text:
                "Respond to criticism with an unnecessarily sweeping assertion of judicial supremacy",

            outcomeTitle:
                "The confrontation intensifies",

            outcomeText:
                "The opinion defends judicial authority but reaches beyond what is needed to resolve the specific dispute.",

            trust:
                -3,

            legitimacy:
                -6,

            precedent:
                -2,

            restraint:
                -8,

            casesDecided:
                1,

            majorOpinions:
                1,

            precedentDiscipline:
                -1,

            constitutionalClarity:
                1,

            institutionalCare:
                -5,

            rightsProtection:
                1,

            stateFederalResult:
                "escalated",

            legitimacyCrisis:
                true,

            headline:
                "Court-state confrontation intensifies after sweeping judicial ruling."
        },

        {
            text:
                "Invite the political branches to negotiate instead of deciding the legal dispute",

            outcomeTitle:
                "The legal question remains unsettled",

            outcomeText:
                "Political negotiation may reduce tension, but the Court leaves unresolved a properly presented question about the force of federal judgments.",

            trust:
                -3,

            legitimacy:
                -5,

            precedent:
                -4,

            restraint:
                4,

            casesDecided:
                0,

            majorOpinions:
                0,

            precedentDiscipline:
                -2,

            constitutionalClarity:
                -4,

            institutionalCare:
                -2,

            rightsProtection:
                -1,

            stateFederalResult:
                "politicalResolution",

            headline:
                "Court declines to resolve enforcement dispute and urges political settlement."
        },

        {
            text:
                "Tailor the outcome to avoid criticism from state officials",

            outcomeTitle:
                "The Court appears intimidated by political pressure",

            outcomeText:
                "The short-term confrontation may ease, but the long-term authority and independence of the Court deteriorate.",

            trust:
                -9,

            legitimacy:
                -15,

            precedent:
                -7,

            restraint:
                -2,

            casesDecided:
                1,

            majorOpinions:
                0,

            precedentDiscipline:
                -4,

            constitutionalClarity:
                -4,

            institutionalCare:
                -8,

            rightsProtection:
                -2,

            stateFederalResult:
                "politicalRetreat",

            legitimacyCrisis:
                true,

            headline:
                "Court faces criticism after retreat during federal-state confrontation."
        }

    ]

};


/*
==================================================
FINAL JUDICIAL ACCOUNTABILITY — STABLE TERM
==================================================
*/

const judicialAccountabilityStableScenario = {

    id:
        "judicialAccountabilityStable",

    category:
        "Judicial Accountability",

    title:
        "The Court's term is ending, and several of your opinions will shape future constitutional disputes.",

    text:
        "How do you approach the final major opinion of the term?",

    stage:
        "End of Term",

    choices: [

        {
            text:
                "Write a clear opinion explaining the rule, its limits, and how precedent applies",

            outcomeTitle:
                "The opinion provides durable guidance",

            outcomeText:
                "Lower courts and future litigants receive a clear explanation of both the holding and its boundaries.",

            trust:
                5,

            legitimacy:
                7,

            precedent:
                7,

            restraint:
                6,

            casesDecided:
                1,

            majorOpinions:
                1,

            precedentDiscipline:
                5,

            constitutionalClarity:
                6,

            institutionalCare:
                5,

            rightsProtection:
                1,

            headline:
                "Justice authors carefully bounded end-of-term constitutional opinion."
        },

        {
            text:
                "Write the broadest possible rule so future courts have little flexibility",

            outcomeTitle:
                "The opinion reaches far beyond the case",

            outcomeText:
                "The ruling creates a clear rule, but its breadth may create unintended consequences in disputes the Court has not yet considered.",

            trust:
                -1,

            legitimacy:
                -3,

            precedent:
                -2,

            restraint:
                -7,

            casesDecided:
                1,

            majorOpinions:
                1,

            precedentDiscipline:
                -2,

            constitutionalClarity:
                2,

            institutionalCare:
                -3,

            rightsProtection:
                1,

            headline:
                "Sweeping final opinion raises questions about future consequences."
        },

        {
            text:
                "Change the legal reasoning mainly to produce the outcome you personally prefer",

            outcomeTitle:
                "The opinion appears result-driven",

            outcomeText:
                "The judgment resolves the case, but inconsistent reasoning weakens confidence in neutral legal decision-making.",

            trust:
                -7,

            legitimacy:
                -10,

            precedent:
                -7,

            restraint:
                -4,

            casesDecided:
                1,

            majorOpinions:
                1,

            precedentDiscipline:
                -5,

            constitutionalClarity:
                -4,

            institutionalCare:
                -5,

            rightsProtection:
                0,

            headline:
                "End-of-term Court opinion criticized as result-driven."
        },

        {
            text:
                "Avoid explaining the reasoning in detail",

            outcomeTitle:
                "The ruling creates uncertainty",

            outcomeText:
                "The judgment settles the immediate dispute but gives lower courts little guidance for future cases.",

            trust:
                -3,

            legitimacy:
                -4,

            precedent:
                -5,

            restraint:
                1,

            casesDecided:
                1,

            majorOpinions:
                0,

            precedentDiscipline:
                -2,

            constitutionalClarity:
                -5,

            institutionalCare:
                -2,

            rightsProtection:
                0,

            headline:
                "Brief Court ruling leaves lower courts uncertain about constitutional standard."
        }

    ]

};


/*
==================================================
FINAL JUDICIAL ACCOUNTABILITY — CRISIS TERM
==================================================
*/

const judicialAccountabilityCrisisScenario = {

    id:
        "judicialAccountabilityCrisis",

    category:
        "Judicial Accountability",

    title:
        "The Court reaches the end of a term marked by significant legitimacy concerns.",

    text:
        "The institution's future credibility may depend on how the justices explain their work. What do you do?",

    stage:
        "Institutional Reckoning",

    choices: [

        {
            text:
                "Issue a carefully reasoned opinion and openly explain the legal limits of the Court's role",

            outcomeTitle:
                "The Court begins rebuilding confidence",

            outcomeText:
                "The opinion cannot erase prior controversy, but disciplined reasoning and institutional restraint strengthen the Court's legal credibility.",

            trust:
                5,

            legitimacy:
                12,

            precedent:
                8,

            restraint:
                8,

            casesDecided:
                1,

            majorOpinions:
                1,

            precedentDiscipline:
                6,

            constitutionalClarity:
                6,

            institutionalCare:
                8,

            rightsProtection:
                1,

            legitimacyCrisis:
                false,

            headline:
                "Court closes controversial term with restrained institutional opinion."
        },

        {
            text:
                "Dismiss all criticism as illegitimate and make no changes to the Court's approach",

            outcomeTitle:
                "The legitimacy crisis continues",

            outcomeText:
                "The Court retains its formal authority, but public and institutional confidence continue to weaken.",

            trust:
                -6,

            legitimacy:
                -10,

            precedent:
                -3,

            restraint:
                -3,

            casesDecided:
                1,

            majorOpinions:
                0,

            precedentDiscipline:
                -1,

            constitutionalClarity:
                -2,

            institutionalCare:
                -6,

            rightsProtection:
                0,

            legitimacyCrisis:
                true,

            headline:
                "Court ends term amid continuing legitimacy concerns."
        },

        {
            text:
                "Shape the opinion to win immediate public approval",

            outcomeTitle:
                "Short-term approval comes at institutional cost",

            outcomeText:
                "The decision may temporarily reduce criticism, but it reinforces the idea that constitutional interpretation changes with political pressure.",

            trust:
                1,

            legitimacy:
                -8,

            precedent:
                -7,

            restraint:
                -4,

            casesDecided:
                1,

            majorOpinions:
                1,

            precedentDiscipline:
                -4,

            constitutionalClarity:
                -3,

            institutionalCare:
                -6,

            rightsProtection:
                0,

            legitimacyCrisis:
                true,

            headline:
                "Court ruling sparks debate over influence of public opinion."
        },

        {
            text:
                "Refuse to issue an opinion in a major case because the Court is under criticism",

            outcomeTitle:
                "Institutional uncertainty deepens",

            outcomeText:
                "Avoiding a properly presented case because of public criticism weakens confidence in the Court's ability to perform its constitutional role.",

            trust:
                -8,

            legitimacy:
                -12,

            precedent:
                -6,

            restraint:
                1,

            casesDecided:
                0,

            majorOpinions:
                0,

            precedentDiscipline:
                -3,

            constitutionalClarity:
                -5,

            institutionalCare:
                -7,

            rightsProtection:
                -1,

            legitimacyCrisis:
                true,

            headline:
                "Court declines major case amid institutional controversy."
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

            courtCases[0],

            courtCases[1],

            courtCases[2],

            courtCases[3]

        ];

}


/*
==================================================
EXPECTED DOCKET LENGTH
==================================================
*/

function getEstimatedDecisionCount() {

    return 7;

}


/*
==================================================
DASHBOARD
==================================================
*/

function updateDashboard() {

    gameState.trust =
        clamp(
            gameState.trust
        );


    gameState.legitimacy =
        clamp(
            gameState.legitimacy
        );


    gameState.precedent =
        clamp(
            gameState.precedent
        );


    gameState.restraint =
        clamp(
            gameState.restraint
        );


    setText(
        "courtTrust",
        `${gameState.trust}%`
    );


    setText(
        "courtLegitimacy",
        `${gameState.legitimacy}%`
    );


    setText(
        "courtPrecedent",
        `${gameState.precedent}%`
    );


    setText(
        "courtRestraint",
        `${gameState.restraint}%`
    );


    setText(
        "courtCasesDecided",
        gameState.casesDecided
    );


    setText(
        "courtMajorOpinions",
        gameState.majorOpinions
    );


    setText(
        "courtPanelTrust",
        `${gameState.trust}%`
    );


    setText(
        "courtPanelLegitimacy",
        `${gameState.legitimacy}%`
    );


    setText(
        "courtPanelPrecedent",
        `${gameState.precedent}%`
    );


    setText(
        "courtPanelRestraint",
        `${gameState.restraint}%`
    );


    setText(
        "sideCourtCasesDecided",
        gameState.casesDecided
    );


    setText(
        "sideCourtMajorOpinions",
        gameState.majorOpinions
    );


    updateMetric(
        "sideCourtTrust",
        "sideCourtTrustBar",
        gameState.trust
    );


    updateMetric(
        "sideCourtLegitimacy",
        "sideCourtLegitimacyBar",
        gameState.legitimacy
    );


    updateMetric(
        "sideCourtPrecedent",
        "sideCourtPrecedentBar",
        gameState.precedent
    );


    updateMetric(
        "sideCourtRestraint",
        "sideCourtRestraintBar",
        gameState.restraint
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
        "courtTermProgress",
        `${progress}%`
    );

}


/*
==================================================
SELECT EMERGENCY-RIGHTS PATH
==================================================
*/

function determineEmergencyRightsScenario() {

    const institutionalStrength =
        (
            gameState.legitimacy +
            gameState.trust
        ) / 2;


    const hiddenStrength =
        (
            gameState.institutionalCare * 3
        ) +
        (
            gameState.precedentDiscipline * 2
        );


    if (
        institutionalStrength +
        hiddenStrength >=
        72
    ) {

        return emergencyRightsStableScenario;

    }


    return emergencyRightsPressureScenario;

}


/*
==================================================
SELECT STATE-FEDERAL PATH
==================================================
*/

function determineStateFederalScenario() {

    if (
        gameState.legitimacyCrisis ||
        gameState.legitimacy <
            50 ||
        gameState.institutionalCare <=
            -4
    ) {

        return stateFederalCrisisScenario;

    }


    return stateFederalStableScenario;

}


/*
==================================================
SELECT ACCOUNTABILITY PATH
==================================================
*/

function determineFinalAccountabilityScenario() {

    if (
        gameState.legitimacyCrisis ||
        gameState.legitimacy <
            50 ||
        gameState.trust <
            45
    ) {

        return judicialAccountabilityCrisisScenario;

    }


    return judicialAccountabilityStableScenario;

}


/*
==================================================
RENDER CASE
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
        "courtTurnLabel",
        `Case ${currentScenarioIndex + 1}`
    );


    setText(
        "courtCurrentStage",
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
                            class="court-choice-button"
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
            ".court-choice-button"
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
            ".court-choice-button"
        )
        .forEach(
            button => {

                button.disabled =
                    true;

            }
        );


    selectedButton.classList.add(
        "court-choice-selected"
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
                ? "View Judicial Report"
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

    gameState.trust +=
        Number(
            choice.trust ||
            0
        );


    gameState.legitimacy +=
        Number(
            choice.legitimacy ||
            0
        );


    gameState.precedent +=
        Number(
            choice.precedent ||
            0
        );


    gameState.restraint +=
        Number(
            choice.restraint ||
            0
        );


    gameState.casesDecided +=
        Number(
            choice.casesDecided ||
            0
        );


    gameState.majorOpinions +=
        Number(
            choice.majorOpinions ||
            0
        );


    gameState.precedentDiscipline +=
        Number(
            choice.precedentDiscipline ||
            0
        );


    gameState.constitutionalClarity +=
        Number(
            choice.constitutionalClarity ||
            0
        );


    gameState.institutionalCare +=
        Number(
            choice.institutionalCare ||
            0
        );


    gameState.rightsProtection +=
        Number(
            choice.rightsProtection ||
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

        "speechResult",

        "federalismResult",

        "precedentResult",

        "executiveResult",

        "emergencyRightsResult",

        "stateFederalResult"

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
        typeof choice.legitimacyCrisis ===
        "boolean"
    ) {

        gameState.legitimacyCrisis =
            choice.legitimacyCrisis;

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
            choice.trust ||
            0
        ) +
        Number(
            choice.legitimacy ||
            0
        ) +
        Number(
            choice.precedent ||
            0
        ) +
        Number(
            choice.restraint ||
            0
        );


    if (
        outcomeIcon
    ) {

        if (
            totalChange >=
            12
        ) {

            outcomeIcon.textContent =
                "✓";

        } else if (
            totalChange <=
            -12
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
PREPARE NEXT BRANCH
==================================================
*/

function prepareNextBranch(
    scenario
) {

    /*
    ----------------------------------------------
    AFTER FOUNDATION CASES
    ----------------------------------------------
    */

    if (
        scenario.id ===
        "executivePowerCase"
    ) {

        appendScenarioIfMissing(
            determineEmergencyRightsScenario()
        );


        return;

    }


    /*
    ----------------------------------------------
    AFTER EMERGENCY RIGHTS
    ----------------------------------------------
    */

    if (
        scenario.id ===
            "emergencyRightsStable" ||
        scenario.id ===
            "emergencyRightsPressure"
    ) {

        appendScenarioIfMissing(
            determineStateFederalScenario()
        );


        return;

    }


    /*
    ----------------------------------------------
    AFTER STATE-FEDERAL CONFLICT
    ----------------------------------------------
    */

    if (
        scenario.id ===
            "stateFederalStable" ||
        scenario.id ===
            "stateFederalCrisis"
    ) {

        appendScenarioIfMissing(
            determineFinalAccountabilityScenario()
        );

    }

}


/*
==================================================
APPEND CASE SAFELY
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
FINAL CASE
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
            "judicialAccountabilityStable" ||
        scenario.id ===
            "judicialAccountabilityCrisis"
    );

}


/*
==================================================
COURT WATCH
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
        "court-news-item";


    const categoryElement =
        document.createElement(
            "span"
        );


    categoryElement.textContent =
        String(
            category ||
            "Supreme Court"
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
            ".court-news-item"
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
            "courtScenarioCard"
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
FINAL JUDICIAL OUTCOME
==================================================
*/

function finalizeJudicialOutcome() {

    if (
        gameState.legitimacyCrisis
    ) {

        gameState.judicialOutcome =
            "Your term ended with unresolved concerns about the Court's legitimacy and institutional credibility.";

        return;

    }


    if (
        gameState.legitimacy >= 80 &&
        gameState.precedent >= 75 &&
        gameState.trust >= 70
    ) {

        gameState.judicialOutcome =
            "Your judicial record strengthened institutional legitimacy, precedent stability, and confidence in the Court's legal reasoning.";

        return;

    }


    if (
        gameState.legitimacy >= 65 &&
        gameState.precedent >= 60
    ) {

        gameState.judicialOutcome =
            "Your term produced a generally stable judicial record, though several decisions created difficult tradeoffs over precedent, rights, and judicial restraint.";

        return;

    }


    if (
        gameState.legitimacy < 50 ||
        gameState.trust < 45
    ) {

        gameState.judicialOutcome =
            "Your term ended with significant strain on public confidence and the institutional standing of the Court.";

        return;

    }


    gameState.judicialOutcome =
        "Your judicial term produced a mixed record of constitutional interpretation, precedent, restraint, and institutional consequences.";

}


/*
==================================================
CALCULATE GRADE
==================================================
*/

function calculateGrade() {

    const performanceAverage =
        (
            gameState.trust +
            gameState.legitimacy +
            gameState.precedent +
            gameState.restraint
        ) / 4;


    /*
    ----------------------------------------------
    JUDICIAL QUALITY

    Hidden metrics matter because a justice
    should not receive a high grade simply for
    deciding many cases.
    ----------------------------------------------
    */

    const judicialQuality =
        gameState.precedentDiscipline +
        gameState.constitutionalClarity +
        gameState.institutionalCare +
        gameState.rightsProtection;


    const judicialQualityBonus =
        Math.max(
            -10,
            Math.min(
                10,
                judicialQuality
            )
        );


    /*
    ----------------------------------------------
    PRODUCTIVITY BONUS

    Small by design.
    ----------------------------------------------
    */

    const productivityBonus =
        Math.min(
            6,
            (
                gameState.casesDecided *
                0.5
            ) +
            (
                gameState.majorOpinions *
                0.75
            )
        );


    const legitimacyPenalty =
        gameState.legitimacyCrisis
            ? 12
            : 0;


    const finalScore =
        performanceAverage +
        judicialQualityBonus +
        productivityBonus -
        legitimacyPenalty;


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
        gameState.judicialOutcome;


    if (
        grade === "A+" ||
        grade === "A"
    ) {

        return (
            `Outstanding judicial term. You combined careful constitutional reasoning, respect for precedent, institutional discipline, and meaningful protection of legal rights. ${outcome}`
        );

    }


    if (
        grade === "A−" ||
        grade === "B+"
    ) {

        return (
            `Strong judicial term. Your decisions generally balanced precedent, constitutional interpretation, restraint, and the institutional responsibilities of the Court. ${outcome}`
        );

    }


    if (
        grade === "B" ||
        grade === "B−"
    ) {

        return (
            `Solid judicial term. You reached meaningful decisions, though some opinions created tension involving precedent, legitimacy, rights, or the proper scope of judicial power. ${outcome}`
        );

    }


    if (
        grade === "C+" ||
        grade === "C"
    ) {

        return (
            `Mixed judicial term. Greater consistency in precedent, constitutional reasoning, institutional care, and judicial restraint would strengthen a future docket. ${outcome}`
        );

    }


    return (
        `A difficult judicial term. Review how precedent, constitutional clarity, rights protection, restraint, and institutional legitimacy shaped the Court's record. ${outcome}`
    );

}


/*
==================================================
SHOW FINAL RESULTS
==================================================
*/

function showFinalResults() {

    finalizeJudicialOutcome();


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
        "finalCourtTrust",
        `${gameState.trust}%`
    );


    setText(
        "finalCourtLegitimacy",
        `${gameState.legitimacy}%`
    );


    setText(
        "finalCourtPrecedent",
        `${gameState.precedent}%`
    );


    setText(
        "finalCourtRestraint",
        `${gameState.restraint}%`
    );


    setText(
        "finalCourtCasesDecided",
        gameState.casesDecided
    );


    setText(
        "finalCourtMajorOpinions",
        gameState.majorOpinions
    );


    setText(
        "courtFinalGrade",
        grade
    );


    const finalMessage =
        document.getElementById(
            "courtFinalMessage"
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
        "courtTermProgress",
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
        SIMULATION CENTER COMPLETION KEY
        ----------------------------------------------
        */

        window.localStorage.setItem(
            "civicCourtSimulationCompleted",
            "true"
        );


        /*
        ----------------------------------------------
        COURT RECORD
        ----------------------------------------------
        */

        window.localStorage.setItem(
            "civicCourtSimulationLastGrade",
            grade
        );


        const previousRuns =
            Number(
                window.localStorage.getItem(
                    "civicCourtSimulationRuns"
                ) ||
                0
            );


        window.localStorage.setItem(
            "civicCourtSimulationRuns",
            String(
                previousRuns +
                1
            )
        );


        window.localStorage.setItem(
            "civicCourtSimulationLastOutcome",
            gameState.judicialOutcome
        );


        window.localStorage.setItem(
            "civicCourtSimulationLastTrust",
            String(
                gameState.trust
            )
        );


        window.localStorage.setItem(
            "civicCourtSimulationLastLegitimacy",
            String(
                gameState.legitimacy
            )
        );


        window.localStorage.setItem(
            "civicCourtSimulationLastPrecedent",
            String(
                gameState.precedent
            )
        );


        window.localStorage.setItem(
            "civicCourtSimulationLastRestraint",
            String(
                gameState.restraint
            )
        );


        window.localStorage.setItem(
            "civicCourtSimulationLastLegitimacyCrisis",
            String(
                gameState.legitimacyCrisis
            )
        );

    } catch (error) {

        console.warn(
            "Court simulation record could not be saved:",
            error
        );

    }

}


/*
==================================================
RESET JUDICIAL STATE
==================================================
*/

function resetGameState() {

    gameState.trust =
        68;


    gameState.legitimacy =
        72;


    gameState.precedent =
        70;


    gameState.restraint =
        65;


    gameState.casesDecided =
        0;


    gameState.majorOpinions =
        0;


    gameState.precedentDiscipline =
        0;


    gameState.constitutionalClarity =
        0;


    gameState.institutionalCare =
        0;


    gameState.rightsProtection =
        0;


    gameState.speechResult =
        "pending";


    gameState.federalismResult =
        "pending";


    gameState.precedentResult =
        "pending";


    gameState.executiveResult =
        "pending";


    gameState.emergencyRightsResult =
        "pending";


    gameState.stateFederalResult =
        "pending";


    gameState.legitimacyCrisis =
        false;


    gameState.judicialOutcome =
        "Your judicial record is still developing.";

}


/*
==================================================
RESET NEWS
==================================================
*/

function resetNewsFeed(
    anotherDocket =
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
        "court-news-item";


    const label =
        document.createElement(
            "span"
        );


    label.textContent =
        "Supreme Court";


    const headline =
        document.createElement(
            "p"
        );


    headline.textContent =
        anotherDocket
            ? "Justice begins another Supreme Court docket."
            : "New justice joins the Court as a new term begins.";


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

async function initializeCourtPage() {

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

initializeCourtPage();