<template>
  <div class="user-list">
    <el-card>
      <!-- 卡片头部：标题 + 搜索框 -->
      <template #header>
        <div class="header">
          <span>用户管理</span>
          <el-input v-model="keyword" placeholder="搜索用户名/手机号" style="width:260px" clearable />
        </div>
      </template>

      <!-- 用户表格 -->
      <el-table :data="filteredUsers" style="width:100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="phone" label="手机号" width="160" />
        <el-table-column prop="role" label="角色" width="120" />
        <el-table-column prop="createTime" label="注册时间" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status ? 'success' : 'info'">{{ row.status ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// 搜索关键字
const keyword = ref('')

// 模拟用户数据
const users = ref([
  { id: 1, name: 'admin', phone: '13800000000', role: '管理员', status: 1, createTime: '2024-12-01 10:20' },
  { id: 2, name: '张三', phone: '13911112222', role: '普通用户', status: 1, createTime: '2024-12-02 09:15' },
  { id: 3, name: '李四', phone: '13733334444', role: '普通用户', status: 0, createTime: '2024-12-03 18:30' }
])

// 根据关键字实时过滤用户列表
const filteredUsers = computed(() => {
  if (!keyword.value) return users.value
  return users.value.filter(u => u.name.includes(keyword.value) || u.phone.includes(keyword.value))
})
</script>

<style scoped>
.user-list .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>