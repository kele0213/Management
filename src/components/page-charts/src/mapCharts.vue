<template>
  <div class="map-chart">
    <page-chart :option="option" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import PageChart from '@/base-ui/echart'
import * as echarts from 'echarts'
import china from './map/china.json'
import type { IMapData, IToolTipData } from '../types'
import coordmap from './map/coordmap'

export default defineComponent({
  components: {
    PageChart
  },
  props: {
    data: {
      type: Array as PropType<IMapData[]>,
      required: true
    },
    toolTipData: {
      type: Array as PropType<IToolTipData[]>,
      required: true
    }
  },
  setup(props) {
    const mapName = 'china'
    echarts.registerMap(mapName, china)
    const geoCoordMap: any = coordmap

    //  上面是初始化数据
    //  获取地图数据
    const mapFeatures = echarts.getMap(mapName).geoJson.features
    // mapFeatures.forEach(function (v: any) {
    //   // 地区名称
    //   var name = v.properties.name
    //   // 地区经纬度
    //   geoCoordMap[name] = v.properties.cp
    // })
    const [max, min] = [400, 9]
    const [maxSize4Pin, minSize4Pin] = [100, 20]
    const convertData = function (data: any) {
      let res = []
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    }

    // const data2 = data
    //   .sort(function (a: any, b: any) {
    //     return b.value - a.value
    //   })
    //   .slice(0, 5)

    const option = computed(() => {
      const data = props.data
      const toolTipData = props.toolTipData
      return {
        tooltip: {
          trigger: 'item',
          formatter: function (params: any) {
            if (typeof params.value[2] == 'undefined') {
              let toolTiphtml = ''
              for (let i = 0; i < toolTipData.length; i++) {
                if (params.name == toolTipData[i].name) {
                  toolTiphtml += toolTipData[i].name + ':<br>'
                  for (let j = 0; j < toolTipData[i].value.length; j++) {
                    toolTiphtml +=
                      toolTipData[i].value[j].name +
                      ':' +
                      toolTipData[i].value[j].value +
                      '<br>'
                  }
                }
              }
              // console.log(toolTiphtml)
              // console.log(convertData(data))
              return toolTiphtml
            } else {
              let toolTiphtml = ''
              for (let i = 0; i < toolTipData.length; i++) {
                if (params.name == toolTipData[i].name) {
                  toolTiphtml += toolTipData[i].name + ':<br>'
                  for (let j = 0; j < toolTipData[i].value.length; j++) {
                    toolTiphtml +=
                      toolTipData[i].value[j].name +
                      ':' +
                      toolTipData[i].value[j].value +
                      '<br>'
                  }
                }
              }
              // console.log(toolTiphtml)
              // console.log(convertData(data))
              return toolTiphtml
            }
          }
        },
        // legend: {
        //     orient: 'vertical',
        //     y: 'bottom',
        //     x: 'right',
        //     data: ['credit_pm2.5'],
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        visualMap: {
          show: true,
          min: 20000,
          max: 60000,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            // color: ['#3B5077', '#031525'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            // color: ['#23074d', '#cc5333'] // 紫红
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#1488CC', '#2B32B2'] // 浅蓝
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
          }
        },
        /*工具按钮组*/
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //         dataView: {
        //             readOnly: false
        //         },
        //         restore: {},
        //         saveAsImage: {}
        //     }
        // },
        geo: {
          show: true,
          map: mapName,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              borderColor: '#3B5077'
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          }
        },
        series: [
          {
            name: '散点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: 10,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#05C3F9'
              }
            }
          },
          {
            type: 'map',
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077'
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            },
            animation: false,
            data: data
          },
          {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin', //气泡
            symbolSize: 30,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 9
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#F62157' //标志颜色
              }
            },
            zlevel: 6,
            data: convertData(data)
          }
          // },
          // {
          //   name: 'Top 5',
          //   type: 'effectScatter',
          //   coordinateSystem: 'geo',
          //   data: convertData(data2),
          //   symbolSize: 5,
          //   showEffectOn: 'render',
          //   rippleEffect: {
          //     brushType: 'stroke'
          //   },
          //   hoverAnimation: true,
          //   label: {
          //     normal: {
          //       formatter: '{b}',
          //       position: 'right',
          //       show: true
          //     }
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: 'yellow',
          //       shadowBlur: 10,
          //       shadowColor: 'yellow'
          //     }
          //   },
          //   zlevel: 1
          // }
        ]
      }
    })
    return { option }
  }
})
</script>

<style scoped></style>
