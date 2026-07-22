import { LoginCredentials, LoginResponse } from "@/types";
import api from "./axios";

export const authApi={
    login: async (credentials : LoginCredentials ) :Promise<LoginResponse> =>{
        const response = await api.post<LoginResponse >('/auth/login', credentials);
        return response.data;
    }
}