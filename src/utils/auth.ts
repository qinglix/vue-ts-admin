import { localCache } from '@/utils/cache'
import router from '@/router'

export function isTokenExpired(token: string) {
  const payload = token.split('.')[1]
  const decoded = atob(payload)
  const { exp } = JSON.parse(decoded)
  return Date.now() >= exp * 1000
}

export function checkTokenAndLogout() {
  const token = localCache.getCache('token')
  if (token && isTokenExpired(token)) {
    localCache.clearCache()
    router.push('/login')
  }
}
