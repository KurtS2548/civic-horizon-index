/*
==================================================
CIVIC HORIZON INDEX V2
MEMBER OF CONGRESS SIMULATION
BRANCHING LEGISLATIVE ENGINE
==================================================
*/

import {

    saveSimulationCompletion

} from "./services/simulation-progress-service.js";


/*
==================================================
SIMULATION SCENARIOS
==================================================
*/

const congressScenarios = [

    /*
    ==================================================
    1. DISTRICT OUTREACH
    ==================================================
    */

    {
        id:
            "districtBridge",

        category:
            "Constituent Request",

        title:
            "A bridge in your district has become unsafe.",

        text:
            "Residents, local officials, and emergency responders are asking for federal help. What do you do first?",

        stage:
            "District Outreach",

        choices: [

            {
                text:
                    "Visit the bridge and meet local officials",

                outcomeTitle:
                    "You listened before acting",

                outcomeText:
                    "The visit builds trust and gives you useful information, although it delays the legislative process slightly.",

                approval:
                    5,

                bipartisan:
                    0,

                committee:
                    2,

                trust:
                    8,

                billsIntroduced:
                    0,

                billsPassed:
                    0,

                coalition:
                    1,

                evidence:
                    1,

                credibility:
                    1,

                headline:
                    "Representative visits unsafe bridge and meets community leaders."
            },

            {
                text:
                    "Immediately draft a federal infrastructure bill",

                outcomeTitle:
                    "You moved quickly",

                outcomeText:
                    "Your fast response impresses some constituents, but the proposal lacks technical details and congressional support.",

                approval:
                    3,

                bipartisan:
                    -2,

                committee:
                    -4,

                trust:
                    3,

                billsIntroduced:
                    1,

                billsPassed:
                    0,

                coalition:
                    0,

                evidence:
                    0,

                credibility:
                    0,

                headline:
                    "New infrastructure bill introduced after bridge complaints."
            },

            {
                text:
                    "Ask engineers to prepare a formal assessment",

                outcomeTitle:
                    "You gathered evidence",

                outcomeText:
                    "The study creates a stronger factual record and improves your position with the committee.",

                approval:
                    1,

                bipartisan:
                    2,

                committee:
                    7,

                trust:
                    4,

                billsIntroduced:
                    0,

                billsPassed:
                    0,

                coalition:
                    1,

                evidence:
                    2,

                credibility:
                    1,

                headline:
                    "Engineering review ordered for District 14 bridge."
            },

            {
                text:
                    "Ignore the request and focus on national issues",

                outcomeTitle:
                    "The district noticed",

                outcomeText:
                    "Residents feel overlooked, and local coverage becomes sharply critical.",

                approval:
                    -10,

                bipartisan:
                    0,

                committee:
                    0,

                trust:
                    -14,

                billsIntroduced:
                    0,

                billsPassed:
                    0,

                coalition:
                    -1,

                evidence:
                    0,

                credibility:
                    -2,

                headline:
                    "Local leaders criticize representative's response to bridge concerns."
            }

        ]

    },


    /*
    ==================================================
    2. BILL DEVELOPMENT
    ==================================================
    */

    {
        id:
            "billDevelopment",

        category:
            "Bill Development",

        title:
            "You decide to pursue infrastructure funding.",

        text:
            "Which strategy gives your proposal the strongest chance of moving forward?",

        stage:
            "Writing Legislation",

        choices: [

            {
                text:
                    "Write a bill focused only on your district",

                outcomeTitle:
                    "The proposal is locally focused",

                outcomeText:
                    "Your district appreciates the attention, but lawmakers from other areas have little reason to support it.",

                approval:
                    5,

                bipartisan:
                    -4,

                committee:
                    -2,

                trust:
                    4,

                billsIntroduced:
                    1,

                billsPassed:
                    0,

                coalition:
                    -1,

                evidence:
                    0,

                credibility:
                    0,

                headline:
                    "District-specific bridge bill introduced in the House."
            },

            {
                text:
                    "Build a regional infrastructure coalition",

                outcomeTitle:
                    "You expanded the coalition",

                outcomeText:
                    "Members from several states join the effort, improving bipartisan and committee support.",

                approval:
                    3,

                bipartisan:
                    9,

                committee:
                    7,

                trust:
                    3,

                billsIntroduced:
                    1,

                billsPassed:
                    0,

                coalition:
                    3,

                evidence:
                    0,

                credibility:
                    1,

                headline:
                    "Bipartisan regional infrastructure coalition announces new bill."
            },

            {
                text:
                    "Attach the funding to an unrelated bill",

                outcomeTitle:
                    "The strategy creates controversy",

                outcomeText:
                    "The tactic may move quickly, but critics object that the funding was added without enough debate.",

                approval:
                    -2,

                bipartisan:
                    -5,

                committee:
                    -3,

                trust:
                    -4,

                billsIntroduced:
                    1,

                billsPassed:
                    0,

                coalition:
                    -1,

                evidence:
                    0,

                credibility:
                    -2,

                headline:
                    "Bridge funding added to unrelated legislation, drawing criticism."
            },

            {
                text:
                    "Wait for someone else to introduce a bill",

                outcomeTitle:
                    "You avoided the risk",

                outcomeText:
                    "You preserve political capital, but constituents question whether you are leading.",

                approval:
                    -4,

                bipartisan:
                    1,

                committee:
                    1,

                trust:
                    -6,

                billsIntroduced:
                    0,

                billsPassed:
                    0,

                coalition:
                    0,

                evidence:
                    0,

                credibility:
                    -1,

                headline:
                    "District leaders ask when their representative will act."
            }

        ]

    },


    /*
    ==================================================
    3. COMMITTEE
    ==================================================
    */

    {
        id:
            "committee",

        category:
            "Committee Work",

        title:
            "Your bill has been referred to committee.",

        text:
            "The committee chair has not promised a hearing. What do you do?",

        stage:
            "Committee Review",

        choices: [

            {
                text:
                    "Gather expert testimony and request a hearing",

                outcomeTitle:
                    "You strengthened the record",

                outcomeText:
                    "Engineers, emergency officials, and residents provide evidence that helps the committee take the bill seriously.",

                approval:
                    3,

                bipartisan:
                    3,

                committee:
                    10,

                trust:
                    4,

                billsIntroduced:
                    0,

                billsPassed:
                    0,

                coalition:
                    1,

                evidence:
                    3,

                credibility:
                    2,

                headline:
                    "Experts testify on infrastructure safety before House committee."
            },

            {
                text:
                    "Publicly attack the committee chair",

                outcomeTitle:
                    "The confrontation backfires",

                outcomeText:
                    "The criticism attracts attention but damages your relationship with committee leadership.",

                approval:
                    1,

                bipartisan:
                    -6,

                committee:
                    -12,

                trust:
                    -1,

                billsIntroduced:
                    0,

                billsPassed:
                    0,

                coalition:
                    -2,

                evidence:
                    0,

                credibility:
                    -2,

                headline:
                    "Lawmaker clashes with committee chair over stalled bill."
            },

            {
                text:
                    "Negotiate changes requested by committee members",

                outcomeTitle:
                    "You chose negotiation",

                outcomeText:
                    "The bill becomes less ambitious, but it gains broader support and a clearer path forward.",

                approval:
                    1,

                bipartisan:
                    8,

                committee:
                    8,

                trust:
                    1,

                billsIntroduced:
                    0,

                billsPassed:
                    0,

                coalition:
                    2,

                evidence:
                    1,

                credibility:
                    1,

                headline:
                    "Infrastructure proposal revised after committee negotiations."
            },

            {
                text:
                    "Do nothing and wait",

                outcomeTitle:
                    "The bill stalls",

                outcomeText:
                    "Without active support, the committee takes no action and the bill loses momentum.",

                approval:
                    -5,

                bipartisan:
                    0,

                committee:
                    -6,

                trust:
                    -5,

                billsIntroduced:
                    0,

                billsPassed:
                    0,

                coalition:
                    -1,

                evidence:
                    0,

                credibility:
                    -1,

                headline:
                    "Infrastructure bill remains stalled in committee."
            }

        ]

    },


    /*
    ==================================================
    4. COALITION BUILDING
    ==================================================
    */

    {
        id:
            "coalition",

        category:
            "Negotiation",

        title:
            "Another member offers support for your bill.",

        text:
            "They want limited rural hospital funding included in the package. How do you respond?",

        stage:
            "Coalition Building",

        choices: [

            {
                text:
                    "Accept the addition without reviewing its cost",

                outcomeTitle:
                    "You gained a vote but created risk",

                outcomeText:
                    "The coalition grows, but concerns about cost and scope make the bill harder to defend.",

                approval:
                    -1,

                bipartisan:
                    5,

                committee:
                    -3,

                trust:
                    -2,

                billsIntroduced:
                    0,

                billsPassed:
                    0,

                coalition:
                    2,

                evidence:
                    -1,

                credibility:
                    -1,

                headline:
                    "Infrastructure bill expands to include rural hospital funding."
            },

            {
                text:
                    "Reject any changes to the bill",

                outcomeTitle:
                    "You protected the original proposal",

                outcomeText:
                    "The bill stays focused, but you lose an opportunity to broaden support.",

                approval:
                    1,

                bipartisan:
                    -7,

                committee:
                    -2,

                trust:
                    1,

                billsIntroduced:
                    0,

                billsPassed:
                    0,

                coalition:
                    -2,

                evidence:
                    0,

                credibility:
                    1,

                headline:
                    "Representative rejects proposed infrastructure compromise."
            },

            {
                text:
                    "Negotiate a limited, paid-for addition",

                outcomeTitle:
                    "You found a workable compromise",

                outcomeText:
                    "The revised agreement attracts support while limiting the additional cost.",

                approval:
                    4,

                bipartisan:
                    10,

                committee:
                    5,

                trust:
                    4,

                billsIntroduced:
                    0,

                billsPassed:
                    0,

                coalition:
                    3,

                evidence:
                    1,

                credibility:
                    2,

                headline:
                    "Bipartisan compromise expands support for infrastructure package."
            },

            {
                text:
                    "Delay the decision until after the vote",

                outcomeTitle:
                    "Your colleague loses confidence",

                outcomeText:
                    "The delay avoids immediate conflict, but potential supporters question whether they can rely on you.",

                approval:
                    -2,

                bipartisan:
                    -5,

                committee:
                    -1,

                trust:
                    -3,

                billsIntroduced:
                    0,

                billsPassed:
                    0,

                coalition:
                    -2,

                evidence:
                    0,

                credibility:
                    -2,

                headline:
                    "Uncertainty grows around infrastructure coalition."
            }

        ]

    }

];
/*
==================================================
BRANCH SCENARIOS
==================================================
*/


