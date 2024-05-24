<script setup lang="ts">
import MainAside from '@/ui/main/main-aside.vue'
import MainHeader from '@/ui/main/main-header.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { checkTokenAndLogout } from '@/utils/auth'

// 处理main-header中折叠的变化
const isFold = ref(false)
const handleFoldChange = (flag: boolean) => {
  isFold.value = flag
}

// let intervalId: number | null = null
// onMounted(() => {
//   console.log('MainPage onMounted')
//   intervalId = setInterval(checkTokenAndLogout, 1000 * 60 * 10)  // 10分钟检查一次token是否过期
// })
//
// // 在组件销毁的时候，清除定时器
// onUnmounted(() => {
//   if (intervalId) {
//     clearInterval(intervalId)
//   }
// })
</script>

<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isFold ? '60px' : '210px'">
        <main-aside :is-fold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.main {
  height: 100%;

  .main-container {
    height: 100%;
  }

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
