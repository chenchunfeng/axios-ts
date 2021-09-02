import { isDate, isObject } from './util'

/**
 *
 * @param url
 * @param params
 * @description  处理url参数
 *
 */
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []
  // 循环处理参数
  Object.keys(params).forEach(key => {
    let val = params[key]
    // 清除为null undefined 参数
    if (val === null || val === undefined) {
      return
    }
    // 数组的值，拼上key[]
    let values: string[] = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    // 拼接参数
    values.forEach(item => {
      if (isDate(item)) {
        item = item.toISOString()
      }

      if (isObject(item)) {
        item = JSON.stringify(item)
      }

      parts.push(`${encode(key)}=${encode(item)}`)
    })
  })
  let serializedParams = parts.join('&')
  // 清除hash #
  const markIndex = url.indexOf('#')
  if (markIndex !== -1) {
    url = url.slice(0, markIndex)
  }
  if (serializedParams) {
    // 判断url 末尾是否有?
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

/**
 *
 * @param val
 * @description 对于字符 @、:、$、,、、[、]，我们是允许出现在 url 中的，不希望被 encode。
 *
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

const UrlParsingNode = document.createElement('a')
const CurrentOrigin = resolveUrl(window.location.href)

interface URLOrigin {
  host: string
  protocol: string
}
function resolveUrl(url: string): URLOrigin {
  UrlParsingNode.setAttribute('href', url)
  const { host, protocol } = UrlParsingNode
  return {
    host,
    protocol
  }
}

export function isUrlSameOrigin(requestUrl: string): boolean {
  const parsedOrigin = resolveUrl(requestUrl)

  return (
    parsedOrigin.host === CurrentOrigin.host && parsedOrigin.protocol === CurrentOrigin.protocol
  )
}