/*
==================================================
HOUSE FLOOR — STRONG PATH
==================================================
*/

const houseVoteStrongScenario = {

    id:
        "houseVoteStrong",

    category:
        "House Vote",

    title:
        "Your bill reaches the House floor with a competitive coalition.",

    text:
        "Several undecided lawmakers could determine the outcome. How do you close the deal?",

    stage:
        "House Floor",

    choices: [

        {
            text:
                "Accept a reasonable amendment to gain support",

            outcomeTitle:
                "The amendment secures the votes",

            outcomeText:
                "The coalition holds together and the bill passes the House.",

            approval:
                3,

            bipartisan:
                7,

            committee:
                2,

            trust:
                2,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                2,

            evidence:
                0,

            credibility:
                1,

            houseResult:
                "passed",

            headline:
                "Infrastructure bill passes House after bipartisan amendment."
        },

        {
            text:
                "Refuse all changes and demand a vote",

            outcomeTitle:
                "The coalition fractures",

            outcomeText:
                "Several undecided members abandon the bill, and the measure falls short.",

            approval:
                -4,

            bipartisan:
                -8,

            committee:
                -3,

            trust:
                -3,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -3,

            evidence:
                0,

            credibility:
                0,

            houseResult:
                "failed",

            headline:
                "Infrastructure proposal fails in closely divided House vote."
        },

        {
            text:
                "Withdraw the bill and renegotiate before a final vote",

            outcomeTitle:
                "You avoided defeat",

            outcomeText:
                "The bill remains alive, but the delay frustrates constituents and requires another round of negotiation.",

            approval:
                -2,

            bipartisan:
                1,

            committee:
                1,

            trust:
                -4,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                0,

            evidence:
                0,

            credibility:
                1,

            houseResult:
                "withdrawn",

            headline:
                "Representative withdraws infrastructure bill to seek broader agreement."
        },

        {
            text:
                "Make commitments you may not be able to keep",

            outcomeTitle:
                "The bill passes, but credibility suffers",

            outcomeText:
                "Enough lawmakers vote yes, but questions immediately emerge about promises made behind the scenes.",

            approval:
                1,

            bipartisan:
                -4,

            committee:
                -2,

            trust:
                -8,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                1,

            evidence:
                0,

            credibility:
                -3,

            houseResult:
                "passed",

            headline:
                "Infrastructure bill passes amid questions about private commitments."
        }

    ]

};


/*
==================================================
HOUSE FLOOR — WEAK PATH
==================================================
*/

