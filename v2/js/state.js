/*
==================================================
CIVIC HORIZON INDEX V2
STATE CIVIC PROFILE
==================================================
*/


/*
==================================================
CONGRESSIONAL DATA SERVICE
==================================================
*/

import {

    getStateCongressionalDelegation

} from "./services/congress-service.js";


/*
==================================================
CONGRESSIONAL APPROVAL SERVICE
==================================================
*/

import {

    getCongressionalApprovalStatus,

    getMyCongressionalApprovalVote,

    submitCongressionalApproval,

    subscribeToCongressionalApproval

} from "./services/congressional-approval-service.js";


/*
==================================================
FIREBASE AUTH
==================================================
*/

import {

    auth

} from "../../js/firebase.js";


import {

    onAuthStateChanged

} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/*
==================================================
STATE DATA
==================================================
*/

const states = {

    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming"

};


/*
==================================================
APPROVAL TEST STATE
==================================================
*/

let unsubscribeSenatorOneResults =
    null;


let unsubscribeSenatorOneAuth =
    null;


/*
==================================================
PAGE INITIALIZATION
==================================================
*/

async function initializeStatePage() {

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

    initializeStateProfile();

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
STATE PROFILE
==================================================
*/

function initializeStateProfile() {

    const url =
        new URL(
            window.location.href
        );


    const stateCode =
        normalizeStateCode(
            url.searchParams.get(
                "state"
            )
        );


    if (!stateCode) {

        showInvalidState();

        return;

    }


    const stateName =
        states[
            stateCode
        ];


    document.title =
        `${stateName} Civic Profile | Civic Horizon Index`;


    setText(
        "statePageName",
        stateName
    );


    setText(
        "statePageDescription",
        `Explore Civic Horizon Index participation, results, congressional representatives, approval ratings, public records, and future local civic information for ${stateName}.`
    );


    initializeStateOverview(
        stateCode,
        stateName
    );


    initializeCongressionalDelegation(
        stateCode,
        stateName
    );


    initializeCongressionalApproval(
        stateCode
    );

}


/*
==================================================
STATE OVERVIEW
==================================================
*/

function initializeStateOverview(
    stateCode,
    stateName
) {

    setText(
        "stateOverviewParticipants",
        "—"
    );


    setText(
        "stateOverviewPriority",
        "Coming soon"
    );


    setText(
        "stateOverviewScore",
        "—"
    );


    setText(
        "stateOverviewCommunityActivity",
        "Coming soon"
    );


    window.CivicHorizonStateProfile = {

        stateCode,

        stateName

    };

}


/*
==================================================
CONGRESSIONAL DELEGATION
==================================================
*/

function initializeCongressionalDelegation(
    stateCode,
    stateName
) {

    const container =
        document.getElementById(
            "stateRepresentatives"
        );


    if (!container) {

        return;

    }


    const delegation =
        getStateCongressionalDelegation(
            stateCode
        );


    const senators =
        Array.isArray(
            delegation.senators
        )
            ? delegation.senators
            : [];


    const representatives =
        Array.isArray(
            delegation.representatives
        )
            ? delegation.representatives
            : [];


    /*
    ----------------------------------------------
    NO CONGRESSIONAL DATA
    ----------------------------------------------
    */

    if (
        senators.length === 0 &&
        representatives.length === 0
    ) {

        container.innerHTML = `

            <div class="state-placeholder-card">

                <strong>
                    ${escapeHtml(
                        stateName
                    )} congressional
                    data is being prepared
                </strong>

                <p>
                    Current congressional information has not yet
                    been added for this state.
                </p>

            </div>

        `;


        return;

    }


    /*
    ----------------------------------------------
    SENATE
    ----------------------------------------------
    */

    const senateMarkup =
        senators.length > 0
            ? `

                <section class="state-delegation-group">

                    <header class="state-delegation-group__heading">

                        <span>
                            U.S. Senate
                        </span>

                        <h3>
                            ${escapeHtml(
                                stateName
                            )} Senators
                        </h3>

                    </header>


                    <div class="state-delegation-grid">

                        ${
                            senators
                                .map(
                                    member =>
                                        createCongressionalMemberCard(
                                            member
                                        )
                                )
                                .join("")
                        }

                    </div>

                </section>

            `
            : "";


    /*
    ----------------------------------------------
    HOUSE
    ----------------------------------------------
    */

    const houseMarkup =
        representatives.length > 0
            ? createHouseExplorer(
                representatives,
                stateName
            )
            : "";


    container.innerHTML =
        senateMarkup +
        houseMarkup;


    /*
    ----------------------------------------------
    START HOUSE SELECTOR
    ----------------------------------------------
    */

    if (
        representatives.length >
        0
    ) {

        initializeHouseDistrictSelector(
            representatives
        );

    }

}


/*
==================================================
HOUSE EXPLORER
==================================================
*/

function createHouseExplorer(
    representatives,
    stateName
) {

    const sortedRepresentatives =
        [...representatives]
            .sort(
                compareDistricts
            );


    const options =
        sortedRepresentatives
            .map(
                member => {

                    const district =
                        member.district;


                    const label =
                        district ===
                        "At-Large"
                            ? "At-Large District"
                            : `District ${district}`;


                    return `

                        <option
                            value="${escapeHtml(
                                district
                            )}"
                        >
                            ${escapeHtml(
                                label
                            )}
                        </option>

                    `;

                }
            )
            .join("");


    return `

        <section class="state-delegation-group">

            <header class="state-delegation-group__heading">

                <span>
                    U.S. House
                </span>

                <h3>
                    Find a ${escapeHtml(
                        stateName
                    )} Representative
                </h3>

                <p>
                    Choose a congressional district to view
                    the representative serving that district.
                </p>

            </header>


            <div class="state-house-explorer">

                <div class="state-house-explorer__selector">

                    <label
                        for="stateHouseDistrictSelect"
                    >
                        Congressional District
                    </label>

                    <select
                        id="stateHouseDistrictSelect"
                    >
                        ${options}
                    </select>

                </div>


                <div
                    id="stateHouseRepresentativeCard"
                    class="state-house-explorer__card"
                >
                </div>

            </div>

        </section>

    `;

}


/*
==================================================
HOUSE DISTRICT SELECTOR
==================================================
*/

function initializeHouseDistrictSelector(
    representatives
) {

    const select =
        document.getElementById(
            "stateHouseDistrictSelect"
        );


    const cardContainer =
        document.getElementById(
            "stateHouseRepresentativeCard"
        );


    if (
        !select ||
        !cardContainer
    ) {

        return;

    }


    const sortedRepresentatives =
        [...representatives]
            .sort(
                compareDistricts
            );


    function renderSelectedRepresentative() {

        const selectedDistrict =
            select.value;


        const representative =
            sortedRepresentatives.find(
                member =>
                    String(
                        member.district
                    ) ===
                    String(
                        selectedDistrict
                    )
            );


        if (!representative) {

            cardContainer.innerHTML = `

                <div class="state-placeholder-card">

                    <strong>
                        Representative unavailable
                    </strong>

                    <p>
                        Representative information for this
                        district could not be found.
                    </p>

                </div>

            `;


            return;

        }


        cardContainer.innerHTML =
            createCongressionalMemberCard(
                representative
            );

    }


    select.addEventListener(
        "change",
        renderSelectedRepresentative
    );


    renderSelectedRepresentative();

}


/*
==================================================
DISTRICT SORTING
==================================================
*/

function compareDistricts(
    firstMember,
    secondMember
) {

    const firstDistrict =
        firstMember.district;


    const secondDistrict =
        secondMember.district;


    if (
        firstDistrict ===
        "At-Large"
    ) {

        return -1;

    }


    if (
        secondDistrict ===
        "At-Large"
    ) {

        return 1;

    }


    return (
        Number(
            firstDistrict
        ) -
        Number(
            secondDistrict
        )
    );

}


/*
==================================================
CONGRESSIONAL MEMBER CARD
==================================================
*/

function createCongressionalMemberCard(
    member
) {

    const timeInOffice =
        member?.timeInOffice?.label ||
        "Unavailable";


    const districtLabel =
        member.chamber ===
            "house"
            ? member.district ===
                "At-Large"
                ? "At-Large District"
                : `District ${escapeHtml(
                    member.district
                )}`
            : "U.S. Senate";


    return `

        <article class="state-member-card">

            <div class="state-member-card__heading">

                <span class="state-member-card__office">
                    ${escapeHtml(
                        districtLabel
                    )}
                </span>

                <h4>
                    ${escapeHtml(
                        member.name
                    )}
                </h4>

            </div>


            <div class="state-member-card__details">

                <div>

                    <span>
                        Serving Since
                    </span>

                    <strong>
                        ${escapeHtml(
                            member.servingSinceLabel
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Time in Current Office
                    </span>

                    <strong>
                        ${escapeHtml(
                            timeInOffice
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Current Term Began
                    </span>

                    <strong>
                        ${escapeHtml(
                            member.currentTermBeganLabel
                        )}
                    </strong>

                </div>

            </div>

        </article>

    `;

}


/*
==================================================
CONGRESSIONAL APPROVAL
==================================================
*/

function initializeCongressionalApproval(
    stateCode
) {

    destroyCongressionalApprovalTest();


    const delegation =
        getStateCongressionalDelegation(
            stateCode
        );


    const senators =
        Array.isArray(
            delegation.senators
        )
            ? delegation.senators
            : [];


    /*
    ----------------------------------------------
    RESET ALL APPROVAL CONTROLS
    ----------------------------------------------
    */

    disableAllCongressionalApprovalButtons();


    clearCongressionalSelections();


    /*
    ----------------------------------------------
    SENATOR ONE
    ----------------------------------------------
    */

    if (
        senators[
            0
        ]
    ) {

        setText(
            "stateSenatorOneName",
            senators[
                0
            ].name
        );

    } else {

        setText(
            "stateSenatorOneName",
            "Senator information unavailable"
        );

    }


    /*
    ----------------------------------------------
    SENATOR TWO
    ----------------------------------------------
    */

    if (
        senators[
            1
        ]
    ) {

        setText(
            "stateSenatorTwoName",
            senators[
                1
            ].name
        );

    } else {

        setText(
            "stateSenatorTwoName",
            "Senator information unavailable"
        );

    }


    /*
    ----------------------------------------------
    INITIAL RESULT VALUES
    ----------------------------------------------
    */

    setText(
        "stateSenatorOneApproval",
        "0.0%"
    );


    setText(
        "stateSenatorOneResponses",
        "0"
    );


    setText(
        "stateSenatorTwoApproval",
        "—"
    );


    setText(
        "stateSenatorTwoResponses",
        "—"
    );


    /*
    ----------------------------------------------
    HOUSE APPROVAL

    House voting remains disabled until the
    participant's district is connected to profile
    data.
    ----------------------------------------------
    */

    setText(
        "stateHouseDistrict",
        "Your Congressional District"
    );


    setText(
        "stateHouseRepresentativeName",
        "District identification coming soon"
    );


    setText(
        "stateHouseApprovalPercent",
        "—"
    );


    setText(
        "stateHouseApprovalResponses",
        "—"
    );


    setText(
        "stateSenatorTwoMessage",
        "This approval tracker will open after the first senator test is confirmed."
    );


    setText(
        "stateHouseApprovalMessage",
        "Your congressional district must be identified before House approval voting is available."
    );


    /*
    ----------------------------------------------
    FIRST SENATOR LIVE TEST
    ----------------------------------------------
    */

    if (
        senators[
            0
        ]
    ) {

        initializeFirstSenatorApprovalTest(
            senators[
                0
            ]
        );

    } else {

        setText(
            "stateSenatorOneMessage",
            "Senator approval information is unavailable."
        );

    }

}


/*
==================================================
FIRST SENATOR LIVE TEST
==================================================
*/

function initializeFirstSenatorApprovalTest(
    member
) {

    const optionContainer =
        document.querySelector(
            '[data-member-slot="senator-one"]'
        );


    if (!optionContainer) {

        console.error(
            "Senator one approval controls were not found."
        );


        return;

    }


    const buttons =
        Array.from(
            optionContainer.querySelectorAll(
                "button[data-response]"
            )
        );


    if (
        buttons.length ===
        0
    ) {

        console.error(
            "Senator one approval buttons were not found."
        );


        return;

    }


    /*
    ----------------------------------------------
    CLICK HANDLERS
    ----------------------------------------------
    */

    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                async () => {

                    await submitFirstSenatorVote(
                        member,
                        button,
                        buttons
                    );

                }
            );

        }
    );


    /*
    ----------------------------------------------
    AUTH READY

    Waiting for Firebase Auth prevents the page
    from briefly treating a valid logged-in user
    as signed out while authentication restores.
    ----------------------------------------------
    */

    unsubscribeSenatorOneAuth =
        onAuthStateChanged(
            auth,
            async user => {

                stopSenatorOneResultsSubscription();


                disableButtons(
                    buttons
                );


                clearButtonSelections(
                    buttons
                );


                if (!user) {

                    setText(
                        "stateSenatorOneMessage",
                        "Sign in to participate in monthly Congressional Approval."
                    );


                    return;

                }


                if (
                    !user.emailVerified
                ) {

                    setText(
                        "stateSenatorOneMessage",
                        "Verify your email before participating in Congressional Approval."
                    );


                    return;

                }


                /*
                --------------------------------------
                LIVE CURRENT-MONTH RESULTS
                --------------------------------------
                */

                startSenatorOneResultsSubscription(
                    member
                );


                /*
                --------------------------------------
                MONTHLY ELIGIBILITY
                --------------------------------------
                */

                await refreshFirstSenatorVotingStatus(
                    member,
                    buttons
                );

            }
        );

}


