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
  tableOption: {
    stripe: true
  },
  selectionOption: {
  },
  indexOption: {
  },
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
  handleOption: {
    width:'360px',
    show: true,//默认开启的
    edit: {
      text: '编辑', //按钮文字， null= 取消文字
      icon: 'el-icon-edit', //按钮图标
      disabled: (index, row) => {
        if (row.category == 3) return true
        return false
      },// 是否禁用
    },
    remove: {
      icon: 'el-icon-delete', //按钮图标
    },
    custom: [
      {
        text: '进货', //按钮文字， null= 取消文字
        icon: 'el-icon-thumb', //按钮图标
        type:'warning'
      }
    ]
  },
  paginationOption: {
    currentPage: 1,
    pageSize: 20,
    total: 0
  },
  toolbarOption: {
    show: true,//默认是开启的
    create: {
      icon: 'el-icon-circle-plus-outline', //按钮图标
    },
    multipleRemove: {
      icon: 'el-icon-delete',
    }
  },
  // dialogOption: {
  // },
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
        clearable: true,//elementUI属性,同样生效
        event: { //事件
          focus(e) {
            console.log(e);
          },
          change(e) {
            console.log("🚀 ~ file: options.js:134 ~ change ~ change:", e)
          }
        },
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
  }

}
