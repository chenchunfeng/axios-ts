import { AxiosRequestConfig, AxiosResponse, AxiosPromise, Method, AxiosInterceptors, ResolveFn, RejectFn } from '../src/types'
import dispatchRequest from './dispatchRequest';
import InterceptorManager from './InterceptorManager';
import mergeConfig from './mergeConfigs';
interface PromiseChain<T> {
    resolved: ResolveFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
    rejected?: RejectFn
}
export default class Axios {
    defaults: AxiosRequestConfig

    interceptors: AxiosInterceptors

    constructor(defaultConfig: AxiosRequestConfig) {
        this.defaults = defaultConfig

        this.interceptors = {
            request: new InterceptorManager<AxiosRequestConfig>(),
            response: new InterceptorManager<AxiosResponse>(),
        }
    }

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
        // 合并config
        config = mergeConfig(this.defaults, config);

        // 开始拦截器操作
        const chain: PromiseChain<any>[] = [];

        chain.push({
          resolved: dispatchRequest,
          rejected: undefined
        })
        // 添加请求拦截器
        this.interceptors.request.forEach(interceptor => {
          // 后进的先出
          chain.unshift(interceptor);
        }) 
        // 添加响应拦截器
        this.interceptors.response.forEach(interceptor => {
          // 先进的先出
          chain.push(interceptor);
        })
        // 开始链式执行
        let promise = Promise.resolve(config) ;  // 这里注意config参数， response的参数由dispatchRequest 返回
      
        while(chain.length) {
          const { resolved, rejected } = chain.shift()!;  // !表示强制解析（告诉typescript编译器，这里一定有值）
          promise = promise.then(resolved, rejected);
        }

        return promise as AxiosPromise;
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