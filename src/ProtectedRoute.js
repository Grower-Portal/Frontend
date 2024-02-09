import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isAuthenticated } from './services/auth';

const ProtectedRoutes = () => {
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/SignIn" />
  );
}

export default ProtectedRoutes;
