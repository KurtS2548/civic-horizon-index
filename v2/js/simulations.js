/*
==================================================
CIVIC HORIZON INDEX V2
SIMULATION CENTER
==================================================
*/


import {

    getAllSimulationProgress

} from "./services/simulation-progress-service.js";


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
CURRENT ACCOUNT RECORDS
==================================================
*/

let accountSimulationProgress =
    {};


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


    await updateSimulationProgress();

}


/*
==================================================
LOAD ACCOUNT PROGRESS
==================================================
*/

async function loadAccountSimulationProgress() {

    try {

        const progress =
            await getAllSimulationProgress();


        if (
            progress &&
            typeof progress ===
                "object"
        ) {

            accountSimulationProgress =
                progress;

        } else {

            accountSimulationProgress =
                {};

        }

    } catch (error) {

        console.warn(
            "Account simulation progress could not be loaded. Using local browser progress as a fallback.",
            error
        );


        accountSimulationProgress =
            {};

    }

}


/*
==================================================
SIMULATION PROGRESS
==================================================
*/

async function updateSimulationProgress() {

    await loadAccountSimulationProgress();


    const records =
        simulations.map(
            simulation =>
                getResolvedSimulationRecord(
                    simulation
                )
        );


    const completedCount =
        records.filter(
            record =>
                record.completed
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


    updateOverviewRecord(
        records
    );


    updateAllSimulationRecords(
        records
    );

}


/*
==================================================
RESOLVE ONE SIMULATION RECORD
==================================================
*/

function getResolvedSimulationRecord(
    simulation
) {

    const accountRecord =
        accountSimulationProgress[
            simulation.id
        ];


    if (
        isUsableAccountRecord(
            accountRecord
        )
    ) {

        return normalizeAccountRecord(
            simulation,
            accountRecord
        );

    }


    return getLocalSimulationRecord(
        simulation
    );

}


/*
==================================================
ACCOUNT RECORD VALIDATION
==================================================
*/

function isUsableAccountRecord(
    record
) {

    return Boolean(
        record &&
        typeof record ===
            "object" &&
        (
            record.completed ===
                true ||
            Number(
                record.runs ||
                0
            ) >
                0 ||
            String(
                record.lastGrade ||
                ""
            ).trim()
        )
    );

}


/*
==================================================
NORMALIZE ACCOUNT RECORD
==================================================
*/

function normalizeAccountRecord(
    simulation,
    record
) {

    const rawRuns =
        Number(
            record.runs ||
            0
        );


    const runs =
        Number.isFinite(
            rawRuns
        )
            ? Math.max(
                0,
                rawRuns
            )
            : 0;


    const grade =
        String(
            record.lastGrade ||
            ""
        ).trim() ||
        "—";


    const completed =
        record.completed ===
            true ||
        runs >
            0;


    const lastCompletedAt =
        normalizeCompletionDate(
            record.lastCompletedAt
        );


    return {

        simulation,

        source:
            "account",

        completed,

        grade,

        runs,

        lastCompletedAt

    };

}


/*
==================================================
LOCAL STORAGE FALLBACK RECORD
==================================================
*/

function getLocalSimulationRecord(
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
        getLocalSimulationRuns(
            simulation
        );


    return {

        simulation,

        source:
            "local",

        completed:
            completed ||
            runs >
                0,

        grade,

        runs,

        lastCompletedAt:
            null

    };

}


/*
==================================================
OVERVIEW RECORD
==================================================
*/

function updateOverviewRecord(
    records
) {

    const completedRecords =
        records.filter(
            record =>
                record.runs >
                0
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


    const latestRecord =
        getLatestSimulationRecord(
            completedRecords
        );


    setText(
        "simulationLatestGrade",
        latestRecord
            ? latestRecord.grade
            : "—"
    );

}


/*
==================================================
LATEST COMPLETION
==================================================
*/

function getLatestSimulationRecord(
    records
) {

    const datedRecords =
        records
            .filter(
                record =>
                    record.lastCompletedAt
            )
            .sort(
                (
                    recordA,
                    recordB
                ) => {

                    return (
                        recordB.lastCompletedAt -
                        recordA.lastCompletedAt
                    );

                }
            );


    if (
        datedRecords.length >
        0
    ) {

        return datedRecords[0];

    }


    /*
    Local-storage records created before account-based
    progress did not include completion timestamps.

    If no Firebase timestamp exists yet, use the last
    available legacy record only as a fallback.
    */

    return (
        records[
            records.length - 1
        ] ||
        null
    );

}


/*
==================================================
COMPLETION DATE
==================================================
*/

function normalizeCompletionDate(
    value
) {

    if (
        !value
    ) {

        return null;

    }


    const timestamp =
        Date.parse(
            String(
                value
            )
        );


    if (
        !Number.isFinite(
            timestamp
        )
    ) {

        return null;

    }


    return timestamp;

}


/*
==================================================
ALL ROLE RECORDS
==================================================
*/

function updateAllSimulationRecords(
    records
) {

    records.forEach(
        record => {

            updateSimulationRecord(
                record
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
    recordData
) {

    const simulation =
        recordData.simulation;


    setText(
        simulation.gradeId,
        recordData.runs >
            0
            ? recordData.grade
            : "—"
    );


    setText(
        simulation.runsId,
        recordData.runs
    );


    const record =
        document.getElementById(
            simulation.recordId
        );


    if (
        record
    ) {

        record.hidden =
            recordData.runs ===
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
            recordData.completed
                ? simulation.completedButtonText
                : simulation.defaultButtonText;

    }

}


/*
==================================================
LOCAL RUN COUNT
==================================================
*/

function getLocalSimulationRuns(
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

    if (
        completedCount ===
        0
    ) {

        return "Getting Started";

    }


    if (
        completedCount <=
        2
    ) {

        return "Exploring Government";

    }


    if (
        completedCount <=
        4
    ) {

        return "Making Progress";

    }


    if (
        completedCount ===
        5
    ) {

        return "Almost Complete";

    }


    return "Simulation Series Complete";

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

        void updateSimulationProgress();

    }
);


/*
==================================================
START PAGE
==================================================
*/

void initializeSimulationsPage();