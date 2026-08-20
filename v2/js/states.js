/*
==================================================
CIVIC HORIZON INDEX V2
STATE EXPLORER
==================================================
*/


/*
==================================================
STATE DATA
==================================================
*/

const states = {

    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming"

};


/*
==================================================
PAGE INITIALIZATION
==================================================
*/

async function initializeStatesPage() {

    await Promise.all([

        loadComponent(
            "headerContainer",
            "components/header.html"
        ),

        loadComponent(
            "footerContainer",
            "components/footer.html"
        )

    ]);


    initializeHeader();

    initializeMobileStateSelector();

    await initializeInteractiveMap();

    initializeExistingStateSelection();

}


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


        return false;

    }

}


/*
==================================================
INTERACTIVE U.S. MAP
==================================================
*/

async function initializeInteractiveMap() {

    const mapContainer =
        document.getElementById(
            "statesMap"
        );


    if (!mapContainer) {
        return;
    }


    try {

        const response =
            await fetch(
                "images/usa-states.svg"
            );


        if (!response.ok) {

            throw new Error(
                `Map request failed: ${response.status}`
            );

        }


        const svgText =
            await response.text();


        mapContainer.innerHTML =
            svgText;


        const svg =
            mapContainer.querySelector(
                "svg"
            );


        if (!svg) {

            throw new Error(
                "SVG map element was not found."
            );

        }


        prepareSvgMap(
            svg
        );

    } catch (error) {

        console.error(
            "Interactive state map could not load:",
            error
        );


        showMapError(
            mapContainer
        );

    }

}


/*
==================================================
PREPARE SVG MAP
==================================================
*/

function prepareSvgMap(
    svg
) {

    svg.classList.add(
        "states-map__svg"
    );


    svg.setAttribute(
        "role",
        "group"
    );


    svg.setAttribute(
        "aria-label",
        "Interactive map of the United States"
    );


    svg.removeAttribute(
        "width"
    );


    svg.removeAttribute(
        "height"
    );


    /*
    The SVG Maps package uses location elements
    with state identifiers.

    We inspect every path and only activate
    identifiers that match our 50-state list.
    */

    const locations =
        svg.querySelectorAll(
            "path"
        );


    locations.forEach(
        location => {

            const stateCode =
                getStateCodeFromLocation(
                    location
                );


            if (!stateCode) {

                /*
                Territories or non-state shapes
                remain visible but are not interactive.
                */

                location.classList.add(
                    "states-map__non-state"
                );

                return;

            }


            configureStateLocation(
                location,
                stateCode
            );

        }
    );

}


/*
==================================================
DETERMINE STATE CODE
==================================================
*/

function getStateCodeFromLocation(
    location
) {

    const possibleValues = [

        location.id,

        location.getAttribute(
            "data-id"
        ),

        location.getAttribute(
            "data-state"
        ),

        location.getAttribute(
            "name"
        )

    ];


    for (
        const value of possibleValues
    ) {

        const normalized =
            normalizeStateCode(
                value
            );


        if (normalized) {
            return normalized;
        }

    }


    /*
    Some SVG map files use state names
    instead of postal abbreviations.
    */

    const title =
        location.getAttribute(
            "aria-label"
        ) ||
        location.getAttribute(
            "title"
        );


    if (title) {

        const stateCode =
            findStateCodeByName(
                title
            );


        if (stateCode) {
            return stateCode;
        }

    }


    return "";

}


/*
==================================================
FIND STATE CODE BY NAME
==================================================
*/

function findStateCodeByName(
    value
) {

    const normalizedName =
        String(
            value ||
            ""
        )
            .trim()
            .toLowerCase();


    const entry =
        Object.entries(
            states
        )
            .find(
                ([, stateName]) => {

                    return (
                        stateName
                            .toLowerCase() ===
                        normalizedName
                    );

                }
            );


    return entry
        ? entry[0]
        : "";

}


/*
==================================================
CONFIGURE STATE LOCATION
==================================================
*/

function configureStateLocation(
    location,
    stateCode
) {

    const stateName =
        states[
            stateCode
        ];


    location.classList.add(
        "states-map__state"
    );


    location.dataset.state =
        stateCode;


    location.setAttribute(
        "tabindex",
        "0"
    );


    location.setAttribute(
        "role",
        "button"
    );


    location.setAttribute(
        "aria-label",
        `Explore ${stateName}`
    );


    /*
    Mouse / touch selection
    */

    location.addEventListener(
        "click",
        () => {

            selectDesktopState(
                stateCode
            );

        }
    );


    /*
    Keyboard accessibility
    */

    location.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Enter" &&
                event.key !== " "
            ) {

                return;

            }


            event.preventDefault();


            selectDesktopState(
                stateCode
            );

        }
    );


    /*
    Hover / focus state name preview
    */

    location.addEventListener(
        "mouseenter",
        () => {

            showStatePreview(
                stateCode
            );

        }
    );


    location.addEventListener(
        "focus",
        () => {

            showStatePreview(
                stateCode
            );

        }
    );


    location.addEventListener(
        "mouseleave",
        restoreSelectedStatePanel
    );


    location.addEventListener(
        "blur",
        restoreSelectedStatePanel
    );

}


/*
==================================================
STATE PREVIEW
==================================================
*/

