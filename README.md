# ts-axios
使用ts重构axios



#### 1. 处理错误

错误分为三类，
- 网络异常
- 超时
- 接口非200状态码

```javascript
// 网络异常
request.onerror = function() {
    reject(new Error('network error'));
}

// 超时
request.ontimeout = function() {
    reject(new Error(`timeout of ${config.timeout} exceeded`));
}

// 接口非200状态码 0的时候为网络错误或取消
if (response.status === 0) {
    return;
}
if (response.status >= 200 && response.status < 300) {
    resolve(response);
} else {
    reject(`request failed with status code ${response.status}`)
}

```

#### 2. 错误对象化

创建 axiosError 类 返回 其对象
```javascript
class AxiosError extends Error {
    isAxiosError: Boolean,
    config: AxiosRequestConfig,
    request?: any,
    response?: AxiosResponse,
    code?: string | null
}

function createError(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
): AxiosError {
    return new AxiosError(params);
}

```
> 这里要注意一点，使用 Object.setPrototypeOf(this, AxiosError.prototype) 解决 TypeScript 继承一些内置对象的时候的坑
> axios.catch 无法类型推断，要自己加上 e: AxiosError

