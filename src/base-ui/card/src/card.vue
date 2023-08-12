<template>
  <div class="zx-card">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
        </div>
      </template>
      <div class="text item">
        <slot> </slot>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      prop: String,
      default: '默认Title'
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.el-card {
  font-size: 14px;
  text-align: left;
  ::v-deep .el-card__header {
    padding: 15px;
  }
}
</style>
