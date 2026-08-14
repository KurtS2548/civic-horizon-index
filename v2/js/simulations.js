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
        id:
            "congress",

        completedKey:
            "civicCongressSimulationCompleted",

        gradeKey:
            "civicCongressSimulationLastGrade",

        runsKey:
            "civicCongressSimulationRuns",

        recordId:
            "congressSimulationRecord",

        gradeId:
            "congressCardGrade",

        runsId:
            "congressCardRuns",

        buttonId:
            "congressSimulationButton",

        defaultButtonText:
            "Enter Congress",

        completedButtonText:
            "Serve Another Term"
    },

    {
        id:
            "president",

        completedKey:
            "civicPresidentSimulationCompleted",

        gradeKey:
            "civicPresidentSimulationLastGrade",

        runsKey:
            "civicPresidentSimulationRuns",

        recordId:
            "presidentSimulationRecord",

        gradeId:
            "presidentCardGrade",

        runsId:
            "presidentCardRuns",

        buttonId:
            "presidentSimulationButton",

        defaultButtonText:
            "Enter the White House",

        completedButtonText:
            "Serve Another Term"
    },

    {
        id:
            "court",

        completedKey:
            "civicCourtSimulationCompleted",

        gradeKey:
            "civicCourtSimulationLastGrade",

        runsKey:
            "civicCourtSimulationRuns",

        recordId:
            "courtSimulationRecord",

        gradeId:
            "courtCardGrade",

        runsId:
            "courtCardRuns",

        buttonId:
            "courtSimulationButton",

        defaultButtonText:
            "Join the Court",

        completedButtonText:
            "Hear Another Docket"
    },

    {
        id:
            "governor",

        completedKey:
            "civicGovernorSimulationCompleted",

        gradeKey:
            "civicGovernorSimulationLastGrade",

        runsKey:
            "civicGovernorSimulationRuns",

        recordId:
            "governorSimulationRecord",

        gradeId:
            "governorCardGrade",

        runsId:
            "governorCardRuns",

        buttonId:
            "governorSimulationButton",

        defaultButtonText:
            "Lead the State",

        completedButtonText:
            "Serve Another Term"
    },

    {
        id:
            "mayor",

        completedKey:
            "civicMayorSimulationCompleted",

        gradeKey:
            "civicMayorSimulationLastGrade",

        runsKey:
            "civicMayorSimulationRuns",

        recordId:
            "mayorSimulationRecord",

        gradeId:
            "mayorCardGrade",

        runsId:
            "mayorCardRuns",

        buttonId:
            "mayorSimulationButton",

        defaultButtonText:
            "Lead the City",

        completedButtonText:
            "Serve Another Term"
    },

    {
        id:
            "campaign",

        completedKey:
            "civicCampaignSimulationCompleted",

        gradeKey:
            "civicCampaignSimulationLastGrade",

        runsKey:
            "civicCampaignSimulationRuns",

        recordId:
            "campaignSimulationRecord",

        gradeId:
            "campaignCardGrade",

        runsId:
            "campaignCardRuns",

        buttonId:
            "campaignSimulationButton",

        defaultButtonText:
            "Begin Campaign",

        completedButtonText:
            "Run Another Campaign"
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


    if (
        !container
    ) {

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


        if (
            !response.ok
        ) {

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
        totalSimulations > 0
            ? Math.round(
                (
                    completedCount /
                    totalSimulations
                ) *
                100
            )
            : 0;


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


    if (
        progressFill
    ) {

        progressFill.style.width =
            `${progressPercent}%`;

    }


    updateOverviewRecord();

    updateAllSimulationRecords();

}


/*
==================================================
OVERVIEW RECORD
==================================================
*/

function updateOverviewRecord() {

    const completedRecords =
        simulations
            .map(
                simulation => {

                    const runs =
                        getSimulationRuns(
                            simulation
                        );


                    return {

                        simulation,

                        runs,

                        grade:
                            getStoredValue(
                                simulation.gradeKey
                            ) ||
                            "—"

                    };

                }
            )
            .filter(
                record =>
                    record.runs > 0
            );


    const totalRuns =
        completedRecords.reduce(
            (
                total,
                record
            ) => {

                return (
                    total +
                    record.runs
                );

            },
            0
        );


    setText(
        "simulationTermsServed",
        totalRuns
    );


    /*
    The overview uses the most recently listed
    completed simulation record available in
    local storage. Individual role cards always
    retain their own latest grades.
    */

    const latestRecord =
        completedRecords[
            completedRecords.length - 1
        ];


    setText(
        "simulationLatestGrade",
        latestRecord
            ? latestRecord.grade
            : "—"
    );

}


/*
==================================================
ALL ROLE RECORDS
==================================================
*/

function updateAllSimulationRecords() {

    simulations.forEach(
        simulation => {

            updateSimulationRecord(
                simulation
            );

        }
    );

}


/*
==================================================
INDIVIDUAL ROLE RECORD
==================================================
*/

function updateSimulationRecord(
    simulation
) {

    const completed =
        getStoredValue(
            simulation.completedKey
        ) ===
        "true";


    const grade =
        getStoredValue(
            simulation.gradeKey
        ) ||
        "—";


    const runs =
        getSimulationRuns(
            simulation
        );


    setText(
        simulation.gradeId,
        runs > 0
            ? grade
            : "—"
    );


    setText(
        simulation.runsId,
        runs
    );


    const record =
        document.getElementById(
            simulation.recordId
        );


    if (
        record
    ) {

        record.hidden =
            runs ===
            0;

    }


    const button =
        document.getElementById(
            simulation.buttonId
        );


    if (
        button
    ) {

        button.textContent =
            completed
                ? simulation.completedButtonText
                : simulation.defaultButtonText;

    }

}


/*
==================================================
RUN COUNT
==================================================
*/

function getSimulationRuns(
    simulation
) {

    const runs =
        Number(
            getStoredValue(
                simulation.runsKey
            ) ||
            0
        );


    if (
        !Number.isFinite(
            runs
        )
    ) {

        return 0;

    }


    return Math.max(
        0,
        runs
    );

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

        0:
            "New Public Servant",

        1:
            "Civic Decision Maker",

        2:
            "Public Leadership Explorer",

        3:
            "Government Strategist",

        4:
            "Experienced Public Servant",

        5:
            "Civic Leadership Scholar",

        6:
            "Civic Simulation Graduate"

    };


    return (
        achievements[
            completedCount
        ] ||
        "New Public Servant"
    );

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


                    if (
                        !group
                    ) {

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


                if (
                    menuButton
                ) {

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


    if (
        element
    ) {

        element.textContent =
            String(
                value
            );

    }

}


/*
==================================================
REFRESH AFTER RETURNING
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