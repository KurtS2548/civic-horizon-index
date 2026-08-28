import {
    subscribeToCountryDirection,
    subscribeToNationalConfidence,
    submitCountryDirection,
    submitNationalConfidence,
    getMonthlyParticipationStatus,
    getMonthlyParticipationMessage,
    getWeeklyParticipationStatus,
    getWeeklyParticipationMessage,
    getCurrentVotingPeriod,
    getCurrentVotingPeriodLabel,
    getCurrentWeeklyVotingPeriod,
    getCurrentWeeklyVotingPeriodLabel
} from "./services/firebase-service.js";

import {
    subscribeToCivicPulseHistory
} from "./services/civic-pulse-history-service.js";

import {
    subscribeToAuthState,
    refreshCurrentUser,
    getCurrentUserVotingEligibility
} from "./services/auth-service.js";


const participantIdStorageKey =
    "civicPulseParticipantId";


function getDirectionSelectionStorageKey() {

    return (
        `civicPulseUserDirectionVote-${getCurrentWeeklyVotingPeriod()}`
    );

}


function getConfidenceSelectionStorageKey() {

    return (
        `civicPulseConfidenceRatings-${getCurrentVotingPeriod()}`
    );

}


const pulseState = {

    directionResponses:
        [],

    confidenceResponses:
        [],

    history:
        [],

    votingAccess: {

        countryDirection:
            null,

        nationalConfidence:
            null

    }

};


let unsubscribeAuthState =
    null;


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

    initializeDirectionVoting();

    initializeConfidenceVoting();

    restoreLocalSelections();

    initializeLiveSubscriptions();

    initializeHistorySubscription();

    initializeCivicPulseVotingAccess();

}


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


