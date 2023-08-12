<template>
  <div class="role">
    <search-cpn :formConfig="formConfig" />
    <table-cpn
      :tableConfig="tableConfig"
      :pageName="'role'"
      @createData="createData"
      @updateData="updateData"
    />
    <modal-cpn
      :modalFormConfig="modalFormConfig"
      ref="modalCpnRef"
      :rowData="rowData"
      pageName="role"
      :otherInfo="otherInfo"
    >
      <!-- 树形结构 -->
      <el-tree
        :data="menuList"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="changeOtherInfo"
        ref="elTreeRef"
      />
    </modal-cpn>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import tableCpn from '@/components/content-table'
import tableConfig from './config/tableConfig'
import formConfig from './config/searchConfig'
import searchCpn from '@/components/search'
import ModalCpn from '@/components/modal'
import modalFormConfig from './config/modalConfig'
import useModal from '@/hooks/useModal'
import { useStore } from '@/store'
import { mapMenuToLeaf } from '@/utils/mapMenus'
import { ElTree } from 'element-plus'

export default defineComponent({
  name: 'role',
  components: {
    tableCpn,
    searchCpn,
    ModalCpn
  },
  setup() {
    // 利用回调进行回显
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const updataCallBackFn = (item: any) => {
      const leaves = mapMenuToLeaf(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leaves)
      })
    }
    const { modalCpnRef, rowData, createData, updateData } = useModal(
      undefined,
      updataCallBackFn
    )
    // 获取并传入menuList参数
    const store = useStore()
    const menuList = computed(() => store.state.entryMenu)
    const otherInfo = ref({})
    const changeOtherInfo = (data1: any, data2: any) => {
      let list: number[] = []
      list = [...data2.checkedKeys, ...data2.halfCheckedKeys]
      otherInfo.value = { menuList: list }
    }
    return {
      tableConfig,
      formConfig,
      modalFormConfig,
      modalCpnRef,
      rowData,
      createData,
      updateData,
      menuList,
      changeOtherInfo,
      otherInfo,
      elTreeRef
    }
  }
})
</script>

<style scoped></style>
