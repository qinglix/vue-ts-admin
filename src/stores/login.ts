import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenuByRoleId } from '@/service/modules/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import type { RouteRecordRaw } from 'vue-router'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/mapmenu'
import useMainStore from '@/stores/main'

interface ILoginState {
  // id: number
  token: string
  userInfo: any
  userMenus: any,
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  // 指定state的类型
  state: (): ILoginState => ({
    // token: '',
    // token: localStorage.getItem('token') ?? '',
    // token: localCache.getCache('token') ?? '',
    // // id: '',
    // // userInfo: {},
    // // userMenus: []
    // userInfo: localCache.getCache('userInfo') ?? {},
    // userMenus: localCache.getCache('userMenus') ?? []
    // id: -1,
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async accountLoginAction(account: { username: string; password: string }) {
      // 1.登录逻辑获取token
      const loginResult = await accountLoginRequest(account)
      // console.log('loginResult:', loginResult)
      this.token = loginResult.data.token
      const id = loginResult.data.id

      // 2.进行本地缓存
      localCache.setCache('token', this.token)
      // console.log(this.token)

      // 获取登录用户的详细信息(角色信息)
      const userInfoResult = await getUserInfoById(id)
      // console.log('userInfoResult:', userInfoResult)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 根据角色请求用户的权限(菜单)
      const userMenusResult = await getUserMenuByRoleId(this.userInfo.role.id)
      // console.log('userMenusResult:', userMenusResult)
      // this.userMenus = userMenusResult.data
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 请求所有roles/departments数据
      // const mainStore = useMainStore()
      // mainStore.getEntireDataAction()

      // 重要：获取登录用户所有按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions

      // 重要：动态添加路由
      // // 1.动态获取所有的路由对象，放到数组中
      // // * 路由对象都在独立的文件中
      // // * 从文件中将所有路由对象先读取到数组中
      // const localRoutes: RouteRecordRaw[] = []
      // // 1.1.读取router/main下所有的ts文件
      // const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
      //   eager: true
      // })
      // console.log(files)
      // // 1.2.将加载的对象放到localRoutes中
      // for (const key in files) {
      //   const module = files[key]
      //   console.log(module.default)
      //   localRoutes.push(module.default)
      // }
      // console.log(localRoutes)
      //
      // // 2.根据菜单去匹配正确的路由
      // for (const menu of userMenus) {
      //   for (const submenu of menu.children) {
      //     const route = localRoutes.find((item) => item.path === submenu.url)
      //     if (route) router.addRoute('main', route)
      //   }
      // }

      const routes = mapMenusToRoutes(userMenus) || []
      routes.forEach((route) => router.addRoute('main', route))

      // 3.页面跳转
      router.push('/main')
    },
    async loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')

      // 请求新的数据

      if (token && userInfo && userMenus) {
        // 说明用户已经登录
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 请求所有roles/departments数据
        // const mainStore = useMainStore()
        // mainStore.getEntireDataAction()

        // 获取按钮的权限
        const permissions = mapMenusToPermissions(userMenus)
        this.permissions = permissions

        // 2.动态添加路由
        const routes = mapMenusToRoutes(userMenus) || []
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
