<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="iscollapse ? '60px' : '210px'">
        <nav-menu :iscollapse="iscollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="foldChangeMain" />
        </el-header>
        <el-main class="page-content">
          <router-view class="page-info" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'
export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const iscollapse = ref(false)
    const foldChangeMain = (isfold: boolean) => {
      iscollapse.value = isfold
    }
    return { foldChangeMain, iscollapse }
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main-content,
.page {
  height: 100%;
}
.el-header {
  height: 48px !important;
}
.page-content {
  height: calc(100%-48px);
  .page-info {
    background-color: #fff;
  }
}

.el-header,
.el-footer {
  display: flex;
  text-align: center;
  align-items: center;
  color: #333;
}
.el-main {
  text-align: center;
  background-color: #f0f2f5;
}
.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #001529;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  transition: width 0.3s linear;
  color: #f0f2f5;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
