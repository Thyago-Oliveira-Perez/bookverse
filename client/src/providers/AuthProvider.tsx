import React, { ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { useProvideAuth } from "../hooks/useProvideAuth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
