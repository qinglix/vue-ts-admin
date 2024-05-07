import { defineStore } from 'pinia'
import {
  getAmountListData, getGoodsAddressSale,
  getGoodsCategoryCount,
  getGoodsCategoryFavor,
  getGoodsCategorySale
} from '@/service/modules/analysis'

interface IAnalysisState {
  amountList: any[]
  goodsCategoryCount: any[]
  goodsCategorySale: any[]
  goodsCategoryFavor: any[]
  goodsAddressSale: any[]
}

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    amountList: [],
    goodsCategoryCount: [],
    goodsCategorySale: [],
    goodsCategoryFavor: [],
    goodsAddressSale: []
  }),
  actions: {
    fetchAnalysisDataAction() {
      getAmountListData().then((res) => {
        console.log('amountResult', res)
        this.amountList = res.data
      })

      getGoodsCategoryCount().then((res) => {
        console.log('categoryResult', res)
        this.goodsCategoryCount = res.data
      })

      getGoodsCategorySale().then((res) => {
        console.log('saleResult', res)
        this.goodsCategorySale = res.data
      })

      getGoodsCategoryFavor().then((res) => {
        console.log('favorResult', res)
        this.goodsCategoryFavor = res.data
      })

      getGoodsAddressSale().then((res) => {
        console.log('addressResult', res)
        this.goodsAddressSale = res.data
      })

    }
  }
})

export default useAnalysisStore
