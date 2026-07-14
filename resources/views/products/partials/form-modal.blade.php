<div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    aria-hidden="true">

    <div class="modal-dialog modal-lg">

        <div class="modal-content">

            <form id="productForm" enctype="multipart/form-data">

                <div class="modal-header">

                    <h5
                        class="modal-title"
                        id="productModalTitle">

                        Tambah Produk

                    </h5>

                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal">
                    </button>

                </div>

                <div class="modal-body">

                    <input
                        type="hidden"
                        id="productId"
                        name="id">

                    <div class="row">

                        <div class="col-md-4">

                            <div class="mb-3">

                                <label class="form-label">

                                    Gambar Produk

                                </label>

                                <img
                                    id="imagePreview"
                                    src="https://placehold.co/300x300?text=No+Image"
                                    class="img-fluid rounded border mb-3"
                                    style="height:220px;width:100%;object-fit:cover;">

                                <input
                                    type="file"
                                    class="form-control"
                                    id="image"
                                    name="image"
                                    accept="image/*">

                            </div>

                        </div>

                        <div class="col-md-8">

                            <div class="mb-3">

                                <label class="form-label">

                                    Kategori

                                </label>

                                <select
                                    class="form-select"
                                    id="categoryId"
                                    name="category_id"
                                    required>

                                    <option value="">

                                        Pilih Kategori

                                    </option>

                                </select>

                            </div>

                            <div class="mb-3">

                                <label class="form-label">

                                    Nama Produk

                                </label>

                                <input
                                    type="text"
                                    class="form-control"
                                    id="name"
                                    name="name"
                                    required>

                            </div>

                            <div class="mb-3">

                                <label class="form-label">

                                    Deskripsi

                                </label>

                                <textarea
                                    class="form-control"
                                    id="description"
                                    name="description"
                                    rows="4"></textarea>

                            </div>

                        </div>

                    </div>

                    <div class="row">

                        <div class="col-md-4">

                            <div class="mb-3">

                                <label class="form-label">

                                    Harga Modal

                                </label>

                                <input
                                    type="number"
                                    class="form-control"
                                    id="capitalPrice"
                                    name="capital_price"
                                    min="0"
                                    required>

                            </div>

                        </div>

                        <div class="col-md-4">

                            <div class="mb-3">

                                <label class="form-label">

                                    Harga Jual

                                </label>

                                <input
                                    type="number"
                                    class="form-control"
                                    id="sellingPrice"
                                    name="selling_price"
                                    min="0"
                                    required>

                            </div>

                        </div>

                        <div class="col-md-4">

                            <div class="mb-3">

                                <label class="form-label">

                                    Stok

                                </label>

                                <input
                                    type="number"
                                    class="form-control"
                                    id="stock"
                                    name="stock"
                                    min="0"
                                    required>

                            </div>

                        </div>

                    </div>

                    <div class="form-check form-switch">

                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="isActive"
                            checked>

                        <label
                            class="form-check-label"
                            for="isActive">

                            Produk Aktif

                        </label>

                    </div>

                </div>

                <div class="modal-footer">

                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal">

                        Batal

                    </button>

                    <button
                        type="submit"
                        class="btn btn-primary"
                        id="btnSaveProduct">

                        Simpan

                    </button>

                </div>

            </form>

        </div>

    </div>

</div>