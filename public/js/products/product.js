import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "./product-service.js";

import {
    getCategories
} from "../categories/category-service.js";

import {
    renderProducts,
    fillProductForm,
    clearProductForm,
    showProductModal,
    hideProductModal
} from "./product-ui.js";

import { showToast }
from "../utils/toast.js";

import { setButtonLoading } from "../utils/button.js";

let products = [];

const modalElement = document.getElementById("productModal");

const form = document.getElementById("productForm");

const addButton = document.getElementById("btnAddProduct");

const saveButton = document.getElementById("btnSaveProduct");

const imageInput = document.getElementById("image");

const previewImage = document.getElementById("imagePreview");

const categorySelect = document.getElementById("categoryId");

const productIdInput = document.getElementById("productId");

const capitalPrice = document.getElementById("capitalPrice");

const sellingPrice = document.getElementById("sellingPrice");

const isActive = document.getElementById("isActive");

let deleteId = null;

const deleteModal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("deleteProductModal")
);

const deleteButton = document.getElementById("btnDeleteProduct");


document.addEventListener("DOMContentLoaded", async () => {

    bindEvents();

    await loadCategories();

    await refreshProducts();

});

async function loadCategories() {

    try {

        const response = await getCategories();

        const categories = response.data ?? response;

        categorySelect.innerHTML = `
            <option value="">Pilih Kategori</option>
        `;

        categories.forEach(category => {

            categorySelect.innerHTML += `
                <option value="${category.id}">
                    ${category.name}
                </option>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

async function refreshProducts() {

    try {

        const response = await getProducts();

        products = response.data ?? response;

        renderProducts(products);

        bindEditButtons();

        bindDeleteButtons();

    } catch (error) {

        console.error(error);

    }

}

function bindEvents() {

    addButton?.addEventListener("click", () => {

        resetForm();

        showProductModal();

    });

    deleteButton?.addEventListener(
        "click",
        confirmDelete
    );

    imageInput?.addEventListener("change", previewSelectedImage);

    form?.addEventListener("submit", submitForm);

}

function previewSelectedImage(event) {

    const file = event.target.files[0];

    if (!file) {

        previewImage.src = "";

        previewImage.classList.add("d-none");

        return;

    }

    const reader = new FileReader();

    reader.onload = function (e) {

        previewImage.src = e.target.result;

        previewImage.classList.remove("d-none");

    };

    reader.readAsDataURL(file);

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

        formData.set(
            "is_active",
            isActive.checked ? "1" : "0"
        );

        const id = productIdInput.value;

        if (id) {

            await updateProduct(id, formData);

        } else {

            await createProduct(formData);

        }

        hideProductModal();

        resetForm();

        await refreshProducts();

    } catch (error) {

        console.error(error);

        showToast("Gagal menyimpan produk.", "danger");

    } finally {

        setButtonLoading(
            saveButton,
            false
        );
    }

}

function bindEditButtons() {

    document.querySelectorAll(".btn-edit").forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.id;

            const product = products.find(item => item.id == id);

            if (!product) {

                return;

            }

            fillProductForm(product);

            if (previewImage) {

                if (product.image_url) {

                    previewImage.src = product.image_url;

                    previewImage.classList.remove("d-none");

                } else {

                    previewImage.src = "https://placehold.co/300x300?text=No+Image";

                }

            }

            showProductModal("Edit Produk");

        });

    });

}

function bindDeleteButtons() {

    document.querySelectorAll(".btn-delete")
        .forEach(button => {

            button.addEventListener("click", () => {

                deleteId = button.dataset.id;

                deleteModal.show();

            });

        });

}

async function confirmDelete() {

    if (!deleteId) {

        return;

    }

    try {

       setButtonLoading(
        saveButton,
        true,
       );

        await deleteProduct(deleteId);

        deleteModal.hide();

        showToast("Produk berhasil dihapus.", "success");

        deleteId = null;

        await refreshProducts();
        

    } catch (error) {

        console.error(error);

        showToast("Gagal menghapus produk.", "danger");

    } finally {
        setButtonLoading(
            saveButton,
            true
        );
    }

    deleteButton.disabled = false;

}

function resetForm() {

    clearProductForm();

}

window.refreshProducts = refreshProducts;