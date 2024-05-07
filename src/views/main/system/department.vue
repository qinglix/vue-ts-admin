<script setup lang="ts">
import { computed, ref } from 'vue'
import PageSearch from '@/components/page-search.vue'
import PageContent from '@/components/page-content.vue'
import PageModal from '@/components/page-modal.vue'
import searchConfig from '@/config/department/search'
import contentConfig from '@/config/department/content'
import modalConfig from '@/config/department/modal'
import useMainStore from '@/stores/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })

  return modalConfig
})

// 点击search，content的操作
// const contentRef = ref<InstanceType<typeof PageContent>>()
// const handleQueryClick = (queryInfo: any) => {
//   contentRef.value?.fetchPageListData(queryInfo)
// }
// const handleResetClick = () => {
//   contentRef.value?.fetchPageListData()
// }

// 使用hook
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 点击content，modal的操作
// const modalRef = ref<InstanceType<typeof PageModal>>()
// const handleCreateClick = () => {
//   modalRef.value?.setModalVisible()
// }
// const handleEditClick = (item: any) => {
//   modalRef.value?.setModalVisible(false, item)
// }

// const { modalRef, handleCreateClick, handleEditClick } = usePageModal()
const [modalRef, handleCreateClick, handleEditClick] = usePageModal()
</script>

<template>
  <div class="department">
    <page-search @query-click="handleQueryClick" @reset-click="handleResetClick" :search-config="searchConfig" />
    <!--    <page-content ref="contentRef" @create-click="handleCreateClick" @edit-click="handleEditClick"-->
    <!--                  :content-config="contentConfig" />-->
    <page-content ref="contentRef" @create-click="handleCreateClick" @edit-click="handleEditClick"
                  :content-config="contentConfig">
      <template #leader="scope">
        <!--        <span class="leader">{{ scope.row.leader }} 组长</span>-->
        <span class="leader">{{ scope.row[scope.prop] }} 组长</span>
      </template>
    </page-content>
    <!--    <page-modal ref="modalRef" :modal-config="modalConfig" />-->
    <page-modal ref="modalRef" :modal-config="modalConfigRef" />
  </div>
</template>

<style scoped>
.leader {
  color: red;
}
</style>
