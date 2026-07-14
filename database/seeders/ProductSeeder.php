<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'category' => 'Makanan',
                'name' => 'Rendang Daging',
                'description' => 'Rendang khas Minang.',
                'capital_price' => 30000,
                'selling_price' => 45000,
                'stock' => 50,
                'is_active' => true,
                'image' => 'products/rendang.jpg'
            ],
            [
                'category' => 'Makanan',
                'name' => 'Ayam Pop',
                'description' => 'Ayam Pop khas Padang.',
                'capital_price' => 18000,
                'selling_price' => 30000,
                'stock' => 40,
                'is_active' => true,
                'image' => 'products/ayam-pop.jpg'
            ],
            [
                'category' => 'Makanan',
                'name' => 'Dendeng Balado',
                'description' => 'Dendeng sapi dengan sambal balado.',
                'capital_price' => 28000,
                'selling_price' => 42000,
                'stock' => 35,
                'is_active' => true,
                'image' => 'products/dendeng-balado.jpg'
            ],
            [
                'category' => 'Minuman',
                'name' => 'Es Teh Manis',
                'description' => 'Es teh segar.',
                'capital_price' => 3000,
                'selling_price' => 8000,
                'stock' => 100,
                'is_active' => true,
                'image' => 'products/es-teh-manis.jpg'
            ],
            [
                'category' => 'Minuman',
                'name' => 'Es Jeruk',
                'description' => 'Jeruk peras segar.',
                'capital_price' => 5000,
                'selling_price' => 12000,
                'stock' => 80,
                'is_active' => true,
                'image' => 'products/es-jeruk.jpg'
            ],
            [
                'category' => 'Lauk Tambahan',
                'name' => 'Telur Dadar Padang',
                'description' => 'Telur dadar khas Padang.',
                'capital_price' => 6000,
                'selling_price' => 12000,
                'stock' => 60,
                'is_active' => true,
                'image' => 'products/telur-dadar.jpg'
            ],
            [
                'category' => 'Lauk Tambahan',
                'name' => 'Perkedel Kentang',
                'description' => 'Perkedel kentang gurih.',
                'capital_price' => 3000,
                'selling_price' => 7000,
                'stock' => 70,
                'is_active' => true,
                'image' => 'products/perkedel.jpg'
            ],
            [
                'category' => 'Paket',
                'name' => 'Paket Rendang',
                'description' => 'Nasi + Rendang + Sayur.',
                'capital_price' => 35000,
                'selling_price' => 55000,
                'stock' => 25,
                'is_active' => true,
                'image' => 'products/nasi-rendang.jpg'
            ],
        ];

        foreach ($products as $item) {

            $category = Category::where('name', $item['category'])->first();

            Product::firstOrCreate(
                [
                    'name' => $item['name'],
                ],
                [
                    'category_id' => $category->id,
                    'description' => $item['description'],
                    'capital_price' => $item['capital_price'],
                    'selling_price' => $item['selling_price'],
                    'stock' => $item['stock'],
                    'is_active' => $item['is_active'],
                    'image' => $item['image']
                ]
            );
        }
    }
}
