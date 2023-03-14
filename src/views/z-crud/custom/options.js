import zCaptcha from '@/components/z-captcha'

export default {
  searchOption: {
    query: {
      name: {
        label: '商品名称',
        component: {
          name: 'el-input',
          disabled: false,
          span: 8,
        }
      },
      stock: {
        label: '库存数量',
        component: {
          name: 'el-input',
          disabled: false,
          span: 8,
        }
      },
      category: {
        label: '商品分类',
        value: 1,
        component: {
          name: 'el-select',
          span: 8,
          options: [
            {
              label: '全部',
              value: 1
            },
            {
              label: '家电',
              value: 2
            },
            {
              label: '家具',
              value: 3
            },
            {
              label: '食物',
              value: 4
            },
          ]
        }
      },
    }
  },
  data: [],
  columns: [
    {
      label: '商品名称',
      field: 'name',

    },
    {
      label: '商品价格',
      field: 'price',
    },
    {
      label: '商品库存',
      field: 'stock',
    },
    {
      label: '商品分类',
      field: 'category',
    },
    {
      label: '状态',
      field: 'status',
    },
    {
      label: '过期日期',
      field: 'expirationDate',
    },
  ],
  paginationOption: {
    currentPage: 1,
    pageSize: 20,
    total: 0
  },
  formOption: {
    rules: {
      name: [{ required: true, trigger: 'blur', message: '此项是必填项' }],
      price: [{ required: true, trigger: 'blur', message: '此项是必填项' }],
      stock: [{ required: true, trigger: 'blur', message: '此项是必填项' }],
      category: [{ required: true, trigger: 'blur', message: '此项是必填项' }],
      expirationDate: [{ required: true, trigger: 'blur', message: '此项是必填项' }],
    },
  },
  formItemOption: {
    name: {
      label: '商品名称',
      component: {
        name: 'el-input',
        disabled: false,
        span: 12,
      }
    },
    category: {
      label: '商品分类',
      value: 3,//默认值3
      component: {
        name: 'el-select', //组件类型
        span: 12,//占12格子
        options: [ //部分组件需要选项
          {
            label: '家电',
            value: 2
          },
          {
            label: '家具',
            value: 3
          },
          {
            label: '食物',
            value: 4
          },
        ]
      }
    },

    price: {
      label: '商品价格',
      component: {
        name: 'el-input-number',
        disabled: false,
        span: 12,
      }
    },
    stock: {
      label: '商品库存',
      value: 1,
      component: {
        name: 'el-input-number',
        span: 12,
        options: [
          {
            label: '全部1',
            value: 1
          }, {
            label: '全部2',
            value: 2
          }]
      }
    },
    expirationDate: {
      label: '过期日期',
      component: {
        name: 'el-date-picker',
        valueFormat: "yyyy-MM-dd",
        span: 12,
      }
    },
    code:{
      label:'验证码',
      component: {
        name: zCaptcha,
        span: 12,
        props:{
          placeholder:'请获取验证码'
        },
        on:{
          getCaptcha(){
            console.log('开始模拟请求后端的短信接口');
          }
        }
      }
    }
  }

}
