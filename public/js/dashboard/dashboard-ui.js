export function renderDashboard(data) {

    document.getElementById("totalProducts").textContent =
        data.total_products;

    document.getElementById("totalTransactions").textContent =
        data.total_transactions;

    document.getElementById("totalSales").textContent =
        formatCurrency(data.total_sales);

    document.getElementById("totalProfit").textContent =
        formatCurrency(data.total_profit);

}

function formatCurrency(value) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(Number(value));

}

function formatDate(value) {

    return new Date(value).toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short"
    });

}

export function renderTransactions(orders) {

    const tbody = document.getElementById("transactionTableBody");

    tbody.innerHTML = "";

    if (!orders.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4">
                    Belum ada transaksi.
                </td>
            </tr>
        `;

        return;

    }

    orders.forEach(order => {

        const totalItem = order.items.reduce((sum, item) => sum + item.qty, 0);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${order.invoice}</td>

            <td>${formatDate(order.created_at)}</td>

            <td>${totalItem}</td>

            <td>${formatCurrency(order.total)}</td>

            <td>${formatCurrency(order.profit)}</td>

            <td>
                <button
                    class="btn btn-primary btn-sm btn-detail"
                    data-id="${order.id}">
                    Detail
                </button>
            </td>
        `;

        tbody.appendChild(row);

    });

}

export function renderInvoice(order) {

    document.getElementById("invoiceNumber").textContent =
        order.invoice;

    document.getElementById("invoiceDate").textContent =
        formatDate(order.created_at);

    document.getElementById("invoiceTotal").textContent =
        formatCurrency(order.total);

    document.getElementById("invoiceProfit").textContent =
        formatCurrency(order.profit);

    const tbody = document.getElementById("invoiceItems");

    tbody.innerHTML = "";

    order.items.forEach(item => {

        tbody.innerHTML += `
            <tr>

                <td>${item.product}</td>

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

    const modal = new bootstrap.Modal(
        document.getElementById("invoiceModal")
    );

    modal.show();

}

let salesChart = null;

export function renderChart(chart) {

    const ctx = document
        .getElementById("salesChart")
        .getContext("2d");

    if (salesChart) {
        salesChart.destroy();
    }

    salesChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: chart.labels,

            datasets: [

                {
                    label: "Penjualan",
                    data: chart.sales,
                    borderWidth: 2,
                    tension: 0.3
                },

                {
                    label: "Profit",
                    data: chart.profit,
                    borderWidth: 2,
                    tension: 0.3
                }

            ]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {
                    position: "top"
                }

            },

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}