/*
==================================================
CIVIC HORIZON INDEX V2
CAMPAIGN TRAIL SIMULATION
BRANCHING CAMPAIGN ENGINE
==================================================
*/


/*
==================================================
FOUNDATION SCENARIOS
==================================================
*/

const campaignScenarios = [

    /*
    ==================================================
    1. CAMPAIGN MESSAGE
    BEST CHOICE: B
    ==================================================
    */

    {
        id:
            "campaignMessage",

        category:
            "Campaign Strategy",

        title:
            "Your campaign needs a clear opening message.",

        text:
            "Voters know your name, but many are still unsure what your campaign stands for. How do you define the race?",

        stage:
            "Campaign Launch",

        choices: [

            {
                text:
                    "Use broad slogans without explaining your priorities",

                outcomeTitle:
                    "The campaign attracts attention but lacks detail",

                outcomeText:
                    "The message is easy to repeat, but voters still have limited information about how you would govern.",

                polling:
                    1,

                trust:
                    -3,

                coalition:
                    0,

                momentum:
                    2,

                majorEvents:
                    1,

                endorsements:
                    0,

                messageDiscipline:
                    1,

                resourceManagement:
                    0,

                voterOutreach:
                    0,

                debateSkill:
                    0,

                integrity:
                    -1,

                messageResult:
                    "vague",

                headline:
                    "Campaign launches with broad message as voters seek more detail."
            },

            {
                text:
                    "Build the campaign around a clear set of policy priorities and explain how you would govern",

                outcomeTitle:
                    "The campaign gains definition",

                outcomeText:
                    "Voters begin to understand what your candidacy represents, and the campaign has a consistent message to carry into later events.",

                polling:
                    3,

                trust:
                    7,

                coalition:
                    4,

                momentum:
                    5,

                majorEvents:
                    1,

                endorsements:
                    0,

                messageDiscipline:
                    5,

                resourceManagement:
                    1,

                voterOutreach:
                    3,

                debateSkill:
                    0,

                integrity:
                    4,

                messageResult:
                    "clear",

                headline:
                    "Candidate launches campaign with detailed governing message."
            },

            {
                text:
                    "Change your core message depending on which audience you are speaking to",

                outcomeTitle:
                    "The campaign struggles with consistency",

                outcomeText:
                    "Different groups hear what they want, but conflicting messages quickly create questions about what you actually believe.",

                polling:
                    -2,

                trust:
                    -9,

                coalition:
                    -2,

                momentum:
                    -3,

                majorEvents:
                    1,

                endorsements:
                    0,

                messageDiscipline:
                    -5,

                resourceManagement:
                    0,

                voterOutreach:
                    1,

                debateSkill:
                    0,

                integrity:
                    -5,

                messageResult:
                    "inconsistent",

                headline:
                    "Conflicting campaign messages raise questions about candidate positions."
            },

            {
                text:
                    "Make the campaign almost entirely about attacking your opponent",

                outcomeTitle:
                    "The race becomes negative quickly",

                outcomeText:
                    "The attacks may energize some supporters, but voters learn little about your own governing priorities.",

                polling:
                    0,

                trust:
                    -7,

                coalition:
                    -3,

                momentum:
                    1,

                majorEvents:
                    1,

                endorsements:
                    0,

                messageDiscipline:
                    -2,

                resourceManagement:
                    0,

                voterOutreach:
                    -2,

                debateSkill:
                    0,

                integrity:
                    -4,

                messageResult:
                    "negative",

                headline:
                    "Campaign opens with aggressive attacks on opponent."
            }

        ]

    },


    /*
    ==================================================
    2. VOTER OUTREACH
    BEST CHOICE: D
    ==================================================
    */

    {
        id:
            "voterOutreach",

        category:
            "Voter Outreach",

        title:
            "Your campaign must decide where to spend limited time and organizing resources.",

        text:
            "Some advisers want to focus only on your strongest supporters. Others want a broader voter-contact strategy. What do you do?",

        stage:
            "Coalition Building",

        choices: [

            {
                text:
                    "Focus almost entirely on voters who already strongly support you",

                outcomeTitle:
                    "The base becomes more energized",

                outcomeText:
                    "Core supporters become more engaged, but the campaign makes limited progress with undecided voters.",

                polling:
                    1,

                trust:
                    0,

                coalition:
                    1,

                momentum:
                    3,

                majorEvents:
                    1,

                endorsements:
                    0,

                messageDiscipline:
                    1,

                resourceManagement:
                    2,

                voterOutreach:
                    -1,

                debateSkill:
                    0,

                integrity:
                    0,

                outreachResult:
                    "baseOnly",

                headline:
                    "Campaign concentrates organizing resources on core supporters."
            },

            {
                text:
                    "Spend most campaign time with major donors and high-profile supporters",

                outcomeTitle:
                    "The campaign gains elite support",

                outcomeText:
                    "Fundraising and access improve, but many ordinary voters feel the campaign is not listening to them.",

                polling:
                    0,

                trust:
                    -6,

                coalition:
                    -3,

                momentum:
                    1,

                majorEvents:
                    1,

                endorsements:
                    2,

                messageDiscipline:
                    0,

                resourceManagement:
                    3,

                voterOutreach:
                    -4,

                debateSkill:
                    0,

                integrity:
                    -2,

                outreachResult:
                    "donorFocused",

                headline:
                    "Campaign schedule draws criticism for heavy focus on donors."
            },

            {
                text:
                    "Rely almost entirely on social media and stop most in-person voter outreach",

                outcomeTitle:
                    "Online attention rises",

                outcomeText:
                    "The campaign reaches many people quickly, but loses some of the local relationships and direct feedback created by field organizing.",

                polling:
                    1,

                trust:
                    -2,

                coalition:
                    -2,

                momentum:
                    3,

                majorEvents:
                    1,

                endorsements:
                    0,

                messageDiscipline:
                    1,

                resourceManagement:
                    1,

                voterOutreach:
                    -3,

                debateSkill:
                    0,

                integrity:
                    0,

                outreachResult:
                    "digitalOnly",

                headline:
                    "Campaign shifts heavily toward digital outreach."
            },

            {
                text:
                    "Organize across supportive, persuadable, and lower-participation communities",

                outcomeTitle:
                    "The coalition begins expanding",

                outcomeText:
                    "The strategy takes more work, but the campaign starts building support beyond its original base.",

                polling:
                    4,

                trust:
                    5,

                coalition:
                    8,

                momentum:
                    5,

                majorEvents:
                    1,

                endorsements:
                    1,

                messageDiscipline:
                    1,

                resourceManagement:
                    2,

                voterOutreach:
                    5,

                debateSkill:
                    0,

                integrity:
                    2,

                outreachResult:
                    "broadCoalition",

                headline:
                    "Campaign expands organizing effort across diverse communities."
            }

        ]

    },


    /*
    ==================================================
    3. CAMPAIGN RESOURCES
    BEST CHOICE: A
    ==================================================
    */

    {
        id:
            "campaignResources",

        category:
            "Campaign Resources",

        title:
            "Your campaign has raised less money than expected.",

        text:
            "You cannot fund every advertisement, event, field office, and travel plan. How do you respond?",

        stage:
            "Resource Allocation",

        choices: [

            {
                text:
                    "Prioritize voter contact, key media markets, and the most competitive regions",

                outcomeTitle:
                    "Resources are concentrated strategically",

                outcomeText:
                    "The campaign gives up some lower-priority spending while protecting the activities most likely to influence the race.",

                polling:
                    3,

                trust:
                    2,

                coalition:
                    3,

                momentum:
                    4,

                majorEvents:
                    1,

                endorsements:
                    0,

                messageDiscipline:
                    2,

                resourceManagement:
                    5,

                voterOutreach:
                    3,

                debateSkill:
                    0,

                integrity:
                    1,

                resourceResult:
                    "strategic",

                headline:
                    "Campaign redirects resources toward competitive regions and voter contact."
            },

            {
                text:
                    "Hide the campaign's financial problems from senior staff and continue as if nothing is wrong",

                outcomeTitle:
                    "Internal planning breaks down",

                outcomeText:
                    "Staff members make decisions using inaccurate assumptions, creating confusion and damaging confidence inside the campaign.",

                polling:
                    -3,

                trust:
                    -6,

                coalition:
                    -2,

                momentum:
                    -5,

                majorEvents:
                    0,

                endorsements:
                    0,

                messageDiscipline:
                    -2,

                resourceManagement:
                    -6,

                voterOutreach:
                    -2,

                debateSkill:
                    0,

                integrity:
                    -5,

                resourceResult:
                    "concealed",

                campaignCrisis:
                    true,

                headline:
                    "Campaign faces internal turmoil over undisclosed financial problems."
            },

            {
                text:
                    "Spend heavily now and assume more money will arrive later",

                outcomeTitle:
                    "The campaign gets a short-term boost",

                outcomeText:
                    "Visibility increases temporarily, but the campaign becomes vulnerable if fundraising does not improve.",

                polling:
                    2,

                trust:
                    -1,

                coalition:
                    0,

                momentum:
                    3,

                majorEvents:
                    1,

                endorsements:
                    0,

                messageDiscipline:
                    0,

                resourceManagement:
                    -5,

                voterOutreach:
                    1,

                debateSkill:
                    0,

                integrity:
                    -1,

                resourceResult:
                    "overspending",

                headline:
                    "Campaign accelerates spending despite fundraising concerns."
            },

            {
                text:
                    "Cancel most voter-contact efforts and protect advertising spending",

                outcomeTitle:
                    "The campaign remains visible",

                outcomeText:
                    "Advertising continues, but field organizing and direct voter relationships weaken.",

                polling:
                    0,

                trust:
                    -2,

                coalition:
                    -4,

                momentum:
                    -1,

                majorEvents:
                    1,

                endorsements:
                    0,

                messageDiscipline:
                    1,

                resourceManagement:
                    0,

                voterOutreach:
                    -5,

                debateSkill:
                    0,

                integrity:
                    0,

                resourceResult:
                    "adsOnly",

                headline:
                    "Campaign cuts field operation while maintaining advertising."
            }

        ]

    },


    /*
    ==================================================
    4. FIRST MAJOR DEBATE
    BEST CHOICE: C
    ==================================================
    */

    {
        id:
            "firstDebate",

        category:
            "Debate",

        title:
            "The first major debate could reshape the race.",

        text:
            "Your advisers disagree about whether to focus on policy, attacks, memorable lines, or avoiding mistakes. How do you prepare?",

        stage:
            "Debate Night",

        choices: [

            {
                text:
                    "Focus almost entirely on attacking your opponent personally",

                outcomeTitle:
                    "The debate becomes confrontational",

                outcomeText:
                    "Some supporters enjoy the aggressive performance, but undecided voters receive little information about how you would govern.",

                polling:
                    0,

                trust:
                    -7,

                coalition:
                    -3,

                momentum:
                    1,

                majorEvents:
                    1,

                endorsements:
                    0,

                messageDiscipline:
                    -2,

                resourceManagement:
                    0,

                voterOutreach:
                    -2,

                debateSkill:
                    -1,

                integrity:
                    -5,

                debateResult:
                    "personalAttacks",

                headline:
                    "Debate turns personal as candidate launches repeated attacks."
            },

            {
                text:
                    "Give vague answers to avoid taking positions on difficult issues",

                outcomeTitle:
                    "The campaign avoids major mistakes",

                outcomeText:
                    "You reduce the chance of a damaging answer, but voters leave the debate with fewer reasons to support your candidacy.",

                polling:
                    -2,

                trust:
                    -5,

                coalition:
                    -1,

                momentum:
                    -3,

                majorEvents:
                    1,

                endorsements:
                    0,

                messageDiscipline:
                    -2,

                resourceManagement:
                    0,

                voterOutreach:
                    -1,

                debateSkill:
                    -3,

                integrity:
                    -2,

                debateResult:
                    "vague",

                headline:
                    "Voters seek clearer answers after cautious debate performance."
            },

            {
                text:
                    "Prepare detailed answers, practice concise explanations, and challenge your opponent on substance",

                outcomeTitle:
                    "The debate strengthens your credibility",

                outcomeText:
                    "You communicate clear differences while showing voters that you understand the responsibilities of the office.",

                polling:
                    5,

                trust:
                    7,

                coalition:
                    4,

                momentum:
                    8,

                majorEvents:
                    1,

                endorsements:
                    1,

                messageDiscipline:
                    4,

                resourceManagement:
                    0,

                voterOutreach:
                    1,

                debateSkill:
                    5,

                integrity:
                    3,

                debateResult:
                    "strong",

                headline:
                    "Candidate earns strong reviews after policy-focused debate performance."
            },

            {
                text:
                    "Make claims you know are misleading because they may produce a strong headline",

                outcomeTitle:
                    "The statement creates immediate attention",

                outcomeText:
                    "The line spreads quickly, but fact-checking and follow-up coverage create a serious credibility problem.",

                polling:
                    -3,

                trust:
                    -11,

                coalition:
                    -4,

                momentum:
                    -5,

                majorEvents:
                    1,

                endorsements:
                    -1,

                messageDiscipline:
                    -3,

                resourceManagement:
                    0,

                voterOutreach:
                    -2,

                debateSkill:
                    -2,

                integrity:
                    -7,

                debateResult:
                    "misleading",

                campaignCrisis:
                    true,

                headline:
                    "Campaign faces credibility questions after disputed debate claim."
            }

        ]

    }

];


