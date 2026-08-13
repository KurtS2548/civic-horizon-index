/*
==================================================
CIVIC HORIZON INDEX V2
MY CIVIC DASHBOARD CONTROLLER
==================================================
*/


import {

    subscribeToAuthState,

    refreshCurrentUser,

    getCurrentUserProfile,

    getCurrentUserVotingEligibility,

    updateCurrentUserZipCode

} from "./services/auth-service.js";


import {

    signOutAndExit

} from "./services/auth-guard.js";


import {

    getMyNationalPriorityHistory,

    getMyCivicPulseHistory

} from "./services/profile-service.js";


import {

    getNationalIssues,

    calculatePriorityRankings,

    calculatePriorityRankingsByAgeGroup

} from "./services/priority-service.js";


import {

    getPrioritySubmissions

} from "./services/firebase-service.js";


/*
==================================================
STATE
==================================================
*/

let currentUser =
    null;


let currentProfile =
    null;


let priorityHistory =
    [];


let publicPrioritySubmissions =
    [];


let presidentialApprovalHistory =
    [];


let countryDirectionHistory =
    [];


let nationalConfidenceHistory =
    [];


let priorityTrendChart =
    null;


let confidenceTrendChart =
    null;


let approvalTrendChart =
    null;


let directionTrendChart =
    null;


/*
==================================================
INITIALIZE
==================================================
*/

async function initializeProfilePage() {

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

    initializeProfileActions();

    initializeAuthState();

}


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
AUTH STATE
==================================================
*/

function initializeAuthState() {

    subscribeToAuthState(

        async user => {

            currentUser =
                user;


            if (!user) {

                window.location.replace(
                    "account.html"
                );

                return;

            }


            try {

                const refreshedUser =
                    await refreshCurrentUser();


                if (!refreshedUser) {

                    window.location.replace(
                        "account.html"
                    );

                    return;

                }


                currentUser =
                    refreshedUser;


                if (
                    !refreshedUser.emailVerified
                ) {

                    window.location.replace(
                        "account.html"
                    );

                    return;

                }


                await renderDashboard();

            } catch (error) {

                console.error(
                    "Profile initialization failed:",
                    error
                );


                renderProfileError();

            }

        },

        error => {

            console.error(
                "Profile auth state error:",
                error
            );


            window.location.replace(
                "account.html"
            );

        }

    );

}


/*
==================================================
RENDER DASHBOARD
==================================================
*/

async function renderDashboard() {

    if (!currentUser) {

        return;

    }


    const results =
        await Promise.allSettled([

            getCurrentUserProfile(),

            getMyNationalPriorityHistory(),

            getCurrentUserVotingEligibility(),

            getPrioritySubmissions(),

            getMyCivicPulseHistory()

        ]);


    const profileResult =
        results[0];


    const priorityHistoryResult =
        results[1];


    const eligibilityResult =
        results[2];


    const publicPriorityResult =
        results[3];


    const civicPulseResult =
        results[4];


    /*
    ----------------------------------------------
    PROFILE
    ----------------------------------------------
    */

    if (
        profileResult.status ===
        "fulfilled"
    ) {

        currentProfile =
            profileResult.value;

    } else {

        currentProfile =
            null;


        console.error(
            "Participant profile load failed:",
            profileResult.reason
        );

    }


    /*
    ----------------------------------------------
    PRIVATE PRIORITY HISTORY
    ----------------------------------------------
    */

    if (
        priorityHistoryResult.status ===
        "fulfilled"
    ) {

        priorityHistory =
            Array.isArray(
                priorityHistoryResult.value
            )
                ? priorityHistoryResult.value
                : [];

    } else {

        priorityHistory =
            [];


        console.error(
            "Priority history load failed:",
            priorityHistoryResult.reason
        );

    }


    /*
    ----------------------------------------------
    PUBLIC PRIORITY DATA
    ----------------------------------------------
    */

    if (
        publicPriorityResult.status ===
        "fulfilled"
    ) {

        publicPrioritySubmissions =
            Array.isArray(
                publicPriorityResult.value
            )
                ? publicPriorityResult.value
                : [];

    } else {

        publicPrioritySubmissions =
            [];


        console.error(
            "Public National Priority data could not be loaded:",
            publicPriorityResult.reason
        );

    }


    /*
    ----------------------------------------------
    PRIVATE CIVIC PULSE HISTORY
    ----------------------------------------------
    */

    if (
        civicPulseResult.status ===
        "fulfilled"
    ) {

        const history =
            civicPulseResult.value ||
            {};


        presidentialApprovalHistory =
            Array.isArray(
                history.presidentialApproval
            )
                ? history.presidentialApproval
                : [];


        countryDirectionHistory =
            Array.isArray(
                history.countryDirection
            )
                ? history.countryDirection
                : [];


        nationalConfidenceHistory =
            Array.isArray(
                history.nationalConfidence
            )
                ? history.nationalConfidence
                : [];

    } else {

        presidentialApprovalHistory =
            [];


        countryDirectionHistory =
            [];


        nationalConfidenceHistory =
            [];


        console.error(
            "Civic Pulse history could not be loaded:",
            civicPulseResult.reason
        );

    }


    /*
    ----------------------------------------------
    ACCOUNT
    ----------------------------------------------
    */

    renderAccountInformation();


    /*
    ----------------------------------------------
    VOTING STATUS
    ----------------------------------------------
    */

    if (
        eligibilityResult.status ===
        "fulfilled"
    ) {

        renderVotingStatus(
            eligibilityResult.value
        );

    } else {

        setText(
            "profileVotingStatus",
            "Unavailable"
        );

    }


    /*
    ----------------------------------------------
    DASHBOARD
    ----------------------------------------------
    */

    renderPrioritySubmissionCount();

    renderRecentActivityCount();

    renderPriorityTrendChart();

    renderPriorityComparison();

    renderCivicPulseHistory();

    renderCivicPulseTrendSection();

    renderApprovalTrendChart();

    renderDirectionTrendChart();

    renderConfidenceTrendChart();

    renderRecentActivity();


    setText(
        "profileMessage",
        ""
    );

}


