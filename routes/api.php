<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\StockController;
use App\Http\Controllers\Api\ReportController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {

    Route::get(
        'dashboard',
        [DashboardController::class, 'index']
    );
    
    Route::apiResource('categories', CategoryController::class);
    
    Route::get('/dashboard/chart', [DashboardController::class, 'chart']);

    Route::apiResource('products', ProductController::class);
    Route::get('products/{product}/qrcode', [ProductController::class, 'qrcode']);
    
    Route::get('orders', [OrderController::class, 'index']);
    Route::post('orders', [OrderController::class, 'store']);
    Route::get('orders/{order}', [OrderController::class, 'show']);

    Route::get('stocks/history',[StockController::class, 'history']);
    Route::post('stocks/in', [StockController::class, 'store']);

    Route::get('reports',[ReportController::class, 'index']
);

});