<div class="p-3">

    <div class="text-center mb-4">

        <div
            class="d-inline-flex align-items-center justify-content-center mb-3"
            style="width:150px;height:150px;">

            <img src="{{ asset('assets/logo-kmb.svg') }}" alt="logo-kmb" class="img-fluid">

        </div>

        <h5 class="fw-bold mb-1 text-muted">

            Admin Panel

        </h5>

    </div>

    <div class="list-group shadow-sm rounded-4">

        <div class="list-group-item bg-light fw-semibold text-uppercase small text-secondary">

            Dashboard

        </div>

        <a
            href="{{ route('admin.dashboard') }}"
            class="list-group-item list-group-item-action border-0 {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">

            <i class="fas fa-chart-line me-2"></i>

            Dashboard

        </a>

        <div class="list-group-item bg-light fw-semibold text-uppercase small text-secondary">

            Master Data

        </div>

        <a
            href="{{ route('admin.categories.index') }}"
            class="list-group-item list-group-item-action border-0 {{ request()->routeIs('admin.categories.*') ? 'active' : '' }}">

            <i class="fas fa-tags me-2"></i>

            Kategori

        </a>

        <a
            href="{{ route('admin.products.index') }}"
            class="list-group-item list-group-item-action border-0 {{ request()->routeIs('admin.products.*') ? 'active' : '' }}">

            <i class="fas fa-utensils me-2"></i>

            Produk

        </a>


        <div class="list-group-item bg-light fw-semibold text-uppercase small text-secondary">

            Transaksi

        </div>

        <a
            href="{{ route('admin.stocks.index') }}"
            class="list-group-item list-group-item-action border-0 {{ request()->routeIs('admin.stocks.*') ? 'active' : '' }}">

            <i class="fas fa-boxes-stacked me-2"></i>

            Stok

        </a>

        <a
            href="{{ route('admin.orders.index') }}"
            class="list-group-item list-group-item-action border-0 {{ request()->routeIs('admin.orders.*') ? 'active' : '' }}">

            <i class="fas fa-receipt me-2"></i>

            Order

        </a>

        <div class="list-group-item bg-light fw-semibold text-uppercase small text-secondary">

            Laporan

        </div>

        <a
            href="{{ route('admin.reports.index') }}"
            class="list-group-item list-group-item-action border-0 {{ request()->routeIs('admin.reports.*') ? 'active' : '' }}">

            <i class="fas fa-chart-column me-2"></i>

            Laporan

        </a>

    </div>

</div>