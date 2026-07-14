<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ],

            'name' => $this->name,

            'description' => $this->description,

            'capital_price' => $this->capital_price,

            'selling_price' => $this->selling_price,

            'stock' => $this->stock,

            'is_active' => $this->is_active,

            'image' => $this->image,

            'image_url' => $this->image
                ? asset('storage/' . $this->image)
                : null,

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}