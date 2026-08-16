/*
==================================================
CIVIC HORIZON INDEX V2
ADMIN POLL SUGGESTIONS CONTROLLER
==================================================
*/


import {

    database,
    auth

} from "../../../js/firebase.js";


import {

    ref,
    onValue,
    update,
    remove

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


import {

    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/*
==================================================
ADMIN
==================================================
*/

const ADMIN_UID =
    "46MRUizWh5Yl83XXk4CBuI3TUZc2";


/*
==================================================
STATE
==================================================
*/

let suggestions = [];

let selectedSuggestionId =
    null;

let unsubscribeSuggestions =
    null;


/*
==================================================
INITIALIZE
==================================================
*/

export function initializeAdminPollSuggestions() {

    initializeFilters();

    initializeDeleteModal();


    onAuthStateChanged(
        auth,
        user => {

            if (
                !user ||
                user.uid !==
                    ADMIN_UID
            ) {

                renderAccessDenied();

                return;

            }


            subscribeToSuggestions();

        }
    );

}


/*
==================================================
FIREBASE SUBSCRIPTION
==================================================
*/

function subscribeToSuggestions() {

    if (
        unsubscribeSuggestions
    ) {

        unsubscribeSuggestions();

    }


    const suggestionsReference =
        ref(
            database,
            "pollSuggestions"
        );


    unsubscribeSuggestions =
        onValue(

            suggestionsReference,

            snapshot => {

                suggestions = [];


                if (
                    snapshot.exists()
                ) {

                    snapshot.forEach(
                        childSnapshot => {

                            const value =
                                childSnapshot.val();


                            suggestions.push({

                                id:
                                    childSnapshot.key,

                                ...value

                            });

                        }
                    );

                }


                suggestions.sort(
                    (
                        suggestionA,
                        suggestionB
                    ) => {

                        return (
                            getTimestamp(
                                suggestionB
                            ) -
                            getTimestamp(
                                suggestionA
                            )
                        );

                    }
                );


                updateSummary();

                renderSuggestions();

            },

            error => {

                console.error(
                    "Poll suggestions could not be loaded:",
                    error
                );


                showMessage(
                    "Poll suggestions could not be loaded.",
                    "error"
                );

            }

        );

}


/*
==================================================
FILTERS
==================================================
*/

function initializeFilters() {

    document
        .getElementById(
            "adminSuggestionStatusFilter"
        )
        ?.addEventListener(
            "change",
            renderSuggestions
        );


    document
        .getElementById(
            "adminSuggestionLevelFilter"
        )
        ?.addEventListener(
            "change",
            renderSuggestions
        );


    document
        .getElementById(
            "adminSuggestionSearch"
        )
        ?.addEventListener(
            "input",
            renderSuggestions
        );

}


/*
==================================================
GET FILTERED SUGGESTIONS
==================================================
*/

function getFilteredSuggestions() {

    const status =
        document
            .getElementById(
                "adminSuggestionStatusFilter"
            )
            ?.value ||
        "all";


    const level =
        document
            .getElementById(
                "adminSuggestionLevelFilter"
            )
            ?.value ||
        "all";


    const search =
        String(

            document
                .getElementById(
                    "adminSuggestionSearch"
                )
                ?.value ||
            ""

        )
            .trim()
            .toLowerCase();


    return suggestions.filter(
        suggestion => {

            if (
                status !==
                    "all" &&
                suggestion.status !==
                    status
            ) {

                return false;

            }


            if (
                level !==
                    "all" &&
                suggestion.level !==
                    level
            ) {

                return false;

            }


            if (
                search
            ) {

                const searchableText =
                    [

                        suggestion.topic,

                        suggestion
                            .proposedQuestion,

                        suggestion.reason,

                        suggestion.level,

                        suggestion.status

                    ]
                        .join(
                            " "
                        )
                        .toLowerCase();


                if (
                    !searchableText.includes(
                        search
                    )
                ) {

                    return false;

                }

            }


            return true;

        }
    );

}


/*
==================================================
SUMMARY
==================================================
*/

function updateSummary() {

    setText(

        "adminSuggestionPendingCount",

        countByStatus(
            "pendingReview"
        )

    );


    setText(

        "adminSuggestionReviewCount",

        countByStatus(
            "underReview"
        )

    );


    setText(

        "adminSuggestionApprovedCount",

        countByStatus(
            "approved"
        )

    );

}


/*
==================================================
COUNT BY STATUS
==================================================
*/

function countByStatus(
    status
) {

    return suggestions.filter(
        suggestion =>
            suggestion.status ===
            status
    ).length;

}


/*
==================================================
RENDER
==================================================
*/

function renderSuggestions() {

    const container =
        document.getElementById(
            "adminSuggestionsList"
        );


    if (!container) {

        return;

    }


    const filteredSuggestions =
        getFilteredSuggestions();


    if (
        filteredSuggestions.length ===
        0
    ) {

        renderEmptyState(
            container
        );

        return;

    }


    container.innerHTML =
        filteredSuggestions
            .map(
                createSuggestionCard
            )
            .join(
                ""
            );


    initializeSuggestionButtons();

}


/*
==================================================
SUGGESTION CARD
==================================================
*/

function createSuggestionCard(
    suggestion
) {

    const id =
        escapeHtml(
            suggestion.id ||
            ""
        );


    const topic =
        escapeHtml(
            suggestion.topic ||
            "Untitled suggestion"
        );


    const question =
        escapeHtml(
            suggestion
                .proposedQuestion ||
            ""
        );


    const reason =
        escapeHtml(
            suggestion.reason ||
            ""
        );


    const level =
        escapeHtml(
            formatLevel(
                suggestion.level
            )
        );


    const status =
        String(
            suggestion.status ||
            "pendingReview"
        );


    const statusLabel =
        escapeHtml(
            formatStatus(
                status
            )
        );


    const submittedDate =
        escapeHtml(
            formatDate(
                suggestion
                    .submittedAt
            )
        );


    const verifiedAccount =
        suggestion
            .submittedByVerifiedAccount ===
        true;


    return `

        <article
            class="admin-suggestion-card"
            data-suggestion-id="${id}"
        >

            <div class="admin-suggestion-card__header">

                <div>

                    <div class="admin-suggestion-card__badges">

                        <span
                            class="admin-suggestion-card__level"
                        >
                            ${level}
                        </span>


                        <span
                            class="admin-suggestion-card__status"
                            data-status="${escapeHtml(status)}"
                        >
                            ${statusLabel}
                        </span>

                    </div>


                    <h3>
                        ${topic}
                    </h3>

                </div>


                <div class="admin-suggestion-card__date">

                    <span>
                        Submitted
                    </span>

                    <strong>
                        ${submittedDate}
                    </strong>

                </div>

            </div>


            <div class="admin-suggestion-card__content">


                <div class="admin-suggestion-card__section">

                    <span class="admin-suggestion-card__label">
                        Proposed Question
                    </span>

                    <p class="admin-suggestion-card__question">
                        ${question}
                    </p>

                </div>


                <div class="admin-suggestion-card__section">

                    <span class="admin-suggestion-card__label">
                        Why the Participant Thinks It Matters
                    </span>

                    <p>
                        ${reason}
                    </p>

                </div>


                <div class="admin-suggestion-card__meta">

                    <span>

                        ${
                            verifiedAccount

                                ? "Submitted by verified account"

                                : "Submitted without verified account"
                        }

                    </span>

                </div>

            </div>


            <div class="admin-suggestion-card__review">

                <strong>
                    Review this suggestion
                </strong>

                <p>
                    Consider the subject separately
                    from the exact wording. A worthwhile
                    topic can be rewritten into a
                    clearer and more neutral poll.
                </p>

            </div>


            <div class="admin-suggestion-card__actions">

                ${
                    createStatusButtons(
                        id,
                        status
                    )
                }


                <button
                    type="button"
                    class="admin-suggestions__button admin-suggestions__button--danger"
                    data-action="reject"
                    data-suggestion-id="${id}"
                >
                    Reject & Delete
                </button>

            </div>

        </article>

    `;

}


/*
==================================================
STATUS BUTTONS
==================================================
*/

function createStatusButtons(
    id,
    status
) {

    let html =
        "";


    if (
        status ===
        "pendingReview"
    ) {

        html += `

            <button
                type="button"
                class="admin-suggestions__button admin-suggestions__button--secondary"
                data-action="underReview"
                data-suggestion-id="${id}"
            >
                Mark Under Review
            </button>

        `;

    }


    if (
        status !==
        "approved"
    ) {

        html += `

            <button
                type="button"
                class="admin-suggestions__button admin-suggestions__button--approve"
                data-action="approve"
                data-suggestion-id="${id}"
            >
                Approve Topic
            </button>

        `;

    }


    if (
        status ===
        "approved"
    ) {

        html += `

            <button
                type="button"
                class="admin-suggestions__button admin-suggestions__button--secondary"
                data-action="underReview"
                data-suggestion-id="${id}"
            >
                Return to Review
            </button>

        `;

    }


    return html;

}


/*
==================================================
BUTTON EVENTS
==================================================
*/

function initializeSuggestionButtons() {

    document
        .querySelectorAll(
            "[data-suggestion-id][data-action]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    handleSuggestionAction
                );

            }
        );

}


