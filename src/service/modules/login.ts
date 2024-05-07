import appRequest from '@/service'
import { localCache } from '@/utils/cache'

export function accountLoginRequest(account: { name: string; password: string }) {
  return appRequest.post({
    url: '/login',
    data: account
  })
}

// 获取用户信息
export function getUserInfoById(id: number) {
  return appRequest.get({
    url: `/users/${id}`
    // 单独请求携带token
    // headers: {
    //   Authorization: `Bearer ${localCache.getCache('token')}`
    // }
  })
}

// 根据roleId获取菜单
export function getUserMenuByRoleId(id: number) {
  return appRequest.get({
    url: `/role/${id}/menu`
  })
}
