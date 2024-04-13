import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  canActivate,
  redirectPath = '/',
  component: Component
}) => {
  if (!canActivate) {
    return <Navigate to={redirectPath} replace />
  }
  return <Component />;
}

export default ProtectedRoute;