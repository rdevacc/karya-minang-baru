function formatCurrency(value) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(Number(value));

}

function renderImage(imageUrl, productName) {

    if (!imageUrl) {

        return `
            <div
                class="d-flex align-items-center justify-content-center bg-light border rounded"
                style="width:60px;height:60px;">
                <i class="fas fa-image text-muted"></i>
            </div>
        `;

    }

    return `
        <img
            src="${imageUrl}"
            alt="${productName}"
            class="rounded border"
            style="width:60px;height:60px;object-fit:cover;">
    `;

}

function renderStatus(isActive) {

    return isActive
        ? `<span class="badge bg-success">Aktif</span>`
        : `<span class="badge bg-danger">Nonaktif</span>`;

}

function renderStock(stock) {

    if (stock <= 5) {

        return `
            <span class="badge bg-danger">
                ${stock}
            </span>
        `;

    }

    if (stock <= 10) {

        return `
            <span class="badge bg-warning text-dark">
                ${stock}
            </span>
        `;

    }

    return `
        <span class="badge bg-success">
            ${stock}
        </span>
    `;

}

export function renderProducts(products) {

    const tbody = document.getElementById("productTableBody");

    tbody.innerHTML = "";

    if (!products.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center py-5">
                    Belum ada data produk.
                </td>
            </tr>
        `;

        return;

    }

    products.forEach(product => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td class="align-middle">

                ${renderImage(product.image_url, product.name)}

            </td>

            <td class="align-middle">

                <div class="fw-semibold">

                    ${product.name}

                </div>

                <small class="text-muted">

                    ${product.description ?? ""}

                </small>

            </td>

            <td class="align-middle">

                ${product.category?.name ?? "-"}

            </td>

            <td class="text-end align-middle">

                ${formatCurrency(product.capital_price)}

            </td>

            <td class="text-end align-middle">

                <strong>

                    ${formatCurrency(product.selling_price)}

                </strong>

            </td>

            <td class="text-center align-middle">

                ${renderStock(product.stock)}

            </td>

            <td class="text-center align-middle">

                ${renderStatus(product.is_active)}

            </td>

            <td class="text-center align-middle">

                <button
                    class="btn btn-sm btn-warning btn-edit"
                    data-id="${product.id}"
                    title="Edit Produk">

                    <i class="fas fa-pen"></i>

                </button>

                <button
                    class="btn btn-sm btn-danger btn-delete ms-1"
                    data-id="${product.id}"
                    title="Hapus Produk">

                    <i class="fas fa-trash"></i>

                </button>

            </td>

        `;

        tbody.appendChild(row);

    });

}

const modalElement = document.getElementById("productModal");

const modal = modalElement
    ? new bootstrap.Modal(modalElement)
    : null;

export function showProductModal(title = "Tambah Produk") {

    document.getElementById("productModalTitle").textContent = title;

    modal?.show();

}

export function hideProductModal() {

    modal?.hide();

}

export function clearProductForm() {

    document.getElementById("productForm").reset();

    document.getElementById("productId").value = "";

    document.getElementById("imagePreview").src =
        "https://placehold.co/300x300?text=No+Image";

}

export function fillProductForm(product) {

    document.getElementById("productId").value = product.id;

    document.getElementById("categoryId").value =
        product.category?.id ?? "";

    document.getElementById("name").value =
        product.name;

    document.getElementById("description").value =
        product.description ?? "";

    document.getElementById("capitalPrice").value =
        product.capital_price;

    document.getElementById("sellingPrice").value =
        product.selling_price;

    document.getElementById("stock").value =
        product.stock;

    document.getElementById("isActive").checked =
        product.is_active == 1;

    document.getElementById("imagePreview").src =
        product.image_url ??
        "https://placehold.co/300x300?text=No+Image";

}