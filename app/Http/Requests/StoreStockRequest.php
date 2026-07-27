<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStockRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_id' => [
                'required',
                'exists:products,id',
            ],

            'qty' => [
                'required',
                'integer',
                'not_in:0',
            ],

            'description' => [
                'nullable',
                'string',
                'max:255',
            ],
        ];
    }
}