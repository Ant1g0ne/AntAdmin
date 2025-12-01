import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/Login.vue'
import Layout from '@/layout/Layout.vue'
import Dashboard from '@/views/Dashboard.vue'

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'goods/list', component: () => import('@/views/goods/List.vue') },
      { path: 'goods/add', component: () => import('@/views/goods/Add.vue') },
      { path: 'goods/edit/:id', component: () => import('@/views/goods/Add.vue') },
      { path: 'order/list', component: () => import('@/views/order/List.vue') },
      { path: 'user', component: () => import('@/views/user/List.vue') }
      // 归放商品、订单等页面
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) next('/login')
  else next()
})

export default router