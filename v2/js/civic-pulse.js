/*
==================================================
CIVIC HORIZON INDEX V2
CIVIC PULSE
LIVE FIREBASE CONTROLLER
==================================================
*/


import {

    subscribeToPresidentialApproval,

    subscribeToCountryDirection,

    subscribeToNationalConfidence,

    submitPresidentialApproval,

    submitCountryDirection,

    submitNationalConfidence

} from "./services/firebase-service.js";


/*
==================================================
LOCAL PARTICIPANT KEYS
==================================================
*/

const participantIdStorageKey =
    "civicPulseParticipantId";


const approvalSelectionStorageKey =
    "civicPulseUserApprovalVote";


const directionSelectionStorageKey =
    "civicPulseUserDirectionVote";


const confidenceSelectionStorageKey =
    "civicPulseConfidenceRatings";


/*
==================================================
LIVE DATA STATE
==================================================
*/

const pulseState = {

    approvalResponses: [],

    directionResponses: [],

    confidenceResponses: []

};


/*
==================================================
PAGE INITIALIZATION
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


    restoreLocalSelections();


    initializeLiveSubscriptions();

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
LIVE FIREBASE SUBSCRIPTIONS
==================================================
*/

function initializeLiveSubscriptions() {

    subscribeToPresidentialApproval(

        responses => {

            pulseState.approvalResponses =
                responses;


            renderApprovalTracker();

        },

        error => {

            console.error(
                "Presidential Approval could not be loaded:",
                error
            );


            setText(
                "pulseApprovalParticipation",
                "Live results are temporarily unavailable."
            );

        }

    );


    subscribeToCountryDirection(

        responses => {

            pulseState.directionResponses =
                responses;


            renderDirectionTracker();

        },

        error => {

            console.error(
                "Country Direction could not be loaded:",
                error
            );


            setText(
                "directionParticipation",
                "Live results are temporarily unavailable."
            );

        }

    );


    subscribeToNationalConfidence(

        responses => {

            pulseState.confidenceResponses =
                responses;


            renderConfidenceTracker();

        },

        error => {

            console.error(
                "National Confidence could not be loaded:",
                error
            );


            setText(
                "confidenceSurveyMessage",
                "Live confidence results are temporarily unavailable."
            );

        }

    );

}


/*
==================================================
PARTICIPANT ID
==================================================
*/

function getParticipantId() {

    const existing =
        getStoredValue(
            participantIdStorageKey
        );


    if (existing) {

        return existing;

    }


    let participantId;


    if (
        window.crypto &&
        typeof window.crypto.randomUUID ===
        "function"
    ) {

        participantId =
            `participant-${window.crypto.randomUUID()}`;

    } else {

        participantId =
            `participant-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 12)}`;

    }


    setStoredValue(
        participantIdStorageKey,
        participantId
    );


    return participantId;

}


/*
==================================================
PRESIDENTIAL APPROVAL VOTING
==================================================
*/

function initializeApprovalVoting() {

    document
        .querySelectorAll(
            "[data-approval-vote]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    async () => {

                        const vote =
                            button.dataset.approvalVote;


                        if (
                            vote !== "approve" &&
                            vote !== "disapprove"
                        ) {

                            return;

                        }


                        setApprovalButtonsDisabled(
                            true
                        );


                        setText(
                            "pulseApprovalMessage",
                            "Saving your response..."
                        );


                        try {

                            const firebaseResponse =
                                vote === "approve"
                                    ? "Approve"
                                    : "Disapprove";


                            await submitPresidentialApproval(
                                firebaseResponse,
                                getParticipantId()
                            );


                            setStoredValue(
                                approvalSelectionStorageKey,
                                vote
                            );


                            restoreApprovalSelection();


                            setText(
                                "pulseApprovalMessage",
                                "Your response has been recorded."
                            );

                        } catch (error) {

                            console.error(
                                "Approval response could not be saved:",
                                error
                            );


                            setText(
                                "pulseApprovalMessage",
                                "Your response could not be saved. Please try again."
                            );

                        } finally {

                            setApprovalButtonsDisabled(
                                false
                            );

                        }

                    }
                );

            }
        );

}


/*
==================================================
PRESIDENTIAL APPROVAL RESULTS
==================================================
*/

