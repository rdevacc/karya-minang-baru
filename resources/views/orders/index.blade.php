@extends('layouts.admin')

@section('title', 'Order')

@section('content')

<div class="mb-4">

    <div class="d-flex justify-content-between align-items-center">

        <div>

            <h2 class="fw-bold">

                Order

            </h2>

            <p class="text-muted mb-0">

                Kelola transaksi Rumah Makan Padang Karya Minang Baru.

            </p>

        </div>

    </div>

</div>

@include('orders.partials.table')

@include('orders.partials.detail-modal')

@endsection

@push('scripts')
<script
    type="module"
    src="{{ asset('js/orders/order.js') }}">
</script>
@endpush