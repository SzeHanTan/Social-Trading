import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  children: React.ReactNode;
  requiresProfile?: boolean;
}

export const ProtectedRoute: React.FC<Props> = ({ children, requiresProfile = false }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiresProfile && !user?.hasProfile) {
    return <Navigate to="/community" state={{ step: 'profile' }} replace />;
  }

  return <>{children}</>;
}; 