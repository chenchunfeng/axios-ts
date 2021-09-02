import axios from '../../src/index'

document.cookie = 'a=b'

// axios.get('/more/get').then(res => {
//   console.log('more', res)
// })

// axios.post('http://127.0.0.1:8088/more/server2', {withCredentials: true}, {
//   withCredentials: true
// }).then(res => {
//   console.log('cors withPrams', res)
// })
// axios.post('http://127.0.0.1:8088/more/server2', {withCredentials: false}, {
//   withCredentials: false
// }).then(res => {
//   console.log('cors noParams', res)
// })

const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/more/get').then(res => {
  console.log(res)
})
