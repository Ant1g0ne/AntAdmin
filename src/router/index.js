// 全局路由配置：负责页面间的跳转关系和权限控制
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/Login.vue'
import Layout from '@/layout/Layout.vue'
import Dashboard from '@/views/Dashboard.vue'

// 所有路由表
const routes = [
  // 登录页
  { path: '/login', component: Login },
  {
    // 后台主框架（带侧边栏 + 头部 + 内容区域）
    path: '/',
    component: Layout,
    children: [
      // 访问根路径 "/" 时默认展示首页大屏
      { path: '', component: Dashboard },
      // 显式访问 "/dashboard" 时同样展示首页大屏
      { path: 'dashboard', component: Dashboard },
      // 商品模块
      { path: 'goods/list', component: () => import('@/views/goods/List.vue') },
      { path: 'goods/add', component: () => import('@/views/goods/Add.vue') },
      { path: 'goods/edit/:id', component: () => import('@/views/goods/Add.vue') },
      // 订单模块
      { path: 'order/list', component: () => import('@/views/order/List.vue') },
      // 用户管理
      { path: 'user', component: () => import('@/views/user/List.vue') },
      // 数据统计
      { path: 'data', component: () => import('@/views/Data.vue') }
      // 后续页面都可以继续挂在 children 下
    ]
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 History 模式，URL 更简洁
  routes
})

// 简单的登录拦截：没有 token 时只能访问 /login
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) next('/login')
  else next()
})

export default router