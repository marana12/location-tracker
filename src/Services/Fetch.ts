import axios, { AxiosResponse } from "axios";
import { urlConfig } from "./config";

const BASE_URL = urlConfig.BASE_URL;

class HTTP {
    static get<T>(url: string): Promise<AxiosResponse<T>> {
        return axios.get<T>(BASE_URL + url);
    }
    static post<T>(url: string, options?: any): Promise<AxiosResponse<T>> {
        return axios.post<T>(BASE_URL + url, options);
    }
    static put<T>(url: string, options?: any): Promise<AxiosResponse<T>> {
        return axios.put<T>(BASE_URL + url, options);
    }
    static delete<T>(url: string): Promise<AxiosResponse<T>> {
        return axios.delete<T>(BASE_URL + url);
    }
}

export default HTTP;