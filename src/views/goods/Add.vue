<template>
  <div class="goods-add">
    <el-card>
      <template #header>
        <div class="header">
          <span>{{ isEdit ? '编辑商品' : '添加商品' }}</span>
          <el-button @click="$router.back()">返回</el-button>
        </div>
      </template>

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
          <div ref="editor" style="height:400px"></div>
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
import { useRouter } from 'vue-router'
import UploadImg from '@/components/UploadImg.vue'
import E from 'wangeditor'

const router = useRouter()
const isEdit = router.currentRoute.value.path.includes('edit')
const editor = ref()
const form = ref({
  name: '',
  price: 0,
  stock: 0,
  images: [],
  desc: ''
})

onMounted(() => {
  const wang = new E(editor.value)
  wang.config.uploadImgShowBase64 = true
  wang.create()
  wang.txt.html(form.value.desc)
})

const submit = () => {
  ElMessage.success(isEdit ? '编辑成功' : '添加成功')
  router.push('/goods/list')
}
</script>

<style scoped>
.header { display: flex; justify-content: space-between; align-items: center; }
</style>