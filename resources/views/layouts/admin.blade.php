<!DOCTYPE html>
<html lang="id">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>

        @yield('title', 'Dashboard Admin')

    </title>

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
        rel="stylesheet">

    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    @stack('styles')

</head>

<body class="bg-light">

    @include('layouts.admin.navbar')

    <div class="container-fluid">

        <div class="row">

            <aside class="col-lg-2 col-md-3 bg-white border-end min-vh-100 p-0">

                @include('layouts.admin.sidebar')

            </aside>

            <main class="col-lg-10 col-md-9">

                <div class="p-4">

                    @yield('content')

                </div>

            </main>

        </div>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    @stack('scripts')

</body>

</html>