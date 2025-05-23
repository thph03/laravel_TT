<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository implements IProductRepository
{
    public function getAll()
    {
        return Product::all();
    }

    public function create(array $data)
    {
        return Product::create($data);
    }

    public function find($id)
    {
        return Product::findOrFail($id);
    }

    public function update($id, array $data)
    {
        $product = Product::find($id);
        if (!$product) {
            return false;
        }
    
        $products = $product->update($data);
    
        return $products; // true nếu có thay đổi, false nếu không
    }
    

    public function delete($id)
    {
        return Product::destroy($id);
    }

    public function paginate($perPage)
    {
        return Product::paginate($perPage);
    }
}
