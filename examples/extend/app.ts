import axios, { AxiosError } from '../../src/index'

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'axios'
  }
})

axios('/extend/get?a=1', {method: 'get'})
axios('/extend/get?a=1')




axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'request'
  }
}).then(res => {
  console.log(res);
})


axios.get('/extend/get')
axios.head('/extend/head')
axios.options('/extend/options')
axios.delete('/extend/delete')

axios.post('/extend/post',{msg: 'post'}).then(res => {
  console.log(res);
})
axios.put('/extend/put',{msg: 'put'}).then(res => {
  console.log(res);
})
axios.patch('/extend/patch',{msg: 'patch'}).then(res => {
  console.log(res);
})

// 响应数据支持泛型

interface ResponseData<T = any> {
  code: number,
  result: T,
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
    console.log(user.result.name);
    console.log(user.result.age);
  }
}

test();