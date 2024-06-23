import axios from "axios";
import { User } from "../models/User";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

interface LoginResponse {
  token: string;
  userData: User;
}

export const login = async (user: User): Promise<LoginResponse> => {
  const { email, password } = user;
  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  
  return response.data;
};

export const register = async (user: User) => {
  const { name, email, password } = user;
  const response = await api.post("/auth/register", { name, email, password });
  return response.data;
};

export const fetChUserData = async (token: string): Promise<User> => {
  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
