import {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} from "./category-service.js";

import {
    renderCategories,
    fillCategoryForm,
    clearCategoryForm,
    showCategoryModal,
    hideCategoryModal
} from "./category-ui.js";

let categories = [];

let deleteId = null;

const form = document.getElementById("categoryForm");

const addButton = document.getElementById("btnAddCategory");

const saveButton = document.getElementById("btnSaveCategory");

const deleteButton = document.getElementById("btnDeleteCategory");

const categoryIdInput = document.getElementById("categoryId");

const isActive = document.getElementById("isActive");

const deleteModal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("deleteCategoryModal")
);

document.addEventListener("DOMContentLoaded", async () => {

    bindEvents();

    await refreshCategories();

});

async function refreshCategories() {

    try {

        const response = await getCategories();

        categories = response.data ?? response;

        renderCategories(categories);

        bindEditButtons();

        bindDeleteButtons();

    } catch (error) {

        console.error(error);

    }

}

function bindEvents() {

    addButton?.addEventListener("click", () => {

        resetForm();

        showCategoryModal("Tambah Kategori");

    });

    form?.addEventListener("submit", submitForm);

    deleteButton?.addEventListener(
        "click",
        confirmDelete
    );

}

async function submitForm(event) {

    event.preventDefault();

    saveButton.disabled = true;

    try {

        const formData = new FormData(form);

        formData.set(
            "is_active",
            isActive.checked ? "1" : "0"
        );

        const id = categoryIdInput.value;

        if (id) {

            await updateCategory(id, formData);

        } else {

            await createCategory(formData);

        }

        hideCategoryModal();

        resetForm();

        await refreshCategories();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

    saveButton.disabled = false;

}

function bindEditButtons() {

    document.querySelectorAll(".btn-edit")
        .forEach(button => {

            button.addEventListener("click", async () => {

                try {

                    const response = await getCategory(
                        button.dataset.id
                    );

                    const category =
                        response.data ?? response;

                    fillCategoryForm(category);

                    showCategoryModal(
                        "Edit Kategori"
                    );

                } catch (error) {

                    console.error(error);

                }

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

    deleteButton.disabled = true;

    try {

        await deleteCategory(deleteId);

        deleteModal.hide();

        deleteId = null;

        await refreshCategories();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

    deleteButton.disabled = false;

}

function resetForm() {

    clearCategoryForm();

}

window.refreshCategories = refreshCategories;