const houseVoteWeakScenario = {

    id:
        "houseVoteWeak",

    category:
        "House Strategy",

    title:
        "Your bill does not yet have enough support to pass.",

    text:
        "Leadership warns that a floor vote today would probably fail. What do you do?",

    stage:
        "House Coalition Crisis",

    choices: [

        {
            text:
                "Delay the vote and negotiate with undecided members",

            outcomeTitle:
                "You buy time",

            outcomeText:
                "The delay creates another opportunity to build support, though constituents become impatient.",

            approval:
                -2,

            bipartisan:
                5,

            committee:
                2,

            trust:
                -2,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                3,

            evidence:
                0,

            credibility:
                1,

            houseResult:
                "withdrawn",

            headline:
                "House vote delayed as sponsor seeks additional support."
        },

        {
            text:
                "Force a vote anyway",

            outcomeTitle:
                "The bill fails",

            outcomeText:
                "The measure is defeated on the House floor, creating a major setback for your legislative agenda.",

            approval:
                -6,

            bipartisan:
                -5,

            committee:
                -3,

            trust:
                -5,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -3,

            evidence:
                0,

            credibility:
                -2,

            houseResult:
                "failed",

            headline:
                "Infrastructure bill defeated after sponsor forces early vote."
        },

        {
            text:
                "Scale the bill back significantly",

            outcomeTitle:
                "A narrower bill gains support",

            outcomeText:
                "The proposal accomplishes less, but enough lawmakers agree to move it forward.",

            approval:
                0,

            bipartisan:
                6,

            committee:
                4,

            trust:
                -1,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                3,

            evidence:
                0,

            credibility:
                1,

            houseResult:
                "passed",

            headline:
                "Scaled-back infrastructure bill clears the House."
        },

        {
            text:
                "Abandon the legislation",

            outcomeTitle:
                "The bill dies in the House",

            outcomeText:
                "You avoid a public floor defeat, but the district's infrastructure problem remains unresolved.",

            approval:
                -8,

            bipartisan:
                0,

            committee:
                -2,

            trust:
                -10,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -2,

            evidence:
                0,

            credibility:
                -2,

            houseResult:
                "abandoned",

            headline:
                "Representative abandons infrastructure proposal before House vote."
        }

    ]

};


/*
==================================================
GAME STATE
==================================================
*/

const gameState = {

    approval:
        70,

    bipartisan:
        50,

    committee:
        50,

    trust:
        70,

    billsIntroduced:
        0,

    billsPassed:
        0,


    /*
    ----------------------------------------------
    LEGISLATIVE STATE

    These values drive the branching simulation.
    ----------------------------------------------
    */

    coalition:
        0,

    evidence:
        0,

    credibility:
        0,

    houseResult:
        "pending",

    senateResult:
        "pending",

    presidentialResult:
        "pending",

    finalBillStatus:
        "pending",

    legislativeOutcome:
        "Your legislation is still being developed."

};


/*
==================================================
SIMULATION FLOW
==================================================
*/

