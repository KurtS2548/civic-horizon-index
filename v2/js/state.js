/*
==================================================
CIVIC HORIZON INDEX V2
STATE CIVIC PROFILE
==================================================

Public officials are presented in individual cards.

APPROVAL CADENCE

Governor:
- Weekly

U.S. Senators:
- Monthly

U.S. Representatives:
- Monthly

Mayor:
- Monthly later

GEOGRAPHIC ELIGIBILITY

Governor / Senator:
- Participant ZIP must resolve to the state

U.S. Representative:
- Participant ZIP must uniquely resolve to the
  congressional district

Browsing public officials NEVER changes voting
eligibility.
==================================================
*/


/*
==================================================
PUBLIC OFFICIAL DATA
==================================================
*/

import {

    getStatePublicOfficials

} from "./services/public-official-data-service.js";


/*
==================================================
CONGRESSIONAL APPROVAL
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
GOVERNOR APPROVAL
==================================================
*/

import {

    getGovernorApprovalStatus,
    getMyGovernorApprovalVote,
    submitGovernorApproval,
    subscribeToGovernorApproval

} from "./services/governor-approval-service.js";


/*
==================================================
PARTICIPANT JURISDICTION
==================================================
*/

import {

    getCurrentParticipantJurisdiction

} from "./services/participant-jurisdiction-service.js";


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
STATE NAMES
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
PAGE STATE
==================================================
*/

let participantJurisdiction =
    null;


const activeSubscriptions =
    [];


const governorSubscriptions =
    [];


let houseCardSubscriptions =
    [];


/*
==================================================
INITIALIZE PAGE
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


    await initializeStateProfile();

}


/*
==================================================
LOAD COMPONENT
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
                `Could not load ${componentPath}`
            );

        }


        container.innerHTML =
            await response.text();


        return true;

    } catch (error) {

        console.error(
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

async function initializeStateProfile() {

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
        `Explore Civic Horizon Index participation, results, public officials, approval ratings, official records, and civic information for ${stateName}.`
    );


    initializeStateOverview();


    /*
    ----------------------------------------------
    PARTICIPANT GEOGRAPHY

    Public information stays readable regardless
    of voting eligibility.
    ----------------------------------------------
    */

    participantJurisdiction =
        await getCurrentParticipantJurisdiction();


    /*
    ----------------------------------------------
    OLD STANDALONE APPROVAL SECTION

    Approval voting now belongs inside the
    individual public-official cards.
    ----------------------------------------------
    */

    hideLegacyApprovalSection();


    initializePublicOfficials(
        stateCode,
        stateName
    );

}


/*
==================================================
STATE OVERVIEW
==================================================
*/

function initializeStateOverview() {

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

}


/*
==================================================
PUBLIC OFFICIALS
==================================================
*/

function initializePublicOfficials(
    stateCode,
    stateName
) {

    clearSubscriptions(
        activeSubscriptions
    );


    clearSubscriptions(
        governorSubscriptions
    );


    clearSubscriptions(
        houseCardSubscriptions
    );


    const container =
        document.getElementById(
            "stateRepresentatives"
        );


    if (!container) {

        return;

    }


    const officials =
        getStatePublicOfficials(
            stateCode
        );


    const governor =
        officials?.governor ||
        null;


    const senators =
        Array.isArray(
            officials?.senators
        )
            ? officials.senators
            : [];


    const representatives =
        Array.isArray(
            officials?.representatives
        )
            ? officials.representatives
            : [];


    if (
        !governor &&
        senators.length ===
            0 &&
        representatives.length ===
            0
    ) {

        container.innerHTML = `

            <div class="state-placeholder-card">

                <strong>
                    Public official information is being prepared
                </strong>

                <p>
                    Verified public-official information has not
                    yet been added for this state.
                </p>

            </div>

        `;


        return;

    }


    container.innerHTML = `

        ${
            createGovernorSection(
                governor,
                stateName
            )
        }

        ${
            createSenateSection(
                senators,
                stateName
            )
        }

        ${
            createHouseSection(
                representatives,
                stateName
            )
        }

    `;


    /*
    ----------------------------------------------
    GOVERNOR
    ----------------------------------------------
    */

    if (
        governor
    ) {

        initializeGovernorCard(
            governor
        );

    }


    /*
    ----------------------------------------------
    SENATORS
    ----------------------------------------------
    */

    senators.forEach(
        senator => {

            initializeCongressionalCard(
                senator,
                {
                    votingEligible:
                        canVoteForStateOfficial(
                            senator
                        ),

                    subscriptionBucket:
                        activeSubscriptions
                }
            );

        }
    );


    /*
    ----------------------------------------------
    HOUSE
    ----------------------------------------------
    */

    if (
        representatives.length >
        0
    ) {

        initializeHouseExplorer(
            representatives
        );

    }

}


