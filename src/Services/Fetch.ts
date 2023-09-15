import axios, { AxiosResponse } from "axios";
import { urlConfig } from "./config";

const BASE_URL = urlConfig.BASE_URL;
const headers = { "clientTimeZone": Intl.DateTimeFormat().resolvedOptions().timeZone }

class HTTP {
    static get<T>(url: string): Promise<AxiosResponse<T>> {
        return axios.get<T>(BASE_URL + url, { headers });
    }
    static post<T>(url: string, options?: any): Promise<AxiosResponse<T>> {
        return axios.post<T>(BASE_URL + url, options, { headers });
    }
    static put<T>(url: string, options?: any): Promise<AxiosResponse<T>> {
        return axios.put<T>(BASE_URL + url, options, { headers });
    }
    static delete<T>(url: string): Promise<AxiosResponse<T>> {
        return axios.delete<T>(BASE_URL + url, { headers });
    }
}

export default HTTP;