/*
==================================================
START SENATOR ONE RESULT SUBSCRIPTION
==================================================
*/

function startSenatorOneResultsSubscription(
    member
) {

    stopSenatorOneResultsSubscription();


    unsubscribeSenatorOneResults =
        subscribeToCongressionalApproval(

            member.id,

            summary => {

                setText(
                    "stateSenatorOneApproval",
                    formatPercentage(
                        summary
                            ?.approvalPercentage
                    )
                );


                setText(
                    "stateSenatorOneResponses",
                    formatNumber(
                        summary
                            ?.totalResponses
                    )
                );

            },

            error => {

                console.error(
                    "Congressional approval result subscription failed:",
                    error
                );


                setText(
                    "stateSenatorOneApproval",
                    "—"
                );


                setText(
                    "stateSenatorOneResponses",
                    "—"
                );

            }

        );

}


/*
==================================================
REFRESH FIRST SENATOR STATUS
==================================================
*/

async function refreshFirstSenatorVotingStatus(
    member,
    buttons
) {

    try {

        const status =
            await getCongressionalApprovalStatus(
                member.id
            );


        clearButtonSelections(
            buttons
        );


        if (
            status.eligible
        ) {

            enableButtons(
                buttons
            );


            setText(
                "stateSenatorOneMessage",
                `Voting is open for ${status.votingPeriodLabel}. You may rate this senator once this month.`
            );


            return;

        }


        disableButtons(
            buttons
        );


        if (
            status.reason ===
            "alreadyParticipatedThisMonth"
        ) {

            const existingVote =
                await getMyCongressionalApprovalVote(
                    member.id
                );


            if (
                existingVote
                    ?.response
            ) {

                highlightResponse(
                    buttons,
                    existingVote.response
                );

            }


            setText(
                "stateSenatorOneMessage",
                `Your ${status.votingPeriodLabel} rating has already been recorded. Voting will reopen automatically next month.`
            );


            return;

        }


        if (
            status.reason ===
            "emailNotVerified"
        ) {

            setText(
                "stateSenatorOneMessage",
                "Verify your email before participating in Congressional Approval."
            );


            return;

        }


        setText(
            "stateSenatorOneMessage",
            "Sign in to participate in monthly Congressional Approval."
        );

    } catch (error) {

        console.error(
            "Congressional approval eligibility check failed:",
            error
        );


        disableButtons(
            buttons
        );


        setText(
            "stateSenatorOneMessage",
            "Congressional Approval voting is temporarily unavailable."
        );

    }

}


