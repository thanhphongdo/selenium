import Axios, { AxiosResponse } from 'axios';

export class BaseAxios {
    headers: any;
    constructor() {
        this.headers = {};
    }
    get<T>(url: string, headers?: any): Promise<AxiosResponse<T>> {
        return Axios.get(url, { headers: headers || this.headers }).then((data: AxiosResponse<T>) => {
            return data;
        }).catch(err => {
            return this.handleError(err);
        });
    }

    post<T>(url: string, params: any, headers?: any): Promise<AxiosResponse<T>> {
        return Axios.post(url, { headers: headers || this.headers, params: params || {} }).then((data: AxiosResponse<T>) => {
            return data;
        }).catch(err => {
            return this.handleError(err);
        });
    }

    put<T>(url: string, params: any, headers?: any): Promise<AxiosResponse<T>> {
        return Axios.post(url, { headers: headers || this.headers, params: params || {} }).then((data: AxiosResponse<T>) => {
            return data;
        }).catch(err => {
            return this.handleError(err);
        });
    }

    delete<T>(url: string, params: any, headers?: any): Promise<AxiosResponse<T>> {
        return Axios.post(url, { headers: headers || this.headers, params: params || {} }).then((data: AxiosResponse<T>) => {
            return data;
        }).catch(err => {
            return this.handleError(err);
        });
    }

    handleError(err: any) {
        return Promise.reject(err);
    }
}