/*
==================================================
CAMPAIGN STATE
==================================================
*/

const gameState = {

    polling:
        47,

    trust:
        61,

    coalition:
        58,

    momentum:
        55,

    majorEvents:
        0,

    endorsements:
        0,


    /*
    ----------------------------------------------
    HIDDEN CAMPAIGN METRICS
    ----------------------------------------------
    */

    messageDiscipline:
        0,

    resourceManagement:
        0,

    voterOutreach:
        0,

    debateSkill:
        0,

    integrity:
        0,


    /*
    ----------------------------------------------
    BRANCHING RESULTS
    ----------------------------------------------
    */

    messageResult:
        "pending",

    outreachResult:
        "pending",

    resourceResult:
        "pending",

    debateResult:
        "pending",

    mediaResult:
        "pending",

    coalitionResult:
        "pending",

    closingResult:
        "pending",

    electionDayResult:
        "pending",

    campaignCrisis:
        false,

    electionResult:
        "Pending",

    campaignOutcome:
        "The campaign is still unfolding."

};


/*
==================================================
INITIAL FLOW
==================================================
*/

let simulationFlow = [

    campaignScenarios[0],

    campaignScenarios[1],

    campaignScenarios[2],

    campaignScenarios[3]

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
        "campaignStartScreen"
    );


