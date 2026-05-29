import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();
  
    if (isLoading) {
      return <div>Cargando...</div>; // or a spinner
    }
  
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
};

export const GuestRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuth();
  
    if (isLoading) return <div>Cargando...</div>;
  
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
  
    return children;
};