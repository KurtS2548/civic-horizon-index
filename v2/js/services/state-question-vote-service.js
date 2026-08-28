/*
==================================================
CIVIC HORIZON INDEX V2
STATE QUESTION VOTE SERVICE
==================================================
*/

import {

    auth,
    database

} from "../../../js/firebase.js";


import {

    ref,
    get,
    push,
    set,
    remove,
    onValue

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/*
==================================================
GET PARTICIPANT VOTE
==================================================
*/

export async function getStateQuestionVote(
    questionId,
    uid
) {

    const cleanQuestionId =
        validateId(
            questionId
        );


    const cleanUid =
        validateId(
            uid
        );


    const snapshot =
        await get(
            ref(
                database,
                `stateQuestionVotes/${cleanQuestionId}/${cleanUid}`
            )
        );


    if (
        !snapshot.exists()
    ) {

        return null;

    }


    return snapshot.val();

}


/*
==================================================
SUBMIT PARTICIPANT VOTE
==================================================
*/

export async function submitStateQuestionVote(
    {
        questionId,
        stateCode,
        response
    }
) {

    const user =
        auth.currentUser;


    if (
        !user
    ) {

        throw new Error(
            "You must be signed in to participate."
        );

    }


    if (
        !user.emailVerified
    ) {

        throw new Error(
            "Verify your email before participating."
        );

    }


    const cleanQuestionId =
        validateId(
            questionId
        );


    const cleanUid =
        validateId(
            user.uid
        );


    const cleanStateCode =
        validateStateCode(
            stateCode
        );


    const cleanResponse =
        validateResponse(
            response
        );


    const privateVoteReference =
        ref(
            database,
            `stateQuestionVotes/${cleanQuestionId}/${cleanUid}`
        );


    const existingVote =
        await get(
            privateVoteReference
        );


    if (
        existingVote.exists()
    ) {

        const error =
            new Error(
                "You have already answered this state question."
            );


        error.code =
            "already-voted";


        throw error;

    }


    const publicResponseReference =
        push(
            ref(
                database,
                `stateQuestionResponses/${cleanQuestionId}`
            )
        );


    if (
        !publicResponseReference.key
    ) {

        throw new Error(
            "A response ID could not be created."
        );

    }


    const publicResponseId =
        publicResponseReference.key;


    const submittedAt =
        new Date()
            .toISOString();


    const privateRecord = {

        questionId:
            cleanQuestionId,

        stateCode:
            cleanStateCode,

        response:
            cleanResponse,

        submittedAt,

        publicResponseId

    };


    const publicRecord = {

        questionId:
            cleanQuestionId,

        stateCode:
            cleanStateCode,

        response:
            cleanResponse,

        submittedAt

    };


    /*
    ==================================================
    STEP 1
    SAVE PRIVATE DUPLICATE-VOTE RECORD
    ==================================================
    */

    try {

        await set(
            privateVoteReference,
            privateRecord
        );

    } catch (error) {

        const latestVote =
            await get(
                privateVoteReference
            );


        if (
            latestVote.exists()
        ) {

            const duplicateError =
                new Error(
                    "You have already answered this state question."
                );


            duplicateError.code =
                "already-voted";


            throw duplicateError;

        }


        throw error;

    }


    /*
    ==================================================
    STEP 2
    SAVE ANONYMOUS PUBLIC RESULT
    ==================================================

    The public database rule verifies that this record
    matches the participant's private vote.
    ==================================================
    */

    try {

        await set(
            publicResponseReference,
            publicRecord
        );

    } catch (error) {

        /*
        The private lock saved but the public result did
        not. Remove the incomplete private lock so the
        participant may safely try again.
        */

        try {

            await remove(
                privateVoteReference
            );

        } catch (rollbackError) {

            console.error(
                "State question vote rollback failed:",
                rollbackError
            );

        }


        throw error;

    }


    return privateRecord;

}


/*
==================================================
SUBSCRIBE TO QUESTION RESULTS
==================================================
*/

export function subscribeToStateQuestionResults(
    questionId,
    callback,
    errorCallback = console.error
) {

    const cleanQuestionId =
        validateId(
            questionId
        );


    const responsesReference =
        ref(
            database,
            `stateQuestionResponses/${cleanQuestionId}`
        );


    return onValue(
        responsesReference,

        snapshot => {

            const summary = {

                yes: 0,
                no: 0,
                unsure: 0,
                total: 0

            };


            if (
                snapshot.exists()
            ) {

                snapshot.forEach(
                    childSnapshot => {

                        const response =
                            childSnapshot
                                .child(
                                    "response"
                                )
                                .val();


                        if (
                            response ===
                            "Yes"
                        ) {

                            summary.yes += 1;

                        }


                        if (
                            response ===
                            "No"
                        ) {

                            summary.no += 1;

                        }


                        if (
                            response ===
                            "Unsure"
                        ) {

                            summary.unsure += 1;

                        }

                    }
                );

            }


            summary.total =
                summary.yes +
                summary.no +
                summary.unsure;


            callback(
                summary
            );

        },

        errorCallback
    );

}


/*
==================================================
STATE CODE
==================================================
*/

function validateStateCode(
    value
) {

    const stateCode =
        String(
            value ||
            ""
        )
            .trim()
            .toUpperCase();


    if (
        !/^[A-Z]{2}$/.test(
            stateCode
        )
    ) {

        throw new Error(
            "A valid state is required."
        );

    }


    return stateCode;

}


/*
==================================================
RESPONSE
==================================================
*/

function validateResponse(
    value
) {

    const response =
        String(
            value ||
            ""
        )
            .trim();


    const allowedResponses = [

        "Yes",
        "No",
        "Unsure"

    ];


    if (
        !allowedResponses.includes(
            response
        )
    ) {

        throw new Error(
            "A valid response is required."
        );

    }


    return response;

}


/*
==================================================
ID
==================================================
*/

function validateId(
    value
) {

    const cleanValue =
        String(
            value ||
            ""
        )
            .trim();


    if (
        !cleanValue ||
        /[.#$\[\]\/]/.test(
            cleanValue
        )
    ) {

        throw new Error(
            "A valid ID is required."
        );

    }


    return cleanValue;

}