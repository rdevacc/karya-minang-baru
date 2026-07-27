function formatDate(value) {

    return new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(new Date(value));

}

export function renderProducts(products) {

    const select = document.getElementById("productId");

    select.innerHTML = `
        <option value="">
            Pilih Produk
        </option>
    `;

    products.forEach(product => {

        select.innerHTML += `
            <option value="${product.id}">
                ${product.name}
            </option>
        `;

    });

}

export function renderStockHistory(histories) {

    const tbody = document.getElementById(
        "stockHistoryTableBody"
    );

    tbody.innerHTML = "";

    if (!histories.length) {

        tbody.innerHTML = `
            <tr>
                <td
                    colspan="5"
                    class="text-center py-5 text-muted">

                    <i class="fas fa-box-open fa-2x mb-3 d-block"></i>

                    Belum ada riwayat stok.

                </td>
            </tr>
        `;

        return;

    }

    histories.forEach((history, index) => {

        const row = document.createElement("tr");

        const qty = Number(history.qty);

        const isOut = qty < 0 || history.type === "out";

        const quantity = isOut
            ? `-${Math.abs(qty)}`
            : `+${Math.abs(qty)}`;

        const badgeClass = isOut
            ? "bg-danger"
            : "bg-success";

        const typeLabel = isOut
            ? "Stok Keluar"
            : "Stok Masuk";

        row.innerHTML = `

            <td>
                ${index + 1}
            </td>

            <td>
                ${history.product?.name ?? "-"}
            </td>

            <td>

                <span
                    class="badge ${badgeClass}"
                    title="${typeLabel}">

                    ${quantity}

                </span>

            </td>

            <td>
                ${history.description ?? "-"}
            </td>

            <td>
                ${formatDate(history.created_at)}
            </td>

        `;

        tbody.appendChild(row);

    });

}

export function resetForm() {

    const form = document.getElementById(
        "stockForm"
    );

    form?.reset();

}