/*
==================================================
SUBMIT FIRST SENATOR VOTE
==================================================
*/

async function submitFirstSenatorVote(
    member,
    selectedButton,
    buttons
) {

    const response =
        selectedButton
            ?.dataset
            ?.response;


    if (!response) {

        return;

    }


    disableButtons(
        buttons
    );


    clearButtonSelections(
        buttons
    );


    setText(
        "stateSenatorOneMessage",
        "Saving your monthly rating..."
    );


    try {

        await submitCongressionalApproval(
            member,
            response
        );


        highlightResponse(
            buttons,
            response
        );


        setText(
            "stateSenatorOneMessage",
            "Your rating has been recorded. Voting will reopen automatically next month."
        );

    } catch (error) {

        console.error(
            "Congressional approval vote failed:",
            error
        );


        if (
            error?.code ===
            "already-participated-this-month"
        ) {

            await refreshFirstSenatorVotingStatus(
                member,
                buttons
            );


            return;

        }


        setText(
            "stateSenatorOneMessage",
            error?.message ||
            "Your rating could not be recorded."
        );


        await refreshFirstSenatorVotingStatus(
            member,
            buttons
        );

    }

}


/*
==================================================
DISABLE ALL APPROVAL BUTTONS
==================================================
*/

function disableAllCongressionalApprovalButtons() {

    document
        .querySelectorAll(
            "[data-congressional-approval-options] button"
        )
        .forEach(
            button => {

                button.disabled =
                    true;

            }
        );

}


