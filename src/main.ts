import 'normalize.css'
import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
// import pinia from '@/stores'
import store from '@/stores'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 针对ElMessage等组件单独引入样式
import 'element-plus/theme-chalk/el-message.css'
import useLoginStore from '@/stores/login'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// app.use(pinia)
// const loginStore = useLoginStore()
// loginStore.loadLocalCacheAction()
app.use(store)

app.use(router)
app.mount('#app')
