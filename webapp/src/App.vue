<script setup>
import SideNav from './components/SideNav/SideNav.vue'
import { RouterView } from "vue-router";
</script>

<template>
  <div class="layout">
    <SideNav />
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}
.content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}
</style>