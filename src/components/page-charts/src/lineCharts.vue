<template>
  <div class="line-chart">
    <page-chart :option="option" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import PageChart from '@/base-ui/echart'
import type { IDataType } from '../types'

export default defineComponent({
  components: {
    PageChart
  },
  props: {
    xLabel: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const option = computed(() => {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {},
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: props.xLabel
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: props.name,
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: props.data
          }
        ]
      }
    })
    return { option }
  }
})
</script>

<style scoped></style>
