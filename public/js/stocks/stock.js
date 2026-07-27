import {
    getProducts,
    getStockHistory,
    storeStock,
    storeStockOut
} from "./stock-service.js";

import {
    renderProducts,
    renderStockHistory,
    resetForm
} from "./stock-ui.js";

import { showToast }
from "../utils/toast.js";

import { setButtonLoading } from "../utils/button.js";

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

    setButtonLoading(
        saveButton,
        true,
        "Menyimpan..."
    );

    try {

        const formData = new FormData(form);

        const quantity = Number(
            formData.get("qty")
        );

        if (quantity === 0) {

            showToast(
                "Jumlah stok tidak boleh 0.",
                "danger"
            );

            return;

        }

        if (quantity < 0) {

            formData.set(
                "qty",
                Math.abs(quantity)
            );

            await storeStockOut(formData);

            showToast(
                "Stok berhasil dikurangi.",
                "success"
            );

        } else {

            await storeStock(formData);

            showToast(
                "Stok berhasil ditambahkan.",
                "success"
            );

        }

        resetForm();

        await loadProducts();

        await loadHistory();

    } catch (error) {

        console.error(error);

        showToast(
            error.message,
            "danger"
        );

    } finally {

        setButtonLoading(
            saveButton,
            false
        );

    }

}
window.refreshStockHistory = loadHistory;