import Axios from 'axios';

export default class BaseAxios {
    headers: any;
    constructor() {
        this.headers = {};
    }
    get(url: string, headers: any) {
        return Axios.get(url, { headers: headers || this.headers }).then(data => {
            return data;
        }).catch(err => {
            return this.handleError(err);
        });
    }

    post(url: string, headers: any, params: any) {
        return Axios.post(url, { headers: headers || this.headers, params: params || {} }).then(data => {
            return data;
        }).catch(err => {
            return this.handleError(err);
        });
    }

    put(url: string, headers: any, params: any) {
        return Axios.post(url, { headers: headers || this.headers, params: params || {} }).then(data => {
            return data;
        }).catch(err => {
            return this.handleError(err);
        });
    }

    delete(url: string, headers: any, params: any) {
        return Axios.post(url, { headers: headers || this.headers, params: params || {} }).then(data => {
            return data;
        }).catch(err => {
            return this.handleError(err);
        });
    }

    handleError(err: any) {
        return Promise.reject(err);
    }
}