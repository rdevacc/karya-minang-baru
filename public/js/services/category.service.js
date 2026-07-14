import { request } from "./api.js";

export async function getCategories() {

    const result = await request("/categories");

    return result.data.map(category => ({
        id: category.id,
        name: category.name,
        slug: category.name.toLowerCase()
    }));

}