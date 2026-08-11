/*
==================================================
CIVIC HORIZON INDEX V2
ADMIN OVERVIEW CONTROLLER
==================================================
*/


import {
    subscribeToSnapshotSummary
} from "../services/snapshot-service.js";


import {
    subscribeToNationalPrioritySummary
} from "../services/priority-service.js";


import {
    subscribeToPresidentialApprovalSummary
} from "../services/pulse-service.js";


import {

    subscribeToPresidentialApproval,

    subscribeToCountryDirection,

    subscribeToNationalConfidence

} from "../services/firebase-service.js";


import {
    saveCivicPulseDailySnapshot
} from "../services/civic-pulse-history-service.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let controllerInitialized =
    false;


let unsubscribeSnapshotSummary =
    null;


let unsubscribePrioritySummary =
    null;


let unsubscribeApprovalSummary =
    null;


let unsubscribePulseApproval =
    null;


let unsubscribePulseDirection =
    null;


let unsubscribePulseConfidence =
    null;


const pulseSnapshotState = {

    approvalResponses: [],

    directionResponses: [],

    confidenceResponses: []

};


/*
==================================================
PUBLIC INITIALIZATION
==================================================
*/

export function initializeAdminOverviewController() {

    if (
        controllerInitialized
    ) {

        return;

    }


    controllerInitialized =
        true;


    subscribeToCommunityData();

    subscribeToPriorityData();

    subscribeToApprovalData();

    subscribeToCivicPulseSnapshotData();

    initializeSnapshotButton();

}


/*
==================================================
COMMUNITY DATA
==================================================
*/

function subscribeToCommunityData() {

    unsubscribeSnapshotSummary =
        subscribeToSnapshotSummary(

            summary => {

                setText(
                    "adminActivePollCount",
                    formatNumber(
                        summary?.activePollCount
                    )
                );


                setText(
                    "adminCommunityVoteCount",
                    formatNumber(
                        summary?.communityVoteCount
                    )
                );

            },

            error => {

                console.error(
                    "Admin community overview error:",
                    error
                );


                setText(
                    "adminActivePollCount",
                    "—"
                );


                setText(
                    "adminCommunityVoteCount",
                    "—"
                );

            }

        );

}


/*
==================================================
NATIONAL PRIORITIES DATA
==================================================
*/

function subscribeToPriorityData() {

    unsubscribePrioritySummary =
        subscribeToNationalPrioritySummary(

            summary => {

                setText(
                    "adminPriorityParticipantCount",
                    formatNumber(
                        summary?.participantCount
                    )
                );

            },

            error => {

                console.error(
                    "Admin priority overview error:",
                    error
                );


                setText(
                    "adminPriorityParticipantCount",
                    "—"
                );

            }

        );

}


/*
==================================================
PRESIDENTIAL APPROVAL OVERVIEW DATA
==================================================
*/

function subscribeToApprovalData() {

    unsubscribeApprovalSummary =
        subscribeToPresidentialApprovalSummary(

            summary => {

                setText(
                    "adminApprovalResponseCount",
                    formatNumber(
                        summary?.totalResponses
                    )
                );

            },

            error => {

                console.error(
                    "Admin approval overview error:",
                    error
                );


                setText(
                    "adminApprovalResponseCount",
                    "—"
                );

            }

        );

}


/*
==================================================
CIVIC PULSE SNAPSHOT DATA
==================================================
*/

function subscribeToCivicPulseSnapshotData() {

    unsubscribePulseApproval =
        subscribeToPresidentialApproval(

            responses => {

                pulseSnapshotState
                    .approvalResponses =
                        Array.isArray(
                            responses
                        )
                            ? responses
                            : [];


                renderSnapshotPreview();

            },

            error => {

                console.error(
                    "Admin Civic Pulse approval error:",
                    error
                );

            }

        );


    unsubscribePulseDirection =
        subscribeToCountryDirection(

            responses => {

                pulseSnapshotState
                    .directionResponses =
                        Array.isArray(
                            responses
                        )
                            ? responses
                            : [];


                renderSnapshotPreview();

            },

            error => {

                console.error(
                    "Admin Civic Pulse direction error:",
                    error
                );

            }

        );


    unsubscribePulseConfidence =
        subscribeToNationalConfidence(

            responses => {

                pulseSnapshotState
                    .confidenceResponses =
                        Array.isArray(
                            responses
                        )
                            ? responses
                            : [];


                renderSnapshotPreview();

            },

            error => {

                console.error(
                    "Admin Civic Pulse confidence error:",
                    error
                );

            }

        );

}


/*
==================================================
SNAPSHOT PREVIEW
==================================================
*/

function renderSnapshotPreview() {

    const snapshot =
        calculateCurrentPulseSnapshot();


    setText(
        "adminSnapshotApproval",
        snapshot.approvalResponses > 0
            ? `${snapshot.presidentialApproval}%`
            : "—"
    );


    setText(
        "adminSnapshotDirection",
        snapshot.directionResponses > 0
            ? `${snapshot.countryDirection}%`
            : "—"
    );


    setText(
        "adminSnapshotEconomy",
        snapshot.confidenceResponses > 0
            ? `${snapshot.economicConfidence}%`
            : "—"
    );


    setText(
        "adminSnapshotInstitutions",
        snapshot.confidenceResponses > 0
            ? `${snapshot.institutionalConfidence}%`
            : "—"
    );

}


/*
==================================================
CALCULATE CURRENT CIVIC PULSE SNAPSHOT
==================================================
*/

