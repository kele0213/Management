<template>
  <div class="table-cpn">
    <zx-table
      v-bind="tableConfig"
      :dataList="dataList"
      :totalCount="dataCount"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button type="primary" icon="Plus" v-if="createA" @click="createData"
          >新增数据</el-button
        >
        <el-button icon="refresh"></el-button>
      </template>
      <!-- <template #status="scope">
        <el-button
          size="small"
          :type="scope.row.enable === 1 ? 'primary' : 'danger'"
          plain
          >{{ scope.row.enable === 1 ? '正常' : '异常' }}</el-button
        >
      </template> -->
      <template #createTime="scope">
        <span> {{ $filter.formatUTCtoTime(scope.row.createAt) }} </span>
      </template>
      <template #updateTime="scope">
        <span> {{ $filter.formatUTCtoTime(scope.row.updateAt) }} </span>
      </template>
      <template #handler="scope">
        <el-link
          icon="edit"
          :underline="false"
          type="primary"
          v-if="updateA"
          @click="updateData(scope.row)"
          >编辑</el-link
        >
        <el-link
          icon="delete"
          :underline="false"
          type="primary"
          v-if="deleteA"
          @click="deleteData(scope.row)"
          >删除</el-link
        >
      </template>
      <template
        v-for="item in allSlotNames"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </zx-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import ZxTable from '@/base-ui/table'
import { useStore } from '@/store'
import usePermission from '@/hooks/usePermission'

export default defineComponent({
  components: { ZxTable },
  props: {
    pageName: {
      type: String,
      required: true
    },
    tableConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['createData', 'updateData'],
  setup(props, { emit }) {
    const store = useStore()
    // 监听分页器修改
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })
    watch(pageInfo, () => {
      search()
    })
    // 按钮权限确定
    const updateA = usePermission(props.pageName, 'update')
    const createA = usePermission(props.pageName, 'create')
    const queryA = usePermission(props.pageName, 'query')
    const deleteA = usePermission(props.pageName, 'delete')

    // 菜单查询
    const search = (queryInfo: any = {}) => {
      if (!queryA) return
      store.dispatch('system/getPageListAction', {
        pageName: `${props.pageName}`,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    search()
    // 获取数据
    const dataList = computed(() =>
      store.getters['system/getPageDataList'](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['system/getPageDataCount'](props.pageName)
    )

    // 获取动态插槽名称
    const allSlotNames = props.tableConfig?.propList.filter((item: any) => {
      if (item.slotName === 'createTime') return false
      if (item.slotName === 'updateTime') return false
      if (item.slotName === 'handler') return false
      return true
    })
    // 删除/新增/更新数据
    const deleteData = (data: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: data.id
      })
    }
    const createData = () => {
      emit('createData')
    }
    const updateData = (item: any) => {
      emit('updateData', item)
    }

    return {
      dataList,
      search,
      dataCount,
      pageInfo,
      allSlotNames,
      updateA,
      createA,
      deleteA,
      deleteData,
      createData,
      updateData
    }
  }
})
</script>

<style scoped lang="less">
.el-link {
  padding: 0 5px;
  font-size: 12px;
}
</style>
