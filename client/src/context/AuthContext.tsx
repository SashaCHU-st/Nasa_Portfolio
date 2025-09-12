import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext<any>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthProvider missing");
  return context;
};

const BACK_API = import.meta.env.VITE_BACKEND_API;

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = () => {
    setIsAuthorized(true)
  };

  const logout = async () => {
    try {
      await fetch(`${BACK_API}/logout`, {
        method: "POST",
        credentials: "include",
      });
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
        const res = await fetch(`${BACK_API}/me`, {
          credentials: "include",
        });
        setIsAuthorized(res.ok);
      } catch (err) {
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
