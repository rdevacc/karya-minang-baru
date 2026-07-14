import { state } from "../state.js";

let testimonialCards = [];
let dots = [];

export function initializeTestimonials() {

    testimonialCards = document.querySelectorAll(".testimonial-card");

    const sliderDots = document.getElementById("sliderDots");

    if (!testimonialCards.length || !sliderDots) {
        return;
    }

    dots = [];

    sliderDots.innerHTML = "";

    testimonialCards.forEach((_, index) => {

        const dot = document.createElement("span");

        dot.className = "dot";

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {

            showTestimonial(index);

        });

        sliderDots.appendChild(dot);

        dots.push(dot);

    });

    showTestimonial(0);

    setInterval(() => {

        state.currentTestimonial++;

        if (state.currentTestimonial >= testimonialCards.length) {
            state.currentTestimonial = 0;
        }

        showTestimonial(state.currentTestimonial);

    }, 5000);

    initializeSwipe();

}

function showTestimonial(index) {

    testimonialCards.forEach(card => {

        card.classList.remove("active");

    });

    dots.forEach(dot => {

        dot.classList.remove("active");

    });

    testimonialCards[index].classList.add("active");

    dots[index].classList.add("active");

    state.currentTestimonial = index;

}

function initializeSwipe() {

    const slider = document.getElementById("testimonialsSlider");

    if (!slider) {
        return;
    }

    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener("touchstart", e => {

        touchStartX = e.changedTouches[0].screenX;

    });

    slider.addEventListener("touchend", e => {

        touchEndX = e.changedTouches[0].screenX;

        handleSwipe();

    });

    function handleSwipe() {

        if (touchEndX < touchStartX - 50) {

            state.currentTestimonial++;

            if (state.currentTestimonial >= testimonialCards.length) {
                state.currentTestimonial = 0;
            }

            showTestimonial(state.currentTestimonial);

        }

        if (touchEndX > touchStartX + 50) {

            state.currentTestimonial--;

            if (state.currentTestimonial < 0) {
                state.currentTestimonial = testimonialCards.length - 1;
            }

            showTestimonial(state.currentTestimonial);

        }

    }

}