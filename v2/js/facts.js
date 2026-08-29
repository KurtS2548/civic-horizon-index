/*
==================================================
CIVIC HORIZON INDEX V2
JUST THE FACTS
==================================================
*/


/*
==================================================
TREASURY API
==================================================
*/

const treasuryDebtEndpoint =
    "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&page[size]=1";


/*
==================================================
INITIALIZE PAGE
==================================================
*/

async function initializeFactsPage() {

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


    await loadNationalDebt();

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
NATIONAL DEBT
==================================================
*/

async function loadNationalDebt() {

    const totalElement =
        document.getElementById(
            "nationalDebtTotal"
        );

    const dateElement =
        document.getElementById(
            "nationalDebtDate"
        );

    const publicElement =
        document.getElementById(
            "publicDebtAmount"
        );

    const intragovElement =
        document.getElementById(
            "intragovDebtAmount"
        );

    const errorElement =
        document.getElementById(
            "nationalDebtError"
        );


    if (
        !totalElement ||
        !dateElement ||
        !publicElement ||
        !intragovElement
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                treasuryDebtEndpoint,
                {
                    headers: {
                        Accept:
                            "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                `Treasury request failed: ${response.status}`
            );

        }


        const payload =
            await response.json();


        const record =
            payload?.data?.[0];


        if (!record) {

            throw new Error(
                "Treasury returned no debt data."
            );

        }


        const totalDebt =
            Number(
                record.tot_pub_debt_out_amt
            );

        const publicDebt =
            Number(
                record.debt_held_public_amt
            );

        const intragovDebt =
            Number(
                record.intragov_hold_amt
            );


        if (
            !Number.isFinite(
                totalDebt
            ) ||
            !Number.isFinite(
                publicDebt
            ) ||
            !Number.isFinite(
                intragovDebt
            )
        ) {

            throw new Error(
                "Treasury debt values were invalid."
            );

        }


        totalElement.textContent =
            formatFullCurrency(
                totalDebt
            );


        publicElement.textContent =
            formatCompactCurrency(
                publicDebt
            );


        intragovElement.textContent =
            formatCompactCurrency(
                intragovDebt
            );


        dateElement.textContent =
            formatTreasuryDate(
                record.record_date
            );


        if (errorElement) {

            errorElement.hidden =
                true;

        }

    } catch (error) {

        console.error(
            "Could not load national debt:",
            error
        );


        totalElement.textContent =
            "Data unavailable";


        dateElement.textContent =
            "Please check again later";


        publicElement.textContent =
            "—";


        intragovElement.textContent =
            "—";


        if (errorElement) {

            errorElement.hidden =
                false;

        }

    }

}


/*
==================================================
FULL CURRENCY
==================================================
*/

function formatFullCurrency(
    amount
) {

    return new Intl.NumberFormat(
        "en-US",
        {
            style:
                "currency",

            currency:
                "USD",

            maximumFractionDigits:
                0
        }
    ).format(
        amount
    );

}


/*
==================================================
COMPACT CURRENCY
==================================================
*/

function formatCompactCurrency(
    amount
) {

    const trillion =
        1_000_000_000_000;

    const billion =
        1_000_000_000;


    if (
        Math.abs(
            amount
        ) >= trillion
    ) {

        return (
            "$" +
            (
                amount /
                trillion
            ).toFixed(
                2
            ) +
            " trillion"
        );

    }


    if (
        Math.abs(
            amount
        ) >= billion
    ) {

        return (
            "$" +
            (
                amount /
                billion
            ).toFixed(
                1
            ) +
            " billion"
        );

    }


    return formatFullCurrency(
        amount
    );

}


/*
==================================================
TREASURY DATE
==================================================
*/

function formatTreasuryDate(
    value
) {

    if (!value) {

        return "—";

    }


    const parts =
        String(
            value
        ).split(
            "-"
        );


    if (
        parts.length !== 3
    ) {

        return value;

    }


    const date =
        new Date(
            Number(
                parts[0]
            ),
            Number(
                parts[1]
            ) - 1,
            Number(
                parts[2]
            )
        );


    return new Intl.DateTimeFormat(
        "en-US",
        {
            month:
                "long",

            day:
                "numeric",

            year:
                "numeric"
        }
    ).format(
        date
    );

}


/*
==================================================
HEADER
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
                    navigation
                        .classList
                        .toggle(
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
                        group
                            .classList
                            .contains(
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

}


/*
==================================================
CLOSE DROPDOWNS
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
START
==================================================
*/

initializeFactsPage();