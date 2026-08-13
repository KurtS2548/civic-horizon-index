/*
==================================================
CIVIC HORIZON INDEX V2
AUTHENTICATION GUARD
==================================================
*/


import {
    auth
} from "../../../js/firebase.js";


import {
    onAuthStateChanged,
    reload,
    getIdToken,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/*
==================================================
DESTINATIONS
==================================================
*/

const ACCOUNT_PAGE =
    "account.html";


/*
==================================================
PROTECT CURRENT PAGE
==================================================
*/

export function protectCurrentPage() {

    return onAuthStateChanged(

        auth,

        async user => {

            /*
            ------------------------------------------
            SIGNED OUT
            ------------------------------------------
            */

            if (!user) {

                redirectToAccount();

                return;

            }


            /*
            ------------------------------------------
            REFRESH USER

            This confirms the latest verification
            state before the protected page opens.
            ------------------------------------------
            */

            try {

                await reload(
                    user
                );


                await getIdToken(
                    user,
                    true
                );

            } catch (error) {

                console.error(
                    "Auth refresh failed:",
                    error
                );


                await forceSignOut();

                return;

            }


            const refreshedUser =
                auth.currentUser;


            /*
            ------------------------------------------
            SESSION DISAPPEARED
            ------------------------------------------
            */

            if (!refreshedUser) {

                redirectToAccount();

                return;

            }


            /*
            ------------------------------------------
            EMAIL MUST BE VERIFIED

            No verification page is used.

            The participant returns to account.html,
            where the background verification flow
            continues automatically.
            ------------------------------------------
            */

            if (
                !refreshedUser.emailVerified
            ) {

                redirectToAccount();

                return;

            }


            /*
            ------------------------------------------
            ACCESS GRANTED
            ------------------------------------------
            */

            document.documentElement
                .classList.remove(
                    "auth-access-pending"
                );


            document.documentElement
                .classList.add(
                    "auth-access-granted"
                );


            document.dispatchEvent(
                new CustomEvent(
                    "civicAuthReady",
                    {
                        detail: {

                            user:
                                refreshedUser

                        }
                    }
                )
            );

        },

        async error => {

            console.error(
                "Authentication guard failed:",
                error
            );


            await forceSignOut();

        }

    );

}


/*
==================================================
RELIABLE SIGN OUT
==================================================
*/

export async function signOutAndExit() {

    try {

        /*
        ------------------------------------------
        SIGN OUT THROUGH FIREBASE
        ------------------------------------------
        */

        await signOut(
            auth
        );


        /*
        ------------------------------------------
        CONFIRM SESSION IS CLEARED
        ------------------------------------------
        */

        if (
            auth.currentUser
        ) {

            throw new Error(
                "Firebase session did not clear."
            );

        }


        /*
        ------------------------------------------
        CLEAN TEMPORARY SESSION DATA
        ------------------------------------------
        */

        clearTemporarySessionData();


        /*
        ------------------------------------------
        RETURN TO ACCOUNT PAGE

        replace() prevents Back from restoring
        the protected page as the active page.
        ------------------------------------------
        */

        window.location.replace(
            ACCOUNT_PAGE
        );

    } catch (error) {

        console.error(
            "Sign out failed:",
            error
        );


        throw new Error(
            "Sign out could not be completed."
        );

    }

}


/*
==================================================
CURRENT USER
==================================================
*/

export function getGuardedCurrentUser() {

    return auth.currentUser;

}


/*
==================================================
VERIFIED SESSION
==================================================
*/

export function hasVerifiedSession() {

    const user =
        auth.currentUser;


    return Boolean(
        user &&
        user.emailVerified
    );

}


/*
==================================================
REDIRECT TO ACCOUNT
==================================================
*/

function redirectToAccount() {

    if (
        getCurrentFileName() ===
        ACCOUNT_PAGE
    ) {

        return;

    }


    window.location.replace(
        ACCOUNT_PAGE
    );

}


/*
==================================================
FORCE SIGN OUT
==================================================
*/

async function forceSignOut() {

    try {

        await signOut(
            auth
        );

    } catch (error) {

        console.error(
            "Forced sign out failed:",
            error
        );

    }


    clearTemporarySessionData();


    window.location.replace(
        ACCOUNT_PAGE
    );

}


/*
==================================================
TEMPORARY SESSION CLEANUP
==================================================
*/

function clearTemporarySessionData() {

    try {

        sessionStorage.removeItem(
            "civicHorizonReturnPage"
        );

    } catch (error) {

        console.warn(
            "Session cleanup failed:",
            error
        );

    }

}


/*
==================================================
CURRENT FILE NAME
==================================================
*/

function getCurrentFileName() {

    const pathname =
        window.location.pathname;


    const fileName =
        pathname
            .split("/")
            .pop();


    if (!fileName) {

        return "index.html";

    }


    return fileName;

}