import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProductEdit = () => {
  const { id } = useParams(); // Lấy id trên URL /products/:id/edit
  const navigate = useNavigate();

  const [form, setForm] = useState(null); // Ban đầu form là null
  const [loading, setLoading] = useState(true);

  // Khi vào trang, fetch dữ liệu sản phẩm
  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => {
        setForm(res.data); // Cập nhật form = dữ liệu từ API
        setLoading(false);
      })
      .catch(err => {
        console.error('Lỗi khi load sản phẩm:', err);
        setLoading(false);
      });
  }, [id]);

  // Khi người dùng thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${id}`, form);
      navigate('/products'); // Sau khi update xong, quay về trang danh sách
    } catch (err) {
      console.error('Lỗi khi cập nhật sản phẩm:', err);
    }
  };

  // Nếu đang loading hoặc chưa có form thì show Đang tải...
  if (loading || !form) return <p>Đang tải dữ liệu sản phẩm...</p>;

  // Khi đã có dữ liệu, render form
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Tên sản phẩm</label>
        <input
          type="text"
          name="name"
          value={form.name || ''}
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Mô tả</label>
        <textarea
          name="description"
          className="form-control"
          value={form.description || ''}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label>Giá</label>
        <input
          type="number"
          name="price"
          step="0.01"
          min="0"
          className="form-control"
          value={form.price || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Số lượng</label>
        <input
          type="number"
          name="quantity"
          min="0"
          className="form-control"
          value={form.quantity || ''}
          onChange={handleChange}
          required
        />
      </div>
      <button className="btn btn-primary">Cập nhật</button>
      <button
        type="button"
        onClick={() => navigate('/products')}
        className="btn btn-outline-danger ms-2"
      >
        Quay về
      </button>
    </form>
  );
};

export default ProductEdit;
