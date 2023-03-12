const Mock = require('mockjs')


const mockData = (query) => {
  const { pageSize, currentPage, name, stock, category } = query
  const list = 'list|' + (pageSize || 20)
  const electrical = ['美的电磁炉', '格力空调', '至高压榨机']
  const food = ['五羊雪糕', '龟苓膏', '菲力牛排']
  const furniture = ['实木圆桌60cm', '床尾凳', '真皮沙发(藏青色)', '妆凳', '化妆台']
  const _nameList = [...electrical, ...food, ...furniture]

  return Mock.mock({
    [list]: [{
      id: '@increment',
      'name|1': _nameList.filter(_name => {
        if (!name && (!category||category==1)) return true
        if (category) {
          switch (Number(category)) {
            case 2:
              return electrical.includes(_name)
            case 3:
              return furniture.includes(_name)
            case 4:
              return food.includes(_name)
            default:
              return false
          }
        }
        return _name == name
      }),
      // 'status|1': ['published', 'draft', 'deleted'],
      price: '@integer(01, 100)',
      stock: '@integer(01, 100)',
      category: (category&&category!=1)?Number(category):'@integer(2, 4)',
      expirationDate: '@date("yyyy-MM-dd")',
      status: '@integer(1, 2)'
    }]
  })

}




module.exports = [
  // user login
  {
    url: '/goods/list',
    type: 'get',
    response: config => {

      const list = mockData(config.query).list
      return {
        code: 20000,
        msg: '请求成功',
        data: {
          total: list.length * 12,
          list
        }
      }
    }
  },



]
