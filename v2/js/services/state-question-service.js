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
            order
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
    get,
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


    /*
    Determine the next explicit order.

    Older questions may not yet have an order field.
    They remain fully compatible and will continue to
    appear before newly ordered questions until the
    admin intentionally reorders the state list.
    */

    const snapshot =
        await get(
            stateReference
        );


    let highestOrder =
        0;


    if (
        snapshot.exists()
    ) {

        snapshot.forEach(
            childSnapshot => {

                const value =
                    childSnapshot.val() ||
                    {};


                const existingOrder =
                    Number(
                        value.order
                    );


                if (
                    Number.isFinite(
                        existingOrder
                    ) &&
                    existingOrder >
                    highestOrder
                ) {

                    highestOrder =
                        existingOrder;

                }

            }
        );

    }


    const nextOrder =
        highestOrder +
        1;


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

        order:
            nextOrder,

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
                compareStateQuestions
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
GET ALL STATE QUESTIONS
==================================================
*/

export async function getAllStateQuestions() {

    const stateQuestionsReference =
        ref(
            database,
            "stateQuestions"
        );


    const snapshot =
        await get(
            stateQuestionsReference
        );


    const stateQuestionData =
        {};


    /*
    Always return all 50 states, including states
    that do not have any questions yet.
    */

    validStateCodes.forEach(
        stateCode => {

            stateQuestionData[
                stateCode
            ] =
                [];

        }
    );


    if (
        !snapshot.exists()
    ) {

        return stateQuestionData;

    }


    snapshot.forEach(
        stateSnapshot => {

            const stateCode =
                String(
                    stateSnapshot.key ||
                    ""
                )
                    .trim()
                    .toUpperCase();


            if (
                !validStateCodes.includes(
                    stateCode
                )
            ) {

                return;

            }


            const questions =
                [];


            stateSnapshot.forEach(
                questionSnapshot => {

                    const value =
                        questionSnapshot.val() ||
                        {};


                    questions.push({

                        id:
                            questionSnapshot.key,

                        stateCode,

                        ...value

                    });

                }
            );


            questions.sort(
                compareStateQuestions
            );


            stateQuestionData[
                stateCode
            ] =
                questions;

        }
    );


    return stateQuestionData;

}

/*
==================================================
QUESTION SORTING
==================================================
*/

function compareStateQuestions(
    first,
    second
) {

    const firstOrder =
        Number(
            first.order
        );


    const secondOrder =
        Number(
            second.order
        );


    const firstHasOrder =
        Number.isFinite(
            firstOrder
        );


    const secondHasOrder =
        Number.isFinite(
            secondOrder
        );


    /*
    Both questions have an explicit order.
    */

    if (
        firstHasOrder &&
        secondHasOrder
    ) {

        if (
            firstOrder !==
            secondOrder
        ) {

            return (
                firstOrder -
                secondOrder
            );

        }

    }


    /*
    Legacy questions without an order remain ahead
    of newly ordered questions until the administrator
    intentionally reorders the complete list.
    */

    if (
        !firstHasOrder &&
        secondHasOrder
    ) {

        return -1;

    }


    if (
        firstHasOrder &&
        !secondHasOrder
    ) {

        return 1;

    }


    /*
    Legacy fallback:
    oldest question first.
    */

    return String(
        first.createdAt ||
        ""
    ).localeCompare(
        String(
            second.createdAt ||
            ""
        )
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
        Object.prototype
            .hasOwnProperty
            .call(
                updates,
                "order"
            )
    ) {

        recordUpdates.order =
            validateOrder(
                updates.order
            );

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
REORDER STATE QUESTIONS
==================================================
*/

export async function reorderStateQuestions(
    stateCode,
    questionIds
) {

    const cleanStateCode =
        validateStateCode(
            stateCode
        );


    if (
        !Array.isArray(
            questionIds
        ) ||
        questionIds.length ===
        0
    ) {

        throw new Error(
            "A state question order is required."
        );

    }


    const cleanQuestionIds =
        questionIds.map(
            questionId =>
                validateQuestionId(
                    questionId
                )
        );


    const uniqueQuestionIds =
        new Set(
            cleanQuestionIds
        );


    if (
        uniqueQuestionIds.size !==
        cleanQuestionIds.length
    ) {

        throw new Error(
            "Duplicate state question IDs are not allowed."
        );

    }


    const timestamp =
        new Date()
            .toISOString();


    const updates =
        {};


    cleanQuestionIds.forEach(
        (
            questionId,
            index
        ) => {

            const order =
                index +
                1;


            updates[
                `stateQuestions/${cleanStateCode}/${questionId}/order`
            ] =
                order;


            updates[
                `stateQuestions/${cleanStateCode}/${questionId}/updatedAt`
            ] =
                timestamp;

        }
    );


    await update(
        ref(
            database
        ),
        updates
    );


    return cleanQuestionIds.map(
        (
            questionId,
            index
        ) => {

            return {

                id:
                    questionId,

                stateCode:
                    cleanStateCode,

                order:
                    index +
                    1,

                updatedAt:
                    timestamp

            };

        }
    );

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
ORDER VALIDATION
==================================================
*/

function validateOrder(
    order
) {

    const cleanOrder =
        Number(
            order
        );


    if (
        !Number.isInteger(
            cleanOrder
        ) ||
        cleanOrder <
        1 ||
        cleanOrder >
        1000
    ) {

        throw new Error(
            "A valid state question order is required."
        );

    }


    return cleanOrder;

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
        /[.#$[\]\/]/.test(
            cleanQuestionId
        )
    ) {

        throw new Error(
            "A valid state question ID is required."
        );

    }


    return cleanQuestionId;

}