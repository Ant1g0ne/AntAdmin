<template>
  <div class="order-list">
    <el-card>
      <template #header>
        <div class="header">
          <span>订单列表</span>
          <el-input placeholder="搜索订单号" style="width:240px" />
        </div>
      </template>

      <el-table :data="orders" v-loading="loading">
        <el-table-column prop="id" label="订单号" width="180" />
        <el-table-column prop="user" label="用户名" />
        <el-table-column prop="amount" label="金额">
          <template #default="{row}">¥{{ row.amount }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="{row}">
            <el-tag :type="statusMap[row.status].type">{{ statusMap[row.status].text }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="下单时间" />
        <el-table-column label="操作" width="180">
          <template #default>
            <el-button type="primary" size="small">查看</el-button>
            <el-button type="warning" size="small">发货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const statusMap = {
  0: { text: '待支付', type: 'warning' },
  1: { text: '已支付', type: 'success' },
  2: { text: '已发货', type: 'primary' },
  3: { text: '已完成', type: '' },
  4: { text: '已取消', type: 'danger' }
}

const orders = ref([
  { id: '20250101001', user: '张三', amount: 8999, status: 1, createTime: '2025-01-01 12:30' },
  { id: '20250101002', user: '李四', amount: 5699, status: 2, createTime: '2025-01-01 14:20' },
  // 省略更多...
])
const loading = ref(false)
</script>

<style scoped>
.header { display: flex; justify-content: space-between; align-items: center; }
</style>