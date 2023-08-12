import * as echarts from 'echarts'
import type { EChartsCoreOption } from 'echarts'

export default function useEchart(el: HTMLElement) {
  const echartInstance = echarts.init(el)
  const setOption = (options: EChartsCoreOption) => {
    echartInstance.setOption(options)
  }
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  const resize = () => {
    return echartInstance.resize()
  }

  return {
    echartInstance,
    setOption,
    resize
  }
}
