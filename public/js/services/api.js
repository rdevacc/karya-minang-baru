const API_URL = "/api/v1";

async function request(url, options = {}) {

    const response = await fetch(`${API_URL}${url}`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            ...options.headers
        },
        ...options
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message ?? "Request failed");
    }

    return result;

}

export {
    request
};