import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const api = axios.create({
    // Connexion ciblée sur votre API Spring Boot
    baseURL: "http://192.168.11.225:8080/api", 
    headers: {
         "Content-Type": "application/json",
         "Accept": "application/json",
    },
    timeout: 10000, 
});

api.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem("user_token");
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Erreur d'accès au stockage local :", error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
