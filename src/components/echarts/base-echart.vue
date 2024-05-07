<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import type { EChartsOption } from 'echarts'
import chinaJson from '@/data/china.json'
import { throttle } from 'underscore'

// 注册地图
echarts.registerMap('china', chinaJson as any)

interface IProps {
  option: EChartsOption
}

const props = defineProps<IProps>()

const echartRef = ref<HTMLElement>()
onMounted(() => {
  // 1.初始化echart实例
  const echartInstance = echarts.init(echartRef.value!, 'light', { renderer: 'canvas' })
  // 2.第一次设置options
  // watchEffect可以自动监听option的变化，重新渲染
  watchEffect(() => {
    echartInstance.setOption(props.option)
  })

  // 3.监听屏幕缩放
  // todo 优化：节流
  // fix
  const resizeAction = throttle(() => {
    echartInstance.resize()
  }, 1000)
  window.addEventListener('resize', resizeAction)
  // window.addEventListener('resize', () => {
  //   echartInstance.resize()
  // })
})
</script>

<template>
  <div class="echart" ref="echartRef"></div>
</template>

<style scoped>
.echart {
  height: 300px;
}
</style>
