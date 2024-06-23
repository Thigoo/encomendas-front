import { User } from "../User";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  user: User | null;
}
