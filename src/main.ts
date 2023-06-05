import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
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
setupStore()
