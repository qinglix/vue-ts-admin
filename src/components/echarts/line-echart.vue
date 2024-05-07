<script setup lang="ts">
import BaseEchart from '@/components/echarts/base-echart.vue'
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'

const props = defineProps<{
  labels: string[]
  values: number[]
}>()

const option = computed<EChartsOption>(() => {
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
        data: props.labels
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '分类销量统计',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.values
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