function initializeLiveSubscriptions() {

    subscribeToCountryDirection(

        responses => {

            pulseState.directionResponses =
                Array.isArray(
                    responses
                )
                    ? responses
                    : [];


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
                Array.isArray(
                    responses
                )
                    ? responses
                    : [];


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


function initializeHistorySubscription() {

    subscribeToCivicPulseHistory(

        history => {

            pulseState.history =
                Array.isArray(
                    history
                )
                    ? history
                    : [];


            renderCivicPulseHistory();

        },

        error => {

            console.error(
                "Civic Pulse history could not be loaded:",
                error
            );


            renderHistoryUnavailable();

        }

    );

}


function initializeCivicPulseVotingAccess() {

    setAllCivicPulseVotingDisabled(
        true
    );


    setText(
        "directionVoteMessage",
        "Checking your participation access..."
    );


    setText(
        "confidenceSurveyMessage",
        "Checking your participation access..."
    );


    unsubscribeAuthState =
        subscribeToAuthState(

            async user => {

                if (!user) {

                    setAllCivicPulseVotingDisabled(
                        true
                    );


                    setCivicPulseBlockedMessages(
                        "signedOut"
                    );


                    return;

                }


                try {

                    const refreshedUser =
                        await refreshCurrentUser();


                    if (!refreshedUser) {

                        setAllCivicPulseVotingDisabled(
                            true
                        );


                        setCivicPulseBlockedMessages(
                            "signedOut"
                        );


                        return;

                    }


                    await refreshAllCivicPulseVotingAccess();

                } catch (error) {

                    console.error(
                        "Civic Pulse auth initialization failed:",
                        error
                    );


                    setAllCivicPulseVotingDisabled(
                        true
                    );


                    setCivicPulseBlockedMessages(
                        "accessCheckFailed"
                    );

                }

            },

            error => {

                console.error(
                    "Civic Pulse auth state error:",
                    error
                );


                setAllCivicPulseVotingDisabled(
                    true
                );


                setCivicPulseBlockedMessages(
                    "accessCheckFailed"
                );

            }

        );

}


async function refreshAllCivicPulseVotingAccess() {

    const eligibility =
        await getCurrentUserVotingEligibility();


    if (
        !eligibility?.eligible
    ) {

        setAllCivicPulseVotingDisabled(
            true
        );


        setCivicPulseBlockedMessages(
            eligibility?.reason
        );


        return;

    }


    const results =
        await Promise.all([

            getWeeklyParticipationStatus(
                "countryDirection"
            ),

            getMonthlyParticipationStatus(
                "nationalConfidence"
            )

        ]);


    pulseState.votingAccess.countryDirection =
        results[0];


    pulseState.votingAccess.nationalConfidence =
        results[1];


    applyDirectionWeeklyAccess(
        results[0]
    );


    applyConfidenceMonthlyAccess(
        results[1]
    );

}


function applyDirectionWeeklyAccess(
    status
) {

    const eligible =
        status?.eligible ===
        true;


    setDirectionButtonsDisabled(
        !eligible
    );


    if (
        status?.reason ===
        "alreadyParticipatedThisWeek"
    ) {

        setText(
            "directionVoteMessage",
            getWeeklyParticipationMessage(
                status
            )
        );


        return;

    }


    if (eligible) {

        setText(
            "directionVoteMessage",
            `Voting is open for ${getCurrentWeeklyVotingPeriodLabel()}.`
        );


        return;

    }


    setText(
        "directionVoteMessage",
        getWeeklyParticipationMessage(
            status
        )
    );

}


function applyConfidenceMonthlyAccess(
    status
) {

    const eligible =
        status?.eligible ===
        true;


    setConfidenceControlsDisabled(
        !eligible
    );


    if (
        status?.reason ===
        "alreadyParticipatedThisMonth"
    ) {

        setText(
            "confidenceSurveyMessage",
            getMonthlyParticipationMessage(
                status
            )
        );


        return;

    }


    if (eligible) {

        setText(
            "confidenceSurveyMessage",
            `Voting is open for ${getCurrentVotingPeriodLabel()}.`
        );


        return;

    }


    setText(
        "confidenceSurveyMessage",
        getMonthlyParticipationMessage(
            status
        )
    );

}


async function confirmCivicPulseVotingEligibility(
    tracker,
    messageElementId
) {

    try {

        const eligibility =
            await getCurrentUserVotingEligibility();


        if (
            !eligibility?.eligible
        ) {

            setText(
                messageElementId,
                getCivicPulseEligibilityMessage(
                    eligibility?.reason
                )
            );


            return false;

        }


        const isWeeklyTracker =
            tracker ===
            "countryDirection";


        const participationStatus =
            isWeeklyTracker
                ? await getWeeklyParticipationStatus(
                    tracker
                )
                : await getMonthlyParticipationStatus(
                    tracker
                );


        pulseState.votingAccess[
            tracker
        ] =
            participationStatus;


        if (
            !participationStatus?.eligible
        ) {

            setText(
                messageElementId,
                isWeeklyTracker
                    ? getWeeklyParticipationMessage(
                        participationStatus
                    )
                    : getMonthlyParticipationMessage(
                        participationStatus
                    )
            );


            return false;

        }


        return true;

    } catch (error) {

        console.error(
            `${tracker} voting eligibility check failed:`,
            error
        );


        setText(
            messageElementId,
            getCivicPulseEligibilityMessage(
                "accessCheckFailed"
            )
        );


        return false;

    }

}


function setAllCivicPulseVotingDisabled(
    disabled
) {

    setDirectionButtonsDisabled(
        disabled
    );


    setConfidenceControlsDisabled(
        disabled
    );

}


function setConfidenceControlsDisabled(
    disabled
) {

    document
        .querySelectorAll(
            "[data-confidence-value]"
        )
        .forEach(
            button => {

                button.disabled =
                    disabled;

            }
        );


    const submitButton =
        document.getElementById(
            "confidenceSubmitButton"
        );


    if (
        submitButton
    ) {

        submitButton.disabled =
            disabled;

    }

}


function setCivicPulseBlockedMessages(
    reason
) {

    const message =
        getCivicPulseEligibilityMessage(
            reason
        );


    setText(
        "directionVoteMessage",
        message
    );


    setText(
        "confidenceSurveyMessage",
        message
    );

}


function getCivicPulseEligibilityMessage(
    reason
) {

    switch (
        reason
    ) {

        case "signedOut":

            return "Sign in to participate in Civic Pulse.";


        case "emailNotVerified":

            return "Verify your email before participating in Civic Pulse.";


        case "zipMissing":

            return "Add a valid ZIP code to your profile before participating.";


        case "birthdayMissing":

            return "Your birthday is required before participating.";


        case "underMinimumAge":

            return "This account is not eligible to participate.";


        case "agreementMissing":

            return "The participation agreement must be accepted before voting.";


        case "verificationSyncPending":

            return "Your account verification is still being finalized. Please try again.";


        case "profileMissing":

            return "Your participant profile could not be loaded.";


        case "accessCheckFailed":

            return "Voting access could not be confirmed. Please sign in again.";


        default:

            return "Your account is not currently eligible to participate.";

    }

}


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


                        const eligible =
                            await confirmCivicPulseVotingEligibility(
                                "countryDirection",
                                "directionVoteMessage"
                            );


                        if (!eligible) {

                            applyDirectionWeeklyAccess(
                                pulseState.votingAccess
                                    .countryDirection
                            );


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
                                getDirectionSelectionStorageKey(),
                                vote
                            );


                            restoreDirectionSelection();


                            const weeklyStatus =
                                await getWeeklyParticipationStatus(
                                    "countryDirection"
                                );


                            pulseState.votingAccess
                                .countryDirection =
                                weeklyStatus;


                            applyDirectionWeeklyAccess(
                                weeklyStatus
                            );

                        } catch (error) {

                            console.error(
                                "Country Direction response could not be saved:",
                                error
                            );


                            if (
                                error?.code ===
                                "already-participated-this-week"
                            ) {

                                const weeklyStatus =
                                    await getWeeklyParticipationStatus(
                                        "countryDirection"
                                    );


                                pulseState.votingAccess
                                    .countryDirection =
                                    weeklyStatus;


                                applyDirectionWeeklyAccess(
                                    weeklyStatus
                                );


                                return;

                            }


                            setText(
                                "directionVoteMessage",
                                error?.message ||
                                "Your response could not be saved. Please try again."
                            );


                            const weeklyStatus =
                                await getWeeklyParticipationStatus(
                                    "countryDirection"
                                );


                            pulseState.votingAccess
                                .countryDirection =
                                weeklyStatus;


                            applyDirectionWeeklyAccess(
                                weeklyStatus
                            );

                        }

                    }
                );

            }
        );

}


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
                        record?.response ||
                        ""
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
            : "No data yet."
    );


    setText(
        "pulseDirectionSummary",
        total > 0
            ? `${rightPercent}% right direction`
            : "No data yet."
    );

}


