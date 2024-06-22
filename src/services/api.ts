import axios from "axios";
import { User } from "../models/User";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

interface LoginResponse {
  token: string;
}

export const login = async (user: User): Promise<LoginResponse> => {
  const { name, password } = user;
  const response = await api.post<LoginResponse>("/login", {
    name,
    password,
  });
  return response.data;
};

export const register = async (user: User) => {
  const { name, email, password } = user;
  const response = await api.post("/auth/register", { name, email, password });
  return response.data;
};

export const fetchUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