/*
==================================================
HANDLE ACTION
==================================================
*/

async function handleSuggestionAction(
    event
) {

    const button =
        event.currentTarget;


    const suggestionId =
        button.dataset
            .suggestionId;


    const action =
        button.dataset
            .action;


    if (
        !suggestionId ||
        !action
    ) {

        return;

    }


    if (
        action ===
        "reject"
    ) {

        openDeleteModal(
            suggestionId
        );

        return;

    }


    if (
        action ===
        "underReview"
    ) {

        await changeSuggestionStatus(
            suggestionId,
            "underReview"
        );

        return;

    }


    if (
        action ===
        "approve"
    ) {

        await changeSuggestionStatus(
            suggestionId,
            "approved"
        );

    }

}


/*
==================================================
CHANGE STATUS
==================================================
*/

async function changeSuggestionStatus(
    suggestionId,
    status
) {

    if (
        !isAdminUser()
    ) {

        showMessage(
            "Administrator access is required.",
            "error"
        );

        return;

    }


    try {

        const suggestionReference =
            ref(
                database,
                `pollSuggestions/${suggestionId}`
            );


        await update(
            suggestionReference,
            {

                status,

                reviewedAt:
                    new Date()
                        .toISOString(),

                reviewedBy:
                    ADMIN_UID

            }
        );


        showMessage(

            status ===
                "approved"

                ? "Suggestion approved for possible poll development."

                : "Suggestion moved to Under Review.",

            "success"

        );


    } catch (error) {

        console.error(
            "Suggestion status could not be updated:",
            error
        );


        showMessage(
            "The suggestion could not be updated.",
            "error"
        );

    }

}


