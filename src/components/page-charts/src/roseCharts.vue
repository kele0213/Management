<template>
  <div class="rose-chart">
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
    data: {
      type: Array as PropType<IDataType[]>,
      required: true
    }
  },
  setup(props) {
    const option = computed(() => {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: { top: 'bottom' },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            type: 'pie',
            radius: [10, 80],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
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
