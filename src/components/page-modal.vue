<script setup lang="ts">
import {reactive, ref} from 'vue'
// import useMainStore from '@/stores/main'
// import { storeToRefs } from 'pinia'
import useSystemStore from '@/stores/system'
import type {IModalProps} from '@/types'
import {AssignRoleMenu} from "@/service/modules/system";

// interface IProps {
//   modalConfig: {
//     header: {
//       createTitle: string
//       editTitle: string
//     }
//     formItems: any[]
//   }
// }

// 定义props
const props = defineProps<IModalProps>()

const dialogVisible = ref(false)
const isCreateRef = ref(true)
const editData = ref()

// 定义formData
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialData)
console.log('formData', formData)

// 获取departments数据
// const mainStore = useMainStore()
// const { entireDepartments } = storeToRefs(mainStore)

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
    console.log(editData.value.id)
  } else {
    // 新建数据
    for (const key in formData) {
      const item = props.modalConfig.formItems.find((item: any) => item.prop === key)
      formData[key] = item ? item.initialValue : ''
    }
    editData.value = null
  }
}

// 点击确认的逻辑
const handleConfirmClick = () => {
  // 1.隐藏dialog
  dialogVisible.value = false

  // 处理菜单的逻辑
  let infoData = formData
  if (props.otherInfo) {
    infoData = {...infoData, ...props.otherInfo}
  }

  console.log('infoData', infoData)

  if (!isCreateRef.value && editData.value) {
    // 编辑
    // systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, formData)
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, infoData)
  } else {
    // 创建
    // systemStore.addPageDataAction(props.modalConfig.pageName, formData)
    systemStore.addPageDataAction(props.modalConfig.pageName, infoData)
  }
}

// 暴露组件的属性和方法
defineExpose({setModalVisible})
</script>

<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isCreateRef?modalConfig.header.createTitle:modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form v-model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder"/>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value"/>
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
