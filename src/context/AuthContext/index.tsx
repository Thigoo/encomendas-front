import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType } from "../../models/AuthContextType";
import { AuthProviderProps } from "../../models/AuthContextProps";
import { login as apiLogin, fetChUserData } from "../../services/api";
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
      fetChUserData(JSON.parse(token))
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
      // const {name, password} = user;
      const { token, userData } = await apiLogin(user);      
      
      setIsAuthenticated(true);
      setUser(userData);

      localStorage.setItem("token", JSON.stringify(token));
      navigate("/dashboard");
      console.log("Login bem sucedido, token: ", token);
      console.log("Login bem sucedido, dados do usuário: ", userData);
    } catch (error) {
      console.log("Erro ao fazer login", error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
