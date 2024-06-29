import axios, { AxiosError } from "axios";
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

const MAX_RETRY_ATTEMPTS = 3;
const BASE_BACKOFF_TIME = 1000;

export const fetchUserData = async (token: string, retryCount: number = 0): Promise<User> => {
  try {
    const response = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 429 && retryCount < MAX_RETRY_ATTEMPTS) {
        const backoffTime = Math.pow(2, retryCount) * BASE_BACKOFF_TIME; // Backoff exponencial
        await new Promise(resolve => setTimeout(resolve, backoffTime));
        return fetchUserData(token, retryCount + 1); // Tentativa de reenvio com contagem atualizada
      }
      throw axiosError; // Lança o erro se não for possível reenviar a requisição
    }
    throw error; // Lança o erro se não for um erro de Axios
  }
};
