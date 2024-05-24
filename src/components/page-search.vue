<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import usePermissions from '@/hooks/usePermissions'

// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

interface IProps {
  searchConfig: {
    pageName: string
    formItems: any[]
    labelWidth?: string
  }
}

// 定义接收的属性
const props = defineProps<IProps>()

// 用户按钮权限处理
const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)

// 定义form的数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)

// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
const handleResetClick = () => {
  // 1.将form中的数据全部重置
  formRef.value?.resetFields()

  // 2.将事件传递出去，content组件内部重新发送网络请求
  emit('resetClick')
}

const handleQueryClick = () => {
  emit('queryClick', searchForm)
}
</script>

<template>
  <div class="search" v-if="isQuery">
    <el-form :label-width="searchConfig.labelWidth??'80px'" size="large" :model="searchForm" ref="formRef">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <!-- 动态组件,不建议 todo -->
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <!--              <template v-else-if="item.type === 'date-picker'">-->
              <!--                <el-date-picker-->
              <!--                  v-model="searchForm[item.prop]"-->
              <!--                  type="daterange"-->
              <!--                  range-separator="-"-->
              <!--                  start-placeholder="开始日期"-->
              <!--                  end-placeholder="结束日期"-->
              <!--                />-->
              <!--              </template>-->
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button size="large" type="primary" icon="Search" @click="handleQueryClick">查询</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 15px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
