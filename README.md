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