/*
==================================================
DELETE MODAL
==================================================
*/

function initializeDeleteModal() {

    document
        .getElementById(
            "adminSuggestionDeleteCancel"
        )
        ?.addEventListener(
            "click",
            closeDeleteModal
        );


    document
        .getElementById(
            "adminSuggestionDeleteConfirm"
        )
        ?.addEventListener(
            "click",
            permanentlyDeleteSuggestion
        );


    document
        .querySelector(
            ".admin-suggestions__delete-backdrop"
        )
        ?.addEventListener(
            "click",
            closeDeleteModal
        );

}


/*
==================================================
OPEN DELETE
==================================================
*/

function openDeleteModal(
    suggestionId
) {

    selectedSuggestionId =
        suggestionId;


    const modal =
        document.getElementById(
            "adminSuggestionDeleteModal"
        );


    if (!modal) {

        return;

    }


    modal.hidden =
        false;


    document.body.classList.add(
        "admin-modal-open"
    );


    document
        .getElementById(
            "adminSuggestionDeleteCancel"
        )
        ?.focus();

}


/*
==================================================
CLOSE DELETE
==================================================
*/

function closeDeleteModal() {

    selectedSuggestionId =
        null;


    const modal =
        document.getElementById(
            "adminSuggestionDeleteModal"
        );


    if (
        modal
    ) {

        modal.hidden =
            true;

    }


    document.body.classList.remove(
        "admin-modal-open"
    );

}


/*
==================================================
PERMANENT DELETE
==================================================
*/

