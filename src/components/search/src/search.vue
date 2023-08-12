<template>
  <div>
    <div class="user">
      <zx-form v-bind="formConfig" v-model="formData">
        <template #header>
          <!-- <h2>高级检索</h2> -->
        </template>
        <template #footer>
          <div class="btn-area">
            <el-button icon="refresh" @click="refreshInfo">重置</el-button>
            <el-button type="primary" icon="search" @click="handleResearch"
              >查询</el-button
            >
          </div>
        </template>
      </zx-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ZxForm from '@/base-ui/form'

export default defineComponent({
  components: {
    ZxForm
  },
  props: {
    formConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['handleRefresh', 'handleQuery'],
  setup(props, { emit }) {
    const formItems = props.formConfig.formItems || []
    const baseFormData: any = {}
    for (const item of formItems) {
      baseFormData[item.field] = ''
    }

    const formData = ref(baseFormData)
    const refreshInfo = () => {
      // for (const key in baseFormData) {
      //   formData.value[key] = baseFormData[key]
      // }
      formData.value = baseFormData
      emit('handleRefresh')
    }
    const handleResearch = () => {
      emit('handleQuery', formData.value)
    }
    return { formData, refreshInfo, handleResearch }
  }
})
</script>

<style scoped lang="less">
.btn-area {
  text-align: right;
  padding-right: 50px;
  padding-bottom: 20px;
}
.zx-form {
  padding-top: 20px;
}
</style>
