import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './services/auth';

function ProtectedRoute({ element }) {
  return isAuthenticated() ? (
    <Route element={element} />
  ) : (
    <Navigate to="/SignIn" />
  );
}

export default ProtectedRoute;
