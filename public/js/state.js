export const state = {

    menu: [],

    cart: JSON.parse(localStorage.getItem("cart")) ?? [],

    currentCategory: "all",

    currentTestimonial: 0,

    isScrolling: false

};