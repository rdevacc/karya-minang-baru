<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReportRequest;
use App\Services\ReportService;

class ReportController extends Controller
{
    protected ReportService $reportService;

    public function __construct(
        ReportService $reportService
    ) {
        $this->reportService = $reportService;
    }

    public function index(
        ReportRequest $request
    ) {

        $startDate = $request->validated('start_date');

        $endDate = $request->validated('end_date');

        return response()->json([

            'summary' => $this->reportService
                ->getSummary(
                    $startDate,
                    $endDate
                ),

            'chart' => $this->reportService
                ->getChart(
                    $startDate,
                    $endDate
                ),

            'orders' => $this->reportService
                ->getOrders(
                    $startDate,
                    $endDate
                ),

        ]);

    }
}