<div
    class="modal fade"
    id="orderDetailModal"
    tabindex="-1">

    <div class="modal-dialog modal-lg">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">

                    Detail Order

                </h5>

                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>

            <div class="modal-body">

                <div class="row mb-4">

                    <div class="col-md-6">

                        <strong>

                            Invoice

                        </strong>

                        <div id="detailInvoice">

                            -

                        </div>

                    </div>

                    <div class="col-md-6">

                        <strong>

                            Tanggal

                        </strong>

                        <div id="detailDate">

                            -

                        </div>

                    </div>

                </div>

                <div class="table-responsive">

                    <table class="table">

                        <thead>

                            <tr>

                                <th>

                                    Produk

                                </th>

                                <th class="text-center">

                                    Qty

                                </th>

                                <th class="text-end">

                                    Harga

                                </th>

                                <th class="text-end">

                                    Subtotal

                                </th>

                            </tr>

                        </thead>

                        <tbody id="orderItemTableBody">

                        </tbody>

                    </table>

                </div>

                <div class="text-end mt-3">

                    <h5>

                        Total :
                        <span id="detailTotal">

                            Rp0

                        </span>

                    </h5>

                </div>

            </div>

        </div>

    </div>

</div>