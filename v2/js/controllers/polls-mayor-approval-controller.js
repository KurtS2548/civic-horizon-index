/*
==================================================
CIVIC HORIZON INDEX V2
POLLS MAYOR APPROVAL CONTROLLER
==================================================
*/


/*
==================================================
PUBLIC OFFICIAL DATA
==================================================
*/

import {

    getMayorByMunicipalityGeoid

} from "../services/public-official-data-service.js";


/*
==================================================
PARTICIPANT JURISDICTION
==================================================
*/

import {

    getCurrentParticipantJurisdiction

} from "../services/participant-jurisdiction-service.js";


/*
==================================================
MAYOR APPROVAL SERVICE
==================================================
*/

import {

    getMayorApprovalStatus,
    submitMayorApproval,
    subscribeToMayorApproval,
    getMayorVotingPeriodLabel

} from "../services/mayor-approval-service.js";


/*
==================================================
CONTROLLER STATE
==================================================
*/

let controllerInitialized =
    false;

let currentMayor =
    null;

let unsubscribeMayorApproval =
    null;


/*
==================================================
INITIALIZE
==================================================
*/

export async function initializePollsMayorApprovalController() {

    if (
        controllerInitialized
    ) {

        return;

    }


    controllerInitialized =
        true;


    const form =
        document.getElementById(
            "pollsMayorApprovalForm"
        );


    if (!form) {

        controllerInitialized =
            false;

        return;

    }


    form.addEventListener(
        "change",
        handleResponseChange
    );


    form.addEventListener(
        "submit",
        handleSubmit
    );


    await loadMayorApproval();

}


/*
==================================================
LOAD MAYOR APPROVAL
==================================================
*/

async function loadMayorApproval() {

    setUnavailable(
        false
    );


    setContentVisible(
        false
    );


    setJurisdictionText(
        "Checking your municipality..."
    );


    try {

        const participant =
            await getCurrentParticipantJurisdiction();


        if (
            !participant
                ?.eligibility
                ?.municipality
        ) {

            showUnavailable(
                participant
                    ?.messages
                    ?.municipality ||
                "Your municipality could not be confirmed."
            );

            return;

        }


        const stateCode =
            String(
                participant.stateCode ||
                ""
            ).trim();


        const municipalityGeoid =
            String(
                participant.municipalityGeoid ||
                ""
            ).trim();


        if (
            !stateCode ||
            !/^\d{10}$/.test(
                municipalityGeoid
            )
        ) {

            showUnavailable(
                "Your municipality could not be securely verified."
            );

            return;

        }


        currentMayor =
            getMayorByMunicipalityGeoid(
                stateCode,
                municipalityGeoid
            );


        if (!currentMayor) {

            showUnavailable(
                "Mayor approval voting is not available for your municipality yet."
            );

            return;

        }


        setJurisdictionText(
            currentMayor.municipality ||
            participant.municipality ||
            "Your municipality"
        );


        setText(
            "pollsMayorApprovalMayorName",
            currentMayor.name ||
            "Current Mayor"
        );


        setText(
            "pollsMayorApprovalMayorOffice",
            currentMayor.officeLabel ||
            "Mayor"
        );


        setText(
            "pollsMayorApprovalPeriod",
            getMayorVotingPeriodLabel()
        );


        setContentVisible(
            true
        );


        const status =
            await getMayorApprovalStatus(
                currentMayor
            );


        applyStatus(
            status
        );


        subscribeToResults();

    } catch (error) {

        console.error(
            "Mayor Approval could not load:",
            error
        );


        showUnavailable(
            "Mayor approval voting is temporarily unavailable."
        );

    }

}


/*
==================================================
STATUS
==================================================
*/

function applyStatus(
    status
) {

    const submitButton =
        document.getElementById(
            "pollsMayorApprovalSubmit"
        );


    if (!submitButton) {

        return;

    }


    if (
        status?.reason ===
        "alreadyParticipatedThisMonth"
    ) {

        disableForm();

        setMessage(
            "You have already rated this mayor this month.",
            "success"
        );

        return;

    }


    if (
        status?.reason ===
        "signedOut"
    ) {

        disableForm();

        setMessage(
            "Sign in to participate.",
            "error"
        );

        return;

    }


    if (
        status?.reason ===
        "emailNotVerified"
    ) {

        disableForm();

        setMessage(
            "Verify your email before participating.",
            "error"
        );

        return;

    }


    if (
        status?.reason ===
        "outsideJurisdiction"
    ) {

        disableForm();

        setMessage(
            "Voting is limited to residents of this municipality.",
            "error"
        );

        return;

    }


    if (
        status?.reason ===
        "mayorMunicipalityUnverified"
    ) {

        disableForm();

        setMessage(
            "This municipality could not be securely verified.",
            "error"
        );

        return;

    }


    if (
        status?.eligible ===
        true
    ) {

        enableInputs();

        submitButton.disabled =
            true;

        setMessage(
            "Select a response to participate.",
            "neutral"
        );

        return;

    }


    disableForm();

    setMessage(
        "Mayor approval voting is currently unavailable.",
        "error"
    );

}


/*
==================================================
RESPONSE CHANGE
==================================================
*/

function handleResponseChange() {

    const submitButton =
        document.getElementById(
            "pollsMayorApprovalSubmit"
        );


    if (!submitButton) {

        return;

    }


    const selected =
        getSelectedResponse();


    submitButton.disabled =
        !selected;

}


