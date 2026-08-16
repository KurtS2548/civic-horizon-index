/*
==================================================
CIVIC HORIZON INDEX V2
SECURE ADMIN CENTER INITIALIZATION
==================================================
*/


import {

    subscribeToAuthState,
    signInAdmin,
    signOutAdmin,
    isAdminUser

} from "./services/auth-service.js";


/*
==================================================
STATE
==================================================
*/

let adminComponentsLoaded =
    false;

let adminControllerStarted =
    false;

let pollSuggestionsStarted =
    false;

let unauthorizedSignOutRunning =
    false;


/*
==================================================
COMPONENT LOADING
==================================================
*/

async function loadComponent(
    containerId,
    componentPath
) {

    const container =
        document.getElementById(
            containerId
        );


    if (!container) {

        console.error(
            `Container not found: ${containerId}`
        );

        return false;

    }


    try {

        const response =
            await fetch(
                componentPath
            );


        if (!response.ok) {

            throw new Error(
                `Component request failed: ${response.status}`
            );

        }


        container.innerHTML =
            await response.text();


        return true;


    } catch (error) {

        console.error(
            `Could not load ${componentPath}:`,
            error
        );


        container.innerHTML = `

            <div
                style="
                    padding: 18px;
                    background: #fff0ef;
                    color: #a6271e;
                    text-align: center;
                "
            >

                This section could not be loaded.

            </div>

        `;


        return false;

    }

}


/*
==================================================
INITIAL PAGE LOAD
==================================================
*/

async function initializeAdminPage() {

    /*
    ----------------------------------------------
    IMPORTANT SECURITY DESIGN

    Only the public shell loads before authorization.

    Secure admin components are not fetched until
    the Firebase user passes the admin UID check.
    ----------------------------------------------
    */

    await Promise.all([

        loadComponent(
            "headerContainer",
            "components/header.html"
        ),

        loadComponent(
            "adminSessionContainer",
            "components/admin-session.html"
        ),

        loadComponent(
            "adminLoginContainer",
            "components/admin-login.html"
        ),

        loadComponent(
            "footerContainer",
            "components/footer.html"
        )

    ]);


    initializeHeader();

    initializeLoginForm();

    initializeSignOut();

    watchAuthentication();

}


/*
==================================================
AUTHENTICATION WATCH
==================================================
*/

function watchAuthentication() {

    subscribeToAuthState(

        async user => {

            /*
            ------------------------------------------
            NO FIREBASE SESSION
            ------------------------------------------
            */

            if (!user) {

                unauthorizedSignOutRunning =
                    false;


                showLogin();

                return;

            }


            /*
            ------------------------------------------
            ADMIN UID CHECK

            Being signed in is NOT enough.

            The Firebase user must match the one
            authorized Civic Horizon admin UID.
            ------------------------------------------
            */

            if (
                !isAdminUser(
                    user
                )
            ) {

                await handleUnauthorizedUser();

                return;

            }


            /*
            ------------------------------------------
            AUTHORIZED ADMIN
            ------------------------------------------
            */

            unauthorizedSignOutRunning =
                false;


            await showAuthenticatedAdmin(
                user
            );

        }

    );

}


/*
==================================================
UNAUTHORIZED USER
==================================================
*/

async function handleUnauthorizedUser() {

    /*
    Prevent duplicate sign-out attempts if Firebase
    fires another auth-state callback while the
    unauthorized session is being terminated.
    */

    if (
        unauthorizedSignOutRunning
    ) {

        return;

    }


    unauthorizedSignOutRunning =
        true;


    /*
    ----------------------------------------------
    KEEP ADMIN APPLICATION HIDDEN
    ----------------------------------------------
    */

    hideAdminApplication();


    /*
    ----------------------------------------------
    SHOW LOGIN WITH ACCESS MESSAGE
    ----------------------------------------------
    */

    const loginContainer =
        document.getElementById(
            "adminLoginContainer"
        );


    if (loginContainer) {

        loginContainer.hidden =
            false;

    }


    setLoginMessage(
        "This account is not authorized to access the Civic Horizon Admin Center.",
        "error"
    );


    /*
    ----------------------------------------------
    TERMINATE PARTICIPANT SESSION

    A normal Civic Horizon participant may already
    be signed into the public website.

    Visiting admin.html must never turn that public
    session into an admin session.
    ----------------------------------------------
    */

    try {

        await signOutAdmin();

    } catch (error) {

        console.error(
            "Unauthorized session could not be signed out:",
            error
        );


        unauthorizedSignOutRunning =
            false;

    }

}