async function permanentlyDeleteSuggestion() {

    if (
        !selectedSuggestionId
    ) {

        return;

    }


    if (
        !isAdminUser()
    ) {

        closeDeleteModal();


        showMessage(
            "Administrator access is required.",
            "error"
        );


        return;

    }


    const suggestionId =
        selectedSuggestionId;


    const confirmButton =
        document.getElementById(
            "adminSuggestionDeleteConfirm"
        );


    setButtonBusy(
        confirmButton,
        true,
        "Deleting..."
    );


    try {

        /*
        ------------------------------------------
        PERMANENT FIREBASE DELETE

        There is intentionally no archive copy.
        ------------------------------------------
        */

        await remove(

            ref(
                database,
                `pollSuggestions/${suggestionId}`
            )

        );


        closeDeleteModal();


        showMessage(
            "Suggestion permanently deleted.",
            "success"
        );


    } catch (error) {

        console.error(
            "Suggestion could not be deleted:",
            error
        );


        showMessage(
            "The suggestion could not be deleted.",
            "error"
        );


    } finally {

        setButtonBusy(
            confirmButton,
            false,
            "Permanently Delete"
        );

    }

}


/*
==================================================
ADMIN CHECK
==================================================
*/

function isAdminUser() {

    return Boolean(

        auth.currentUser &&
        auth.currentUser.uid ===
            ADMIN_UID

    );

}


/*
==================================================
ACCESS DENIED
==================================================
*/

function renderAccessDenied() {

    const container =
        document.getElementById(
            "adminSuggestionsList"
        );


    if (!container) {

        return;

    }


    container.innerHTML = `

        <div class="admin-suggestions__empty">

            <h3>
                Administrator access required
            </h3>

            <p>
                Sign in with the Civic Horizon
                administrator account to review poll
                suggestions.
            </p>

        </div>

    `;

}


/*
==================================================
EMPTY STATE
==================================================
*/

function renderEmptyState(
    container
) {

    const template =
        document.getElementById(
            "adminSuggestionsEmptyTemplate"
        );


    if (
        template
    ) {

        container.replaceChildren(
            template.content.cloneNode(
                true
            )
        );


        return;

    }


    container.innerHTML = `

        <div class="admin-suggestions__empty">

            <h3>
                No suggestions found
            </h3>

            <p>
                There are no poll suggestions matching
                the current filters.
            </p>

        </div>

    `;

}


/*
==================================================
MESSAGE
==================================================
*/

function showMessage(
    message,
    type
) {

    const element =
        document.getElementById(
            "adminSuggestionsMessage"
        );


    if (!element) {

        return;

    }


    element.textContent =
        message;


    element.dataset.messageType =
        type;


    if (
        type ===
        "success"
    ) {

        window.setTimeout(
            () => {

                if (
                    element.textContent ===
                    message
                ) {

                    element.textContent =
                        "";

                    delete element.dataset
                        .messageType;

                }

            },
            5000
        );

    }

}


/*
==================================================
BUTTON BUSY
==================================================
*/

function setButtonBusy(
    button,
    busy,
    text
) {

    if (!button) {

        return;

    }


    button.disabled =
        busy;


    button.textContent =
        text;

}


/*
==================================================
FORMAT LEVEL
==================================================
*/

function formatLevel(
    level
) {

    const labels = {

        national:
            "National",

        state:
            "State",

        local:
            "Local",

        community:
            "Community"

    };


    return (
        labels[level] ||
        "Other"
    );

}


/*
==================================================
FORMAT STATUS
==================================================
*/

function formatStatus(
    status
) {

    const labels = {

        pendingReview:
            "Pending Review",

        underReview:
            "Under Review",

        approved:
            "Approved"

    };


    return (
        labels[status] ||
        "Pending Review"
    );

}


/*
==================================================
DATE
==================================================
*/

function formatDate(
    value
) {

    if (!value) {

        return "Unknown";

    }


    const date =
        new Date(
            value
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "Unknown";

    }


    return date.toLocaleDateString(
        undefined,
        {

            month:
                "short",

            day:
                "numeric",

            year:
                "numeric",

            hour:
                "numeric",

            minute:
                "2-digit"

        }
    );

}


/*
==================================================
TIMESTAMP
==================================================
*/

function getTimestamp(
    suggestion
) {

    const timestamp =
        Date.parse(
            suggestion
                ?.submittedAt ||
            ""
        );


    return Number.isFinite(
        timestamp
    )
        ? timestamp
        : 0;

}


/*
==================================================
TEXT
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
ESCAPE HTML
==================================================
*/

function escapeHtml(
    value
) {

    return String(
        value ??
        ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}