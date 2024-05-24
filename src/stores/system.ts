import { defineStore } from 'pinia'
import {
  CreateUser,
  DeleteUserById,
  GetUserListData,
  EditUserById,
  GetPageListData,
  DeletePageById, CreatePageData, EditPageDataById
} from '@/service/modules/system'
import type { ISystemState } from '@/stores/type'
import useMainStore from '@/stores/main'

// interface IUser {
//   id: number
//   name: string
//   realname: string
//   cellphone: number
//   enable: number
//   departmentId: number
//   roleId: number
//   createAt: string
//   updateAt: string
// }

// interface ISystemState {
//   // usersList: any[]
//   usersList: IUser[]
//   usersTotalCount: number
// }

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async getUsersListAction(queryInfo: any) {
      const usersListResult = await GetUserListData(queryInfo)
      // console.log('usersListResult:', usersListResult)
      const { list, totalCount } = usersListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      // 1.删除数据操作
      const res = await DeleteUserById(id)
      console.log(res)

      // 2.重新请求新的数据
      this.getUsersListAction({ offset: 0, size: 10 })

      // 获取最新完整的数据
      const mainStore = useMainStore()
      // mainStore.getEntireDataAction()
      mainStore.getEntireRolesAction()
    },
    async addUserAction(userInfo: any) {
      console.log(userInfo)
      const res = await CreateUser(userInfo)
      // console.log(res)
      // 重新请求最新的数据
      this.getUsersListAction({ offset: 0, size: 10 })

      // 获取最新完整的数据
      const mainStore = useMainStore()
      // mainStore.getEntireDataAction()
      mainStore.getEntireRolesAction()
    },
    async editUserAction(id: number, userInfo: any) {
      const editRes = await EditUserById(id, userInfo)
      // console.log(editRes)
      // 重新请求最新的数据
      this.getUsersListAction({ offset: 0, size: 10 })

      // 获取最新完整的数据
      const mainStore = useMainStore()
      // mainStore.getEntireDataAction()
      mainStore.getEntireRolesAction()
    },
    // 封装：针对页面的数据：增删改查
    async getPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await GetPageListData(pageName, queryInfo)
      // console.log('getPageListAction:', pageListResult)
      const { list, totalCount } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      try {
        // 1.删除数据操作
        const res = await DeletePageById(pageName, id)
        // console.log('deletePageByIdAction:', res)

        // 2.重新请求新的数据
        this.getPageListAction(pageName, { offset: 0, size: 10 })

        // 获取最新完整的数据
        const mainStore = useMainStore()
        // mainStore.getEntireDataAction()
        mainStore.getEntireMenusAction()
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    async addPageDataAction(pageName: string, data: any) {
      try {
        const res = await CreatePageData(pageName, data)
        // console.log(res)
        // 重新请求最新的数据
        this.getPageListAction(pageName, { offset: 0, size: 10 })

        // 获取最新完整的数据
        const mainStore = useMainStore()
        // mainStore.getEntireDataAction()
        mainStore.getEntireMenusAction()
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    async editPageDataAction(pageName: string, id: number, data: any) {
      try {
        const editRes = await EditPageDataById(pageName, id, data)
        // console.log(editRes)
        // 重新请求最新的数据
        this.getPageListAction(pageName, { offset: 0, size: 10 })

        // 获取最新完整的数据
        const mainStore = useMainStore()
        // mainStore.getEntireDataAction()
        mainStore.getEntireMenusAction()
      } catch (err) {
        console.error(err)
        throw err
      }
    }
  }
})

export default useSystemStore