const gameScreen =
    document.getElementById(
        "campaignGameScreen"
    );


const resultsScreen =
    document.getElementById(
        "campaignResultsScreen"
    );


const startButton =
    document.getElementById(
        "campaignStartButton"
    );


const restartButton =
    document.getElementById(
        "campaignRestartButton"
    );


const continueButton =
    document.getElementById(
        "campaignContinueButton"
    );


const scenarioCategory =
    document.getElementById(
        "campaignScenarioCategory"
    );


const scenarioProgress =
    document.getElementById(
        "campaignScenarioProgress"
    );


const scenarioTitle =
    document.getElementById(
        "campaignScenarioTitle"
    );


const scenarioText =
    document.getElementById(
        "campaignScenarioText"
    );


const choiceContainer =
    document.getElementById(
        "campaignChoiceContainer"
    );


const outcome =
    document.getElementById(
        "campaignOutcome"
    );


const outcomeIcon =
    document.getElementById(
        "campaignOutcomeIcon"
    );


const outcomeTitle =
    document.getElementById(
        "campaignOutcomeTitle"
    );


const outcomeText =
    document.getElementById(
        "campaignOutcomeText"
    );


const newsFeed =
    document.getElementById(
        "campaignNewsFeed"
    );
    /*
==================================================
MEDIA PRESSURE — STABLE PATH
BEST CHOICE: B
==================================================
*/

const mediaStableScenario = {

    id:
        "mediaStable",

    category:
        "Media Pressure",

    title:
        "A controversial story begins dominating campaign coverage.",

    text:
        "The report contains some fair criticism and some exaggerated claims. Reporters want an immediate response. What do you do?",

    stage:
        "Media Scrutiny",

    choices: [

        {
            text:
                "Refuse to answer questions and attack every reporter covering the story",

            outcomeTitle:
                "The media confrontation grows",

            outcomeText:
                "Supporters may rally around the campaign, but unanswered questions keep the controversy alive and reduce trust among undecided voters.",

            polling:
                -2,

            trust:
                -7,

            coalition:
                -2,

            momentum:
                -3,

            majorEvents:
                1,

            endorsements:
                -1,

            messageDiscipline:
                -2,

            resourceManagement:
                0,

            voterOutreach:
                -2,

            debateSkill:
                0,

            integrity:
                -3,

            mediaResult:
                "mediaWar",

            headline:
                "Campaign escalates confrontation with reporters amid continuing controversy."
        },

        {
            text:
                "Respond directly, correct inaccurate claims, and acknowledge legitimate criticism",

            outcomeTitle:
                "The campaign contains the story",

            outcomeText:
                "The response does not eliminate negative coverage, but it gives voters a clearer account and reinforces a reputation for accountability.",

            polling:
                2,

            trust:
                7,

            coalition:
                3,

            momentum:
                4,

            majorEvents:
                1,

            endorsements:
                1,

            messageDiscipline:
                4,

            resourceManagement:
                0,

            voterOutreach:
                1,

            debateSkill:
                0,

            integrity:
                5,

            mediaResult:
                "transparentResponse",

            headline:
                "Candidate addresses controversial report and disputes inaccurate claims."
        },

        {
            text:
                "Release partial information designed to make the story disappear without addressing the main issue",

            outcomeTitle:
                "Questions continue",

            outcomeText:
                "The campaign temporarily changes the conversation, but follow-up reporting creates new doubts about whether important information was withheld.",

            polling:
                -2,

            trust:
                -8,

            coalition:
                -2,

            momentum:
                -3,

            majorEvents:
                1,

            endorsements:
                0,

            messageDiscipline:
                -1,

            resourceManagement:
                0,

            voterOutreach:
                -1,

            debateSkill:
                0,

            integrity:
                -5,

            mediaResult:
                "partialDisclosure",

            headline:
                "New questions emerge after campaign releases limited information on controversy."
        },

        {
            text:
                "Invent a competing story about your opponent to distract attention",

            outcomeTitle:
                "The campaign creates a second controversy",

            outcomeText:
                "The tactic briefly changes the news cycle, but the original issue remains and the new claim creates additional credibility concerns.",

            polling:
                -4,

            trust:
                -11,

            coalition:
                -4,

            momentum:
                -5,

            majorEvents:
                1,

            endorsements:
                -1,

            messageDiscipline:
                -4,

            resourceManagement:
                0,

            voterOutreach:
                -2,

            debateSkill:
                0,

            integrity:
                -7,

            mediaResult:
                "fabricatedDistraction",

            campaignCrisis:
                true,

            headline:
                "Campaign credibility damaged after disputed counterattack on opponent."
        }

    ]

};


/*
==================================================
MEDIA PRESSURE — CRISIS PATH
BEST CHOICE: B
==================================================
*/

const mediaCrisisScenario = {

    id:
        "mediaCrisis",

    category:
        "Campaign Crisis",

    title:
        "Your campaign enters a major credibility crisis.",

    text:
        "Polling is slipping, allies are nervous, and reporters are questioning whether the campaign has been truthful with voters. How do you respond?",

    stage:
        "Credibility Crisis",

    choices: [

        {
            text:
                "Double down on disputed claims despite evidence they are inaccurate",

            outcomeTitle:
                "The credibility crisis deepens",

            outcomeText:
                "The campaign avoids admitting error, but voters and supporters face increasing evidence that the disputed claims cannot be defended.",

            polling:
                -7,

            trust:
                -14,

            coalition:
                -7,

            momentum:
                -9,

            majorEvents:
                1,

            endorsements:
                -2,

            messageDiscipline:
                -4,

            resourceManagement:
                0,

            voterOutreach:
                -3,

            debateSkill:
                -1,

            integrity:
                -8,

            mediaResult:
                "doubledDown",

            campaignCrisis:
                true,

            headline:
                "Campaign crisis worsens as candidate repeats disputed claims."
        },

        {
            text:
                "Acknowledge the problem, correct the record, and release supporting information",

            outcomeTitle:
                "The campaign begins rebuilding trust",

            outcomeText:
                "The correction is politically painful, but transparency helps stabilize the campaign and gives supporters a reason to defend your credibility.",

            polling:
                1,

            trust:
                10,

            coalition:
                4,

            momentum:
                5,

            majorEvents:
                1,

            endorsements:
                1,

            messageDiscipline:
                3,

            resourceManagement:
                0,

            voterOutreach:
                2,

            debateSkill:
                0,

            integrity:
                7,

            mediaResult:
                "recovery",

            campaignCrisis:
                false,

            headline:
                "Candidate issues correction and releases records during campaign crisis."
        },

        {
            text:
                "Stop taking questions for the remainder of the campaign",

            outcomeTitle:
                "The campaign loses control of the narrative",

            outcomeText:
                "The candidate avoids difficult interviews, but unanswered questions dominate coverage and create distance from voters.",

            polling:
                -5,

            trust:
                -9,

            coalition:
                -4,

            momentum:
                -7,

            majorEvents:
                0,

            endorsements:
                -1,

            messageDiscipline:
                -2,

            resourceManagement:
                0,

            voterOutreach:
                -4,

            debateSkill:
                0,

            integrity:
                -4,

            mediaResult:
                "withdrawn",

            campaignCrisis:
                true,

            headline:
                "Candidate stops taking questions as campaign credibility concerns continue."
        },

        {
            text:
                "Ask trusted campaign surrogates to explain the situation while you release a full factual statement",

            outcomeTitle:
                "The campaign stabilizes its message",

            outcomeText:
                "The response combines direct documentation with outside validators, helping restore some confidence without avoiding responsibility.",

            polling:
                2,

            trust:
                8,

            coalition:
                6,

            momentum:
                5,

            majorEvents:
                1,

            endorsements:
                2,

            messageDiscipline:
                4,

            resourceManagement:
                1,

            voterOutreach:
                2,

            debateSkill:
                0,

            integrity:
                5,

            mediaResult:
                "surrogateRecovery",

            campaignCrisis:
                false,

            headline:
                "Campaign allies rally behind candidate after release of detailed factual response."
        }

    ]

};


