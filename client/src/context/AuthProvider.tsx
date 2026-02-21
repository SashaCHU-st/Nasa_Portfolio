import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { checkAuthRequest, logoutRequest } from "../api/apiSession";
// import type{ AuthContextType } from '../types/types';

// export const AuthContext = createContext<AuthContextType | null>(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('AuthProvider missing');
//   return context;
// };

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = () => {
    setIsAuthorized(true);
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setIsAuthorized(false);
      localStorage.removeItem("searchQuery");
      localStorage.removeItem("searchResults");
      localStorage.removeItem("currentPage");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // if(!isAuthorized)
        // {
        //   return;
        // }
        const isAuth = await checkAuthRequest();
        setIsAuthorized(isAuth);
      } catch (err) {
        console.error(err);
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthorized, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
