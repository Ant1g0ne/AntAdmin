// 使用内存数组模拟商品数据和增删改查
const mockGoods = [
  { id: 1, name: 'Apple iPhone 15 Pro', price: 7999, stock: 88, status: 1, sales: 1234, createTime: '2025-01-15' },
  { id: 2, name: '小米14 Ultra', price: 5999, stock: 56, status: 1, sales: 892, createTime: '2025-01-14' },
  { id: 3, name: '华为 Mate 60 Pro', price: 6999, stock: 0, status: 0, sales: 567, createTime: '2025-01-13' },
  // 随后自动生成50条商品信息
]

// 模拟批量生成 50 条数据，用来展示分页等效果
for (let i = 4; i <= 50; i++) {
  mockGoods.push({
    id: i,
    name: `商品 ${i} - 超长商品名称示例`,
    price: Math.floor(Math.random() * 8000) + 999,
    stock: Math.floor(Math.random() * 200),
    status: Math.random() > 0.3 ? 1 : 0,
    sales: Math.floor(Math.random() * 2000),
    createTime: `2025-01-${String(20 - (i % 20)).padStart(2, '0')}`
  })
}

// 新增商品（前端内存模拟）
export const addGoods = (data) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const id = mockGoods[mockGoods.length - 1]?.id + 1 || 1
      // 为了让新加的商品立刻出现在第一页，这里插入到数组最前面
      mockGoods.unshift({
        id,
        status: 1,
        sales: 0,
        createTime: new Date().toISOString().slice(0, 10),
        ...data
      })
      resolve({ code: 200, data: { id } })
    }, 300)
  })
}

// 根据 id 获取商品详情（编辑页使用）
export const getGoodsDetail = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = mockGoods.find(it => it.id === Number(id))
      if (item) resolve({ code: 200, data: item })
      else reject(new Error('商品不存在'))
    }, 200)
  })
}

// 更新商品
export const updateGoods = (id, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockGoods.findIndex(it => it.id === Number(id))
      if (index === -1) return reject(new Error('商品不存在'))
      mockGoods[index] = { ...mockGoods[index], ...data }
      resolve({ code: 200 })
    }, 300)
  })
}

// 删除商品
export const deleteGoods = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockGoods.findIndex(it => it.id === Number(id))
      if (index === -1) return reject(new Error('商品不存在'))
      mockGoods.splice(index, 1)
      resolve({ code: 200 })
    }, 300)
  })
}

// 分页查询商品列表
export const getGoodsList = (params) => {
  return new Promise(resolve => {
    setTimeout(() => {
      let list = mockGoods
      const { page = 1, pageSize = 10, name } = params
      if (name) {
        list = list.filter(item => item.name.includes(name))
      }
      const total = list.length
      const start = (page - 1) * pageSize
      resolve({
        code: 200,
        data: {
          list: list.slice(start, start + pageSize),
          total
        }
      })
    }, 300)
  })
}