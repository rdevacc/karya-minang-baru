import {
    getReport
} from "./report-service.js";

import {
    renderSummary,
    renderChart,
    renderOrders
} from "./report-ui.js";

import { showToast }
from "../utils/toast.js";

const startDateInput =
    document.getElementById("startDate");

const endDateInput =
    document.getElementById("endDate");

const filterButton =
    document.getElementById("btnFilter");

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        bindEvents();

        await loadReport();

    }
);

function bindEvents() {

    filterButton?.addEventListener(
        "click",
        loadReport
    );

}

async function loadReport() {

    try {

        const response = await getReport(

            startDateInput.value,

            endDateInput.value

        );

        renderSummary(
            response.summary
        );

        renderChart(
            response.chart
        );

        renderOrders(
            response.orders
        );

    } catch (error) {

        console.error(error);

        showToast("Gagal memuat laporan.", "danger");

    }

}