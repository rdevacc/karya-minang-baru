import { request } from "./api.js";

export async function getDashboard() {

    const result = await request("/dashboard");

    return result.data;

}