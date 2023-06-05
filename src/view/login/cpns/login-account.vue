<template>
  <div class="login-account">
    <el-form :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-rules'
import { ElForm } from 'element-plus'
import localCache from '@/utils/localCache'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    // 绑定表单组件
    const formRef = ref<InstanceType<typeof ElForm>>()
    const account = reactive({
      username: localCache.getCache('username') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const store = useStore()

    const accountLogin = (isRememberPsw: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 实现登录功能
          // 1. 保存密码
          if (isRememberPsw) {
            localCache.setCache('username', account.username)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('username')
            localCache.deleteCache('password')
          }
          // 2. 调用vuex的登录
          store.dispatch('login/onAccountLogin', { ...account })
        }
      })
    }
    return {
      account,
      rules,
      accountLogin,
      formRef
    }
  }
})
</script>

<style scoped></style>
