import { isPlainObject } from '../helpers/util'
import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, method = 'get', url, headers } = config

  const request = new XMLHttpRequest()
  // 第三个参数为异步
  request.open(method.toUpperCase(), url, true)
  // 添加header
  Object.keys(headers).forEach(name => {
    console.log(data)
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name] // 都没用到，删除又有什么用.....
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}
