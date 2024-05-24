<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { localCache } from '@/utils/cache'
import useLoginStore from '@/stores/login'
import { mapPathToBreadcrumb } from '@/utils/mapmenu'

// 菜单是否折叠
const isMenuFold = ref(false)

const handleMenuIconClick = () => {
  isMenuFold.value = !isMenuFold.value

  // 将事件和状态发射给父组件
  emit('foldChange', isMenuFold.value)
}

const router = useRouter()

const handleExitClick = () => {
  // 1.删除token
  // localCache.removeCache('token')

  localCache.clearCache()
  // 2.跳转到登录页
  router.push('/login')
}

const route = useRoute()
const userMenus = useLoginStore().userMenus
// 使用computed当路由发生改变时重新匹配
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumb(route.path, userMenus)
})

// 自定义事件
const emit = defineEmits(['foldChange'])

// 用户信息
const loginStore = useLoginStore()

// 刷新页面事件处理
const refreshPage = () => {
  window.location.reload()
}

// 全屏事件处理
const isFullScreen = ref(false)
const toggleFullScreen = () => {
  if (!isFullScreen.value) {
    document.documentElement.requestFullscreen()
    isFullScreen.value = true
  } else {
    document.exitFullscreen()
    isFullScreen.value = false
  }
}
</script>

<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="22px">
        <component :is="isMenuFold ? 'Expand' : 'Fold'" />
        <!-- <Fold /> -->
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <el-breadcrumb separator-icon="ArrowRight">
          <template v-for="item in breadcrumbs" :key="item.name">
            <el-breadcrumb-item :to="item.path">
              {{ item.name }}
            </el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </div>
      <div class="info">
        <div class="operation">
          <!--          <span>-->
          <!--            <span class="dot"></span>-->
          <!--            <el-icon><Bell /></el-icon>-->
          <!--          </span>-->
          <span @click="refreshPage"><el-icon><RefreshRight /></el-icon></span>
          <span @click="toggleFullScreen"><el-icon><FullScreen /></el-icon></span>
        </div>
        <div class="user">
          <el-dropdown>
            <span class="username">
              <el-avatar :size="26" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
              <span class="name">{{ loginStore.userInfo.name }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-icon>
                    <User />
                  </el-icon>
                  <span>个人信息</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-icon>
                    <Unlock />
                  </el-icon>
                  <span>修改密码</span>
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleExitClick">
                  <el-icon>
                    <CircleClose />
                  </el-icon>
                  <span>退出系统</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;

    .info {
      display: flex;
      align-items: center;

      .operation {
        display: inline-flex;
        margin-right: 20px;

        span {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 35px;
          cursor: pointer;

          &:hover {
            background: #f2f2f2;
          }

          i {
            font-size: 20px;
          }

          .dot {
            position: absolute;
            top: 3px;
            right: 3px;
            z-index: 10;
            width: 6px;
            height: 6px;
            background: red;
            border-radius: 100%;
          }
        }
      }

      .user {
        .username {
          padding: 2px 5px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;

          &:hover {
            background: #f2f2f2;
          }

          .name {
            font-size: large;
          }

          // 弹出来的dropdown没有渲染到app里面, 用:deep找不到
          // global是全局生效，给整个html设置样式
          // 在父组件给子组件的根元素设置样式可以不用deep，直接选中元素(.el-dropdown)设置样式, 非根元素要使用deep(:deel(.el-dropdown)), 非子组件要使用global(:global(.el-dropdown))
          :global(.el-dropdown-menu__item) {
            //line-height: 36px !important;
            //padding: 6px 22px;
          }
        }
      }
    }
  }
}
</style>
