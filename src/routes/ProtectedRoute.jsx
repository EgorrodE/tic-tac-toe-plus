import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/authProvider';

export const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  if (!currentUser.token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
