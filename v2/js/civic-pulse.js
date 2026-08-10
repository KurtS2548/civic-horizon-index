/*
==================================================
CIVIC HORIZON INDEX V2
CIVIC PULSE
==================================================
*/


const approvalStorageKey =
    "civicPulsePresidentialApprovalVotes";

const approvalUserVoteKey =
    "civicPulseUserApprovalVote";

const directionStorageKey =
    "civicPulseCountryDirectionVotes";

const directionUserVoteKey =
    "civicPulseUserDirectionVote";

const confidenceStorageKey =
    "civicPulseConfidenceRatings";


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
INITIALIZE PAGE
==================================================
*/

async function initializeCivicPulsePage() {

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

    initializeApprovalVoting();

    initializeDirectionVoting();

    initializeConfidenceVoting();

    updateApprovalTracker();

    updateDirectionTracker();

    initializeConfidenceState();

}


/*
==================================================
PRESIDENTIAL APPROVAL VOTING
==================================================
*/

function initializeApprovalVoting() {

    const buttons =
        document.querySelectorAll(
            "[data-approval-vote]"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const vote =
                        button.dataset.approvalVote;


                    recordSingleChoiceVote(
                        approvalStorageKey,
                        approvalUserVoteKey,
                        vote,
                        [
                            "approve",
                            "disapprove"
                        ]
                    );


                    setText(
                        "pulseApprovalMessage",
                        "Your response has been recorded on this device."
                    );


                    updateApprovalTracker();

                }
            );

        }
    );

}


/*
==================================================
UPDATE APPROVAL TRACKER
==================================================
*/

function updateApprovalTracker() {

    const votes =
        getVoteTotals(
            approvalStorageKey,
            {
                approve: 0,
                disapprove: 0
            }
        );


    const total =
        votes.approve +
        votes.disapprove;


    const approvePercent =
        total > 0
            ? Math.round(
                (
                    votes.approve /
                    total
                ) * 100
            )
            : 0;


    const disapprovePercent =
        total > 0
            ? 100 -
                approvePercent
            : 0;


    setText(
        "pulseApprovalPercent",
        total > 0
            ? `${approvePercent}%`
            : "—"
    );


    setText(
        "pulseDisapprovalPercent",
        total > 0
            ? `${disapprovePercent}%`
            : "—"
    );


    setText(
        "pulseApprovalSummary",
        total > 0
            ? `${approvePercent}% approve`
            : "Awaiting responses"
    );


    setText(
        "pulseApprovalParticipation",
        total > 0
            ? `${total} response${total === 1 ? "" : "s"} recorded on this device.`
            : "Awaiting responses."
    );


    setFillWidth(
        "pulseApprovalFill",
        approvePercent
    );


    setFillWidth(
        "pulseDisapprovalFill",
        disapprovePercent
    );


    restoreSelectedButtons(
        "[data-approval-vote]",
        "approvalVote",
        approvalUserVoteKey
    );

}


/*
==================================================
COUNTRY DIRECTION
==================================================
*/

function initializeDirectionVoting() {

    const buttons =
        document.querySelectorAll(
            "[data-direction-vote]"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const vote =
                        button.dataset.directionVote;


                    recordSingleChoiceVote(
                        directionStorageKey,
                        directionUserVoteKey,
                        vote,
                        [
                            "right",
                            "wrong"
                        ]
                    );


                    setText(
                        "directionVoteMessage",
                        "Your response has been recorded on this device."
                    );


                    updateDirectionTracker();

                }
            );

        }
    );

}


/*
==================================================
UPDATE COUNTRY DIRECTION
==================================================
*/

function updateDirectionTracker() {

    const votes =
        getVoteTotals(
            directionStorageKey,
            {
                right: 0,
                wrong: 0
            }
        );


    const total =
        votes.right +
        votes.wrong;


    const rightPercent =
        total > 0
            ? Math.round(
                (
                    votes.right /
                    total
                ) * 100
            )
            : 0;


    const wrongPercent =
        total > 0
            ? 100 -
                rightPercent
            : 0;


    setText(
        "directionRightPercent",
        total > 0
            ? `${rightPercent}%`
            : "—"
    );


    setText(
        "directionWrongPercent",
        total > 0
            ? `${wrongPercent}%`
            : "—"
    );


    setText(
        "pulseDirectionSummary",
        total > 0
            ? `${rightPercent}% right direction`
            : "Awaiting responses"
    );


    setText(
        "directionParticipation",
        total > 0
            ? `${total} response${total === 1 ? "" : "s"} recorded on this device.`
            : "Awaiting responses."
    );


    setFillWidth(
        "directionRightFill",
        rightPercent
    );


    setFillWidth(
        "directionWrongFill",
        wrongPercent
    );


    restoreSelectedButtons(
        "[data-direction-vote]",
        "directionVote",
        directionUserVoteKey
    );

}