function showStatePreview(
    stateCode
) {

    const stateName =
        states[
            stateCode
        ];


    if (!stateName) {
        return;
    }


    setText(
        "statesSelectedName",
        stateName
    );


    setText(
        "statesSelectedDescription",
        `Select ${stateName} to explore its Civic Horizon profile.`
    );

}


/*
==================================================
SELECTED STATE PANEL
==================================================
*/

let selectedStateCode = "";


function selectDesktopState(
    stateCode
) {

    const normalizedState =
        normalizeStateCode(
            stateCode
        );


    if (!normalizedState) {
        return;
    }


    selectedStateCode =
        normalizedState;


    updateSelectedMapState(
        normalizedState
    );


    renderSelectedStatePanel(
        normalizedState
    );

}


/*
==================================================
RENDER SELECTED STATE PANEL
==================================================
*/

function renderSelectedStatePanel(
    stateCode
) {

    const stateName =
        states[
            stateCode
        ];


    if (!stateName) {
        return;
    }


    setText(
        "statesSelectedName",
        stateName
    );


    setText(
        "statesSelectedDescription",
        `Explore Civic Horizon Index results, participation, representatives, and future state and local civic information for ${stateName}.`
    );


    const button =
        document.getElementById(
            "statesExploreButton"
        );


    if (button) {

        button.hidden =
            false;


        button.href =
            createStateUrl(
                stateCode
            );

    }

}


/*
==================================================
RESTORE SELECTED STATE PANEL
==================================================
*/

function restoreSelectedStatePanel() {

    if (selectedStateCode) {

        renderSelectedStatePanel(
            selectedStateCode
        );

        return;

    }


    setText(
        "statesSelectedName",
        "Choose a state"
    );


    setText(
        "statesSelectedDescription",
        "Click a state on the map to explore its Civic Horizon profile."
    );

}


/*
==================================================
UPDATE MAP SELECTION
==================================================
*/

function updateSelectedMapState(
    stateCode
) {

    document
        .querySelectorAll(
            ".states-map__state"
        )
        .forEach(
            location => {

                const isSelected =
                    location.dataset.state ===
                    stateCode;


                location.classList.toggle(
                    "states-map__state--selected",
                    isSelected
                );


                location.setAttribute(
                    "aria-pressed",
                    String(
                        isSelected
                    )
                );

            }
        );

}


/*
==================================================
MAP ERROR
==================================================
*/

function showMapError(
    mapContainer
) {

    mapContainer.innerHTML = `

        <div class="states-map__placeholder">

            <strong>
                Map temporarily unavailable
            </strong>

            <p>
                The State Explorer could not load
                the interactive map.
            </p>

        </div>

    `;

}


/*
==================================================
MOBILE STATE SELECTOR
==================================================
*/

function initializeMobileStateSelector() {

    const select =
        document.getElementById(
            "mobileStateSelect"
        );


    const button =
        document.getElementById(
            "mobileStateExploreButton"
        );


    if (
        !select ||
        !button
    ) {

        return;

    }


    select.addEventListener(
        "change",
        () => {

            const stateCode =
                normalizeStateCode(
                    select.value
                );


            button.disabled =
                !stateCode;

        }
    );


    button.addEventListener(
        "click",
        () => {

            const stateCode =
                normalizeStateCode(
                    select.value
                );


            if (!stateCode) {
                return;
            }


            openState(
                stateCode
            );

        }
    );

}


/*
==================================================
OPEN STATE
==================================================
*/

function openState(
    stateCode
) {

    const normalizedState =
        normalizeStateCode(
            stateCode
        );


    if (!normalizedState) {
        return;
    }


    window.location.href =
        createStateUrl(
            normalizedState
        );

}


/*
==================================================
STATE URL
==================================================
*/

function createStateUrl(
    stateCode
) {

    return (
        `state.html?state=${encodeURIComponent(
            stateCode
        )}`
    );

}


/*
==================================================
RESTORE EXISTING STATE SELECTION
==================================================
*/

function initializeExistingStateSelection() {

    const url =
        new URL(
            window.location.href
        );


    const stateCode =
        normalizeStateCode(
            url.searchParams.get(
                "state"
            )
        );


    if (!stateCode) {
        return;
    }


    /*
    Desktop map / selected panel
    */

    selectDesktopState(
        stateCode
    );


    /*
    Phone selector
    */

    const select =
        document.getElementById(
            "mobileStateSelect"
        );


    const button =
        document.getElementById(
            "mobileStateExploreButton"
        );


    if (select) {

        select.value =
            stateCode;

    }


    if (button) {

        button.disabled =
            false;

    }

}


/*
==================================================
STATE NORMALIZATION
==================================================
*/

function normalizeStateCode(
    value
) {

    const stateCode =
        String(
            value ||
            ""
        )
            .trim()
            .toUpperCase();


    if (
        !Object.prototype
            .hasOwnProperty
            .call(
                states,
                stateCode
            )
    ) {

        return "";

    }


    return stateCode;

}


/*
==================================================
TEXT HELPER
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


    if (!element) {
        return;
    }


    element.textContent =
        String(
            value
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
                window.innerWidth >
                    980 &&
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
PUBLIC STATE EXPLORER API
==================================================
*/

window.CivicHorizonStates = {

    selectState:
        selectDesktopState,

    openState

};


/*
==================================================
START PAGE
==================================================
*/

initializeStatesPage();