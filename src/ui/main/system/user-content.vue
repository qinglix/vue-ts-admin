<script setup lang="ts">
import useSystemStore from '@/stores/system'
import {storeToRefs} from 'pinia'
import {formatUTCDate} from '@/utils/format'
import {ref} from 'vue'
import usePermissions from '@/hooks/usePermissions'

// 定义自定义事件
const emit = defineEmits(['create-click', 'edit-click'])

// 用户页面的权限判断
const isCreate = usePermissions('user:create')
const isUpdate = usePermissions('user:update')
const isDelete = usePermissions('user:delete')
const isQuery = usePermissions('user:query')

console.log('Permission:', isCreate, isUpdate, isDelete, isQuery)

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()
// systemStore.getUsersListAction()

const currentPage = ref(1)
const pageSize = ref(10)

fetchUserListData()

// 2.获取usersList数据，进行展示
// 坑：第一次页面请求的时候，由于是异步请求，所有此时的usersList是个空的数组
// const usersList = systemStore.usersList
const {usersList, usersTotalCount} = storeToRefs(systemStore)

// 3.分页相关逻辑
const handleSizeChange = () => {
  console.log(pageSize.value)
  fetchUserListData()
}

const handleCurrentChange = () => {
  console.log(currentPage.value)
  fetchUserListData()
}

// 4.定义函数，用于发送网络请求
function fetchUserListData(formData: any = {}) {
  if (!isQuery) return

  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = {size, offset}

  // 2.发送网络请求
  const queryInfo = {...info, ...formData}
  // systemStore.getUsersListAction(info)
  systemStore.getUsersListAction(queryInfo)
}

// 删除操作
const handleDeleteUserBtnClick = (id: number) => {
  systemStore.deleteUserByIdAction(id)
}

// 新增用户操作
const handleCreateUserBtnClick = () => {
  emit('create-click')
}

// 编辑操作
const handleEditUserClick = (itemData: any) => {
  console.log("itemData:", itemData)
  emit('edit-click', itemData)
}

// 暴露函数给父组件
defineExpose({
  fetchUserListData
})
</script>

<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleCreateUserBtnClick" v-if="isCreate">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50"/>
        <el-table-column align="center" type="index" label="序号" width="80"/>
        <el-table-column align="center" prop="username" label="用户名" width="150"/>
        <el-table-column align="center" prop="name" label="姓名" width="150"/>
        <!--        <el-table-column align="center" prop="cellphone" label="手机号码" width="150" />-->
        <el-table-column align="center" prop="enable" label="状态" width="90">
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-button size="small" :type="scope.row.enable ? 'success' : 'warning'" plain>
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTCDate(scope.row.createAt) }}
          </template>
        </el-table-column>
        <!--        <el-table-column align="center" prop="updateAt" label="更新时间">-->
        <!--          <template #default="scope">-->
        <!--            {{ formatUTCDate(scope.row.updateAt) }}-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column align="center" prop="role.name" label="角色" width="150"/>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button size="default" text bg type="primary" icon="Edit" @click="handleEditUserClick(scope.row)"
                       v-if="isUpdate">
              编辑
            </el-button>
            <el-button size="default" text bg type="danger" icon="Delete"
                       @click="handleDeleteUserBtnClick(scope.row.id)" v-if="isDelete">删除
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
        :total="usersTotalCount"
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
      height: 66px;
    }

    .el-button {
      margin-left: 2px;
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
