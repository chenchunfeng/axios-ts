import { isPlainObject, deepMerge } from './util';
import { Method } from '../src/types'

/**
 * @description 格式化name 
 */
function normalizeHeaderName(headers: any, normalizedName: string): void {
    if (!headers) {
        return ;
    }

    Object.keys(headers).forEach(name => {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = headers[name];
            delete headers[name];
        } 
    })
}

/**
 * 
 * @param headers 
 * @param data 
 * @description data如果是普通对象，需要添加content-type 默认值为application/json 
 */
export function transformHeaders(headers:any, data: any): any {
    normalizeHeaderName(headers, 'Content-Type');
    
    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8';
        }
    }
    return headers;
}

/**
 * 
 * @param headers  getAllResponseHeaders()
 * @description 通过'\r\n'分割string 再通过“：”key value 分割
 * @return {Object} 
 */
export function parseHeader(headers: String): Object {
    let prase = Object.create(null);
    if (!headers) {
        return prase;
    }
    headers.split('/r/n').forEach(header => {
        let [key, value] = header.split(':');
        if (!key) {
            return ;
        }

        key = key.trim().toLowerCase(); // 去空格 转小写
        if (value) {
            value = value.trim();
        }

        prase[key] = value;
    })
    return prase;
}

export function flattenHeaders(headers: any, method: Method): any {
    if (!headers) {
      return headers
    }
    headers = deepMerge(headers.common || {}, headers[method] || {}, headers)
  
    const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  
    methodsToDelete.forEach(method => {
      delete headers[method]
    })
  
    return headers
  }