/*
==================================================
ACCOUNT INFORMATION
==================================================
*/

function renderAccountInformation() {

    setText(
        "profileName",
        currentProfile?.displayName ||
        currentUser?.displayName ||
        "Civic Horizon Participant"
    );


    setText(
        "profileEmail",
        currentUser?.email ||
        ""
    );


    setText(
        "profileVerificationStatus",
        currentUser?.emailVerified
            ? "Verified"
            : "Not Verified"
    );


    if (!currentProfile) {

        setText(
            "profileParticipantType",
            "Profile Incomplete"
        );


        setText(
            "profileZipCode",
            "Not set"
        );


        setText(
            "profileBirthday",
            "Not available"
        );


        return;

    }


    setText(
        "profileParticipantType",
        formatParticipantType(
            currentProfile.participantType
        )
    );


    const zipCode =
        String(
            currentProfile.zipCode ||
            ""
        );


    setText(
        "profileZipCode",
        zipCode ||
        "Not set"
    );


    const zipInput =
        document.getElementById(
            "profileZipInput"
        );


    if (
        zipInput &&
        zipCode
    ) {

        zipInput.value =
            zipCode;

    }


    setText(
        "profileBirthday",
        formatBirthday(
            currentProfile.birthday
        )
    );

}


/*
==================================================
PRIORITY SUBMISSION COUNT
==================================================
*/

function renderPrioritySubmissionCount() {

    setText(
        "profilePrioritySubmissionCount",
        priorityHistory.length
    );

}


/*
==================================================
RECENT ACTIVITY COUNT
==================================================
*/

function renderRecentActivityCount() {

    const total =
        priorityHistory.length +
        presidentialApprovalHistory.length +
        countryDirectionHistory.length +
        nationalConfidenceHistory.length;


    setText(
        "profileRecentActivityCount",
        total
    );

}


/*
==================================================
PRIORITY TREND CHART
==================================================
*/

function renderPriorityTrendChart() {

    const emptyState =
        document.getElementById(
            "profilePriorityTrendEmpty"
        );


    const chartContainer =
        document.getElementById(
            "profilePriorityTrendContainer"
        );


    const canvas =
        document.getElementById(
            "profilePriorityTrendChart"
        );


    if (
        !emptyState ||
        !chartContainer ||
        !canvas
    ) {

        return;

    }


    if (
        priorityHistory.length <
        2
    ) {

        emptyState.hidden =
            false;


        emptyState.textContent =
            "Complete the National Priorities Survey more than once to begin building your personal trend history.";


        chartContainer.hidden =
            true;


        destroyPriorityTrendChart();


        return;

    }


    emptyState.hidden =
        true;


    chartContainer.hidden =
        false;


    const issues =
        getNationalIssues();


    const labels =
        priorityHistory.map(
            (
                submission,
                index
            ) => {

                return formatSubmissionLabel(
                    submission.submittedAt,
                    index
                );

            }
        );


    const datasets =
        issues.map(
            issue => {

                return {

                    label:
                        issue.name,

                    data:
                        priorityHistory.map(
                            submission => {

                                const value =
                                    Number(
                                        submission
                                            ?.ratings
                                            ?.[issue.id]
                                    );


                                return Number.isFinite(
                                    value
                                )
                                    ? value
                                    : null;

                            }
                        ),

                    tension:
                        0.25,

                    spanGaps:
                        true

                };

            }
        );


    destroyPriorityTrendChart();


    if (
        typeof window.Chart !==
        "function"
    ) {

        emptyState.hidden =
            false;


        emptyState.textContent =
            "Your trend history is available, but the chart could not be displayed.";


        chartContainer.hidden =
            true;


        return;

    }


    priorityTrendChart =
        new window.Chart(
            canvas,
            {

                type:
                    "line",

                data: {

                    labels,

                    datasets

                },

                options: {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    interaction: {

                        mode:
                            "index",

                        intersect:
                            false

                    },

                    scales: {

                        y: {

                            min:
                                1,

                            max:
                                10,

                            ticks: {

                                stepSize:
                                    1

                            },

                            title: {

                                display:
                                    true,

                                text:
                                    "Priority Rating"

                            }

                        }

                    },

                    plugins: {

                        legend: {

                            position:
                                "bottom"

                        }

                    }

                }

            }
        );

}


