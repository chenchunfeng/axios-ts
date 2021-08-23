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

#### 3.接口扩展
- axios(config)
- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.options(url[, config])
- axios.post(url[, data[, config]])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])

需要把axios 函数变成一个对象，支持以上属性。

```javascript

function createInstance(): AxiosInstance {
  const context = new Axios();

  // 为了实现axios()的操作
  const instance = Axios.prototype.request.bind(context);

  extend(instance, context);

  return instance as AxiosInstance;
}
const axios = createInstance();
export default axios

```

- axios(url, config)

需要修改Axios.request的入参

```javascript
    request(param: string | AxiosRequestConfig, config?: AxiosRequestConfig): AxiosPromise {
        if (typeof param === 'string') {
            if (!config) {
                config = {};
            }
            config.url = param;
        }
        config = param;
        return dispatchRequest(config)
    }
```
#### 4.响应数据支持泛型

通过自定义的类型，可以推断出返回的数据结构

- 需求
```javascript
interface ResponseData<T = any> {
  code: number,
  data: T,
  message: string
}

interface User {
  name: string,
  age: number
}

function getUserInfo() {
  return axios<ResponseData<User>>('/extend/user').then(res => res.data).catch(e => console.warn(e));
}

async function test() {
  const user = await getUserInfo();
  if (user) {
    // user 可推断出
    // {
    //   code: number,
    //   data: {
    //     name: string,
    //     age: number
    //   },
    //   message: string
    // }
    console.log(user.data.name);
  }
}
```
- 实现, 需要给axios相关api添加泛型参数

```javascript

```

#### 5.拦截器实现

##### 需求
- 请求、响应拦截器，都支持resolveFn, rejectFn两个参数
- 拦截器执行顺序，请求的，就先进后出（栈）， 响应的为先进先出（队列）
- 还要支持删除拦截器功能 eject()

##### 实现

拆分成两块功能，1.收集拦截器  2.循环执行拦截器

```javascript
// 收集
const interceptorManager = {
  interceptors: [],
  use: (resolveFn,rejectFn) => {
    this.interceptors.push({
      resolved: resolveFn,
      rejected: rejectFn || null
    })
    return this.interceptors.length - 1;
  }, 
  eject: (index) => {
    this.interceptors[index] = null;
  },
  forEach: (fn) => {
    fn(interceptor);
  }
}
Axios.interceptor = {
  request: new interceptorManager(),
  response: new interceptorManager()
}

// 循环执行
Axios.request = (config) => {
  const chain = [];
  chain.push({
    resolved: dispathRequest,
    rejected: null
  })
  // 添加请求拦截器
  this.interceptor.request.interceptors.forEach(interceptor => {
    // 后进的先出
    chain.unshift(interceptor);
  }) 
  // 添加响应拦截器
  this.interceptor.response.interceptors.forEach(interceptor => {
    // 先进的先出
    chain.push(interceptor);
  })
  // 开始链式执行
  let promise = Promise.resolve(config);  // 这里注意config参数， response的参数由dispatchRequest 返回

  while(chain.length) {
    const {resolved, rejected} = chain.shift(); 
    promise = promise.then(resolved, rejected);
  }

  return promise;
}

```

#### 6.配置默认设置

需求

1. axios里面添加默认设置
2. 默认设置、自定义设置的合并策略
3. plattenHeaders
#### 7.配置默认设置- transformRequst transformResponse

1. 添加默认设置中添加transformRequst、transformResponse处理原x来的逻辑
2. 新增transform函数处理 其数组 
3. 使用的时候，还是要concat默认配置
#### 8. axios 添加crate 静态方法
#### 9. axios 添加CancelToken