/*
==================================================
LOGIN FORM
==================================================
*/

function initializeLoginForm() {

    const form =
        document.getElementById(
            "adminLoginForm"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        handleLoginSubmit
    );

}


/*
==================================================
LOGIN SUBMIT
==================================================
*/

async function handleLoginSubmit(
    event
) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const email =
        form.elements.email?.value ||
        "";


    const password =
        form.elements.password?.value ||
        "";


    const submitButton =
        document.getElementById(
            "adminLoginSubmit"
        );


    setLoginMessage(
        "Signing in...",
        "info"
    );


    if (submitButton) {

        submitButton.disabled =
            true;


        submitButton.textContent =
            "Signing In...";

    }


    try {

        /*
        signInAdmin performs its own UID verification.

        Even valid Firebase credentials are rejected
        unless they belong to the authorized admin.
        */

        await signInAdmin(
            email,
            password
        );


        setLoginMessage(
            "Sign in successful.",
            "success"
        );


    } catch (error) {

        console.error(
            "Admin sign-in failed:",
            error
        );


        setLoginMessage(

            getFriendlyAuthError(
                error
            ),

            "error"

        );


        if (submitButton) {

            submitButton.disabled =
                false;


            submitButton.textContent =
                "Sign In";

        }

    }

}


/*
==================================================
SIGN OUT
==================================================
*/

function initializeSignOut() {

    const button =
        document.getElementById(
            "adminSignOutButton"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        handleSignOut
    );

}


/*
==================================================
HANDLE SIGN OUT
==================================================
*/

async function handleSignOut() {

    const button =
        document.getElementById(
            "adminSignOutButton"
        );


    if (button) {

        button.disabled =
            true;


        button.textContent =
            "Signing Out...";

    }


    try {

        await signOutAdmin();


    } catch (error) {

        console.error(
            "Admin sign-out failed:",
            error
        );


        if (button) {

            button.disabled =
                false;


            button.textContent =
                "Sign Out";

        }

    }

}


/*
==================================================
SHOW AUTHENTICATED ADMIN
==================================================
*/

async function showAuthenticatedAdmin(
    user
) {

    /*
    ----------------------------------------------
    SECONDARY SECURITY CHECK

    Never reveal the Admin Center based solely on
    the caller having passed a user object.
    ----------------------------------------------
    */

    if (
        !isAdminUser(
            user
        )
    ) {

        await handleUnauthorizedUser();

        return;

    }


    const loginContainer =
        document.getElementById(
            "adminLoginContainer"
        );


    const adminPage =
        document.getElementById(
            "adminPage"
        );


    const sessionBar =
        document.getElementById(
            "adminSession"
        );


    /*
    ----------------------------------------------
    LOAD SECURE ADMIN COMPONENTS

    These are not fetched until AFTER authorization.
    ----------------------------------------------
    */

    if (
        !adminComponentsLoaded
    ) {

        await loadAdminComponents();


        adminComponentsLoaded =
            true;

    }


    /*
    ----------------------------------------------
    CHECK AUTHORIZATION AGAIN AFTER ASYNC LOAD

    This protects against the session changing while
    components are being fetched.
    ----------------------------------------------
    */

    if (
        !isAdminUser(
            user
        )
    ) {

        await handleUnauthorizedUser();

        return;

    }


    if (loginContainer) {

        loginContainer.hidden =
            true;

    }


    if (sessionBar) {

        sessionBar.hidden =
            false;

    }


    setText(
        "adminSessionEmail",
        user.email ||
        "Administrator"
    );


    const signOutButton =
        document.getElementById(
            "adminSignOutButton"
        );


    if (signOutButton) {

        signOutButton.disabled =
            false;


        signOutButton.textContent =
            "Sign Out";

    }


    if (adminPage) {

        adminPage.hidden =
            false;

    }


    /*
    ----------------------------------------------
    EXISTING ADMIN CONTROLLER
    ----------------------------------------------
    */

    if (
        !adminControllerStarted
    ) {

        await startAdminController();


        adminControllerStarted =
            true;

    }


    /*
    ----------------------------------------------
    POLL SUGGESTIONS CONTROLLER
    ----------------------------------------------
    */

    if (
        !pollSuggestionsStarted
    ) {

        await startPollSuggestionsController();


        pollSuggestionsStarted =
            true;

    }

}


