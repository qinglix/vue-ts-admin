import { ref } from 'vue'
import PageModal from '@/components/page-modal.vue'

// type EditFnType = (data: any) => void
type CallBackFnType = (data?: any) => void

function usePageModal(createCallback?: CallBackFnType, editCallback?: CallBackFnType) {
// function usePageModal(editCallback?: EditFnType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  const handleCreateClick = () => {
    modalRef.value?.setModalVisible()
    if (createCallback) createCallback()
  }
  const handleEditClick = (item: any) => {
    // 1.让modal显示出来
    modalRef.value?.setModalVisible(false, item)
    console.log('item', item)
    console.log('item', { ...item })
    // 2.编辑的回调
    if (editCallback) editCallback(item)
  }

  // return { modalRef, handleCreateClick, handleEditClick }

  // 使用元组，有严格的顺序要求
  return [modalRef, handleCreateClick, handleEditClick]
}

export default usePageModal
