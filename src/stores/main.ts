import { defineStore } from 'pinia'
import type { IMainStore } from '@/stores/type'
import { GetEntireDepartments, GetEntireMenus, GetEntireRoles } from '@/service/modules/main'

const useMainStore = defineStore('main', {
  state: (): IMainStore => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    async getEntireDataAction() {
      const roleResult = await GetEntireRoles()
      const departmentResult = await GetEntireDepartments()
      const menuResult = await GetEntireMenus()
      console.log(roleResult, departmentResult, menuResult)
      // 保存数据
      this.entireRoles = roleResult.data.list
      this.entireDepartments = departmentResult.data.list
      this.entireMenus = menuResult.data.list
    }
  }
})

export default useMainStore
