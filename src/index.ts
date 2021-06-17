import { AxiosRequestConfig } from './types'
import { buildURL } from '../helplers/url'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  processConfing(config)
  xhr(config)
}

function processConfing(config: AxiosRequestConfig): void {
  config.url = transformConfig(config)
}
function transformConfig(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

export default axios
