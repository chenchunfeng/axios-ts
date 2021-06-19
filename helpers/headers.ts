import { isPlainObject } from './util';

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