function renderApprovalTracker() {

    let approve =
        0;


    let disapprove =
        0;


    let neutral =
        0;


    pulseState.approvalResponses
        .forEach(
            record => {

                const response =
                    String(
                        record.response || ""
                    );


                if (
                    response ===
                    "Approve" ||
                    response ===
                    "Strongly Approve"
                ) {

                    approve +=
                        1;

                } else if (
                    response ===
                    "Disapprove" ||
                    response ===
                    "Strongly Disapprove"
                ) {

                    disapprove +=
                        1;

                } else if (
                    response ===
                    "Neutral"
                ) {

                    neutral +=
                        1;

                }

            }
        );


    const decisiveResponses =
        approve +
        disapprove;


    const totalResponses =
        decisiveResponses +
        neutral;


    const approvePercent =
        decisiveResponses > 0
            ? Math.round(
                (
                    approve /
                    decisiveResponses
                ) * 100
            )
            : 0;


    const disapprovePercent =
        decisiveResponses > 0
            ? 100 -
                approvePercent
            : 0;


    setText(
        "pulseApprovalPercent",
        decisiveResponses > 0
            ? `${approvePercent}%`
            : "—"
    );


    setText(
        "pulseDisapprovalPercent",
        decisiveResponses > 0
            ? `${disapprovePercent}%`
            : "—"
    );


    setFillWidth(
        "pulseApprovalFill",
        approvePercent
    );


    setFillWidth(
        "pulseDisapprovalFill",
        disapprovePercent
    );


    if (
        totalResponses >
        0
    ) {

        const neutralText =
            neutral > 0
                ? ` ${neutral} neutral response${neutral === 1 ? "" : "s"} are not included in the approve/disapprove percentage.`
                : "";


        setText(
            "pulseApprovalParticipation",
            `${totalResponses} total response${totalResponses === 1 ? "" : "s"}.${neutralText}`
        );


        setText(
            "pulseApprovalSummary",
            decisiveResponses > 0
                ? `${approvePercent}% approve`
                : "Awaiting approve/disapprove responses"
        );

    } else {

        setText(
            "pulseApprovalParticipation",
            "Awaiting responses."
        );


        setText(
            "pulseApprovalSummary",
            "Awaiting responses"
        );

    }

}


/*
==================================================
APPROVAL BUTTON STATE
==================================================
*/

function restoreApprovalSelection() {

    const selectedVote =
        getStoredValue(
            approvalSelectionStorageKey
        );


    document
        .querySelectorAll(
            "[data-approval-vote]"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "is-selected",
                    button.dataset.approvalVote ===
                    selectedVote
                );

            }
        );

}


function setApprovalButtonsDisabled(
    disabled
) {

    document
        .querySelectorAll(
            "[data-approval-vote]"
        )
        .forEach(
            button => {

                button.disabled =
                    disabled;

            }
        );

}


/*
==================================================
COUNTRY DIRECTION VOTING
==================================================
*/

function initializeDirectionVoting() {

    document
        .querySelectorAll(
            "[data-direction-vote]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    async () => {

                        const vote =
                            button.dataset.directionVote;


                        if (
                            vote !== "right" &&
                            vote !== "wrong"
                        ) {

                            return;

                        }


                        setDirectionButtonsDisabled(
                            true
                        );


                        setText(
                            "directionVoteMessage",
                            "Saving your response..."
                        );


                        try {

                            const firebaseResponse =
                                vote === "right"
                                    ? "Right Direction"
                                    : "Wrong Track";


                            await submitCountryDirection(
                                firebaseResponse,
                                getParticipantId()
                            );


                            setStoredValue(
                                directionSelectionStorageKey,
                                vote
                            );


                            restoreDirectionSelection();


                            setText(
                                "directionVoteMessage",
                                "Your response has been recorded."
                            );

                        } catch (error) {

                            console.error(
                                "Country Direction response could not be saved:",
                                error
                            );


                            setText(
                                "directionVoteMessage",
                                "Your response could not be saved. Please try again."
                            );

                        } finally {

                            setDirectionButtonsDisabled(
                                false
                            );

                        }

                    }
                );

            }
        );

}


/*
==================================================
COUNTRY DIRECTION RESULTS
==================================================
*/

