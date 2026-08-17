/*
==================================================
CIVIC HORIZON INDEX V2
CONTACT PAGE CONTROLLER
==================================================
*/


import {

    database,
    auth

} from "../../js/firebase.js";


import {

    ref,
    push,
    set

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


import {

    reload,
    getIdToken

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/*
==================================================
DATABASE PATH
==================================================
*/

const contactMessagesRef =
    ref(
        database,
        "contactMessages"
    );


/*
==================================================
INITIALIZE
==================================================
*/

async function initializeContactPage() {

    await Promise.all([

        loadComponent(
            "siteHeader",
            "components/header.html"
        ),

        loadComponent(
            "siteFooter",
            "components/footer.html"
        )

    ]);


    initializeHeader();

    initializeGeneralContactForm();

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
GENERAL CONTACT FORM
==================================================
*/

function initializeGeneralContactForm() {

    document
        .getElementById(
            "generalContactForm"
        )
        ?.addEventListener(
            "submit",
            handleGeneralContact
        );

}


/*
==================================================
HANDLE GENERAL CONTACT
==================================================
*/

async function handleGeneralContact(
    event
) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );


    const name =
        getInputValue(
            "contactName"
        );


    const email =
        getInputValue(
            "contactEmail"
        );


    const category =
        getInputValue(
            "contactCategory"
        );


    const message =
        getInputValue(
            "contactMessage"
        );


    /*
    ----------------------------------------------
    VALIDATION
    ----------------------------------------------
    */

    if (
        name.length <
        2
    ) {

        showMessage(
            "generalContactMessage",
            "Enter your name.",
            "error"
        );


        return;

    }


    if (
        !isValidEmail(
            email
        )
    ) {

        showMessage(
            "generalContactMessage",
            "Enter a valid email address.",
            "error"
        );


        return;

    }


    if (
        ![
            "general",
            "problem",
            "account",
            "feedback",
            "privacy",
            "other"
        ].includes(
            category
        )
    ) {

        showMessage(
            "generalContactMessage",
            "Choose what you need help with.",
            "error"
        );


        return;

    }


    if (
        message.length <
        10
    ) {

        showMessage(
            "generalContactMessage",
            "Enter a message with a little more information.",
            "error"
        );


        return;

    }


    if (
        message.length >
        1500
    ) {

        showMessage(
            "generalContactMessage",
            "Your message must be 1,500 characters or fewer.",
            "error"
        );


        return;

    }


    if (
        containsClearlyProhibitedContent(
            message
        )
    ) {

        showMessage(
            "generalContactMessage",
            "Messages containing hate, harassment, threats, or attacks against people or groups are not permitted.",
            "error"
        );


        return;

    }


    /*
    ----------------------------------------------
    AUTHENTICATED PARTICIPANT CHECK
    ----------------------------------------------
    */

    let user =
        auth.currentUser;


    if (!user) {

        showMessage(
            "generalContactMessage",
            "You must be signed in to send a message.",
            "error"
        );


        return;

    }


    /*
    ----------------------------------------------
    REFRESH ACCOUNT STATE
    ----------------------------------------------
    */

    try {

        await reload(
            user
        );


        user =
            auth.currentUser ||
            user;


        try {

            await getIdToken(
                user,
                true
            );

        } catch (tokenError) {

            console.warn(
                "Contact token refresh could not be completed:",
                tokenError
            );

        }

    } catch (reloadError) {

        console.warn(
            "Contact account refresh could not be completed:",
            reloadError
        );


        user =
            auth.currentUser ||
            user;

    }


    if (!user) {

        showMessage(
            "generalContactMessage",
            "Your signed-in session could not be confirmed. Please sign in again.",
            "error"
        );


        return;

    }


    if (
        !user.emailVerified
    ) {

        showMessage(
            "generalContactMessage",
            "Please verify your email before sending a message.",
            "error"
        );


        return;

    }


    /*
    ----------------------------------------------
    SUBMIT
    ----------------------------------------------
    */

    setButtonBusy(
        submitButton,
        true,
        "Sending..."
    );


    showMessage(
        "generalContactMessage",
        "Sending your message...",
        "info"
    );


    try {

        const messageReference =
            push(
                contactMessagesRef
            );


        const record = {

            name,

            email,

            category,

            message,

            status:
                "new",

            submittedAt:
                new Date().toISOString(),

            source:
                "contactPage",

            submittedByUid:
                user.uid,

            submittedByVerifiedAccount:
                true

        };


        await set(
            messageReference,
            record
        );


        form.reset();


        showMessage(
            "generalContactMessage",
            "Thank you. Your message has been received.",
            "success"
        );

    } catch (error) {

        console.error(
            "Contact message could not be submitted:",
            error
        );


        showMessage(
            "generalContactMessage",
            `Your message could not be sent right now. ${error?.code || ""}`,
            "error"
        );

    } finally {

        setButtonBusy(
            submitButton,
            false,
            "Send Message"
        );

    }

}


/*
==================================================
CLEARLY PROHIBITED CONTENT SCREEN
==================================================
*/

function containsClearlyProhibitedContent(
    value
) {

    const text =
        String(
            value ||
            ""
        )
            .toLowerCase()
            .trim();


    if (!text) {

        return false;

    }


    const prohibitedPatterns = [

        /\bi will kill\b/,

        /\bwe should kill\b/,

        /\bgo kill yourself\b/,

        /\bi will hurt you\b/,

        /\bwe should hurt\b/

    ];


    return prohibitedPatterns
        .some(
            pattern =>
                pattern.test(
                    text
                )
        );

}


/*
==================================================
EMAIL VALIDATION
==================================================
*/

function isValidEmail(
    value
) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(
            String(
                value ||
                ""
            ).trim()
        );

}


/*
==================================================
FORM INPUT
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


/*
==================================================
BUTTON STATE
==================================================
*/

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
MESSAGE
==================================================
*/

function showMessage(
    elementId,
    message,
    type
) {

    const element =
        document.getElementById(
            elementId
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


                menuButton.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );


                if (
                    !isOpen
                ) {

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


                    if (
                        !isOpen
                    ) {

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
CLOSE DROPDOWNS
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


                if (
                    button
                ) {

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
START
==================================================
*/

initializeContactPage();