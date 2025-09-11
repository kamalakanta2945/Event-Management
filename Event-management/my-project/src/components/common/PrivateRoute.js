import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../../utils/authUtils';

const PrivateRoute = ({ roles = [] }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const userRole = getUserRole();
  if (roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;