/*
==================================================
CIVIC HORIZON INDEX V2
ADMIN CENTER TEST INITIALIZATION
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

async function initializeAdminPage() {

    await Promise.all([

        loadComponent(
            "headerContainer",
            "components/header.html"
        ),

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
),

        loadComponent(
            "footerContainer",
            "components/footer.html"
        )

    ]);


    initializeHeader();

    await initializeLiveAdmin();

}


/*
==================================================
LIVE ADMIN CONTROLS
==================================================
*/

async function initializeLiveAdmin() {

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
            "Admin Center live data could not start:",
            error
        );

        showAdminFallback();

    }

}


/*
==================================================
FALLBACK STATE
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
START PAGE
==================================================
*/

initializeAdminPage();