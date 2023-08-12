<template>
  <div class="page-echart">
    <div ref="divRef" :style="chartStyle"></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  PropType,
  watchEffect,
  computed
} from 'vue'
import type { IChartStyle } from '../types/echart'
import useEchart from '../hooks/useEchart'
import type { EChartsCoreOption } from 'echarts'

export default defineComponent({
  props: {
    chartStyle: {
      type: Object as PropType<IChartStyle>,
      default: () => {
        return {
          width: '100%',
          height: '320px'
        }
      }
    },
    option: {
      type: Object as PropType<EChartsCoreOption>,
      required: true
    }
  },
  setup(props) {
    const divRef = ref<HTMLElement>()
    onMounted(() => {
      const { setOption } = useEchart(divRef.value!)
      const options = computed(() => props.option)
      watchEffect(() => {
        setOption(options.value)
      })
    })
    return { divRef }
  }
})
</script>

<style scoped></style>