/*
==================================================
GOVERNOR SECTION
==================================================
*/

function createGovernorSection(
    governor,
    stateName
) {

    if (!governor) {

        return "";

    }


    return `

        <section class="state-delegation-group state-delegation-group--governor">

            <header class="state-delegation-group__heading">

                <span>
                    State Executive
                </span>

                <h3>
                    Governor of ${escapeHtml(
                        stateName
                    )}
                </h3>

            </header>


            <div class="state-delegation-grid">

                ${
                    createOfficialCard(
                        governor,
                        {
                            showVoting:
                                true,

                            cadenceLabel:
                                "Weekly approval"
                        }
                    )
                }

            </div>

        </section>

    `;

}


/*
==================================================
SENATE SECTION
==================================================
*/

function createSenateSection(
    senators,
    stateName
) {

    if (
        senators.length ===
        0
    ) {

        return "";

    }


    return `

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
                            official =>
                                createOfficialCard(
                                    official,
                                    {
                                        showVoting:
                                            true,

                                        cadenceLabel:
                                            "Monthly approval"
                                    }
                                )
                        )
                        .join("")
                }

            </div>

        </section>

    `;

}


/*
==================================================
HOUSE SECTION
==================================================
*/

function createHouseSection(
    representatives,
    stateName
) {

    if (
        representatives.length ===
        0
    ) {

        return "";

    }


    const sorted =
        [...representatives]
            .sort(
                compareDistricts
            );


    const options =
        sorted
            .map(
                official => {

                    const districtLabel =
                        official.district ===
                        "At-Large"
                            ? "At-Large District"
                            : `District ${official.district}`;


                    return `

                        <option
                            value="${escapeHtml(
                                official.district
                            )}"
                        >
                            ${escapeHtml(
                                districtLabel
                            )}
                        </option>

                    `;

                }
            )
            .join("");


    return `

        <section class="state-delegation-group state-delegation-group--house">

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
                    Choose a district to view its representative.
                    Voting is available only for your ZIP-matched district.
                </p>

            </header>


            <div class="state-house-explorer">

                <div class="state-house-explorer__selector">

                    <label for="stateHouseDistrictSelect">
                        Congressional District
                    </label>


                    <div class="state-select-wrap">

                        <select
                            id="stateHouseDistrictSelect"
                            class="state-house-explorer__select"
                        >
                            ${options}
                        </select>

                    </div>

                </div>


                <div
                    id="stateHouseRepresentativeCard"
                    class="state-house-explorer__card"
                ></div>

            </div>

        </section>

    `;

}


/*
==================================================
CREATE OFFICIAL CARD
==================================================
*/

function createOfficialCard(
    official,
    options = {}
) {

    const showVoting =
        options.showVoting ===
        true;


    const cadenceLabel =
        String(
            options.cadenceLabel ||
            ""
        );


    const party =
        normalizeParty(
            official.party
        );


    const partyLabel =
        official.partyLabel ||
        createPartyLabel(
            party
        );


    const officeLabel =
        createCompactOfficeLabel(
            official
        );


    return `

        <article
            class="state-official-card"
            data-official-card="${escapeHtml(
                official.id
            )}"
        >

            <header class="state-official-card__header">

                <div class="state-official-card__identity">

                    <span class="state-official-card__office">
                        ${escapeHtml(
                            officeLabel
                        )}
                    </span>


                    <div class="state-official-card__name-row">

                        <h4>
                            ${escapeHtml(
                                official.name
                            )}
                        </h4>


                        ${
                            party
                                ? `

                                    <span
                                        class="state-party-badge state-party-badge--${escapeHtml(
                                            party.toLowerCase()
                                        )}"
                                        title="${escapeHtml(
                                            partyLabel
                                        )}"
                                        aria-label="${escapeHtml(
                                            partyLabel
                                        )}"
                                    >
                                        ${escapeHtml(
                                            party
                                        )}
                                    </span>

                                `
                                : ""
                        }

                    </div>

                </div>

            </header>


            <div class="state-official-card__facts">

                <div>

                    <span>
                        Serving Since
                    </span>

                    <strong>
                        ${escapeHtml(
                            official.servingSinceLabel ||
                            "Unavailable"
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Time in Office
                    </span>

                    <strong>
                        ${escapeHtml(
                            official
                                ?.timeInOffice
                                ?.label ||
                            "Unavailable"
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Current Term Began
                    </span>

                    <strong>
                        ${escapeHtml(
                            official.currentTermBeganLabel ||
                            "Unavailable"
                        )}
                    </strong>

                </div>

            </div>


            ${
                showVoting
                    ? createApprovalArea(
                        official,
                        cadenceLabel
                    )
                    : ""
            }


            ${
                createCardSourceFooter(
                    official
                )
            }

        </article>

    `;

}


