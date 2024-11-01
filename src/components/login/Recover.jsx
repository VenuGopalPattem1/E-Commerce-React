import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RecoverAccount = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRecover = async (e) => {
    e.preventDefault();
    const { name, email } = formData;

    if (!name || !email) {
      setError('Please enter both name and email');
      return;
    }

    try {
      const response = await axios.post("http://localhost:6062/app/recover", {
        name,
        email
      });
      if (response.status === 200) {
        setMessage('Recovery email sent. Please check your inbox.');
        setError('');
        setTimeout(() => navigate('/login'), 5000);
      }
    } catch (err) {
      setError('Recovery failed. Please check the provided information.');
      setMessage('');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }}>
        <div className="card-body">
          <h3 className="text-center mb-4 fw-bold">Recover Password</h3>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleRecover}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 fw-semibold"
              style={{ padding: '10px' }}
            >
              Recover Account
            </button>
          </form>
          <div className="text-center mt-3">
            <small>Already have an account? <Link to={'/login'} style={{ color: '#007bff', textDecoration: 'none' }}>Login here</Link></small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoverAccount;