let simulationFlow = [

    congressScenarios[0],

    congressScenarios[1],

    congressScenarios[2],

    congressScenarios[3]

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
HOUSE FAILURE RECOVERY
==================================================
*/

const houseRecoveryScenario = {

    id:
        "houseRecovery",

    category:
        "Legislative Recovery",

    title:
        "Your bill has suffered a major setback in the House.",

    text:
        "You still have time left in your term. What do you do now?",

    stage:
        "Legislative Recovery",

    choices: [

        {
            text:
                "Rewrite the bill around the strongest bipartisan provisions",

            outcomeTitle:
                "You rebuild the coalition",

            outcomeText:
                "The revised proposal is narrower, but it attracts lawmakers who opposed the original version.",

            approval:
                1,

            bipartisan:
                8,

            committee:
                5,

            trust:
                1,

            billsIntroduced:
                1,

            billsPassed:
                0,

            coalition:
                4,

            evidence:
                1,

            credibility:
                2,

            recoveryResult:
                "revised",

            headline:
                "Representative unveils revised bipartisan infrastructure proposal."
        },

        {
            text:
                "Return to the district and build public pressure",

            outcomeTitle:
                "The district rallies behind the issue",

            outcomeText:
                "Public support improves, but congressional leaders still want a more workable legislative plan.",

            approval:
                6,

            bipartisan:
                1,

            committee:
                1,

            trust:
                7,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                1,

            evidence:
                0,

            credibility:
                1,

            recoveryResult:
                "publicPressure",

            headline:
                "District leaders launch renewed push for infrastructure action."
        },

        {
            text:
                "Blame party leadership for the defeat",

            outcomeTitle:
                "The confrontation creates more resistance",

            outcomeText:
                "The criticism gains attention but makes future negotiations significantly harder.",

            approval:
                0,

            bipartisan:
                -7,

            committee:
                -6,

            trust:
                -2,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -3,

            evidence:
                0,

            credibility:
                -2,

            recoveryResult:
                "failed",

            headline:
                "Representative blames House leadership after infrastructure defeat."
        },

        {
            text:
                "Move on to other priorities",

            outcomeTitle:
                "The infrastructure effort ends",

            outcomeText:
                "You redirect your attention to other issues, but the bridge remains unresolved.",

            approval:
                -5,

            bipartisan:
                0,

            committee:
                0,

            trust:
                -7,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -1,

            evidence:
                0,

            credibility:
                -1,

            recoveryResult:
                "abandoned",

            headline:
                "Infrastructure proposal shelved as representative shifts agenda."
        }

    ]

};


/*
==================================================
SECOND HOUSE ATTEMPT
==================================================
*/

const secondHouseVoteScenario = {

    id:
        "secondHouseVote",

    category:
        "Second House Vote",

    title:
        "Your revised bill has returned to the House floor.",

    text:
        "The coalition is stronger than before, but passage is not guaranteed. What is your final strategy?",

    stage:
        "Second House Vote",

    choices: [

        {
            text:
                "Lock in the compromise and call the vote",

            outcomeTitle:
                "The revised bill passes",

            outcomeText:
                "The narrower coalition holds together and the House approves the legislation.",

            approval:
                3,

            bipartisan:
                5,

            committee:
                2,

            trust:
                2,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                2,

            evidence:
                0,

            credibility:
                1,

            houseResult:
                "passed",

            headline:
                "Revised infrastructure bill passes House on second attempt."
        },

        {
            text:
                "Restore provisions removed during compromise",

            outcomeTitle:
                "Support falls apart again",

            outcomeText:
                "Members who backed the revised package withdraw their support, and the bill fails a second time.",

            approval:
                -3,

            bipartisan:
                -7,

            committee:
                -4,

            trust:
                -2,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -3,

            evidence:
                0,

            credibility:
                -2,

            houseResult:
                "failedFinal",

            headline:
                "Infrastructure legislation fails again after last-minute changes."
        },

        {
            text:
                "Accept one final bipartisan amendment",

            outcomeTitle:
                "The amendment delivers passage",

            outcomeText:
                "The final bill is less ambitious than your original proposal, but it clears the House.",

            approval:
                1,

            bipartisan:
                7,

            committee:
                3,

            trust:
                1,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                3,

            evidence:
                0,

            credibility:
                2,

            houseResult:
                "passed",

            headline:
                "Bipartisan amendment sends revised infrastructure bill through House."
        },

        {
            text:
                "Withdraw the bill permanently",

            outcomeTitle:
                "The legislative effort ends",

            outcomeText:
                "You avoid another public defeat, but your main legislative initiative ends without passage.",

            approval:
                -5,

            bipartisan:
                0,

            committee:
                -2,

            trust:
                -6,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -2,

            evidence:
                0,

            credibility:
                -1,

            houseResult:
                "abandoned",

            headline:
                "Representative ends infrastructure effort before second House vote."
        }

    ]

};


/*
==================================================
SENATE NEGOTIATION — STRONG PATH
==================================================
*/

const senateStrongScenario = {

    id:
        "senateStrong",

    category:
        "Senate Negotiation",

    title:
        "The Senate passes a different version of your infrastructure bill.",

    text:
        "Both chambers must agree on the same language before the bill can go to the president. How do you respond?",

    stage:
        "Resolving Differences",

    choices: [

        {
            text:
                "Work with Senate negotiators on a balanced compromise",

            outcomeTitle:
                "The chambers reach agreement",

            outcomeText:
                "Neither chamber gets everything it wanted, but the final package earns enough support to move forward.",

            approval:
                3,

            bipartisan:
                8,

            committee:
                5,

            trust:
                3,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                3,

            evidence:
                0,

            credibility:
                2,

            senateResult:
                "agreement",

            headline:
                "House and Senate negotiators reach infrastructure compromise."
        },

        {
            text:
                "Demand that the Senate accept the House version unchanged",

            outcomeTitle:
                "Negotiations break down",

            outcomeText:
                "Your position satisfies some House supporters, but the chambers remain deadlocked.",

            approval:
                -2,

            bipartisan:
                -9,

            committee:
                -4,

            trust:
                -2,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -3,

            evidence:
                0,

            credibility:
                -1,

            senateResult:
                "deadlock",

            headline:
                "Infrastructure negotiations stall over competing House and Senate versions."
        },

        {
            text:
                "Remove the most controversial section",

            outcomeTitle:
                "A narrower agreement emerges",

            outcomeText:
                "The final bill accomplishes less, but both chambers are able to approve it.",

            approval:
                1,

            bipartisan:
                6,

            committee:
                4,

            trust:
                0,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                2,

            evidence:
                0,

            credibility:
                1,

            senateResult:
                "agreement",

            headline:
                "Narrower infrastructure package clears House-Senate negotiations."
        },

        {
            text:
                "Walk away from negotiations",

            outcomeTitle:
                "The bill dies between the chambers",

            outcomeText:
                "The House and Senate never agree on final language, ending the legislative effort.",

            approval:
                -8,

            bipartisan:
                -2,

            committee:
                -3,

            trust:
                -10,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -3,

            evidence:
                0,

            credibility:
                -2,

            senateResult:
                "failed",

            headline:
                "Infrastructure bill collapses after House-Senate negotiations end."
        }

    ]

};


/*
==================================================
SENATE DEADLOCK RECOVERY
==================================================
*/

const senateRecoveryScenario = {

    id:
        "senateRecovery",

    category:
        "Conference Crisis",

    title:
        "House-Senate negotiations have stalled.",

    text:
        "Without a compromise, the bill will die. What do you do?",

    stage:
        "Conference Crisis",

    choices: [

        {
            text:
                "Return to negotiations with a smaller package",

            outcomeTitle:
                "A final compromise is reached",

            outcomeText:
                "The legislation is reduced in scope, but both chambers agree on identical language.",

            approval:
                0,

            bipartisan:
                7,

            committee:
                3,

            trust:
                1,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                3,

            evidence:
                0,

            credibility:
                2,

            senateResult:
                "agreement",

            headline:
                "Smaller infrastructure compromise revives stalled legislation."
        },
                {
            text:
                "Ask House leadership to pressure the Senate publicly",

            outcomeTitle:
                "The public pressure fails",

            outcomeText:
                "The dispute becomes more partisan, and negotiators become less willing to compromise.",

            approval:
                -1,

            bipartisan:
                -8,

            committee:
                -2,

            trust:
                -2,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -3,

            evidence:
                0,

            credibility:
                -2,

            senateResult:
                "failed",

            headline:
                "Public House-Senate dispute ends infrastructure negotiations."
        },

        {
            text:
                "Accept most of the Senate version",

            outcomeTitle:
                "The legislation survives",

            outcomeText:
                "You surrender several House priorities, but the compromise allows the bill to advance.",

            approval:
                -1,

            bipartisan:
                6,

            committee:
                1,

            trust:
                -1,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                2,

            evidence:
                0,

            credibility:
                1,

            senateResult:
                "agreement",

            headline:
                "House accepts major Senate changes to save infrastructure bill."
        },

        {
            text:
                "Let the bill expire",

            outcomeTitle:
                "The bill dies",

            outcomeText:
                "The legislative process ends without an agreement between the chambers.",

            approval:
                -7,

            bipartisan:
                -1,

            committee:
                -2,

            trust:
                -8,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -2,

            evidence:
                0,

            credibility:
                -2,

            senateResult:
                "failed",

            headline:
                "Infrastructure bill expires after negotiations collapse."
        }

    ]

};


/*
==================================================
PRESIDENTIAL REVIEW
==================================================
*/

const presidentialReviewScenario = {

    id:
        "presidentialReview",

    category:
        "Presidential Decision",

    title:
        "The bill reaches the president.",

    text:
        "The administration supports the overall package but wants one final change before signing. What do you do?",

    stage:
        "Executive Review",

    choices: [

        {
            text:
                "Negotiate a limited final change",

            outcomeTitle:
                "The president signs the bill",

            outcomeText:
                "The compromise preserves the core infrastructure program and secures presidential approval.",

            approval:
                5,

            bipartisan:
                5,

            committee:
                2,

            trust:
                4,

            billsIntroduced:
                0,

            billsPassed:
                1,

            coalition:
                2,

            evidence:
                0,

            credibility:
                2,

            presidentialResult:
                "signed",

            finalBillStatus:
                "law",

            headline:
                "President signs bipartisan infrastructure package into law."
        },

        {
            text:
                "Refuse the requested change and risk a veto",

            outcomeTitle:
                "The president vetoes the bill",

            outcomeText:
                "Your supporters praise your position, but the legislation now needs a two-thirds vote in both chambers to become law.",

            approval:
                -1,

            bipartisan:
                -5,

            committee:
                -1,

            trust:
                0,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -2,

            evidence:
                0,

            credibility:
                1,

            presidentialResult:
                "vetoed",

            finalBillStatus:
                "vetoed",

            headline:
                "President vetoes infrastructure bill after final negotiations fail."
        },

        {
            text:
                "Publicly accuse the president of negotiating in bad faith",

            outcomeTitle:
                "The confrontation ends cooperation",

            outcomeText:
                "The public dispute dominates the news, and the president vetoes the legislation.",

            approval:
                0,

            bipartisan:
                -8,

            committee:
                -2,

            trust:
                -3,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -3,

            evidence:
                0,

            credibility:
                -2,

            presidentialResult:
                "vetoed",

            finalBillStatus:
                "vetoed",

            headline:
                "President vetoes infrastructure bill after public dispute with sponsor."
        },

        {
            text:
                "Withdraw support for the final legislation",

            outcomeTitle:
                "The coalition collapses",

            outcomeText:
                "Lawmakers and constituents are surprised by your reversal, and the bill never becomes law.",

            approval:
                -7,

            bipartisan:
                -6,

            committee:
                -5,

            trust:
                -11,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -4,

            evidence:
                0,

            credibility:
                -4,

            presidentialResult:
                "abandoned",

            finalBillStatus:
                "failed",

            headline:
                "Bill sponsor withdraws support during final presidential negotiations."
        }

    ]

};


/*
==================================================
VETO OVERRIDE
==================================================
*/

const vetoOverrideScenario = {

    id:
        "vetoOverride",

    category:
        "Veto Override",

    title:
        "The president has vetoed your infrastructure bill.",

    text:
        "Congress can override the veto with a two-thirds vote in both chambers. What do you do?",

    stage:
        "Veto Override",

    choices: [

        {
            text:
                "Build a bipartisan override coalition",

            outcomeTitle:
                "Congress overrides the veto",

            outcomeText:
                "Your months of coalition-building pay off. Two-thirds majorities in both chambers vote to override the president.",

            approval:
                5,

            bipartisan:
                10,

            committee:
                3,

            trust:
                5,

            billsIntroduced:
                0,

            billsPassed:
                1,

            coalition:
                4,

            evidence:
                0,

            credibility:
                3,

            overrideAttempt:
                "coalition",

            finalBillStatus:
                "law",

            headline:
                "Congress overrides presidential veto and infrastructure bill becomes law."
        },

        {
            text:
                "Demand an immediate override vote",

            outcomeTitle:
                "The override fails",

            outcomeText:
                "The vote occurs before enough support is secured, and Congress falls short of the two-thirds threshold.",

            approval:
                -3,

            bipartisan:
                -6,

            committee:
                -2,

            trust:
                -2,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -3,

            evidence:
                0,

            credibility:
                -2,

            overrideAttempt:
                "failed",

            finalBillStatus:
                "vetoed",

            headline:
                "Congress fails to override presidential infrastructure veto."
        },

        {
            text:
                "Negotiate a new bill instead of pursuing an override",

            outcomeTitle:
                "You choose a new legislative path",

            outcomeText:
                "The original bill remains vetoed, but you preserve relationships for another attempt in the future.",

            approval:
                0,

            bipartisan:
                4,

            committee:
                2,

            trust:
                0,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                2,

            evidence:
                0,

            credibility:
                1,

            overrideAttempt:
                "newBill",

            finalBillStatus:
                "vetoed",

            headline:
                "Lawmakers abandon veto override and begin discussing new infrastructure legislation."
        },

        {
            text:
                "End the effort",

            outcomeTitle:
                "The veto stands",

            outcomeText:
                "The legislation does not become law, and the infrastructure issue remains unresolved.",

            approval:
                -5,

            bipartisan:
                0,

            committee:
                -1,

            trust:
                -6,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -1,

            evidence:
                0,

            credibility:
                -1,

            overrideAttempt:
                "abandoned",

            finalBillStatus:
                "vetoed",

            headline:
                "Infrastructure effort ends after presidential veto."
        }

    ]

};


/*
==================================================
END-OF-TERM ACCOUNTABILITY
==================================================
*/

const accountabilitySuccessScenario = {

    id:
        "accountabilitySuccess",

    category:
        "Public Accountability",

    title:
        "Your term is nearing its end, and constituents want to hear about your record.",

    text:
        "Your infrastructure legislation became law. How do you close your term?",

    stage:
        "End of Term",

    choices: [

        {
            text:
                "Hold a public town hall and explain the compromises",

            outcomeTitle:
                "You explain how governing actually worked",

            outcomeText:
                "Constituents appreciate hearing both what you achieved and what you gave up to pass the legislation.",

            approval:
                4,

            bipartisan:
                1,

            committee:
                0,

            trust:
                9,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                0,

            evidence:
                0,

            credibility:
                2,

            headline:
                "Representative holds town hall after infrastructure bill becomes law."
        },

        {
            text:
                "Publish a detailed legislative report",

            outcomeTitle:
                "You choose transparency",

            outcomeText:
                "The report documents negotiations, setbacks, costs, and final results, strengthening your reputation for accountability.",

            approval:
                3,

            bipartisan:
                2,

            committee:
                1,

            trust:
                8,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                0,

            evidence:
                1,

            credibility:
                2,

            headline:
                "District 14 representative publishes full infrastructure legislative report."
        },

        {
            text:
                "Claim full credit and ignore other lawmakers",

            outcomeTitle:
                "The victory message creates resentment",

            outcomeText:
                "Some constituents respond well, but colleagues and reporters point out the many compromises required to pass the bill.",

            approval:
                1,

            bipartisan:
                -5,

            committee:
                -2,

            trust:
                -4,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -1,
                            evidence:
                0,

            credibility:
                -2,

            headline:
                "Lawmakers dispute representative's claims of sole credit for infrastructure law."
        },

        {
            text:
                "Skip public events and focus on fundraising",

            outcomeTitle:
                "Constituents feel ignored",

            outcomeText:
                "Your legislative accomplishment remains, but public trust falls as residents question your priorities.",

            approval:
                -8,

            bipartisan:
                0,

            committee:
                0,

            trust:
                -12,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                0,

            evidence:
                0,

            credibility:
                -2,

            headline:
                "District groups criticize representative for avoiding post-legislative town halls."
        }

    ]

};


const accountabilityFailureScenario = {

    id:
        "accountabilityFailure",

    category:
        "Public Accountability",

    title:
        "Your term is nearing its end.",

    text:
        "Your infrastructure legislation did not become law. Constituents want to know what happened. How do you respond?",

    stage:
        "End of Term",

    choices: [

        {
            text:
                "Hold a public town hall and explain the setbacks",

            outcomeTitle:
                "You take responsibility",

            outcomeText:
                "Residents remain disappointed, but your willingness to explain the process and acknowledge mistakes improves trust.",

            approval:
                2,

            bipartisan:
                1,

            committee:
                0,

            trust:
                9,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                0,

            evidence:
                0,

            credibility:
                3,

            headline:
                "Representative faces constituents after infrastructure effort falls short."
        },

        {
            text:
                "Publish a report identifying successes and failures",

            outcomeTitle:
                "You provide a transparent record",

            outcomeText:
                "The report shows where the legislation advanced, where it failed, and what could be done differently next time.",

            approval:
                2,

            bipartisan:
                2,

            committee:
                1,

            trust:
                8,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                0,

            evidence:
                1,

            credibility:
                3,

            headline:
                "Representative releases detailed report on failed infrastructure effort."
        },

        {
            text:
                "Blame everyone else for the failure",

            outcomeTitle:
                "The explanation damages your credibility",

            outcomeText:
                "Supporters may agree with parts of your criticism, but constituents see little evidence that you accept responsibility.",

            approval:
                -3,

            bipartisan:
                -5,

            committee:
                -3,

            trust:
                -8,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                -2,

            evidence:
                0,

            credibility:
                -3,

            headline:
                "Representative blames congressional opponents for infrastructure failure."
        },

        {
            text:
                "Avoid discussing the issue",

            outcomeTitle:
                "The silence creates frustration",

            outcomeText:
                "Constituents receive no clear explanation for the failure of your signature legislative effort.",

            approval:
                -7,

            bipartisan:
                0,

            committee:
                0,

            trust:
                -11,

            billsIntroduced:
                0,

            billsPassed:
                0,

            coalition:
                0,

            evidence:
                0,

            credibility:
                -3,

            headline:
                "District leaders criticize representative for avoiding questions about failed bill."
        }

    ]

};


/*
==================================================
UTILITY HELPERS
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
DASHBOARD UPDATE
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


    const totalPossible =
        getEstimatedTotalDecisionCount();


    const progress =
        totalPossible > 0
            ? Math.round(
                (
                    currentScenarioIndex /
                    totalPossible
                ) * 100
            )
            : 0;


    setText(
        "congressTermProgress",
        `${Math.min(progress, 100)}%`
    );

}


/*
==================================================
ESTIMATED DECISION COUNT
==================================================
*/

function getEstimatedTotalDecisionCount() {

    /*
    The participant will not see every branch.

    Eight decisions remains the target length,
    with a small allowance for recovery branches.
    */

    return 8;

}


/*
==================================================
BUILD INITIAL FLOW
==================================================
*/

function resetSimulationFlow() {

    simulationFlow =
        [

            congressScenarios[0],

            congressScenarios[1],

            congressScenarios[2],

            congressScenarios[3]

        ];

}


/*
==================================================
DETERMINE HOUSE PATH
==================================================
*/

function determineHouseScenario() {

    const supportScore =
        (
            gameState.bipartisan +
            gameState.committee
        ) / 2;


    const hiddenSupport =
        (
            gameState.coalition * 5
        ) +
        (
            gameState.evidence * 2
        ) +
        (
            gameState.credibility * 2
        );


    const combinedSupport =
        supportScore +
        hiddenSupport;


    if (
        combinedSupport >=
        65
    ) {

        return houseVoteStrongScenario;

    }


    return houseVoteWeakScenario;

}


/*
==================================================
RENDER CURRENT SCENARIO
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
            `Decision ${currentScenarioIndex + 1} of ${getEstimatedTotalDecisionCount()}`;

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
        "congressTurnLabel",
        `Week ${1 + currentScenarioIndex * 6}`
    );


    setText(
        "congressCurrentStage",
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

                }
            )
            .join("");


        choiceContainer
        .querySelectorAll(
            ".congress-choice-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    handleChoice
                );

            }
        );


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

    if (
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


    const selectedButton =
        event.currentTarget;


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
        .querySelectorAll(
            ".congress-choice-button"
        )
        .forEach(
            button => {

                button.disabled =
                    true;

            }
        );


    selectedButton.classList.add(
        "congress-choice-selected"
    );


    applyChoiceEffects(
        choice
    );


    updateLegislativeStateFromChoice(
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


    gameState.bipartisan +=
        Number(
            choice.bipartisan ||
            0
        );


    gameState.committee +=
        Number(
            choice.committee ||
            0
        );


    gameState.trust +=
        Number(
            choice.trust ||
            0
        );


    gameState.billsIntroduced +=
        Number(
            choice.billsIntroduced ||
            0
        );


    gameState.billsPassed +=
        Number(
            choice.billsPassed ||
            0
        );


    gameState.coalition +=
        Number(
            choice.coalition ||
            0
        );


    gameState.evidence +=
        Number(
            choice.evidence ||
            0
        );


    gameState.credibility +=
        Number(
            choice.credibility ||
            0
        );

}


/*
==================================================
LEGISLATIVE STATE FROM CHOICE
==================================================
*/

function updateLegislativeStateFromChoice(
    choice
) {

    if (
        choice.houseResult
    ) {

        gameState.houseResult =
            choice.houseResult;

    }


    if (
        choice.senateResult
    ) {

        gameState.senateResult =
            choice.senateResult;

    }


    if (
        choice.presidentialResult
    ) {

        gameState.presidentialResult =
            choice.presidentialResult;

    }


    if (
        choice.finalBillStatus
    ) {

        gameState.finalBillStatus =
            choice.finalBillStatus;

    }


    if (
        choice.recoveryResult
    ) {

        gameState.recoveryResult =
            choice.recoveryResult;

    }


    if (
        choice.overrideAttempt
    ) {

        gameState.overrideAttempt =
            choice.overrideAttempt;

    }

}


/*
==================================================
CHOICE OUTCOME
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
            choice.bipartisan ||
            0
        ) +
        Number(
            choice.committee ||
            0
        ) +
        Number(
            choice.trust ||
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
    scenario,
    choice
) {

    /*
    ----------------------------------------------
    AFTER FOUR FOUNDATION DECISIONS
    ----------------------------------------------
    */

    if (
        scenario.id ===
        "coalition"
    ) {

        appendScenarioIfMissing(
            determineHouseScenario()
        );


        return;

    }


    /*
    ----------------------------------------------
    HOUSE RESULT
    ----------------------------------------------
    */

    if (
        scenario.id ===
            "houseVoteStrong" ||
        scenario.id ===
            "houseVoteWeak" ||
        scenario.id ===
            "secondHouseVote"
    ) {

        preparePostHouseBranch();

        return;

    }


    /*
    ----------------------------------------------
    HOUSE RECOVERY
    ----------------------------------------------
    */

    if (
        scenario.id ===
        "houseRecovery"
    ) {

        prepareHouseRecoveryBranch(
            choice
        );


        return;

    }


    /*
    ----------------------------------------------
    SENATE NEGOTIATION
    ----------------------------------------------
    */

    if (
        scenario.id ===
        "senateStrong"
    ) {

        preparePostSenateBranch();

        return;

    }


    /*
    ----------------------------------------------
    SENATE RECOVERY
    ----------------------------------------------
    */

    if (
        scenario.id ===
        "senateRecovery"
    ) {

        preparePostSenateRecoveryBranch();

        return;

    }


    /*
    ----------------------------------------------
    PRESIDENT
    ----------------------------------------------
    */

    if (
        scenario.id ===
        "presidentialReview"
    ) {

        preparePostPresidentialBranch();

        return;

    }


    /*
    ----------------------------------------------
    VETO OVERRIDE
    ----------------------------------------------
    */

    if (
        scenario.id ===
        "vetoOverride"
    ) {

        appendAccountabilityScenario();

    }

}


