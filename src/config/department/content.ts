const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnText: '新建部门'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '60' },
    { type: 'index', label: '序号', width: '60' },

    { type: 'normal', prop: 'name', label: '部门名称', width: '150' },
    { type: 'normal', prop: 'leader', label: '部门领导', width: '150' },
    { type: 'custom', prop: 'leader', label: '部门领导', width: '150', slotName: 'leader' },
    { type: 'normal', prop: 'parentId', label: '上级部门', width: '150' },

    { type: 'date', prop: 'createAt', label: '创建时间' },
    { type: 'date', prop: 'updateAt', label: '更新时间' },

    { type: 'action', label: '操作', width: '200' }
  ]
}

export default contentConfig
