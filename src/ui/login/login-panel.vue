<script setup lang="ts">
import { ref, watch } from 'vue'
import AccountPanel from '@/ui/login/account-panel.vue'
import PhonePanel from '@/ui/login/phone-panel.vue'
import { localCache } from '@/utils/cache'

// const isRememberPassword = ref(false)
const isRememberPassword = ref<boolean>(localCache.getCache('isRememberPassword') ?? false)
// console.log(isRememberPassword.value)

const activeTab = ref('account')

// 获取组件实例类型
const accountRef = ref<InstanceType<typeof AccountPanel>>()

const handleLoginBtnClick = () => {
  if (activeTab.value === 'account') {
    // console.log('帐号登录')
    // 1.获取子组件的实例
    // 2.调用子组件的方法
    accountRef.value?.loginAction(isRememberPassword.value)
  } else {
    console.log('手机号登录')
  }
}

// 记住密码的处理
watch(isRememberPassword, (newValue) => {
  // console.log(newValue)
  localCache.setCache('isRememberPassword', newValue)
  // console.log(localCache.getCache('isRememberPassword'))
})
</script>

<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="login-form">
      <el-tabs type="border-card" stretch v-model="activeTab">
        <el-tab-pane name="account">
          <template #label>
        <span class="tabs-label">
          <el-icon><UserFilled /></el-icon>
          <span class="text">帐号登录</span>
        </span>
          </template>
          <account-panel ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
        <span class="tabs-label">
          <el-icon><Iphone /></el-icon>
          <span class="text">手机登录</span>
        </span>
          </template>
          <phone-panel />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="actions">
      <el-checkbox v-model="isRememberPassword" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="btn" type="primary" size="large" @click="handleLoginBtnClick">立即登录</el-button>
  </div>
</template>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 25px;
  }

  .login-form {

    .tabs-label {
      display: flex;
      justify-content: center;
      align-items: center;

      .text {
        margin-left: 5px;
      }
    }
  }

  .actions {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
