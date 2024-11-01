// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
// import { setUser } from '../redux/userSlice'; // Import setUser action
import { useNavigate, Link } from 'react-router-dom';
import { setUser } from '../store/userSlice';
import API from '../../const/Api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get dispatch function

 const handleLogin = async (e) => {
  e.preventDefault();
  if (!email || !password) {
    setError('Please enter both email and password');
    return;
  }

  // // Create the payload as a JSON string
  // const payload = JSON.stringify({
  //   email: email,
  //   password: password,
  // });

  try {
    const response = await axios.post(
      `${API}auth/token`,
    {
      email,
      password
    }
    );

    if (response.status === 200) {
      const userRole = email === 'admin@gmail.com' ? 'admin' : 'user';

      // Store user details in local storage
      localStorage.setItem('userDetails', JSON.stringify({
        email: email,
        role: userRole,
        user: true,
      }));

      localStorage.setItem("status",JSON.stringify({
        user:true
      }))

      localStorage.setItem('jwt', response.data.token);

      // Dispatch the setUser action to update the user state in Redux
      dispatch(setUser({ email, role: userRole }));

      setSuccess(response.data || 'Login successful!');
      // Redirect based on user role
      if (userRole === 'admin') {
        navigate('/orderDetails');
      } else {
        navigate('/');
      }
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed. Please try again.');
    setSuccess('');
  }
};

  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }}>
        <div className="card-body">
          <h3 className="text-center mb-4 fw-bold">Login</h3>
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 fw-semibold"
              style={{ padding: '10px' }}
            >
              Login
            </button>
          </form>
          <div className="text-center mt-3">
            <small>Don't have an account? <Link to={'/signup'} style={{ color: '#007bff', textDecoration: 'none' }}>Register here</Link></small>
            <div className='d-flex justify-content-between mt-2'>
              <small><Link to={'/recover'} style={{ color: '#007bff', textDecoration: 'none' }}>Recover Password</Link></small>
              <small><Link to={'/changePass'} style={{ color: '#007bff', textDecoration: 'none' }}>Update Password</Link></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
