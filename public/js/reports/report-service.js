const BASE_URL = "/api/v1/reports";

async function request(url) {

    const response = await fetch(url, {

        headers: {

            Accept: "application/json"

        }

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ?? "Terjadi kesalahan."
        );

    }

    return data;

}

export async function getReport(
    startDate = "",
    endDate = ""
) {

    const params = new URLSearchParams();

    if (startDate) {

        params.append(
            "start_date",
            startDate
        );

    }

    if (endDate) {

        params.append(
            "end_date",
            endDate
        );

    }

    const url = params.toString()
        ? `${BASE_URL}?${params}`
        : BASE_URL;

    return request(url);

}