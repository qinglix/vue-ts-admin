import type {IModalConfig} from '@/types'

const modalConfig: IModalConfig = {
  pageName: 'role',
  header: {
    createTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    {type: 'input', label: '角色名称', prop: 'name', placeholder: '请输入角色名称'},
    {type: 'input', label: '权限描述', prop: 'description', placeholder: '请输入角色权限描述'},
    // 自定义插槽
    {type: 'custom', slotName: 'menuList'}
  ]
}

export default modalConfig
