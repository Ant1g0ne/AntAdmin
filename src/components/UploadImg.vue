<template>
  <el-upload
    v-model:file-list="fileList"
    list-type="picture-card"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :limit="9"
    action="/api/upload"   <!-- 暂时用假地址，后面换真的 -->
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img :src="dialogImageUrl" style="width:100%" />
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: Array
})

const fileList = ref(props.modelValue || [])
const dialogVisible = ref(false)
const dialogImageUrl = ref('')

const handleRemove = (file) => {
  fileList.value = fileList.value.filter(f => f.url !== file.url)
  emit('update:modelValue', fileList.value)
}

const handlePreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const handleSuccess = (res) => {
  fileList.value.push({ url: 'https://picsum.photos/300/300?random=' + Date.now() })  // 假图
  emit('update:modelValue', fileList.value)
}
</script>