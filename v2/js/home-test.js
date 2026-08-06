/*
==================================================
CIVIC HORIZON INDEX V2
HOMEPAGE TEST INITIALIZATION
==================================================
*/


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
                This component could not be loaded.
            </div>
        `;


        return false;

    }

}


/*
==================================================
PAGE INITIALIZATION
==================================================
*/

async function initializePage() {

    await Promise.all([

        loadComponent(
            "headerContainer",
            "components/header.html"
        ),

        loadComponent(
            "heroContainer",
            "components/hero.html"
        ),

        loadComponent(
            "snapshotContainer",
            "components/snapshot.html"
        ),

        loadComponent(
            "nationalPulseContainer",
            "components/national-pulse.html"
        )

    ]);


    initializeHeader();

    await initializeLiveHomepageData();

}


/*
==================================================
LIVE HOMEPAGE DATA
==================================================
*/

async function initializeLiveHomepageData() {

    try {

        const controllerModule =
            await import(
                "./home-controller.js"
            );


        if (
            typeof controllerModule
                .initializeHomepageController !==
            "function"
        ) {

            throw new Error(
                "Homepage controller initialization function was not found."
            );

        }


        controllerModule
            .initializeHomepageController();

    } catch (error) {

        console.error(
            "Homepage live data could not start:",
            error
        );


        showLiveDataFallback();

    }

}


function showLiveDataFallback() {

    setText(
        "topIssue",
        "Live results unavailable"
    );

    setText(
        "topScore",
        "—"
    );

    setText(
        "participantCount",
        "—"
    );

    setText(
        "snapshotParticipants",
        "—"
    );

    setText(
        "snapshotActivePolls",
        "—"
    );

    setText(
        "snapshotTopPriority",
        "Unavailable"
    );

    setText(
        "snapshotCommunityVotes",
        "—"
    );

    setText(
        "pulseResponseCount",
        "—"
    );

    setText(
        "pulseUpdatedText",
        "Live data unavailable"
    );


    const message =
        document.getElementById(
            "presidentialApprovalMessage"
        );


    if (message) {

        message.textContent =
            "Live voting is temporarily unavailable, but the page remains available for design review.";

        message.dataset.messageType =
            "error";

    }


    const submitButton =
        document.querySelector(
            ".pulse-poll__submit"
        );


    if (submitButton) {

        submitButton.disabled = true;

    }

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


    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 980 &&
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


                closeDropdowns();

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
GENERAL DOM HELPERS
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
START PAGE
==================================================
*/

initializePage();