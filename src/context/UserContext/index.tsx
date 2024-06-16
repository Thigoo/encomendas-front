import { createContext, useContext, useEffect, useState } from "react";
import { UserContextType } from "../../models/UserContextType";
import { UserProviderProps } from "../../models/UserProviderProps";
import { User } from "../../models/User";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const register = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <UserContext.Provider value={{ users, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
     const context = useContext(UserContext);

     if(!context) {
          throw new Error("useUser must be used within a UserProvider");
     }
     return context;
};