/*
==================================================
COALITION BUILDING — STRONG PATH
BEST CHOICE: D
==================================================
*/

const coalitionStrongScenario = {

    id:
        "coalitionStrong",

    category:
        "Coalition Building",

    title:
        "Your campaign has built support across several groups, but different parts of the coalition want different priorities emphasized.",

    text:
        "How do you keep the coalition together without abandoning the campaign's core message?",

    stage:
        "Coalition Management",

    choices: [

        {
            text:
                "Promise every group exactly what it wants even when the promises conflict",

            outcomeTitle:
                "The coalition looks stronger temporarily",

            outcomeText:
                "Support rises in the short term, but conflicting promises create serious problems once voters compare the campaign's commitments.",

            polling:
                2,

            trust:
                -7,

            coalition:
                -3,

            momentum:
                2,

            majorEvents:
                1,

            endorsements:
                1,

            messageDiscipline:
                -5,

            resourceManagement:
                0,

            voterOutreach:
                2,

            debateSkill:
                0,

            integrity:
                -6,

            coalitionResult:
                "conflictingPromises",

            headline:
                "Campaign faces questions over conflicting promises to key groups."
        },

        {
            text:
                "Ignore smaller groups and focus only on the largest voting bloc",

            outcomeTitle:
                "The campaign simplifies its strategy",

            outcomeText:
                "The largest bloc receives more attention, but support weakens among communities that helped build the broader coalition.",

            polling:
                0,

            trust:
                -3,

            coalition:
                -6,

            momentum:
                -1,

            majorEvents:
                1,

            endorsements:
                -1,

            messageDiscipline:
                1,

            resourceManagement:
                1,

            voterOutreach:
                -3,

            debateSkill:
                0,

            integrity:
                0,

            coalitionResult:
                "narrowed",

            headline:
                "Campaign narrows coalition strategy as smaller groups express concern."
        },

        {
            text:
                "Let each campaign office create its own message for local audiences",

            outcomeTitle:
                "The coalition receives conflicting signals",

            outcomeText:
                "Local flexibility increases, but voters begin hearing inconsistent explanations of what the candidate actually supports.",

            polling:
                -1,

            trust:
                -6,

            coalition:
                -4,

            momentum:
                -3,

            majorEvents:
                1,

            endorsements:
                0,

            messageDiscipline:
                -5,

            resourceManagement:
                -1,

            voterOutreach:
                1,

            debateSkill:
                0,

            integrity:
                -3,

            coalitionResult:
                "fragmented",

            headline:
                "Conflicting regional campaign messages create coalition confusion."
        },

        {
            text:
                "Connect each group's concerns to the campaign's broader governing priorities",

            outcomeTitle:
                "The coalition becomes more durable",

            outcomeText:
                "Different supporters do not agree on everything, but they can see how their priorities fit within a consistent campaign agenda.",

            polling:
                4,

            trust:
                5,

            coalition:
                9,

            momentum:
                6,

            majorEvents:
                1,

            endorsements:
                2,

            messageDiscipline:
                4,

            resourceManagement:
                1,

            voterOutreach:
                4,

            debateSkill:
                0,

            integrity:
                3,

            coalitionResult:
                "durable",

            headline:
                "Candidate strengthens broad coalition around shared governing agenda."
        }

    ]

};


/*
==================================================
COALITION BUILDING — WEAK PATH
BEST CHOICE: D
==================================================
*/

const coalitionWeakScenario = {

    id:
        "coalitionWeak",

    category:
        "Coalition Trouble",

    title:
        "Your campaign reaches the final stretch with a narrow and fragile coalition.",

    text:
        "Several voter groups remain unconvinced, and some supporters worry the campaign is not broad enough to win. What do you do?",

    stage:
        "Coalition Recovery",

    choices: [

        {
            text:
                "Focus only on turning out the existing base",

            outcomeTitle:
                "Core supporters become more motivated",

            outcomeText:
                "The strategy may increase turnout among loyal supporters, but the campaign still struggles to persuade voters outside its existing coalition.",

            polling:
                1,

            trust:
                0,

            coalition:
                1,

            momentum:
                3,

            majorEvents:
                1,

            endorsements:
                0,

            messageDiscipline:
                2,

            resourceManagement:
                2,

            voterOutreach:
                -2,

            debateSkill:
                0,

            integrity:
                0,

            coalitionResult:
                "baseTurnout",

            headline:
                "Campaign shifts final organizing effort toward core supporters."
        },

        {
            text:
                "Abandon several core positions to chase whichever voters appear available",

            outcomeTitle:
                "The campaign shifts direction abruptly",

            outcomeText:
                "Some new voters take another look, but existing supporters question whether the campaign still stands for anything consistent.",

            polling:
                0,

            trust:
                -8,

            coalition:
                -2,

            momentum:
                -3,

            majorEvents:
                1,

            endorsements:
                -1,

            messageDiscipline:
                -6,

            resourceManagement:
                0,

            voterOutreach:
                2,

            debateSkill:
                0,

            integrity:
                -5,

            coalitionResult:
                "abandonedPositions",

            headline:
                "Late campaign shifts raise questions about candidate's core positions."
        },

        {
            text:
                "Use fear-based claims about groups outside your coalition to motivate supporters",

            outcomeTitle:
                "The campaign becomes more divisive",

            outcomeText:
                "Some supporters become more energized, but trust and broader coalition potential deteriorate sharply.",

            polling:
                -2,

            trust:
                -11,

            coalition:
                -8,

            momentum:
                -2,

            majorEvents:
                1,

            endorsements:
                -2,

            messageDiscipline:
                -3,

            resourceManagement:
                0,

            voterOutreach:
                -5,

            debateSkill:
                0,

            integrity:
                -7,

            coalitionResult:
                "divisive",

            campaignCrisis:
                true,

            headline:
                "Campaign faces backlash over divisive closing coalition strategy."
        },

        {
            text:
                "Launch targeted listening events and adjust emphasis without abandoning core positions",

            outcomeTitle:
                "The campaign broadens its appeal",

            outcomeText:
                "The outreach does not win everyone, but it shows voters that the campaign is willing to listen while maintaining a consistent platform.",

            polling:
                3,

            trust:
                6,

            coalition:
                9,

            momentum:
                6,

            majorEvents:
                1,

            endorsements:
                1,

            messageDiscipline:
                3,

            resourceManagement:
                1,

            voterOutreach:
                5,

            debateSkill:
                0,

            integrity:
                3,

            coalitionResult:
                "recovery",

            headline:
                "Candidate launches late outreach effort to broaden voter coalition."
        }

    ]

};


