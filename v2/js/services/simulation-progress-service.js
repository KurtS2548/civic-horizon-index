/*
==================================================
CIVIC HORIZON INDEX V2
SIMULATION PROGRESS SERVICE
==================================================
*/


import {

    auth,
    database

} from "../../../js/firebase.js";


import {

    ref,
    get,
    set

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/*
==================================================
ALLOWED SIMULATIONS
==================================================
*/

const allowedSimulationIds = [

    "congress",
    "president",
    "court",
    "governor",
    "mayor",
    "campaign"

];


/*
==================================================
GRADE ORDER
==================================================
*/

const gradeRank = {

    "Needs Improvement":
        0,

    "C":
        1,

    "C+":
        2,

    "B−":
        3,

    "B":
        4,

    "B+":
        5,

    "A−":
        6,

    "A":
        7,

    "A+":
        8

};


/*
==================================================
SAVE SIMULATION COMPLETION
==================================================
*/

export async function saveSimulationCompletion(
    simulationId,
    completionData = {}
) {

    const cleanSimulationId =
        validateSimulationId(
            simulationId
        );


    const user =
        auth.currentUser;


    if (
        !user ||
        !user.uid
    ) {

        throw new Error(
            "A signed-in participant is required."
        );

    }


    if (
        !user.emailVerified
    ) {

        throw new Error(
            "Please verify your email before saving simulation progress."
        );

    }


    const grade =
        validateGrade(
            completionData.grade
        );


    const result =
        String(
            completionData.result ||
            ""
        ).trim();


    const simulationReference =
        ref(
            database,
            `userActivity/${user.uid}/simulations/${cleanSimulationId}`
        );


    const snapshot =
        await get(
            simulationReference
        );


    const existingRecord =
        snapshot.exists()
            ? snapshot.val() || {}
            : {};


    const previousRuns =
        Number(
            existingRecord.runs ||
            0
        );


    const nextRuns =
        Number.isFinite(
            previousRuns
        )
            ? previousRuns + 1
            : 1;


    const previousBestGrade =
        String(
            existingRecord.bestGrade ||
            existingRecord.lastGrade ||
            ""
        ).trim();


    const bestGrade =
        getBetterGrade(
            previousBestGrade,
            grade
        );


    const completedAt =
        new Date().toISOString();


    const record = {

        completed:
            true,

        lastGrade:
            grade,

        runs:
            nextRuns,

        lastCompletedAt:
            completedAt,

        lastResult:
            result.slice(
                0,
                2000
            )

    };


    /*
    The current Firebase Rules do not yet include
    bestGrade, so keep it out of the database record
    until we intentionally add that field later.
    */


    await set(
        simulationReference,
        record
    );


    return {

        simulationId:
            cleanSimulationId,

        completed:
            true,

        lastGrade:
            grade,

        bestGrade,

        runs:
            nextRuns,

        lastCompletedAt:
            completedAt,

        lastResult:
            record.lastResult

    };

}


/*
==================================================
GET ONE SIMULATION RECORD
==================================================
*/

export async function getSimulationProgress(
    simulationId
) {

    const cleanSimulationId =
        validateSimulationId(
            simulationId
        );


    const user =
        auth.currentUser;


    if (
        !user ||
        !user.uid
    ) {

        return null;

    }


    const simulationReference =
        ref(
            database,
            `userActivity/${user.uid}/simulations/${cleanSimulationId}`
        );


    const snapshot =
        await get(
            simulationReference
        );


    if (
        !snapshot.exists()
    ) {

        return null;

    }


    return {

        simulationId:
            cleanSimulationId,

        ...snapshot.val()

    };

}


/*
==================================================
GET ALL SIMULATION RECORDS
==================================================
*/

export async function getAllSimulationProgress() {

    const user =
        auth.currentUser;


    if (
        !user ||
        !user.uid
    ) {

        return {};

    }


    const simulationsReference =
        ref(
            database,
            `userActivity/${user.uid}/simulations`
        );


    const snapshot =
        await get(
            simulationsReference
        );


    if (
        !snapshot.exists()
    ) {

        return {};

    }


    const value =
        snapshot.val();


    if (
        !value ||
        typeof value !==
            "object"
    ) {

        return {};

    }


    return value;

}


/*
==================================================
SIMULATION ID VALIDATION
==================================================
*/

function validateSimulationId(
    simulationId
) {

    const cleanSimulationId =
        String(
            simulationId ||
            ""
        ).trim();


    if (
        !allowedSimulationIds.includes(
            cleanSimulationId
        )
    ) {

        throw new Error(
            "Invalid simulation ID."
        );

    }


    return cleanSimulationId;

}


/*
==================================================
GRADE VALIDATION
==================================================
*/

function validateGrade(
    grade
) {

    const cleanGrade =
        String(
            grade ||
            ""
        ).trim();


    if (
        !Object.prototype.hasOwnProperty.call(
            gradeRank,
            cleanGrade
        )
    ) {

        throw new Error(
            "Invalid simulation grade."
        );

    }


    return cleanGrade;

}


/*
==================================================
BEST GRADE
==================================================
*/

function getBetterGrade(
    gradeA,
    gradeB
) {

    const rankA =
        gradeRank[
            gradeA
        ];


    const rankB =
        gradeRank[
            gradeB
        ];


    if (
        rankA ===
        undefined
    ) {

        return gradeB;

    }


    if (
        rankB ===
        undefined
    ) {

        return gradeA;

    }


    return rankB >
        rankA
        ? gradeB
        : gradeA;

}