function calculateCurrentPulseSnapshot() {

    const approval =
        calculateApproval();


    const direction =
        calculateDirection();


    const confidence =
        calculateConfidence();


    return {

        presidentialApproval:
            approval.percent,

        countryDirection:
            direction.percent,

        economicConfidence:
            confidence.economy,

        institutionalConfidence:
            confidence.institutions,

        approvalResponses:
            approval.total,

        directionResponses:
            direction.total,

        confidenceResponses:
            confidence.total

    };

}


/*
==================================================
CALCULATE PRESIDENTIAL APPROVAL
==================================================
*/

function calculateApproval() {

    let approve =
        0;


    let disapprove =
        0;


    pulseSnapshotState
        .approvalResponses
        .forEach(
            record => {

                const response =
                    String(
                        record?.response ||
                        ""
                    );


                if (
                    response ===
                        "Approve" ||
                    response ===
                        "Strongly Approve"
                ) {

                    approve +=
                        1;

                }


                if (
                    response ===
                        "Disapprove" ||
                    response ===
                        "Strongly Disapprove"
                ) {

                    disapprove +=
                        1;

                }

            }
        );


    const total =
        approve +
        disapprove;


    const percent =
        total > 0
            ? Math.round(
                (
                    approve /
                    total
                ) * 100
            )
            : 0;


    return {

        percent,

        total

    };

}


/*
==================================================
CALCULATE COUNTRY DIRECTION
==================================================
*/

function calculateDirection() {

    let rightDirection =
        0;


    let wrongTrack =
        0;


    pulseSnapshotState
        .directionResponses
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

                    rightDirection +=
                        1;

                }


                if (
                    response ===
                    "Wrong Track"
                ) {

                    wrongTrack +=
                        1;

                }

            }
        );


    const total =
        rightDirection +
        wrongTrack;


    const percent =
        total > 0
            ? Math.round(
                (
                    rightDirection /
                    total
                ) * 100
            )
            : 0;


    return {

        percent,

        total

    };

}


/*
==================================================
CALCULATE NATIONAL CONFIDENCE
==================================================
*/

function calculateConfidence() {

    const categories = [

        "government",
        "congress",
        "court",
        "economy",
        "media",
        "democracy"

    ];


    const totals = {

        government: 0,
        congress: 0,
        court: 0,
        economy: 0,
        media: 0,
        democracy: 0

    };


    const counts = {

        government: 0,
        congress: 0,
        court: 0,
        economy: 0,
        media: 0,
        democracy: 0

    };


    pulseSnapshotState
        .confidenceResponses
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


    const institutionCategories = [

        "government",
        "congress",
        "court",
        "media",
        "democracy"

    ];


    const institutionValues =
        institutionCategories
            .map(
                category =>
                    averages[
                        category
                    ]
            )
            .filter(
                value =>
                    value > 0
            );


    const institutionalAverage =
        institutionValues.length > 0
            ? Math.round(
                institutionValues.reduce(
                    (
                        total,
                        value
                    ) =>
                        total +
                        value,
                    0
                ) /
                institutionValues.length
            )
            : 0;


    return {

        economy:
            averages.economy,

        institutions:
            institutionalAverage,

        total:
            pulseSnapshotState
                .confidenceResponses
                .length

    };

}


/*
==================================================
SNAPSHOT BUTTON
==================================================
*/

function initializeSnapshotButton() {

    const button =
        document.getElementById(
            "captureCivicPulseSnapshotButton"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        captureTodaySnapshot
    );

}


/*
==================================================
CAPTURE TODAY'S SNAPSHOT
==================================================
*/

async function captureTodaySnapshot() {

    const button =
        document.getElementById(
            "captureCivicPulseSnapshotButton"
        );


    const snapshot =
        calculateCurrentPulseSnapshot();


    if (
        snapshot.approvalResponses ===
            0 &&
        snapshot.directionResponses ===
            0 &&
        snapshot.confidenceResponses ===
            0
    ) {

        setText(
            "adminSnapshotMessage",
            "There are no Civic Pulse responses to capture yet."
        );


        return;

    }


    if (button) {

        button.disabled =
            true;

    }


    setText(
        "adminSnapshotMessage",
        "Saving today's Civic Pulse snapshot..."
    );


    try {

        const savedSnapshot =
            await saveCivicPulseDailySnapshot(
                snapshot
            );


        setText(
            "adminSnapshotMessage",
            `Snapshot saved for ${savedSnapshot.date}.`
        );

    } catch (error) {

        console.error(
            "Civic Pulse snapshot could not be saved:",
            error
        );


        setText(
            "adminSnapshotMessage",
            "The snapshot could not be saved. Make sure you are signed in as the authorized administrator."
        );

    } finally {

        if (button) {

            button.disabled =
                false;

        }

    }

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
        String(
            value
        );

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
CLEANUP
==================================================
*/

export function destroyAdminOverviewController() {

    if (
        typeof unsubscribeSnapshotSummary ===
        "function"
    ) {

        unsubscribeSnapshotSummary();

    }


    if (
        typeof unsubscribePrioritySummary ===
        "function"
    ) {

        unsubscribePrioritySummary();

    }


    if (
        typeof unsubscribeApprovalSummary ===
        "function"
    ) {

        unsubscribeApprovalSummary();

    }


    if (
        typeof unsubscribePulseApproval ===
        "function"
    ) {

        unsubscribePulseApproval();

    }


    if (
        typeof unsubscribePulseDirection ===
        "function"
    ) {

        unsubscribePulseDirection();

    }


    if (
        typeof unsubscribePulseConfidence ===
        "function"
    ) {

        unsubscribePulseConfidence();

    }


    unsubscribeSnapshotSummary =
        null;


    unsubscribePrioritySummary =
        null;


    unsubscribeApprovalSummary =
        null;


    unsubscribePulseApproval =
        null;


    unsubscribePulseDirection =
        null;


    unsubscribePulseConfidence =
        null;


    controllerInitialized =
        false;

}