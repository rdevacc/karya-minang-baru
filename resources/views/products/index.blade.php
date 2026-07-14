@extends('layouts.admin')

@section('title', 'Produk')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-4">

    <div>

        <h2 class="fw-bold mb-1">
            Produk
        </h2>

        <p class="text-muted mb-0">
            Manajemen Produk
        </p>

    </div>

    <button
        class="btn btn-primary"
        id="btnAddProduct">

        <i class="fas fa-plus me-1"></i>

        Tambah Produk

    </button>

</div>

@include('products.partials.table')

@include('products.partials.form-modal')

@include('products.partials.delete-modal')

@endsection

@push('scripts')

<script type="module" src="{{ asset('js/products/product.js') }}"></script>

@endpush