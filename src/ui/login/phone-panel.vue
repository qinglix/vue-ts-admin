<script setup lang="ts">
import { onBeforeUnmount, reactive, ref, watch } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { IPhone } from '@/types'

const form = reactive<IPhone>({
  phone: '',
  code: ''
})

const rules: FormRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ]
}

const formRef = ref<InstanceType<typeof ElForm>>()

let isPhoneValid = ref(false)
watch(() => form.phone, () => {
  formRef.value?.validateField('phone', (valid) => {
    console.log('phone', valid)
    if (valid) {
      isPhoneValid.value = true
    }
  })
})

let timeDown = ref(0)
let intervalId: any = null

const getCode = () => {
  timeDown.value = 60
  intervalId = setInterval(() => {
    if (timeDown.value > 0) {
      timeDown.value--
    } else {
      clearInterval(intervalId)
      intervalId = null
    }
  }, 1000)
}

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
})
</script>

<template>
  <div class="phone-panel">
    <el-form label-width="70px" size="large" :model="form" :rules="rules" status-icon ref="formRef">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input v-model="form.code" />
          <el-button type="primary" :disabled="!isPhoneValid || timeDown > 0" @click="getCode">
            {{ timeDown > 0 ? `${timeDown}秒后重试` : '获取验证码' }}
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.phone-panel {
  .verify-code {
    display: flex;
    gap: 8px;
  }
}
</style>
