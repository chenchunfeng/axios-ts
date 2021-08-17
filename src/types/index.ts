export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'patch'
  | 'PATCH'
  | 'options'
  | 'OPTIONS'
  | 'head'
  | 'HEAD'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  [propName: string]: any
  transformRequest?: AxiosTransformer[] | AxiosTransformer
  transformResponse?: AxiosTransformer[] | AxiosTransformer
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  isAxiosError: Boolean
  code?: string | null
  request?: any
  response?: AxiosResponse
}

// 拦截器
export interface ResolveFn<T = any> {
  (val: T): T | Promise<T>
}
export interface RejectFn {
  (error: any): any
}
export interface Interceptor<T> {
  resolved: ResolveFn<T>
  rejected?: RejectFn
}
export interface AxiosInterceptorManager<T> {
  use(resolve: ResolveFn, reject?: RejectFn): number
  eject(id: number): void
  forEach(fn: (interceptor: Interceptor<T>) => void): void
}
export interface AxiosInterceptors {
  request: AxiosInterceptorManager<AxiosRequestConfig>
  response: AxiosInterceptorManager<AxiosResponse>
}
export interface Axios {
  defaults: AxiosRequestConfig

  interceptors: AxiosInterceptors

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance
}
