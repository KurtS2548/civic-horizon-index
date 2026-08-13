/*
==================================================
CIVIC HORIZON INDEX V2
VERIFY ACCOUNT CONTROLLER
==================================================
*/


import {

    sendCurrentUserVerificationEmail,

    refreshCurrentUser

} from "./services/auth-service.js";


import {

    handleVerificationEntryPage,

    signOutAndExit,

    consumeReturnPage

} from "./services/auth-guard.js";


/*
==================================================
INITIALIZE
==================================================
*/

async function initializeVerificationPage() {

    await Promise.all([

     

        loadComponent(
            "footerContainer",
            "components/footer.html"
        )

    ]);


    initializeHeader();

    initializeVerificationActions();


    /*
    ----------------------------------------------
    AUTH GATE

    Signed out:
        account.html

    Already verified:
        handled by refresh flow below / redirect
    ----------------------------------------------
    */

    handleVerificationEntryPage();

}


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


        return false;

    }

}


/*
==================================================
VERIFICATION ACTIONS
==================================================
*/

function initializeVerificationActions() {

    document
        .getElementById(
            "refreshVerificationButton"
        )
        ?.addEventListener(
            "click",
            handleVerificationRefresh
        );


    document
        .getElementById(
            "resendVerificationButton"
        )
        ?.addEventListener(
            "click",
            handleResendVerification
        );


    document
        .getElementById(
            "verificationSignOutButton"
        )
        ?.addEventListener(
            "click",
            handleSignOut
        );

}


/*
==================================================
REFRESH VERIFICATION
==================================================
*/

async function handleVerificationRefresh() {

    const button =
        document.getElementById(
            "refreshVerificationButton"
        );


    setButtonBusy(
        button,
        true,
        "Checking..."
    );


    setText(
        "verificationMessage",
        "Checking your verification status..."
    );


    try {

        const user =
            await refreshCurrentUser();


        if (!user) {

            window.location.replace(
                "account.html"
            );

            return;

        }


        if (
            user.emailVerified
        ) {

            setText(
                "verificationStatus",
                "Verified"
            );


            setText(
                "verificationStatusMessage",
                "Your email has been verified."
            );


            setText(
                "verificationMessage",
                "Verification complete."
            );


            /*
            ------------------------------------------
            RETURN USER TO WHERE THEY WERE GOING

            If there is no saved destination,
            profile.html is the default.
            ------------------------------------------
            */

            const destination =
                consumeReturnPage(
                    "profile.html"
                );


            window.location.replace(
                destination
            );


            return;

        }


        setText(
            "verificationStatus",
            "Verification Required"
        );


        setText(
            "verificationStatusMessage",
            "Check your inbox and click the Civic Horizon verification link."
        );


        setText(
            "verificationMessage",
            "Your email has not been verified yet."
        );

    } catch (error) {

        console.error(
            "Verification refresh failed:",
            error
        );


        setText(
            "verificationMessage",
            "Verification status could not be refreshed."
        );

    } finally {

        setButtonBusy(
            button,
            false,
            "I've Verified My Email"
        );

    }

}


/*
==================================================
RESEND VERIFICATION EMAIL
==================================================
*/

async function handleResendVerification() {

    const button =
        document.getElementById(
            "resendVerificationButton"
        );


    setButtonBusy(
        button,
        true,
        "Sending..."
    );


    setText(
        "verificationMessage",
        "Sending verification email..."
    );


    try {

        const result =
            await sendCurrentUserVerificationEmail();


        if (
            result?.alreadyVerified
        ) {

            setText(
                "verificationStatus",
                "Verified"
            );


            setText(
                "verificationStatusMessage",
                "Your email has already been verified."
            );


            setText(
                "verificationMessage",
                "Verification complete."
            );


            const destination =
                consumeReturnPage(
                    "profile.html"
                );


            window.location.replace(
                destination
            );


            return;

        }


        setText(
            "verificationMessage",
            "Verification email sent. Check your inbox and Junk folder."
        );

    } catch (error) {

        console.error(
            "Verification email failed:",
            error
        );


        setText(
            "verificationMessage",
            "Verification email could not be sent. Please try again."
        );

    } finally {

        setButtonBusy(
            button,
            false,
            "Resend Verification Email"
        );

    }

}


/*
==================================================
RELIABLE SIGN OUT
==================================================
*/

async function handleSignOut() {

    const button =
        document.getElementById(
            "verificationSignOutButton"
        );


    if (!button) {

        return;

    }


    button.disabled =
        true;


    button.textContent =
        "Signing Out...";


    setText(
        "verificationMessage",
        "Signing out..."
    );


    try {

        /*
        ------------------------------------------
        THIS WAITS FOR FIREBASE TO CONFIRM
        auth.currentUser HAS BEEN CLEARED.
        ------------------------------------------
        */

        await signOutAndExit();

    } catch (error) {

        console.error(
            "Verification page sign out failed:",
            error
        );


        button.disabled =
            false;


        button.textContent =
            "Sign Out";


        setText(
            "verificationMessage",
            "Sign out could not be completed. Please try again."
        );

    }

}


/*
==================================================
HEADER
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

}


/*
==================================================
DROPDOWNS
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


function setButtonBusy(
    button,
    busy,
    text
) {

    if (!button) {

        return;

    }


    button.disabled =
        busy;


    button.textContent =
        text;

}


/*
==================================================
START
==================================================
*/

initializeVerificationPage();