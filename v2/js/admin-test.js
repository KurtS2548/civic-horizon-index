/*
==================================================
CIVIC HORIZON INDEX V2
SECURE ADMIN CENTER INITIALIZATION
==================================================
*/

import {
    subscribeToAuthState,
    signInAdmin
} from "./services/auth-service.js";


/*
==================================================
STATE
==================================================
*/

let adminComponentsLoaded = false;
let adminControllerStarted = false;


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

    await Promise.all([

        loadComponent(
            "headerContainer",
            "components/header.html"
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

            if (user) {

                await showAuthenticatedAdmin(
                    user
                );

            } else {

                showLogin();

            }

        }
    );

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


async function handleLoginSubmit(
    event
) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const email =
        form.elements.email?.value || "";


    const password =
        form.elements.password?.value || "";


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
SHOW AUTHENTICATED ADMIN
==================================================
*/

async function showAuthenticatedAdmin(
    user
) {

    const loginContainer =
        document.getElementById(
            "adminLoginContainer"
        );


    const adminPage =
        document.getElementById(
            "adminPage"
        );


    if (loginContainer) {

        loginContainer.hidden =
            true;

    }


    if (!adminComponentsLoaded) {

        await loadAdminComponents();

        adminComponentsLoaded =
            true;

    }


    if (adminPage) {

        adminPage.hidden =
            false;

    }


    if (!adminControllerStarted) {

        await startAdminController();

        adminControllerStarted =
            true;

    }


    console.log(
        "Authenticated administrator:",
        user.email
    );

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
START ADMIN CONTROLLER
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
SHOW LOGIN
==================================================
*/

function showLogin() {

    const loginContainer =
        document.getElementById(
            "adminLoginContainer"
        );


    const adminPage =
        document.getElementById(
            "adminPage"
        );


    if (loginContainer) {

        loginContainer.hidden =
            false;

    }


    if (adminPage) {

        adminPage.hidden =
            true;

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
        error?.code || "";


    if (
        code === "auth/invalid-credential" ||
        code === "auth/wrong-password" ||
        code === "auth/user-not-found"
    ) {

        return "The email or password is incorrect.";

    }


    if (
        code === "auth/too-many-requests"
    ) {

        return "Too many sign-in attempts. Please wait and try again.";

    }


    if (
        code === "auth/network-request-failed"
    ) {

        return "A network error occurred. Check your connection and try again.";

    }


    return "Unable to sign in. Please try again.";

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
                    String(isOpen)
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
                event.key !== "Escape"
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
            String(value);

    }

}


/*
==================================================
START
==================================================
*/

initializeAdminPage();