<template>
  <div class="goods-add">
    <el-card>
      <!-- 卡片头部：根据 isEdit 显示“编辑商品 / 添加商品”，右侧是返回按钮 -->
      <template #header>
        <div class="header">
          <span>{{ isEdit ? '编辑商品' : '添加商品' }}</span>
          <el-button @click="$router.back()">返回</el-button>
        </div>
      </template>

      <!-- 商品表单 -->
      <el-form :model="form" label-width="100px" style="max-width:800px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number v-model="form.price" :min="0" style="width:100%" />
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input-number v-model="form.stock" :min="0" style="width:100%" />
        </el-form-item>
        <el-form-item label="商品图片">
          <UploadImg v-model="form.images" />
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input
            v-model="form.desc"
            type="textarea"
            :rows="6"
            placeholder="请输入商品描述"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import UploadImg from '@/components/UploadImg.vue'
import { addGoods, getGoodsDetail, updateGoods } from '@/api/goods'

const route = useRoute()
const router = useRouter()
// 是否为编辑模式：通过当前路径中是否包含 edit 来判断
const isEdit = route.path.includes('edit')

// 表单数据
const form = ref({
  name: '',
  price: 0,
  stock: 0,
  images: [],
  desc: ''
})

// 编辑模式时：根据路由参数 id 拉取详情并回显
onMounted(async () => {
  if (isEdit) {
    const id = route.params.id
    try {
      const res = await getGoodsDetail(id)
      form.value = {
        name: res.data.name,
        price: res.data.price,
        stock: res.data.stock,
        images: res.data.images || [],
        desc: res.data.desc || ''
      }
    } catch (e) {
      ElMessage.error('商品不存在，无法编辑')
      router.back()
    }
  }
})

// 提交表单：根据 isEdit 决定是新增还是更新
const submit = async () => {
  if (!form.value.name) {
    return ElMessage.warning('请输入商品名称')
  }
  const payload = { ...form.value }
  try {
    if (isEdit) {
      await updateGoods(route.params.id, payload)
      ElMessage.success('编辑成功')
    } else {
      await addGoods(payload)
      ElMessage.success('添加成功')
    }
    // 成功后返回商品列表
    router.push('/goods/list')
  } catch (e) {
    ElMessage.error('操作失败，请稍后重试')
  }
}
</script>

<style scoped>
.header { display: flex; justify-content: space-between; align-items: center; }
</style>