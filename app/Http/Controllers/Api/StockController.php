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
                'note' => $request->note,
            ]);

        });

        return response()->json([
            'message' => 'Stock berhasil ditambahkan.'
        ]);
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
