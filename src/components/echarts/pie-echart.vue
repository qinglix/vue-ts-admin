<script setup lang="ts">
import BaseEchart from '@/components/echarts/base-echart.vue'
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import type { IEchartValueType } from '@/components/echarts/types'

// interface IEchartValueType {
//   value: number
//   name: string
// }

interface IProps {
  pieData: IEchartValueType[]
}

const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        bottom: '-10%',
        data: props.pieData,
        //   [
        //   { value: 1048, name: 'Search Engine' },
        //   { value: 735, name: 'Direct' },
        //   { value: 580, name: 'Email' },
        //   { value: 484, name: 'Union Ads' },
        //   { value: 300, name: 'Video Ads' }
        // ],
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
</script>

<template>
  <div>
    <base-echart :option="option" />
  </div>
</template>

<style scoped>

</style>
