/*
==================================================
CIVIC HORIZON INDEX V2
SITE AUTHENTICATION BOOTSTRAP
==================================================
*/


import {

    protectCurrentPage

} from "./services/auth-guard.js";


import {

    initializeHeaderAuth

} from "./header-auth.js";


/*
==================================================
STATE
==================================================
*/

let headerAuthInitialized =
    false;


/*
==================================================
PUBLIC HOMEPAGE CHECK
==================================================
*/

function isPublicHomepage() {

    const path =
        window.location.pathname
            .replace(/\/+$/, "")
            .toLowerCase();


    return (
        path === "" ||
        path === "/" ||
        path.endsWith("/index.html") ||
        path.endsWith("/v2")
    );

}


/*
==================================================
START AUTHENTICATION
==================================================
*/

if (
    isPublicHomepage()
) {

    /*
    --------------------------------------------------
    HOMEPAGE IS PUBLIC
    --------------------------------------------------
    Visitors arriving from Instagram, search engines,
    shared links, or other sources can understand the
    platform before being asked to create an account.
    --------------------------------------------------
    */

    revealProtectedPage();

    initializeHeaderWhenReady();

} else {

    /*
    --------------------------------------------------
    PROTECTED SITE PAGES
    --------------------------------------------------
    */

    document.documentElement
        .classList.add(
            "auth-access-pending"
        );


    protectCurrentPage();

}


/*
==================================================
AUTH ACCESS GRANTED
==================================================
*/

document.addEventListener(
    "civicAuthReady",
    () => {

        revealProtectedPage();

        initializeHeaderWhenReady();

    }
);


/*
==================================================
REVEAL PAGE
==================================================
*/

function revealProtectedPage() {

    document.documentElement
        .classList.remove(
            "auth-access-pending"
        );


    document.documentElement
        .classList.add(
            "auth-access-granted"
        );

}


/*
==================================================
INITIALIZE HEADER AUTH
==================================================
*/

function initializeHeaderWhenReady() {

    if (
        headerAuthInitialized
    ) {

        return;

    }


    const logoutButton =
        document.getElementById(
            "headerLogoutButton"
        );


    const profileLink =
        document.getElementById(
            "headerProfileLink"
        );


    if (
        logoutButton ||
        profileLink
    ) {

        initializeHeaderAuth();


        headerAuthInitialized =
            true;


        return;

    }


    watchForHeader();

}


/*
==================================================
WATCH FOR ASYNC HEADER LOAD
==================================================
*/

function watchForHeader() {

    const observer =
        new MutationObserver(
            () => {

                if (
                    headerAuthInitialized
                ) {

                    observer.disconnect();

                    return;

                }


                const logoutButton =
                    document.getElementById(
                        "headerLogoutButton"
                    );


                const profileLink =
                    document.getElementById(
                        "headerProfileLink"
                    );


                if (
                    logoutButton ||
                    profileLink
                ) {

                    initializeHeaderAuth();


                    headerAuthInitialized =
                        true;


                    observer.disconnect();

                }

            }
        );


    observer.observe(
        document.documentElement,
        {
            childList:
                true,

            subtree:
                true
        }
    );

}


/*
==================================================
FAILSAFE HEADER CHECK
==================================================
*/

window.addEventListener(
    "load",
    () => {

        if (
            !headerAuthInitialized
        ) {

            initializeHeaderWhenReady();

        }

    }
);