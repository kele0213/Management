import { Module } from 'vuex'
import IRootType from '../type'
import { ISystemType } from './types'
import {
  createPageData,
  deletePageData,
  getPageListData,
  updatePageData
} from '@/service/main/system/system'
import { ElMessage } from 'element-plus'
const systemModul: Module<ISystemType, IRootType> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    setUsersList(state, list: any) {
      state.usersList = list
    },
    setUsersCount(state, totalCount: number) {
      state.usersCount = totalCount
    },
    setRoleList(state, list: any) {
      state.roleList = list
    },
    setRoleCount(state, totalCount: number) {
      state.roleCount = totalCount
    },
    setGoodsList(state, list: any) {
      state.goodsList = list
    },
    setGoodsCount(state, totalCount: number) {
      state.goodsCount = totalCount
    },
    setMenuList(state, list: any) {
      state.menuList = list
    },
    setMenuCount(state, totalCount: number) {
      state.menuCount = totalCount
    }
  },
  getters: {
    getPageDataList(state) {
      return function (pageName: string) {
        return (state as any)[`${pageName}List`] ?? []
      }
    },
    getPageDataCount(state) {
      return function (pageName: string) {
        return (state as any)[`${pageName}Count`] ?? 0
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageUrl = `/${payload.pageName}/list` // users role goods
      const infoData = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = infoData.data

      const changePageName =
        payload.pageName.slice(0, 1).toUpperCase() + payload.pageName.slice(1)

      commit(`set${changePageName}List`, list)
      commit(`set${changePageName}Count`, totalCount)
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      const { pageName, id } = payload
      const url = `/${pageName}/${id}`
      const { code, data } = await deletePageData(url)
      // 输出删除结果
      if (code === 0) {
        ElMessage({
          message: data,
          type: 'success'
        })
      } else {
        ElMessage({
          message: data,
          type: 'error'
        })
      }

      // 这里需要做优化：假如有查询条件应该传如queryInfo
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {}
      })
    },
    // 新增数据
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const url = `/${pageName}`
      const create = await createPageData(url, newData)
      // 提示信息
      const { code, data } = create
      if (code == 0) {
        ElMessage({
          message: data,
          type: 'success'
        })
      } else {
        ElMessage({
          message: data,
          type: 'error'
        })
      }
      // 这里需要做优化：假如有查询条件应该传如queryInfo
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {}
      })
    },
    async updatePageDataAction({ dispatch }, payload: any) {
      const { pageName, id, newData } = payload
      const url = `/${pageName}/${id}`
      const update = await updatePageData(url, newData)
      // 提示信息
      const code = update?.code ?? '-1'
      const data = update?.data ?? '用户名不能重复'
      if (code == 0) {
        ElMessage({
          message: data,
          type: 'success'
        })
      } else {
        ElMessage({
          message: data,
          type: 'error'
        })
      }
      // 这里需要做优化：假如有查询条件应该传如queryInfo
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {}
      })
    }
  }
}
export default systemModul
