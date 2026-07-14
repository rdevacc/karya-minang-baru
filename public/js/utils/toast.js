let toast;

export function showToast(
    message,
    type = "success"
) {

    if (!toast) {

        const wrapper = document.createElement("div");

        wrapper.className =
            "toast-container position-fixed top-0 end-0 p-3";

        wrapper.style.zIndex = 9999;

        wrapper.innerHTML = `

            <div
                id="appToast"
                class="toast align-items-center border-0 text-bg-${type}"
                role="alert">

                <div class="d-flex">

                    <div
                        class="toast-body">

                        ${message}

                    </div>

                    <button
                        type="button"
                        class="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast">

                    </button>

                </div>

            </div>

        `;

        document.body.appendChild(wrapper);

        toast = new bootstrap.Toast(
            document.getElementById("appToast"),
            {
                delay: 2500
            }
        );

    } else {

        const el =
            document.getElementById("appToast");

        el.className =
            `toast align-items-center border-0 text-bg-${type}`;

        el.querySelector(".toast-body")
            .textContent = message;

    }

    toast.show();

}