/*
==================================================
GENERIC SINGLE-CHOICE VOTE
==================================================
*/

function recordSingleChoiceVote(
    storageKey,
    userVoteKey,
    vote,
    allowedVotes
) {

    if (
        !allowedVotes.includes(
            vote
        )
    ) {

        return;

    }


    const defaults =
        {};


    allowedVotes.forEach(
        value => {

            defaults[value] =
                0;

        }
    );


    const totals =
        getVoteTotals(
            storageKey,
            defaults
        );


    const previousVote =
        getStoredValue(
            userVoteKey
        );


    if (
        previousVote ===
        vote
    ) {

        return;

    }


    if (
        previousVote &&
        Object.hasOwn(
            totals,
            previousVote
        )
    ) {

        totals[previousVote] =
            Math.max(
                0,
                totals[previousVote] - 1
            );

    }


    totals[vote] +=
        1;


    setStoredValue(
        storageKey,
        JSON.stringify(
            totals
        )
    );


    setStoredValue(
        userVoteKey,
        vote
    );

}


/*
==================================================
READ VOTE TOTALS
==================================================
*/

function getVoteTotals(
    storageKey,
    defaults
) {

    const stored =
        getStoredValue(
            storageKey
        );


    if (!stored) {

        return {
            ...defaults
        };

    }


    try {

        const parsed =
            JSON.parse(
                stored
            );


        const normalized =
            {};


        Object.keys(
            defaults
        )
        .forEach(
            key => {

                normalized[key] =
                    Number(
                        parsed[key]
                    ) || 0;

            }
        );


        return normalized;

    } catch (error) {

        console.warn(
            "Civic Pulse vote data could not be read:",
            error
        );


        return {
            ...defaults
        };

    }

}


/*
==================================================
RESTORE SELECTED BUTTONS
==================================================
*/

function restoreSelectedButtons(
    selector,
    datasetKey,
    userVoteKey
) {

    const previousVote =
        getStoredValue(
            userVoteKey
        );


    document
        .querySelectorAll(
            selector
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "is-selected",
                    Boolean(
                        previousVote &&
                        button.dataset[
                            datasetKey
                        ] ===
                        previousVote
                    )
                );

            }
        );

}


/*
==================================================
CONFIDENCE SURVEY
==================================================
*/

function initializeConfidenceVoting() {

    document
        .querySelectorAll(
            "[data-confidence-group]"
        )
        .forEach(
            group => {

                group.addEventListener(
                    "click",
                    event => {

                        const button =
                            event.target.closest(
                                "[data-confidence-value]"
                            );


                        if (!button) {
                            return;
                        }


                        group
                            .querySelectorAll(
                                "[data-confidence-value]"
                            )
                            .forEach(
                                item => {

                                    item.classList.remove(
                                        "is-selected"
                                    );

                                }
                            );


                        button.classList.add(
                            "is-selected"
                        );


                        const groupName =
                            group.dataset.confidenceGroup;


                        const value =
                            Number(
                                button.dataset.confidenceValue
                            );


                        setText(
                            getConfidenceUserValueId(
                                groupName
                            ),
                            getConfidenceLabel(
                                value
                            )
                        );

                    }
                );

            }
        );


    const submitButton =
        document.getElementById(
            "confidenceSubmitButton"
        );


    submitButton
        ?.addEventListener(
            "click",
            saveConfidenceRatings
        );

}


/*
==================================================
SAVE CONFIDENCE RATINGS
==================================================
*/

function saveConfidenceRatings() {

    const ratings =
        {};


    let completedCount =
        0;


    document
        .querySelectorAll(
            "[data-confidence-group]"
        )
        .forEach(
            group => {

                const selected =
                    group.querySelector(
                        ".is-selected[data-confidence-value]"
                    );


                if (!selected) {
                    return;
                }


                ratings[
                    group.dataset.confidenceGroup
                ] =
                    Number(
                        selected.dataset.confidenceValue
                    );


                completedCount +=
                    1;

            }
        );


    if (
        completedCount !==
        6
    ) {

        setText(
            "confidenceSurveyMessage",
            "Please rate all six areas before saving."
        );


        return;

    }


    setStoredValue(
        confidenceStorageKey,
        JSON.stringify(
            ratings
        )
    );


    setText(
        "confidenceSurveyMessage",
        "Your confidence ratings have been saved on this device."
    );


    initializeConfidenceState();

}


/*
==================================================
READ CONFIDENCE RATINGS
==================================================
*/

function getConfidenceRatings() {

    const stored =
        getStoredValue(
            confidenceStorageKey
        );


    if (!stored) {

        return {};

    }


    try {

        return JSON.parse(
            stored
        );

    } catch (error) {

        console.warn(
            "Confidence ratings could not be read:",
            error
        );


        return {};

    }

}


