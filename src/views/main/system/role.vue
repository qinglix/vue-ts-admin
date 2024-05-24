<script setup lang="ts">
import PageSearch from '@/components/page-search.vue'
import searchConfig from '@/config/role/search'
import PageContent from '@/components/page-content.vue'
import contentConfig from '@/config/role/content'
import PageModal from '@/components/page-modal.vue'
import modalConfig from '@/config/role/modal'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/stores/main'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/mapmenu'

// 逻辑
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
// const [modalRef, handleCreateClick, handleEditClick] = usePageModal(editCallback)
const [modalRef, handleCreateClick, handleEditClick] = usePageModal(createCallback, editCallback)

// 获取完整菜单数据
const mainStore = useMainStore()
mainStore.getEntireMenusAction()
const { entireMenus } = storeToRefs(mainStore)

// 菜单的处理
const otherInfo = ref({})
const handleElTreeCheck = (data1: any, data2: any) => {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  console.log('menuList', menuList)
  otherInfo.value = { menuList }
}

const treeRef = ref<InstanceType<typeof ElTree>>()

function editCallback(item: any) {
  console.log('edit click', item)
  nextTick(() => {
    const menuIds = mapMenuListToIds(item.menuList)
    console.log('menuIds', menuIds)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}

function createCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
</script>

<template>
  <div class="role">
    <page-search :search-config="searchConfig" @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <page-content :content-config="contentConfig" ref="contentRef" @create-click="handleCreateClick"
                  @edit-click="handleEditClick" />
    <!-- <page-modal :modal-config="modalConfig" ref="modalRef" />-->
    <!-- 使用插槽-->
    <page-modal :modal-config="modalConfig" ref="modalRef" :other-info="otherInfo">
      <template #menuList>
        <el-tree :data="entireMenus" show-checkbox node-key="id"
                 :props="{ children: 'children', label: 'name'}" @check="handleElTreeCheck" ref="treeRef"
                 style="width: 100%" />
      </template>
    </page-modal>
  </div>
</template>

<style lang="less" scoped>
</style>
