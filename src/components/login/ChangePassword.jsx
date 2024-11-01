import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    tempPass: '',
    newPass: '',
    confirmPass: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { email, tempPass, newPass, confirmPass } = formData;

    if (!email || !tempPass || !newPass || !confirmPass) {
      setError('All fields are required.');
      return;
    }

    if (newPass !== confirmPass) {
      setError('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await axios.put("http://localhost:6062/app/update", {
        email,
        tempPass,
        newPass,
        confirmPass
      });
      if (response.status === 200) {
        setMessage('Password changed successfully.');
        setError('');
        setTimeout(() => navigate('/login'), 5000);
      }
    } catch (err) {
      setError('Password change failed. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }}>
        <div className="card-body">
          <h3 className="text-center mb-4 fw-bold">Change Password</h3>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handlePasswordChange}>
            <div className="mb-3">
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
            <div className="mb-3">
              <label htmlFor="tempPass" className="form-label">Temporary Password</label>
              <input
                type="password"
                className="form-control"
                id="tempPass"
                name="tempPass"
                placeholder="Enter temporary password"
                value={formData.tempPass}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPass" className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                id="newPass"
                name="newPass"
                placeholder="Enter new password"
                value={formData.newPass}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPass" className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPass"
                name="confirmPass"
                placeholder="Confirm new password"
                value={formData.confirmPass}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 fw-semibold"
              style={{ padding: '10px' }}
            >
              Change Password
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

export default ChangePassword;
