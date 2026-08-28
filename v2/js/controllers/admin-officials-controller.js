/*
==================================================
CIVIC HORIZON INDEX V2
ADMIN PUBLIC OFFICIALS CONTROLLER
==================================================

Purpose:

Manage current state-level public officials from
the secure Admin Center.

Launch offices managed here:

- Governor
- U.S. Senator
- U.S. Representative

President will use the national official pathway.

==================================================
*/


/*
==================================================
SERVICES
==================================================
*/

import {

    getAdminStateOfficials,
    saveOfficialOverride

} from "../services/public-official-admin-service.js";


/*
==================================================
STATES
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
STATE
==================================================
*/

let currentStateCode =
    "";

let currentOfficials =
    [];

let selectedOfficial =
    null;


/*
==================================================
INITIALIZE
==================================================
*/

export function initializeAdminOfficials() {

    const stateSelect =
        document.getElementById(
            "adminOfficialsState"
        );


    const officeSelect =
        document.getElementById(
            "adminOfficialsOffice"
        );


    const list =
        document.getElementById(
            "adminOfficialsList"
        );


    const editor =
        document.getElementById(
            "adminOfficialsEditor"
        );


    const form =
        document.getElementById(
            "adminOfficialsForm"
        );


    const closeButton =
        document.getElementById(
            "adminOfficialsEditorClose"
        );


    const cancelButton =
        document.getElementById(
            "adminOfficialsCancel"
        );


    if (
        !stateSelect ||
        !officeSelect ||
        !list ||
        !editor ||
        !form
    ) {

        return;

    }


    buildStateOptions(
        stateSelect
    );


    /*
    ==================================================
    STATE CHANGE
    ==================================================
    */

    stateSelect.addEventListener(
        "change",
        async () => {

            currentStateCode =
                stateSelect.value;


            selectedOfficial =
                null;


            hideEditor(
                editor
            );


            if (
                !currentStateCode ||
                !states[
                    currentStateCode
                ]
            ) {

                currentOfficials =
                    [];


                renderChooseState(
                    list
                );


                return;

            }


            await loadOfficials(
                list,
                officeSelect
            );

        }
    );


    /*
    ==================================================
    OFFICE FILTER
    ==================================================
    */

    officeSelect.addEventListener(
        "change",
        () => {

            renderOfficials(
                list,
                officeSelect.value
            );

        }
    );


    /*
    ==================================================
    LIST ACTIONS
    ==================================================
    */

    list.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-official-edit]"
                );


            if (!button) {

                return;

            }


            const seatKey =
                button.dataset
                    .officialEdit ||
                "";


            const official =
                currentOfficials.find(
                    item =>
                        item.seatKey ===
                        seatKey
                );


            if (!official) {

                return;

            }


            selectedOfficial =
                official;


            populateEditor(
                official,
                editor
            );

        }
    );


    /*
    ==================================================
    CLOSE EDITOR
    ==================================================
    */

    closeButton?.addEventListener(
        "click",
        () => {

            selectedOfficial =
                null;


            hideEditor(
                editor
            );

        }
    );


    cancelButton?.addEventListener(
        "click",
        () => {

            selectedOfficial =
                null;


            hideEditor(
                editor
            );

        }
    );


    /*
    ==================================================
    SAVE
    ==================================================
    */

    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            if (!selectedOfficial) {

                return;

            }


            await handleSaveOfficial(
                form,
                editor,
                list,
                officeSelect
            );

        }
    );

}


/*
==================================================
LOAD OFFICIALS
==================================================
*/

async function loadOfficials(
    list,
    officeSelect
) {

    renderLoading(
        list
    );


    try {

        const stateOfficials =
            await getAdminStateOfficials(
                currentStateCode
            );


        currentOfficials =
            flattenStateOfficials(
                stateOfficials
            );


        renderOfficials(
            list,
            officeSelect.value
        );


    } catch (error) {

        console.error(
            "Public officials could not be loaded:",
            error
        );


        currentOfficials =
            [];


        renderLoadError(
            list
        );

    }

}


