let notificationQueue = [];

let isShowingNotification = false;

export function showNotification(message, type = "success", duration = 3500) {

    notificationQueue.push({
        message,
        type,
        duration
    });

    if (!isShowingNotification) {
        displayNextNotification();
    }

}

function displayNextNotification() {

    if (notificationQueue.length === 0) {

        isShowingNotification = false;

        return;

    }

    isShowingNotification = true;

    const {
        message,
        type,
        duration
    } = notificationQueue.shift();

    const notification = document.createElement("div");

    notification.className = "notification";

    const icons = {
        success: "check-circle",
        error: "exclamation-circle",
        info: "info-circle",
        warning: "exclamation-triangle"
    };

    const colors = {
        success: "linear-gradient(135deg,#28a745,#20c997)",
        error: "linear-gradient(135deg,#dc3545,#c82333)",
        info: "linear-gradient(135deg,#17a2b8,#138496)",
        warning: "linear-gradient(135deg,#ffc107,#ff9800)"
    };

    notification.style.cssText = `
        position:fixed;
        top:100px;
        right:-400px;
        background:${colors[type]};
        color:#fff;
        padding:20px 25px;
        border-radius:12px;
        box-shadow:0 10px 40px rgba(0,0,0,.4);
        z-index:10000;
        max-width:400px;
        min-width:300px;
        transition:all .4s cubic-bezier(.68,-.55,.265,1.55);
        font-size:15px;
        line-height:1.6;
    `;

    notification.innerHTML = `
        <div style="display:flex;align-items:flex-start;gap:15px;">

            <i class="fas fa-${icons[type]}"
                style="font-size:24px;flex-shrink:0;margin-top:2px;">
            </i>

            <div style="flex:1;">
                ${message}
            </div>

            <button
                class="notification-close"
                style="background:none;border:none;color:#fff;font-size:20px;cursor:pointer;">

                <i class="fas fa-times"></i>

            </button>

        </div>
    `;

    document.body.appendChild(notification);

    notification.querySelector(".notification-close")
        .addEventListener("click", () => {

            notification.remove();

            displayNextNotification();

        });

    setTimeout(() => {

        notification.style.right = "20px";

    }, 10);

    setTimeout(() => {

        notification.style.right = "-400px";

        notification.style.opacity = "0";

        setTimeout(() => {

            notification.remove();

            displayNextNotification();

        }, 400);

    }, duration);

}