const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnText: '新建菜单'
  },
  propsList: [
    // 以下如果需要展开效果，不能填加类型，否则会将原本类型覆盖掉
    { label: '菜单名称', prop: 'name', width: '150' },
    { label: '级别', prop: 'type', width: '80' },
    { label: '菜单url', prop: 'url', width: '200' },
    { label: '菜单icon', prop: 'icon', width: '200' },
    { label: '排序', prop: 'sort', width: '80' },
    { label: '权限', prop: 'permission', width: '200' },

    { type: 'date', label: '创建时间', prop: 'createAt' },
    { type: 'date', label: '更新时间', prop: 'updateAt' },

    { type: 'action', label: '操作', width: '200' }
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      // 将自己的字段匹配为children, 如果是children就无所谓
      children: 'children'
    }
  }
}

export default contentConfig