/*
==================================================
CLOSING STRATEGY — STRONG CAMPAIGN
BEST CHOICE: A
==================================================
*/

const closingStrongScenario = {

    id:
        "closingStrong",

    category:
        "Closing Strategy",

    title:
        "Election Day is approaching and the race remains competitive.",

    text:
        "Your campaign has several strengths to build on. How do you use the final days?",

    stage:
        "Final Stretch",

    choices: [

        {
            text:
                "Finish with a consistent governing message, strong voter contact, and disciplined turnout operations",

            outcomeTitle:
                "The campaign closes with focus",

            outcomeText:
                "The final message reinforces why you are running while field organizers concentrate on identifying and turning out supporters.",

            polling:
                5,

            trust:
                5,

            coalition:
                5,

            momentum:
                9,

            majorEvents:
                1,

            endorsements:
                1,

            messageDiscipline:
                4,

            resourceManagement:
                4,

            voterOutreach:
                5,

            debateSkill:
                0,

            integrity:
                3,

            closingResult:
                "disciplined",

            headline:
                "Campaign enters Election Day with disciplined message and strong turnout operation."
        },

        {
            text:
                "Change your main campaign theme to chase the latest polling movement",

            outcomeTitle:
                "The campaign loses message consistency",

            outcomeText:
                "The new theme may respond to current concerns, but voters hear a different closing argument from the one used throughout the race.",

            polling:
                -1,

            trust:
                -5,

            coalition:
                -2,

            momentum:
                -3,

            majorEvents:
                1,

            endorsements:
                0,

            messageDiscipline:
                -5,

            resourceManagement:
                0,

            voterOutreach:
                0,

            debateSkill:
                0,

            integrity:
                -2,

            closingResult:
                "latePivot",

            headline:
                "Candidate changes closing message days before Election Day."
        },

        {
            text:
                "Spend almost every remaining resource on one dramatic advertisement",

            outcomeTitle:
                "The campaign makes a high-risk bet",

            outcomeText:
                "The advertisement gains attention, but the campaign sacrifices some organizing and voter-contact capacity in the final days.",

            polling:
                1,

            trust:
                0,

            coalition:
                -1,

            momentum:
                3,

            majorEvents:
                1,

            endorsements:
                0,

            messageDiscipline:
                1,

            resourceManagement:
                -4,

            voterOutreach:
                -4,

            debateSkill:
                0,

            integrity:
                0,

            closingResult:
                "adGamble",

            headline:
                "Campaign makes final high-cost advertising push before Election Day."
        },

        {
            text:
                "Spread an unverified accusation because there may not be time for voters to check it",

            outcomeTitle:
                "The closing argument creates a credibility crisis",

            outcomeText:
                "The accusation receives immediate attention, but the lack of evidence damages voter trust and overwhelms the campaign's final message.",

            polling:
                -5,

            trust:
                -13,

            coalition:
                -6,

            momentum:
                -8,

            majorEvents:
                1,

            endorsements:
                -2,

            messageDiscipline:
                -5,

            resourceManagement:
                0,

            voterOutreach:
                -2,

            debateSkill:
                0,

            integrity:
                -8,

            closingResult:
                "falseAttack",

            campaignCrisis:
                true,

            headline:
                "Late campaign accusation sparks major credibility backlash."
        }

    ]

};


/*
==================================================
CLOSING STRATEGY — WEAK CAMPAIGN
BEST CHOICE: A
==================================================
*/

const closingWeakScenario = {

    id:
        "closingWeak",

    category:
        "Closing Strategy",

    title:
        "Election Day is approaching and your campaign is struggling to regain momentum.",

    text:
        "You still have a path to compete, but the final decisions must be disciplined. What do you do?",

    stage:
        "Final Recovery Push",

    choices: [

        {
            text:
                "Concentrate remaining resources on persuadable voters and reliable turnout operations",

            outcomeTitle:
                "The campaign gives itself a realistic final chance",

            outcomeText:
                "The strategy cannot erase earlier problems, but it focuses limited resources on the voters most likely to determine the result.",

            polling:
                4,

            trust:
                3,

            coalition:
                4,

            momentum:
                7,

            majorEvents:
                1,

            endorsements:
                1,

            messageDiscipline:
                3,

            resourceManagement:
                5,

            voterOutreach:
                5,

            debateSkill:
                0,

            integrity:
                2,

            closingResult:
                "recoveryPush",

            headline:
                "Campaign launches targeted final push in competitive communities."
        },

        {
            text:
                "Ignore persuadable voters and focus entirely on online attention",

            outcomeTitle:
                "The campaign generates digital activity",

            outcomeText:
                "Online engagement increases, but the campaign does less direct work to convert attention into actual votes.",

            polling:
                0,

            trust:
                -1,

            coalition:
                -2,

            momentum:
                2,

            majorEvents:
                1,

            endorsements:
                0,

            messageDiscipline:
                1,

            resourceManagement:
                0,

            voterOutreach:
                -5,

            debateSkill:
                0,

            integrity:
                0,

            closingResult:
                "onlineOnly",

            headline:
                "Campaign relies heavily on digital engagement in final days."
        },

        {
            text:
                "Make a series of major new promises without explaining how they would be carried out",

            outcomeTitle:
                "The campaign tries to reset the race",

            outcomeText:
                "The promises attract attention, but voters question why major commitments appeared only in the final days.",

            polling:
                0,

            trust:
                -7,

            coalition:
                -1,

            momentum:
                -1,

            majorEvents:
                1,

            endorsements:
                0,

            messageDiscipline:
                -4,

            resourceManagement:
                -1,

            voterOutreach:
                0,

            debateSkill:
                0,

            integrity:
                -5,

            closingResult:
                "latePromises",

            headline:
                "Candidate unveils sweeping last-minute promises as campaign struggles."
        },

        {
            text:
                "Claim the election will be illegitimate if you lose",

            outcomeTitle:
                "Trust in the campaign deteriorates",

            outcomeText:
                "The message may motivate some supporters, but undermining confidence in the election without evidence damages credibility and the campaign's closing argument.",

            polling:
                -5,

            trust:
                -14,

            coalition:
                -8,

            momentum:
                -7,

            majorEvents:
                1,

            endorsements:
                -3,

            messageDiscipline:
                -5,

            resourceManagement:
                0,

            voterOutreach:
                -4,

            debateSkill:
                0,

            integrity:
                -9,

            closingResult:
                "delegitimizedElection",

            campaignCrisis:
                true,

            headline:
                "Candidate faces backlash after questioning election legitimacy without evidence."
        }

    ]

};


