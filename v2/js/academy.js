/*
==================================================
CIVIC HORIZON INDEX V2
CIVIC ACADEMY
==================================================
*/


/*
==================================================
ACADEMY LESSON DEFINITIONS
==================================================
*/

const academyLessons = [

    {
        number: 1,
        completedKey:
            "civicAcademyFoundationsCompleted"
    },

    {
        number: 2,
        completedKey:
            "civicAcademyChecksCompleted"
    },

    {
        number: 3,
        completedKey:
            "civicAcademyBillCompleted"
    },

    {
        number: 4,
        completedKey:
            "civicAcademyCongressCompleted"
    },

    {
        number: 5,
        completedKey:
            "civicAcademyPresidencyCompleted"
    },

    {
        number: 6,
        completedKey:
            "civicAcademyCourtsCompleted"
    },

    {
        number: 7,
        completedKey:
            "civicAcademyStateLocalCompleted"
    },

    {
        number: 8,
        completedKey:
            "civicAcademyParticipationCompleted"
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
PAGE INITIALIZATION
==================================================
*/

async function initializeAcademyPage() {

    await Promise.all([

        loadComponent(
            "headerContainer",
            "components/header.html"
        ),

        loadComponent(
            "academyHeroContainer",
            "components/academy-hero.html"
        ),

        loadComponent(
            "academyProgressContainer",
            "components/academy-progress.html"
        ),

        loadComponent(
            "academyPillarsContainer",
            "components/academy-pillars.html"
        ),

        loadComponent(
            "academyLessonsContainer",
            "components/academy-lessons.html"
        ),

        loadComponent(
            "academyGovernmentContainer",
            "components/academy-government.html"
        ),

        loadComponent(
            "academyPurposeContainer",
            "components/academy-purpose.html"
        ),

        loadComponent(
            "academySimulationContainer",
            "components/academy-simulation.html"
        ),

        loadComponent(
            "footerContainer",
            "components/footer.html"
        )

    ]);


    initializeHeader();

    updateAcademyProgress();

}


/*
==================================================
ACADEMY PROGRESS
==================================================
*/

function updateAcademyProgress() {

    const progressFill =
        document.getElementById(
            "academyProgressFill"
        );


    const progressPercent =
        document.getElementById(
            "academyProgressPercent"
        );


    const progressText =
        document.getElementById(
            "academyProgressText"
        );


    const academyRank =
        document.getElementById(
            "academyRank"
        );


    if (
        !progressFill ||
        !progressPercent ||
        !progressText ||
        !academyRank
    ) {

        return;

    }


    const completedLessons =
        academyLessons.filter(
            lesson => {

                return (
                    getStoredValue(
                        lesson.completedKey
                    ) ===
                    "true"
                );

            }
        );


    const completedCount =
        completedLessons.length;


    const totalLessons =
        academyLessons.length;


    const progress =
        Math.round(
            (
                completedCount /
                totalLessons
            ) * 100
        );


    progressFill.style.width =
        `${progress}%`;


    progressPercent.textContent =
        `${progress}%`;


    progressText.textContent =
        `${completedCount} of ${totalLessons} lessons completed`;


    academyRank.textContent =
        getAcademyRank(
            completedCount
        );


    academyLessons.forEach(
        lesson => {

            const completed =
                getStoredValue(
                    lesson.completedKey
                ) === "true";


            updateLessonCard(
                lesson.number,
                completed
            );

        }
    );

}


/*
==================================================
ACADEMY RANK
==================================================
*/

function getAcademyRank(
    completedCount
) {

    const ranks = {

        0: "New Civic Explorer",
        1: "Civic Explorer I",
        2: "Civic Explorer II",
        3: "Civic Explorer III",
        4: "Civic Scholar I",
        5: "Civic Scholar II",
        6: "Civic Scholar III",
        7: "Constitution Scholar",
        8: "Civic Academy Graduate"

    };


    return (
        ranks[completedCount] ||
        "New Civic Explorer"
    );

}


/*
==================================================
UPDATE COMPLETED LESSON CARD
==================================================
*/

function updateLessonCard(
    lessonNumber,
    completed
) {

    if (!completed) {
        return;
    }


    const lessonCards =
        document.querySelectorAll(
            ".academy-lesson-card"
        );


    const lessonCard =
        lessonCards[
            lessonNumber - 1
        ];


    if (!lessonCard) {
        return;
    }


    const statusBadge =
        lessonCard.querySelector(
            ".academy-status-badge"
        );


    const lessonButton =
        lessonCard.querySelector(
            ".academy-lesson-button"
        );


    if (statusBadge) {

        statusBadge.textContent =
            "Completed";


        statusBadge.classList.remove(
            "available"
        );


        statusBadge.classList.remove(
            "coming-soon"
        );


        statusBadge.classList.add(
            "completed"
        );

    }


    if (lessonButton) {

        lessonButton.textContent =
            "Review Lesson";

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
            "Academy progress could not be read:",
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
REFRESH PROGRESS WHEN RETURNING TO PAGE
==================================================
*/

window.addEventListener(
    "pageshow",
    () => {

        updateAcademyProgress();

    }
);


/*
==================================================
START PAGE
==================================================
*/

initializeAcademyPage();