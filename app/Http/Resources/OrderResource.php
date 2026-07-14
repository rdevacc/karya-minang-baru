<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'invoice' => $this->invoice,

            'total' => $this->total,

            'profit' => $this->profit,

            'total_items' => $this->orderItems->sum('qty'),

            'items' => $this->orderItems->map(function ($item) {

                return [

                    'id' => $item->id,

                    'product' => [

                        'id' => $item->product->id,

                        'name' => $item->product->name,

                    ],

                    'qty' => $item->qty,

                    'price' => $item->price,

                    'subtotal' => $item->subtotal,

                ];

            }),

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,

        ];
    }
}