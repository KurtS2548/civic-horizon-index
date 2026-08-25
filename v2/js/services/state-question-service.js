/*
==================================================
CIVIC HORIZON INDEX V2
STATE QUESTION SERVICE
==================================================

Firebase structure:

stateQuestions/
    NJ/
        questionId/
            question
            active
            createdAt
            updatedAt
==================================================
*/


import {

    database

} from "../../../js/firebase.js";


import {

    ref,
    push,
    set,
    update,
    remove,
    onValue

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/*
==================================================
VALID STATE CODES
==================================================
*/

const validStateCodes = [

    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY"

];


/*
==================================================
CREATE STATE QUESTION
==================================================
*/

export async function createStateQuestion(
    stateCode,
    question
) {

    const cleanStateCode =
        validateStateCode(
            stateCode
        );


    const cleanQuestion =
        validateQuestion(
            question
        );


    const stateReference =
        ref(
            database,
            `stateQuestions/${cleanStateCode}`
        );


    const questionReference =
        push(
            stateReference
        );


    if (
        !questionReference.key
    ) {

        throw new Error(
            "A state question ID could not be created."
        );

    }


    const timestamp =
        new Date()
            .toISOString();


    const record = {

        question:
            cleanQuestion,

        active:
            true,

        createdAt:
            timestamp,

        updatedAt:
            timestamp

    };


    await set(
        questionReference,
        record
    );


    return {

        id:
            questionReference.key,

        stateCode:
            cleanStateCode,

        ...record

    };

}


/*
==================================================
SUBSCRIBE TO STATE QUESTIONS
==================================================
*/

export function subscribeToStateQuestions(
    stateCode,
    callback,
    errorCallback = console.error
) {

    const cleanStateCode =
        validateStateCode(
            stateCode
        );


    const stateReference =
        ref(
            database,
            `stateQuestions/${cleanStateCode}`
        );


    return onValue(

        stateReference,

        snapshot => {

            const questions =
                [];


            if (
                snapshot.exists()
            ) {

                snapshot.forEach(
                    childSnapshot => {

                        const value =
                            childSnapshot.val() ||
                            {};


                        questions.push({

                            id:
                                childSnapshot.key,

                            stateCode:
                                cleanStateCode,

                            ...value

                        });

                    }
                );

            }


            questions.sort(
                (
                    first,
                    second
                ) => {

                    return String(
                        second.createdAt ||
                        ""
                    ).localeCompare(
                        String(
                            first.createdAt ||
                            ""
                        )
                    );

                }
            );


            callback(
                questions
            );

        },

        errorCallback

    );

}


/*
==================================================
UPDATE STATE QUESTION
==================================================
*/

export async function updateStateQuestion(
    stateCode,
    questionId,
    updates
) {

    const cleanStateCode =
        validateStateCode(
            stateCode
        );


    const cleanQuestionId =
        validateQuestionId(
            questionId
        );


    if (
        !updates ||
        typeof updates !==
            "object"
    ) {

        throw new Error(
            "State question update data is required."
        );

    }


    const recordUpdates =
        {};


    if (
        Object.prototype
            .hasOwnProperty
            .call(
                updates,
                "question"
            )
    ) {

        recordUpdates.question =
            validateQuestion(
                updates.question
            );

    }


    if (
        Object.prototype
            .hasOwnProperty
            .call(
                updates,
                "active"
            )
    ) {

        recordUpdates.active =
            updates.active ===
            true;

    }


    if (
        Object.keys(
            recordUpdates
        ).length ===
        0
    ) {

        throw new Error(
            "No valid state question changes were provided."
        );

    }


    recordUpdates.updatedAt =
        new Date()
            .toISOString();


    await update(

        ref(
            database,
            `stateQuestions/${cleanStateCode}/${cleanQuestionId}`
        ),

        recordUpdates

    );


    return {

        id:
            cleanQuestionId,

        stateCode:
            cleanStateCode,

        ...recordUpdates

    };

}


/*
==================================================
DELETE STATE QUESTION
==================================================
*/

export async function deleteStateQuestion(
    stateCode,
    questionId
) {

    const cleanStateCode =
        validateStateCode(
            stateCode
        );


    const cleanQuestionId =
        validateQuestionId(
            questionId
        );


    await remove(
        ref(
            database,
            `stateQuestions/${cleanStateCode}/${cleanQuestionId}`
        )
    );

}


/*
==================================================
STATE CODE VALIDATION
==================================================
*/

function validateStateCode(
    stateCode
) {

    const cleanStateCode =
        String(
            stateCode ||
            ""
        )
            .trim()
            .toUpperCase();


    if (
        !validStateCodes.includes(
            cleanStateCode
        )
    ) {

        throw new Error(
            "A valid state is required."
        );

    }


    return cleanStateCode;

}


/*
==================================================
QUESTION VALIDATION
==================================================
*/

function validateQuestion(
    question
) {

    const cleanQuestion =
        String(
            question ||
            ""
        )
            .trim();


    if (
        cleanQuestion.length <
        5
    ) {

        throw new Error(
            "The state question must be at least 5 characters long."
        );

    }


    if (
        cleanQuestion.length >
        500
    ) {

        throw new Error(
            "The state question cannot exceed 500 characters."
        );

    }


    return cleanQuestion;

}


/*
==================================================
QUESTION ID VALIDATION
==================================================
*/

function validateQuestionId(
    questionId
) {

    const cleanQuestionId =
        String(
            questionId ||
            ""
        )
            .trim();


    if (
        !cleanQuestionId ||
        /[.#$\[\]\/]/.test(
            cleanQuestionId
        )
    ) {

        throw new Error(
            "A valid state question ID is required."
        );

    }


    return cleanQuestionId;

}