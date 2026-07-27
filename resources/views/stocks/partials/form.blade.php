<div class="card shadow-sm border-0">

    <div class="card-header bg-white">

        <h5 class="mb-0">

            Tambah Stok

        </h5>

    </div>

    <div class="card-body">

        <form id="stockForm">

            <div class="row">

                <div class="col-md-4">

                    <div class="mb-3">

                        <label class="form-label">

                            Produk

                        </label>

                        <select
                            id="productId"
                            name="product_id"
                            class="form-select"
                            required>

                            <option value="">

                                Pilih Produk

                            </option>

                        </select>

                    </div>

                </div>

                <div class="col-md-3">

                    <div class="mb-3">

                        <label class="form-label">

                            Jumlah

                        </label>

                        <input
                            type="number"
                            id="qty"
                            name="qty"
                            class="form-control"
                            required>

                        <div class="form-text">
                            Gunakan angka positif untuk menambah stok dan angka negatif untuk mengurangi stok.
                        </div>

                    </div>

                </div>

            </div>

            <div class="mb-3">

                <label class="form-label">

                    Keterangan

                </label>

                <textarea
                    id="description"
                    name="description"
                    class="form-control"
                    rows="3"
                    placeholder="Contoh: Restock dari supplier"></textarea>

            </div>

            <button
                type="submit"
                class="btn btn-primary"
                id="btnSaveStock">

                <i class="fas fa-boxes-stacked me-2"></i>

                Atur Stok

            </button>

        </form>

    </div>

</div>