import { Module } from 'vuex'
import IRootType from '../type'
import IAnalysisType from './type'
import {
  getGoodsTypeCount,
  getGoodsSaleCount,
  getGoodsFavorCount,
  getGoodsAddressSale
} from '@/service/analysis/analysis'

const analysisModule: Module<IAnalysisType, IRootType> = {
  namespaced: true,
  state() {
    return {
      goodsTypeCount: [],
      goodsSaleCount: [],
      goodsFavorCount: [],
      goodsAddressSale: []
    }
  },
  mutations: {
    setGoodsTypeCount(state, list) {
      state.goodsTypeCount = list
    },
    setGoodsSaleCount(state, list) {
      state.goodsSaleCount = list
    },
    setGoodsFavorCount(state, list) {
      state.goodsFavorCount = list
    },
    setGoodsAddressSale(state, list) {
      state.goodsAddressSale = list
    }
  },
  actions: {
    async getPageGoodsDataAction({ commit }, payload) {
      const goodsTypeCount = await getGoodsTypeCount()
      commit('setGoodsTypeCount', goodsTypeCount.data)
      const goodsSaleCount = await getGoodsSaleCount()
      commit('setGoodsSaleCount', goodsSaleCount.data)
      const goodsFavorCount = await getGoodsFavorCount()
      commit('setGoodsFavorCount', goodsFavorCount.data)
      const goodsAddressSale = await getGoodsAddressSale()
      commit('setGoodsAddressSale', goodsAddressSale.data)
    }
  }
}

export default analysisModule
