<div class="payment-modal" id="paymentModal">

    <div class="payment-modal-content">

        <div class="payment-success-icon">
            <i class="fas fa-circle-check"></i>
        </div>

        <h2>Pesanan Berhasil</h2>

        <p class="payment-subtitle">
            Terima kasih telah melakukan pemesanan.
        </p>

        <div class="payment-info">

            <div class="payment-item">

                <span>Invoice</span>

                <strong id="paymentInvoice"></strong>

            </div>

            <div class="payment-item">

                <span>Total Pembayaran</span>

                <strong id="paymentTotal"></strong>

            </div>

        </div>

        <div class="payment-qris">

            <img
            src="{{ asset('assets/thank-you-qr.svg') }}"
            alt="QR Thank You"
            id="paymentQrCode">

        </div>

        <p class="payment-note">
            Scan QR di atas untuk melihat maskot
            <strong>Karya Minang Baru</strong>.
        </p>

        <div class="payment-actions">

            <button
                class="payment-button"
                id="closePaymentModal">

                Tutup

            </button>

        </div>

    </div>

</div>