<div
    class="modal fade"
    id="categoryModal"
    tabindex="-1">

    <div class="modal-dialog">

        <div class="modal-content">

            <form id="categoryForm">

                <div class="modal-header">

                    <h5
                        class="modal-title"
                        id="categoryModalTitle">

                        Tambah Kategori

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
                        id="categoryId"
                        name="id">

                    <div class="mb-3">

                        <label class="form-label">

                            Nama Kategori

                        </label>

                        <input
                            type="text"
                            class="form-control"
                            id="name"
                            name="name"
                            required>

                    </div>

                    <div class="form-check form-switch">

                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="isActive"
                            name="is_active"
                            value="1"
                            checked>

                        <label class="form-check-label">

                            Kategori Aktif

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
                        id="btnSaveCategory">

                        Simpan

                    </button>

                </div>

            </form>

        </div>

    </div>

</div>