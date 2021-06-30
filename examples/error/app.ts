import axios from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
}).then(res => {
  console.log(res);
}).catch(e => {
  console.log(e);
})
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get1'
  }).then(res => {
    console.log(res);
  }).catch(e => {
    console.log(e);
  })
}, 1000)



axios({
  method: 'get',
  url: '/error/get2',
  timeout: 2000
}).then(res => {
  console.log(res);
}).catch(e => {
  console.log(e);
})