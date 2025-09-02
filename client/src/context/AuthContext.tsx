import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

const BACK_API = import.meta.env.VITE_BACKEND_API;

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async () => {
    setIsAuthorized(true);
  };

  const logout = async () => {
    setIsAuthorized(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${BACK_API}/me`, {
          credentials: "include",
        });
        if (res.ok) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
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