/*
==================================================
POST-HOUSE BRANCH
==================================================
*/

function preparePostHouseBranch() {

    if (
        gameState.houseResult ===
        "passed"
    ) {

        appendScenarioIfMissing(
            senateStrongScenario
        );


        return;

    }


    if (
        gameState.houseResult ===
            "failed" ||
        gameState.houseResult ===
            "withdrawn"
    ) {

        appendScenarioIfMissing(
            houseRecoveryScenario
        );


        return;

    }


    if (
        gameState.houseResult ===
            "failedFinal" ||
        gameState.houseResult ===
            "abandoned"
    ) {

        gameState.finalBillStatus =
            "failed";


        appendAccountabilityScenario();

    }

}


/*
==================================================
HOUSE RECOVERY BRANCH
==================================================
*/

function prepareHouseRecoveryBranch(
    choice
) {

    if (
        choice.recoveryResult ===
        "revised"
    ) {

        appendScenarioIfMissing(
            secondHouseVoteScenario
        );


        return;

    }


    if (
        choice.recoveryResult ===
        "publicPressure"
    ) {

        /*
        Public pressure creates one last chance.

        Whether that chance is strong depends on
        the support accumulated so far.
        */

        if (
            (
                gameState.bipartisan +
                gameState.committee
            ) / 2 >=
            55
        ) {

            appendScenarioIfMissing(
                secondHouseVoteScenario
            );

        } else {

            gameState.finalBillStatus =
                "failed";


            appendAccountabilityScenario();

        }


        return;

    }


    gameState.finalBillStatus =
        "failed";


    appendAccountabilityScenario();

}


