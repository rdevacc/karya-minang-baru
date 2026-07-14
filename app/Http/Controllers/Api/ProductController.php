<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductService;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class ProductController extends Controller
{

    protected ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category')
            ->latest()
            ->get();

        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {

            $data['image'] = $this->productService->uploadImage(
                $request->file('image')
            );

        }

        $product = Product::create($data);

        $product->load('category');

        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load('category');

        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateProductRequest $request,
        Product $product
    ) {
        $data = $request->validated();

        if ($request->hasFile('image')) {

            $this->productService->deleteImage(
                $product->image
            );

            $data['image'] = $this->productService->uploadImage(
                $request->file('image')
            );

        }

        $product->update($data);

        $product->load('category');

        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $this->productService->deleteImage(
            $product->image
        );

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully.',
        ]);
    }


    public function qrcode(Product $product)
    {
        $url = asset('storage/' . $product->image);

        return response(
            \SimpleSoftwareIO\QrCode\Facades\QrCode::format('svg')
                ->size(300)
                ->generate($url),
            200,
            [
                'Content-Type' => 'image/svg+xml',
            ]
        );
    }
}