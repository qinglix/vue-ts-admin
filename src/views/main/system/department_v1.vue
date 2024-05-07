<script setup lang="ts">
import PageSearch from '@/ui/main/system/department/page-search.vue'
import PageContent from '@/ui/main/system/department/page-content.vue'
import PageModal from '@/ui/main/system/department/page-modal.vue'
import { ref } from 'vue'

// 点击search，content的操作
const contentRef = ref<InstanceType<typeof PageContent>>()
const handleQueryClick = (queryInfo: any) => {
  contentRef.value?.fetchPageListData(queryInfo)
}
const handleResetClick = () => {
  contentRef.value?.fetchPageListData()
}

// 点击content，modal的操作
const modalRef = ref<InstanceType<typeof PageModal>>()
const handleCreateClick = () => {
  modalRef.value?.setModalVisible()
}
const handleEditClick = (item: any) => {
  modalRef.value?.setModalVisible(false, item)
}
</script>

<template>
  <div class="department">
    <page-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <page-content ref="contentRef" @create-click="handleCreateClick" @edit-click="handleEditClick" />
    <page-modal ref="modalRef" />
  </div>
</template>

<style scoped>

</style>
