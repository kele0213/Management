import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { globalRegeist } from './global'
import './service/axios_test'
import zxRequest from './service'
import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)
// app.use(globalRegeist)
app.use(router)
app.use(store)
app.mount('#app')

// request封装测试
interface requestType {
  data: any
  returnCode: string
  success: boolean
}
zxRequest
  .request<requestType>({
    method: 'GET',
    url: '/home/multidata',
    isLoading: true
    // interceptors: {
    //   requestSuccessInterceptor(config) {
    //     console.log('request请求成功拦截')
    //     return config
    //   },
    //   responseSuccessInterceptor(res) {
    //     console.log('request获取成功拦截')
    //     return res
    //   }
    // }
  })
  .then((res) => {
    console.log(res)
  })
zxRequest
  .get({
    url: '/home/multidata',
    isLoading: false
  })
  .then((res) => {
    console.log(res)
  })
