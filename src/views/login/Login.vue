<template>
  <div class="login-wrap">
    <div class="login-box">
      <h2>AntAdmin</h2>
      <el-form style="margin-top:40px">
        <el-input v-model="user" placeholder="用户名：admin" size="large" clearable />
        <el-input v-model="pass" type="password" placeholder="密码：123456" show-password size="large" style="margin-top:20px" />
        <el-button type="primary" size="large" style="width:100%;margin-top:30px" @click="login">立即登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const user = ref('admin')
const pass = ref('123456')

const login = () => {
  localStorage.setItem('token', 'antadmin-2025')
  router.push('/dashboard')
}
</script>

<style scoped>
.login-wrap{height:100vh;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;justify-content:center;align-items:center;}
.login-box{width:420px;padding:50px 40px;background:white;border-radius:12px;box-shadow:0 20px 50px rgba(0,0,0,0.3);text-align:center;}
</style>