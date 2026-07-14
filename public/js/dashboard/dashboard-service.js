const BASE_URL = "/api/v1";

export async function getDashboard() {

    const response = await fetch(`${BASE_URL}/dashboard`);

    if (!response.ok) {
        throw new Error("Failed to fetch dashboard.");
    }

    return await response.json();

}

export async function getOrders() {

    const response = await fetch("/api/v1/orders");

    if (!response.ok) {
        throw new Error("Failed to fetch orders.");
    }

    return await response.json();

}

export async function getOrder(id) {

    const response = await fetch(`/api/v1/orders/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch order.");
    }

    return await response.json();

}

export async function getChart() {

    const response = await fetch("/api/v1/dashboard/chart");

    if (!response.ok) {
        throw new Error("Failed to fetch chart.");
    }

    return await response.json();

}