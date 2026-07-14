<!DOCTYPE html>
<html lang="id">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>

        Login Admin

    </title>

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
        rel="stylesheet">

    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

</head>

<body class="bg-light">

<div class="container">

    <div class="row justify-content-center align-items-center min-vh-100">

        <div class="col-lg-4 col-md-6">

            <div class="card border-0 shadow-lg">

                <div class="card-body p-5">

                    <div class="text-center mb-4">

                        <div
                            class="text-white d-inline-flex justify-content-center align-items-center"
                            style="width:200px;height:200px;">

                            <img src="{{ asset('assets/logo-kmb.svg') }}" alt="logo-kmb" class="img-fluid">

                        </div>

                        <h3 class="fw-bold mt-4 mb-1">

                            Rumah Makan Padang

                        </h3>

                        <h5 class="text-danger">

                            Karya Minang Baru

                        </h5>

                        <p class="text-muted">

                            Login Administrator

                        </p>

                    </div>

                    @if(session('success'))

                        <div class="alert alert-success">

                            {{ session('success') }}

                        </div>

                    @endif

                    @if($errors->any())

                        <div class="alert alert-danger">

                            {{ $errors->first() }}

                        </div>

                    @endif

                    <form
                        method="POST"
                        action="{{ route('login') }}">

                        @csrf

                        <div class="mb-3">

                            <label class="form-label">

                                Email

                            </label>

                            <input
                                type="email"
                                name="email"
                                class="form-control"
                                value="{{ old('email') }}"
                                required
                                autofocus>

                        </div>

                        <div class="mb-4">

                            <label class="form-label">

                                Password

                            </label>

                            <input
                                type="password"
                                name="password"
                                class="form-control"
                                required>

                        </div>

                        <div class="form-check mb-4">

                            <input
                                class="form-check-input"
                                type="checkbox"
                                id="remember"
                                name="remember">

                            <label
                                class="form-check-label"
                                for="remember">

                                Ingat Saya

                            </label>

                        </div>

                        <button
                            class="btn btn-danger w-100">

                            <i class="fas fa-right-to-bracket me-2"></i>

                            Login

                        </button>

                    </form>

                    <hr>

                    <div class="text-center">

                        <a
                            href="{{ route('home') }}"
                            class="text-decoration-none">

                            <i class="fas fa-arrow-left me-2"></i>

                            Kembali ke Beranda

                        </a>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>

</body>

</html>