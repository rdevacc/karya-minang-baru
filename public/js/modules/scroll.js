export function initializeScrollEffects() {

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("slide-up");

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        });

    }, observerOptions);

    document
        .querySelectorAll(".about-card, .testimonial-card, .contact-item")
        .forEach(element => {

            element.style.opacity = "0";

            element.style.transform = "translateY(30px)";

            element.style.transition = "all .6s ease";

            observer.observe(element);

        });

    initializeParallax();

}

function initializeParallax() {

    const heroBackground = document.querySelector(".hero-background");

    if (!heroBackground) {
        return;
    }

    window.addEventListener("scroll", () => {

        const scrollY = window.pageYOffset;

        if (scrollY < window.innerHeight) {

            heroBackground.style.transform =
                `translateY(${scrollY * .5}px)`;

        }

    });

}