/*
==================================================
POST-SENATE BRANCH
==================================================
*/

function preparePostSenateBranch() {

    if (
        gameState.senateResult ===
        "agreement"
    ) {

        appendScenarioIfMissing(
            presidentialReviewScenario
        );


        return;

    }


    if (
        gameState.senateResult ===
        "deadlock"
    ) {

        appendScenarioIfMissing(
            senateRecoveryScenario
        );


        return;

    }
        


    gameState.finalBillStatus =
        "failed";


    appendAccountabilityScenario();

}


/*
==================================================
POST-SENATE RECOVERY
==================================================
*/

function preparePostSenateRecoveryBranch() {

    if (
        gameState.senateResult ===
        "agreement"
    ) {

        appendScenarioIfMissing(
            presidentialReviewScenario
        );


        return;

    }


    gameState.finalBillStatus =
        "failed";


    appendAccountabilityScenario();

}


/*
==================================================
POST-PRESIDENTIAL BRANCH
==================================================
*/

function preparePostPresidentialBranch() {

    if (
        gameState.finalBillStatus ===
        "law"
    ) {

        appendAccountabilityScenario();

        return;

    }


    if (
        gameState.presidentialResult ===
        "vetoed"
    ) {

        appendScenarioIfMissing(
            vetoOverrideScenario
        );


        return;

    }


    gameState.finalBillStatus =
        "failed";


    appendAccountabilityScenario();

}


