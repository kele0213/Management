import { ref } from 'vue'
import ModalCpn from '@/components/modal'
type FallBackFn = (item?: any) => void
export default function (
  createFallBack?: FallBackFn,
  updateFallBack?: FallBackFn
) {
  const modalCpnRef = ref<InstanceType<typeof ModalCpn>>()
  const rowData = ref({})
  const createData = () => {
    if (modalCpnRef.value) {
      rowData.value = {}
      modalCpnRef.value.dialogVisible = true
    }
    createFallBack && createFallBack()
  }
  const updateData = (item: any) => {
    rowData.value = { ...item }
    if (modalCpnRef.value) {
      modalCpnRef.value.dialogVisible = true
    }
    updateFallBack && updateFallBack(item)
  }
  return {
    modalCpnRef,
    rowData,
    createData,
    updateData
  }
}
