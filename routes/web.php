<?php

use App\Http\Controllers\ARController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Http\Controllers\Auth\LoginController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware('guest')->group(function () {

    Route::get('/login',[LoginController::class, 'create'])->name('login');

    Route::post('/login',[LoginController::class, 'store'])->name('login.store');

});

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {

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

Route::post('/logout',[LoginController::class, 'destroy'])->middleware('auth')->name('logout');

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