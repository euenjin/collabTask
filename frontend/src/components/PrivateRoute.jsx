import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');   //Check if token exists in localStorage

  if (!token) {
    // No token found, redirect to SignIn page
    return <Navigate to="/signin" replace />;
  }

  // Token exists, render the children components
  return children;
};

export default PrivateRoute;