/*
==================================================
SUBMIT
==================================================
*/

async function handleSubmit(
    event
) {

    event.preventDefault();


    if (!currentMayor) {

        return;

    }


    const response =
        getSelectedResponse();


    if (!response) {

        setMessage(
            "Select a response before submitting.",
            "error"
        );

        return;

    }


    const submitButton =
        document.getElementById(
            "pollsMayorApprovalSubmit"
        );


    if (
        submitButton
    ) {

        submitButton.disabled =
            true;

        submitButton.textContent =
            "Submitting...";

    }


    try {

        /*
        ----------------------------------------------
        RE-CHECK ELIGIBILITY BEFORE WRITE
        ----------------------------------------------
        */

        const status =
            await getMayorApprovalStatus(
                currentMayor
            );


        if (
            status?.eligible !==
            true
        ) {

            applyStatus(
                status
            );

            return;

        }


        await submitMayorApproval(
            currentMayor,
            response
        );


        disableForm();


        setMessage(
            "Your Mayor rating has been recorded for this month.",
            "success"
        );

    } catch (error) {

        console.error(
            "Mayor Approval submission failed:",
            error
        );


        setMessage(
            error?.message ||
            "Your Mayor rating could not be submitted.",
            "error"
        );


        enableInputs();


        if (
            submitButton
        ) {

            submitButton.disabled =
                !getSelectedResponse();

        }

    } finally {

        if (
            submitButton
        ) {

            submitButton.textContent =
                "Submit Mayor Rating";

        }

    }

}


/*
==================================================
LIVE RESULTS
==================================================
*/

function subscribeToResults() {

    if (
        typeof unsubscribeMayorApproval ===
        "function"
    ) {

        unsubscribeMayorApproval();

        unsubscribeMayorApproval =
            null;

    }


    if (!currentMayor) {

        return;

    }


    unsubscribeMayorApproval =
        subscribeToMayorApproval(

            currentMayor.id,

            summary => {

                const totalResponses =
                    Number(
                        summary?.totalResponses
                    ) || 0;


                const approvalPercentage =
                    Number(
                        summary?.approvalPercentage
                    ) || 0;


                setText(
                    "pollsMayorApprovalResponseCount",
                    totalResponses
                        .toLocaleString()
                );


                setText(
                    "pollsMayorApprovalPercentage",
                    totalResponses >
                        0
                        ? `${approvalPercentage.toFixed(
                            1
                        )}%`
                        : "—"
                );

            },

            error => {

                console.error(
                    "Mayor Approval results error:",
                    error
                );


                setText(
                    "pollsMayorApprovalPercentage",
                    "—"
                );

            }

        );

}


/*
==================================================
SELECTED RESPONSE
==================================================
*/

function getSelectedResponse() {

    const selected =
        document.querySelector(
            'input[name="mayorApprovalResponse"]:checked'
        );


    return selected
        ? String(
            selected.value ||
            ""
        ).trim()
        : "";

}


/*
==================================================
FORM STATE
==================================================
*/

function disableForm() {

    document
        .querySelectorAll(
            'input[name="mayorApprovalResponse"]'
        )
        .forEach(
            input => {

                input.disabled =
                    true;

            }
        );


    const submitButton =
        document.getElementById(
            "pollsMayorApprovalSubmit"
        );


    if (
        submitButton
    ) {

        submitButton.disabled =
            true;

    }

}


function enableInputs() {

    document
        .querySelectorAll(
            'input[name="mayorApprovalResponse"]'
        )
        .forEach(
            input => {

                input.disabled =
                    false;

            }
        );

}


/*
==================================================
DISPLAY HELPERS
==================================================
*/

function setContentVisible(
    visible
) {

    const content =
        document.getElementById(
            "pollsMayorApprovalContent"
        );


    if (!content) {

        return;

    }


    content.hidden =
        visible !==
        true;

}


function setUnavailable(
    visible
) {

    const element =
        document.getElementById(
            "pollsMayorApprovalUnavailable"
        );


    if (!element) {

        return;

    }


    element.hidden =
        visible !==
        true;

}


function showUnavailable(
    message
) {

    setContentVisible(
        false
    );


    const element =
        document.getElementById(
            "pollsMayorApprovalUnavailable"
        );


    if (
        element
    ) {

        element.textContent =
            String(
                message || ""
            );

        element.hidden =
            false;

    }

}


function setJurisdictionText(
    value
) {

    setText(
        "pollsMayorApprovalJurisdiction",
        value
    );

}


function setMessage(
    message,
    type
) {

    const element =
        document.getElementById(
            "pollsMayorApprovalMessage"
        );


    if (!element) {

        return;

    }


    element.textContent =
        String(
            message || ""
        );


    element.dataset.messageType =
        String(
            type || ""
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


    if (!element) {

        return;

    }


    element.textContent =
        String(
            value ?? ""
        );

}


/*
==================================================
DESTROY
==================================================
*/

export function destroyPollsMayorApprovalController() {

    if (
        typeof unsubscribeMayorApproval ===
        "function"
    ) {

        unsubscribeMayorApproval();

    }


    unsubscribeMayorApproval =
        null;

    currentMayor =
        null;

    controllerInitialized =
        false;

}
