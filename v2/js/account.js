/*
==================================================
CIVIC HORIZON INDEX V2
STREAMLINED ACCOUNT CONTROLLER
==================================================
*/


import {

    subscribeToAuthState,

    createPublicAccount,

    signInPublicUser,

    sendPasswordReset,

    sendCurrentUserVerificationEmail,

    refreshCurrentUser

} from "./services/auth-service.js";


/*
==================================================
SETTINGS
==================================================
*/

const HOME_PAGE =
    "index.html";


const VERIFICATION_CHECK_INTERVAL =
    2000;


/*
==================================================
STATE
==================================================
*/

let verificationTimer =
    null;


let verificationCheckRunning =
    false;


let verificationMode =
    false;


/*
==================================================
INITIALIZE
==================================================
*/

async function initializeAccountPage() {

    await Promise.all([

        loadComponent(
            "headerContainer",
            "components/auth-header.html"
        ),

        loadComponent(
            "footerContainer",
            "components/footer.html"
        )

    ]);


    initializeAccountSwitcher();

    initializeCreateAccountForm();

    initializeSignInForm();

    initializePasswordReset();

    initializeVerificationEvents();

    initializeAuthState();

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
ACCOUNT SWITCHER
==================================================
*/

function initializeAccountSwitcher() {

    const signInButton =
        document.getElementById(
            "showSignInButton"
        );


    const createButton =
        document.getElementById(
            "showCreateAccountButton"
        );


    const signInPanel =
        document.getElementById(
            "signInPanel"
        );


    const createPanel =
        document.getElementById(
            "createAccountPanel"
        );


    signInButton
        ?.addEventListener(
            "click",
            () => {

                if (
                    verificationMode
                ) {

                    return;

                }


                showSignInPanel();

            }
        );


    createButton
        ?.addEventListener(
            "click",
            () => {

                if (
                    verificationMode
                ) {

                    return;

                }


                showCreateAccountPanel();

            }
        );

}


/*
==================================================
SHOW SIGN IN
==================================================
*/

function showSignInPanel() {

    const signInPanel =
        document.getElementById(
            "signInPanel"
        );


    const createPanel =
        document.getElementById(
            "createAccountPanel"
        );


    const signInButton =
        document.getElementById(
            "showSignInButton"
        );


    const createButton =
        document.getElementById(
            "showCreateAccountButton"
        );


    if (
        signInPanel
    ) {

        signInPanel.hidden =
            false;

    }


    if (
        createPanel
    ) {

        createPanel.hidden =
            true;

    }


    signInButton
        ?.classList.add(
            "is-active"
        );


    createButton
        ?.classList.remove(
            "is-active"
        );


    setText(
        "signInMessage",
        ""
    );


    focusElement(
        "signInEmail"
    );

}


/*
==================================================
SHOW CREATE ACCOUNT
==================================================
*/

function showCreateAccountPanel() {

    const signInPanel =
        document.getElementById(
            "signInPanel"
        );


    const createPanel =
        document.getElementById(
            "createAccountPanel"
        );


    const signInButton =
        document.getElementById(
            "showSignInButton"
        );


    const createButton =
        document.getElementById(
            "showCreateAccountButton"
        );


    if (
        signInPanel
    ) {

        signInPanel.hidden =
            true;

    }


    if (
        createPanel
    ) {

        createPanel.hidden =
            false;

    }


    createButton
        ?.classList.add(
            "is-active"
        );


    signInButton
        ?.classList.remove(
            "is-active"
        );


    setText(
        "createAccountMessage",
        ""
    );


    focusElement(
        "createDisplayName"
    );

}


/*
==================================================
AUTH STATE
==================================================
*/

function initializeAuthState() {

    subscribeToAuthState(

        async user => {

            if (!user) {

                stopVerificationWatch();

                verificationMode =
                    false;


                return;

            }


            /*
            ------------------------------------------
            VERIFIED USER

            Go directly to Civic Horizon Home.
            No profile page.
            No verification page.
            ------------------------------------------
            */

            if (
                user.emailVerified
            ) {

                stopVerificationWatch();


                enterSite();

                return;

            }


            /*
            ------------------------------------------
            UNVERIFIED USER

            Stay on this compact account screen.
            Quietly watch Firebase until verification
            is completed.
            ------------------------------------------
            */

            enterVerificationMode();

        },

        error => {

            console.error(
                "Account auth state error:",
                error
            );

        }

    );

}


/*
==================================================
CREATE ACCOUNT FORM
==================================================
*/

function initializeCreateAccountForm() {

    document
        .getElementById(
            "createAccountForm"
        )
        ?.addEventListener(
            "submit",
            handleCreateAccount
        );

}


/*
==================================================
CREATE ACCOUNT
==================================================
*/

async function handleCreateAccount(
    event
) {

    event.preventDefault();


    const displayName =
        getInputValue(
            "createDisplayName"
        );


    const zipCode =
        getInputValue(
            "createZipCode"
        );


    const birthday =
        getInputValue(
            "createBirthday"
        );


    const email =
        getInputValue(
            "createEmail"
        );


    const password =
        getInputValue(
            "createPassword"
        );


    const passwordConfirm =
        getInputValue(
            "createPasswordConfirm"
        );


    const agreement =
        document.getElementById(
            "createAgreement"
        );


    const agreementAccepted =
        Boolean(
            agreement?.checked
        );


    /*
    ----------------------------------------------
    BASIC VALIDATION
    ----------------------------------------------
    */

    if (!displayName) {

        setText(
            "createAccountMessage",
            "Enter your name."
        );


        return;

    }


    if (
        !/^\d{5}$/.test(
            zipCode
        )
    ) {

        setText(
            "createAccountMessage",
            "Enter a valid 5-digit ZIP code."
        );


        return;

    }


    if (!birthday) {

        setText(
            "createAccountMessage",
            "Enter your birthday."
        );


        return;

    }


    if (!email) {

        setText(
            "createAccountMessage",
            "Enter your email address."
        );


        return;

    }


    if (!password) {

        setText(
            "createAccountMessage",
            "Enter a password."
        );


        return;

    }


    if (
        password !==
        passwordConfirm
    ) {

        setText(
            "createAccountMessage",
            "The passwords do not match."
        );


        return;

    }


    if (
        !agreementAccepted
    ) {

        setText(
            "createAccountMessage",
            "Please agree to the Terms and Privacy Policy."
        );


        return;

    }


    /*
    ----------------------------------------------
    CREATE ACCOUNT
    ----------------------------------------------
    */

    const button =
        document.getElementById(
            "createAccountButton"
        );


    setButtonBusy(
        button,
        true,
        "Creating Account..."
    );


    setText(
        "createAccountMessage",
        "Creating your account..."
    );


    try {

        /*
        createPublicAccount() already:

        - creates Firebase user
        - creates participant profile
        - stores birthday / ZIP
        - sends verification email
        */

        await createPublicAccount({

            displayName,

            email,

            zipCode,

            birthday,

            password,

            agreementAccepted

        });


        /*
        ------------------------------------------
        DO NOT REDIRECT TO ANOTHER PAGE.

        Stay here and wait quietly for verification.
        ------------------------------------------
        */

        enterVerificationMode(
            "create"
        );

    } catch (error) {

        console.error(
            "Account creation failed:",
            error
        );


        setText(
            "createAccountMessage",
            getFriendlyAuthError(
                error
            )
        );


        setButtonBusy(
            button,
            false,
            "Create Account"
        );

    }

}


/*
==================================================
SIGN IN FORM
==================================================
*/

function initializeSignInForm() {

    document
        .getElementById(
            "signInForm"
        )
        ?.addEventListener(
            "submit",
            handleSignIn
        );

}


/*
==================================================
SIGN IN
==================================================
*/

async function handleSignIn(
    event
) {

    event.preventDefault();


    const email =
        getInputValue(
            "signInEmail"
        );


    const password =
        getInputValue(
            "signInPassword"
        );


    if (
        !email ||
        !password
    ) {

        setText(
            "signInMessage",
            "Enter your email and password."
        );


        return;

    }


    const button =
        document.getElementById(
            "signInButton"
        );


    setButtonBusy(
        button,
        true,
        "Signing In..."
    );


    setText(
        "signInMessage",
        "Signing in..."
    );


    try {

        const user =
            await signInPublicUser(
                email,
                password
            );


        /*
        ------------------------------------------
        VERIFIED

        Straight to Home.
        ------------------------------------------
        */

        if (
            user.emailVerified
        ) {

            enterSite();

            return;

        }


        /*
        ------------------------------------------
        UNVERIFIED

        Stay here. No separate verification page.
        ------------------------------------------
        */

        enterVerificationMode(
            "signin"
        );


        /*
        Send one new verification email for a
        returning unverified user.

        Account creation already sent one, so we
        only do this for sign-in.
        */

        try {

            await sendCurrentUserVerificationEmail();

        } catch (verificationError) {

            console.warn(
                "Verification email resend was not completed:",
                verificationError
            );

        }

    } catch (error) {

        console.error(
            "Sign in failed:",
            error
        );


        setText(
            "signInMessage",
            getFriendlyAuthError(
                error
            )
        );


        setButtonBusy(
            button,
            false,
            "Sign In"
        );

    }

}


/*
==================================================
VERIFICATION MODE
==================================================
*/

function enterVerificationMode(
    source =
        "session"
) {

    verificationMode =
        true;


    disableSwitcher(
        true
    );


    if (
        source ===
        "create"
    ) {

        setText(
            "createAccountMessage",
            "Account created. Check your email to finish signing in. We’ll continue automatically when verification is complete."
        );


        setButtonBusy(
            document.getElementById(
                "createAccountButton"
            ),
            true,
            "Waiting for Email Verification..."
        );

    } else {

        showSignInPanelWithoutFocus();


        setText(
            "signInMessage",
            "Check your email to finish signing in. This page will continue automatically once your email is verified."
        );


        setButtonBusy(
            document.getElementById(
                "signInButton"
            ),
            true,
            "Waiting for Verification..."
        );

    }


    createResendButton();


    startVerificationWatch();

}


/*
==================================================
SIGN IN PANEL WITHOUT RESETTING MESSAGE
==================================================
*/

function showSignInPanelWithoutFocus() {

    const signInPanel =
        document.getElementById(
            "signInPanel"
        );


    const createPanel =
        document.getElementById(
            "createAccountPanel"
        );


    if (
        signInPanel
    ) {

        signInPanel.hidden =
            false;

    }


    if (
        createPanel
    ) {

        createPanel.hidden =
            true;

    }


    document
        .getElementById(
            "showSignInButton"
        )
        ?.classList.add(
            "is-active"
        );


    document
        .getElementById(
            "showCreateAccountButton"
        )
        ?.classList.remove(
            "is-active"
        );

}


/*
==================================================
VERIFICATION WATCH
==================================================
*/

function startVerificationWatch() {

    if (
        verificationTimer
    ) {

        return;

    }


    /*
    Check immediately.
    */

    checkVerificationStatus();


    /*
    Then continue checking quietly.
    */

    verificationTimer =
        window.setInterval(
            checkVerificationStatus,
            VERIFICATION_CHECK_INTERVAL
        );

}


/*
==================================================
STOP VERIFICATION WATCH
==================================================
*/

function stopVerificationWatch() {

    if (
        verificationTimer
    ) {

        window.clearInterval(
            verificationTimer
        );

    }


    verificationTimer =
        null;


    verificationCheckRunning =
        false;

}


/*
==================================================
CHECK VERIFICATION
==================================================
*/

async function checkVerificationStatus() {

    if (
        verificationCheckRunning
    ) {

        return;

    }


    verificationCheckRunning =
        true;


    try {

        const user =
            await refreshCurrentUser();


        if (
            user?.emailVerified
        ) {

            stopVerificationWatch();


            enterSite();

        }

    } catch (error) {

        /*
        Do not interrupt the participant with
        repeated errors while the background
        verification check is running.
        */

        console.warn(
            "Background verification check:",
            error
        );

    } finally {

        verificationCheckRunning =
            false;

    }

}


/*
==================================================
VERIFY IMMEDIATELY WHEN USER RETURNS
==================================================
*/

function initializeVerificationEvents() {

    /*
    If verification happens in another tab,
    check immediately when the participant returns.
    */

    window.addEventListener(
        "focus",
        () => {

            if (
                verificationMode
            ) {

                checkVerificationStatus();

            }

        }
    );


    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                verificationMode &&
                document.visibilityState ===
                "visible"
            ) {

                checkVerificationStatus();

            }

        }
    );

}


