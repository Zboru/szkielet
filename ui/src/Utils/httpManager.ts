import axios from "axios";

export class httpManager {

    private static apiUrl: string = process.env.REACT_APP_API_URL || "";

    public static async get(path: string) {
        return axios.get(this.apiUrl + path);
    }

    public static async post(path: string, payload: unknown) {
        return axios.post(this.apiUrl + path, payload);
    }

    public static async delete(path: string) {
        return axios.delete(this.apiUrl + path);
    }
}