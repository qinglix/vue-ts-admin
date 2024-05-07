<script setup lang="ts">
import PageContent from '@/components/page-content.vue'
import contentConfig from '@/config/menu/content'
</script>

<template>
  <div class="menu">
    <page-content :content-config="contentConfig" />
  </div>
</template>

<style scoped>

</style>
