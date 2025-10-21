import  Box  from "@mui/material/Box";
import { JSX, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../datasources";

interface ProtectedRouteProps {
  children: JSX.Element;
  adminPage?: boolean
}

export default function ProtectedRoute({ children, adminPage = false }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (adminPage)
      checkAdmin();
    else
      checkAuth();
  }, []);

  async function checkAuth(){
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


  // also check for auth of course
  async function checkAdmin(){
    try {
        const res: Response = await fetch(`${API_URL}/api/auth/check-admin`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 200) {
          setIsAuthenticated(true);
          setIsAdmin(true);
        } else if (res.status === 403) {
          setIsAuthenticated(true);
          setIsAdmin(false);
        } else {
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) 
    return <Box>Loading...</Box>; // TODO: update the style

  if (!isAuthenticated) 
    return <Navigate to="/" replace />;

  if (!isAdmin && adminPage)
    return <Navigate to="/home" replace />;

  return children;
}