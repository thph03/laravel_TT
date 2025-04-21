@extends('products.layouts.layoutAdmin')
@section('content')
    <form action="{{ route('products.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label>Tên sản phẩm</label>
            <input type="text" name="name" class="form-control" required>
        </div>
        <div class="mb-3">
            <label>Mô tả</label>
            <textarea name="description" class="form-control"></textarea>
        </div>
        <div class="mb-3">
            <label>Giá</label>
            <input type="number" step="0.01" name="price" class="form-control" required min="0">
        </div>
        <div class="mb-3">
            <label>Số lượng</label>
            <input type="number" name="quantity" class="form-control" required min="0">
        </div>
        <button class="btn btn-success">Lưu</button>
        <a href="{{ route('products.index') }}" class="btn btn-outline-danger">Quay về</a>
    </form>
@endsection