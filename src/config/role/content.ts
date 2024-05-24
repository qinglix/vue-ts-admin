const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnText: '新建角色'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '60' },
    { type: 'index', label: '序号', width: '60' },

    { type: 'normal', prop: 'name', label: '角色名称', width: '150' },
    { type: 'normal', prop: 'description', label: '角色描述', width: '180' },

    { type: 'date', prop: 'createAt', label: '创建时间' },
    // { type: 'date', prop: 'updateAt', label: '更新时间' },

    { type: 'action', label: '操作', width: '200' }
  ]
}

export default contentConfig
