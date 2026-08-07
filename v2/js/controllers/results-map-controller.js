/*
==================================================
CIVIC HORIZON INDEX V2
STATE RESULTS EXPLORER CONTROLLER
==================================================
*/

import {
    subscribeToNationalPrioritySummary,
    calculatePriorityRankings
} from "../services/priority-service.js";


/*
==================================================
STATE DEFINITIONS
==================================================
*/

const stateNames = {
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


const stateCodesByName =
    Object.entries(stateNames)
        .reduce(
            (lookup, [code, name]) => {

                lookup[name.toUpperCase()] =
                    code;

                return lookup;

            },
            {}
        );


/*
==================================================
CONTROLLER STATE
==================================================
*/

let resultsMapControllerInitialized = false;

let unsubscribePrioritySummary = null;

let nationalSummary = null;

let selectedStateCode = null;


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeResultsMapController() {

    if (resultsMapControllerInitialized) {
        return;
    }

    resultsMapControllerInitialized = true;

    initializeStateSelect();
    initializeQuickSelect();
    initializeResetButton();
    subscribeToPriorityData();

}


/*
==================================================
STATE SELECT
==================================================
*/

function initializeStateSelect() {

    const select =
        document.getElementById(
            "stateResultsSelect"
        );


    if (!select) {
        return;
    }


    select.addEventListener(
        "change",
        handleStateSelectChange
    );

}


function handleStateSelectChange(
    event
) {

    const stateCode =
        event.currentTarget.value;


    if (!stateCode) {

        showNationalView();

        return;

    }


    selectState(
        stateCode
    );

}


/*
==================================================
QUICK SELECT
==================================================
*/

function initializeQuickSelect() {

    document
        .querySelectorAll(
            "#stateQuickSelect [data-state]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                handleQuickSelectClick
            );

        });

}


function handleQuickSelectClick(
    event
) {

    const stateCode =
        event.currentTarget
            .dataset.state;


    selectState(
        stateCode
    );

}


/*
==================================================
RESET BUTTON
==================================================
*/

function initializeResetButton() {

    const resetButton =
        document.getElementById(
            "resetStateSelection"
        );


    if (!resetButton) {
        return;
    }


    resetButton.addEventListener(
        "click",
        showNationalView
    );

}


/*
==================================================
STATE SELECTION
==================================================
*/

function selectState(
    stateCode
) {

    if (
        !stateCode ||
        !stateNames[stateCode]
    ) {
        return;
    }


    selectedStateCode =
        stateCode;


    updateStateSelect(
        stateCode
    );


    updateQuickSelectButtons(
        stateCode
    );


    renderSelectedState();

}


function showNationalView() {

    selectedStateCode = null;


    updateStateSelect("");


    updateQuickSelectButtons("");


    renderNationalView();

}


/*
==================================================
LIVE PRIORITY DATA
==================================================
*/

function subscribeToPriorityData() {

    unsubscribePrioritySummary =
        subscribeToNationalPrioritySummary(
            summary => {

                nationalSummary =
                    summary;


                if (selectedStateCode) {

                    renderSelectedState();

                } else {

                    renderNationalView();

                }

            },
            error => {

                console.error(
                    "State Results Explorer data error:",
                    error
                );

                renderExplorerError();

            }
        );

}


/*
==================================================
SELECTED STATE RESULTS
==================================================
*/

function renderSelectedState() {

    if (
        !selectedStateCode ||
        !nationalSummary
    ) {
        return;
    }


    const stateName =
        stateNames[
            selectedStateCode
        ];


    const stateSubmissions =
        getStateSubmissions(
            nationalSummary.submissions,
            selectedStateCode
        );


    const stateRankings =
        calculatePriorityRankings(
            stateSubmissions
        );


    const topStateIssue =
        stateRankings.find(issue => {

            return (
                Number(
                    issue.responseCount
                ) > 0
            );

        }) || null;


    setText(
        "selectedStateName",
        stateName
    );

    setText(
        "stateSummaryTitle",
        stateName
    );

    setText(
        "stateSummaryDescription",
        `Available Civic Horizon Index results for ${stateName}.`
    );

    setText(
        "stateParticipantCount",
        formatNumber(
            stateSubmissions.length
        )
    );


    if (!topStateIssue) {

        setText(
            "stateTopPriority",
            "No state results yet"
        );

        setText(
            "stateTopScore",
            "—"
        );

        setText(
            "stateComparisonText",
            `No National Priorities Survey responses are currently available for ${stateName}.`
        );

        return;

    }


    setText(
        "stateTopPriority",
        topStateIssue.name
    );

    setText(
        "stateTopScore",
        `${topStateIssue.average.toFixed(1)} / 10`
    );

    setText(
        "stateComparisonText",
        createComparisonText(
            stateName,
            topStateIssue,
            nationalSummary.topIssue
        )
    );

}


/*
==================================================
NATIONAL VIEW
==================================================
*/