/*
==================================================
ACCOUNTABILITY BRANCH
==================================================
*/

function appendAccountabilityScenario() {

    if (
        gameState.finalBillStatus ===
        "law"
    ) {

        appendScenarioIfMissing(
            accountabilitySuccessScenario
        );


        return;

    }


    appendScenarioIfMissing(
        accountabilityFailureScenario
    );

}


/*
==================================================
APPEND SCENARIO SAFELY
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
IS FINAL SCENARIO
==================================================
*/

function isFinalScenario() {

    return (
        currentScenarioIndex ===
        simulationFlow.length - 1 &&
        (
            simulationFlow[
                currentScenarioIndex
            ]?.id ===
                "accountabilitySuccess" ||
            simulationFlow[
                currentScenarioIndex
            ]?.id ===
                "accountabilityFailure"
        )
    );

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
        "congress-news-item";


    const safeCategory =
        String(
            category ||
            "Capitol"
        );


    const safeHeadline =
        String(
            headline ||
            ""
        );


    const categoryElement =
        document.createElement(
            "span"
        );


    categoryElement.textContent =
        safeCategory;


    const headlineElement =
        document.createElement(
            "p"
        );


    headlineElement.textContent =
        safeHeadline;


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
        ]?.remove();

    }

}


/*
==================================================
CONTINUE SIMULATION
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


    const scenarioCard =
        document.getElementById(
            "congressScenarioCard"
        );


    scenarioCard?.scrollIntoView(
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
FINAL LEGISLATIVE OUTCOME
==================================================
*/

