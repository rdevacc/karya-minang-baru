export function setButtonLoading(
    button,
    loading,
    loadingText = "Menyimpan..."
) {

    if (loading) {

        button.disabled = true;

        button.dataset.originalText =
            button.innerHTML;

        button.innerHTML = `
            <span
                class="spinner-border spinner-border-sm me-2">
            </span>

            ${loadingText}
        `;

    } else {

        button.disabled = false;

        button.innerHTML =
            button.dataset.originalText;

    }

}