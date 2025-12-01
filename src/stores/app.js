// 全局应用状态（Pinia）：侧边栏、深色模式等 UI 设置
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  // state：可响应的全局数据
  state: () => ({
    // 侧边栏是否折叠
    sidebarCollapsed: false,
    // 是否深色模式
    isDark: false
  }),
  // actions：修改 state 的统一入口
  actions: {
    // 切换侧边栏展开/收起
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    // 切换深色模式
    // 注意：这里接收开关传入的布尔值，避免和 v-model 重复“反向”切换
    toggleDark(value) {
      this.isDark = value
      // 同步一个类到 <html> 上，方便全局做主题切换
      document.documentElement.classList.toggle('dark', this.isDark)
    }
  },
  // 使用持久化插件（在 main.js 里注册后）可以让设置在刷新后也保留
  persist: true   // 刷新页面也能记住深色/折叠状态
})