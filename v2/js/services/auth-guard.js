/*
==================================================
CIVIC HORIZON INDEX V2
AUTHENTICATION GUARD
==================================================


SITE ACCESS POLICY

1. A Firebase-authenticated user may enter Civic Horizon.

2. Email verification is NOT required merely to view
   the site.

3. Voting and other participant actions perform their
   own verified-email checks.

4. Temporary Firebase refresh failures do NOT destroy
   the user's session.

5. Admin security remains separate.
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
STATE
==================================================
*/

let accessGranted =
    false;


let redirectStarted =
    false;


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
            SIGNED IN

            Firebase Auth already supplied a valid
            authenticated user.

            Attempt a refresh so we have the latest
            account state, but do NOT sign the user
            out if that refresh temporarily fails.
            ------------------------------------------
            */

            let refreshedUser =
                user;


            try {

                await reload(
                    user
                );


                refreshedUser =
                    auth.currentUser ||
                    user;


                /*
                Refresh the token when possible so
                database security rules see current
                authentication claims.
                */

                try {

                    await getIdToken(
                        refreshedUser,
                        true
                    );

                } catch (tokenError) {

                    console.warn(
                        "Auth token refresh could not be completed:",
                        tokenError
                    );

                }

            } catch (reloadError) {

                console.warn(
                    "Auth user refresh could not be completed:",
                    reloadError
                );


                /*
                IMPORTANT:

                A reload failure is not the same thing
                as a sign-out.

                Keep the authenticated user supplied by
                onAuthStateChanged instead of destroying
                the session.
                */

                refreshedUser =
                    auth.currentUser ||
                    user;

            }


            /*
            ------------------------------------------
            SESSION CHECK
            ------------------------------------------
            */

            if (!refreshedUser) {

                redirectToAccount();

                return;

            }


            /*
            ------------------------------------------
            ACCESS GRANTED

            Email verification is intentionally NOT
            checked here.

            Voting eligibility is enforced separately
            by auth-service.js, firebase-service.js,
            and Firebase Realtime Database Rules.
            ------------------------------------------
            */

            grantAccess(
                refreshedUser
            );

        },

        error => {

            console.error(
                "Authentication guard failed:",
                error
            );


            /*
            Auth state itself failed.

            Do not call signOut() here because the
            session may still be valid.

            Simply deny page access and return to the
            account gateway.
            */

            redirectToAccount();

        }

    );

}


/*
==================================================
GRANT ACCESS
==================================================
*/

function grantAccess(
    user
) {

    if (
        accessGranted
    ) {

        return;

    }


    accessGranted =
        true;


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

                    user

                }
            }
        )
    );

}


/*
==================================================
RELIABLE USER-REQUESTED SIGN OUT
==================================================
*/

export async function signOutAndExit() {

    try {

        /*
        ------------------------------------------
        USER REQUESTED SIGN OUT
        ------------------------------------------
        */

        await signOut(
            auth
        );


        /*
        ------------------------------------------
        CLEAN TEMPORARY SESSION DATA
        ------------------------------------------
        */

        clearTemporarySessionData();


        /*
        ------------------------------------------
        RETURN TO ACCOUNT PAGE
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
SIGNED-IN SESSION
==================================================
*/

export function hasSignedInSession() {

    return Boolean(
        auth.currentUser
    );

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
        redirectStarted
    ) {

        return;

    }


    if (
        getCurrentFileName() ===
        ACCOUNT_PAGE
    ) {

        return;

    }


    redirectStarted =
        true;


    rememberRequestedPage();


    window.location.replace(
        ACCOUNT_PAGE
    );

}


/*
==================================================
REMEMBER REQUESTED PAGE
==================================================
*/

function rememberRequestedPage() {

    try {

        const requestedPage =
            `${window.location.pathname}${window.location.search}${window.location.hash}`;


        sessionStorage.setItem(
            "civicHorizonReturnPage",
            requestedPage
        );

    } catch (error) {

        console.warn(
            "Could not remember requested page:",
            error
        );

    }

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
            .filter(Boolean)
            .pop();


    if (!fileName) {

        return "index.html";

    }


    return fileName
        .toLowerCase();

}