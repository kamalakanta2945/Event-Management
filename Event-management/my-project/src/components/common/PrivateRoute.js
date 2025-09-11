import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../../utils/authUtils';

// Supports both wrapper usage: <PrivateRoute><Page/></PrivateRoute>
// and route-outlet usage: <Route element={<PrivateRoute roles={[...]}/>}>...
const PrivateRoute = ({ roles = [], children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const userRole = getUserRole();
  if (roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  // If children are provided, render them (wrapper pattern). Otherwise, render Outlet (nested routes pattern)
  return children ? children : <Outlet />;
};

export default PrivateRoute;