<script setup lang="ts">

import LoginPanel from '@/ui/login/login-panel.vue'
</script>

<template>
  <div class="container">
    <LoginPanel />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url("../../assets/login-bg.svg");
}
</style>
