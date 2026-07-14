export function initializeNavigation() {

    const navbar = document.getElementById("navbar");
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener("scroll", () => {

        if (ticking) return;

        window.requestAnimationFrame(() => {

            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

            let nearSection = false;

            document.querySelectorAll("section[id]").forEach(section => {

                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;

                if (
                    currentScroll >= (top - 150) &&
                    currentScroll <= (top + 150)
                ) {
                    nearSection = true;
                }

            });

            if (
                currentScroll > lastScroll &&
                currentScroll > 500 &&
                !nearSection
            ) {

                navbar.style.transform = "translateY(-100%)";

            } else {

                navbar.style.transform = "translateY(0)";

            }

            lastScroll = currentScroll;

            ticking = false;

        });

        ticking = true;

    });

    function closeMenu() {

        hamburger.classList.remove("active");

        navMenu.classList.remove("active");

        document.body.style.overflow = "auto";

        document.body.style.position = "static";

        document.body.style.width = "";

    }

    function openMenu() {

        hamburger.classList.add("active");

        navMenu.classList.add("active");

        document.body.style.overflow = "hidden";

        document.body.style.position = "fixed";

        document.body.style.width = "100%";

    }

    hamburger.addEventListener("click", e => {

        e.stopPropagation();

        if (navMenu.classList.contains("active")) {

            closeMenu();

        } else {

            openMenu();

        }

    });

    document.addEventListener("click", e => {

        if (
            navMenu.classList.contains("active") &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {

            closeMenu();

        }

    });

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(l => l.classList.remove("active"));

            link.classList.add("active");

            navbar.style.transform = "translateY(0)";

            closeMenu();

        });

    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (!target) return;

            window.scrollTo({

                top: target.offsetTop - 80,

                behavior: "smooth"

            });

        });

    });

    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {

        const scrollY = window.pageYOffset;

        sections.forEach(section => {

            const height = section.offsetHeight;

            const top = section.offsetTop - 150;

            const id = section.getAttribute("id");

            if (
                scrollY > top &&
                scrollY <= top + height
            ) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (link.getAttribute("href") === `#${id}`) {

                        link.classList.add("active");

                    }

                });

            }

        });

    });

    const indicator = document.querySelector(".scroll-indicator");

    if (indicator) {

        indicator.addEventListener("click", () => {

            document
                .querySelector("#about")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    }

    document.addEventListener("keydown", e => {

        if (
            e.key === "Escape" &&
            navMenu.classList.contains("active")
        ) {

            closeMenu();

        }

    });

}