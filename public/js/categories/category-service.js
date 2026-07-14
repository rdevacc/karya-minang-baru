const BASE_URL = "/api/v1/categories";

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

export async function getCategories() {

    return request(BASE_URL);

}

export async function getCategory(id) {

    return request(`${BASE_URL}/${id}`);

}

export async function createCategory(formData) {

    return request(BASE_URL, {

        method: "POST",

        body: formData

    });

}

export async function updateCategory(id, formData) {

    formData.append("_method", "PUT");

    return request(`${BASE_URL}/${id}`, {

        method: "POST",

        body: formData

    });

}

export async function deleteCategory(id) {

    return request(`${BASE_URL}/${id}`, {

        method: "DELETE"

    });

}