import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'

export let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]) {
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

  // 1.加载本地路由
  const localRoutes = loadLocalRoutes()

  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 解决面包屑跳转到父栏目的问题
        // 1.给route的顶层菜单增加重定向功能(但是只需要添加一次)
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        // routes.push({ path: menu.url, redirect: menu.children[0].url })

        // 2.将二级菜单对应的路由添加到routes中
        routes.push(route)
      }

      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

function loadLocalRoutes() {
  // 1.动态获取所有的路由对象，放到数组中
  // * 路由对象都在独立的文件中
  // * 从文件中将所有路由对象先读取到数组中
  const localRoutes: RouteRecordRaw[] = []
  // 1.1.读取router/main下所有的ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  console.log(files)
  // 1.2.将加载的对象放到localRoutes中
  for (const key in files) {
    const module = files[key]
    console.log(module.default)
    localRoutes.push(module.default)
  }
  console.log(localRoutes)

  return localRoutes
}

// 根据路径匹配需要显示的菜单
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

interface IBreadcrumbs {
  name: string
  path: string
}

export function mapPathToBreadcrumb(path: string, userMenus: any[]) {
  // 1.定义面包屑
  const breadcrumbs: IBreadcrumbs[] = []

  // 2.遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 1.顶层菜单
        breadcrumbs.push({
          name: menu.name,
          path: menu.url
        })
        // 2.匹配菜单
        breadcrumbs.push({
          name: submenu.name,
          path: submenu.url
        })
      }
    }
  }
  return breadcrumbs
}

// 菜单映射到id
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menuList: any[]) {
    for (const item of menuList) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }

  recurseGetId(menuList)

  return ids
}


/*
* @description: 从菜单映射按钮的权限
* @param menuList 菜单的列表
* @returns 按钮的权限(字符串数组)
 */
export function mapMenusToPermissions(menuList: any[]) {
  const permissions: string[] = []

  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }

  recurseGetPermission(menuList)

  return permissions
}
