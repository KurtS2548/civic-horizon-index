/*
SHARED COMPONENT LOADER

This file loads the shared header and footer
onto every main website page.
*/


async function loadComponent(
    targetID,
    componentPath
) {

    const targetElement =
        document.getElementById(targetID);


    if (!targetElement) {
        return;
    }


    try {

        const response =
            await fetch(componentPath);


        if (!response.ok) {

            throw new Error(
                `Unable to load ${componentPath}`
            );

        }


        const componentHTML =
            await response.text();


        targetElement.innerHTML =
            componentHTML;


    } catch (error) {

        console.error(
            "Component loading error:",
            error
        );


        targetElement.innerHTML = `

            <div class="component-error">

                A website component could not be loaded.

            </div>

        `;

    }

}


/*
MARK THE CURRENT NAVIGATION LINK
*/

function setActiveNavigation() {

    const pageName =
        document.body.dataset.page;


    if (!pageName) {
        return;
    }


    const pageLink =
        document.querySelector(
            `[data-page="${pageName}"]`
        );


    if (pageLink) {

        pageLink.classList.add("active");

        pageLink.setAttribute(
            "aria-current",
            "page"
        );

    }

}


/*
LOAD ALL SHARED COMPONENTS
*/

async function loadSharedComponents() {

    await Promise.all([

        loadComponent(
            "sharedHeader",
            "components/header.html"
        ),

        loadComponent(
            "sharedFooter",
            "components/footer.html"
        )

    ]);


    setActiveNavigation();

}


/*
START AFTER THE PAGE HTML LOADS
*/

document.addEventListener(
    "DOMContentLoaded",
    loadSharedComponents
);