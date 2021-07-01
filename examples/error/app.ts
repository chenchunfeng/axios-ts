import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
}).then(res => {
  console.log(res);
}).catch((e: AxiosError) => {
  console.log(e.message);
  console.log(e.response);
})
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get1'
  }).then(res => {
    console.log(res);
  }).catch((e: AxiosError) => {
    console.log('get1-', e.message);
    console.log('get1-', e.response);

  })
}, 1000)



axios({
  method: 'get',
  url: '/error/get2',
  timeout: 2000
}).then(res => {
  console.log(res);
}).catch((e: AxiosError) => {
  console.log('timeout-', e.message);
  console.log('timeout-', e.response);
})