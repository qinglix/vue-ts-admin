<script setup lang="ts">
import useSystemStore from '@/stores/system'
import { storeToRefs } from 'pinia'
import { formatUTCDate } from '@/utils/format'
import { ref } from 'vue'
import useLoginStore from '@/stores/login'
import usePermissions from '@/hooks/usePermissions'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnText?: string
    }
    propsList: any[],
    childrenTree?: any
  }
}

const props = defineProps<IProps>()

// 定义自定义事件
const emit = defineEmits(['create-click', 'edit-click'])

// 获取是否有对应的增删改查权限
// const loginStore = useLoginStore()
// const { permissions } = loginStore
// const isCreate = permissions.find(item => item.includes(`${props.contentConfig.pageName}:create`))
// const isUpdate = permissions.find(item => item.includes(`${props.contentConfig.pageName}:update`))
// const isDelete = permissions.find(item => item.includes(`${props.contentConfig.pageName}:delete`))
// const isQuery = permissions.find(item => item.includes(`${props.contentConfig.pageName}:query`))
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

// 1.发起action，请求list的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)

// 监听systemStore中的actions被执行
systemStore.$onAction(({ name, after }) => {
  console.log('监听systemStore中的actions被执行', name)

  after(() => {
    if (name === 'deletePageByIdAction' || name === 'editPageDataAction' || name === 'addPageDataAction') {
      currentPage.value = 1
    }
  })
})

fetchPageListData()

// 2.获取list数据，进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)
console.log(pageList)

// 3.分页相关逻辑
const handleSizeChange = () => {
  fetchPageListData()
}

const handleCurrentChange = () => {
  fetchPageListData()
}

// 4.定义函数，用于发送网络请求
function fetchPageListData(formData: any = {}) {
  if (!isQuery) return

  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }

  // 2.发送网络请求
  const queryInfo = { ...info, ...formData }
  // systemStore.getUsersListAction(info)
  systemStore.getPageListAction(props.contentConfig.pageName, queryInfo)
}

// 删除操作
const handleDeleteBtnClick = (id: number) => {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}

// 新增用户操作
const handleCreateBtnClick = () => {
  emit('create-click')
}

// 编辑操作
const handleEditBtnClick = (itemData: any) => {
  emit('edit-click', itemData)
}

// 暴露函数给父组件
defineExpose({ fetchPageListData })
</script>

<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="handleCreateBtnClick" v-if="isCreate">
        {{ contentConfig?.header?.btnText ?? '新建数据' }}
      </el-button>
    </div>
    <div class="table">
      <!--      <el-table :data="pageList" border style="width: 100%" row-key="id">-->
      <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type ==='date'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTCDate(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type==='action'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button size="default" text bg type="primary" icon="Edit" @click="handleEditBtnClick(scope.row)"
                           v-if="isUpdate">
                  编辑
                </el-button>
                <el-button size="default" text bg type="danger" icon="Delete"
                           @click="handleDeleteBtnClick(scope.row.id)" v-if="isDelete">删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <!--          <template v-else-if="item.type==='custom'">-->
          <!--            <el-table-column align="center" v-bind="item">-->
          <!--              <template #default="scope">-->
          <!--                <slot :name="item.slotName" v-bind="scope"></slot>-->
          <!--              </template>-->
          <!--            </el-table-column>-->
          <!--          </template>-->
          <template v-else-if="item.type==='custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.content {
  background-color: #fff;
  margin-top: 15px;
  padding: 15px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;

    .title {
      font-size: 22px;
      font-weight: 600;
    }
  }

  .table {
    :deep(.el-table__cell) {
      padding: 12px 0;
      //height: 66px;

      .cell {
        display: flex;
        justify-content: center;
        gap: 10px;
      }
    }

    .el-button {
      margin-left: 0;
      padding: 5px 8px;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
