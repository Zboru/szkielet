import axios from "axios";

export class httpManager {

    private static apiUrl: string = process.env.REACT_APP_API_URL || "";

    public static async get(path: string) {
        return axios.get(this.apiUrl + path);
    }
}