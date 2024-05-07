import appRequest from '@/service'

export function getAmountListData() {
  return appRequest.get({
    url: '/goods/amount/list'
  })
}

export function getGoodsCategoryCount() {
  return appRequest.get({
    url: '/goods/category/count'
  })
}

export function getGoodsCategorySale() {
  return appRequest.get({
    url: '/goods/category/sale'
  })
}

export function getGoodsCategoryFavor() {
  return appRequest.get({
    url: '/goods/category/favor'
  })
}

export function getGoodsAddressSale() {
  return appRequest.get({
    url: '/goods/address/sale'
  })
}
