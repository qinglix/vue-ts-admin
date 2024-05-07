import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/mapmenu'

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系：path => component
  routes: [
    {
      path: '/',
      redirect(to) {
        return '/main'
      }
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/MainPage.vue')
    },
    {
      path: '/login',
      component: () => import('../views/login/LoginPage.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

// 导航守卫
// to:跳转到的位置，from:从哪里跳转过来
// 返回值:返回值决定导航的路径（不返回或者返回undefined，默认跳转）
router.beforeEach((to, from) => {
  // 只有登录成功(token)，才能进入到main页面
  const token = localCache.getCache('token')
  // if (to.path !== '/login' && !token) {
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  // if (to.path !== '/login' && !localCache.getCache('token')) {
  //   return '/login'
  // }

  // 如果是进入到main
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
