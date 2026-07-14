<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class ReportService
{
    protected function applyDateFilter($query, ?string $startDate, ?string $endDate)
    {
        if ($startDate) {

            $query->whereDate(
                'created_at',
                '>=',
                Carbon::parse($startDate)
            );

        }

        if ($endDate) {

            $query->whereDate(
                'created_at',
                '<=',
                Carbon::parse($endDate)
            );

        }

        return $query;
    }

    public function getSummary(
        ?string $startDate,
        ?string $endDate
    ): array {

        $orders = $this->applyDateFilter(
            Order::query(),
            $startDate,
            $endDate
        );

        $items = $this->applyDateFilter(
            OrderItem::query(),
            $startDate,
            $endDate
        );

        return [

            'total_sales' => (float) $orders->sum('total'),

            'total_profit' => (float) $orders->sum('profit'),

            'total_orders' => (int) $orders->count(),

            'total_items' => (int) $items->sum('qty'),

        ];

    }

    public function getChart(
        ?string $startDate,
        ?string $endDate
    ): Collection {

        return $this->applyDateFilter(
            Order::query(),
            $startDate,
            $endDate
        )
            ->selectRaw("
                DATE(created_at) as date,
                SUM(total) as sales,
                SUM(profit) as profit
            ")
            ->groupByRaw("DATE(created_at)")
            ->orderBy("date")
            ->get();

    }

    public function getOrders(
        ?string $startDate,
        ?string $endDate
    ): Collection {

        return $this->applyDateFilter(
            Order::query(),
            $startDate,
            $endDate
        )
            ->latest()
            ->get([
                'id',
                'invoice',
                'total',
                'profit',
                'created_at',
            ]);

    }
}