/*
==================================================
DESTROY PRIORITY CHART
==================================================
*/

function destroyPriorityTrendChart() {

    if (!priorityTrendChart) {

        return;

    }


    priorityTrendChart.destroy();


    priorityTrendChart =
        null;

}


/*
==================================================
PRIORITY COMPARISON
==================================================
*/

function renderPriorityComparison() {

    const container =
        document.getElementById(
            "profileComparisonGrid"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    if (
        priorityHistory.length ===
        0
    ) {

        renderComparisonEmptyState(
            container,
            "Complete the National Priorities Survey to see your civic comparison."
        );


        return;

    }


    const latestSubmission =
        priorityHistory[
            priorityHistory.length - 1
        ];


    const personalRatings =
        latestSubmission?.ratings &&
        typeof latestSubmission.ratings ===
            "object"
            ? latestSubmission.ratings
            : {};


    const ageGroup =
        getProfileAgeGroup();


    const nationalRankings =
        calculatePriorityRankings(
            publicPrioritySubmissions
        );


    const ageGroupRankings =
        ageGroup
            ? calculatePriorityRankingsByAgeGroup(
                publicPrioritySubmissions,
                ageGroup
            )
            : [];


    const nationalMap =
        createRankingMap(
            nationalRankings
        );


    const ageGroupMap =
        createRankingMap(
            ageGroupRankings
        );


    getNationalIssues()
        .forEach(
            issue => {

                const personalValue =
                    Number(
                        personalRatings[
                            issue.id
                        ]
                    );


                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "profile-comparison-card";


                const issueName =
                    document.createElement(
                        "div"
                    );


                issueName.className =
                    "profile-comparison-card__issue";


                issueName.textContent =
                    issue.name;


                card.appendChild(
                    issueName
                );


                card.appendChild(
                    createComparisonValue(
                        "You",
                        Number.isFinite(
                            personalValue
                        )
                            ? `${personalValue.toFixed(1)} / 10`
                            : "—"
                    )
                );


                card.appendChild(
                    createComparisonValue(
                        getAgeGroupLabel(
                            ageGroup
                        ),
                        formatComparisonAverage(
                            ageGroupMap.get(
                                issue.id
                            )
                        )
                    )
                );


                card.appendChild(
                    createComparisonValue(
                        "National",
                        formatComparisonAverage(
                            nationalMap.get(
                                issue.id
                            )
                        )
                    )
                );


                container.appendChild(
                    card
                );

            }
        );

}


/*
==================================================
CIVIC PULSE HISTORY
==================================================
*/

function renderCivicPulseHistory() {

    const container =
        document.getElementById(
            "profileCivicPulseHistory"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    const totalResponses =
        presidentialApprovalHistory.length +
        countryDirectionHistory.length +
        nationalConfidenceHistory.length;


    if (
        totalResponses ===
        0
    ) {

        container.innerHTML = `
            <div class="profile-empty-state">
                Civic Pulse personal history will appear here after you participate in the trackers.
            </div>
        `;


        return;

    }


    const grid =
        document.createElement(
            "div"
        );


    grid.className =
        "profile-pulse-grid";


    grid.appendChild(
        createApprovalHistoryCard()
    );


    grid.appendChild(
        createDirectionHistoryCard()
    );


    grid.appendChild(
        createConfidenceHistoryCard()
    );


    container.appendChild(
        grid
    );

}


/*
==================================================
APPROVAL HISTORY
==================================================
*/

function createApprovalHistoryCard() {

    const latest =
        getLatestRecord(
            presidentialApprovalHistory
        );


    const card =
        createPulseCard(
            "Presidential Approval",
            latest?.response ||
            "No response yet",
            presidentialApprovalHistory.length
        );


    card.appendChild(
        createPulseHistoryList(
            presidentialApprovalHistory,
            record =>
                record.response
        )
    );


    return card;

}


/*
==================================================
COUNTRY DIRECTION HISTORY
==================================================
*/

function createDirectionHistoryCard() {

    const latest =
        getLatestRecord(
            countryDirectionHistory
        );


    const card =
        createPulseCard(
            "Country Direction",
            latest?.response ||
            "No response yet",
            countryDirectionHistory.length
        );


    card.appendChild(
        createPulseHistoryList(
            countryDirectionHistory,
            record =>
                record.response
        )
    );


    return card;

}


/*
==================================================
CONFIDENCE HISTORY
==================================================
*/

function createConfidenceHistoryCard() {

    const latest =
        getLatestRecord(
            nationalConfidenceHistory
        );


    const average =
        latest
            ? calculateConfidenceAverage(
                latest.ratings
            )
            : null;


    const card =
        createPulseCard(
            "National Confidence",
            Number.isFinite(
                average
            )
                ? `${average}% average`
                : "No response yet",
            nationalConfidenceHistory.length
        );


    card.appendChild(
        createPulseHistoryList(
            nationalConfidenceHistory,
            record => {

                const result =
                    calculateConfidenceAverage(
                        record.ratings
                    );


                return Number.isFinite(
                    result
                )
                    ? `${result}% average confidence`
                    : "Confidence submitted";

            }
        )
    );


    return card;

}


/*
==================================================
CREATE PULSE CARD
==================================================
*/

function createPulseCard(
    title,
    latestValue,
    count
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "profile-pulse-card";


    const heading =
        document.createElement(
            "div"
        );


    heading.className =
        "profile-pulse-card__heading";


    const titleElement =
        document.createElement(
            "h3"
        );


    titleElement.textContent =
        title;


    const countElement =
        document.createElement(
            "span"
        );


    countElement.textContent =
        `${count} ${count === 1 ? "response" : "responses"}`;


    heading.append(
        titleElement,
        countElement
    );


    const label =
        document.createElement(
            "span"
        );


    label.className =
        "profile-pulse-card__label";


    label.textContent =
        "Latest";


    const latest =
        document.createElement(
            "strong"
        );


    latest.className =
        "profile-pulse-card__latest";


    latest.textContent =
        latestValue;


    card.append(
        heading,
        label,
        latest
    );


    return card;

}


/*
==================================================
PULSE HISTORY LIST
==================================================
*/

function createPulseHistoryList(
    history,
    valueFormatter
) {

    const list =
        document.createElement(
            "div"
        );


    list.className =
        "profile-pulse-history-list";


    if (
        !Array.isArray(
            history
        ) ||
        history.length ===
            0
    ) {

        const empty =
            document.createElement(
                "p"
            );


        empty.className =
            "profile-pulse-history-empty";


        empty.textContent =
            "No history yet.";


        list.appendChild(
            empty
        );


        return list;

    }


    [...history]
        .reverse()
        .slice(
            0,
            5
        )
        .forEach(
            record => {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "profile-pulse-history-row";


                const value =
                    document.createElement(
                        "strong"
                    );


                value.textContent =
                    valueFormatter(
                        record
                    );


                const date =
                    document.createElement(
                        "span"
                    );


                date.textContent =
                    formatActivityDate(
                        record.submittedAt
                    );


                row.append(
                    value,
                    date
                );


                list.appendChild(
                    row
                );

            }
        );


    return list;

}


/*
==================================================
BUILD CIVIC PULSE TREND SECTION
==================================================
*/

function renderCivicPulseTrendSection() {

    const historyContainer =
        document.getElementById(
            "profileCivicPulseHistory"
        );


    if (!historyContainer) {

        return;

    }


    let trendSection =
        document.getElementById(
            "profileCivicPulseTrendSection"
        );


    if (!trendSection) {

        trendSection =
            document.createElement(
                "div"
            );


        trendSection.id =
            "profileCivicPulseTrendSection";


        trendSection.className =
            "profile-civic-pulse-trends";


        historyContainer.insertAdjacentElement(
            "afterend",
            trendSection
        );

    }


    trendSection.innerHTML =
        "";


    /*
    ----------------------------------------------
    PRESIDENTIAL APPROVAL TREND
    ----------------------------------------------
    */

    if (
        presidentialApprovalHistory.length >=
        2
    ) {

        trendSection.appendChild(
            createTrendCard(
                "profileApprovalTrendChart",
                "Presidential Approval Trend",
                "How your presidential approval view has changed over time."
            )
        );

    }


    /*
    ----------------------------------------------
    COUNTRY DIRECTION TREND
    ----------------------------------------------
    */

    if (
        countryDirectionHistory.length >=
        2
    ) {

        trendSection.appendChild(
            createTrendCard(
                "profileDirectionTrendChart",
                "Country Direction Trend",
                "How your view of the country's direction has changed over time."
            )
        );

    }

}


/*
==================================================
CREATE TREND CARD
==================================================
*/

function createTrendCard(
    canvasId,
    title,
    description
) {

    const card =
        document.createElement(
            "section"
        );


    card.className =
        "profile-chart-card profile-confidence-trend";


    const heading =
        document.createElement(
            "div"
        );


    heading.className =
        "profile-confidence-trend__heading";


    const eyebrow =
        document.createElement(
            "p"
        );


    eyebrow.className =
        "profile-dashboard__eyebrow";


    eyebrow.textContent =
        "Personal Civic Pulse Trend";


    const titleElement =
        document.createElement(
            "h3"
        );


    titleElement.textContent =
        title;


    const descriptionElement =
        document.createElement(
            "p"
        );


    descriptionElement.textContent =
        description;


    heading.append(
        eyebrow,
        titleElement,
        descriptionElement
    );


    const chartContainer =
        document.createElement(
            "div"
        );


    chartContainer.className =
        "profile-chart-container";


    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.id =
        canvasId;


    chartContainer.appendChild(
        canvas
    );


    card.append(
        heading,
        chartContainer
    );


    return card;

}


/*
==================================================
PRESIDENTIAL APPROVAL TREND
==================================================
*/

function renderApprovalTrendChart() {

    const canvas =
        document.getElementById(
            "profileApprovalTrendChart"
        );


    if (
        !canvas ||
        presidentialApprovalHistory.length <
            2
    ) {

        destroyApprovalTrendChart();


        return;

    }


    if (
        typeof window.Chart !==
        "function"
    ) {

        return;

    }


    const points =
        presidentialApprovalHistory
            .map(
                (
                    record,
                    index
                ) => {

                    const value =
                        mapApprovalResponseToScore(
                            record.response
                        );


                    if (
                        !Number.isFinite(
                            value
                        )
                    ) {

                        return null;

                    }


                    return {

                        label:
                            formatSubmissionLabel(
                                record.submittedAt,
                                index
                            ),

                        value

                    };

                }
            )
            .filter(
                Boolean
            );


    if (
        points.length <
        2
    ) {

        return;

    }


    destroyApprovalTrendChart();


    approvalTrendChart =
        new window.Chart(
            canvas,
            {

                type:
                    "line",

                data: {

                    labels:
                        points.map(
                            point =>
                                point.label
                        ),

                    datasets: [

                        {

                            label:
                                "Your Presidential Approval",

                            data:
                                points.map(
                                    point =>
                                        point.value
                                ),

                            tension:
                                0.25,

                            fill:
                                false

                        }

                    ]

                },

                options: {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    interaction: {

                        mode:
                            "index",

                        intersect:
                            false

                    },

                    scales: {

                        y: {

                            min:
                                1,

                            max:
                                5,

                            ticks: {

                                stepSize:
                                    1,

                                callback:
                                    value =>
                                        getApprovalScoreLabel(
                                            value
                                        )

                            }

                        }

                    },

                    plugins: {

                        legend: {

                            display:
                                false

                        },

                        tooltip: {

                            callbacks: {

                                label:
                                    context =>
                                        getApprovalScoreLabel(
                                            context.parsed.y
                                        )

                            }

                        }

                    }

                }

            }
        );

}


/*
==================================================
APPROVAL RESPONSE SCORE
==================================================
*/

function mapApprovalResponseToScore(
    response
) {

    const scores = {

        "Strongly Disapprove":
            1,

        "Disapprove":
            2,

        "Neutral":
            3,

        "Approve":
            4,

        "Strongly Approve":
            5

    };


    return scores[
        response
    ] ??
    null;

}


/*
==================================================
APPROVAL SCORE LABEL
==================================================
*/

function getApprovalScoreLabel(
    value
) {

    const labels = {

        1:
            "Strongly Disapprove",

        2:
            "Disapprove",

        3:
            "Neutral",

        4:
            "Approve",

        5:
            "Strongly Approve"

    };


    return labels[
        Math.round(
            value
        )
    ] ||
    "";

}


/*
==================================================
DESTROY APPROVAL TREND
==================================================
*/

function destroyApprovalTrendChart() {

    if (!approvalTrendChart) {

        return;

    }


    approvalTrendChart.destroy();


    approvalTrendChart =
        null;

}


/*
==================================================
COUNTRY DIRECTION TREND
==================================================
*/

function renderDirectionTrendChart() {

    const canvas =
        document.getElementById(
            "profileDirectionTrendChart"
        );


    if (
        !canvas ||
        countryDirectionHistory.length <
            2
    ) {

        destroyDirectionTrendChart();


        return;

    }


    if (
        typeof window.Chart !==
        "function"
    ) {

        return;

    }


    const points =
        countryDirectionHistory
            .map(
                (
                    record,
                    index
                ) => {

                    const value =
                        mapDirectionResponseToScore(
                            record.response
                        );


                    if (
                        !Number.isFinite(
                            value
                        )
                    ) {

                        return null;

                    }


                    return {

                        label:
                            formatSubmissionLabel(
                                record.submittedAt,
                                index
                            ),

                        value

                    };

                }
            )
            .filter(
                Boolean
            );


    if (
        points.length <
        2
    ) {

        return;

    }


    destroyDirectionTrendChart();


    directionTrendChart =
        new window.Chart(
            canvas,
            {

                type:
                    "line",

                data: {

                    labels:
                        points.map(
                            point =>
                                point.label
                        ),

                    datasets: [

                        {

                            label:
                                "Your Country Direction",

                            data:
                                points.map(
                                    point =>
                                        point.value
                                ),

                            tension:
                                0.2,

                            fill:
                                false

                        }

                    ]

                },

                options: {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    scales: {

                        y: {

                            min:
                                0,

                            max:
                                1,

                            ticks: {

                                stepSize:
                                    1,

                                callback:
                                    value =>
                                        value ===
                                            1
                                            ? "Right Direction"
                                            : "Wrong Track"

                            }

                        }

                    },

                    plugins: {

                        legend: {

                            display:
                                false

                        },

                        tooltip: {

                            callbacks: {

                                label:
                                    context =>
                                        context.parsed.y ===
                                            1
                                            ? "Right Direction"
                                            : "Wrong Track"

                            }

                        }

                    }

                }

            }
        );

}


/*
==================================================
DIRECTION RESPONSE SCORE
==================================================
*/

function mapDirectionResponseToScore(
    response
) {

    if (
        response ===
        "Right Direction"
    ) {

        return 1;

    }


    if (
        response ===
        "Wrong Track"
    ) {

        return 0;

    }


    return null;

}


/*
==================================================
DESTROY DIRECTION TREND
==================================================
*/

function destroyDirectionTrendChart() {

    if (!directionTrendChart) {

        return;

    }


    directionTrendChart.destroy();


    directionTrendChart =
        null;

}


/*
==================================================
CONFIDENCE AVERAGE
==================================================
*/

function calculateConfidenceAverage(
    ratings
) {

    if (
        !ratings ||
        typeof ratings !==
            "object"
    ) {

        return null;

    }


    const categories = [

        "government",

        "congress",

        "court",

        "economy",

        "media",

        "democracy"

    ];


    const values =
        categories
            .map(
                category =>
                    Number(
                        ratings[
                            category
                        ]
                    )
            )
            .filter(
                Number.isFinite
            );


    if (
        values.length ===
        0
    ) {

        return null;

    }


    const total =
        values.reduce(
            (
                sum,
                value
            ) =>
                sum +
                value,
            0
        );


    return Math.round(
        total /
        values.length
    );

}


/*
==================================================
NATIONAL CONFIDENCE TREND
==================================================
*/

function renderConfidenceTrendChart() {

    const card =
        document.getElementById(
            "profileConfidenceTrendCard"
        );


    const canvas =
        document.getElementById(
            "profileConfidenceTrendChart"
        );


    if (
        !card ||
        !canvas
    ) {

        return;

    }


    if (
        nationalConfidenceHistory.length <
        2
    ) {

        card.hidden =
            true;


        destroyConfidenceTrendChart();


        return;

    }


    const points =
        nationalConfidenceHistory
            .map(
                (
                    submission,
                    index
                ) => {

                    const average =
                        calculateConfidenceAverage(
                            submission.ratings
                        );


                    if (
                        !Number.isFinite(
                            average
                        )
                    ) {

                        return null;

                    }


                    return {

                        label:
                            formatSubmissionLabel(
                                submission.submittedAt,
                                index
                            ),

                        value:
                            average

                    };

                }
            )
            .filter(
                Boolean
            );


    if (
        points.length <
        2 ||
        typeof window.Chart !==
            "function"
    ) {

        card.hidden =
            true;


        return;

    }


    card.hidden =
        false;


    destroyConfidenceTrendChart();


    confidenceTrendChart =
        new window.Chart(
            canvas,
            {

                type:
                    "line",

                data: {

                    labels:
                        points.map(
                            point =>
                                point.label
                        ),

                    datasets: [

                        {

                            label:
                                "Your National Confidence",

                            data:
                                points.map(
                                    point =>
                                        point.value
                                ),

                            tension:
                                0.3,

                            fill:
                                false

                        }

                    ]

                },

                options: {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    scales: {

                        y: {

                            min:
                                0,

                            max:
                                100,

                            ticks: {

                                callback:
                                    value =>
                                        `${value}%`

                            }

                        }

                    },

                    plugins: {

                        legend: {

                            display:
                                false

                        }

                    }

                }

            }
        );

}


/*
==================================================
DESTROY CONFIDENCE TREND
==================================================
*/

function destroyConfidenceTrendChart() {

    if (!confidenceTrendChart) {

        return;

    }


    confidenceTrendChart.destroy();


    confidenceTrendChart =
        null;

}


/*
==================================================
RECENT ACTIVITY
==================================================
*/

function renderRecentActivity() {

    const container =
        document.getElementById(
            "profileRecentActivity"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    const activity =
        [];


    priorityHistory.forEach(
        submission => {

            activity.push({

                title:
                    "National Priorities Survey",

                description:
                    "Priority ratings submitted",

                submittedAt:
                    submission.submittedAt

            });

        }
    );


    presidentialApprovalHistory.forEach(
        submission => {

            activity.push({

                title:
                    "Presidential Approval",

                description:
                    submission.response,

                submittedAt:
                    submission.submittedAt

            });

        }
    );


    countryDirectionHistory.forEach(
        submission => {

            activity.push({

                title:
                    "Country Direction",

                description:
                    submission.response,

                submittedAt:
                    submission.submittedAt

            });

        }
    );


    nationalConfidenceHistory.forEach(
        submission => {

            const average =
                calculateConfidenceAverage(
                    submission.ratings
                );


            activity.push({

                title:
                    "National Confidence",

                description:
                    Number.isFinite(
                        average
                    )
                        ? `${average}% average confidence`
                        : "Confidence ratings submitted",

                submittedAt:
                    submission.submittedAt

            });

        }
    );


    activity.sort(
        (
            a,
            b
        ) =>
            getTimestamp(
                b.submittedAt
            ) -
            getTimestamp(
                a.submittedAt
            )
    );


    const recent =
        activity.slice(
            0,
            8
        );


    if (
        recent.length ===
        0
    ) {

        container.innerHTML = `
            <div class="profile-empty-state">
                Your recent polls and surveys will appear here.
            </div>
        `;


        return;

    }


    recent.forEach(
        record => {

            const item =
                document.createElement(
                    "article"
                );


            item.className =
                "profile-activity-item";


            const main =
                document.createElement(
                    "div"
                );


            main.className =
                "profile-activity-item__main";


            const title =
                document.createElement(
                    "strong"
                );


            title.textContent =
                record.title;


            const description =
                document.createElement(
                    "span"
                );


            description.textContent =
                record.description;


            main.append(
                title,
                description
            );


            const date =
                document.createElement(
                    "span"
                );


            date.className =
                "profile-activity-item__date";


            date.textContent =
                formatActivityDate(
                    record.submittedAt
                );


            item.append(
                main,
                date
            );


            container.appendChild(
                item
            );

        }
    );

}


/*
==================================================
PROFILE AGE GROUP
==================================================
*/

function getProfileAgeGroup() {

    if (
        currentProfile?.ageGroup ===
        "youth"
    ) {

        return "youth";

    }


    if (
        currentProfile?.ageGroup ===
        "adult"
    ) {

        return "adult";

    }


    if (
        currentProfile?.participantType ===
        "youthParticipant"
    ) {

        return "youth";

    }


    if (
        currentProfile?.participantType ===
        "verifiedParticipant"
    ) {

        return "adult";

    }


    return null;

}


/*
==================================================
AGE GROUP LABEL
==================================================
*/

function getAgeGroupLabel(
    ageGroup
) {

    if (
        ageGroup ===
        "youth"
    ) {

        return "Age 13–17";

    }


    if (
        ageGroup ===
        "adult"
    ) {

        return "Age 18+";

    }


    return "Your Age Group";

}


/*
==================================================
RANKING MAP
==================================================
*/

function createRankingMap(
    rankings
) {

    const map =
        new Map();


    if (
        !Array.isArray(
            rankings
        )
    ) {

        return map;

    }


    rankings.forEach(
        ranking => {

            if (
                ranking?.id
            ) {

                map.set(
                    ranking.id,
                    ranking
                );

            }

        }
    );


    return map;

}


/*
==================================================
COMPARISON VALUE
==================================================
*/

function createComparisonValue(
    label,
    value
) {

    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.className =
        "profile-comparison-card__value";


    const labelElement =
        document.createElement(
            "span"
        );


    labelElement.textContent =
        label;


    const valueElement =
        document.createElement(
            "strong"
        );


    valueElement.textContent =
        value;


    wrapper.append(
        labelElement,
        valueElement
    );


    return wrapper;

}


/*
==================================================
COMPARISON AVERAGE
==================================================
*/

function formatComparisonAverage(
    ranking
) {

    if (
        !ranking ||
        !Number.isFinite(
            ranking.average
        ) ||
        ranking.responseCount <=
            0
    ) {

        return "—";

    }


    return `${ranking.average.toFixed(1)} / 10`;

}


/*
==================================================
COMPARISON EMPTY STATE
==================================================
*/

function renderComparisonEmptyState(
    container,
    message
) {

    const empty =
        document.createElement(
            "div"
        );


    empty.className =
        "profile-empty-state";


    empty.textContent =
        message;


    container.appendChild(
        empty
    );

}


/*
==================================================
LATEST RECORD
==================================================
*/

function getLatestRecord(
    history
) {

    if (
        !Array.isArray(
            history
        ) ||
        history.length ===
            0
    ) {

        return null;

    }


    return history[
        history.length - 1
    ];

}


/*
==================================================
VOTING STATUS
==================================================
*/

function renderVotingStatus(
    eligibility
) {

    if (
        eligibility?.eligible
    ) {

        setText(
            "profileVotingStatus",
            "Ready to Participate"
        );


        return;

    }


    switch (
        eligibility?.reason
    ) {

        case "emailNotVerified":

            setText(
                "profileVotingStatus",
                "Email Verification Required"
            );

            break;


        case "zipMissing":

            setText(
                "profileVotingStatus",
                "ZIP Code Required"
            );

            break;


        case "birthdayMissing":

            setText(
                "profileVotingStatus",
                "Birthday Required"
            );

            break;


        case "underMinimumAge":

            setText(
                "profileVotingStatus",
                "Not Eligible"
            );

            break;


        case "agreementMissing":

            setText(
                "profileVotingStatus",
                "Agreement Required"
            );

            break;


        case "verificationSyncPending":

            setText(
                "profileVotingStatus",
                "Finishing Verification"
            );

            break;


        case "profileMissing":

            setText(
                "profileVotingStatus",
                "Profile Incomplete"
            );

            break;


        default:

            setText(
                "profileVotingStatus",
                "Not Ready"
            );

    }

}


/*
==================================================
PARTICIPANT TYPE
==================================================
*/

function formatParticipantType(
    participantType
) {

    if (
        participantType ===
        "youthParticipant"
    ) {

        return "Youth Participant";

    }


    if (
        participantType ===
        "verifiedParticipant"
    ) {

        return "Verified Participant";

    }


    return "Participant";

}


/*
==================================================
BIRTHDAY FORMAT
==================================================
*/

function formatBirthday(
    birthday
) {

    const value =
        String(
            birthday ||
            ""
        );


    if (!value) {

        return "Not available";

    }


    const parts =
        value.split(
            "-"
        );


    if (
        parts.length !==
        3
    ) {

        return value;

    }


    const year =
        Number(
            parts[0]
        );


    const month =
        Number(
            parts[1]
        );


    const day =
        Number(
            parts[2]
        );


    if (
        !Number.isInteger(
            year
        ) ||
        !Number.isInteger(
            month
        ) ||
        !Number.isInteger(
            day
        )
    ) {

        return value;

    }


    const date =
        new Date(
            year,
            month - 1,
            day
        );


    return date.toLocaleDateString(
        undefined,
        {

            year:
                "numeric",

            month:
                "long",

            day:
                "numeric"

        }
    );

}


/*
==================================================
SUBMISSION LABEL
==================================================
*/

function formatSubmissionLabel(
    submittedAt,
    index
) {

    const date =
        new Date(
            submittedAt
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return `Response ${index + 1}`;

    }


    return date.toLocaleDateString(
        undefined,
        {

            month:
                "short",

            day:
                "numeric"

        }
    );

}


/*
==================================================
ACTIVITY DATE
==================================================
*/

function formatActivityDate(
    submittedAt
) {

    const date =
        new Date(
            submittedAt
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "Recent";

    }


    return date.toLocaleDateString(
        undefined,
        {

            month:
                "short",

            day:
                "numeric",

            year:
                "numeric"

        }
    );

}


/*
==================================================
TIMESTAMP
==================================================
*/

function getTimestamp(
    submittedAt
) {

    const time =
        new Date(
            submittedAt
        ).getTime();


    return Number.isFinite(
        time
    )
        ? time
        : 0;

}


/*
==================================================
PROFILE ERROR
==================================================
*/

function renderProfileError() {

    setText(
        "profileName",
        "Your Civic Profile"
    );


    setText(
        "profileEmail",
        currentUser?.email ||
        "Unavailable"
    );


    setText(
        "profileVerificationStatus",
        currentUser?.emailVerified
            ? "Verified"
            : "Unavailable"
    );


    setText(
        "profileParticipantType",
        "Unavailable"
    );


    setText(
        "profileZipCode",
        "—"
    );


    setText(
        "profileVotingStatus",
        "Unavailable"
    );


    setText(
        "profilePrioritySubmissionCount",
        "—"
    );


    setText(
        "profileRecentActivityCount",
        "—"
    );


    setText(
        "profileMessage",
        "Some dashboard information could not be loaded."
    );

}


/*
==================================================
PROFILE ACTIONS
==================================================
*/

function initializeProfileActions() {

    document
        .getElementById(
            "updateZipForm"
        )
        ?.addEventListener(
            "submit",
            handleZipUpdate
        );


    document
        .getElementById(
            "profileSignOutButton"
        )
        ?.addEventListener(
            "click",
            handleSignOut
        );

}


/*
==================================================
UPDATE ZIP
==================================================
*/

async function handleZipUpdate(
    event
) {

    event.preventDefault();


    const zipCode =
        getInputValue(
            "profileZipInput"
        );


    if (
        !/^\d{5}$/.test(
            zipCode
        )
    ) {

        setText(
            "profileMessage",
            "Enter a valid 5-digit ZIP code."
        );


        return;

    }


    const button =
        document.getElementById(
            "updateZipButton"
        );


    setButtonBusy(
        button,
        true,
        "Updating..."
    );


    try {

        await updateCurrentUserZipCode(
            zipCode
        );


        await renderDashboard();


        setText(
            "profileMessage",
            "ZIP code updated."
        );

    } catch (error) {

        console.error(
            "ZIP update failed:",
            error
        );


        setText(
            "profileMessage",
            "ZIP code could not be updated."
        );

    } finally {

        setButtonBusy(
            button,
            false,
            "Update"
        );

    }

}


/*
==================================================
SIGN OUT
==================================================
*/

async function handleSignOut() {

    const button =
        document.getElementById(
            "profileSignOutButton"
        );


    if (!button) {

        return;

    }


    button.disabled =
        true;


    button.textContent =
        "Signing Out...";


    try {

        await signOutAndExit();

    } catch (error) {

        console.error(
            "Profile sign out failed:",
            error
        );


        button.disabled =
            false;


        button.textContent =
            "Sign Out";

    }

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
DOM HELPERS
==================================================
*/

function getInputValue(
    elementId
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        return "";

    }


    return String(
        element.value ||
        ""
    ).trim();

}


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
            String(
                value
            );

    }

}


function setButtonBusy(
    button,
    busy,
    text
) {

    if (!button) {

        return;

    }


    button.disabled =
        busy;


    button.textContent =
        text;

}


/*
==================================================
START
==================================================
*/

initializeProfilePage();