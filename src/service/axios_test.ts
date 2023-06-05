import axios from 'axios'
// 1. 常规的请求方式
// axios
//   .request({
//     method: 'GET',
//     url: 'http://123.207.32.32:8000/home/multidata'
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 2. get请求(无参数)
// axios.get('http://httpbin.org/get').then((res) => {
//   console.log(res.data)
// })

// 3. get请求（带参数）
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'czx',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })

// 4. post请求
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'czx',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })

// 5. 局部配置
// axios
//   .get('/home/multidata', {
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 10000
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 6. 全局配置
axios.defaults.baseURL = 'http://123.207.32.32:8000'
axios.defaults.timeout = 10000

// 7. axios的all
// axios
//   .all([axios.get('/home/multidata'), axios.get('http://httpbin.org/get')])
//   .then((res) => {
//     console.log(res[0].data)
//     console.log(res[1].data)
//   })

// 8. axios的拦截
// fn1：请求发送成功时拦截 fn2：请求发送失败时拦截（很少）
// axios.interceptors.request.use(fn1,fn2)

axios.interceptors.request.use(
  (config) => {
    // 可以在这里做一些修改，比如修改token header[token],或者等待动画
    console.log('请求成功')
    return config
  },
  (err) => {
    console.log('请求错误')
    return err
  }
)

// fn1：请求接收成功时拦截，fn2：请求接收失败时拦截（很少）
// axios.interceptors.response.use(fn1,fn2)
axios.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    return err
  }
)

// axios.get('http://httpbin.org/get').then((res) => {
//   console.log(res.data)
// })

// import { BASE_URL, BASE_NAME } from './request/config'
// console.log(BASE_URL)
// console.log(BASE_NAME)
// console.log(process.env.VUE_APP_BASE_NAME)
// console.log(process.env.VUE_APP_BASE_URL)
