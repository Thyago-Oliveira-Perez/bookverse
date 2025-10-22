import { useState, useEffect, useRef } from "react";
import keycloak from "../lib/keycloak";

export const useProvideAuth = () => {
  const isRun = useRef(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const initAuth = async () => {
      try {
        const auth = await keycloak.init({ onLoad: "check-sso" });
        setAuthenticated(auth);
        if (auth) {
          const userInfo = await keycloak.loadUserInfo();
          setUser(userInfo);
        }
      } catch (error) {
        console.error("Keycloak initialization failed:", error);
        setAuthenticated(false);
      }
    };
    initAuth();
  }, []);

  const logout = () => {
    keycloak.logout({ redirectUri: window.location.origin });
  };

  return { authenticated, user, keycloak, logout };
};
