<script setup lang="ts">
import CountCard from '@/ui/main/analysis/count-card.vue'
import useAnalysisStore from '@/stores/analysis'
import { storeToRefs } from 'pinia'
import ChartCard from '@/ui/main/analysis/chart-card.vue'
import PieEchart from '@/components/echarts/pie-echart.vue'
import { computed } from 'vue'
import RoseEchart from '@/components/echarts/rose-echart.vue'
import LineEchart from '@/components/echarts/line-echart.vue'
import BarEchart from '@/components/echarts/bar-echart.vue'
import MapEchart from '@/components/echarts/map-echart.vue'

// 1.发起数据的请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 2.从store中获取数据
const {
  amountList,
  goodsCategoryCount,
  goodsCategorySale,
  goodsCategoryFavor,
  goodsAddressSale
} = storeToRefs(analysisStore)

// 3.获取数据
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => {
    return {
      name: item.name,
      value: item.goodsCount
    }
  })
})

const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsCount)
  return { labels, values }
})

const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})

const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
</script>

<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card>
          <pie-echart :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card>
          <map-echart :map-data="showGoodsAddressSale" />
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card>
          <rose-echart :rose-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card>
          <line-echart :values="showGoodsCategorySale.values" :labels="showGoodsCategorySale.labels" />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card>
          <bar-echart v-bind="showGoodsCategoryFavor" />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-row {
  margin-bottom: 10px;
}
</style>
