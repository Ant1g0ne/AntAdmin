<template>
  <div class="goods-list">
    <el-card>
      <template #header>
        <div class="header">
          <span>商品列表</span>
          <el-button type="primary" @click="$router.push('/goods/add')">添加商品</el-button>
        </div>
      </template>

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
        <el-table-column label="操作" width="180">
          <template #default>
            <el-button type="primary" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

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
import { getGoodsList } from '@/api/goods'

const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const loading = ref(false)

const getList = async () => {
  loading.value = true
  const res = await getGoodsList({ page: page.value, pageSize: pageSize.value })
  list.value = res.data.list
  total.value = res.data.total
  loading.value = false
}

onMounted(getList)
</script>

<style scoped>
.header { display: flex; justify-content: space-between; align-items: center; }
.pagination { margin-top: 20px; text-align: center; }
</style>