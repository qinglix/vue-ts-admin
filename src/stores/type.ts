export interface IUser {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}

export interface ISystemState {
  // usersList: any[]
  usersList: IUser[]
  usersTotalCount: number

  pageList: any[]
  pageTotalCount: number
}

export interface IMainStore {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}
