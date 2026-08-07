/*
==================================================
CIVIC HORIZON INDEX V2
POLLS CENTER TEST INITIALIZATION
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
            await fetch(componentPath);

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
PAGE INITIALIZATION
==================================================
*/

async function initializePollsPage() {

    await Promise.all([

        loadComponent(
            "headerContainer",
            "components/header.html"
        ),

        loadComponent(
            "pollsHeroContainer",
            "components/polls-hero.html"
        ),

        loadComponent(
            "nationalPrioritiesPollContainer",
            "components/polls-national-priorities.html"
        ),
        loadComponent(
    "presidentialApprovalPollContainer",
    "components/polls-presidential-approval.html"
),
loadComponent(
    "communityPollsPageContainer",
    "components/polls-community.html"
),

        loadComponent(
            "footerContainer",
            "components/footer.html"
        )

    ]);

    initializeHeader();

    await initializeLivePolls();

}


/*
==================================================
LIVE POLLS
==================================================
*/

async function initializeLivePolls() {

    try {

        const controllerModule =
            await import(
                "./polls-controller.js"
            );


        if (
            typeof controllerModule
                .initializePollsController !==
            "function"
        ) {

            throw new Error(
                "Polls controller initialization function was not found."
            );

        }


        controllerModule
            .initializePollsController();

    } catch (error) {

        console.error(
            "Polls Center could not start:",
            error
        );

        showPollsFallback();

    }

}


/*
==================================================
FALLBACK STATE
==================================================
*/

function showPollsFallback() {

    const message =
        document.getElementById(
            "nationalPrioritiesMessage"
        );


    if (message) {

        message.textContent =
            "Live survey submission is temporarily unavailable.";

        message.dataset.messageType =
            "error";

    }


    const submitButton =
        document.querySelector(
            ".national-priorities-form__submit"
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
        .forEach(group => {

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

        });

}


/*
==================================================
START PAGE
==================================================
*/

initializePollsPage();