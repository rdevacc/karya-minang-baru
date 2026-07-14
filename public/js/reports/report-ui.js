let salesChart = null;

function formatCurrency(value) {

    return new Intl.NumberFormat("id-ID", {

        style: "currency",

        currency: "IDR",

        maximumFractionDigits: 0

    }).format(Number(value));

}

function formatDate(value) {

    return new Intl.DateTimeFormat("id-ID", {

        dateStyle: "medium"

    }).format(new Date(value));

}

export function renderSummary(summary) {

    document.getElementById("totalSales").textContent =
        formatCurrency(summary.total_sales);

    document.getElementById("totalProfit").textContent =
        formatCurrency(summary.total_profit);

    document.getElementById("totalOrders").textContent =
        summary.total_orders;

    document.getElementById("totalItems").textContent =
        summary.total_items;

}

export function renderChart(chart) {

    const canvas = document.getElementById("salesChart");

    if (salesChart) {

        salesChart.destroy();

    }

    salesChart = new Chart(canvas, {

        type: "line",

        data: {

            labels: chart.map(item => item.date),

            datasets: [

                {

                    label: "Penjualan",

                    data: chart.map(item => item.sales),

                    tension: .3

                },

                {

                    label: "Profit",

                    data: chart.map(item => item.profit),

                    tension: .3

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}

export function renderOrders(orders) {

    const tbody =
        document.getElementById("reportTableBody");

    tbody.innerHTML = "";

    if (!orders.length) {

        tbody.innerHTML = `
            <tr>

                <td
                    colspan="5"
                    class="text-center py-5">

                    Tidak ada data.

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

                    ${order.invoice}

                </td>

                <td>

                    ${formatDate(order.created_at)}

                </td>

                <td class="text-end">

                    ${formatCurrency(order.total)}

                </td>

                <td class="text-end">

                    ${formatCurrency(order.profit)}

                </td>

            </tr>

        `;

    });

}