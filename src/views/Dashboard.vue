<template>
  <div class="dashboard">
    <!-- 顶部 4 个统计卡片 -->
    <el-row :gutter="20">
      <el-col :span="6"><div class="card"><h3>今日销售额</h3><p>¥ 126,549</p></div></el-col>
      <el-col :span="6"><div class="card"><h3>订单数</h3><p>1,234</p></div></el-col>
      <el-col :span="6"><div class="card"><h3>商品总数</h3><p>568</p></div></el-col>
      <el-col :span="6"><div class="card"><h3>用户数</h3><p>89,234</p></div></el-col>
    </el-row>

    <!-- 下方 2 个图表：销售趋势 + 商品分类占比 -->
    <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="12"><div ref="lineChart" class="chart"></div></el-col>
      <el-col :span="12"><div ref="pieChart" class="chart"></div></el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const lineChart = ref()
const pieChart = ref()

// 挂载后初始化 ECharts 图表，并监听窗口尺寸变化做自适应
onMounted(() => {
  // 折线图：近 7 天销售额趋势
  echarts.init(lineChart.value).setOption({
    title: { text: '近7天销售额趋势' },
    tooltip: { trigger: 'axis' },
    xAxis: { data: ['周一','周二','周三','周四','周五','周六','周日'] },
    yAxis: {},
    series: [{ type: 'line', smooth: true, data: [12000, 18000, 15000, 23000, 28000, 22000, 31000], itemStyle: { color: '#667eea' } }]
  })

  // 饼图：商品分类占比
  echarts.init(pieChart.value).setOption({
    title: { text: '商品分类占比' },
    // tooltip 中显示：名称 + 数值 + 百分比（百分比由 ECharts 根据 value 实时计算）
    tooltip: { trigger: 'item', formatter: '{b}<br/>数量：{c}<br/>占比：{d}%' },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      // 在饼图扇区上直接显示“名称：百分比”
      label: {
        formatter: '{b}: {d}%'
      },
      data: [
        { value: 335, name: '电子产品' },
        { value: 234, name: '服饰鞋包' },
        { value: 154, name: '美妆个护' },
        { value: 120, name: '食品饮料' }
      ],
      emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.5)' } }
    }]
  })

  // 监听窗口大小变化，保持图表自适应
  window.addEventListener('resize', () => {
    echarts.getInstanceByDom(lineChart.value)?.resize()
    echarts.getInstanceByDom(pieChart.value)?.resize()
  })
})
</script>

<style scoped>
.dashboard { padding: 20px; }
.card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); text-align: center; }
.card h3 { margin: 0; color: #999; }
.card p { font-size: 28px; font-weight: bold; color: #667eea; margin: 10px 0 0; }
.chart { height: 400px; background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
</style>