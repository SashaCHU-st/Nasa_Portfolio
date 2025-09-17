import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthConext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthorized, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? <>{children}</> : <Navigate to="/auth" />;
};

export default PrivateRoute;
