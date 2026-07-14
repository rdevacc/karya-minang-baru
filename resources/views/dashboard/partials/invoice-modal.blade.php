<div class="modal fade" id="invoiceModal" tabindex="-1">

    <div class="modal-dialog modal-lg">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">
                    Detail Invoice
                </h5>

                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>

            <div class="modal-body">

                <p>
                    <strong>Invoice :</strong>
                    <span id="invoiceNumber"></span>
                </p>

                <p>
                    <strong>Tanggal :</strong>
                    <span id="invoiceDate"></span>
                </p>

                <table class="table">

                    <thead>

                        <tr>

                            <th>Menu</th>

                            <th>Qty</th>

                            <th>Harga</th>

                            <th>Subtotal</th>

                        </tr>

                    </thead>

                    <tbody id="invoiceItems"></tbody>

                </table>

                <div class="text-end">

                    <h5>
                        Total :
                        <span id="invoiceTotal"></span>
                    </h5>

                    <h6>
                        Profit :
                        <span id="invoiceProfit"></span>
                    </h6>

                </div>

            </div>

        </div>

    </div>

</div>