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
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(JSON.parse(token))
        .then((userData) => {
          setUser(userData);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do usuário: ", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (user: User) => {
    try {
      const { token, userData } = await apiLogin(user);      
      
      localStorage.setItem("token", token);
      setUser(userData);
      setIsAuthenticated(true);

      navigate("/dashboard");

      setTimeout(() => {
        console.log("Login bem sucedido, token: ", token);
        console.log("Login bem sucedido, dados do usuário: ", userData);
      }, 1000);
      
    } catch (error) {
      console.log("Erro ao fazer login", error);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
  };
  
  const loadUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token não encontrado');
    }
  
    try {
      const userData = await fetchUserData(token);
      setUser(userData);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      throw error;
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, loadUserData }}>
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
