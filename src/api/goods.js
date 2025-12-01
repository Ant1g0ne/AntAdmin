// src/api/goods.js
const mockGoods = [
  { id: 1, name: 'Apple iPhone 15 Pro', price: 7999, stock: 88, status: 1, sales: 1234, createTime: '2025-01-15' },
  { id: 2, name: '小米14 Ultra', price: 5999, stock: 56, status: 1, sales: 892, createTime: '2025-01-14' },
  { id: 3, name: '华为 Mate 60 Pro', price: 6999, stock: 0, status: 0, sales: 567, createTime: '2025-01-13' },
  // ...后面会自动生成 50 条
]

// 模拟 50 条数据
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