/*
==================================================
CIVIC HORIZON INDEX V2
ACCOUNT CONTROLLER
==================================================
*/


import {

    subscribeToAuthState,

    createPublicAccount,

    signInPublicUser,

    sendPasswordReset,

    sendCurrentUserVerificationEmail,

    refreshCurrentUser,

    signOutPublicUser

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

    initializeBirthdaySelectors();

    initializeCreateAccountForm();

    initializeSignInForm();

    initializePasswordReset();

    initializeVerificationActions();

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

    document
        .getElementById(
            "showSignInButton"
        )
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


    document
        .getElementById(
            "showCreateAccountButton"
        )
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
BIRTHDAY SELECTORS
==================================================
*/

function initializeBirthdaySelectors() {

    const monthSelect =
        document.getElementById(
            "createBirthMonth"
        );


    const daySelect =
        document.getElementById(
            "createBirthDay"
        );


    const yearSelect =
        document.getElementById(
            "createBirthYear"
        );


    if (
        !monthSelect ||
        !daySelect ||
        !yearSelect
    ) {

        return;

    }


    populateBirthYears(
        yearSelect
    );


    populateBirthDays(
        monthSelect,
        daySelect,
        yearSelect
    );


    monthSelect.addEventListener(
        "change",
        () => {

            populateBirthDays(
                monthSelect,
                daySelect,
                yearSelect
            );


            updateBirthdayValue(
                monthSelect,
                daySelect,
                yearSelect
            );

        }
    );


    daySelect.addEventListener(
        "change",
        () => {

            updateBirthdayValue(
                monthSelect,
                daySelect,
                yearSelect
            );

        }
    );


    yearSelect.addEventListener(
        "change",
        () => {

            populateBirthDays(
                monthSelect,
                daySelect,
                yearSelect
            );


            updateBirthdayValue(
                monthSelect,
                daySelect,
                yearSelect
            );

        }
    );

}


/*
==================================================
POPULATE BIRTH YEARS
==================================================
*/

function populateBirthYears(
    yearSelect
) {

    const currentYear =
        new Date().getFullYear();


    const oldestYear =
        currentYear - 120;


    for (
        let year = currentYear;
        year >= oldestYear;
        year -= 1
    ) {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            String(
                year
            );


        option.textContent =
            String(
                year
            );


        yearSelect.appendChild(
            option
        );

    }

}


/*
==================================================
POPULATE BIRTH DAYS
==================================================
*/

function populateBirthDays(
    monthSelect,
    daySelect,
    yearSelect
) {

    const previousDay =
        daySelect.value;


    daySelect.innerHTML =
        `
            <option value="">
                Day
            </option>
        `;


    const month =
        Number(
            monthSelect.value
        );


    const year =
        Number(
            yearSelect.value
        );


    if (
        !month
    ) {

        return;

    }


    const yearForCalculation =
        year ||
        2000;


    const daysInMonth =
        new Date(
            yearForCalculation,
            month,
            0
        ).getDate();


    for (
        let day = 1;
        day <= daysInMonth;
        day += 1
    ) {

        const option =
            document.createElement(
                "option"
            );


        const dayValue =
            String(
                day
            ).padStart(
                2,
                "0"
            );


        option.value =
            dayValue;


        option.textContent =
            String(
                day
            );


        if (
            dayValue ===
            previousDay
        ) {

            option.selected =
                true;

        }


        daySelect.appendChild(
            option
        );

    }

}


/*
==================================================
UPDATE BIRTHDAY VALUE
==================================================
*/

function updateBirthdayValue(
    monthSelect,
    daySelect,
    yearSelect
) {

    const birthdayInput =
        document.getElementById(
            "createBirthday"
        );


    if (
        !birthdayInput
    ) {

        return;

    }


    const month =
        monthSelect.value;


    const day =
        daySelect.value;


    const year =
        yearSelect.value;


    if (
        !month ||
        !day ||
        !year
    ) {

        birthdayInput.value =
            "";


        return;

    }


    birthdayInput.value =
        `${year}-${month}-${day}`;

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


    document
        .getElementById(
            "showCreateAccountButton"
        )
        ?.classList.add(
            "is-active"
        );


    document
        .getElementById(
            "showSignInButton"
        )
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

            /*
            ------------------------------------------
            SIGNED OUT
            ------------------------------------------
            */

            if (!user) {

                resetVerificationMode();


                return;

            }


            /*
            ------------------------------------------
            VERIFIED
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
            ------------------------------------------
            */

            enterVerificationMode(
                "session"
            );

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


    const agreementAccepted =
        Boolean(
            document
                .getElementById(
                    "createAgreement"
                )
                ?.checked
        );


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

        await createPublicAccount({

            displayName,

            email,

            zipCode,

            birthday,

            password,

            agreementAccepted

        });


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


        if (
            user.emailVerified
        ) {

            enterSite();

            return;

        }


        enterVerificationMode(
            "signin"
        );


        /*
        ------------------------------------------
        SEND A FRESH VERIFICATION EMAIL
        ------------------------------------------
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


    showSignInPanelWithoutReset();


    showVerificationActions();


    if (
        source ===
        "create"
    ) {

        setText(
            "signInMessage",
            "Account created. Check your email and click the verification link. We’ll continue automatically once your email is verified."
        );

    } else {

        setText(
            "signInMessage",
            "Check your email and click the verification link. This page will continue automatically once your email is verified."
        );

    }


    setButtonBusy(
        document.getElementById(
            "signInButton"
        ),
        true,
        "Waiting for Verification..."
    );


    startVerificationWatch();

}


/*
==================================================
SHOW SIGN IN WITHOUT RESETTING MESSAGE
==================================================
*/

function showSignInPanelWithoutReset() {

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
VERIFICATION ACTIONS
==================================================
*/

function initializeVerificationActions() {

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
            handleVerificationSignOut
        );

}


/*
==================================================
SHOW VERIFICATION ACTIONS
==================================================
*/

function showVerificationActions() {

    const actions =
        document.getElementById(
            "verificationActions"
        );


    if (
        actions
    ) {

        actions.hidden =
            false;

    }

}


/*
==================================================
HIDE VERIFICATION ACTIONS
==================================================
*/

function hideVerificationActions() {

    const actions =
        document.getElementById(
            "verificationActions"
        );


    if (
        actions
    ) {

        actions.hidden =
            true;

    }

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


    checkVerificationStatus();


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
CHECK VERIFICATION STATUS
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

            enterSite();

        }

    } catch (error) {

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
CHECK WHEN USER RETURNS
==================================================
*/

function initializeVerificationEvents() {

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


        setText(
            "signInMessage",
            "Verification email could not be sent. Please try again."
        );

    }

}


/*
==================================================
SIGN OUT / USE ANOTHER ACCOUNT
==================================================
*/

async function handleVerificationSignOut(
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
        "Signing out...";


    try {

        stopVerificationWatch();


        await signOutPublicUser();


        resetVerificationMode();


        setText(
            "signInMessage",
            "You are signed out. Sign in or create another account."
        );


        document
            .getElementById(
                "signInPassword"
            )
            ?.focus();

    } catch (error) {

        console.error(
            "Verification sign-out failed:",
            error
        );


        button.disabled =
            false;


        button.textContent =
            "Sign out / Use another account";

    }

}


/*
==================================================
RESET VERIFICATION MODE
==================================================
*/

function resetVerificationMode() {

    stopVerificationWatch();


    verificationMode =
        false;


    disableSwitcher(
        false
    );


    hideVerificationActions();


    setButtonBusy(
        document.getElementById(
            "signInButton"
        ),
        false,
        "Sign In"
    );


    setButtonBusy(
        document.getElementById(
            "createAccountButton"
        ),
        false,
        "Create Account"
    );


    const resendButton =
        document.getElementById(
            "resendVerificationButton"
        );


    if (
        resendButton
    ) {

        resendButton.disabled =
            false;


        resendButton.textContent =
            "Resend verification email";

    }


    const signOutButton =
        document.getElementById(
            "verificationSignOutButton"
        );


    if (
        signOutButton
    ) {

        signOutButton.disabled =
            false;


        signOutButton.textContent =
            "Sign out / Use another account";

    }

}


/*
==================================================
DISABLE ACCOUNT SWITCHER
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


    verificationMode =
        false;


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