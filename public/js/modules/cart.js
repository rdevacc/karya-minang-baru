import { initializeMenu } from "./menu.js";
import { showNotification } from "./notification.js";
import { formatPrice } from "./utils.js";
import { state } from "../state.js";
import { createOrder } from "../services/order.service.js";
import { openPaymentModal } from "./payment-modal.js";


export function initializeCart() {

    const cartBtn = document.getElementById("cartBtn");
    const cartModal = document.getElementById("cartModal");
    const closeCart = document.getElementById("closeCart");
    const checkoutBtn = document.getElementById("checkoutBtn");

    cartBtn.addEventListener("click", () => {
        cartModal.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    closeCart.addEventListener("click", closeCartModal);

    cartModal.addEventListener("click", e => {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && cartModal.classList.contains("active")) {
            closeCartModal();
        }
    });

    checkoutBtn.addEventListener("click", checkout);

    updateCartUI();

}

export function addToCart(item) {

    const existingItem = state.cart.find(i => i.id === item.id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        state.cart.push({
            ...item,
            quantity: 1
        });

    }

    saveCart();

    updateCartUI();

    showNotification(`${item.name} ditambahkan ke keranjang.`);

}

export function removeFromCart(id) {

    const item = state.cart.find(item => item.id === id);

    state.cart = state.cart.filter(item => item.id !== id);

    saveCart();

    updateCartUI();

    if (item) {
        showNotification(`${item.name} dihapus dari keranjang.`, "info");
    }

}

export function updateQuantity(id, change) {

    const item = state.cart.find(i => i.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        removeFromCart(id);

        return;

    }

    saveCart();

    updateCartUI();

}

function updateCartUI() {

    const badge = document.getElementById("cartBadge");
    const items = document.getElementById("cartItems");
    const total = document.getElementById("cartTotal");

    const totalItem = state.cart.reduce((a, b) => a + b.quantity, 0);

    const totalPrice = state.cart.reduce((a, b) => {
        return a + (b.price * b.quantity);
    }, 0);

    badge.textContent = totalItem;

    total.textContent = `Rp ${formatPrice(totalPrice)}`;

    if (state.cart.length === 0) {

        items.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Keranjang kosong</p>
            </div>
        `;

        return;

    }

    items.innerHTML = state.cart.map(item => `
        <div class="cart-item">

            <div class="cart-item-image">
                <img src="${item.image}">
            </div>

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>Rp ${formatPrice(item.price)}</p>

                <div class="cart-item-controls">

                    <button
                        class="qty-btn"
                        onclick="updateQuantity(${item.id},-1)">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        class="qty-btn"
                        onclick="updateQuantity(${item.id},1)">
                        +
                    </button>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${item.id})">

                        <i class="fas fa-trash"></i>

                    </button>

                </div>

            </div>

        </div>
    `).join("");

}

function closeCartModal() {

    document.getElementById("cartModal").classList.remove("active");

    document.body.style.overflow = "auto";

}

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(state.cart));

}

async function checkout() {

    if (state.cart.length === 0) {

        showNotification("Keranjang masih kosong.", "warning");

        return;

    }

    try {

        const payload = {
            items: state.cart.map(item => ({
                product_id: item.id,
                qty: item.quantity
            }))
        };

        const response = await createOrder(payload);

        console.log(response);

        state.cart = [];

        saveCart();

        updateCartUI();

        closeCartModal();

        openPaymentModal(response.data);

        await initializeMenu();

    } catch (error) {

        showNotification(
            error.message,
            "error"
        );

    }

}

window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;