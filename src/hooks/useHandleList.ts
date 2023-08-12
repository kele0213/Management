import { ref } from 'vue'
import tableCpn from '@/components/content-table'

export default function useHandleList() {
  const tableCpnRef = ref<InstanceType<typeof tableCpn>>()
  const handleRefresh = () => {
    tableCpnRef.value?.search()
  }
  const handleQuery = (queryInfo: any) => {
    // console.log(queryInfo)
    tableCpnRef.value?.search(queryInfo)
  }
  return {
    tableCpnRef,
    handleRefresh,
    handleQuery
  }
}
