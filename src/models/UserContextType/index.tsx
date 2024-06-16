import { User } from "../User";

export interface UserContextType {
     users: User[];
     register: (user: User) => void;
}