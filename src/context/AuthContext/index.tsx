import { createContext, useContext, useEffect, useState } from "react";
import { AuthProviderProps } from "../../models/AuthContextProps";
import { login as apiLogin, fetchUserData } from "../../services/api";
import { User } from "../../models/User";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => Promise<void>;
  logout: () => void;
}

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
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // toast.error('Email ou senha incorretos');
        throw new Error("Email ou senha incorretos");
      } else {
        throw new Error("Erro ao realizar login");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await fetchUserData(token);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Erro ao carregar os dados do usuário: ", error);
          logout();
        }
      }
    };
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
