<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'

// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: ''
})

// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
const handleResetClick = () => {
  // 1.将form中的数据全部重置
  formRef.value?.resetFields()

  // 2.将事件传递出去，content组件内部重新发送网络请求
  emit('resetClick')
}

const handleQueryClick = () => {
  console.log(searchForm)
  emit('queryClick', searchForm)
}
</script>

<template>
  <div class="search">
    <el-form label-width="80px" size="large" :model="searchForm" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8" :xs="24" :sm="12" :md="8">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入查询的用户名" v-model="searchForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24" :sm="12" :md="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="请输入查询的真实姓名" v-model="searchForm.realname" />
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24" :sm="12" :md="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input placeholder="请输入查询的手机号码" v-model="searchForm.cellphone" />
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="24" :sm="12" :md="8">
          <el-form-item label="状态" prop="enable">
            <el-select placeholder="请选择状态" style="width: 100%;" v-model="searchForm.enable">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24" :sm="12" :md="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="searchForm.createAt"
            />
          </el-form-item>
        </el-col>
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