function renderNationalView() {

    if (!nationalSummary) {
        return;
    }


    const participantCount =
        Number(
            nationalSummary
                .participantCount
        ) || 0;


    const topIssue =
        nationalSummary.topIssue ||
        null;


    setText(
        "selectedStateName",
        "National View"
    );

    setText(
        "stateSummaryTitle",
        "National View"
    );

    setText(
        "stateSummaryDescription",
        "Current results from participants across the United States."
    );

    setText(
        "stateParticipantCount",
        formatNumber(
            participantCount
        )
    );


    if (!topIssue) {

        setText(
            "stateTopPriority",
            "No results yet"
        );

        setText(
            "stateTopScore",
            "—"
        );

        setText(
            "stateComparisonText",
            "State comparisons will appear after survey responses are submitted."
        );

        return;

    }


    setText(
        "stateTopPriority",
        topIssue.name
    );

    setText(
        "stateTopScore",
        `${topIssue.average.toFixed(1)} / 10`
    );

    setText(
        "stateComparisonText",
        "Select a state to compare its leading priority with the current national result."
    );

}


/*
==================================================
STATE SUBMISSION FILTERING
==================================================
*/

function getStateSubmissions(
    submissions,
    stateCode
) {

    const safeSubmissions =
        Array.isArray(submissions)
            ? submissions
            : [];


    return safeSubmissions.filter(
        submission => {

            const submittedState =
                normalizeSubmittedState(
                    submission?.state ||
                    submission?.stateCode ||
                    submission?.location?.state ||
                    submission?.demographics?.state
                );


            return (
                submittedState ===
                stateCode
            );

        }
    );

}


/*
==================================================
STATE NORMALIZATION
==================================================
*/

function normalizeSubmittedState(
    value
) {

    if (
        typeof value !==
        "string"
    ) {
        return "";
    }


    const normalizedValue =
        value
            .trim()
            .toUpperCase();


    if (
        stateNames[
            normalizedValue
        ]
    ) {

        return normalizedValue;

    }


    return (
        stateCodesByName[
            normalizedValue
        ] || ""
    );

}


/*
==================================================
COMPARISON TEXT
==================================================
*/

function createComparisonText(
    stateName,
    stateIssue,
    nationalIssue
) {

    if (!nationalIssue) {

        return (
            `${stateName}'s leading priority is ` +
            `${stateIssue.name}, with an average score of ` +
            `${stateIssue.average.toFixed(1)} out of 10.`
        );

    }


    if (
        stateIssue.id ===
        nationalIssue.id
    ) {

        const difference =
            stateIssue.average -
            nationalIssue.average;


        if (
            Math.abs(difference) <
            0.05
        ) {

            return (
                `${stateName} and the national results both rank ` +
                `${stateIssue.name} first, with nearly identical scores.`
            );

        }


        const direction =
            difference > 0
                ? "higher"
                : "lower";


        return (
            `${stateName} and the national results both rank ` +
            `${stateIssue.name} first. The state score is ` +
            `${Math.abs(difference).toFixed(1)} points ${direction}.`
        );

    }


    return (
        `${stateName} ranks ${stateIssue.name} first, while the ` +
        `current national leader is ${nationalIssue.name}.`
    );

}


/*
==================================================
CONTROL STATES
==================================================
*/

function updateStateSelect(
    stateCode
) {

    const select =
        document.getElementById(
            "stateResultsSelect"
        );


    if (select) {

        select.value =
            stateCode;

    }

}


function updateQuickSelectButtons(
    stateCode
) {

    document
        .querySelectorAll(
            "#stateQuickSelect [data-state]"
        )
        .forEach(button => {

            const isSelected =
                button.dataset.state ===
                stateCode;


            button.classList.toggle(
                "is-selected",
                isSelected
            );


            button.setAttribute(
                "aria-pressed",
                String(isSelected)
            );

        });

}


/*
==================================================
ERROR STATE
==================================================
*/

function renderExplorerError() {

    setText(
        "selectedStateName",
        "Data unavailable"
    );

    setText(
        "stateSummaryTitle",
        "State results unavailable"
    );

    setText(
        "stateSummaryDescription",
        "State-level information could not be loaded."
    );

    setText(
        "stateParticipantCount",
        "—"
    );

    setText(
        "stateTopPriority",
        "Unavailable"
    );

    setText(
        "stateTopScore",
        "—"
    );

    setText(
        "stateComparisonText",
        "Please refresh the page and try again."
    );

}


/*
==================================================
DOM HELPERS
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
        String(value);

}


/*
==================================================
FORMAT HELPERS
==================================================
*/

function formatNumber(
    value
) {

    const number =
        Number(value);


    if (!Number.isFinite(number)) {
        return "0";
    }


    return number.toLocaleString();

}


/*
==================================================
CLEANUP
==================================================
*/

export function destroyResultsMapController() {

    if (
        typeof unsubscribePrioritySummary ===
        "function"
    ) {

        unsubscribePrioritySummary();

    }


    const select =
        document.getElementById(
            "stateResultsSelect"
        );


    if (select) {

        select.removeEventListener(
            "change",
            handleStateSelectChange
        );

    }


    document
        .querySelectorAll(
            "#stateQuickSelect [data-state]"
        )
        .forEach(button => {

            button.removeEventListener(
                "click",
                handleQuickSelectClick
            );

        });


    const resetButton =
        document.getElementById(
            "resetStateSelection"
        );


    if (resetButton) {

        resetButton.removeEventListener(
            "click",
            showNationalView
        );

    }


    unsubscribePrioritySummary = null;

    nationalSummary = null;

    selectedStateCode = null;

    resultsMapControllerInitialized = false;

}