/*
==================================================
FLATTEN STATE OFFICIALS
==================================================
*/

function flattenStateOfficials(
    stateOfficials
) {

    if (
        !stateOfficials ||
        typeof stateOfficials !==
            "object"
    ) {

        return [];

    }


    return [

        ...(stateOfficials.governor
            ? [
                stateOfficials.governor
            ]
            : []),

        ...(
            Array.isArray(
                stateOfficials.senators
            )
                ? stateOfficials.senators
                : []
        ),

        ...(
            Array.isArray(
                stateOfficials
                    .representatives
            )
                ? stateOfficials
                    .representatives
                : []
        )

    ];

}


/*
==================================================
RENDER OFFICIALS
==================================================
*/

function renderOfficials(
    list,
    officeFilter
) {

    const stateName =
        states[
            currentStateCode
        ] ||
        currentStateCode;


    let officials =
        [
            ...currentOfficials
        ];


    if (
        officeFilter &&
        officeFilter !==
            "all"
    ) {

        officials =
            officials.filter(
                official =>
                    official.officeType ===
                    officeFilter
            );

    }


    if (
        officials.length ===
        0
    ) {

        list.innerHTML = `

            <div class="admin-placeholder-card">

                <strong>
                    No officials found
                </strong>

                <p>
                    No officials match the selected
                    state and office filter.
                </p>

            </div>

        `;


        return;

    }


    const governor =
        officials.filter(
            official =>
                official.officeType ===
                "governor"
        );


    const senators =
        officials.filter(
            official =>
                official.officeType ===
                "senator"
        );


    const representatives =
        officials.filter(
            official =>
                official.officeType ===
                "representative"
        );


    list.innerHTML = `

        <div class="admin-officials__state-summary">

            <span>
                ${escapeHtml(
                    stateName
                )}
            </span>

            <strong>
                ${formatOfficialCount(
                    officials.length
                )}
            </strong>

        </div>

        ${
            createOfficialGroup(
                "Governor",
                governor
            )
        }

        ${
            createOfficialGroup(
                "U.S. Senators",
                senators
            )
        }

        ${
            createOfficialGroup(
                "U.S. Representatives",
                representatives
            )
        }

    `;

}


/*
==================================================
OFFICIAL GROUP
==================================================
*/

function createOfficialGroup(
    title,
    officials
) {

    if (
        !Array.isArray(
            officials
        ) ||
        officials.length ===
            0
    ) {

        return "";

    }


    return `

        <section class="admin-officials__group">

            <div class="admin-officials__group-heading">

                <h3>
                    ${escapeHtml(
                        title
                    )}
                </h3>

                <span>
                    ${officials.length}
                </span>

            </div>


            <div class="admin-officials__items">

                ${
                    officials
                        .map(
                            official =>
                                createOfficialItem(
                                    official
                                )
                        )
                        .join("")
                }

            </div>

        </section>

    `;

}


/*
==================================================
OFFICIAL ITEM
==================================================
*/

function createOfficialItem(
    official
) {

    const partyLabel =
        getPartyLabel(
            official.party
        );


    const officeLabel =
        getOfficeLabel(
            official
        );


    const overrideLabel =
        official
            .hasAdminOverride
            ? `
                <span class="
                    admin-officials__override-status
                    is-overridden
                ">
                    Admin Updated
                </span>
            `
            : `
                <span class="
                    admin-officials__override-status
                ">
                    Baseline Data
                </span>
            `;


    return `

        <article class="admin-officials__item">

            <div class="admin-officials__item-main">

                <div>

                    <span class="admin-officials__office">
                        ${escapeHtml(
                            officeLabel
                        )}
                    </span>

                    <h4>
                        ${escapeHtml(
                            official.name
                        )}
                    </h4>

                    <p>
                        ${escapeHtml(
                            partyLabel
                        )}
                    </p>

                </div>


                ${overrideLabel}

            </div>


            <div class="admin-officials__item-meta">

                <span>
                    <strong>
                        Seat
                    </strong>

                    ${escapeHtml(
                        official.seatKey
                    )}
                </span>


                <span>
                    <strong>
                        Serving Since
                    </strong>

                    ${escapeHtml(
                        formatDate(
                            official.servingSince
                        )
                    )}
                </span>

            </div>


            <div class="admin-officials__item-actions">

                <button
                    type="button"
                    class="
                        admin-button
                        admin-button--secondary
                    "
                    data-official-edit="${escapeHtml(
                        official.seatKey
                    )}"
                >
                    Edit
                </button>

            </div>

        </article>

    `;

}


