import {AxiosRequestConfig, AxiosResponse} from '../src/types'

class AxiosError extends Error {
    config: AxiosRequestConfig
    isAxiosError: Boolean
    code?: string | null
    request?: any
    response?: AxiosResponse

    constructor(params: {
        message: string,
        config: AxiosRequestConfig
        code?: string | null
        request?: any
        response?: AxiosResponse
    }) {
        super(params.message)
        this.config = params.config;
        this.code = params.code;
        this.request = params.request;
        this.response = params.response;
        this.isAxiosError = true;

        // 解决内置类extends问题
        Object.setPrototypeOf(this, AxiosError.prototype)

    }
}

export function createError(params: {
    message: string,
    config: AxiosRequestConfig
    code?: string | null
    request?: any
    response?: AxiosResponse
}): AxiosError {
    return new AxiosError(params)
}