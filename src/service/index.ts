import { BASE_URL, TIME_OUT } from './config'
import AppRequest from './request'
import { localCache } from '@/utils/cache'
import router from '@/router'

const appRequest = new AppRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 增加拦截器，后续每个请求自动携带token
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache('token')
      if (config.headers && token) { // 类型缩小
        // config.headers!.Authorization = 'Bear ' + localCache.getCache('token')
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    },
    responseSuccessFn: (res) => {
      if (res.status === 401 || res.status === 403) {
        localCache.clearCache()
        router.push('/login')
      }
      return res
    }
  }
})

export default appRequest
