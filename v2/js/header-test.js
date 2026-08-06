async function loadHeader() {

    const headerContainer =
        document.getElementById("headerContainer");

    try {

        const response =
            await fetch("components/header.html");

        if (!response.ok) {
            throw new Error(
                `Header request failed: ${response.status}`
            );
        }

        headerContainer.innerHTML =
            await response.text();

        initializeHeader();

    } catch (error) {

        console.error(
            "Header loading error:",
            error
        );

        headerContainer.innerHTML = `
            <p style="
                margin: 0;
                padding: 18px;
                background: #fff0ef;
                color: #a6271e;
                text-align: center;
            ">
                The v2 header could not be loaded.
            </p>
        `;

    }

}


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


    if (menuButton && navigation) {

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

            }
        );

    }


    dropdownButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const group =
                    button.closest(
                        ".navigation-group"
                    );

                const isOpen =
                    group.classList.contains(
                        "open"
                    );

                closeDropdowns();

                if (!isOpen) {

                    group.classList.add("open");

                    button.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

    });


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

            if (event.key === "Escape") {

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

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );

}


function closeDropdowns() {

    document
        .querySelectorAll(
            ".navigation-group.open"
        )
        .forEach(group => {

            group.classList.remove("open");

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

        });

}


loadHeader();