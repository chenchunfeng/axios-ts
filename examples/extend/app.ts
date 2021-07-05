import axios, { AxiosError } from '../../src/index'

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'axios'
  }
})


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