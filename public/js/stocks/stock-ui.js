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
                <td colspan="5"
                    class="text-center py-5">

                    Belum ada riwayat stok.

                </td>
            </tr>
        `;

        return;

    }

    histories.forEach((history, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>

                ${index + 1}

            </td>

            <td>

                ${history.product?.name ?? "-"}

            </td>

            <td>

                <span class="badge bg-success">

                    +${history.quantity}

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

    document.getElementById("stockForm").reset();

}