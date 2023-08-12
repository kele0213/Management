<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadItems" :key="item.label">
        <el-breadcrumb-item :to="{ path: item.url }">
          {{ item.label }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { IBreadItems } from '../types'

export default defineComponent({
  props: {
    breadItems: {
      type: Array as PropType<IBreadItems[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
