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

    getMyNationalPriorityHistory

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


let priorityTrendChart =
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


                /*
                ------------------------------------------
                VERIFIED EMAIL REQUIRED
                ------------------------------------------
                */

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


    /*
    ----------------------------------------------
    LOAD DASHBOARD DATA TOGETHER
    ----------------------------------------------
    */

    const results =
        await Promise.allSettled([

            getCurrentUserProfile(),

            getMyNationalPriorityHistory(),

            getCurrentUserVotingEligibility(),

            getPrioritySubmissions()

        ]);


    const profileResult =
        results[0];


    const historyResult =
        results[1];


    const eligibilityResult =
        results[2];


    const publicPriorityResult =
        results[3];


    /*
    ----------------------------------------------
    PRIVATE PARTICIPANT PROFILE
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
    PRIVATE NATIONAL PRIORITIES HISTORY
    ----------------------------------------------
    */

    if (
        historyResult.status ===
        "fulfilled"
    ) {

        priorityHistory =
            Array.isArray(
                historyResult.value
            )
                ? historyResult.value
                : [];

    } else {

        priorityHistory =
            [];


        console.error(
            "Priority history load failed:",
            historyResult.reason
        );

    }


    /*
    ----------------------------------------------
    PUBLIC NATIONAL PRIORITY DATA
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
            "Public National Priority results could not be loaded:",
            publicPriorityResult.reason
        );

    }


    /*
    ----------------------------------------------
    ACCOUNT SNAPSHOT
    ----------------------------------------------
    */

    renderAccountInformation();


    /*
    ----------------------------------------------
    PARTICIPATION STATUS
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
    DASHBOARD SECTIONS
    ----------------------------------------------
    */

    renderPrioritySubmissionCount();

    renderRecentActivityCount();

    renderPriorityTrendChart();

    renderPriorityComparison();

    renderRecentPriorityActivity();


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

    /*
    ----------------------------------------------
    NAME
    ----------------------------------------------
    */

    setText(
        "profileName",
        currentProfile?.displayName ||
        currentUser?.displayName ||
        "Civic Horizon Participant"
    );


    /*
    ----------------------------------------------
    EMAIL
    ----------------------------------------------
    */

    setText(
        "profileEmail",
        currentUser?.email ||
        ""
    );


    /*
    ----------------------------------------------
    EMAIL STATUS
    ----------------------------------------------
    */

    setText(
        "profileVerificationStatus",
        currentUser?.emailVerified
            ? "Verified"
            : "Not Verified"
    );


    /*
    ----------------------------------------------
    INCOMPLETE PROFILE
    ----------------------------------------------
    */

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


    /*
    ----------------------------------------------
    PARTICIPANT TYPE
    ----------------------------------------------
    */

    setText(
        "profileParticipantType",
        formatParticipantType(
            currentProfile.participantType
        )
    );


    /*
    ----------------------------------------------
    ZIP CODE
    ----------------------------------------------
    */

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


    /*
    ----------------------------------------------
    BIRTHDAY
    ----------------------------------------------
    */

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

    /*
    For now National Priorities is the first
    personal-history activity type.

    Civic Pulse and community poll history will
    be added to this count later.
    */

    setText(
        "profileRecentActivityCount",
        priorityHistory.length
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


    /*
    ----------------------------------------------
    NEED TWO RESPONSES FOR A TREND
    ----------------------------------------------
    */

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

                        },

                        x: {

                            title: {

                                display:
                                    true,

                                text:
                                    "Submission"

                            }

                        }

                    },

                    plugins: {

                        legend: {

                            position:
                                "bottom",

                            labels: {

                                usePointStyle:
                                    true,

                                boxWidth:
                                    8,

                                padding:
                                    14

                            }

                        },

                        tooltip: {

                            callbacks: {

                                label:
                                    context => {

                                        const label =
                                            context.dataset
                                                .label ||
                                            "Priority";


                                        const value =
                                            context.parsed.y;


                                        return (
                                            `${label}: ${value}/10`
                                        );

                                    }

                            }

                        }

                    }

                }

            }
        );

}


/*
==================================================
DESTROY PRIORITY TREND CHART
==================================================
*/

function destroyPriorityTrendChart() {

    if (
        !priorityTrendChart
    ) {

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


    /*
    ----------------------------------------------
    NEED PERSONAL HISTORY
    ----------------------------------------------
    */

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


    /*
    ----------------------------------------------
    LATEST PERSONAL RESPONSE
    ----------------------------------------------
    */

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


    /*
    ----------------------------------------------
    PARTICIPANT AGE GROUP
    ----------------------------------------------
    */

    const ageGroup =
        getProfileAgeGroup();


    /*
    ----------------------------------------------
    NATIONAL RESULTS
    ----------------------------------------------
    */

    const nationalRankings =
        calculatePriorityRankings(
            publicPrioritySubmissions
        );


    /*
    ----------------------------------------------
    AGE GROUP RESULTS
    ----------------------------------------------
    */

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


    const issues =
        getNationalIssues();


    /*
    ----------------------------------------------
    BUILD COMPARISON CARDS
    ----------------------------------------------
    */

    issues.forEach(
        issue => {

            const personalValue =
                Number(
                    personalRatings[
                        issue.id
                    ]
                );


            const ageGroupResult =
                ageGroupMap.get(
                    issue.id
                );


            const nationalResult =
                nationalMap.get(
                    issue.id
                );


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "profile-comparison-card";


            /*
            ISSUE NAME
            */

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


            /*
            YOU
            */

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


            /*
            AGE GROUP
            */

            card.appendChild(
                createComparisonValue(
                    getAgeGroupLabel(
                        ageGroup
                    ),
                    formatComparisonAverage(
                        ageGroupResult
                    )
                )
            );


            /*
            NATIONAL
            */

            card.appendChild(
                createComparisonValue(
                    "National",
                    formatComparisonAverage(
                        nationalResult
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


    /*
    Compatibility with profiles that only
    contain participantType.
    */

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


    return (
        `${ranking.average.toFixed(1)} / 10`
    );

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

    const emptyState =
        document.createElement(
            "div"
        );


    emptyState.className =
        "profile-empty-state";


    emptyState.textContent =
        message;


    container.appendChild(
        emptyState
    );

}


/*
==================================================
RECENT PRIORITY ACTIVITY
==================================================
*/

function renderRecentPriorityActivity() {

    const container =
        document.getElementById(
            "profileRecentActivity"
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

        container.innerHTML = `
            <div class="profile-empty-state">
                Your recent polls and surveys will appear here.
            </div>
        `;


        return;

    }


    const recentHistory =
        [...priorityHistory]
            .reverse()
            .slice(
                0,
                5
            );


    recentHistory.forEach(
        submission => {

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
                "National Priorities Survey";


            const description =
                document.createElement(
                    "span"
                );


            description.textContent =
                "Priority ratings submitted";


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
                    submission.submittedAt
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

        return (
            `Response ${index + 1}`
        );

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


    setText(
        "profileMessage",
        "Updating ZIP code..."
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


        setText(
            "profileMessage",
            "Sign out could not be completed."
        );

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