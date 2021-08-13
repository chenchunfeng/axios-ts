import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123;
axios.defaults.headers.common['test1'] = 46;

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