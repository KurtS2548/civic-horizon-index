/*
==================================================
CIVIC HORIZON INDEX V2
RESULTS CENTER TEST INITIALIZATION
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

async function initializeResultsPage() {

    await Promise.all([

        loadComponent(
            "headerContainer",
            "components/header.html"
        ),

        loadComponent(
            "resultsHeroContainer",
            "components/results-hero.html"
        ),

        loadComponent(
            "resultsOverviewContainer",
            "components/results-overview.html"
        ),

        loadComponent(
            "resultsPrioritiesContainer",
            "components/results-priorities.html"
        ),

        loadComponent(
            "resultsParticipationContainer",
            "components/results-participation.html"
        ),

        loadComponent(
            "resultsCommunityContainer",
            "components/results-community.html"
        ),

        loadComponent(
            "resultsApprovalContainer",
            "components/results-approval.html"
        ),

        loadComponent(
            "footerContainer",
            "components/footer.html"
        )

    ]);


    initializeHeader();

    await initializeLiveResultsData();

}


/*
==================================================
LIVE RESULTS DATA
==================================================
*/

async function initializeLiveResultsData() {

    try {

        const controllerModule =
            await import(
                "./results-controller.js"
            );


        if (
            typeof controllerModule
                .initializeResultsController !==
            "function"
        ) {

            throw new Error(
                "Results controller initialization function was not found."
            );

        }


        await controllerModule
            .initializeResultsController();

    } catch (error) {

        console.error(
            "Results Center live data could not start:",
            error
        );


        showResultsFallback();


        /*
        ----------------------------------------------
        DISPLAY STARTUP ERROR ON PAGE
        ----------------------------------------------
        */

        const errorBox =
            document.createElement(
                "div"
            );


        errorBox.style.cssText = `
            margin: 16px auto;
            max-width: 1100px;
            padding: 18px;
            background: #fff3f2;
            border: 2px solid #c0392b;
            border-radius: 10px;
            color: #8a1f17;
            font-family: Arial, sans-serif;
            line-height: 1.5;
        `;


        errorBox.innerHTML = `
            <strong>
                Results Center startup error
            </strong>
            <br>
            ${String(
                error?.message ||
                error
            )}
        `;


        document
            .querySelector(
                ".results-page"
            )
            ?.prepend(
                errorBox
            );

    }

}


/*
==================================================
FALLBACK STATE
==================================================
*/

function showResultsFallback() {

    setText(
        "resultsParticipantCount",
        "—"
    );

    setText(
        "resultsActivePollCount",
        "—"
    );

    setText(
        "resultsTopPriority",
        "Unavailable"
    );

    setText(
        "resultsPulseResponses",
        "—"
    );

    setText(
        "resultsLastUpdated",
        "Live data unavailable"
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
                event.key !==
                "Escape"
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

initializeResultsPage();