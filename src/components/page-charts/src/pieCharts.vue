<template>
  <div class="pie-chart">
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
        legend: {},
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: props.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    })
    return { option }
  }
})
</script>

<style scoped></style>
