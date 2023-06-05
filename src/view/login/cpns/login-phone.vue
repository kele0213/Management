<template>
  <div class="login-phone">
    <el-form :rules="rules" :model="phone" label-width="65px">
      <el-form-item label="手机" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="phone-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="summit-btn">发送</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/phone-rules'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })
    return { phone, rules }
  }
})
</script>

<style scoped lang="less">
.phone-code {
  display: flex;
  .summit-btn {
    margin-left: 5px;
  }
}
</style>