/*
==================================================
APPROVAL AREA
==================================================
*/

function createApprovalArea(
    official,
    cadenceLabel
) {

    return `

        <div
            class="state-official-approval"
            data-approval-area="${escapeHtml(
                official.id
            )}"
        >

            <div class="state-official-approval__results">

                <div>

                    <span>
                        Approval
                    </span>

                    <strong
                        data-approval-percent
                    >
                        —
                    </strong>

                </div>


                <div>

                    <span>
                        Responses
                    </span>

                    <strong
                        data-approval-responses
                    >
                        —
                    </strong>

                </div>

            </div>


            <div class="state-official-approval__vote">

                <div>

                    <p class="state-official-approval__label">
                        Rate job performance
                    </p>

                    ${
                        cadenceLabel
                            ? `

                                <span
                                    class="state-official-approval__cadence"
                                >
                                    ${escapeHtml(
                                        cadenceLabel
                                    )}
                                </span>

                            `
                            : ""
                    }

                </div>


                <div class="state-official-approval__options">

                    ${
                        createApprovalButton(
                            "Strongly Approve"
                        )
                    }

                    ${
                        createApprovalButton(
                            "Approve"
                        )
                    }

                    ${
                        createApprovalButton(
                            "Neutral"
                        )
                    }

                    ${
                        createApprovalButton(
                            "Disapprove"
                        )
                    }

                    ${
                        createApprovalButton(
                            "Strongly Disapprove"
                        )
                    }

                </div>


                <p
                    class="state-official-approval__message"
                    data-approval-message
                >
                    Checking voting eligibility...
                </p>

            </div>

        </div>

    `;

}


/*
==================================================
APPROVAL BUTTON
==================================================
*/

function createApprovalButton(
    response
) {

    return `

        <button
            type="button"
            class="state-official-approval__button"
            data-response="${escapeHtml(
                response
            )}"
            disabled
        >
            ${escapeHtml(
                response
            )}
        </button>

    `;

}


/*
==================================================
SOURCE FOOTER
==================================================
*/

function createCardSourceFooter(
    official
) {

    const sources =
        Array.isArray(
            official.sources
        )
            ? official.sources
            : [];


    if (
        sources.length ===
        0
    ) {

        return "";

    }


    const primarySource =
        sources[
            0
        ];


    if (
        !primarySource?.sourceUrl
    ) {

        return "";

    }


    return `

        <footer class="state-official-card__source">

            <a
                href="${escapeHtml(
                    primarySource.sourceUrl
                )}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Source:
                ${escapeHtml(
                    primarySource.sourceName ||
                    "Official source"
                )}
            </a>

        </footer>

    `;

}


/*
==================================================
GOVERNOR CARD
==================================================
*/

