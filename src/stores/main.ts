import { defineStore } from 'pinia'
import type { IMainStore } from '@/stores/type'
import { GetEntireMenus, GetEntireRoles } from '@/service/modules/main'

const useMainStore = defineStore('main', {
  state: (): IMainStore => ({
    entireRoles: [],
    // entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    // async getEntireDataAction() {
    //   const roleResult = await GetEntireRoles()
    //   // const departmentResult = await GetEntireDepartments()
    //   const menuResult = await GetEntireMenus()
    //   console.log(roleResult, menuResult)
    //   // 保存数据
    //   this.entireRoles = roleResult.data.list
    //   // this.entireDepartments = departmentResult.data.list
    //   this.entireMenus = menuResult.data.list
    // },
    async getEntireRolesAction() {
      const roleResult = await GetEntireRoles()
      // console.log(roleResult)
      this.entireRoles = roleResult.data.list
      console.log(this.entireRoles)
    },
    async getEntireMenusAction() {
      const menuResult = await GetEntireMenus()
      // console.log(menuResult)
      this.entireMenus = menuResult.data.list
    }
  }
})

export default useMainStore