function renderDirectionTracker() {

    let right =
        0;


    let wrong =
        0;


    pulseState.directionResponses
        .forEach(
            record => {

                const response =
                    String(
                        record.response || ""
                    );


                if (
                    response ===
                    "Right Direction"
                ) {

                    right +=
                        1;

                }


                if (
                    response ===
                    "Wrong Track"
                ) {

                    wrong +=
                        1;

                }

            }
        );


    const total =
        right +
        wrong;


    const rightPercent =
        total > 0
            ? Math.round(
                (
                    right /
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


    setFillWidth(
        "directionRightFill",
        rightPercent
    );


    setFillWidth(
        "directionWrongFill",
        wrongPercent
    );


    setText(
        "directionParticipation",
        total > 0
            ? `${total} total response${total === 1 ? "" : "s"}.`
            : "Awaiting responses."
    );


    setText(
        "pulseDirectionSummary",
        total > 0
            ? `${rightPercent}% right direction`
            : "Awaiting responses"
    );

}


/*
==================================================
DIRECTION BUTTON STATE
==================================================
*/

function restoreDirectionSelection() {

    const selectedVote =
        getStoredValue(
            directionSelectionStorageKey
        );


    document
        .querySelectorAll(
            "[data-direction-vote]"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "is-selected",
                    button.dataset.directionVote ===
                    selectedVote
                );

            }
        );

}


function setDirectionButtonsDisabled(
    disabled
) {

    document
        .querySelectorAll(
            "[data-direction-vote]"
        )
        .forEach(
            button => {

                button.disabled =
                    disabled;

            }
        );

}


/*
==================================================
CONFIDENCE SURVEY INTERACTIONS
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


    document
        .getElementById(
            "confidenceSubmitButton"
        )
        ?.addEventListener(
            "click",
            submitConfidenceSurvey
        );

}


/*
==================================================
SUBMIT CONFIDENCE SURVEY
==================================================
*/

async function submitConfidenceSurvey() {

    const ratings =
        {};


    let completed =
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


                completed +=
                    1;

            }
        );


    if (
        completed !==
        6
    ) {

        setText(
            "confidenceSurveyMessage",
            "Please rate all six areas before saving."
        );


        return;

    }


    const submitButton =
        document.getElementById(
            "confidenceSubmitButton"
        );


    if (submitButton) {

        submitButton.disabled =
            true;

    }


    setText(
        "confidenceSurveyMessage",
        "Saving your ratings..."
    );


    try {

        await submitNationalConfidence(
            ratings,
            getParticipantId()
        );


        setStoredValue(
            confidenceSelectionStorageKey,
            JSON.stringify(
                ratings
            )
        );


        setText(
            "confidenceSurveyMessage",
            "Your confidence ratings have been recorded."
        );

    } catch (error) {

        console.error(
            "Confidence ratings could not be saved:",
            error
        );


        setText(
            "confidenceSurveyMessage",
            "Your ratings could not be saved. Please try again."
        );

    } finally {

        if (submitButton) {

            submitButton.disabled =
                false;

        }

    }

}


/*
==================================================
LIVE CONFIDENCE RESULTS
==================================================
*/

function renderConfidenceTracker() {

    const categories = [

        "government",
        "congress",
        "court",
        "economy",
        "media",
        "democracy"

    ];


    const totals =
        {

            government: 0,
            congress: 0,
            court: 0,
            economy: 0,
            media: 0,
            democracy: 0

        };


    const counts =
        {

            government: 0,
            congress: 0,
            court: 0,
            economy: 0,
            media: 0,
            democracy: 0

        };


    pulseState.confidenceResponses
        .forEach(
            record => {

                const ratings =
                    record.ratings;


                if (
                    !ratings ||
                    typeof ratings !==
                    "object"
                ) {

                    return;

                }


                categories.forEach(
                    category => {

                        const value =
                            Number(
                                ratings[
                                    category
                                ]
                            );


                        if (
                            value >
                            0
                        ) {

                            totals[
                                category
                            ] +=
                                value;


                            counts[
                                category
                            ] +=
                                1;

                        }

                    }
                );

            }
        );


    const averages =
        {};


    categories.forEach(
        category => {

            averages[
                category
            ] =
                counts[
                    category
                ] > 0
                    ? Math.round(
                        totals[
                            category
                        ] /
                        counts[
                            category
                        ]
                    )
                    : 0;

        }
    );


    updateConfidenceMetric(
        "confidenceGovernmentValue",
        "confidenceGovernmentFill",
        averages.government
    );


    updateConfidenceMetric(
        "confidenceCongressValue",
        "confidenceCongressFill",
        averages.congress
    );


    updateConfidenceMetric(
        "confidenceCourtValue",
        "confidenceCourtFill",
        averages.court
    );


    updateConfidenceMetric(
        "confidenceEconomyValue",
        "confidenceEconomyFill",
        averages.economy
    );


    updateConfidenceMetric(
        "confidenceMediaValue",
        "confidenceMediaFill",
        averages.media
    );


    updateConfidenceMetric(
        "confidenceDemocracyValue",
        "confidenceDemocracyFill",
        averages.democracy
    );


    renderConfidenceSnapshot(
        averages,
        counts
    );

}


