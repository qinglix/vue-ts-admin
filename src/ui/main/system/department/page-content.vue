<script setup lang="ts">
import useSystemStore from '@/stores/system'
import { storeToRefs } from 'pinia'
import { formatUTCDate } from '@/utils/format'
import { ref } from 'vue'

// 定义自定义事件
const emit = defineEmits(['create-click', 'edit-click'])

// 1.发起action，请求list的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
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
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }

  // 2.发送网络请求
  const queryInfo = { ...info, ...formData }
  // systemStore.getUsersListAction(info)
  systemStore.getPageListAction('department', queryInfo)
}

// 删除操作
const handleDeleteBtnClick = (id: number) => {
  systemStore.deletePageByIdAction('department', id)
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
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleCreateBtnClick">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="60" />
        <el-table-column align="center" type="index" label="序号" width="60" />

        <el-table-column align="center" prop="name" label="部门名称" width="150" />
        <el-table-column align="center" prop="leader" label="部门领导" width="150" />
        <el-table-column align="center" prop="parentId" label="上级部门" width="150" />
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTCDate(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTCDate(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template #default="scope">
            <el-button size="default" text bg type="primary" icon="Edit" @click="handleEditBtnClick(scope.row)">
              编辑
            </el-button>
            <el-button size="default" text bg type="danger" icon="Delete"
                       @click="handleDeleteBtnClick(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
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
