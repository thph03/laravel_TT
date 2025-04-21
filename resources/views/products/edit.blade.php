@extends('products.layouts.layoutAdmin')
@section('content')
    <form action="{{ route('products.update', $product) }}" method="POST">
        @csrf @method('PUT')
        <div class="mb-3">
            <label>Tên sản phẩm</label>
            <input type="text" name="name" class="form-control" value="{{ $product->name }}" required>
        </div>
        <div class="mb-3">
            <label>Mô tả</label>
            <textarea name="description" class="form-control">{{ $product->description }}</textarea>
        </div>
        <div class="mb-3">
            <label>Giá</label>
            <input type="number" step="0.01" name="price" class="form-control" value="{{ $product->price }}" required min="0">  
        </div>
        <div class="mb-3">
            <label>Số lượng</label>
            <input type="number" name="quantity" class="form-control" value="{{ $product->quantity }}" required min="0">
        </div>
        <button class="btn btn-primary">Cập nhật</button>
        <a href="{{ route('products.index') }}" class="btn btn-outline-danger">Quay về</a>
    </form>
@endsection