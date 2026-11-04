import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = ({ children, roles }) => {
  const { user, token } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" replace />;
  if (roles && user && !roles.includes(user.role)) {
    return (
      <div className="p-8 text-center text-red-600 font-bold bg-white rounded-xl border m-6">
        Security Error: Terminated structural path sequence clearance. Authorization level failed.
      </div>
    );
  }
  return children;
};