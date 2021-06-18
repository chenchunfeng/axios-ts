import { AxiosRequestConfig } from './types'
import { buildURL } from '../helpers/url'
import { transformRequest } from '../helpers/data'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  processConfing(config)
  xhr(config)
}

function processConfing(config: AxiosRequestConfig): void {
  config.url = transformConfig(config)
  config.data = transformRequestData(config)
}
function transformConfig(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}
function transformRequestData(config: AxiosRequestConfig): string {
  return transformRequest(config.data)
}

export default axios