/*
==================================================
BUTTON HELPERS
==================================================
*/

function enableButtons(
    buttons
) {

    buttons.forEach(
        button => {

            button.disabled =
                false;

        }
    );

}


function disableButtons(
    buttons
) {

    buttons.forEach(
        button => {

            button.disabled =
                true;

        }
    );

}


function clearButtonSelections(
    buttons
) {

    buttons.forEach(
        button => {

            button.classList.remove(
                "is-selected"
            );

        }
    );

}


function highlightResponse(
    buttons,
    response
) {

    buttons.forEach(
        button => {

            const isSelected =
                button.dataset.response ===
                response;


            button.classList.toggle(
                "is-selected",
                isSelected
            );

        }
    );

}


/*
==================================================
CLEAR ALL APPROVAL SELECTIONS
==================================================
*/

function clearCongressionalSelections() {

    document
        .querySelectorAll(
            "[data-congressional-approval-options] button"
        )
        .forEach(
            button => {

                button.classList.remove(
                    "is-selected"
                );

            }
        );

}


/*
==================================================
APPROVAL CLEANUP
==================================================
*/

function stopSenatorOneResultsSubscription() {

    if (
        typeof
        unsubscribeSenatorOneResults ===
        "function"
    ) {

        unsubscribeSenatorOneResults();

    }


    unsubscribeSenatorOneResults =
        null;

}