/*
==================================================
HIDE ADMIN APPLICATION
==================================================
*/

function hideAdminApplication() {

    const adminPage =
        document.getElementById(
            "adminPage"
        );


    const sessionBar =
        document.getElementById(
            "adminSession"
        );


    if (adminPage) {

        adminPage.hidden =
            true;

    }


    if (sessionBar) {

        sessionBar.hidden =
            true;

    }

}


/*
==================================================
LOAD ADMIN COMPONENTS
==================================================
*/

async function loadAdminComponents() {

    await Promise.all([

        loadComponent(
            "adminHeroContainer",
            "components/admin-hero.html"
        ),

        loadComponent(
            "adminOverviewContainer",
            "components/admin-overview.html"
        ),

        loadComponent(
            "adminPollSuggestionsContainer",
            "components/admin-poll-suggestions.html"
        ),

        loadComponent(
            "adminCommunityPollsContainer",
            "components/admin-community-polls.html"
        ),

        loadComponent(
            "adminCreatePollContainer",
            "components/admin-poll-editor.html"
        )

    ]);

}


/*
==================================================
START EXISTING ADMIN CONTROLLER
==================================================
*/

async function startAdminController() {

    try {

        const controllerModule =
            await import(
                "./admin-controller.js"
            );


        if (
            typeof controllerModule
                .initializeAdminController !==
            "function"
        ) {

            throw new Error(
                "Admin controller initialization function was not found."
            );

        }


        controllerModule
            .initializeAdminController();


    } catch (error) {

        console.error(
            "Admin Center could not start:",
            error
        );


        showAdminFallback();

    }

}


/*
==================================================
START POLL SUGGESTIONS CONTROLLER
==================================================
*/

async function startPollSuggestionsController() {

    try {

        const controllerModule =
            await import(
                "./controllers/admin-poll-suggestions-controller.js"
            );


        if (
            typeof controllerModule
                .initializeAdminPollSuggestions !==
            "function"
        ) {

            throw new Error(
                "Poll Suggestions controller initialization function was not found."
            );

        }


        controllerModule
            .initializeAdminPollSuggestions();


    } catch (error) {

        console.error(
            "Poll Suggestions review could not start:",
            error
        );


        showPollSuggestionsFallback();

    }

}


/*
==================================================
SHOW LOGIN
==================================================
*/

function showLogin() {

    hideAdminApplication();


    const loginContainer =
        document.getElementById(
            "adminLoginContainer"
        );


    if (loginContainer) {

        loginContainer.hidden =
            false;

    }


    const submitButton =
        document.getElementById(
            "adminLoginSubmit"
        );


    if (submitButton) {

        submitButton.disabled =
            false;


        submitButton.textContent =
            "Sign In";

    }

}


/*
==================================================
LOGIN MESSAGE
==================================================
*/

function setLoginMessage(
    message,
    type
) {

    const element =
        document.getElementById(
            "adminLoginMessage"
        );


    if (!element) {

        return;

    }


    element.textContent =
        message;


    element.dataset.messageType =
        type;

}