/*
==================================================
ELECTION DAY — STABLE PATH
BEST CHOICE: C
==================================================
*/

const electionDayStableScenario = {

    id:
        "electionDayStable",

    category:
        "Election Day",

    title:
        "Election Day has arrived.",

    text:
        "Turnout is strong and the race remains close. Your campaign receives reports of long lines and isolated voting problems. What do you do?",

    stage:
        "Election Day",

    choices: [

        {
            text:
                "Spread rumors about polling places before verifying them",

            outcomeTitle:
                "Confusion damages the campaign",

            outcomeText:
                "Unverified information creates unnecessary uncertainty for voters and raises major questions about campaign judgment.",

            polling:
                -5,

            trust:
                -12,

            coalition:
                -6,

            momentum:
                -7,

            majorEvents:
                1,

            endorsements:
                -2,

            messageDiscipline:
                -5,

            resourceManagement:
                -2,

            voterOutreach:
                -4,

            debateSkill:
                0,

            integrity:
                -9,

            electionDayResult:
                "misinformation",

            campaignCrisis:
                true,

            headline:
                "Campaign retracts inaccurate Election Day information after voter confusion."
        },

        {
            text:
                "Tell supporters to confront opposing voters at polling places",

            outcomeTitle:
                "The campaign creates a serious election-day problem",

            outcomeText:
                "The tactic increases tension and damages public confidence in the campaign's commitment to lawful democratic participation.",

            polling:
                -6,

            trust:
                -14,

            coalition:
                -8,

            momentum:
                -8,

            majorEvents:
                1,

            endorsements:
                -3,

            messageDiscipline:
                -4,

            resourceManagement:
                -1,

            voterOutreach:
                -5,

            debateSkill:
                0,

            integrity:
                -10,

            electionDayResult:
                "confrontation",

            campaignCrisis:
                true,

            headline:
                "Campaign faces condemnation over election-day confrontation tactics."
        },

        {
            text:
                "Focus campaign operations on lawful turnout reminders and direct voters with problems to official election resources",

            outcomeTitle:
                "The campaign supports lawful participation",

            outcomeText:
                "Staff focus on turnout while voters with election-administration questions are directed toward reliable official assistance.",

            polling:
                3,

            trust:
                6,

            coalition:
                5,

            momentum:
                7,

            majorEvents:
                1,

            endorsements:
                0,

            messageDiscipline:
                3,

            resourceManagement:
                4,

            voterOutreach:
                5,

            debateSkill:
                0,

            integrity:
                5,

            electionDayResult:
                "lawfulTurnout",

            headline:
                "Campaign focuses Election Day effort on lawful turnout and accurate voter information."
        },

        {
            text:
                "Stop voter outreach early because the campaign cannot influence anything else",

            outcomeTitle:
                "The campaign leaves turnout capacity unused",

            outcomeText:
                "The decision reduces operational risk, but supporters receive less final outreach during a close election.",

            polling:
                -2,

            trust:
                0,

            coalition:
                -2,

            momentum:
                -5,

            majorEvents:
                0,

            endorsements:
                0,

            messageDiscipline:
                0,

            resourceManagement:
                -3,

            voterOutreach:
                -5,

            debateSkill:
                0,

            integrity:
                1,

            electionDayResult:
                "earlyShutdown",

            headline:
                "Campaign scales back Election Day operation despite close race."
        }

    ]

};


/*
==================================================
ELECTION DAY — CRISIS PATH
BEST CHOICE: C
==================================================
*/

