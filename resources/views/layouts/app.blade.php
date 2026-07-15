<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>@yield('title', 'Rumah Makan Padang Karya Minang Baru')</title>

    <link rel="stylesheet" href="{{ asset('css/style.css') }}">

    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    @stack('styles')
</head>

<body>

    @include('layouts.frontend.navbar')

    <main>
        @yield('content')
    </main>

    @include('layouts.frontend.footer')

    @include('layouts.frontend.cart')

    @include('layouts.frontend.product-modal')

    @include('layouts.frontend.payment-modal')

    <!-- Back to Top Button -->
    <button class="back-to-top" id="backToTop">
        <i class="fas fa-arrow-up"></i>
    </button>

    <script type="module" src="{{ asset('js/app.js') }}"></script>

    @stack('scripts')

    

</body>

</html>