/*
==================================================
RESEND VERIFICATION BUTTON
==================================================
*/

function createResendButton() {

    if (
        document.getElementById(
            "accountResendVerificationButton"
        )
    ) {

        return;

    }


    const button =
        document.createElement(
            "button"
        );


    button.type =
        "button";


    button.id =
        "accountResendVerificationButton";


    button.className =
        "account-text-button";


    button.textContent =
        "Resend verification email";


    button.addEventListener(
        "click",
        handleResendVerification
    );


    const message =
        document.getElementById(
            "signInMessage"
        ) ||
        document.getElementById(
            "createAccountMessage"
        );


    if (
        message?.parentElement
    ) {

        message.parentElement.insertBefore(
            button,
            message.nextSibling
        );

    }

}


/*
==================================================
RESEND VERIFICATION
==================================================
*/

async function handleResendVerification(
    event
) {

    const button =
        event.currentTarget;


    if (
        button.disabled
    ) {

        return;

    }


    button.disabled =
        true;


    button.textContent =
        "Sending...";


    try {

        const result =
            await sendCurrentUserVerificationEmail();


        if (
            result?.alreadyVerified
        ) {

            enterSite();

            return;

        }


        button.textContent =
            "Verification email sent";


        window.setTimeout(
            () => {

                button.disabled =
                    false;


                button.textContent =
                    "Resend verification email";

            },
            4000
        );

    } catch (error) {

        console.error(
            "Verification email resend failed:",
            error
        );


        button.disabled =
            false;


        button.textContent =
            "Resend verification email";

    }

}


