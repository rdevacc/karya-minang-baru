@extends('layouts.admin')

@section('title', 'Kategori')

@section('content')

<div class="mb-4">

    <div class="d-flex justify-content-between align-items-center">

        <div>

            <h2 class="fw-bold">

                Kategori

            </h2>

            <p class="text-muted mb-0">

                Kelola kategori produk Rumah Makan Padang Karya Minang Baru

            </p>

        </div>

        <button
            type="button"
            class="btn btn-primary"
            id="btnAddCategory">

            <i class="fas fa-plus me-2"></i>

            Tambah Kategori

        </button>

    </div>

</div>

@include('categories.partials.table')

@include('categories.partials.form-modal')

@include('categories.partials.delete-modal')

@endsection

@push('scripts')
<script
    type="module"
    src="{{ asset('js/categories/category.js') }}">
</script>
@endpush