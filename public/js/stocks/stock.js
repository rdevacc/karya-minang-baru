import {
    getProducts,
    getStockHistory,
    storeStock
} from "./stock-service.js";

import {
    renderProducts,
    renderStockHistory,
    resetForm
} from "./stock-ui.js";

let products = [];

let histories = [];

const form = document.getElementById("stockForm");

const productSelect = document.getElementById("productId");

const quantityInput = document.getElementById("qty");

const descriptionInput = document.getElementById("description");

const saveButton = document.getElementById("btnSaveStock");

document.addEventListener("DOMContentLoaded", async () => {

    bindEvents();

    await loadProducts();

    await loadHistory();

});

async function loadProducts() {

    try {

        const response = await getProducts();

        products = response.data ?? response;

        renderProducts(products);

    } catch (error) {

        console.error(error);

    }

}

async function loadHistory() {

    try {

        const response = await getStockHistory();

        histories = response.data ?? response;

        renderStockHistory(histories);

    } catch (error) {

        console.error(error);

    }

}

function bindEvents() {

    form?.addEventListener(
        "submit",
        submitForm
    );

}

async function submitForm(event) {

    event.preventDefault();

    saveButton.disabled = true;

    try {

        const formData = new FormData(form);

        await storeStock(formData);

        resetForm();

        await loadHistory();

        alert("Stok berhasil ditambahkan.");

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

    saveButton.disabled = false;

}

window.refreshStockHistory = loadHistory;