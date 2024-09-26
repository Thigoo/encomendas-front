import { createContext, useState } from "react";
import { UserContextType } from "../../models/UserContextType";
import { UserProviderProps } from "../../models/UserProviderProps";
import { User } from "../../models/User";
import { register as apiRegister } from "../../services/api";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const register = async (user: User) => {
    try {
      const newUser = await apiRegister(user);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error("Erro ao registrar usuário: ", error);
      
    }
  };

  return (
    <UserContext.Provider value={{ users, register }}>
      {children}
    </UserContext.Provider>
  );
};
