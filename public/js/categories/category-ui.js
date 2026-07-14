function renderStatus(isActive) {

    return Number(isActive) === 1
        ? `<span class="badge bg-success">Aktif</span>`
        : `<span class="badge bg-danger">Nonaktif</span>`;

}

export function renderCategories(categories) {

    const tbody = document.getElementById("categoryTableBody");

    tbody.innerHTML = "";

    if (!categories.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-5">

                    Belum ada data kategori.

                </td>
            </tr>
        `;

        return;

    }

    categories.forEach((category, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td class="align-middle">

                ${index + 1}

            </td>

            <td class="align-middle fw-semibold">

                ${category.name}

            </td>

            <td class="text-center align-middle">

                ${category.products_count ?? 0}

            </td>

            <td class="text-center align-middle">

                ${renderStatus(category.is_active)}

            </td>

            <td class="text-center align-middle">

                <button
                    class="btn btn-sm btn-warning btn-edit"
                    data-id="${category.id}"
                    title="Edit">

                    <i class="fas fa-pen"></i>

                </button>

                <button
                    class="btn btn-sm btn-danger btn-delete ms-1"
                    data-id="${category.id}"
                    title="Hapus">

                    <i class="fas fa-trash"></i>

                </button>

            </td>

        `;

        tbody.appendChild(row);

    });

}

const modalElement = document.getElementById("categoryModal");

const modal = modalElement
    ? new bootstrap.Modal(modalElement)
    : null;

export function showCategoryModal(title = "Tambah Kategori") {

    document.getElementById("categoryModalTitle").textContent = title;

    modal?.show();

}

export function hideCategoryModal() {

    modal?.hide();

}

export function clearCategoryForm() {

    document.getElementById("categoryForm").reset();

    document.getElementById("categoryId").value = "";

    document.getElementById("isActive").checked = true;

}

export function fillCategoryForm(category) {

    document.getElementById("categoryId").value =
        category.id;

    document.getElementById("name").value =
        category.name;

    document.getElementById("isActive").checked =
        Number(category.is_active) === 1;

}