import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType } from "../../models/AuthContextType";
import { AuthProviderProps } from "../../models/AuthContextProps";
import { login as apiLogin, fetchUserData } from "../../services/api";
import { User } from "../../models/User";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();   

  const login = async (user: User) => {
    try {
      const { token, userData } = await apiLogin(user);   
      
      localStorage.setItem("token", token);
      setUser(userData);
      setIsAuthenticated(true);

      navigate("/home");      
    } catch (error) {
      console.log("Erro ao fazer login", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };
  
  useEffect(() => {
    const loadUserData = async() => {
      const token = localStorage.getItem("token");
      if(token) {
        try {
          const userData = await fetchUserData(token);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Erro ao carregar os dados do usuário: ', error);
          logout();
        }
      }
    }
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado com AuthProvider");
  }

  return context;
};