const electionDayCrisisScenario = {

    id:
        "electionDayCrisis",

    category:
        "Election Day Crisis",

    title:
        "Election Day arrives while your campaign is already struggling with credibility and momentum.",

    text:
        "Supporters are nervous and the race remains uncertain. How do you close the campaign?",

    stage:
        "Election Day Crisis",

    choices: [

        {
            text:
                "Declare victory before official results are available",

            outcomeTitle:
                "The campaign creates unnecessary confusion",

            outcomeText:
                "The declaration energizes some supporters, but it creates credibility problems because the actual result is still unknown.",

            polling:
                -4,

            trust:
                -10,

            coalition:
                -5,

            momentum:
                -5,

            majorEvents:
                1,

            endorsements:
                -2,

            messageDiscipline:
                -5,

            resourceManagement:
                0,

            voterOutreach:
                -2,

            debateSkill:
                0,

            integrity:
                -8,

            electionDayResult:
                "prematureClaim",

            campaignCrisis:
                true,

            headline:
                "Candidate claims victory before official election result is known."
        },

        {
            text:
                "Claim widespread fraud without evidence if early returns look unfavorable",

            outcomeTitle:
                "The credibility crisis becomes severe",

            outcomeText:
                "Unsupported claims undermine confidence in the campaign and distract from lawful procedures for resolving genuine election concerns.",

            polling:
                -7,

            trust:
                -16,

            coalition:
                -10,

            momentum:
                -10,

            majorEvents:
                1,

            endorsements:
                -4,

            messageDiscipline:
                -6,

            resourceManagement:
                0,

            voterOutreach:
                -5,

            debateSkill:
                0,

            integrity:
                -10,

            electionDayResult:
                "unsupportedFraudClaim",

            campaignCrisis:
                true,

            headline:
                "Candidate criticized after making unsupported election fraud allegations."
        },

        {
            text:
                "Tell supporters to vote, rely on official information, and wait for the certified result",

            outcomeTitle:
                "The campaign closes responsibly",

            outcomeText:
                "The final message cannot erase earlier problems, but it reinforces lawful participation and respect for the election process.",

            polling:
                2,

            trust:
                10,

            coalition:
                5,

            momentum:
                5,

            majorEvents:
                1,

            endorsements:
                1,

            messageDiscipline:
                4,

            resourceManagement:
                2,

            voterOutreach:
                4,

            debateSkill:
                0,

            integrity:
                8,

            electionDayResult:
                "responsibleClose",

            campaignCrisis:
                false,

            headline:
                "Candidate urges lawful participation and respect for certified election results."
        },

        {
            text:
                "Stop communicating publicly and allow rumors to spread until the count is complete",

            outcomeTitle:
                "The information vacuum grows",

            outcomeText:
                "The campaign avoids making a false claim, but silence leaves supporters without clear guidance during an uncertain period.",

            polling:
                -2,

            trust:
                -4,

            coalition:
                -2,

            momentum:
                -4,

            majorEvents:
                0,

            endorsements:
                0,

            messageDiscipline:
                -2,

            resourceManagement:
                0,

            voterOutreach:
                -2,

            debateSkill:
                0,

            integrity:
                0,

            electionDayResult:
                "silent",

            headline:
                "Campaign remains largely silent as Election Day uncertainty continues."
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

        campaignScenarios[0],

        campaignScenarios[1],

        campaignScenarios[2],

        campaignScenarios[3]

    ];

}


/*
==================================================
EXPECTED CAMPAIGN LENGTH
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

    gameState.polling =
        clamp(
            gameState.polling
        );


    gameState.trust =
        clamp(
            gameState.trust
        );


    gameState.coalition =
        clamp(
            gameState.coalition
        );


    gameState.momentum =
        clamp(
            gameState.momentum
        );


    setText(
        "campaignPolling",
        `${gameState.polling}%`
    );


    setText(
        "campaignTrust",
        `${gameState.trust}%`
    );


    setText(
        "campaignCoalition",
        `${gameState.coalition}%`
    );


    setText(
        "campaignMomentum",
        `${gameState.momentum}%`
    );


    setText(
        "campaignMajorEvents",
        gameState.majorEvents
    );


    setText(
        "campaignEndorsements",
        gameState.endorsements
    );


    setText(
        "executiveCampaignPolling",
        `${gameState.polling}%`
    );


    setText(
        "executiveCampaignTrust",
        `${gameState.trust}%`
    );


    setText(
        "executiveCampaignCoalition",
        `${gameState.coalition}%`
    );


    setText(
        "executiveCampaignMomentum",
        `${gameState.momentum}%`
    );


    setText(
        "sideCampaignMajorEvents",
        gameState.majorEvents
    );


    setText(
        "sideCampaignEndorsements",
        gameState.endorsements
    );


    updateMetric(
        "sideCampaignPolling",
        "sideCampaignPollingBar",
        gameState.polling
    );


    updateMetric(
        "sideCampaignTrust",
        "sideCampaignTrustBar",
        gameState.trust
    );


    updateMetric(
        "sideCampaignCoalition",
        "sideCampaignCoalitionBar",
        gameState.coalition
    );


    updateMetric(
        "sideCampaignMomentum",
        "sideCampaignMomentumBar",
        gameState.momentum
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
        "campaignTermProgress",
        `${progress}%`
    );

}


/*
==================================================
SELECT MEDIA PATH
==================================================
*/

function determineMediaScenario() {

    if (
        gameState.campaignCrisis ||
        gameState.trust < 48 ||
        gameState.integrity <= -5
    ) {

        return mediaCrisisScenario;

    }


    return mediaStableScenario;

}


/*
==================================================
SELECT COALITION PATH
==================================================
*/

function determineCoalitionScenario() {

    const coalitionStrength =
        gameState.coalition +
        (
            gameState.voterOutreach *
            4
        );


    if (
        coalitionStrength >=
        66
    ) {

        return coalitionStrongScenario;

    }


    return coalitionWeakScenario;

}


/*
==================================================
SELECT CLOSING PATH
==================================================
*/

function determineClosingScenario() {

    const campaignStrength =
        gameState.polling +
        gameState.momentum +
        (
            gameState.messageDiscipline *
            3
        ) +
        (
            gameState.resourceManagement *
            2
        );


    if (
        campaignStrength >=
        115 &&
        !gameState.campaignCrisis
    ) {

        return closingStrongScenario;

    }


    return closingWeakScenario;

}


/*
==================================================
SELECT ELECTION DAY PATH
==================================================
*/

function determineElectionDayScenario() {

    if (
        gameState.campaignCrisis ||
        gameState.trust < 45 ||
        gameState.integrity <= -6
    ) {

        return electionDayCrisisScenario;

    }


    return electionDayStableScenario;

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
        "campaignTurnLabel",
        `Week ${1 + currentScenarioIndex * 2}`
    );


    setText(
        "campaignCurrentStage",
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
                            class="campaign-choice-button"
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
            ".campaign-choice-button"
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
            ".campaign-choice-button"
        )
        .forEach(
            button => {

                button.disabled =
                    true;

            }
        );


    selectedButton.classList.add(
        "campaign-choice-selected"
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
                ? "View Election Results"
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

    gameState.polling +=
        Number(
            choice.polling ||
            0
        );


    gameState.trust +=
        Number(
            choice.trust ||
            0
        );


    gameState.coalition +=
        Number(
            choice.coalition ||
            0
        );


    gameState.momentum +=
        Number(
            choice.momentum ||
            0
        );


    gameState.majorEvents +=
        Number(
            choice.majorEvents ||
            0
        );


    gameState.endorsements +=
        Number(
            choice.endorsements ||
            0
        );


    gameState.messageDiscipline +=
        Number(
            choice.messageDiscipline ||
            0
        );


    gameState.resourceManagement +=
        Number(
            choice.resourceManagement ||
            0
        );


    gameState.voterOutreach +=
        Number(
            choice.voterOutreach ||
            0
        );


    gameState.debateSkill +=
        Number(
            choice.debateSkill ||
            0
        );


    gameState.integrity +=
        Number(
            choice.integrity ||
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

        "messageResult",

        "outreachResult",

        "resourceResult",

        "debateResult",

        "mediaResult",

        "coalitionResult",

        "closingResult",

        "electionDayResult"

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
        typeof choice.campaignCrisis ===
        "boolean"
    ) {

        gameState.campaignCrisis =
            choice.campaignCrisis;

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
            choice.polling ||
            0
        ) +
        Number(
            choice.trust ||
            0
        ) +
        Number(
            choice.coalition ||
            0
        ) +
        Number(
            choice.momentum ||
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
        "firstDebate"
    ) {

        appendScenarioIfMissing(
            determineMediaScenario()
        );


        return;

    }


    if (
        scenario.id ===
            "mediaStable" ||
        scenario.id ===
            "mediaCrisis"
    ) {

        appendScenarioIfMissing(
            determineCoalitionScenario()
        );


        return;

    }


    if (
        scenario.id ===
            "coalitionStrong" ||
        scenario.id ===
            "coalitionWeak"
    ) {

        appendScenarioIfMissing(
            determineClosingScenario()
        );


        return;

    }


    if (
        scenario.id ===
            "closingStrong" ||
        scenario.id ===
            "closingWeak"
    ) {

        appendScenarioIfMissing(
            determineElectionDayScenario()
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
            "electionDayStable" ||
        scenario.id ===
            "electionDayCrisis"
    );

}


/*
==================================================
CAMPAIGN NEWS
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
        "campaign-news-item";


    const categoryElement =
        document.createElement(
            "span"
        );


    categoryElement.textContent =
        String(
            category ||
            "Campaign Trail"
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
            ".campaign-news-item"
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
            "campaignScenarioCard"
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
FINAL CAMPAIGN OUTCOME
==================================================
*/

function finalizeCampaignOutcome() {

    const electionScore =
        gameState.polling +
        (
            gameState.trust *
            0.08
        ) +
        (
            gameState.coalition *
            0.08
        ) +
        (
            gameState.momentum *
            0.08
        ) +
        (
            gameState.integrity *
            0.4
        );


    if (
        electionScore >= 56
    ) {

        gameState.electionResult =
            "Victory";

        gameState.campaignOutcome =
            "Your campaign built enough support, trust, and momentum to win the election.";

        return;

    }


    if (
        electionScore >= 52
    ) {

        gameState.electionResult =
            "Narrow Victory";

        gameState.campaignOutcome =
            "Your campaign survived a close race and built just enough support to win.";

        return;

    }


    if (
        electionScore >= 48
    ) {

        gameState.electionResult =
            "Narrow Defeat";

        gameState.campaignOutcome =
            "Your campaign remained competitive through Election Day but fell just short.";

        return;

    }


    gameState.electionResult =
        "Defeat";


    if (
        gameState.campaignCrisis
    ) {

        gameState.campaignOutcome =
            "The campaign ended in defeat after credibility, coalition, or strategic problems weakened the final stretch.";

        return;

    }


    gameState.campaignOutcome =
        "The campaign ended in defeat after failing to build enough support and momentum before Election Day.";

}


/*
==================================================
CALCULATE CAMPAIGN GRADE
==================================================
*/

function calculateGrade() {

    const performanceAverage =
        (
            gameState.polling +
            gameState.trust +
            gameState.coalition +
            gameState.momentum
        ) / 4;


    const campaignQuality =
        gameState.messageDiscipline +
        gameState.resourceManagement +
        gameState.voterOutreach +
        gameState.debateSkill +
        gameState.integrity;


    const qualityBonus =
        Math.max(
            -10,
            Math.min(
                10,
                campaignQuality
            )
        );


    const eventBonus =
        Math.min(
            6,
            (
                gameState.majorEvents *
                0.4
            ) +
            (
                gameState.endorsements *
                0.8
            )
        );


    const crisisPenalty =
        gameState.campaignCrisis
            ? 10
            : 0;


    let electionBonus =
        0;


    if (
        gameState.electionResult ===
        "Victory"
    ) {

        electionBonus =
            8;

    } else if (
        gameState.electionResult ===
        "Narrow Victory"
    ) {

        electionBonus =
            5;

    } else if (
        gameState.electionResult ===
        "Narrow Defeat"
    ) {

        electionBonus =
            1;

    }


    const finalScore =
        performanceAverage +
        qualityBonus +
        eventBonus +
        electionBonus -
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
        gameState.campaignOutcome;


    if (
        grade === "A+" ||
        grade === "A"
    ) {

        return (
            `Outstanding campaign. You combined a clear message, strong voter outreach, disciplined resource use, credible public communication, and a broad coalition. ${outcome}`
        );

    }


    if (
        grade === "A−" ||
        grade === "B+"
    ) {

        return (
            `Strong campaign. You built meaningful support and generally managed the major strategic pressures of the race well. ${outcome}`
        );

    }


    if (
        grade === "B" ||
        grade === "B−"
    ) {

        return (
            `Solid campaign. You remained competitive, though some decisions weakened trust, coalition strength, resources, or momentum. ${outcome}`
        );

    }


    if (
        grade === "C+" ||
        grade === "C"
    ) {

        return (
            `Mixed campaign. Greater consistency in message, voter outreach, resource management, debate preparation, and credibility would strengthen a future race. ${outcome}`
        );

    }


    return (
        `A difficult campaign. Review how message discipline, voter outreach, resources, debates, credibility, coalition building, and Election Day conduct shaped the result. ${outcome}`
    );

}


/*
==================================================
SHOW FINAL RESULTS
==================================================
*/

function showFinalResults() {

    finalizeCampaignOutcome();


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
        "finalCampaignPolling",
        `${gameState.polling}%`
    );


    setText(
        "finalCampaignTrust",
        `${gameState.trust}%`
    );


    setText(
        "finalCampaignCoalition",
        `${gameState.coalition}%`
    );


    setText(
        "finalCampaignMomentum",
        `${gameState.momentum}%`
    );


    setText(
        "finalCampaignMajorEvents",
        gameState.majorEvents
    );


    setText(
        "finalCampaignEndorsements",
        gameState.endorsements
    );


    setText(
        "campaignElectionResult",
        gameState.electionResult
    );


    setText(
        "campaignFinalGrade",
        grade
    );


    const finalMessage =
        document.getElementById(
            "campaignFinalMessage"
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
        "campaignTermProgress",
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
            "civicCampaignSimulationCompleted",
            "true"
        );


        window.localStorage.setItem(
            "civicCampaignSimulationLastGrade",
            grade
        );


        const previousRuns =
            Number(
                window.localStorage.getItem(
                    "civicCampaignSimulationRuns"
                ) ||
                0
            );


        window.localStorage.setItem(
            "civicCampaignSimulationRuns",
            String(
                previousRuns +
                1
            )
        );


        window.localStorage.setItem(
            "civicCampaignSimulationLastOutcome",
            gameState.campaignOutcome
        );


        window.localStorage.setItem(
            "civicCampaignSimulationLastElectionResult",
            gameState.electionResult
        );


        window.localStorage.setItem(
            "civicCampaignSimulationLastPolling",
            String(
                gameState.polling
            )
        );


        window.localStorage.setItem(
            "civicCampaignSimulationLastTrust",
            String(
                gameState.trust
            )
        );


        window.localStorage.setItem(
            "civicCampaignSimulationLastCoalition",
            String(
                gameState.coalition
            )
        );


        window.localStorage.setItem(
            "civicCampaignSimulationLastMomentum",
            String(
                gameState.momentum
            )
        );


        window.localStorage.setItem(
            "civicCampaignSimulationLastCrisis",
            String(
                gameState.campaignCrisis
            )
        );

    } catch (error) {

        console.warn(
            "Campaign simulation record could not be saved:",
            error
        );

    }

}


