<template>
  <div class="goods">
    <table-cpn :tableConfig="tableConfig" pageName="goods">
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :zoom-rate="1.0"
          :preview-src-list="[scope.row.imgUrl]"
          :initial-index="1"
          fit="cover"
          preview-teleported
        />
      </template>
      <template #status="scope">
        <el-button
          size="small"
          :type="scope.row.status ? 'primary' : 'danger'"
          plain
          >{{ scope.row.status ? '正常' : '异常' }}</el-button
        >
      </template>
    </table-cpn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TableCpn from '@/components/content-table'
import tableConfig from './config/tableConfig'

export default defineComponent({
  name: 'goods',
  components: {
    TableCpn
  },
  setup() {
    return { tableConfig }
  }
})
</script>

<style scoped></style>
