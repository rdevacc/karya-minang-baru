const PRODUCT_URL = "/api/v1/products";

const STOCK_URL = "/api/v1/stocks";

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

export async function getProducts() {

    return request(PRODUCT_URL);

}

export async function getStockHistory() {

    return request(`${STOCK_URL}/history`);

}

export async function storeStock(formData) {

    return request(`${STOCK_URL}/in`, {

        method: "POST",

        body: formData

    });

}

export async function storeStockOut(formData) {

    return request(`${STOCK_URL}/out`, {

        method: "POST",

        body: formData

    });

}