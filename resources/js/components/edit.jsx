import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProductEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', description: '', price: 0, quantity: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error('Error loading product:', err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${id}`, form);
      navigate('/products');
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Tên sản phẩm</label>
        <input type="text" name="name" value={form.name} className="form-control" required onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>Mô tả</label>
        <textarea name="description" className="form-control" value={form.description} onChange={handleChange}></textarea>
      </div>
      <div className="mb-3">
        <label>Giá</label>
        <input type="number" name="price" step="0.01" min="0" className="form-control" value={form.price} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Số lượng</label>
        <input type="number" name="quantity" min="0" className="form-control" value={form.quantity} onChange={handleChange} required />
      </div>
      <button className="btn btn-primary">Cập nhật</button>
      <button type="button" onClick={() => navigate('/products')} className="btn btn-outline-danger ms-2">Quay về</button>
    </form>
  );
};

export default ProductEdit;
