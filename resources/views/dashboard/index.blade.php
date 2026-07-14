@extends('layouts.admin')

@section('title', 'Dashboard')

@section('content')

<div class="mb-4">

    <h2 class="fw-bold">
        Dashboard Admin
    </h2>

    <p class="text-muted mb-0">
        Rumah Makan Padang Karya Minang Baru
    </p>

</div>

@include('dashboard.partials.kpi')

<div class="mt-4">
    @include('dashboard.partials.chart')
</div>

<div class="mt-5">
    @include('dashboard.partials.transactions')
</div>

@include('dashboard.partials.invoice-modal')

@endsection

@push('scripts')
<script type="module" src="{{ asset('js/dashboard/dashboard.js') }}"></script>
@endpush