function restoreDirectionSelection() {

    const selectedVote =
        getStoredValue(
            getDirectionSelectionStorageKey()
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


                        if (
                            button.disabled
                        ) {

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


                        const category =
                            group.dataset.confidenceGroup;


                        const value =
                            Number(
                                button.dataset.confidenceValue
                            );


                        setText(
                            getConfidenceUserValueId(
                                category
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


async function submitConfidenceSurvey() {

    const eligible =
        await confirmCivicPulseVotingEligibility(
            "nationalConfidence",
            "confidenceSurveyMessage"
        );


    if (!eligible) {

        applyConfidenceMonthlyAccess(
            pulseState.votingAccess
                .nationalConfidence
        );


        return;

    }


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


    setConfidenceControlsDisabled(
        true
    );


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
            getConfidenceSelectionStorageKey(),
            JSON.stringify(
                ratings
            )
        );


        restoreConfidenceSelections();


        const monthlyStatus =
            await getMonthlyParticipationStatus(
                "nationalConfidence"
            );


        pulseState.votingAccess
            .nationalConfidence =
            monthlyStatus;


        applyConfidenceMonthlyAccess(
            monthlyStatus
        );

    } catch (error) {

        console.error(
            "Confidence ratings could not be saved:",
            error
        );


        if (
            error?.code ===
            "already-participated-this-month"
        ) {

            const monthlyStatus =
                await getMonthlyParticipationStatus(
                    "nationalConfidence"
                );


            pulseState.votingAccess
                .nationalConfidence =
                monthlyStatus;


            applyConfidenceMonthlyAccess(
                monthlyStatus
            );


            return;

        }


        setText(
            "confidenceSurveyMessage",
            error?.message ||
            "Your ratings could not be saved. Please try again."
        );


        const monthlyStatus =
            await getMonthlyParticipationStatus(
                "nationalConfidence"
            );


        pulseState.votingAccess
            .nationalConfidence =
            monthlyStatus;


        applyConfidenceMonthlyAccess(
            monthlyStatus
        );

    }

}


function renderConfidenceTracker() {

    const categories = [

        "government",

        "congress",

        "court",

        "economy",

        "media",

        "democracy"

    ];


    const totals = {

        government:
            0,

        congress:
            0,

        court:
            0,

        economy:
            0,

        media:
            0,

        democracy:
            0

    };


    const counts = {

        government:
            0,

        congress:
            0,

        court:
            0,

        economy:
            0,

        media:
            0,

        democracy:
            0

    };


    pulseState.confidenceResponses
        .forEach(
            record => {

                const ratings =
                    record?.ratings;


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
                            Number.isFinite(
                                value
                            ) &&
                            value > 0
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
            "No data yet"
        );

    }


    const institutionCategories = [

        "government",

        "congress",

        "court",

        "media",

        "democracy"

    ];


    const values =
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
        values.length >
        0
    ) {

        const average =
            Math.round(
                values.reduce(
                    (
                        total,
                        value
                    ) =>
                        total +
                        value,
                    0
                ) /
                values.length
            );


        setText(
            "pulseInstitutionSummary",
            `${average}% average confidence`
        );

    } else {

        setText(
            "pulseInstitutionSummary",
            "No data yet"
        );

    }

}


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


function restoreConfidenceSelections() {

    const stored =
        getStoredValue(
            getConfidenceSelectionStorageKey()
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


function getConfidenceUserValueId(
    category
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
        category
    ];

}


function restoreLocalSelections() {

    restoreDirectionSelection();

    restoreConfidenceSelections();

}


function renderCivicPulseHistory() {

    const history =
        pulseState.history;


    const confidenceContainer =
        document.querySelector(
            ".civic-pulse-trend-card .civic-pulse-trend-placeholder"
        );


    if (
        history.length ===
        0
    ) {

        if (
            confidenceContainer
        ) {

            confidenceContainer.innerHTML = `
                <div class="civic-pulse-history-empty">

                    <strong>
                        Building the trend
                    </strong>

                    <p>
                        National Confidence history will appear as daily
                        Civic Pulse snapshots are collected.
                    </p>

                </div>
            `;

        }


        return;

    }


    renderConfidenceHistory(
        confidenceContainer,
        history
    );

}


function renderConfidenceHistory(
    container,
    history
) {

    if (!container) {

        return;

    }


    const recentHistory =
        history.slice(
            -14
        );


    container.innerHTML =
        recentHistory
            .map(
                record => {

                    const value =
                        clampPercent(
                            record.institutionalConfidence
                        );


                    return `
                        <div class="civic-pulse-history-row">

                            <span class="civic-pulse-history-date">
                                ${escapeHtml(
                                    formatHistoryDate(
                                        record.date
                                    )
                                )}
                            </span>

                            <div class="civic-pulse-history-track">

                                <div
                                    class="civic-pulse-history-fill"
                                    style="width: ${value}%;"
                                ></div>

                            </div>

                            <strong>
                                ${value}%
                            </strong>

                        </div>
                    `;

                }
            )
            .join("");

}


function renderHistoryUnavailable() {

    document
        .querySelectorAll(
            ".civic-pulse-trend-placeholder"
        )
        .forEach(
            element => {

                element.innerHTML = `
                    <div class="civic-pulse-history-empty">

                        <strong>
                            History unavailable
                        </strong>

                        <p>
                            Civic Pulse trend history could not be loaded
                            right now.
                        </p>

                    </div>
                `;

            }
        );

}


function formatHistoryDate(
    value
) {

    if (!value) {

        return "Unknown";

    }


    const date =
        new Date(
            `${value}T00:00:00`
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return String(
            value
        );

    }


    return date
        .toLocaleDateString(
            undefined,
            {

                month:
                    "short",

                day:
                    "numeric"

            }
        );

}


function clampPercent(
    value
) {

    return Math.max(
        0,
        Math.min(
            100,
            Math.round(
                Number(
                    value
                ) || 0
            )
        )
    );

}


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


    element.style.width =
        `${clampPercent(
            percent
        )}%`;

}


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

}


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


function cleanupCivicPulsePage() {

    if (
        typeof unsubscribeAuthState ===
        "function"
    ) {

        unsubscribeAuthState();

    }


    unsubscribeAuthState =
        null;

}


window.addEventListener(
    "pagehide",
    cleanupCivicPulsePage
);


initializeCivicPulsePage();
