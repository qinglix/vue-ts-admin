<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import { accountLoginRequest } from '@/service/modules/login'
import useLoginStore from '@/stores/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

// 定义表单数据
const form = reactive<IAccount>({
  // username: '',
  // password: ''
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

// 表单校验规则
const rules: FormRules = {
  name: [
    { required: true, message: '请输入帐号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()

// 执行登录的逻辑
const loginAction = (isRememberPassword: boolean) => {
// 登录前的校验逻辑处理
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('校验成功')
      console.log(form)
      const name = form.name
      const password = form.password
      // 发送网络请求
      // accountLoginRequest({ name: username, password }).then((res) => {
      //   console.log(res)
      // })
      loginStore.accountLoginAction({ name, password }).then(() => {
        // 判断是否记住密码
        if (isRememberPassword) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
    } else {
      // console.log('校验失败')
      ElMessage.error('请输入正确的帐号密码后再操作。')
    }
  })
}

// 暴露方法给父组件
defineExpose({
  loginAction
})
</script>

<template>
  <div class="account-panel">
    <el-form label-width="60px" size="large" :model="form" :rules="rules" status-icon ref="formRef">
      <!-- prop属性的值是匹配表单校验规则 -->
      <el-form-item label="帐号" prop="name">
        <el-input v-model="form.name" placeholder="coderwhy" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password placeholder="123456" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>
