<script setup lang="ts">

interface IProps {
  header?: string
}

withDefaults(defineProps<IProps>(), {
  header: 'Card title'
})
</script>

<template>
  <div class="chart-card">
    <el-card :header="header">
      <slot>
        <p>Default content</p>
      </slot>
    </el-card>
  </div>
</template>

<style scoped>

</style>