/*
==================================================
POPULATE EDITOR
==================================================
*/

function populateEditor(
    official,
    editor
) {

    setValue(
        "adminOfficialSeatKey",
        official.seatKey
    );


    setValue(
        "adminOfficialName",
        official.name
    );


    setValue(
        "adminOfficialParty",
        official.party
    );


    setValue(
        "adminOfficialServingSince",
        official.servingSince
    );


    setValue(
        "adminOfficialTermBegan",
        official.currentTermBegan
    );


    setValue(
        "adminOfficialSourceUrl",
        getOfficialSourceUrl(
            official
        )
    );


    const title =
        document.getElementById(
            "adminOfficialsEditorTitle"
        );


    if (title) {

        title.textContent =
            `Update ${getOfficeLabel(
                official
            )}`;

    }


    clearMessage();


    editor.hidden =
        false;


    editor.scrollIntoView(
        {

            behavior:
                "smooth",

            block:
                "start"

        }
    );

}


/*
==================================================
SAVE OFFICIAL
==================================================
*/

async function handleSaveOfficial(
    form,
    editor,
    list,
    officeSelect
) {

    const saveButton =
        document.getElementById(
            "adminOfficialsSave"
        );


    const seatKey =
        document.getElementById(
            "adminOfficialSeatKey"
        )?.value ||
        "";


    const name =
        document.getElementById(
            "adminOfficialName"
        )?.value ||
        "";


    const party =
        document.getElementById(
            "adminOfficialParty"
        )?.value ||
        "";


    const servingSince =
        document.getElementById(
            "adminOfficialServingSince"
        )?.value ||
        "";


    const currentTermBegan =
        document.getElementById(
            "adminOfficialTermBegan"
        )?.value ||
        "";


    const sourceUrl =
        document.getElementById(
            "adminOfficialSourceUrl"
        )?.value ||
        "";


    if (!seatKey) {

        setMessage(
            "The selected office could not be identified.",
            "error"
        );


        return;

    }


    if (saveButton) {

        saveButton.disabled =
            true;


        saveButton.textContent =
            "Saving...";

    }


    setMessage(
        "Saving official...",
        "info"
    );


    try {

        await saveOfficialOverride(

            seatKey,

            {

                name,

                party,

                servingSince,

                currentTermBegan,

                sourceUrl

            }

        );


                await loadOfficials(
            list,
            officeSelect
        );


        selectedOfficial =
            currentOfficials.find(
                official =>
                    official.seatKey ===
                    seatKey
            ) ||
            null;


        if (selectedOfficial) {

            populateEditor(
                selectedOfficial,
                editor
            );

        }


        setMessage(
            "Official updated successfully.",
            "success"
        );


    } catch (error) {

        console.error(
            "Official could not be updated:",
            error
        );


        setMessage(
            error?.message ||
            "The official could not be updated.",
            "error"
        );


    } finally {

        if (saveButton) {

            saveButton.disabled =
                false;


            saveButton.textContent =
                "Save Official";

        }

    }

}


/*
==================================================
STATE OPTIONS
==================================================
*/

function buildStateOptions(
    select
) {

    if (
        select.options.length >
        1
    ) {

        return;

    }


    const options =
        Object.entries(
            states
        )
            .map(
                (
                    [
                        stateCode,
                        stateName
                    ]
                ) => `

                    <option value="${stateCode}">
                        ${escapeHtml(
                            stateName
                        )}
                    </option>

                `
            )
            .join("");


    select.insertAdjacentHTML(
        "beforeend",
        options
    );

}


