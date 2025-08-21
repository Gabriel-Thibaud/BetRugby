import  Box  from "@mui/material/Box";
import { JSX, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../datasources";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res: Response = await fetch(`${API_URL}/api/auth/check`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 200) {
          setIsAuthenticated(true);
        } else if (res.status === 401) {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) 
    return <Box>Loading...</Box>; // TODO: update the style

  if (!isAuthenticated) 
    return <Navigate to="/" replace />;

  return children;
}