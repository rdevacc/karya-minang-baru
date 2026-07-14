const BASE_URL = "/api/v1/orders";

async function request(url, options = {}) {

    const response = await fetch(url, {
        headers: {
            Accept: "application/json",
            ...(options.headers ?? {})
        },
        ...options
    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ?? "Terjadi kesalahan."
        );

    }

    return data;

}

export async function getOrders() {

    return request(BASE_URL);

}

export async function getOrder(id) {

    return request(`${BASE_URL}/${id}`);

}