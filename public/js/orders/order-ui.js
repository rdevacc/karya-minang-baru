function formatCurrency(value) {

    return new Intl.NumberFormat("id-ID", {

        style: "currency",

        currency: "IDR",

        maximumFractionDigits: 0

    }).format(Number(value));

}

function formatDate(value) {

    return new Intl.DateTimeFormat("id-ID", {

        dateStyle: "medium",

        timeStyle: "short"

    }).format(new Date(value));

}

export function renderOrders(orders) {

    const tbody = document.getElementById("orderTableBody");

    tbody.innerHTML = "";

    if (!orders.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-5">

                    Belum ada transaksi.

                </td>
            </tr>
        `;

        return;

    }

    orders.forEach((order, index) => {

        tbody.innerHTML += `

            <tr>

                <td>

                    ${index + 1}

                </td>

                <td>

                    <strong>

                        ${order.invoice}

                    </strong>

                </td>

                <td class="text-center">

                    ${formatDate(order.created_at)}

                </td>

                <td class="text-center">

                    ${formatCurrency(order.total)}

                </td>

                <td class="text-center">

                    <span class="badge bg-success">

                        Selesai

                    </span>

                </td>

                <td class="text-center">

                    <button
                        class="btn btn-sm btn-primary btn-detail"
                        data-id="${order.id}">

                        <i class="fas fa-eye"></i>

                    </button>

                </td>

            </tr>

        `;

    });

}

const modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("orderDetailModal")
);

export function showDetailModal() {

    modal.show();

}

export function hideDetailModal() {

    modal.hide();

}

export function renderOrderDetail(order) {

    document.getElementById("detailInvoice").textContent =
        order.invoice;

    document.getElementById("detailDate").textContent =
        formatDate(order.created_at);

    document.getElementById("detailTotal").textContent =
        formatCurrency(order.total);

    const tbody =
        document.getElementById("orderItemTableBody");

    tbody.innerHTML = "";

    order.items.forEach(item => {

        tbody.innerHTML += `

            <tr>

                <td>

                    ${item.product.name}

                </td>

                <td class="text-center">

                    ${item.qty}

                </td>

                <td class="text-end">

                    ${formatCurrency(item.price)}

                </td>

                <td class="text-end">

                    ${formatCurrency(item.subtotal)}

                </td>

            </tr>

        `;

    });

}