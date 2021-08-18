import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { transformHeaders, flattenHeaders } from '../helpers/headers'
import transform from './transform'
import xhr from './xhr'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfing(config)
  return xhr(config).then(res => transformResponseData(res))
}

function processConfing(config: AxiosRequestConfig): void {
  config.url = transformConfig(config)
  // config.headers = transformHeadersData(config)
  // config.data = transformRequestData(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformConfig(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformHeadersData(config: AxiosRequestConfig): Object {
  const { headers = {}, data } = config
  return transformHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig): string {
  return transformRequest(config.data)
}

// 处理响应数据
function transformResponseData(res: AxiosResponse): AxiosResponse {
  // res.data = transformResponse(res.data)
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

export default dispatchRequest
