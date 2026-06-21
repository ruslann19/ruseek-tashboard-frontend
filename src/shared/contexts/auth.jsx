import { createContext, useEffect, useState } from "react";

import { authApi } from "@/shared/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await authApi.checkAuth();
      const result = response.status === 200 ? true : false;
      setIsAuthenticated(result);
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
