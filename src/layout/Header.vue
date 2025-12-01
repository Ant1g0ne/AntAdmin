<template>
  <div class="header">
    <el-icon class="fold" @click="app.toggleSidebar">
      <Fold v-if="!app.sidebarCollapsed" />
      <Expand v-else />
    </el-icon>
    <div class="right">
      <el-switch
        v-model="app.isDark"
        inline-prompt
        active-text="深色"
        inactive-text="浅色"
        @change="app.toggleDark"
      />
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
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.header { height: 60px; background: white; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 1px 4px rgba(0,21,41,.08); }
.dark .header { background: #1f1f1f; }
.fold { font-size: 22px; cursor: pointer; }
.user { cursor: pointer; }
</style>