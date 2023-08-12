<template>
  <div class="user">
    <search-cpn
      :formConfig="formConfig"
      @handleQuery="handleQuery"
      @handleRefresh="handleRefresh"
    />
    <table-cpn
      :tableConfig="tableConfig"
      :pageName="'users'"
      ref="tableCpnRef"
      @createData="createData"
      @updateData="updateData"
    >
      <template #status="scope">
        <el-button
          size="small"
          :type="scope.row.enable ? 'primary' : 'danger'"
          plain
          >{{ scope.row.enable ? '正常' : '异常' }}</el-button
        >
      </template>
    </table-cpn>
    <!-- dialog -->
    <modal-cpn
      :modalFormConfig="newModalFormConfig"
      :rowData="rowData"
      ref="modalCpnRef"
      pageName="users"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
// 封装组件
import formConfig from './config/searchConfig'
import searchCpn from '@/components/search'
import tableCpn from '@/components/content-table'
import tableConfig from './config/tableConfig'
import ModalCpn from '@/components/modal'
import modalFormConfig from './config/modalConfig'
// Hook
import useHandleList from '@/hooks/useHandleList'
import useModal from '@/hooks/useModal'
// 仓库
import { useStore } from '@/store'

export default defineComponent({
  name: 'user',
  components: {
    searchCpn,
    tableCpn,
    ModalCpn
  },
  setup() {
    const { tableCpnRef, handleQuery, handleRefresh } = useHandleList()
    // const searchCpnRef = ref<InstanceType<typeof searchCpn>>()
    // const search = () => {
    //   searchCpnRef.value?.handleResearch()
    // }

    // 添加回调函数，新增显示密码，更新隐藏密码
    const createFallBack = () => {
      const passwordItem = modalFormConfig.formItems.find(
        (value) => value.field === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = false
      }
    }
    const updateFallBack = () => {
      const passwordItem = modalFormConfig.formItems.find(
        (value) => value.field === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = true
      }
    }
    const { createData, updateData, modalCpnRef, rowData } = useModal(
      createFallBack,
      updateFallBack
    )
    //  添加options数据到config中

    const newModalFormConfig = computed(() => {
      const store = useStore()
      const departmentItem = modalFormConfig.formItems.find(
        (value) => value.field === 'departmentId'
      )
      departmentItem!.options = store.state.entryDepartment.map((value) => {
        return { label: value.name, value: value.id }
      })
      const roleItem = modalFormConfig.formItems.find(
        (value) => value.field === 'roleId'
      )
      roleItem!.options = store.state.entryRole.map((value) => {
        return { label: value.name, value: value.id }
      })
      return modalFormConfig
    })

    return {
      formConfig,
      tableConfig,
      handleQuery,
      handleRefresh,
      tableCpnRef,
      newModalFormConfig,
      createData,
      updateData,
      modalCpnRef,
      rowData
    }
  }
})
</script>

<style scoped lang="less"></style>
