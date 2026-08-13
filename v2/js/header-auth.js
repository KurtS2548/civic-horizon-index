/*
==================================================
CIVIC HORIZON INDEX V2
GLOBAL HEADER AUTH
==================================================
*/


import {

    signOutAndExit

} from "./services/auth-guard.js";


/*
==================================================
STATE
==================================================
*/

let initialized =
    false;


/*
==================================================
INITIALIZE
==================================================
*/

export function initializeHeaderAuth() {

    if (
        initialized
    ) {

        return;

    }


    initialized =
        true;


    /*
    The header is loaded dynamically.

    Listening on document means the Log Out
    button does not have to exist yet.
    */

    document.addEventListener(
        "click",
        handleDocumentClick
    );

}


/*
==================================================
DOCUMENT CLICK
==================================================
*/

async function handleDocumentClick(
    event
) {

    const logoutButton =
        event.target.closest(
            "#headerLogoutButton"
        );


    if (!logoutButton) {

        return;

    }


    event.preventDefault();

    event.stopPropagation();


    if (
        logoutButton.disabled
    ) {

        return;

    }


    logoutButton.disabled =
        true;


    logoutButton.textContent =
        "Logging Out...";


    try {

        await signOutAndExit();

    } catch (error) {

        console.error(
            "Header Log Out failed:",
            error
        );


        logoutButton.disabled =
            false;


        logoutButton.textContent =
            "Log Out";

    }

}