function initializeGovernorCard(
    governor
) {

    const card =
        findOfficialCard(
            governor.id
        );


    if (!card) {

        return;

    }


    const approvalElements =
        getApprovalElements(
            card
        );


    if (!approvalElements) {

        return;

    }


    const {

        approvalPercent,
        responseCount,
        message,
        buttons

    } =
        approvalElements;


    /*
    ----------------------------------------------
    LIVE WEEKLY RESULTS
    ----------------------------------------------
    */

    const resultUnsubscribe =
        subscribeToGovernorApproval(

            governor.id,

            summary => {

                approvalPercent.textContent =
                    formatPercentage(
                        summary
                            ?.approvalPercentage
                    );


                responseCount.textContent =
                    formatNumber(
                        summary
                            ?.totalResponses
                    );

            },

            error => {

                console.error(
                    "Governor approval results could not be loaded:",
                    error
                );


                approvalPercent.textContent =
                    "—";


                responseCount.textContent =
                    "—";

            }

        );


    governorSubscriptions.push(
        resultUnsubscribe
    );


    /*
    ----------------------------------------------
    ZIP STATE ELIGIBILITY
    ----------------------------------------------
    */

    if (
        !canVoteForStateOfficial(
            governor
        )
    ) {

        disableButtons(
            buttons
        );


        message.textContent =
            "Read only — Governor voting is limited to residents of this state.";


        return;

    }


    /*
    ----------------------------------------------
    AUTH
    ----------------------------------------------
    */

    const authUnsubscribe =
        onAuthStateChanged(
            auth,
            async user => {

                disableButtons(
                    buttons
                );


                clearButtonSelections(
                    buttons
                );


                if (!user) {

                    message.textContent =
                        "Sign in to participate.";

                    return;

                }


                if (
                    !user.emailVerified
                ) {

                    message.textContent =
                        "Verify your email before participating.";

                    return;

                }


                await refreshGovernorVotingStatus(
                    governor,
                    buttons,
                    message
                );

            }
        );


    governorSubscriptions.push(
        authUnsubscribe
    );


    /*
    ----------------------------------------------
    VOTE BUTTONS
    ----------------------------------------------
    */

    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                async () => {

                    await submitGovernorVote(
                        governor,
                        button,
                        buttons,
                        message
                    );

                }
            );

        }
    );

}


/*
==================================================
GOVERNOR STATUS
==================================================
*/