/*
==================================================
CHOOSE STATE
==================================================
*/

function renderChooseState(
    list
) {

    list.innerHTML = `

        <div class="admin-placeholder-card">

            <strong>
                Select a state
            </strong>

            <p>
                Choose a state to view its
                current officials.
            </p>

        </div>

    `;

}


/*
==================================================
LOADING
==================================================
*/

function renderLoading(
    list
) {

    list.innerHTML = `

        <div class="admin-placeholder-card">

            <strong>
                Loading ${escapeHtml(
                    states[
                        currentStateCode
                    ] ||
                    "Officials"
                )}
            </strong>

            <p>
                Retrieving current public officials...
            </p>

        </div>

    `;

}


/*
==================================================
LOAD ERROR
==================================================
*/

function renderLoadError(
    list
) {

    list.innerHTML = `

        <div class="admin-placeholder-card">

            <strong>
                Officials unavailable
            </strong>

            <p>
                Current public officials could
                not be loaded.
            </p>

        </div>

    `;

}


/*
==================================================
HIDE EDITOR
==================================================
*/

function hideEditor(
    editor
) {

    if (!editor) {

        return;

    }


    editor.hidden =
        true;


    clearMessage();

}


/*
==================================================
OFFICE LABEL
==================================================
*/

function getOfficeLabel(
    official
) {

    if (
        official.officeType ===
        "governor"
    ) {

        return "Governor";

    }


    if (
        official.officeType ===
        "senator"
    ) {

        return "U.S. Senator";

    }


    if (
        official.officeType ===
        "representative"
    ) {

        if (
            official.district ===
            "At-Large"
        ) {

            return "U.S. Representative — At-Large";

        }


        return (
            `U.S. Representative — District ${
                official.district
            }`
        );

    }


    return "Public Official";

}


/*
==================================================
PARTY LABEL
==================================================
*/

function getPartyLabel(
    party
) {

    if (
        party ===
        "D"
    ) {

        return "Democratic";

    }


    if (
        party ===
        "R"
    ) {

        return "Republican";

    }


    if (
        party ===
        "I"
    ) {

        return "Independent";

    }


    return "Other";

}


/*
==================================================
SOURCE URL
==================================================
*/

function getOfficialSourceUrl(
    official
) {

    if (
        !Array.isArray(
            official.sources
        )
    ) {

        return "";

    }


    const officeholderSource =
        official.sources.find(
            source =>
                source?.fact ===
                "officeholder"
        );


    return String(
        officeholderSource
            ?.sourceUrl ||
        official.sources[0]
            ?.sourceUrl ||
        ""
    );

}


/*
==================================================
FORMAT DATE
==================================================
*/

function formatDate(
    value
) {

    const cleanValue =
        String(
            value ||
            ""
        ).trim();


    if (!cleanValue) {

        return "Unavailable";

    }


    const date =
        new Date(
            `${cleanValue}T00:00:00Z`
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "Unavailable";

    }


    return date.toLocaleDateString(
        "en-US",
        {

            month:
                "short",

            day:
                "numeric",

            year:
                "numeric",

            timeZone:
                "UTC"

        }
    );

}


/*
==================================================
COUNT
==================================================
*/

function formatOfficialCount(
    count
) {

    return (
        count ===
        1
            ? "1 Official"
            : `${count} Officials`
    );

}


/*
==================================================
FORM VALUE
==================================================
*/

function setValue(
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


    element.value =
        String(
            value ||
            ""
        );

}


/*
==================================================
MESSAGE
==================================================
*/

function setMessage(
    message,
    type
) {

    const element =
        document.getElementById(
            "adminOfficialsMessage"
        );


    if (!element) {

        return;

    }


    element.textContent =
        message;


    element.dataset
        .messageType =
        type;

}


function clearMessage() {

    setMessage(
        "",
        ""
    );

}


/*
==================================================
HTML ESCAPE
==================================================
*/

function escapeHtml(
    value
) {

    return String(
        value ??
        ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}