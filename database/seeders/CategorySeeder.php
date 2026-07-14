<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Makanan',
                'is_active' => true,
            ],
            [
                'name' => 'Minuman',
                'is_active' => true,
            ],
            [
                'name' => 'Lauk Tambahan',
                'is_active' => true,
            ],
            [
                'name' => 'Paket',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate([
                'name' => $category['name'],
                'is_active' => $category['is_active'],
            ]);
        }
    
    }
}
