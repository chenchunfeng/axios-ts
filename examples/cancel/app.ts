import axios from '../../src/index'

let cancel;
const CancelToken = axios.CancelToken;
axios({
  url: '/config/test',
  method: 'post',
  headers: {
    test: '321'
  },
  CancelToken: new CancelToken(c => {
    cancel = c;
  })
}).then((res) => {
  console.log(res.data)
}).catch(e => {
  console.log(e, axios.isCancel(e))
})

cancel('haha');
cancel('bbq');

const source = axios.CancelToken.source();
axios({
  url: '/config/test',
  method: 'post',
  headers: {
    test: '2222'
  },
  CancelToken: source.token
}).then((res) => {
  console.log(res.data)
}).catch(e => {
  console.log(e, axios.isCancel(e))
})


source.cancel('nini');


const CancelToken1 = axios.CancelToken
const source1 = CancelToken1.source()


axios.get('/cancel/get', {
  cancelToken: source1.token
}).catch(function(e) {
  debugger
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})

setTimeout(() => {
  source1.cancel('Operation canceled by the user.')

  axios.post('/cancel/post', { a: 1 }, { cancelToken: source1.token }).catch(function(e) {
    if (axios.isCancel(e)) {
      console.log(e.message)
    }
  })
}, 100)



