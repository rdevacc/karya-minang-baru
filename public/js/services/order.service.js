import { request } from "./api.js";

export async function createOrder(payload) {

    return await request("/orders", {
        method: "POST",
        body: JSON.stringify(payload)
    });

}   