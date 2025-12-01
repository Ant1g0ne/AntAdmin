<template>
  <!-- 整体布局容器：左侧是侧边栏，右侧是头部 + 内容区域 -->
  <div class="layout-container" :class="{ dark: app.isDark }">
    <!-- 左侧菜单 -->
    <Sidebar />
    <!-- 右侧主体 -->
    <div class="main">
      <!-- 头部（折叠按钮 / 主题切换 / 用户信息） -->
      <Header />
      <!-- 内容区域：由路由决定展示哪个页面 -->
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

// 读取全局应用状态，用来控制深色模式等
const app = useAppStore()
</script>

<style scoped>
.layout-container { display: flex; height: 100vh; }
.main { flex: 1; display: flex; flex-direction: column; }
.content { flex: 1; overflow: auto; padding: 20px; background: #f0f2f5; }
.dark .content { background: #0f0f0f; }
/* 深色模式下头部样式，需要用 :deep 才能作用到子组件 */
.layout-container.dark :deep(.header) {
  background: #1f1f1f;
  box-shadow: 0 1px 4px rgba(0,0,0,.6);
}
</style>