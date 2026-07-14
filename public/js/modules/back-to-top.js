export function initializeBackToTop() {

    const button = document.getElementById("backToTop");

    if (!button) {
        return;
    }

    initializeScroll(button);

    initializeClick(button);

    initializeKeyboardShortcut();

}

function initializeScroll(button) {

    window.addEventListener("scroll", () => {

        if (window.pageYOffset > 300) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    });

}

function initializeClick(button) {

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

function initializeKeyboardShortcut() {

    document.addEventListener("keydown", e => {

        if (e.key !== "Home") {
            return;
        }

        e.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}