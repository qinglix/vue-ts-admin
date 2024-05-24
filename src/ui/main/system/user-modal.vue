<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMainStore from '@/stores/main'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/stores/system'

const dialogVisible = ref(false)
const isCreateRef = ref(true)
const editData = ref()

// const setModalVisible = (data?: any) => {
//   dialogVisible.value = true
// }

const setModalVisible = (isCreate: boolean = true, data?: any) => {
  dialogVisible.value = true
  isCreateRef.value = isCreate
  if (!isCreate && data) {
    // 编辑数据
    for (const key in formData) {
      formData[key] = data[key]
    }
    editData.value = data
  } else {
    // 新建数据
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

const formData = reactive<any>({
  username: '',
  name: '',
  password: '',
  // cellphone: '',
  enable: '',
  roleId: ''
  // departmentId: ''
})

// 获取roles/departments数据
const mainStore = useMainStore()
mainStore.getEntireRolesAction()
const { entireRoles } = storeToRefs(mainStore)

const systemStore = useSystemStore()
// 点击确认的逻辑
const handleConfirmClick = () => {
  // 1.隐藏dialog
  dialogVisible.value = false
  // 2.创建用户
  // systemStore.addUserAction(formData)
  if (isCreateRef.value) {
    // 创建用户
    console.log(formData)
    systemStore.addUserAction(formData)
  } else {
    // 编辑用户
    console.log(formData)
    systemStore.editUserAction(editData.value.id, formData)
  }
}

// 暴露组件的属性和方法
defineExpose({
  setModalVisible
})
</script>

<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isCreateRef?'新建用户':'编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form v-model="formData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="isCreateRef">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <!--          <el-form-item label="手机号码" prop="cellphone">-->
          <!--            <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />-->
          <!--          </el-form-item>-->
          <el-form-item label="用户状态">
            <el-radio-group v-model="formData.enable">
              <el-radio :value="1">启用</el-radio>
              <el-radio :value="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <!--          <el-form-item label="选择部门" prop="departmentId">-->
          <!--            <el-select v-model="formData.departmentId" placeholder="请选择部门">-->
          <!--              <template v-for="item in entireDepartments" :key="item.id">-->
          <!--                <el-option :label="item.name" :value="item.id" />-->
          <!--              </template>-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