/*
==================================================
FRIENDLY AUTH ERRORS
==================================================
*/

function getFriendlyAuthError(
    error
) {

    const code =
        error?.code ||
        "";


    if (
        code ===
        "auth/admin-access-denied"
    ) {

        return (
            "This account is not authorized to access the Civic Horizon Admin Center."
        );

    }


    if (
        code ===
            "auth/invalid-credential" ||
        code ===
            "auth/wrong-password" ||
        code ===
            "auth/user-not-found"
    ) {

        return (
            "The email or password is incorrect."
        );

    }


    if (
        code ===
        "auth/too-many-requests"
    ) {

        return (
            "Too many sign-in attempts. Please wait and try again."
        );

    }


    if (
        code ===
        "auth/network-request-failed"
    ) {

        return (
            "A network error occurred. Check your connection and try again."
        );

    }


    return (
        "Unable to sign in. Please try again."
    );

}


/*
==================================================
ADMIN FALLBACK
==================================================
*/

function showAdminFallback() {

    setText(
        "adminActivePollCount",
        "—"
    );


    setText(
        "adminCommunityVoteCount",
        "—"
    );


    setText(
        "adminPriorityParticipantCount",
        "—"
    );


    setText(
        "adminApprovalResponseCount",
        "—"
    );

}


/*
==================================================
POLL SUGGESTIONS FALLBACK
==================================================
*/

function showPollSuggestionsFallback() {

    const container =
        document.getElementById(
            "adminSuggestionsList"
        );


    if (!container) {

        return;

    }


    container.innerHTML = `

        <div class="admin-suggestions__empty">

            <h3>
                Poll suggestions unavailable
            </h3>

            <p>
                The suggestion review system could
                not be loaded. Refresh the page and
                try again.
            </p>

        </div>

    `;

}


/*
==================================================
HEADER INTERACTIONS
==================================================
*/

function initializeHeader() {

    const menuButton =
        document.getElementById(
            "mobileMenuButton"
        );


    const navigation =
        document.getElementById(
            "primaryNavigation"
        );


    const dropdownButtons =
        document.querySelectorAll(
            ".navigation-group__button"
        );


    if (
        menuButton &&
        navigation
    ) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    navigation.classList.toggle(
                        "open"
                    );


                menuButton.setAttribute(
                    "aria-expanded",
                    String(
                        isOpen
                    )
                );


                menuButton.setAttribute(

                    "aria-label",

                    isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"

                );


                if (!isOpen) {

                    closeDropdowns();

                }

            }
        );

    }


    dropdownButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    const group =
                        button.closest(
                            ".navigation-group"
                        );


                    if (!group) {

                        return;

                    }


                    const isOpen =
                        group.classList.contains(
                            "open"
                        );


                    closeDropdowns();


                    if (!isOpen) {

                        group.classList.add(
                            "open"
                        );


                        button.setAttribute(
                            "aria-expanded",
                            "true"
                        );

                    }

                }
            );

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                !event.target.closest(
                    ".navigation-group"
                )
            ) {

                closeDropdowns();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !==
                "Escape"
            ) {

                return;

            }


            closeDropdowns();


            if (
                navigation &&
                navigation.classList.contains(
                    "open"
                )
            ) {

                navigation.classList.remove(
                    "open"
                );


                if (menuButton) {

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuButton.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }

            }

        }
    );

}


/*
==================================================
DROPDOWN HELPERS
==================================================
*/

function closeDropdowns() {

    document
        .querySelectorAll(
            ".navigation-group.open"
        )
        .forEach(
            group => {

                group.classList.remove(
                    "open"
                );


                const button =
                    group.querySelector(
                        ".navigation-group__button"
                    );


                if (button) {

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

}


/*
==================================================
DOM HELPERS
==================================================
*/

function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            String(
                value
            );

    }

}


/*
==================================================
START
==================================================
*/

initializeAdminPage();