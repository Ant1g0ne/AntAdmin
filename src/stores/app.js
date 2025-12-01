// src/stores/app.js
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebarCollapsed: false,
    isDark: false
  }),
  actions: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    toggleDark() {
      this.isDark = !this.isDark
      document.documentElement.classList.toggle('dark', this.isDark)
    }
  },
  persist: true   // 刷新页面也能记住深色/折叠状态
})