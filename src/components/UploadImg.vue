<template>
  <!-- 通用图片上传组件：内部用 Element Plus 的 el-upload 封装
       当前使用假接口地址和随机图片，主要用于演示交互效果 -->
  <el-upload
    v-model:file-list="fileList"
    list-type="picture-card"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :limit="9"
    :action="uploadAction"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <!-- 预览大图弹窗 -->
  <el-dialog v-model="dialogVisible">
    <img :src="dialogImageUrl" style="width:100%" />
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

// 向父组件抛出 v-model 更新事件
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  // 父组件传入的图片列表（[{ url: 'xxx' }]）
  modelValue: Array
})

// 本地维护的文件列表
const fileList = ref(props.modelValue || [])
// 预览弹窗相关状态
const dialogVisible = ref(false)
const dialogImageUrl = ref('')

// 删除图片
const handleRemove = (file) => {
  fileList.value = fileList.value.filter(f => f.url !== file.url)
  emit('update:modelValue', fileList.value)
}

// 预览大图
const handlePreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

// 上传地址：目前是一个占位地址，后续可以替换成真实后端接口
const uploadAction = '/api/upload'

// 上传成功：这里直接塞一张随机图片地址，模拟成功效果
const handleSuccess = () => {
  fileList.value.push({ url: 'https://picsum.photos/300/300?random=' + Date.now() })
  emit('update:modelValue', fileList.value)
}
</script>