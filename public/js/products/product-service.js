const BASE_URL = "/api/v1/products";

async function request(url, options = {}) {

    const response = await fetch(url, {
        headers: {
            Accept: "application/json",
            ...(options.headers || {})
        },
        ...options
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message ?? "Terjadi kesalahan.");
    }

    return data;
}
export async function getProducts() {

    return request(BASE_URL);

}

export async function getProduct(id) {

    return request(`${BASE_URL}/${id}`);

}

export async function createProduct(formData) {

    return request(BASE_URL, {

        method: "POST",

        body: formData

    });

}

export async function updateProduct(id, formData) {

    formData.append("_method", "PUT");

    return request(`${BASE_URL}/${id}`, {

        method: "POST",

        body: formData

    });

}

export async function deleteProduct(id) {

    return request(`${BASE_URL}/${id}`, {

        method: "DELETE"

    });

}