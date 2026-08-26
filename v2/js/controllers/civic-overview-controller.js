/*
==================================================
CIVIC HORIZON INDEX V2
HOMEPAGE CIVIC OVERVIEW CONTROLLER
==================================================
*/

import {
    subscribeToCountryDirection,
    subscribeToNationalConfidence
} from "../services/firebase-service.js";


let civicOverviewControllerInitialized =
    false;

let unsubscribeCountryDirection =
    null;

let unsubscribeNationalConfidence =
    null;


/*
==================================================
INITIALIZE
==================================================
*/

export function initializeCivicOverviewController() {

    if (
        civicOverviewControllerInitialized
    ) {

        return;

    }


    civicOverviewControllerInitialized =
        true;


    unsubscribeCountryDirection =
        subscribeToCountryDirection(

            responses => {

                renderCountryDirection(
                    responses
                );

            },

            error => {

                console.error(
                    "Homepage Country Direction error:",
                    error
                );


                setText(
                    "homeCountryDirection",
                    "Unavailable"
                );

            }

        );


    unsubscribeNationalConfidence =
        subscribeToNationalConfidence(

            responses => {

                renderNationalConfidence(
                    responses
                );

            },

            error => {

                console.error(
                    "Homepage National Confidence error:",
                    error
                );


                setText(
                    "homeNationalConfidence",
                    "Unavailable"
                );

            }

        );

}


/*
==================================================
COUNTRY DIRECTION
==================================================
*/

function renderCountryDirection(
    responses
) {

    const records =
        Array.isArray(
            responses
        )
            ? responses
            : [];


    let rightDirection =
        0;

    let wrongTrack =
        0;


    records.forEach(
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


    if (
        total ===
        0
    ) {

        setText(
            "homeCountryDirection",
            "Awaiting responses"
        );


        return;

    }


    const percentage =
        Math.round(
            (
                rightDirection /
                total
            ) *
            100
        );


    setText(
        "homeCountryDirection",
        `${percentage}% right direction`
    );

}


/*
==================================================
NATIONAL CONFIDENCE
==================================================
*/

function renderNationalConfidence(
    responses
) {

    const records =
        Array.isArray(
            responses
        )
            ? responses
            : [];


    const categories = [

        "government",
        "congress",
        "court",
        "economy",
        "media",
        "democracy"

    ];


    let total =
        0;

    let count =
        0;


    records.forEach(
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

                        total +=
                            value;

                        count +=
                            1;

                    }

                }
            );

        }
    );


    if (
        count ===
        0
    ) {

        setText(
            "homeNationalConfidence",
            "Awaiting responses"
        );


        return;

    }


    const average =
        Math.round(
            total /
            count
        );


    setText(
        "homeNationalConfidence",
        `${average}% average confidence`
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
CLEANUP
==================================================
*/

export function destroyCivicOverviewController() {

    if (
        typeof unsubscribeCountryDirection ===
        "function"
    ) {

        unsubscribeCountryDirection();

    }


    if (
        typeof unsubscribeNationalConfidence ===
        "function"
    ) {

        unsubscribeNationalConfidence();

    }


    unsubscribeCountryDirection =
        null;

    unsubscribeNationalConfidence =
        null;

    civicOverviewControllerInitialized =
        false;

}