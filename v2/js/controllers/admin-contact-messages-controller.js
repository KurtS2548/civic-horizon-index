/*
==================================================
CIVIC HORIZON INDEX V2
ADMIN CONTACT MESSAGES CONTROLLER
==================================================
*/


import {

    database,
    auth

} from "../firebase.js";


import {

    ref,
    onValue,
    update

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

let contactMessages =
    [];


let unsubscribeContactMessages =
    null;


/*
==================================================
INITIALIZE
==================================================
*/

export function initializeAdminContactMessages() {

    initializeFilters();


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


            subscribeToContactMessages();

        }
    );

}


/*
==================================================
FIREBASE SUBSCRIPTION
==================================================
*/

function subscribeToContactMessages() {

    if (
        unsubscribeContactMessages
    ) {

        unsubscribeContactMessages();

    }


    const messagesReference =
        ref(
            database,
            "contactMessages"
        );


    unsubscribeContactMessages =
        onValue(

            messagesReference,

            snapshot => {

                contactMessages =
                    [];


                if (
                    snapshot.exists()
                ) {

                    snapshot.forEach(
                        childSnapshot => {

                            const value =
                                childSnapshot.val() ||
                                {};


                            contactMessages.push({

                                id:
                                    childSnapshot.key,

                                ...value

                            });

                        }
                    );

                }


                contactMessages.sort(
                    (
                        messageA,
                        messageB
                    ) => {

                        return (
                            getTimestamp(
                                messageB
                                    .submittedAt
                            ) -
                            getTimestamp(
                                messageA
                                    .submittedAt
                            )
                        );

                    }
                );


                updateSummary();

                renderContactMessages();

            },

            error => {

                console.error(
                    "Contact messages could not be loaded:",
                    error
                );


                showMessage(
                    "Contact messages could not be loaded.",
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
            "adminContactStatusFilter"
        )
        ?.addEventListener(
            "change",
            renderContactMessages
        );


    document
        .getElementById(
            "adminContactCategoryFilter"
        )
        ?.addEventListener(
            "change",
            renderContactMessages
        );


    document
        .getElementById(
            "adminContactSearch"
        )
        ?.addEventListener(
            "input",
            renderContactMessages
        );

}


/*
==================================================
FILTERED MESSAGES
==================================================
*/

function getFilteredContactMessages() {

    const status =
        document
            .getElementById(
                "adminContactStatusFilter"
            )
            ?.value ||
        "new";


    const category =
        document
            .getElementById(
                "adminContactCategoryFilter"
            )
            ?.value ||
        "all";


    const search =
        String(

            document
                .getElementById(
                    "adminContactSearch"
                )
                ?.value ||
            ""

        )
            .trim()
            .toLowerCase();


    return contactMessages.filter(
        message => {

            if (
                status !==
                    "all" &&
                message.status !==
                    status
            ) {

                return false;

            }


            if (
                category !==
                    "all" &&
                message.category !==
                    category
            ) {

                return false;

            }


            if (
                search
            ) {

                const searchableText =
                    [

                        message.name,

                        message.email,

                        message.category,

                        message.message,

                        message.status

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
        "adminContactNewCount",
        countByStatus(
            "new"
        )
    );


    setText(
        "adminNewContactMessageCount",
        countByStatus(
            "new"
        )
    );


    setText(
        "adminContactReviewCount",
        countByStatus(
            "underReview"
        )
    );


    setText(
        "adminContactResolvedCount",
        countByStatus(
            "resolved"
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

    return contactMessages.filter(
        message =>
            message.status ===
            status
    ).length;

}


/*
==================================================
RENDER
==================================================
*/

function renderContactMessages() {

    const container =
        document.getElementById(
            "adminContactMessagesList"
        );


    if (
        !container
    ) {

        return;

    }


    const filteredMessages =
        getFilteredContactMessages();


    if (
        filteredMessages.length ===
        0
    ) {

        renderEmptyState(
            container
        );

        return;

    }


    container.innerHTML =
        filteredMessages
            .map(
                createContactMessageCard
            )
            .join(
                ""
            );


    initializeContactMessageButtons();

}


/*
==================================================
MESSAGE CARD
==================================================
*/

function createContactMessageCard(
    contactMessage
) {

    const id =
        escapeHtml(
            contactMessage.id ||
            ""
        );


    const name =
        escapeHtml(
            contactMessage.name ||
            "Participant"
        );


    const email =
        escapeHtml(
            contactMessage.email ||
            ""
        );


    const message =
        escapeHtml(
            contactMessage.message ||
            ""
        );


    const category =
        String(
            contactMessage.category ||
            "other"
        );


    const status =
        String(
            contactMessage.status ||
            "new"
        );


    const submittedDate =
        escapeHtml(
            formatDate(
                contactMessage.submittedAt
            )
        );


    return `

        <article
            class="admin-contact-message-card"
            data-contact-message-id="${id}"
        >

            <div class="admin-contact-message-card__header">

                <div>

                    <div class="admin-contact-message-card__badges">

                        <span
                            class="admin-contact-message-card__category"
                            data-category="${escapeHtml(category)}"
                        >
                            ${escapeHtml(
                                formatCategory(
                                    category
                                )
                            )}
                        </span>


                        <span
                            class="admin-contact-message-card__status"
                            data-status="${escapeHtml(status)}"
                        >
                            ${escapeHtml(
                                formatStatus(
                                    status
                                )
                            )}
                        </span>

                    </div>


                    <h3>
                        ${name}
                    </h3>


                    <a
                        href="mailto:${email}"
                        class="admin-contact-message-card__email"
                    >
                        ${email}
                    </a>

                </div>


                <div class="admin-contact-message-card__date">

                    <span>
                        Received
                    </span>

                    <strong>
                        ${submittedDate}
                    </strong>

                </div>

            </div>


            <div class="admin-contact-message-card__content">

                <p>
                    ${message}
                </p>

            </div>


            <div class="admin-contact-message-card__actions">

                ${createStatusButtons(
                    id,
                    status
                )}

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
        status !==
        "new"
    ) {

        html += `

            <button
                type="button"
                class="admin-contact-messages__button admin-contact-messages__button--secondary"
                data-contact-action="new"
                data-contact-message-id="${id}"
            >
                Mark New
            </button>

        `;

    }


    if (
        status !==
        "underReview"
    ) {

        html += `

            <button
                type="button"
                class="admin-contact-messages__button admin-contact-messages__button--secondary"
                data-contact-action="underReview"
                data-contact-message-id="${id}"
            >
                Under Review
            </button>

        `;

    }


    if (
        status !==
        "resolved"
    ) {

        html += `

            <button
                type="button"
                class="admin-contact-messages__button admin-contact-messages__button--resolve"
                data-contact-action="resolved"
                data-contact-message-id="${id}"
            >
                Mark Resolved
            </button>

        `;

    }


    if (
        status !==
        "archived"
    ) {

        html += `

            <button
                type="button"
                class="admin-contact-messages__button admin-contact-messages__button--archive"
                data-contact-action="archived"
                data-contact-message-id="${id}"
            >
                Archive
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

function initializeContactMessageButtons() {

    document
        .querySelectorAll(
            "[data-contact-message-id][data-contact-action]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    handleContactMessageAction
                );

            }
        );

}


/*
==================================================
HANDLE ACTION
==================================================
*/

async function handleContactMessageAction(
    event
) {

    const button =
        event.currentTarget;


    const messageId =
        button.dataset
            .contactMessageId;


    const action =
        button.dataset
            .contactAction;


    if (
        !messageId ||
        !action
    ) {

        return;

    }


    if (
        ![
            "new",
            "underReview",
            "resolved",
            "archived"
        ].includes(
            action
        )
    ) {

        return;

    }


    await changeContactMessageStatus(
        messageId,
        action,
        button
    );

}


/*
==================================================
CHANGE STATUS
==================================================
*/

async function changeContactMessageStatus(
    messageId,
    status,
    button
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


    const originalText =
        button?.textContent ||
        "";


    setButtonBusy(
        button,
        true,
        "Saving..."
    );


    try {

        const messageReference =
            ref(
                database,
                `contactMessages/${messageId}`
            );


        await update(
            messageReference,
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
            getStatusSuccessMessage(
                status
            ),
            "success"
        );

    } catch (error) {

        console.error(
            "Contact message status could not be updated:",
            error
        );


        showMessage(
            "The contact message could not be updated.",
            "error"
        );


        setButtonBusy(
            button,
            false,
            originalText
        );

    }

}


/*
==================================================
SUCCESS MESSAGE
==================================================
*/

function getStatusSuccessMessage(
    status
) {

    const messages = {

        new:
            "Message returned to New.",

        underReview:
            "Message moved to Under Review.",

        resolved:
            "Message marked Resolved.",

        archived:
            "Message archived."

    };


    return (
        messages[
            status
        ] ||
        "Message updated."
    );

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
            "adminContactMessagesList"
        );


    if (
        !container
    ) {

        return;

    }


    container.innerHTML = `

        <div class="admin-contact-messages__empty">

            <h3>
                Administrator access required
            </h3>

            <p>
                Sign in with the Civic Horizon
                administrator account to review
                contact messages.
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
            "adminContactMessagesEmptyTemplate"
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

        <div class="admin-contact-messages__empty">

            <h3>
                No messages found
            </h3>

            <p>
                There are no contact messages
                matching the current filters.
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
            "adminContactMessagesMessage"
        );


    if (
        !element
    ) {

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

    if (
        !button
    ) {

        return;

    }


    button.disabled =
        busy;


    button.textContent =
        text;

}


/*
==================================================
FORMAT CATEGORY
==================================================
*/

function formatCategory(
    category
) {

    const labels = {

    general:
        "General",

    problem:
        "Problem",

    account:
        "Account",

    feedback:
        "Feedback",

    privacy:
        "Privacy",

    accessibility:
        "Accessibility",

    other:
        "Other"

};


    return (
        labels[
            category
        ] ||
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

        new:
            "New",

        underReview:
            "Under Review",

        resolved:
            "Resolved",

        archived:
            "Archived"

    };


    return (
        labels[
            status
        ] ||
        "New"
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

    if (
        !value
    ) {

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
    value
) {

    const timestamp =
        Date.parse(
            value ||
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
