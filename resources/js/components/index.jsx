import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Chắc chưa?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        fetchProducts(); // Refresh list
      } catch (err) {
        console.error('Lỗi xóa sp:', err);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Link to="/products/create" className="btn btn-primary mb-3">+ Thêm sản phẩm</Link>
      <table className="table table-bordered">
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
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>
                {product.price === 0 ? (
                  <span className="text-success fw-bold">Miễn phí</span>
                ) : (
                  `${product.price} đ`
                )}
              </td>
              <td>{product.quantity}</td>
              <td>
                <Link to={`/products/edit/${product.id}`} className="btn btn-warning btn-sm">Sửa</Link>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(product.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
