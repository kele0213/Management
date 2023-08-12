<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <zx-card title="分类商品数量(饼图)">
          <pie-chart :data="typeData" />
        </zx-card>
      </el-col>
      <el-col :span="10">
        <zx-card title="不同城市商品销量">
          <map-chart v-bind="mapData" />
        </zx-card>
      </el-col>
      <el-col :span="7">
        <zx-card title="分类商品数量(玫瑰图)">
          <rose-chart :data="typeData" />
        </zx-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="nextElRow">
      <el-col :span="12">
        <zx-card title="分类商品的销量（折线图）">
          <line-chart v-bind="saleData" />
        </zx-card>
      </el-col>
      <el-col :span="12">
        <zx-card title="分类商品的收藏（柱状图）">
          <bar-chart v-bind="favorData" />
        </zx-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import ZxCard from '@/base-ui/card'
import { useStore } from '@/store'
import {
  PieChart,
  RoseChart,
  LineChart,
  BarChart,
  MapChart
} from '@/components/page-charts'

export default defineComponent({
  name: 'dashboard',
  components: {
    ZxCard,
    PieChart,
    RoseChart,
    LineChart,
    BarChart,
    MapChart
  },
  setup() {
    // 注册事件
    const store = useStore()
    store.dispatch('analysis/getPageGoodsDataAction')
    // 配置
    // 1. 分类商品数量（饼图）
    const typeData = computed(() => {
      return store.state.analysis.goodsTypeCount.map((item) => {
        return { value: item.goodsCount, name: item.name }
      })
    })
    // 2.商品销量
    const saleData = computed(() => {
      const name = '商品销量'
      const xLabel: string[] = []
      const data: number[] = []
      for (const item of store.state.analysis.goodsSaleCount) {
        xLabel.push(item.name)
        data.push(item.goodsCount)
      }
      return { name, xLabel, data }
    })
    // 3. 商品收藏
    const favorData = computed(() => {
      const xLabel: string[] = []
      const data: number[] = []
      for (const item of store.state.analysis.goodsFavorCount) {
        xLabel.push(item.name)
        data.push(item.goodsFavor)
      }
      return { xLabel, data }
    })
    // 4. 地图数据
    const mapData = computed(() => {
      const data = []
      const toolTipData = []
      for (const item of store.state.analysis.goodsAddressSale) {
        data.push({ name: item.address, value: item.count })
        toolTipData.push({
          name: item.address,
          value: [{ name: '销量', value: item.count }]
        })
      }
      return { data, toolTipData }
    })
    return { typeData, saleData, favorData, mapData }
  }
})
</script>

<style scoped lang="less">
.dashboard {
  background-color: #f0f2f5 !important;
}
.nextElRow {
  margin-top: 10px;
}
</style>
