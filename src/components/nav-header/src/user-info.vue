<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="30"
          :src="'https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/86d6277f9e2f070847e3804ce324b899a801f29c.jpg'"
        />
        {{ username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="SwitchButton" @click="logout"
            >退出登录</el-dropdown-item
          >
          <el-dropdown-item icon="Avatar">用户信息</el-dropdown-item>
          <el-dropdown-item icon="Tools">系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import localCache from '@/utils/localCache'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const username = store.state.login.userInfo.name
    const router = useRouter()
    const logout = () => {
      localCache.clearCache()
      router.push('/login')
    }
    return { username, logout }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link:focus-visible {
  outline: unset;
}
.el-dropdown-link {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .el-avatar {
    margin-right: 10px;
  }
}
</style>
