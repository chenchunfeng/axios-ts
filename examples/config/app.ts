import axios from '../../src/index'
import { AxiosTransformer } from '../../src/types'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123;
axios.defaults.headers.common['b'] = 'hello';

axios({
  url: '/config/test',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then((res) => {
  console.log(res.data)
})




const instance = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
})

instance({
  url: '/config/test',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})

axios({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 3
    }
    return data
  }],
  url: '/config/test',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})

axios({
  url: '/config/test',
  method: 'post',
  data: qs.stringify({
    a: 2
  }),
  headers: {
    test: '321'
  }
}).then((res) => {
  console.log(res.data)
})