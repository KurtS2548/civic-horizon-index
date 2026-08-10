/*
==================================================
CIVIC HORIZON INDEX V2
SIMULATION CENTER
==================================================
*/


/*
==================================================
SIMULATION DEFINITIONS
==================================================
*/

const simulations = [

    {
        id: "congress",
        completedKey:
            "civicCongressSimulationCompleted"
    },

    {
        id: "president",
        completedKey:
            "civicPresidentSimulationCompleted"
    },

    {
        id: "court",
        completedKey:
            "civicCourtSimulationCompleted"
    },

    {
        id: "governor",
        completedKey:
            "civicGovernorSimulationCompleted"
    },

    {
        id: "mayor",
        completedKey:
            "civicMayorSimulationCompleted"
    },

    {
        id: "campaign",
        completedKey:
            "civicCampaignSimulationCompleted"
    }

];


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
INITIALIZE PAGE
==================================================
*/

async function initializeSimulationsPage() {

    await Promise.all([

        loadComponent(
            "headerContainer",
            "components/header.html"
        ),

        loadComponent(
            "simulationsHeroContainer",
            "components/simulations-hero.html"
        ),

        loadComponent(
            "simulationsProgressContainer",
            "components/simulations-progress.html"
        ),

        loadComponent(
            "simulationsRolesContainer",
            "components/simulations-roles.html"
        ),

        loadComponent(
            "simulationsPurposeContainer",
            "components/simulations-purpose.html"
        ),

        loadComponent(
            "simulationsAcademyContainer",
            "components/simulations-academy.html"
        ),

        loadComponent(
            "footerContainer",
            "components/footer.html"
        )

    ]);


    initializeHeader();

    updateSimulationProgress();

}


/*
==================================================
SIMULATION PROGRESS
==================================================
*/

function updateSimulationProgress() {

    const completedCount =
        simulations.filter(
            simulation => {

                return (
                    getStoredValue(
                        simulation.completedKey
                    ) ===
                    "true"
                );

            }
        ).length;


    const totalSimulations =
        simulations.length;


    const progressPercent =
        Math.round(
            (
                completedCount /
                totalSimulations
            ) * 100
        );


    setText(
        "simulationProgressPercent",
        `${progressPercent}%`
    );


    setText(
        "simulationProgressText",
        `${completedCount} of ${totalSimulations} simulations completed`
    );


    setText(
        "simulationAchievement",
        getSimulationAchievement(
            completedCount
        )
    );


    const progressFill =
        document.getElementById(
            "simulationProgressFill"
        );


    if (progressFill) {

        progressFill.style.width =
            `${progressPercent}%`;

    }


    updateCongressRecord();

}


/*
==================================================
ACHIEVEMENT LEVEL
==================================================
*/

function getSimulationAchievement(
    completedCount
) {

    const achievements = {

        0: "New Public Servant",
        1: "Civic Decision Maker",
        2: "Public Leadership Explorer",
        3: "Government Strategist",
        4: "Experienced Public Servant",
        5: "Civic Leadership Scholar",
        6: "Civic Simulation Graduate"

    };


    return (
        achievements[completedCount] ||
        "New Public Servant"
    );

}


/*
==================================================
CONGRESS SIMULATION RECORD
==================================================
*/

function updateCongressRecord() {

    const completed =
        getStoredValue(
            "civicCongressSimulationCompleted"
        ) === "true";


    const grade =
        getStoredValue(
            "civicCongressSimulationLastGrade"
        ) || "—";


    const runs =
        Number(
            getStoredValue(
                "civicCongressSimulationRuns"
            ) || 0
        );


    setText(
        "simulationTermsServed",
        runs
    );


    setText(
        "simulationLatestGrade",
        runs > 0
            ? grade
            : "—"
    );


    setText(
        "congressCardGrade",
        runs > 0
            ? grade
            : "—"
    );


    setText(
        "congressCardRuns",
        runs
    );


    const record =
        document.getElementById(
            "congressSimulationRecord"
        );


    if (
        record &&
        runs > 0
    ) {

        record.hidden =
            false;

    }


    const simulationButton =
        document.getElementById(
            "congressSimulationButton"
        );


    if (
        simulationButton &&
        completed
    ) {

        simulationButton.textContent =
            "Serve Another Term";

    }

}


/*
==================================================
LOCAL STORAGE
==================================================
*/

function getStoredValue(
    key
) {

    try {

        return window.localStorage
            .getItem(
                key
            );

    } catch (error) {

        console.warn(
            "Simulation data could not be read:",
            error
        );


        return null;

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
REFRESH RECORD AFTER RETURNING
==================================================
*/

window.addEventListener(
    "pageshow",
    () => {

        updateSimulationProgress();

    }
);


/*
==================================================
START PAGE
==================================================
*/

initializeSimulationsPage();