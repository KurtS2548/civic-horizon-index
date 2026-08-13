/*
==================================================
CIVIC HORIZON INDEX V2
PROFILE CONTROLLER
==================================================
*/


import {

    subscribeToAuthState,

    refreshCurrentUser,

    getCurrentUserProfile,

    getCurrentUserVotingEligibility,

    updateCurrentUserZipCode

} from "./services/auth-service.js";


import {

    signOutAndExit

} from "./services/auth-guard.js";


/*
==================================================
STATE
==================================================
*/

let currentUser =
    null;


/*
==================================================
INITIALIZE
==================================================
*/

async function initializeProfilePage() {

    await Promise.all([

        loadComponent(
            "headerContainer",
            "components/header.html"
        ),

        loadComponent(
            "footerContainer",
            "components/footer.html"
        )

    ]);


    initializeHeader();

    initializeProfileActions();

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
AUTH STATE
==================================================
*/

function initializeAuthState() {

    subscribeToAuthState(

        async user => {

            currentUser =
                user;


            if (!user) {

                window.location.replace(
                    "account.html"
                );

                return;

            }


            try {

                const refreshedUser =
                    await refreshCurrentUser();


                if (!refreshedUser) {

                    window.location.replace(
                        "account.html"
                    );

                    return;

                }


                currentUser =
                    refreshedUser;


                if (
                    !refreshedUser.emailVerified
                ) {

                    window.location.replace(
                        "verify-account.html"
                    );

                    return;

                }


                await renderProfile();

            } catch (error) {

                console.error(
                    "Profile initialization failed:",
                    error
                );


                setText(
                    "profileName",
                    "Profile unavailable"
                );


                setText(
                    "profileEmail",
                    "Your account information could not be loaded."
                );


                setText(
                    "profileVerificationStatus",
                    "Unavailable"
                );


                setText(
                    "profileParticipantType",
                    "Unavailable"
                );


                setText(
                    "profileZipCode",
                    "—"
                );


                setText(
                    "profileVotingStatus",
                    "Unavailable"
                );


                setText(
                    "profileMessage",
                    "Your participant profile could not be loaded."
                );

            }

        },

        error => {

            console.error(
                "Profile auth state error:",
                error
            );


            window.location.replace(
                "account.html"
            );

        }

    );

}


/*
==================================================
RENDER PROFILE
==================================================
*/

async function renderProfile() {

    if (!currentUser) {

        return;

    }


    const profile =
        await getCurrentUserProfile();


    /*
    ----------------------------------------------
    ACCOUNT HEADER
    ----------------------------------------------
    */

    setText(
        "profileName",
        profile?.displayName ||
        currentUser.displayName ||
        "Civic Horizon Participant"
    );


    setText(
        "profileEmail",
        currentUser.email ||
        ""
    );


    /*
    ----------------------------------------------
    EMAIL STATUS
    ----------------------------------------------
    */

    setText(
        "profileVerificationStatus",
        currentUser.emailVerified
            ? "Verified"
            : "Not Verified"
    );


    /*
    ----------------------------------------------
    PROFILE MISSING
    ----------------------------------------------
    */

    if (!profile) {

        setText(
            "profileParticipantType",
            "Profile Incomplete"
        );


        setText(
            "profileZipCode",
            "Not set"
        );


        setText(
            "profileVotingStatus",
            "Not Ready"
        );


        setText(
            "profileMessage",
            "Your participant profile is incomplete."
        );


        return;

    }


    /*
    ----------------------------------------------
    PARTICIPANT TYPE
    ----------------------------------------------
    */

    setText(
        "profileParticipantType",
        formatParticipantType(
            profile.participantType
        )
    );


    /*
    ----------------------------------------------
    ZIP CODE
    ----------------------------------------------
    */

    const zipCode =
        String(
            profile.zipCode ||
            ""
        );


    setText(
        "profileZipCode",
        zipCode ||
        "Not set"
    );


    const zipInput =
        document.getElementById(
            "profileZipInput"
        );


    if (
        zipInput &&
        zipCode
    ) {

        zipInput.value =
            zipCode;

    }


    /*
    ----------------------------------------------
    VOTING STATUS
    ----------------------------------------------
    */

    const eligibility =
        await getCurrentUserVotingEligibility();


    renderVotingStatus(
        eligibility
    );


    setText(
        "profileMessage",
        ""
    );

}


/*
==================================================
VOTING STATUS
==================================================
*/

function renderVotingStatus(
    eligibility
) {

    if (
        eligibility?.eligible
    ) {

        setText(
            "profileVotingStatus",
            "Ready to Participate"
        );


        return;

    }


    switch (
        eligibility?.reason
    ) {

        case "emailNotVerified":

            setText(
                "profileVotingStatus",
                "Email Verification Required"
            );

            break;


        case "zipMissing":

            setText(
                "profileVotingStatus",
                "ZIP Code Required"
            );

            break;


        case "birthdayMissing":

            setText(
                "profileVotingStatus",
                "Birthday Required"
            );

            break;


        case "underMinimumAge":

            setText(
                "profileVotingStatus",
                "Not Eligible"
            );

            break;


        case "agreementMissing":

            setText(
                "profileVotingStatus",
                "Agreement Required"
            );

            break;


        case "verificationSyncPending":

            setText(
                "profileVotingStatus",
                "Finishing Verification"
            );

            break;


        case "profileMissing":

            setText(
                "profileVotingStatus",
                "Profile Incomplete"
            );

            break;


        default:

            setText(
                "profileVotingStatus",
                "Not Ready"
            );

    }

}


/*
==================================================
PARTICIPANT TYPE
==================================================
*/

function formatParticipantType(
    participantType
) {

    if (
        participantType ===
        "youthParticipant"
    ) {

        return "Youth Participant";

    }


    if (
        participantType ===
        "verifiedParticipant"
    ) {

        return "Verified Participant";

    }


    return "Participant";

}


/*
==================================================
PROFILE ACTIONS
==================================================
*/

function initializeProfileActions() {

    document
        .getElementById(
            "updateZipForm"
        )
        ?.addEventListener(
            "submit",
            handleZipUpdate
        );


    document
        .getElementById(
            "profileSignOutButton"
        )
        ?.addEventListener(
            "click",
            handleSignOut
        );

}


/*
==================================================
UPDATE ZIP
==================================================
*/

async function handleZipUpdate(
    event
) {

    event.preventDefault();


    const zipCode =
        getInputValue(
            "profileZipInput"
        );


    if (
        !/^\d{5}$/.test(
            zipCode
        )
    ) {

        setText(
            "profileMessage",
            "Enter a valid 5-digit ZIP code."
        );


        return;

    }


    const button =
        document.getElementById(
            "updateZipButton"
        );


    setButtonBusy(
        button,
        true,
        "Updating..."
    );


    setText(
        "profileMessage",
        "Updating ZIP code..."
    );


    try {

        await updateCurrentUserZipCode(
            zipCode
        );


        await renderProfile();


        setText(
            "profileMessage",
            "ZIP code updated."
        );

    } catch (error) {

        console.error(
            "ZIP update failed:",
            error
        );


        setText(
            "profileMessage",
            "ZIP code could not be updated."
        );

    } finally {

        setButtonBusy(
            button,
            false,
            "Update"
        );

    }

}


/*
==================================================
SIGN OUT
==================================================
*/

async function handleSignOut() {

    const button =
        document.getElementById(
            "profileSignOutButton"
        );


    if (!button) {

        return;

    }


    button.disabled =
        true;


    button.textContent =
        "Signing Out...";


    try {

        await signOutAndExit();

    } catch (error) {

        console.error(
            "Profile sign out failed:",
            error
        );


        button.disabled =
            false;


        button.textContent =
            "Sign Out";


        setText(
            "profileMessage",
            "Sign out could not be completed."
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

initializeProfilePage();