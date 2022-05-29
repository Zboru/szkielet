import { Navigate, useLocation } from 'react-router-dom';
import Layout from './Layout';

export default function PrivateRoutes() {
  const location = useLocation();
  const authToken = localStorage.getItem('token');
  return authToken
    ? <Layout />
    : <Navigate to="/auth" replace state={{ from: location }} />;
}