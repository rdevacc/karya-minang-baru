@extends('layouts.admin')

@section('title', 'Stok')

@section('content')

<div class="mb-4">

    <h2 class="fw-bold">

        Stok Produk

    </h2>

    <p class="text-muted mb-0">

        Kelola penambahan stok produk Rumah Makan Padang Karya Minang Baru.

    </p>

</div>

@include('stocks.partials.form')

<div class="mt-4">

    @include('stocks.partials.history-table')

</div>

@endsection

@push('scripts')
<script
    type="module"
    src="{{ asset('js/stocks/stock.js') }}">
</script>
@endpush