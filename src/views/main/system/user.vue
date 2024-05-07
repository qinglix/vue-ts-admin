<script setup lang="ts">
import UserSearch from '@/ui/main/system/user-search.vue'
import UserContent from '@/ui/main/system/user-content.vue'
import { ref } from 'vue'
import UserModal from '@/ui/main/system/user-modal.vue'

const contentRef = ref<InstanceType<typeof UserContent>>()
const handleQueryClick = (formData: any) => {
  console.log(formData)
  contentRef.value?.fetchUserListData(formData)
}

const handleResetClick = () => {
  contentRef.value?.fetchUserListData()
}

// 对modal组件的操作
const modalRef = ref<InstanceType<typeof UserModal>>()
const handleCreateClick = () => {
  modalRef.value?.setModalVisible()
}

// const handleEditClick = (data: any) => {
//   console.log(data)
//   modalRef.value?.setModalVisible(data)
// }
const handleEditClick = (data: any) => {
  console.log(data)
  modalRef.value?.setModalVisible(false, data)
}
</script>

<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content ref="contentRef" @create-click="handleCreateClick" @edit-click="handleEditClick" />
    <user-modal ref="modalRef" />
  </div>
</template>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
