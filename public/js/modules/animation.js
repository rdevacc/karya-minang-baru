export function initializeAnimations() {

    initializeCounterAnimation();

}

function initializeCounterAnimation() {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            const statItems = entry.target.querySelectorAll(".stat-item");

            statItems.forEach((item, index) => {

                const h3 = item.querySelector("h3");

                const originalText = h3.textContent;

                setTimeout(() => {

                    if (originalText.includes("/5")) {

                        h3.textContent = "0.0/5";

                        animateValue(
                            h3,
                            0,
                            4.9,
                            2000,
                            "/5"
                        );

                    } else if (originalText.includes("+")) {

                        const value = parseInt(
                            originalText.replace(/[^0-9]/g, "")
                        );

                        h3.textContent = "0+";

                        animateValue(
                            h3,
                            0,
                            value,
                            2000,
                            "+"
                        );

                    } else {

                        const value = parseInt(
                            originalText.replace(/[^0-9]/g, "")
                        );

                        h3.textContent = "0";

                        animateValue(
                            h3,
                            0,
                            value,
                            2000
                        );

                    }

                }, index * 200);

            });

            observer.unobserve(entry.target);

        });

    }, {

        threshold: 0.5

    });

    const heroStats = document.querySelector(".hero-stats");

    if (heroStats) {

        observer.observe(heroStats);

    }

}

function animateValue(
    element,
    start,
    end,
    duration,
    suffix = ""
) {

    let startTimestamp = null;

    function step(timestamp) {

        if (!startTimestamp) {

            startTimestamp = timestamp;

        }

        const progress = Math.min(
            (timestamp - startTimestamp) / duration,
            1
        );

        if (suffix === "/5") {

            element.textContent =
                (progress * (end - start) + start).toFixed(1) +
                suffix;

        } else if (suffix === "+") {

            element.textContent =
                Math.floor(
                    progress * (end - start) + start
                ).toLocaleString("id-ID") + "+";

        } else {

            element.textContent =
                Math.floor(
                    progress * (end - start) + start
                ).toLocaleString("id-ID");

        }

        if (progress < 1) {

            window.requestAnimationFrame(step);

        }

    }

    window.requestAnimationFrame(step);

}