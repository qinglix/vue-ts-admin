<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMainStore from '@/stores/main'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/stores/system'

const dialogVisible = ref(false)
const isCreateRef = ref(true)
const editData = ref()

const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})

// 获取departments数据
const mainStore = useMainStore()
const { entireDepartments } = storeToRefs(mainStore)

const systemStore = useSystemStore()

// 设置dialogVisible的方法
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

// 点击确认的逻辑
const handleConfirmClick = () => {
  // 1.隐藏dialog
  dialogVisible.value = false
  if (!isCreateRef.value && editData.value) {
    // 编辑部门
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    // 创建部门
    systemStore.addPageDataAction('department', formData)
  }
}

// 暴露组件的属性和方法
defineExpose({ setModalVisible })
</script>

<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isCreateRef?'新建部门':'编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form v-model="formData" label-width="80px" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导" />
          </el-form-item>
          <el-form-item label="选择部门" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择部门">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
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