/*
==================================================
DISABLE SWITCHER DURING VERIFICATION
==================================================
*/

function disableSwitcher(
    disabled
) {

    const signInButton =
        document.getElementById(
            "showSignInButton"
        );


    const createButton =
        document.getElementById(
            "showCreateAccountButton"
        );


    if (
        signInButton
    ) {

        signInButton.disabled =
            disabled;

    }


    if (
        createButton
    ) {

        createButton.disabled =
            disabled;

    }

}


/*
==================================================
ENTER CIVIC HORIZON
==================================================
*/

function enterSite() {

    stopVerificationWatch();


    /*
    replace() keeps Back from returning the
    participant to the login screen.
    */

    window.location.replace(
        HOME_PAGE
    );

}


/*
==================================================
PASSWORD RESET
==================================================
*/

function initializePasswordReset() {

    document
        .getElementById(
            "forgotPasswordButton"
        )
        ?.addEventListener(
            "click",
            handlePasswordReset
        );

}


/*
==================================================
HANDLE PASSWORD RESET
==================================================
*/

async function handlePasswordReset() {

    const email =
        getInputValue(
            "signInEmail"
        );


    if (!email) {

        setText(
            "signInMessage",
            "Enter your email address first."
        );


        return;

    }


    const button =
        document.getElementById(
            "forgotPasswordButton"
        );


    if (!button) {

        return;

    }


    button.disabled =
        true;


    setText(
        "signInMessage",
        "Sending reset instructions..."
    );


    try {

        await sendPasswordReset(
            email
        );


        setText(
            "signInMessage",
            "If an account exists for that email, password reset instructions will be sent."
        );

    } catch (error) {

        console.error(
            "Password reset failed:",
            error
        );


        setText(
            "signInMessage",
            "Password reset could not be started. Please try again."
        );

    } finally {

        button.disabled =
            false;

    }

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
        String(
            error?.code ||
            ""
        );


    const message =
        String(
            error?.message ||
            ""
        );


    switch (
        code
    ) {

        case "auth/email-already-in-use":

            return "An account already exists with that email address. Sign in instead.";


        case "auth/invalid-email":

            return "Enter a valid email address.";


        case "auth/weak-password":

            return "Choose a stronger password.";


        case "auth/invalid-credential":

        case "auth/wrong-password":

        case "auth/user-not-found":

            return "The email or password is incorrect.";


        case "auth/too-many-requests":

            return "Too many attempts were made. Please try again later.";


        case "auth/network-request-failed":

            return "A network problem prevented the request. Please try again.";


        default:

            if (
                message &&
                !message.startsWith(
                    "Firebase:"
                )
            ) {

                return message;

            }


            return "The account request could not be completed. Please try again.";

    }

}


/*
==================================================
DOM HELPERS
==================================================
*/

function getInputValue(
    elementId
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        return "";

    }


    return String(
        element.value ||
        ""
    ).trim();

}


function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (
        element
    ) {

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


function focusElement(
    elementId
) {

    document
        .getElementById(
            elementId
        )
        ?.focus();

}


/*
==================================================
START
==================================================
*/

initializeAccountPage();