function destroyCongressionalApprovalTest() {

    stopSenatorOneResultsSubscription();


    if (
        typeof
        unsubscribeSenatorOneAuth ===
        "function"
    ) {

        unsubscribeSenatorOneAuth();

    }


    unsubscribeSenatorOneAuth =
        null;

}


/*
==================================================
INVALID STATE
==================================================
*/

function showInvalidState() {

    document.title =
        "State Not Found | Civic Horizon Index";


    setText(
        "statePageName",
        "State not found"
    );


    setText(
        "statePageDescription",
        "Please return to the State Explorer and choose a valid state."
    );


    const overviewElements = [

        "stateOverviewParticipants",

        "stateOverviewPriority",

        "stateOverviewScore",

        "stateOverviewCommunityActivity"

    ];


    overviewElements.forEach(
        elementId => {

            setText(
                elementId,
                "—"
            );

        }
    );


    const representatives =
        document.getElementById(
            "stateRepresentatives"
        );


    if (
        representatives
    ) {

        representatives.innerHTML = `

            <div class="state-placeholder-card">

                <strong>
                    State not found
                </strong>

                <p>
                    Please return to the State Explorer
                    and choose a valid state.
                </p>

            </div>

        `;

    }

}


/*
==================================================
STATE NORMALIZATION
==================================================
*/

function normalizeStateCode(
    value
) {

    const stateCode =
        String(
            value ||
            ""
        )
            .trim()
            .toUpperCase();


    if (
        !Object.prototype
            .hasOwnProperty
            .call(
                states,
                stateCode
            )
    ) {

        return "";

    }


    return stateCode;

}


/*
==================================================
TEXT HELPER
==================================================
*/

function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        return;

    }


    element.textContent =
        String(
            value
        );

}


/*
==================================================
FORMAT NUMBER
==================================================
*/

function formatNumber(
    value
) {

    const number =
        Number(
            value
        );


    if (
        !Number.isFinite(
            number
        )
    ) {

        return "0";

    }


    return number
        .toLocaleString();

}


/*
==================================================
FORMAT PERCENTAGE
==================================================
*/

function formatPercentage(
    value
) {

    const percentage =
        Number(
            value
        );


    if (
        !Number.isFinite(
            percentage
        )
    ) {

        return "0.0%";

    }


    return `${percentage.toFixed(
        1
    )}%`;

}


/*
==================================================
HTML ESCAPING
==================================================
*/

function escapeHtml(
    value
) {

    return String(
        value ??
        ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/*
==================================================
HEADER INTERACTIONS
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


    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth >
                    980 &&
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


                closeDropdowns();

            }

        }
    );

}


/*
==================================================
DROPDOWN HELPERS
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
PAGE CLEANUP
==================================================
*/

window.addEventListener(
    "beforeunload",
    () => {

        destroyCongressionalApprovalTest();

    }
);


/*
==================================================
START PAGE
==================================================
*/

initializeStatePage();