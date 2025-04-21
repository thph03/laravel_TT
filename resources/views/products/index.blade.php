@extends('products.layouts.layoutAdmin')
@section('content')
<a href="{{ route('products.create') }}" class="btn btn-primary mb-3">+ Thêm sản phẩm</a>
<table class="table table-bordered">
    <thead>
        <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Hành động</th>
        </tr>
    </thead>
    <tbody>
        @foreach($products as $product)
        <tr>
            <td>{{ $product->name }}</td>
            <td>{{ $product->description }}</td>
            <td>
                @if ($product->price == 0)
                <span class="text-success fw-bold">Miễn phí</span>
                @else
                {{ $product->price }} đ
                @endif
            </td>
            <td>{{ $product->quantity }}</td>
            <td>
                <a href="{{ route('products.edit', $product) }}" class="btn btn-warning btn-sm">Sửa</a>
                <form action="{{ route('products.destroy', $product) }}" method="POST" class="d-inline">
                    @csrf @method('DELETE')
                    <button class="btn btn-danger btn-sm" onclick="return confirm('Chắc chưa?')">Xóa</button>
                </form>
            </td>
        </tr>
        @endforeach

        <div class="pagination">
            {{ $products->links('pagination::bootstrap-5') }}
        </div>
    </tbody>
</table>

@endsection