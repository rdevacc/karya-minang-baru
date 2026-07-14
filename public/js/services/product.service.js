import { request } from "./api.js";

export async function getProducts() {

    const result = await request("/products");

    return result.data.map(product => ({

        id: product.id,

        category_id: product.category.id,

        category_name: product.category.name,

        category: product.category.name.toLowerCase(),

        name: product.name,

        description: product.description,

        capital_price: Number(product.capital_price),

        selling_price: Number(product.selling_price),

        stock: product.stock,

        image_url: product.image_url,

        price: Number(product.selling_price),

        unit: "Porsi",

        image: product.image_url,

        badge: product.stock > 0
            ? "Tersedia"
            : "Habis",

        rating: 5,

        variants: []

    }));

}

export async function getProduct(id) {

    const result = await request(`/products/${id}`);

    return result.data;

}