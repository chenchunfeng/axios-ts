import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../src/types'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { transformHeaders } from '../helpers/headers'
import xhr from '../src/xhr'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfing(config)
  return xhr(config).then(res => transformResponseData(res))
}

function processConfing(config: AxiosRequestConfig): void {
  config.url = transformConfig(config)
  config.headers = transformHeadersData(config)
  config.data = transformRequestData(config)
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
  res.data = transformResponse(res.data)
  return res
}

export default dispatchRequest