async function refreshGovernorVotingStatus(
    governor,
    buttons,
    message
) {

    try {

        const status =
            await getGovernorApprovalStatus(
                governor
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


            message.textContent =
                "Voting is open for this week.";


            return;

        }


        disableButtons(
            buttons
        );


        if (
            status.reason ===
            "alreadyParticipatedThisWeek"
        ) {

            const existingVote =
                await getMyGovernorApprovalVote(
                    governor.id
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


            message.textContent =
                "Your Governor rating has already been recorded for this week. Voting reopens next week.";


            return;

        }


        if (
            status.reason ===
            "outsideJurisdiction"
        ) {

            message.textContent =
                "Read only — Governor voting is limited to residents of this state.";


            return;

        }


        if (
            status.reason ===
            "emailNotVerified"
        ) {

            message.textContent =
                "Verify your email before participating.";


            return;

        }


        if (
            status.reason ===
            "signedOut"
        ) {

            message.textContent =
                "Sign in to participate.";


            return;

        }


        message.textContent =
            "Governor voting is currently unavailable.";

    } catch (error) {

        console.error(
            "Governor approval status could not be loaded:",
            error
        );


        disableButtons(
            buttons
        );


        message.textContent =
            "Governor voting is temporarily unavailable.";

    }

}


/*
==================================================
SUBMIT GOVERNOR VOTE
==================================================
*/

async function submitGovernorVote(
    governor,
    selectedButton,
    buttons,
    message
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


    message.textContent =
        "Saving your weekly rating...";


    try {

        await submitGovernorApproval(
            governor,
            response
        );


        clearButtonSelections(
            buttons
        );


        highlightResponse(
            buttons,
            response
        );


        message.textContent =
            "Your Governor rating has been recorded. Voting reopens next week.";

    } catch (error) {

        console.error(
            "Governor approval vote failed:",
            error
        );


        if (
            error?.code ===
            "already-participated-this-week"
        ) {

            await refreshGovernorVotingStatus(
                governor,
                buttons,
                message
            );


            return;

        }


        message.textContent =
            error?.message ||
            "Your Governor rating could not be recorded.";


        await refreshGovernorVotingStatus(
            governor,
            buttons,
            message
        );

    }

}


/*
==================================================
HOUSE EXPLORER
==================================================
*/

function initializeHouseExplorer(
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


    /*
    ----------------------------------------------
    DEFAULT TO PARTICIPANT DISTRICT
    ----------------------------------------------
    */

    const participantDistrict =
        participantJurisdiction
            ?.eligibility
            ?.congressionalDistrict
            ? participantJurisdiction
                .congressionalDistrict
            : "";


    if (
        participantDistrict &&
        representatives.some(
            official =>
                String(
                    official.district
                ) ===
                String(
                    participantDistrict
                )
        )
    ) {

        select.value =
            participantDistrict;

    }


    function renderSelectedRepresentative() {

        clearSubscriptions(
            houseCardSubscriptions
        );


        const selectedDistrict =
            select.value;


        const official =
            representatives.find(
                item =>
                    String(
                        item.district
                    ) ===
                    String(
                        selectedDistrict
                    )
            );


        if (!official) {

            cardContainer.innerHTML = `

                <div class="state-placeholder-card">

                    <strong>
                        Representative unavailable
                    </strong>

                </div>

            `;


            return;

        }


        cardContainer.innerHTML =
            createOfficialCard(
                official,
                {
                    showVoting:
                        true,

                    cadenceLabel:
                        "Monthly approval"
                }
            );


        initializeCongressionalCard(
            official,
            {
                votingEligible:
                    canVoteForHouseOfficial(
                        official
                    ),

                subscriptionBucket:
                    houseCardSubscriptions
            }
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
CONGRESSIONAL CARD
==================================================
*/

function initializeCongressionalCard(
    official,
    options = {}
) {

    const card =
        findOfficialCard(
            official.id
        );


    if (!card) {

        return;

    }


    const approvalElements =
        getApprovalElements(
            card
        );


    if (!approvalElements) {

        return;

    }


    const {

        approvalPercent,
        responseCount,
        message,
        buttons

    } =
        approvalElements;


    const votingEligible =
        options.votingEligible ===
        true;


    const bucket =
        options.subscriptionBucket ||
        activeSubscriptions;


    /*
    ----------------------------------------------
    LIVE RESULTS
    ----------------------------------------------
    */

    const resultUnsubscribe =
        subscribeToCongressionalApproval(

            official.id,

            summary => {

                approvalPercent.textContent =
                    formatPercentage(
                        summary
                            ?.approvalPercentage
                    );


                responseCount.textContent =
                    formatNumber(
                        summary
                            ?.totalResponses
                    );

            },

            error => {

                console.error(
                    "Congressional approval results could not be loaded:",
                    error
                );


                approvalPercent.textContent =
                    "—";


                responseCount.textContent =
                    "—";

            }

        );


    bucket.push(
        resultUnsubscribe
    );


    /*
    ----------------------------------------------
    OUTSIDE JURISDICTION
    ----------------------------------------------
    */

    if (
        !votingEligible
    ) {

        disableButtons(
            buttons
        );


        message.textContent =
            getReadOnlyMessage(
                official
            );


        return;

    }


    /*
    ----------------------------------------------
    AUTH
    ----------------------------------------------
    */

    const authUnsubscribe =
        onAuthStateChanged(
            auth,
            async user => {

                disableButtons(
                    buttons
                );


                clearButtonSelections(
                    buttons
                );


                if (!user) {

                    message.textContent =
                        "Sign in to participate.";

                    return;

                }


                if (
                    !user.emailVerified
                ) {

                    message.textContent =
                        "Verify your email before participating.";

                    return;

                }


                await refreshCongressionalVotingStatus(
                    official,
                    buttons,
                    message
                );

            }
        );


    bucket.push(
        authUnsubscribe
    );


    /*
    ----------------------------------------------
    BUTTONS
    ----------------------------------------------
    */

    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                async () => {

                    await submitCongressionalVote(
                        official,
                        button,
                        buttons,
                        message
                    );

                }
            );

        }
    );

}


/*
==================================================
CONGRESSIONAL STATUS
==================================================
*/

async function refreshCongressionalVotingStatus(
    official,
    buttons,
    message
) {

    try {

        const status =
            await getCongressionalApprovalStatus(
                official.id
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


            message.textContent =
                `Voting is open for ${status.votingPeriodLabel}.`;


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
                    official.id
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


            message.textContent =
                `Your ${status.votingPeriodLabel} rating has already been recorded. Voting reopens next month.`;


            return;

        }


        if (
            status.reason ===
            "emailNotVerified"
        ) {

            message.textContent =
                "Verify your email before participating.";


            return;

        }


        message.textContent =
            "Voting is currently unavailable.";

    } catch (error) {

        console.error(
            "Congressional approval status could not be loaded:",
            error
        );


        disableButtons(
            buttons
        );


        message.textContent =
            "Voting is temporarily unavailable.";

    }

}


/*
==================================================
SUBMIT CONGRESSIONAL VOTE
==================================================
*/

async function submitCongressionalVote(
    official,
    selectedButton,
    buttons,
    message
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


    message.textContent =
        "Saving your monthly rating...";


    try {

        await submitCongressionalApproval(
            createCongressionalApprovalMember(
                official
            ),
            response
        );


        clearButtonSelections(
            buttons
        );


        highlightResponse(
            buttons,
            response
        );


        message.textContent =
            "Your rating has been recorded. Voting reopens next month.";

    } catch (error) {

        console.error(
            "Congressional approval vote failed:",
            error
        );


        if (
            error?.code ===
            "already-participated-this-month"
        ) {

            await refreshCongressionalVotingStatus(
                official,
                buttons,
                message
            );


            return;

        }


        message.textContent =
            error?.message ||
            "Your rating could not be recorded.";


        await refreshCongressionalVotingStatus(
            official,
            buttons,
            message
        );

    }

}


/*
==================================================
CONGRESSIONAL MEMBER FORMAT
==================================================
*/

function createCongressionalApprovalMember(
    official
) {

    const chamber =
        official.officeType ===
            "senator"
            ? "senate"
            : "house";


    const member = {

        id:
            official.id,

        seatKey:
            official.seatKey,

        stateCode:
            official.stateCode,

        chamber

    };


    if (
        chamber ===
        "house"
    ) {

        member.district =
            official.district;

    }


    return member;

}


/*
==================================================
STATE ELIGIBILITY
==================================================
*/

function canVoteForStateOfficial(
    official
) {

    if (
        !participantJurisdiction
            ?.eligibility
            ?.state
    ) {

        return false;

    }


    return (
        participantJurisdiction.stateCode ===
        official.stateCode
    );

}


/*
==================================================
HOUSE ELIGIBILITY
==================================================
*/

function canVoteForHouseOfficial(
    official
) {

    if (
        !participantJurisdiction
            ?.eligibility
            ?.congressionalDistrict
    ) {

        return false;

    }


    return (

        participantJurisdiction.stateCode ===
            official.stateCode &&

        String(
            participantJurisdiction
                .congressionalDistrict
        ) ===
        String(
            official.district
        )

    );

}


/*
==================================================
READ ONLY MESSAGE
==================================================
*/

function getReadOnlyMessage(
    official
) {

    if (
        official.officeType ===
        "representative"
    ) {

        if (
            participantJurisdiction
                ?.districtAmbiguous
        ) {

            return (
                "Read only — your ZIP overlaps more than one congressional district."
            );

        }


        if (
            !participantJurisdiction
                ?.eligibility
                ?.congressionalDistrict
        ) {

            return (
                "Read only — your congressional district could not be uniquely confirmed."
            );

        }


        return (
            "Read only — voting is limited to constituents of this district."
        );

    }


    if (
        official.officeType ===
            "senator" ||
        official.officeType ===
            "governor"
    ) {

        return (
            "Read only — voting is limited to residents of this state."
        );

    }


    if (
        official.officeType ===
        "mayor"
    ) {

        return (
            "Read only — voting is limited to residents of this municipality."
        );

    }


    return (
        "Read only — voting is limited to eligible constituents."
    );

}


/*
==================================================
FIND OFFICIAL CARD
==================================================
*/

function findOfficialCard(
    officialId
) {

    return document.querySelector(
        `[data-official-card="${cssEscape(
            officialId
        )}"]`
    );

}


/*
==================================================
APPROVAL ELEMENTS
==================================================
*/

function getApprovalElements(
    card
) {

    const approvalArea =
        card.querySelector(
            "[data-approval-area]"
        );


    if (!approvalArea) {

        return null;

    }


    const approvalPercent =
        approvalArea.querySelector(
            "[data-approval-percent]"
        );


    const responseCount =
        approvalArea.querySelector(
            "[data-approval-responses]"
        );


    const message =
        approvalArea.querySelector(
            "[data-approval-message]"
        );


    const buttons =
        Array.from(
            approvalArea.querySelectorAll(
                "button[data-response]"
            )
        );


    if (
        !approvalPercent ||
        !responseCount ||
        !message ||
        buttons.length ===
            0
    ) {

        return null;

    }


    return {

        approvalPercent,
        responseCount,
        message,
        buttons

    };

}


/*
==================================================
HIDE OLD APPROVAL SECTION
==================================================
*/

function hideLegacyApprovalSection() {

    const legacyElements = [

        document.getElementById(
            "stateSenatorOneName"
        ),

        document.getElementById(
            "stateSenatorTwoName"
        ),

        document.getElementById(
            "stateHouseApprovalPercent"
        )

    ]
        .filter(
            Boolean
        );


    legacyElements.forEach(
        element => {

            const section =
                element.closest(
                    "section"
                );


            if (
                section
            ) {

                section.hidden =
                    true;

            }

        }
    );

}


/*
==================================================
PARTY
==================================================
*/

function normalizeParty(
    value
) {

    const party =
        String(
            value ||
            ""
        )
            .trim()
            .toUpperCase();


    if (
        party ===
            "D" ||
        party ===
            "R" ||
        party ===
            "I"
    ) {

        return party;

    }


    if (
        party ===
        "OTHER"
    ) {

        return "O";

    }


    return "";

}


function createPartyLabel(
    party
) {

    if (
        party ===
        "D"
    ) {

        return "Democratic";

    }


    if (
        party ===
        "R"
    ) {

        return "Republican";

    }


    if (
        party ===
        "I"
    ) {

        return "Independent";

    }


    return "Other";

}


/*
==================================================
OFFICE LABEL
==================================================
*/

function createCompactOfficeLabel(
    official
) {

    if (
        official.officeType ===
        "senator"
    ) {

        return "U.S. Senator";

    }


    if (
        official.officeType ===
        "representative"
    ) {

        if (
            official.district ===
            "At-Large"
        ) {

            return (
                "U.S. Representative · At-Large"
            );

        }


        return (
            `U.S. Representative · District ${official.district}`
        );

    }


    if (
        official.officeType ===
        "governor"
    ) {

        return "Governor";

    }


    if (
        official.officeType ===
        "mayor"
    ) {

        return "Mayor";

    }


    return (
        official.officeLabel ||
        "Public Official"
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

            button.classList.toggle(
                "is-selected",
                button.dataset.response ===
                    response
            );

        }
    );

}


