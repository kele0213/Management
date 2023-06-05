<template>
  <div class="login-account">
    <el-form :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-rules'
import { ElForm } from 'element-plus'
export default defineComponent({
  setup() {
    // 绑定表单组件
    const formRef = ref<InstanceType<typeof ElForm>>()
    const account = reactive({
      username: '',
      password: ''
    })
    const accountLogin = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 实现登录功能
          console.log('登录')
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
