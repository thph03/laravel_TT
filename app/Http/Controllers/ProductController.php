<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\ProductRepository;
use App\Models\Product;

class ProductController extends Controller
{
    protected $productRepo;

    public function __construct(ProductRepository $productRepo)
    {
        $this->productRepo = $productRepo;
    }

    public function index()
    {
        // $products = $this->productRepo->getAll();
        // $products = $this->productRepo->paginate(10);
        // return view('products.index', compact('products'));

        $products = Product::all();
        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('products.create');
    }

    public function store(Request $request)
    {
        $data = $request->only(['name', 'description', 'price', 'quantity']);
        $product = $this->productRepo->create($data);

        // return redirect()->route('products.index')->with('success', 'Thêm ngon lành');

        return response()->json(
            [
                'message' => 'Thêm ngon lành',
                'product' => $product
            ],
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $data = $request->only(['name', 'description', 'price', 'quantity']);
        $update = $this->productRepo->update($id, $data);

        // return redirect()->route('products.index')->with('success', 'Đã cập nhật rồi nha');
        if (!$update) {
            return response()->json(
                [
                    'message' => 'Không tìm thấy sản phẩm hoặc cập nhật fail'
                ],
                404
            );
        }
        return response()->json(
            [
                'message' => 'Đã cập nhật rồi nha'
            ]
        );
    }

    public function edit($id)
    {
        $product = $this->productRepo->find($id);
        if (!$product) {
            return response()->json(['message' => 'Không thấy sp nào hết:<'], 404);
        }
        // return view('products.edit', compact('product'));
        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $delete=$this->productRepo->delete($id);
        if(!$delete) {
            return response()->json(['message' => 'Không thấy sp nào hết:<'], 400);
        }
        // return redirect()->route('products.index')->with('success', 'Mất tiêu rồi');
        return response()->json(
            [
                'message' => 'Mất tiêu òi'
            ]
        );
    }
}
