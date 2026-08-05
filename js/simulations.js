const simulations = [
    {
        completedKey:
            "civicCongressSimulationCompleted",

        gradeKey:
            "civicCongressSimulationLastGrade",

        runsKey:
            "civicCongressSimulationRuns"
    },
    {
        completedKey:
            "civicPresidentSimulationCompleted"
    },
    {
        completedKey:
            "civicCourtSimulationCompleted"
    },
    {
        completedKey:
            "civicGovernorSimulationCompleted"
    },
    {
        completedKey:
            "civicMayorSimulationCompleted"
    },
    {
        completedKey:
            "civicCampaignSimulationCompleted"
    }
];


function getStoredNumber(key) {

    const value =
        Number(
            localStorage.getItem(key)
        );


    return Number.isFinite(value)
        ? value
        : 0;

}


function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}


function updateSimulationProgress() {

    const completedSimulations =
        simulations.filter(
            simulation => {

                return (
                    localStorage.getItem(
                        simulation.completedKey
                    ) === "true"
                );

            }
        );


    const completedCount =
        completedSimulations.length;

    const totalSimulations =
        simulations.length;

    const progressPercent =
        Math.round(
            (
                completedCount /
                totalSimulations
            ) * 100
        );


    const progressFill =
        document.getElementById(
            "simulationProgressFill"
        );


    if (progressFill) {

        progressFill.style.width =
            `${progressPercent}%`;

    }


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


    updateCongressRecord();

}


function getSimulationAchievement(
    completedCount
) {

    const achievements = {
        0: "New Public Servant",
        1: "Representative",
        2: "Civic Decision Maker",
        3: "Constitutional Leader",
        4: "Public Service Scholar",
        5: "Government Strategist",
        6: "Master of Civic Government"
    };


    return (
        achievements[completedCount] ||
        "New Public Servant"
    );

}


function updateCongressRecord() {

    const congressCompleted =
        localStorage.getItem(
            "civicCongressSimulationCompleted"
        ) === "true";


    const congressGrade =
        localStorage.getItem(
            "civicCongressSimulationLastGrade"
        ) || "—";


    const congressRuns =
        getStoredNumber(
            "civicCongressSimulationRuns"
        );


    setText(
        "simulationTermsServed",
        congressRuns
    );


    setText(
        "simulationLatestGrade",
        congressGrade
    );


    setText(
        "congressCardGrade",
        congressGrade
    );


    setText(
        "congressCardRuns",
        congressRuns
    );


    if (!congressCompleted) {
        return;
    }


    const statusBadge =
        document.getElementById(
            "congressSimulationStatus"
        );


    const simulationButton =
        document.getElementById(
            "congressSimulationButton"
        );


    const heroButton =
        document.getElementById(
            "simulationHeroCongressButton"
        );


    const record =
        document.getElementById(
            "congressSimulationRecord"
        );


    if (statusBadge) {

        statusBadge.textContent =
            "Completed";

        statusBadge.classList.remove(
            "available"
        );

        statusBadge.classList.add(
            "completed"
        );

    }


    if (simulationButton) {

        simulationButton.textContent =
            "Serve Another Term";

    }


    if (heroButton) {

        heroButton.textContent =
            "Serve Another Term";

    }


    if (record) {

        record.hidden = false;

    }

}


updateSimulationProgress();