/*
==================================================
CONFIDENCE SNAPSHOT
==================================================
*/

function renderConfidenceSnapshot(
    averages,
    counts
) {

    if (
        counts.economy >
        0
    ) {

        setText(
            "pulseEconomySummary",
            `${averages.economy}% confidence`
        );

    } else {

        setText(
            "pulseEconomySummary",
            "Awaiting responses"
        );

    }


    const institutionCategories = [

        "government",
        "congress",
        "court",
        "media",
        "democracy"

    ];


    const availableValues =
        institutionCategories
            .filter(
                category =>
                    counts[
                        category
                    ] > 0
            )
            .map(
                category =>
                    averages[
                        category
                    ]
            );


    if (
        availableValues.length >
        0
    ) {

        const average =
            Math.round(
                availableValues.reduce(
                    (
                        total,
                        value
                    ) =>
                        total +
                        value,
                    0
                ) /
                availableValues.length
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
CONFIDENCE DISPLAY HELPER
==================================================
*/

function updateConfidenceMetric(
    valueId,
    fillId,
    value
) {

    setText(
        valueId,
        value > 0
            ? `${value}%`
            : "—"
    );


    setFillWidth(
        fillId,
        value
    );

}


/*
==================================================
RESTORE CONFIDENCE SELECTION
==================================================
*/

function restoreConfidenceSelections() {

    const stored =
        getStoredValue(
            confidenceSelectionStorageKey
        );


    if (!stored) {

        return;

    }


    let ratings;


    try {

        ratings =
            JSON.parse(
                stored
            );

    } catch (error) {

        return;

    }


    Object.entries(
        ratings
    )
    .forEach(
        ([category, value]) => {

            const group =
                document.querySelector(
                    `[data-confidence-group="${category}"]`
                );


            if (!group) {

                return;

            }


            group
                .querySelectorAll(
                    "[data-confidence-value]"
                )
                .forEach(
                    button => {

                        button.classList.toggle(
                            "is-selected",
                            Number(
                                button.dataset.confidenceValue
                            ) ===
                            Number(
                                value
                            )
                        );

                    }
                );


            setText(
                getConfidenceUserValueId(
                    category
                ),
                getConfidenceLabel(
                    Number(
                        value
                    )
                )
            );

        }
    );

}


/*
==================================================
RESTORE ALL LOCAL SELECTIONS
==================================================
*/

function restoreLocalSelections() {

    restoreApprovalSelection();


    restoreDirectionSelection();


    restoreConfidenceSelections();

}


/*
==================================================
CONFIDENCE LABELS
==================================================
*/

function getConfidenceLabel(
    value
) {

    const labels = {

        20:
            "Very Low",

        40:
            "Low",

        60:
            "Moderate",

        80:
            "High",

        100:
            "Very High"

    };


    return (
        labels[
            value
        ] ||
        "Not rated"
    );

}


/*
==================================================
CONFIDENCE USER LABEL IDS
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


    return ids[
        groupName
    ];

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


    if (!element) {

        return;

    }


    const normalized =
        Math.max(
            0,
            Math.min(
                100,
                Number(
                    percent
                ) || 0
            )
        );


    element.style.width =
        `${normalized}%`;

}


/*
==================================================
LOCAL STORAGE
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
            "Local Civic Pulse data could not be read:",
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
            "Local Civic Pulse data could not be saved:",
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
DOM HELPER
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


    if (
        element
    ) {

        element.textContent =
            String(
                value
            );

    }

}


/*
==================================================
START
==================================================
*/

initializeCivicPulsePage();