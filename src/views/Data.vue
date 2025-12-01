<template>
  <div class="data-page">
    <el-card>
      <template #header>
        <span>数据统计</span>
      </template>
      <el-row :gutter="20">
        <el-col :span="12">
          <!-- 图表 1：订单量趋势 -->
          <div ref="chart1" class="chart"></div>
        </el-col>
        <el-col :span="12">
          <!-- 图表 2：用户来源占比 -->
          <div ref="chart2" class="chart"></div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chart1 = ref()
const chart2 = ref()

// 页面挂载后初始化图表
onMounted(() => {
  if (chart1.value) {
    const ins1 = echarts.init(chart1.value)
    ins1.setOption({
      title: { text: '订单量趋势' },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: ['周一','周二','周三','周四','周五','周六','周日'] },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', data: [120, 200, 150, 80, 70, 110, 130] }]
    })
  }
  if (chart2.value) {
    const ins2 = echarts.init(chart2.value)
    ins2.setOption({
      title: { text: '用户来源占比' },
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 1048, name: '小程序' },
          { value: 735, name: 'H5' },
          { value: 580, name: 'APP' },
          { value: 484, name: 'PC' }
        ]
      }]
    })
  }
})
</script>

<style scoped>
.data-page {
  padding: 10px;
}
.chart {
  height: 360px;
}
</style>
*** End Patch```}`}