/*
==================================================
CLEAR SUBSCRIPTIONS
==================================================
*/

function clearSubscriptions(
    bucket
) {

    while (
        bucket.length >
        0
    ) {

        const unsubscribe =
            bucket.pop();


        if (
            typeof unsubscribe ===
            "function"
        ) {

            unsubscribe();

        }

    }

}


/*
==================================================
DISTRICT SORT
==================================================
*/

function compareDistricts(
    first,
    second
) {

    if (
        first.district ===
        "At-Large"
    ) {

        return -1;

    }


    if (
        second.district ===
        "At-Large"
    ) {

        return 1;

    }


    return (
        Number(
            first.district
        ) -
        Number(
            second.district
        )
    );

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
        "Return to the State Explorer and choose a valid state."
    );

}


/*
==================================================
STATE CODE
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
TEXT
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
FORMAT
==================================================
*/

function formatPercentage(
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

        return "0.0%";

    }


    return (
        `${number.toFixed(
            1
        )}%`
    );

}


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
HTML ESCAPE
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
CSS ESCAPE
==================================================
*/

function cssEscape(
    value
) {

    if (
        window.CSS &&
        typeof window.CSS.escape ===
        "function"
    ) {

        return window.CSS.escape(
            String(
                value
            )
        );

    }


    return String(
        value
    ).replace(
        /["\\]/g,
        "\\$&"
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


                    if (!group) {

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
                event.key ===
                "Escape"
            ) {

                closeDropdowns();

            }

        }
    );

}


/*
==================================================
CLOSE DROPDOWNS
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
CLEANUP
==================================================
*/

window.addEventListener(
    "beforeunload",
    () => {

        clearSubscriptions(
            activeSubscriptions
        );


        clearSubscriptions(
            governorSubscriptions
        );


        clearSubscriptions(
            houseCardSubscriptions
        );

    }
);


/*
==================================================
START
==================================================
*/

initializeStatePage();