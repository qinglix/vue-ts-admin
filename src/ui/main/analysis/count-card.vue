<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CountUp } from 'countup.js'

interface IProps {
  amount?: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}

// const props = defineProps<IProps>()
const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  tips: '所有商品的总销量',
  number1: 999999,
  number2: 999999,
  subtitle: '商品总销量'
})

// 创建Countup的实例对象
const count1Ref = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()
// new CountUp
// 参数一：执行动画的元素
// 参数二：数字增加到多少就写多少
// 参数三：从什么数字开始执行动画

const countOption = {
  // prefix: '¥'
  prefix: props.amount === 'saleroom' ? '¥' : ''
}

// 问题：在setup函数中，元素可能还没有绑定到dom上
onMounted(() => {
  const countup1 = new CountUp(count1Ref.value!, props.number1, countOption
    //   {
    //   // startVal: 0,
    //   // prefix: '¥'
    // }
  )
  const countup2 = new CountUp(count2Ref.value!, props.number2, {
    // prefix: '¥'
  })

  countup1.start()
  countup2.start()
})
</script>

<template>
  <div class="count-card">
    <div class="header">
      <span>{{ title }}</span>
      <el-tooltip :content="tips" placement="top" effect="dark">
        <el-icon>
          <Warning />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <!--      <span v-if="amount==='saleroom'">¥</span>-->
      <span class="count" ref="count1Ref">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span class="text">{{ subtitle }}</span>
      <!--      <span v-if="amount==='saleroom'">¥</span>-->
      <span class="count" ref="count2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.count-card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 0;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
  }

  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
