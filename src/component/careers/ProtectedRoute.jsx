import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, roles }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Redirect to sign-in if not authenticated
    return <Navigate to="/signin" replace />;
  }

  if (!roles.includes(user?.role)) {
    // Redirect to unauthorized page or homepage if role is not allowed
    return <Navigate to="/unauthorized" replace />;
  }

  return children; // Render the protected content
};

export default ProtectedRoute;
