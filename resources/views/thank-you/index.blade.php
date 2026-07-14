<!DOCTYPE html>
<html lang="id">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Terima Kasih | Minang Karya Baru</title>

    <link rel="stylesheet"
          href="{{ asset('css/style.css') }}">

</head>

<body class="thank-you-page">

    <main class="thank-you-container">

        <img
            src="{{ asset('assets/2.png') }}"
            alt="Maskot"
            class="thank-you-maskot">

        <h1 class="thank-you-title">
            Terima Kasih 🙏
        </h1>

        <p class="thank-you-text">
            Terima kasih telah berkunjung ke
            <strong>Rumah Makan Karya Minang Baru</strong>.
        </p>

        <p class="thank-you-text">
            Sampai jumpa lagi dan semoga harimu menyenangkan 😊
        </p>

        <a
            href="{{ route('home') }}"
            class="thank-you-button">

            <i class="fas fa-home"></i>

            Kembali ke Beranda

        </a>

    </main>

</body>

</html>