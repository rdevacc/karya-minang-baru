@extends('layouts.admin')

@section('title', 'Laporan')

@section('content')

<div class="mb-4">

    <h2 class="fw-bold">

        Laporan Penjualan

    </h2>

    <p class="text-muted mb-0">

        Rekap penjualan Rumah Makan Padang Karya Minang Baru.

    </p>

</div>

@include('reports.partials.filter')

<div class="mt-4">

    @include('reports.partials.summary')

</div>

<div class="mt-4">

    @include('reports.partials.chart')

</div>

<div class="mt-4">

    @include('reports.partials.table')

</div>

@endsection

@push('scripts')

<script
    type="module"
    src="{{ asset('js/reports/report.js') }}">
</script>

@endpush