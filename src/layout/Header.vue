<template>
  <!-- 头部区域：左侧是折叠按钮，右侧是主题切换 + 用户下拉菜单 -->
  <div class="header">
    <!-- 折叠/展开侧边栏 -->
    <el-icon class="fold" @click="app.toggleSidebar">
      <Fold v-if="!app.sidebarCollapsed" />
      <Expand v-else />
    </el-icon>

    <div class="right">
      <!-- 深色 / 浅色主题切换 -->
      <el-switch
        v-model="app.isDark"
        inline-prompt
        active-text="深色"
        inactive-text="浅色"
        @change="app.toggleDark"
      />

      <!-- 用户下拉菜单（当前只是简单的退出登录） -->
      <el-dropdown style="margin-left:20px">
        <span class="user">Admin <el-icon><ArrowDown /></el-icon></span>
        <template #dropdown>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { Fold, Expand, ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const app = useAppStore()
const router = useRouter()

// 退出登录：清除 token 并跳回登录页
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.header { height: 60px; background: white; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 1px 4px rgba(0,21,41,.08); }
.fold { font-size: 22px; cursor: pointer; }
.user { cursor: pointer; }
</style>