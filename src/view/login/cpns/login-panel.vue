<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" class="login-tabs" stretch v-model="tabName">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon size="12px"><User /></el-icon>
            <span>用户登录</span>
          </span>
        </template>
        <!-- 用户组件 -->
        <login-account ref="accountRef" />
      </el-tab-pane>

      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon size="12px"><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <!-- 手机组件 -->
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="login-other">
      <el-checkbox v-model="isRememberPsw">记住密码</el-checkbox>
      <el-link type="primary" :underline="false">找回密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="onLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// 图标导入
import { User, Iphone } from '@element-plus/icons'
// 组件导入
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    // 图标导入
    User,
    Iphone,
    // 组件导入
    LoginAccount,
    LoginPhone
  },
  setup() {
    /* 1. 声明对象 */
    const isRememberPsw = ref(true)
    // 绑定login-account组件对象
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const tabName = ref<string>('account')

    /* 2. 声明方法 */
    // 登录事件
    const onLogin = () => {
      // 区分是账户登录还是手机登录
      if (tabName.value === 'account') {
        accountRef.value?.accountLogin(isRememberPsw.value)
      }
    }

    return {
      isRememberPsw,
      accountRef,
      onLogin,
      tabName
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 200px;
  h1 {
    text-align: center;
  }
}
.login-tabs {
  width: 320px;
}
.login-other {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.login-btn {
  margin-top: 10px;
  width: 100%;
  height: 40px;
}
</style>
