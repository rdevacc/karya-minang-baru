import { formatPrice } from "./utils.js";

const modal = document.getElementById("paymentModal");

const invoice = document.getElementById("paymentInvoice");
const total = document.getElementById("paymentTotal");
const closeButton = document.getElementById("closePaymentModal");

export function initializePaymentModal() {

    console.log(modal);

    closeButton.addEventListener("click", closePaymentModal);

    modal.addEventListener("click", e => {

        if (e.target === modal) {
            closePaymentModal();
        }

    });

    document.addEventListener("keydown", e => {

        if (
            e.key === "Escape" &&
            modal.classList.contains("active")
        ) {
            closePaymentModal();
        }

    });

}

export function openPaymentModal(order) {

    console.log("OPEN PAYMENT", order);

    invoice.textContent = order.invoice;

    total.textContent =
        `Rp ${formatPrice(order.total)}`;

    modal.classList.add("active");

    console.log(modal.className);

    document.body.style.overflow = "hidden";

}

export function closePaymentModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "auto";

}