const toString = Object.prototype.toString;

export function isDate(val: any): val is Date {
    return toString.call(val) === '[object Date]';
}

export function isObject(val: any): val is Object {
    return val !== null && typeof val === 'object';
}

export function isPlainObject(val: any): val is Object {
    return toString.call(val) === '[object Object]';
}
// 扩展from 原型、实例上的属性到to上
export function extend<T, F>(to: T, from: F): T & F {
    for(const key in from) {
        (to as T & F)[key] = from[key] as any;
    } 
    return to as T & F;
}

export function deepMerge(...objs: any[]) {
    const result = Object.create(null);
    objs.forEach(obj => {
        if (obj) {
            // 合并相同的key，后者会覆盖前者
            Object.keys(obj).forEach(key => {
                const value = obj[key];
                if(isPlainObject(value)) {
                    if (isPlainObject(result[key])) {
                        result[key] = deepMerge(result[key], value)
                    } else {
                        result[key] = deepMerge({}, value)
                    }
                } else {
                    result[key] = value;
                }
            })
        }

    })

    return result;
}