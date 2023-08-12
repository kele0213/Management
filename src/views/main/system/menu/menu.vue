<template>
  <div class="menu">
    <table-cpn :tableConfig="tableConfig" pageName="menu"></table-cpn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TableCpn from '@/components/content-table'
import tableConfig from './config/tableConfig'

export default defineComponent({
  name: 'ts-menu',
  components: {
    TableCpn
  },
  setup() {
    return { tableConfig }
  }
})
</script>

<style scoped></style>
