<template>
  <div class="nav-header">
    <div class="fold">
      <el-icon size="18px" @click="foldChange">
        <component :is="isfold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="info">
      <div class="tab">
        <zx-bread-crumb :breadItems="breadCrumbItems" />
      </div>
      <div class="userinfo">
        <UserInfo />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import ZxBreadCrumb from '@/base-ui/breadCrumb'
import { mapPathToBreadItems } from '@/utils/mapMenus'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

export default defineComponent({
  emits: ['foldChange'],
  components: {
    UserInfo,
    ZxBreadCrumb
  },
  setup(props, { emit }) {
    const isfold = ref(false)

    const breadCrumbItems = computed(() => {
      const route = useRoute()
      const store = useStore()
      const menus = store.state.login.roleMenus
      return mapPathToBreadItems(menus, route.path)
    })

    const foldChange = () => {
      isfold.value = !isfold.value
      emit('foldChange', isfold.value)
    }
    return { foldChange, isfold, breadCrumbItems }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold {
    .el-icon {
      cursor: pointer;
    }
  }
  .fold,
  .tab {
    display: flex;
    align-items: center;
  }
  .info {
    flex: 1;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding-left: 10px;
  }
}
</style>
