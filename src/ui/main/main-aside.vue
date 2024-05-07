<script setup lang="ts">
import useLoginStore from '@/stores/login'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { firstMenu, mapPathToMenu } from '@/utils/mapmenu'

// 1.获取动态菜单
// pinia中的数据只有被使用，才会在页面中显示
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
console.log(userMenus)

// 2.监听item的点击
const router = useRouter()
const handleItemClick = (item: any) => {
  const url = item.url
  router.push(url)
}

// 3.处理菜单显示
const route = useRoute()
console.log(route.path)
// const pathMenu = mapPathToMenu(route.path, userMenus)
// const defaultActive = ref(pathMenu.id + '')
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})

// 定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="main-aside">
    <div class="logo">
      <img src="@/assets/logo.svg" alt="logo">
      <h2 class="title" v-show="!isFold">Dashboard</h2>
    </div>
    <div class="menu">
      <el-menu text-color="#b7bdc3" active-text-color="#fff" background-color="#001529" :default-active="defaultActive"
               :collapse="isFold">
        <!-- 遍历整个菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 动态图标实现 -->
              <!-- 动态组件 -->
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">{{ subitem.name }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main-aside {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    //height: 28px;
    height: 60px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    cursor: auto;
    gap: 8px;

    img {
      //height: 100%;
      height: 50%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      line-height: 16px;
      font-weight: 700;
      color: white;
      white-space: nowrap;
    }
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
