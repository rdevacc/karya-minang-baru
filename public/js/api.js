const API_URL = "/api/v1";

export async function getProducts() {
    try {

        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
            throw new Error("Gagal mengambil data produk.");
        }

        const result = await response.json();

        return result.data.map(product => ({

            // ===== Data asli =====
            id: product.id,
            category_id: product.category.id,
            category_name: product.category.name,
            name: product.name,
            description: product.description,
            capital_price: Number(product.capital_price),
            selling_price: Number(product.selling_price),
            stock: product.stock,
            image_url: product.image_url,

            // ===== Adapter agar script lama tetap berjalan =====
            category: product.category.name.toLowerCase(),
            price: Number(product.selling_price),
            unit: "Porsi",
            image: product.image_url,
            rating: 5,
            badge: product.stock > 0 ? "Tersedia" : "Habis",
            variants: []

        }));

    } catch (error) {

        console.error("Get Products Error:", error);

        return [];

    }
}