/*
==================================================
RENDER CONFIDENCE STATE
==================================================
*/

function initializeConfidenceState() {

    const ratings =
        getConfidenceRatings();


    const metricMap = {

        government: [
            "confidenceGovernmentValue",
            "confidenceGovernmentFill",
            "confidenceGovernmentUserValue"
        ],

        congress: [
            "confidenceCongressValue",
            "confidenceCongressFill",
            "confidenceCongressUserValue"
        ],

        court: [
            "confidenceCourtValue",
            "confidenceCourtFill",
            "confidenceCourtUserValue"
        ],

        economy: [
            "confidenceEconomyValue",
            "confidenceEconomyFill",
            "confidenceEconomyUserValue"
        ],

        media: [
            "confidenceMediaValue",
            "confidenceMediaFill",
            "confidenceMediaUserValue"
        ],

        democracy: [
            "confidenceDemocracyValue",
            "confidenceDemocracyFill",
            "confidenceDemocracyUserValue"
        ]

    };


    Object.entries(
        metricMap
    )
    .forEach(
        ([key, ids]) => {

            const value =
                Number(
                    ratings[key]
                ) || 0;


            setText(
                ids[0],
                value > 0
                    ? `${value}%`
                    : "—"
            );


            setFillWidth(
                ids[1],
                value
            );


            setText(
                ids[2],
                value > 0
                    ? getConfidenceLabel(value)
                    : "Not rated"
            );


            const group =
                document.querySelector(
                    `[data-confidence-group="${key}"]`
                );


            group
                ?.querySelectorAll(
                    "[data-confidence-value]"
                )
                .forEach(
                    button => {

                        button.classList.toggle(
                            "is-selected",
                            Number(
                                button.dataset.confidenceValue
                            ) === value
                        );

                    }
                );

        }
    );


    updateConfidenceSummaries(
        ratings
    );

}


/*
==================================================
CONFIDENCE LABEL
==================================================
*/

function getConfidenceLabel(
    value
) {

    const labels = {

        20: "Very Low",
        40: "Low",
        60: "Moderate",
        80: "High",
        100: "Very High"

    };


    return (
        labels[value] ||
        "Not rated"
    );

}


/*
==================================================
CONFIDENCE USER VALUE IDS
==================================================
*/

function getConfidenceUserValueId(
    groupName
) {

    const ids = {

        government:
            "confidenceGovernmentUserValue",

        congress:
            "confidenceCongressUserValue",

        court:
            "confidenceCourtUserValue",

        economy:
            "confidenceEconomyUserValue",

        media:
            "confidenceMediaUserValue",

        democracy:
            "confidenceDemocracyUserValue"

    };


    return ids[groupName];

}


/*
==================================================
CONFIDENCE SUMMARIES
==================================================
*/

function updateConfidenceSummaries(
    ratings
) {

    if (
        Number(
            ratings.economy
        ) > 0
    ) {

        setText(
            "pulseEconomySummary",
            `${ratings.economy}% confidence`
        );

    } else {

        setText(
            "pulseEconomySummary",
            "Awaiting responses"
        );

    }


    const institutionValues =
        [
            ratings.government,
            ratings.congress,
            ratings.court,
            ratings.media,
            ratings.democracy
        ]
        .map(Number)
        .filter(
            value =>
                value > 0
        );


    if (
        institutionValues.length >
        0
    ) {

        const average =
            Math.round(
                institutionValues.reduce(
                    (total, value) =>
                        total + value,
                    0
                ) /
                institutionValues.length
            );


        setText(
            "pulseInstitutionSummary",
            `${average}% average confidence`
        );

    } else {

        setText(
            "pulseInstitutionSummary",
            "Awaiting responses"
        );

    }

}


/*
==================================================
FILL WIDTH
==================================================
*/

function setFillWidth(
    elementId,
    percent
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.style.width =
            `${Math.max(
                0,
                Math.min(
                    100,
                    percent
                )
            )}%`;

    }

}


/*
==================================================
STORAGE
==================================================
*/

function getStoredValue(
    key
) {

    try {

        return window.localStorage
            .getItem(
                key
            );

    } catch (error) {

        console.warn(
            "Civic Pulse data could not be read:",
            error
        );


        return null;

    }

}


function setStoredValue(
    key,
    value
) {

    try {

        window.localStorage
            .setItem(
                key,
                value
            );

    } catch (error) {

        console.warn(
            "Civic Pulse data could not be saved:",
            error
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
                    String(isOpen)
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
DOM
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


    if (element) {

        element.textContent =
            String(value);

    }

}


/*
==================================================
START
==================================================
*/

initializeCivicPulsePage();