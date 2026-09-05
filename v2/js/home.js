/*
==================================================
CIVIC HORIZON INDEX V2
PUBLIC HOMEPAGE
==================================================
*/


/*
==================================================
COMPONENT LOADER
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

        return;

    }


    try {

        const response =
            await fetch(
                componentPath
            );


        if (!response.ok) {

            throw new Error(
                `Could not load ${componentPath}`
            );

        }


        container.innerHTML =
            await response.text();

    } catch (error) {

        console.error(
            "Homepage component error:",
            error
        );

    }

}


/*
==================================================
INITIALIZE HOMEPAGE
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
            "footerContainer",
            "components/footer.html"
        )

    ]);


    initializeHeader();

}


/*
==================================================
HEADER INTERACTIONS
==================================================
*/

function initializeHeader() {

    const menuButton =
        document.querySelector(
            "[data-menu-button]"
        );


    const mobileNavigation =
        document.querySelector(
            "[data-mobile-navigation]"
        );


    if (
        menuButton &&
        mobileNavigation
    ) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileNavigation.classList
                        .toggle(
                            "is-open"
                        );


                menuButton.setAttribute(
                    "aria-expanded",
                    String(
                        isOpen
                    )
                );

            }
        );

    }


    const dropdownButtons =
        document.querySelectorAll(
            "[data-dropdown-button]"
        );


    dropdownButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const parent =
                        button.closest(
                            "[data-dropdown]"
                        );


                    if (!parent) {

                        return;

                    }


                    parent.classList.toggle(
                        "is-open"
                    );

                }
            );

        }
    );

}


/*
==================================================
START PAGE
==================================================
*/

initializePage();