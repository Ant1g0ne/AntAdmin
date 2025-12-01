<template>
  <div class="sidebar" :class="{ collapsed: app.sidebarCollapsed }">
    <div class="logo">AntAdmin</div>
    <el-menu
      :collapse="app.sidebarCollapsed"
      :default-active="$route.path"
      router
      background-color="#001529"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/dashboard">
        <el-icon><House /></el-icon><span>首页大屏</span>
      </el-menu-item>
      <el-sub-menu index="/goods">
        <template #title><el-icon><Goods /></el-icon><span>商品管理</span></template>
        <el-menu-item index="/goods/list">商品列表</el-menu-item>
        <el-menu-item index="/goods/add">添加商品</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/order">
        <template #title><el-icon><ShoppingCart /></el-icon><span>订单管理</span></template>
        <el-menu-item index="/order/list">订单列表</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/user">
        <el-icon><User /></el-icon><span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/data">
        <el-icon><DataAnalysis /></el-icon><span>数据统计</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { House, Goods, ShoppingCart, User, DataAnalysis } from '@element-plus/icons-vue'
const app = useAppStore()
</script>

<style scoped>
.sidebar { width: 220px; background: #001529; transition: width 0.3s; color: white; }
.sidebar.collapsed { width: 64px; }
.logo { height: 60px; line-height: 60px; text-align: center; font-size: 20px; font-weight: bold; }
</style>