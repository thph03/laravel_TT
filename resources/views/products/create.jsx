import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductCreate = () => {
  const [form, setForm] = useState({ name: '', description: '', price: 0, quantity: 0 });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', form);
      navigate('/products');
    } catch (err) {
      console.error('Error creating product:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Tên sản phẩm</label>
        <input type="text" name="name" className="form-control" required onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>Mô tả</label>
        <textarea name="description" className="form-control" onChange={handleChange}></textarea>
      </div>
      <div className="mb-3">
        <label>Giá</label>
        <input type="number" step="0.01" name="price" className="form-control" min="0" required onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>Số lượng</label>
        <input type="number" name="quantity" className="form-control" min="0" required onChange={handleChange} />
      </div>
      <button className="btn btn-success">Lưu</button>
      <button type="button" onClick={() => navigate('/products')} className="btn btn-outline-danger ms-2">Quay về</button>
    </form>
  );
};

export default ProductCreate;
