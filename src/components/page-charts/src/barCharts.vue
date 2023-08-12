<template>
  <div class="bar-chart">
    <page-chart :option="option" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import PageChart from '@/base-ui/echart'
import * as echarts from 'echarts'

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
    }
  },
  setup(props) {
    const option = computed(() => {
      return {
        tooltip: {
          trigger: 'item'
        },
        xAxis: {
          data: props.xLabel,
          axisLabel: {
            inside: true,
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
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
