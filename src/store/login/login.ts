import { Module } from 'vuex'
import ILoginType from './type'
import IRootType from '../type'
import {
  accountLoginRequest,
  userInfoRequest,
  menuRequest
} from '@/service/login/accountLogin'
import type { IAccount } from '@/service/login/loginType'
import localCache from '@/utils/localCache'
import router from '@/router'

const loginModule: Module<ILoginType, IRootType> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      roleMenus: []
    }
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setRoleMenus(state, menu) {
      state.roleMenus = menu
    }
  },
  getters: {},
  actions: {
    async onAccountLogin({ commit }, account: IAccount) {
      // 1. 实现登录逻辑
      const loginData = await accountLoginRequest(account)
      const { id, token } = loginData.data
      commit('setToken', token)
      localCache.setCache('token', token)
      // 2. 获取用户信息
      const userInfo = await userInfoRequest(id)
      commit('setUserInfo', userInfo.data)
      localCache.setCache('userInfo', userInfo.data)
      // 3. 获取用户菜单
      const menuRes = await menuRequest(id)
      commit('setRoleMenus', menuRes.data)
      localCache.setCache('roleMenus', menuRes.data)
      if (userInfo) {
        router.push('/main')
      }
    }
  }
}

export default loginModule
