import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType } from "../../models/AuthContextType";
import { AuthProviderProps } from "../../models/AuthContextProps";
import { useUser } from "../UserContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const {users} = useUser();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthorized");
    if(authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, password: string) => {
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth muste be used within an AuthProvider");
  }

  return context;
};
