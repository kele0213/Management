import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import './service/axios_test'
import zxRequest from './service'
import 'normalize.css'
import './assets/css/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { globalRegeist } from './global'
import { ElTable } from 'element-plus'

const app = createApp(App)
// 注册所有icons图标，会牺牲一点性能
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
setupStore()
app.use(globalRegeist)
app.use(router)
app.use(store)
app.mount('#app')

// 解决el-table报错问题
window.ResizeObserver = class _NewResizeObserver extends ResizeObserver {
  constructor(callback: any) {
    super((...args) =>
      window.requestAnimationFrame(() => callback.apply(this, args))
    )
  }
}
