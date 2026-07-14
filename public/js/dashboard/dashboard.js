import {
    getDashboard,
    getOrders,
    getOrder,
    getChart
} from "./dashboard-service.js";

import {
    renderDashboard,
    renderTransactions,
    renderInvoice,
    renderChart
} from "./dashboard-ui.js";

document.addEventListener("DOMContentLoaded", async () => {

    try {

        const dashboard = await getDashboard();

        renderDashboard(dashboard);

        const chart = await getChart();

        renderChart(chart);

        const orders = await getOrders();

        renderTransactions(orders.data);

    } catch (error) {

        console.error(error);

        alert("Gagal memuat dashboard.");

    }

});

document.addEventListener("click", async (e) => {

    const button = e.target.closest(".btn-detail");

    if (!button) {
        return;
    }

    try {

        const id = button.dataset.id;

        const response = await getOrder(id);

        renderInvoice(response.data);

    } catch (error) {

        console.error(error);

        alert("Gagal mengambil detail transaksi.");

    }

});