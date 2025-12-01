<template>
  <div class="layout-container" :class="{ dark: app.isDark }">
    <Sidebar />
    <div class="main">
      <Header />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import { useAppStore } from '@/stores/app'
const app = useAppStore()
</script>

<style scoped>
.layout-container { display: flex; height: 100vh; }
.main { flex: 1; display: flex; flex-direction: column; }
.content { flex: 1; overflow: auto; padding: 20px; background: #f0f2f5; }
.dark .content { background: #0f0f0f; }
</style>