<template>
  <div class="goods-list">
    <el-card>
      <!-- 卡片头部：标题 + 添加按钮 -->
      <template #header>
        <div class="header">
          <span>商品列表</span>
          <el-button type="primary" @click="$router.push('/goods/add')">添加商品</el-button>
        </div>
      </template>

      <!-- 商品表格 -->
      <el-table :data="list" style="width:100%" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="商品名称" />
        <el-table-column prop="price" label="价格" width="120">
          <template #default="{row}">¥{{ row.price }}</template>
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="100" />
        <el-table-column prop="sales" label="销量" width="100" />
        <el-table-column label="状态" width="100">
          <template #default="{row}">
            <el-tag :type="row.status ? 'success' : 'danger'">{{ row.status ? '上架' : '下架' }}</el-tag>
          </template>
        </el-table-column>
        <!-- 操作列：编辑 / 删除 -->
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :total="total"
          layout="total, prev, pager, next"
          @current-change="getList"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getGoodsList, deleteGoods } from '@/api/goods'

const router = useRouter()
// 商品列表数据 & 分页信息
const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const loading = ref(false)

// 获取商品列表（分页）
const getList = async () => {
  loading.value = true
  try {
    const res = await getGoodsList({ page: page.value, pageSize: pageSize.value })
    list.value = res.data.list
    total.value = res.data.total
  } finally {
    loading.value = false
  }
}

// 编辑商品：跳转到 /goods/edit/:id
const handleEdit = (row) => {
  router.push(`/goods/edit/${row.id}`)
}

// 删除商品：弹窗确认后调用 delete 接口并刷新列表
const handleDelete = (row) => {
  ElMessageBox.confirm(`确定要删除商品「${row.name}」吗？`, '提示', {
    type: 'warning'
  })
    .then(async () => {
      await deleteGoods(row.id)
      ElMessage.success('删除成功')
      getList()
    })
    .catch(() => {})
}

// 组件加载完成后立即拉取首屏数据
onMounted(getList)
</script>

<style scoped>
.header { display: flex; justify-content: space-between; align-items: center; }
.pagination { margin-top: 20px; text-align: center; }
</style>