/*
==================================================
CIVIC HORIZON INDEX V2
CONTACT + POLL SUGGESTIONS
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


/*
==================================================
DATABASE PATHS
==================================================
*/

const pollSuggestionsRef =
    ref(
        database,
        "pollSuggestions"
    );


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

    initializePollSuggestionForm();

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
POLL SUGGESTION FORM
==================================================
*/

function initializePollSuggestionForm() {

    document
        .getElementById(
            "pollSuggestionForm"
        )
        ?.addEventListener(
            "submit",
            handlePollSuggestion
        );

}


/*
==================================================
HANDLE POLL SUGGESTION
==================================================
*/

async function handlePollSuggestion(
    event
) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );


    const level =
        getInputValue(
            "suggestionLevel"
        );


    const topic =
        getInputValue(
            "suggestionTopic"
        );


    const question =
        getInputValue(
            "suggestionQuestion"
        );


    const reason =
        getInputValue(
            "suggestionReason"
        );


    /*
    ----------------------------------------------
    VALIDATE
    ----------------------------------------------
    */

    if (
        ![
            "national",
            "state",
            "local",
            "community"
        ].includes(
            level
        )
    ) {

        showMessage(
            "pollSuggestionMessage",
            "Choose the level that best fits this suggestion.",
            "error"
        );


        return;

    }


    if (
        topic.length <
        3
    ) {

        showMessage(
            "pollSuggestionMessage",
            "Enter a topic or issue.",
            "error"
        );


        return;

    }


    if (
        question.length <
        10
    ) {

        showMessage(
            "pollSuggestionMessage",
            "Tell us what question or issue you would like Civic Horizon to consider.",
            "error"
        );


        return;

    }


    if (
        reason.length <
        10
    ) {

        showMessage(
            "pollSuggestionMessage",
            "Briefly explain why you believe this issue should be considered.",
            "error"
        );


        return;

    }


    /*
    ----------------------------------------------
    BASIC COMMUNITY-STANDARDS SCREEN

    This does NOT replace human review.

    It catches only obvious abusive submissions.
    Every suggestion still goes through admin review.
    ----------------------------------------------
    */

    if (
        containsClearlyProhibitedContent(
            `${topic} ${question} ${reason}`
        )
    ) {

        showMessage(
            "pollSuggestionMessage",
            "This submission appears to violate Civic Horizon's community standards. Suggestions must address issues and ideas without attacking people or groups.",
            "error"
        );


        return;

    }


    setButtonBusy(
        submitButton,
        true,
        "Submitting..."
    );


    showMessage(
        "pollSuggestionMessage",
        "Submitting your suggestion...",
        "info"
    );


    try {

        const suggestionReference =
            push(
                pollSuggestionsRef
            );


        const user =
            auth.currentUser;


        const record = {

            level,

            topic,

            proposedQuestion:
                question,

            reason,

            status:
                "pendingReview",

            submittedAt:
                new Date().toISOString(),

            source:
                "contactPage",

            /*
            ------------------------------------------
            ACCOUNT INFORMATION

            UID is stored only for internal review
            purposes when the visitor is signed in.

            It should never be displayed publicly.
            ------------------------------------------
            */

            submittedByUid:
                user?.uid ||
                "",

            submittedByVerifiedAccount:
                Boolean(
                    user?.emailVerified
                )

        };


        await set(
            suggestionReference,
            record
        );


        form.reset();


        showMessage(
            "pollSuggestionMessage",
            "Thank you. Your suggestion has been submitted for review. Submission does not guarantee publication.",
            "success"
        );


    } catch (error) {

        console.error(
            "Poll suggestion could not be submitted:",
            error
        );


        showMessage(
            "pollSuggestionMessage",
            "Your suggestion could not be submitted right now. Please try again.",
            "error"
        );

    } finally {

        setButtonBusy(
            submitButton,
            false,
            "Submit Suggestion"
        );

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


        const user =
            auth.currentUser;


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
                user?.uid ||
                "",

            submittedByVerifiedAccount:
                Boolean(
                    user?.emailVerified
                )

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
            "Your message could not be sent right now. Please try again.",
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

This intentionally stays narrow.

We should NOT automatically reject submissions merely
because they discuss controversial political subjects.

The point is to catch obvious direct abuse while human
review handles neutrality, relevance, duplication,
wording, and context.
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


    /*
    ----------------------------------------------
    DIRECT THREAT / HARASSMENT PATTERNS

    Keep this limited. Civic Horizon must not confuse
    controversial political discussion with abuse.
    ----------------------------------------------
    */

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