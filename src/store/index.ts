import { createStore } from 'vuex'
import IRootType from './type'
import loginModule from './login/login'
import localCache from '@/utils/localCache'

const store = createStore<IRootType>({
  state() {
    return {
      name: 'czx'
    }
  },
  modules: { login: loginModule }
})

export function setupStore() {
  const token = localCache.getCache('token')
  if (token) {
    store.commit('login/setToken', token)
  }
  const userInfo = localCache.getCache('userInfo')
  if (userInfo) {
    store.commit('login/setUserInfo', userInfo)
  }
  const roleMenus = localCache.getCache('roleMenus')
  if (token) {
    store.commit('login/setRoleMenus', roleMenus)
  }
}

export default store
