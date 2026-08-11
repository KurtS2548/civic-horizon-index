/*
==================================================
CIVIC HORIZON INDEX V2
CIVIC PULSE HISTORY SERVICE
==================================================
*/


import {
    database
} from "../../../js/firebase.js";


import {
    ref,
    onValue,
    set,
    get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/*
==================================================
HISTORY REFERENCES
==================================================
*/

const civicPulseHistoryRef =
    ref(
        database,
        "civicPulse/history"
    );


/*
==================================================
DATE HELPERS
==================================================
*/

function getDateKey(
    date = new Date()
) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}`;

}


/*
==================================================
SAVE DAILY SNAPSHOT
==================================================
*/

export async function saveCivicPulseDailySnapshot(
    snapshotData,
    date = new Date()
) {

    if (
        !snapshotData ||
        typeof snapshotData !== "object"
    ) {

        throw new Error(
            "Valid Civic Pulse snapshot data is required."
        );

    }


    const dateKey =
        getDateKey(
            date
        );


    const snapshotReference =
        ref(
            database,
            `civicPulse/history/${dateKey}`
        );


    const record = {

        date:
            dateKey,

        capturedAt:
            new Date().toISOString(),

        presidentialApproval:
            normalizePercentage(
                snapshotData.presidentialApproval
            ),

        countryDirection:
            normalizePercentage(
                snapshotData.countryDirection
            ),

        economicConfidence:
            normalizePercentage(
                snapshotData.economicConfidence
            ),

        institutionalConfidence:
            normalizePercentage(
                snapshotData.institutionalConfidence
            ),

        approvalResponses:
            normalizeCount(
                snapshotData.approvalResponses
            ),

        directionResponses:
            normalizeCount(
                snapshotData.directionResponses
            ),

        confidenceResponses:
            normalizeCount(
                snapshotData.confidenceResponses
            )

    };


    await set(
        snapshotReference,
        record
    );


    return record;

}


/*
==================================================
LIVE HISTORY SUBSCRIPTION
==================================================
*/

export function subscribeToCivicPulseHistory(
    callback,
    errorCallback = console.error
) {

    return onValue(
        civicPulseHistoryRef,
        snapshot => {

            callback(
                historySnapshotToArray(
                    snapshot
                )
            );

        },
        errorCallback
    );

}


/*
==================================================
ONE-TIME HISTORY READ
==================================================
*/

export async function getCivicPulseHistory() {

    const snapshot =
        await get(
            civicPulseHistoryRef
        );


    return historySnapshotToArray(
        snapshot
    );

}


/*
==================================================
HISTORY CONVERSION
==================================================
*/

function historySnapshotToArray(
    snapshot
) {

    const records =
        [];


    if (
        !snapshot ||
        !snapshot.exists()
    ) {

        return records;

    }


    snapshot.forEach(
        childSnapshot => {

            const value =
                childSnapshot.val();


            records.push({

                id:
                    childSnapshot.key,

                ...(value || {})

            });

        }
    );


    records.sort(
        (
            first,
            second
        ) => {

            return String(
                first.date || first.id
            ).localeCompare(
                String(
                    second.date || second.id
                )
            );

        }
    );


    return records;

}


/*
==================================================
NORMALIZE PERCENTAGE
==================================================
*/

function normalizePercentage(
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

        return 0;

    }


    return Math.round(
        Math.max(
            0,
            Math.min(
                100,
                number
            )
        )
    );

}


/*
==================================================
NORMALIZE COUNT
==================================================
*/

function normalizeCount(
    value
) {

    const number =
        Number(
            value
        );


    if (
        !Number.isFinite(
            number
        ) ||
        number <
        0
    ) {

        return 0;

    }


    return Math.floor(
        number
    );

}