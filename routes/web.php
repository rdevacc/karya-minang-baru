<?php

use App\Http\Controllers\ARController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::view('/dashboard', 'dashboard.index')
            ->name('dashboard');

        Route::view('/products', 'products.index')
            ->name('products.index');

        Route::view('/categories', 'categories.index')
            ->name('categories.index');

        Route::view('/stocks', 'stocks.index')
            ->name('stocks.index');

        Route::view('/orders', 'orders.index')
            ->name('orders.index');

        Route::view('/reports', 'reports.index')
            ->name('reports.index');

    });
    
Route::view('/thank-you', 'thank-you.index')->name('thank-you');

// Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

Route::get('/generate-thank-you-qr', function () {

    $svg = QrCode::format('svg')
        ->size(250)
        ->generate(url('/thank-you'));

    File::put(
        public_path('assets/thank-you-qr.svg'),
        $svg
    );

    return 'QR berhasil dibuat.';
});