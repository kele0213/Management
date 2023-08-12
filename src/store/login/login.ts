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
import { getRegisterRoute, mapMenutoPermission } from '@/utils/mapMenus'

const loginModule: Module<ILoginType, IRootType> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      roleMenus: [],
      permission: []
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
      // 获取完菜单顺便注册
      // console.log(menu)

      const registerRoute = getRegisterRoute(menu)
      for (const route of registerRoute) {
        router.addRoute('main', route)
      }
      // 从菜单中获取按钮权限
      const permission = mapMenutoPermission(menu)
      state.permission = permission
    }
  },
  getters: {},
  actions: {
    async onAccountLogin({ commit, dispatch }, account: IAccount) {
      // 1. 实现登录逻辑
      const loginData = await accountLoginRequest(account)
      if (loginData) {
        const { id, token } = loginData.data
        commit('setToken', token)
        localCache.setCache('token', token)
        // 新增：请求根目录的menu和department
        dispatch('getInitEntryInfo', undefined, { root: true })

        // 2. 获取用户信息
        const userInfo = await userInfoRequest(id)
        commit('setUserInfo', userInfo.data)
        localCache.setCache('userInfo', userInfo.data)
        // 3. 获取用户菜单
        // 177043989
        const menuRes = await menuRequest(id)
        commit('setRoleMenus', menuRes.data)
        localCache.setCache('roleMenus', menuRes.data)
        if (userInfo) {
          router.push('/main')
        }
      }
    },
    setupLoginData({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('setToken', token)
        dispatch('getInitEntryInfo', undefined, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('setUserInfo', userInfo)
      }
      const roleMenus = localCache.getCache('roleMenus')
      if (token) {
        commit('setRoleMenus', roleMenus)
      }
    }
  }
}

export default loginModule
