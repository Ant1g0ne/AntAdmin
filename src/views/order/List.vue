<template>
  <div class="order-list">
    <el-card>
      <!-- 卡片头部：标题 + 搜索输入框（目前仅展示，未接入筛选逻辑） -->
      <template #header>
        <div class="header">
          <span>订单列表</span>
          <el-input placeholder="搜索订单号" style="width:240px" />
        </div>
      </template>

      <!-- 订单表格 -->
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
        <!-- 操作列：查看 / 发货 / 删除 -->
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="viewOrder(row)">查看</el-button>
            <el-button type="warning" size="small" @click="shipOrder(row)">发货</el-button>
            <el-button type="danger" size="small" @click="deleteOrder(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 订单状态枚举：用于渲染状态标签文字和颜色
const statusMap = {
  0: { text: '待支付', type: 'warning' },
  1: { text: '已支付', type: 'success' },
  2: { text: '已发货', type: 'primary' },
  3: { text: '已完成', type: '' },
  4: { text: '已取消', type: 'danger' }
}

// 模拟订单数据
const orders = ref([
  { id: '20250101001', user: '张三', amount: 8999, status: 1, createTime: '2025-01-01 12:30' },
  { id: '20250101002', user: '李四', amount: 5699, status: 2, createTime: '2025-01-01 14:20' }
])
const loading = ref(false)

// 查看订单详情：用弹窗简单展示字段
const viewOrder = (row) => {
  ElMessageBox.alert(
    `订单号：${row.id}\n用户：${row.user}\n金额：¥${row.amount}\n状态：${statusMap[row.status].text}\n下单时间：${row.createTime}`,
    '订单详情',
    { confirmButtonText: '知道了' }
  )
}

// 发货：修改状态为已发货
const shipOrder = (row) => {
  if (row.status >= 2) {
    return ElMessage.info('该订单已发货或完成')
  }
  ElMessageBox.confirm(`确认对订单「${row.id}」发货吗？`, '提示', { type: 'warning' })
    .then(() => {
      row.status = 2
      ElMessage.success('发货成功')
    })
    .catch(() => {})
}

// 删除订单：本地从数组中移除
const deleteOrder = (row) => {
  ElMessageBox.confirm(`确定要删除订单「${row.id}」吗？`, '提示', { type: 'warning' })
    .then(() => {
      orders.value = orders.value.filter(item => item.id !== row.id)
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}
</script>

<style scoped>
.header { display: flex; justify-content: space-between; align-items: center; }
</style>