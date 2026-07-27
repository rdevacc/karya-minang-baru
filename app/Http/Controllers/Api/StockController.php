<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStockRequest;
use App\Models\Product;
use App\Models\StockHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStockRequest $request)
    {
        DB::transaction(function () use ($request) {

            $product = Product::findOrFail(
                $request->product_id
            );

            $product->increment(
                'stock',
                $request->qty
            );

            StockHistory::create([
                'product_id' => $product->id,
                'type' => 'in',
                'qty' => $request->qty,
                'description' => $request->description,
            ]);

        });

        return response()->json([
            'message' => 'Stock berhasil ditambahkan.'
        ]);
    }

    
    public function stockOut(StoreStockRequest $request)
    {
        return DB::transaction(function () use ($request) {

            $product = Product::lockForUpdate()
                ->findOrFail($request->product_id);

            if ($product->stock < $request->qty) {

                return response()->json([
                    'message' => 'Stok produk tidak mencukupi.',
                ], 422);
            }

            $product->decrement(
                'stock',
                $request->qty
            );

            StockHistory::create([
                'product_id' => $product->id,
                'type' => 'out',
                'qty' => $request->qty,
                'description' => $request->description
                    ?? 'Pengurangan stok manual',
            ]);

            return response()->json([
                'message' => 'Stok berhasil dikurangi.',
                'data' => [
                    'product_id' => $product->id,
                    'stock' => $product->fresh()->stock,
                ],
            ]);
        });
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function history()
    {
        $histories = StockHistory::with('product')
            ->latest()
            ->get();

        return response()->json($histories);
    }
}
