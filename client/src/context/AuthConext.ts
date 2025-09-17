import { createContext, useContext } from 'react';
import type { AuthContextType } from '../types/types';

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthProvider missing');
  return context;
};
