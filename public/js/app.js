import { initializeMenu } from "./modules/menu.js";
import { initializeCart } from "./modules/cart.js";
import { initializeNavigation } from "./modules/navigation.js";
import { initializeTestimonials } from "./modules/testimonial.js";
import { initializeForms } from "./modules/form.js";
import { initializeScrollEffects } from "./modules/scroll.js";
import { initializeAnimations } from "./modules/animation.js";
import { initializeProductModal } from "./modules/product-modal.js";
import { initializeBackToTop } from "./modules/back-to-top.js";
import { initializePaymentModal } from "./modules/payment-modal.js";

async function initializeApp() {

    initializeNavigation();

    initializeCart();

    initializeProductModal();

    initializePaymentModal();

    await initializeMenu();

    initializeTestimonials();

    initializeForms();

    initializeScrollEffects();

    initializeAnimations();

    initializeBackToTop();

}

document.addEventListener("DOMContentLoaded", initializeApp);