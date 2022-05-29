import axios from "axios";

axios.interceptors.request.use(
    config => {
        const { origin } = new URL(config.url || "");
        const allowedOrigins = [process.env.REACT_APP_API_URL];
        const token = localStorage.getItem('token');
        if (allowedOrigins.includes(origin)) {
            config.headers!.authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export class httpManager {

    private static apiUrl: string = process.env.REACT_APP_API_URL || "";

    public static async get(path: string) {
        return axios.get(this.apiUrl + path);
    }

    public static async post(path: string, payload: unknown) {
        return axios.post(this.apiUrl + path, payload);
    }

    public static async put(path: string, payload: unknown) {
        return axios.put(this.apiUrl + path, payload);
    }

    public static async delete(path: string) {
        return axios.delete(this.apiUrl + path);
    }
}