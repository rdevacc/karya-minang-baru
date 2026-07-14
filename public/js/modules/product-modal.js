import { getProduct } from "../services/product.service.js";
import { addToCart } from "./cart.js";
import { formatPrice } from "./utils.js";

const modal = document.getElementById("productModal");

const image = document.getElementById("productModalImage");
const category = document.getElementById("productModalCategory");
const title = document.getElementById("productModalTitle");
const description = document.getElementById("productModalDescription");
const price = document.getElementById("productModalPrice");
const stock = document.getElementById("productModalStock");
const addButton = document.getElementById("productModalAddToCart");
const closeButton = document.getElementById("closeProductModal");

let currentProduct = null;

export function initializeProductModal() {

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", e => {

        if (e.target === modal) {
            closeModal();
        }

    });

    document.addEventListener("keydown", e => {

        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }

    });

    addButton.addEventListener("click", () => {

        if (!currentProduct) return;

        addToCart(currentProduct);

    });

}

export async function openProductModal(id) {

    const result = await getProduct(id);

    currentProduct = {
        id: result.id,
        category_id: result.category.id,
        category_name: result.category.name,
        category: result.category.name.toLowerCase(),
        name: result.name,
        description: result.description,
        price: Number(result.selling_price),
        image: result.image_url,
        stock: result.stock
    };

    image.src = currentProduct.image;
    image.alt = currentProduct.name;

    category.textContent = currentProduct.category_name;
    title.textContent = currentProduct.name;
    description.textContent = currentProduct.description;
    price.textContent = `Rp ${formatPrice(currentProduct.price)}`;
    stock.textContent = `Stok : ${currentProduct.stock}`;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}

export function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "auto";

}