/*
==================================================
RESET CAMPAIGN STATE
==================================================
*/

function resetGameState() {

    gameState.polling =
        47;


    gameState.trust =
        61;


    gameState.coalition =
        58;


    gameState.momentum =
        55;


    gameState.majorEvents =
        0;


    gameState.endorsements =
        0;


    gameState.messageDiscipline =
        0;


    gameState.resourceManagement =
        0;


    gameState.voterOutreach =
        0;


    gameState.debateSkill =
        0;


    gameState.integrity =
        0;


    gameState.messageResult =
        "pending";


    gameState.outreachResult =
        "pending";


    gameState.resourceResult =
        "pending";


    gameState.debateResult =
        "pending";


    gameState.mediaResult =
        "pending";


    gameState.coalitionResult =
        "pending";


    gameState.closingResult =
        "pending";


    gameState.electionDayResult =
        "pending";


    gameState.campaignCrisis =
        false;


    gameState.electionResult =
        "Pending";


    gameState.campaignOutcome =
        "The campaign is still unfolding.";

}


/*
==================================================
RESET CAMPAIGN NEWS
==================================================
*/

function resetNewsFeed(
    anotherCampaign =
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
        "campaign-news-item";


    const label =
        document.createElement(
            "span"
        );


    label.textContent =
        "Campaign Trail";


    const headline =
        document.createElement(
            "p"
        );


    headline.textContent =
        anotherCampaign
            ? "Candidate launches another campaign."
            : "Candidate officially launches campaign.";


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

async function initializeCampaignPage() {

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

initializeCampaignPage();