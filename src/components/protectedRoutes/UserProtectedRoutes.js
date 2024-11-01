
import React from 'react';
import { Navigate } from 'react-router-dom';

const UserProtectedRoutes = ({ children }) => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const isAuthenticated = userDetails && userDetails.role;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default UserProtectedRoutes;
