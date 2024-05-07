<script setup lang="ts">
import BaseEchart from '@/components/echarts/base-echart.vue'
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import type { IEchartValueType } from '@/components/echarts/types'

interface IProps {
  roseData: IEchartValueType[]
}

const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: [10, 130],
        center: ['50%', '50%'],
        bottom: '-10%',
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData,
        label: {
          show: false
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
