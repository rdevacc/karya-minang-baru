import { showNotification } from "./notification.js";

export function initializeForms() {

    initializeContactForm();

    initializeNewsletter();

}

function initializeContactForm() {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener("submit", e => {

        e.preventDefault();

        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector("textarea").value;

        const phoneNumber = "6281234567890";

        const whatsappMessage =
`Halo Minang Karya Baru 👋

Nama : ${name}
Email : ${email}
Telepon : ${phone}

Pesan :
${message}`;

        const url =
            `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        showNotification(
            "Pesan berhasil dikirim.<br>Anda akan diarahkan ke WhatsApp.",
            "success",
            3000
        );

        setTimeout(() => {

            window.open(url, "_blank");

            contactForm.reset();

        }, 3000);

    });

}

function initializeNewsletter() {

    const forms = document.querySelectorAll(".newsletter-form");

    forms.forEach(form => {

        form.addEventListener("submit", e => {

            e.preventDefault();

            const email =
                form.querySelector('input[type="email"]').value;

            showNotification(
                `Email <strong>${email}</strong> berhasil didaftarkan.`,
                "success"
            );

            form.reset();

        });

    });

}