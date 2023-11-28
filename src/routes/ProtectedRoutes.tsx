import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/store/hooks";
import Loading from "../components/Loading";

interface ProtectedRouteProps {
  shouldAuth: boolean;
}

function ProtectedRoute({ shouldAuth }: ProtectedRouteProps) {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  // Assuming you have a variable called 'isAuth' that determines if the user is authenticated or not
  if (loading) {
    return <Loading />;
  } else {
    if (shouldAuth) {
      return isAuth ? <Outlet /> : <Navigate to="/login" />;
    } else if (!shouldAuth) {
      return !isAuth ? <Outlet /> : <Navigate to="/" />;
    }
  }
}

export default ProtectedRoute;
