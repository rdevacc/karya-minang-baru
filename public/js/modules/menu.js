import { getProducts } from "../services/product.service.js";
import { getCategories } from "../services/category.service.js";
import { state } from "../state.js";
import { addToCart } from "./cart.js";
import { openProductModal } from "./product-modal.js";


export async function initializeMenu() {

    const [products, categories] = await Promise.all([
        getProducts(),
        getCategories()
    ]);

    state.menu = products;
    state.categories = categories;
    state.currentCategory = "all";

    renderCategoryFilter(categories);

    renderMenu(state.menu);

    initializeFilter();

}


function renderCategoryFilter(categories) {

    console.log(categories);

    const filterContainer = document.querySelector(".menu-filter");

    console.log(filterContainer);

    filterContainer.innerHTML = "";

    filterContainer.insertAdjacentHTML(
        "beforeend",
        `
        <button
            class="filter-btn active"
            data-category="all">
            Semua
        </button>
        `
    );

    categories.forEach(category => {

        filterContainer.insertAdjacentHTML(
            "beforeend",
            `
            <button
                class="filter-btn"
                data-category="${category.slug}">
                ${category.name}
            </button>
            `
        );

    });

}


function initializeFilter() {

    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            state.currentCategory = button.dataset.category;

            const filteredData =
                state.currentCategory === "all"
                    ? state.menu
                    : state.menu.filter(item => item.category === state.currentCategory);

            const menuGrid = document.getElementById("menuGrid");

            menuGrid.style.opacity = "0";
            menuGrid.style.transform = "translateY(20px)";

            setTimeout(() => {

                renderMenu(filteredData);

                menuGrid.style.opacity = "1";
                menuGrid.style.transform = "translateY(0)";

            }, 300);

        });

    });

}

function renderMenu(items) {

    const menuGrid = document.getElementById("menuGrid");

    menuGrid.innerHTML = "";

    if (items.length === 0) {

        menuGrid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:80px 20px;color:var(--text-secondary)">
                <i class="fas fa-search" style="font-size:48px;margin-bottom:20px;opacity:.5"></i>
                <p style="font-size:18px;">Tidak ada menu yang ditemukan</p>
            </div>
        `;

        return;

    }

    items.forEach((item, index) => {

        const card = createMenuCard(item);

        card.style.animationDelay = `${index * .05}s`;

        menuGrid.appendChild(card);

    });

}

function createMenuCard(item) {

    const card = document.createElement("div");

    card.className = "menu-card fade-in";

    let priceHTML = "";

    if (item.variants && item.variants.length > 0) {

        priceHTML = item.variants.map(v => `
            <span class="menu-price">
                Rp ${formatPrice(v.price)}
            </span>
            <span class="menu-unit">
                /${v.unit}
            </span>
        `).join(" | ");

    } else {

        priceHTML = `
            <span class="menu-price">
                Rp ${formatPrice(item.price)}
            </span>

            ${item.unit
                ? `<span class="menu-unit">/${item.unit}</span>`
                : ""}
        `;

    }

    card.innerHTML = `
        <div class="menu-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy">

            <span class="menu-badge">
                ${item.badge ?? ""}
            </span>
        </div>

        <div class="menu-content">

            <div class="menu-header">

                <h3 class="menu-title">
                    ${item.name}
                </h3>

                <div class="menu-price-wrapper">
                    ${priceHTML}
                </div>

            </div>

            <p class="menu-description">
                ${item.description}
            </p>

            <div class="menu-footer">

                <div class="rating">
                    ${generateStars(item.rating)}
                    <span>(${item.rating})</span>
                </div>

                <button
                    class="add-to-cart"
                    data-id="${item.id}">
                    <i class="fas fa-cart-plus"></i>
                    Tambah
                </button>

            </div>

        </div>
    `;

    const addButton = card.querySelector(".add-to-cart");

    addButton.addEventListener("click", e => {

        e.stopPropagation();

        addToCart(item);

    });

    card.addEventListener("click", () => {

        openProductModal(item.id);

    });

    return card;

}

function showProductDetail(item) {

    showNotification(`
        <strong>${item.name}</strong><br>
        ${item.description}<br>
        <strong>Rp ${formatPrice(item.price)}</strong>
    `, "info", 5000);

}

function generateStars(rating) {

    const fullStars = Math.floor(rating);

    const hasHalfStar = rating % 1 !== 0;

    let stars = "";

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);

    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;

}

function formatPrice(price) {

    return Number(price).toLocaleString("id-ID");

}