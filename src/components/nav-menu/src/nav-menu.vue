<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/images/logo.svg" />
      <span class="title" v-if="!iscollapse">Vue3 + TS</span>
    </div>
    <el-menu
      :default-active="defaultMenu"
      class="el-menu-vertical"
      text-color="#b7bdc3"
      background-color="#0c2135"
      :collapse="iscollapse"
    >
      <template v-for="item in menus" :key="item.id">
        <template v-if="item.type === 1">
          <!-- 有子目录 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon size="12px">
                <component v-if="item.icon" :is="item.icon.substring(8)" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 子目录 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="changePage(subitem)"
              >
                <template #title>
                  <el-icon size="12px">
                    <component
                      v-if="subitem.icon"
                      :is="subitem.icon.substring(8)"
                    />
                  </el-icon>
                  <span>{{ subitem.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <!-- 没有子目录 -->
          <el-menu-item :index="item.id + ''" @click="changePage(item)">
            <template #title>
              <el-icon size="12px">
                <component v-if="item.icon" :is="item.icon.substring(8)" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { mapPathToMenu } from '@/utils/mapMenus'

export default defineComponent({
  props: {
    iscollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const roleMenus = store.state.login.roleMenus
    const menus = computed(() => roleMenus)
    const router = useRouter()
    const route = useRoute()
    const changePage = (item: any) => {
      router.push({
        path: item.url
      })
    }
    const defaultMenu = mapPathToMenu(roleMenus, route.path).id + ''

    return { menus, changePage, defaultMenu }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 6px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }
  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  // 跳出scope设置的样式
  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
