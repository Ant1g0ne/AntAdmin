// 应用入口文件：负责创建 Vue 应用并挂载到页面上
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/global.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 1. 创建应用实例
const app = createApp(App)

// 2. 挂载 Pinia（全局状态管理）
app.use(createPinia())

// 3. 挂载路由
app.use(router)

// 4. 挂载 Element Plus 组件库
app.use(ElementPlus)

// 5. 全局注册所有图标组件，方便在各处直接使用 <House /> 等
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 6. 将应用挂载到 index.html 中的 #app 节点
app.mount('#app')