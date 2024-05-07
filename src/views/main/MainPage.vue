<script setup lang="ts">
import MainAside from '@/ui/main/main-aside.vue'
import MainHeader from '@/ui/main/main-header.vue'
import { ref } from 'vue'

// 处理main-header中折叠的变化
const isFold = ref(false)
const handleFoldChange = (flag: boolean) => {
  isFold.value = flag
}
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
