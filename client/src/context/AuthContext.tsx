import { createContext } from "react";
import Keycloak from "keycloak-js";

interface AuthContextType {
  authenticated: boolean | null;
  user: any;
  keycloak: Keycloak;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
