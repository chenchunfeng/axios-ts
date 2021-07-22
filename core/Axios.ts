import { AxiosRequestConfig, AxiosPromise, Method } from '../src/types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
    request(param: string | AxiosRequestConfig, config?: AxiosRequestConfig): AxiosPromise {
        // 第一个参数只为string 的url
        if (typeof param === 'string') {
            if (!config) {
                config = {};
            }
            config.url = param;
        } else {
            config = param;
        }
        return dispatchRequest(config);
    }

    _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
        // request 的config 是必填的
        return this.request(Object.assign(config || {}, {method, url}));
    }

    get(url: string, config?: AxiosRequestConfig): AxiosPromise{
        return this._requestMethodWithoutData('get', url, config);
    }
    head(url: string, config?: AxiosRequestConfig): AxiosPromise{
        return this._requestMethodWithoutData('head', url, config);
    }
    options(url: string, config?: AxiosRequestConfig): AxiosPromise{
        return this._requestMethodWithoutData('options', url, config);
    }
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise{
        return this._requestMethodWithoutData('delete', url, config);
    }

    _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
        // request 的config 是必填的
        return this.request(Object.assign(config || {}, {method, url, data}));
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise{
        return this._requestMethodWithData('post', url, data, config);
    }
    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise{
        return this._requestMethodWithData('put', url, data, config);
    }
    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise{
        return this._requestMethodWithData('patch', url, data, config);
    }


}