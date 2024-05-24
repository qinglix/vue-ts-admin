import appRequest from '@/service'

// 获取全部角色列表
export function GetEntireRoles() {
  return appRequest.post({
    url: '/role/list'
  })
}

// 获取全部部门列表
// export function GetEntireDepartments() {
//   return appRequest.post({
//     url: '/department/list'
//   })
// }

// 获取完整菜单数据
export function GetEntireMenus() {
  return appRequest.post({
    url: '/menu/list'
  })
}
