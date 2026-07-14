import {

    getOrders,

    getOrder

} from "./order-service.js";

import {

    renderOrders,

    renderOrderDetail,

    showDetailModal

} from "./order-ui.js";

let orders = [];

document.addEventListener("DOMContentLoaded", async () => {

    await loadOrders();

});

async function loadOrders() {

    try {

        const response = await getOrders();

        orders = response.data ?? response;

        renderOrders(orders);

        bindDetailButtons();

    } catch (error) {

        console.error(error);

    }

}

function bindDetailButtons() {

    document.querySelectorAll(".btn-detail")
        .forEach(button => {

            button.addEventListener("click", async () => {

                try {

                    const response = await getOrder(
                        button.dataset.id
                    );

                    const order =
                        response.data ?? response;

                    renderOrderDetail(order);

                    showDetailModal();

                } catch (error) {

                    console.error(error);

                }

            });

        });

}

window.refreshOrders = loadOrders;