function finalizeLegislativeOutcome() {

    if (
        gameState.finalBillStatus ===
        "law"
    ) {

        if (
            gameState.presidentialResult ===
            "signed"
        ) {

            gameState.legislativeOutcome =
                "Your infrastructure bill passed Congress and was signed into law.";

        } else if (
            gameState.overrideAttempt ===
            "coalition"
        ) {

            gameState.legislativeOutcome =
                "Your infrastructure bill became law after Congress successfully overrode a presidential veto.";

        } else {

            gameState.legislativeOutcome =
                "Your infrastructure legislation became law.";

        }


        return;

    }


    if (
        gameState.finalBillStatus ===
        "vetoed"
    ) {

        gameState.legislativeOutcome =
            "Your infrastructure bill passed Congress but did not become law because the presidential veto remained in place.";


        return;

    }


    if (
        gameState.houseResult ===
            "failedFinal" ||
        gameState.houseResult ===
            "abandoned"
    ) {

        gameState.legislativeOutcome =
            "Your infrastructure legislation did not survive the House process.";


        return;

    }


    if (
        gameState.senateResult ===
        "failed"
    ) {

        gameState.legislativeOutcome =
            "Your bill passed the House but failed when the House and Senate could not reach a final agreement.";


        return;

    }


    if (
        gameState.presidentialResult ===
        "abandoned"
    ) {

        gameState.legislativeOutcome =
            "Your legislation reached the president, but the coalition collapsed before it could become law.";


        return;

    }


    gameState.legislativeOutcome =
        "Your infrastructure effort ended without becoming law.";

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
            gameState.bipartisan +
            gameState.committee +
            gameState.trust
        ) / 4;


    /*
    ----------------------------------------------
    LEGISLATIVE PERFORMANCE
    ----------------------------------------------
    */

    let legislativeBonus =
        0;


    if (
        gameState.finalBillStatus ===
        "law"
    ) {

        legislativeBonus +=
            10;

    } else if (
        gameState.presidentialResult ===
            "vetoed"
    ) {

        legislativeBonus +=
            5;

    } else if (
        gameState.senateResult ===
            "agreement"
    ) {

        legislativeBonus +=
            4;

    } else if (
        gameState.houseResult ===
            "passed"
    ) {

        legislativeBonus +=
            3;

    }


    /*
    ----------------------------------------------
    LEADERSHIP QUALITY

    Hidden metrics matter, but only modestly.
    ----------------------------------------------
    */

    const leadershipScore =
        (
            gameState.coalition +
            gameState.evidence +
            gameState.credibility
        );


    const leadershipBonus =
        Math.max(
            -5,
            Math.min(
                8,
                leadershipScore
            )
        );


    const finalScore =
        performanceAverage +
        legislativeBonus +
        leadershipBonus;


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

    const legislativeOutcome =
        gameState.legislativeOutcome;


    if (
        grade === "A+" ||
        grade === "A"
    ) {

        return (
            `Outstanding term. You maintained strong public relationships, built effective coalitions, and navigated the legislative process with skill. ${legislativeOutcome}`
        );

    }


    if (
        grade === "A−" ||
        grade === "B+"
    ) {

        return (
            `Strong term. You balanced district needs with the realities of committee work, negotiation, and coalition-building. ${legislativeOutcome}`
        );

    }


    if (
        grade === "B" ||
        grade === "B−"
    ) {

        return (
            `Solid term. You made meaningful progress, although some decisions limited your support or legislative effectiveness. ${legislativeOutcome}`
        );

    }


    if (
        grade === "C+" ||
        grade === "C"
    ) {

        return (
            `Mixed term. Stronger coalition-building, committee strategy, and public accountability could improve a future term. ${legislativeOutcome}`
        );

    }


    return (
        `A difficult term. Review how trust, negotiation, evidence, committee relationships, and credibility affected your results. ${legislativeOutcome}`
    );

}


/*
==================================================
SHOW FINAL RESULTS
==================================================
*/

async function showFinalResults() {
        finalizeLegislativeOutcome();


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
        finalMessage
    ) {

        finalMessage.textContent =
            getFinalPerformanceMessage(
                grade
            );

    }


    /*
    ----------------------------------------------
    SIMULATION CENTER COMPLETION RECORD
    ----------------------------------------------
    */

    try {

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
                ) ||
                0
            );


        localStorage.setItem(
            "civicCongressSimulationRuns",
            String(
                previousRuns +
                1
            )
        );


        /*
        ----------------------------------------------
        ADDITIONAL CONGRESS 2.0 RECORD

        These do not interfere with the Simulation
        Center's existing completion keys.
        ----------------------------------------------
        */

        localStorage.setItem(
            "civicCongressSimulationLastBillStatus",
            gameState.finalBillStatus
        );


        localStorage.setItem(
            "civicCongressSimulationLastOutcome",
            gameState.legislativeOutcome
        );


        localStorage.setItem(
            "civicCongressSimulationLastApproval",
            String(
                gameState.approval
            )
        );


        localStorage.setItem(
            "civicCongressSimulationLastBipartisan",
            String(
                gameState.bipartisan
            )
        );


        localStorage.setItem(
            "civicCongressSimulationLastCommittee",
            String(
                gameState.committee
            )
        );


        localStorage.setItem(
            "civicCongressSimulationLastTrust",
            String(
                gameState.trust
            )
        );

    } catch (error) {

        console.warn(
            "Congress simulation result could not be stored:",
            error
        );

    }


    /*
    ----------------------------------------------
    ACCOUNT-BASED SIMULATION RECORD

    Firebase stores the participant's permanent
    Congress simulation history.

    Local storage above remains in place as a
    fallback for the existing Simulation Center.
    ----------------------------------------------
    */

    try {

        await saveSimulationCompletion(
            "congress",
            {

                grade,

                result:
                    gameState.legislativeOutcome

            }
        );

    } catch (error) {

        console.warn(
            "Congress simulation account progress could not be saved:",
            error
        );

    }


    setText(
        "congressTermProgress",
        "100%"
    );


    resultsScreen?.scrollIntoView(
        {

            behavior:
                "smooth",

            block:
                "center"

        }
    );

}


/*
==================================================
RESET GAME STATE
==================================================
*/

function resetGameState() {

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


    gameState.coalition =
        0;


    gameState.evidence =
        0;


    gameState.credibility =
        0;


    gameState.houseResult =
        "pending";


    gameState.senateResult =
        "pending";


    gameState.presidentialResult =
        "pending";


    gameState.finalBillStatus =
        "pending";


    gameState.legislativeOutcome =
        "Your legislation is still being developed.";


    delete gameState.recoveryResult;

    delete gameState.overrideAttempt;

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
        "congress-news-item";


    const label =
        document.createElement(
            "span"
        );


    label.textContent =
        "District 14";


    const headline =
        document.createElement(
            "p"
        );


    headline.textContent =
        anotherTerm
            ? "Representative begins another term in Congress."
            : "Newly elected representative arrives in Washington.";


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


    gameScreen?.scrollIntoView(
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


    gameScreen?.scrollIntoView(
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
EVENT LISTENERS
==================================================
*/

if (
    startButton
) {

    startButton.addEventListener(
        "click",
        startSimulation
    );

}


if (
    continueButton
) {

    continueButton.addEventListener(
        "click",
        continueSimulation
    );

}


if (
    restartButton
) {

    restartButton.addEventListener(
        "click",
        resetSimulation
    );

}


/*
==================================================
INITIAL DASHBOARD
==================================================
*/

resetSimulationFlow();

updateDashboard();