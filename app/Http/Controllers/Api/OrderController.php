<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Product;
use App\Models\StockHistory;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with('orderItems.product')
            ->latest()
            ->get();

        return OrderResource::collection($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        return DB::transaction(function () use ($request) {

            $total = 0;
            $profit = 0;

            $order = Order::create([
                'invoice' => 'MKB-' . now()->format('YmdHis'),
                'total' => 0,
                'profit' => 0,
            ]);

            foreach ($request->items as $item) {

                $product = Product::findOrFail($item['product_id']);

                if ($product->stock < $item['qty']) {
                    abort(
                        422,
                        "Stok {$product->name} tidak mencukupi."
                    );
                }

                $subtotal = $product->selling_price * $item['qty'];

                $itemProfit = (
                    $product->selling_price -
                    $product->capital_price
                ) * $item['qty'];

                $order->orderItems()->create([
                    'product_id' => $product->id,
                    'qty' => $item['qty'],
                    'price' => $product->selling_price,
                    'subtotal' => $subtotal,
                ]);

                $product->decrement('stock', $item['qty']);

                StockHistory::create([
                    'product_id' => $product->id,
                    'type' => 'out',
                    'qty' => $item['qty'],
                    'note' => 'Penjualan ' . $order->invoice,
                ]);

                $total += $subtotal;

                $profit += $itemProfit;
            }

            $order->update([
                'total' => $total,
                'profit' => $profit,
            ]);

            return new OrderResource(
                $order->load('orderItems.product')
            );
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load('orderItems.product');

        return new OrderResource($order);
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
}
