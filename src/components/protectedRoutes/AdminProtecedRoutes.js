
// components/AdminProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtecedRoutes = ({ children }) => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const isAdmin = userDetails && userDetails.role === 'admin';

  return isAdmin ? children : <Navigate to="/" />;
};

export default AdminProtecedRoutes;
