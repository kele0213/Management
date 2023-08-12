<template>
  <div class="table">
    <div class="header">
      <div class="header-title">
        <slot name="title">
          <h3>{{ title }}</h3>
        </slot>
      </div>
      <div class="header-handler">
        <slot name="headerHandler"> </slot>
      </div>
    </div>
    <el-table
      :data="dataList"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="isShowSelect"
        type="selection"
        width="55"
        align="center"
      >
      </el-table-column>
      <el-table-column
        v-if="isShowIndex"
        type="index"
        label="序号"
        width="80"
        align="center"
      >
      </el-table-column>
      <template v-for="prop in propList" :key="prop.prop">
        <el-table-column v-bind="prop" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="prop.slotName" :row="scope.row">
              {{ scope.row[prop.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="isShowFooter">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    dataList: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    isShowIndex: {
      type: Boolean,
      default: false
    },
    isShowSelect: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    totalCount: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default() {
        return {
          currentPage: 1,
          pageSize: 10
        }
      }
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    isShowFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selection-change', 'update:page'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any[]) => {
      emit('selection-change', value)
    }
    const handleSizeChange = (pageSize: number) => {
      // console.log((props as any).page)
      emit('update:page', { ...(props as any).page, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...(props as any).page, currentPage })
    }
    return { handleSelectionChange, handleSizeChange, handleCurrentChange }
  }
})
</script>

<style scoped lang="less">
.table {
  padding: 20px 20px;
  border-top: 10px solid #f0f2f5;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
  }
  .footer {
    display: flex;
    justify-content: right;
    padding-top: 20px;
  }
}
</style>
