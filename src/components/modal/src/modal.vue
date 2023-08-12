<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新增数据"
      width="30%"
      center
      destroy-on-close
    >
      <zx-form v-bind="modalFormConfig" v-model="propData" />
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="commitData"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import ZxForm from '@/base-ui/form'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    ZxForm
  },
  props: {
    modalFormConfig: {
      type: Object,
      required: true
    },
    rowData: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const propData = ref<any>({})
    watch(
      () => props.rowData,
      (newValue) => {
        for (const item of props.modalFormConfig.formItems) {
          propData.value[item.field] = newValue[item.field]
        }
      }
    )
    const store = useStore()
    const commitData = () => {
      if (Object.keys(props.rowData).length) {
        // 更新
        store.dispatch('system/updatePageDataAction', {
          pageName: props.pageName,
          id: props.rowData.id,
          newData: { ...propData.value, ...props.otherInfo }
        })
      } else {
        // 新增
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...propData.value, ...props.otherInfo }
        })
      }

      dialogVisible.value = false
    }
    return { dialogVisible, propData, commitData }
  }
})
</script>

<style scoped></style>
