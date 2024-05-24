import appRequest from '@/service'

export function GetUserListData(queryInfo: any) {
  return appRequest.post({
    url: '/user/list',
    // data: {
    //   offset: 0,
    //   size: 10
    // }
    data: queryInfo
  })
}

export function DeleteUserById(id: number) {
  return appRequest.delete({
    url: `/user/${id}`
  })
}

export function CreateUser(userInfo: any) {
  return appRequest.post({
    url: '/user',
    data: userInfo
  })
}

export function EditUserById(id: number, userInfo: any) {
  return appRequest.patch({
    url: `/user/${id}`,
    data: userInfo
  })
}

// 封装：针对页面的网络请求：增删改查
export function GetPageListData(pageName: string, queryInfo: any) {
  return appRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function DeletePageById(pageName: string, id: number) {
  return appRequest.delete({
    url: `/${pageName}/${id}`
  })
}

export function CreatePageData(pageName: string, data: any) {
  return appRequest.post({
    url: `/${pageName}`,
    data: data
  })
}

export function EditPageDataById(pageName: string, id: number, data: any) {
  return appRequest.patch({
    url: `/${pageName}/${id}`,
    data: data
  })
}
