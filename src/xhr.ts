import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, method = 'get', url } = config

  const request = new XMLHttpRequest()
  // 第三个参数为异步
  request.open(method.toUpperCase(), url, true)
  request.send(data)
}
