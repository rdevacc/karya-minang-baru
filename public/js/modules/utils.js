export function formatPrice(price) {

    return Number(price).toLocaleString("id-ID");

}

export function generateStars(rating) {

    const fullStars = Math.floor(rating);

    const hasHalfStar = rating % 1 !== 0;

    let stars = "";

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);

    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;

}

export function formatCurrency(price) {

    return `Rp ${formatPrice(price)}`;

}