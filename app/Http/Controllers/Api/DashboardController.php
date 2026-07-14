<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'total_products' => Product::count(),

            'total_transactions' => Order::count(),

            'total_sales' => Order::sum('total'),

            'total_profit' => Order::sum('profit'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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


    public function chart()
    {
        $rows = Order::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(total) as sales'),
                DB::raw('SUM(profit) as profit')
            )
            ->whereDate('created_at', '>=', now()->subDays(6))
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date')
            ->get()
            ->keyBy('date');

        $labels = [];
        $sales = [];
        $profits = [];

        for ($i = 6; $i >= 0; $i--) {

            $date = Carbon::now()->subDays($i);

            $key = $date->format('Y-m-d');

            $labels[] = $date->translatedFormat('d M');

            $sales[] = (float) ($rows[$key]->sales ?? 0);

            $profits[] = (float) ($rows[$key]->profit ?? 0);
        }

        return response()->json([
            'labels' => $labels,
            'sales' => $sales,
            'profit' => $profits,
        ]);
    }
}
