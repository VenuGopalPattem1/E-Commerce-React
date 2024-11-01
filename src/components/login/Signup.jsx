import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    password: '',
    phno: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { email, name, password, phno } = userData;

    if (!email || !name || !phno) {
      setError('All fields are required.');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await axios.post("http://localhost:6062/app/save", {
        id: 0,
        email,
        name,
        phno
      });
      if (response.data) {
        setSuccessMessage(response.data || 'Signup successful!');
        setError('');
        // Navigate to login page after a short delay
        setTimeout(() => navigate('/login'), 5000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }}>
        <div className="card-body">
          <h3 className="text-center mb-4 fw-bold">Sign Up</h3>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter name"
                value={userData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter password"
                value={userData.password}
                onChange={handleChange}
                required
              />
            </div> */}
            <div className="mb-4">
              <label htmlFor="phno" className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phno"
                name="phno"
                placeholder="Enter phone number"
                value={userData.phno}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 fw-semibold"
              style={{ padding: '10px' }}
            >
              Sign Up
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

export default Signup;
