import { createPinia } from 'pinia'
import useLoginStore from '@/stores/login'
import type { App } from 'vue'

const pinia = createPinia()

function registerStore(app: App<Element>) {
  // 1.usepinia
  app.use(pinia)
  // 2.加载本地数据
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

// export default pinia
export default registerStore
