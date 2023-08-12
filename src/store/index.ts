import { createStore } from 'vuex'
import IRootType from './type'
import loginModule from './login/login'
import localCache from '@/utils/localCache'
import { IRoot } from './type'
import { useStore as useVuexStore, Store } from 'vuex'
import systemModul from './system/system'
import { getPageListData } from '@/service/main/system/system'
import analysisModule from './analysis/dashboard'

const store = createStore<IRootType>({
  state() {
    return {
      name: 'czx',
      entryDepartment: [],
      entryRole: [],
      entryMenu: []
    }
  },
  mutations: {
    changeEntryDepartment(state, data) {
      state.entryDepartment = data
    },
    changeEntryRole(state, data) {
      state.entryRole = data
    },
    changeEntryMenu(state, data) {
      state.entryMenu = data
    }
  },
  actions: {
    async getInitEntryInfo({ commit }) {
      const department = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      })
      const { list: departmentList } = department.data ?? {}
      commit('changeEntryDepartment', departmentList)
      const role = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      })
      const { list: roleList } = role.data ?? {}
      commit('changeEntryRole', roleList)
      const menu = await getPageListData('/menu/list', {
        offset: 0,
        size: 100
      })
      const { list: menuList } = menu.data ?? {}
      commit('changeEntryMenu', menuList)
    }
  },
  modules: {
    login: loginModule,
    system: systemModul,
    analysis: analysisModule
  }
})

export function setupStore() {
  store.dispatch('login/setupLoginData')
  // 异步请求，登录时有可能还没请求到token 所以不能写在这里
  // store.dispatch('getInitEntryInfo')
}

export function useStore(): Store<IRoot> {
  return useVuexStore()
}

export default store
