export default {
  searchOption: {
    gutter: 60,
    // size:'default',
    query: {
      name: {
        label: '姓名',
        component: {
          name: 'el-input',
          disabled: false,
          span: 8,
        }
      },
      subject: {
        label: '科目',
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
              label: '英语',
              value: 2
            },
            {
              label: '数学',
              value: 3
            },
          ]
        }
      },
      teacher: {
        label: '班主任',
        component: {
          name: 'el-input',
          disabled: false,
          span: 8,
        }
      },
      teach2er: {
        label: '班主任2',
        component: {
          name: 'el-input',
          disabled: false,
          span: 8,
        }
      },
      teach2er1: {
        label: '班主任2',
        component: {
          name: 'el-input',
          disabled: false,
          span: 8,
        }
      },
      teach2er11: {
        label: '班主任2',
        component: {
          name: 'el-input',
          disabled: false,
          span: 8,
        }
      },
    }
  },
  // data: [
  //   {
  //     name: '张三',
  //     subject: '语文',
  //     teacher: '李白'
  //   },
  //   {
  //     name: '李四',
  //     subject: '语文',
  //     teacher: '杜甫'
  //   },
  //   {
  //     name: '李四',
  //     subject: '物理',
  //     teacher: '张朝阳'
  //   },
  // ],
  data: [],
  tableOption: {
    stripe: true
  },
  selectionOption: {
  },
  indexOption: {
    title: '序号'
  },
  columns: [
    {
      label: '姓名',
      field: 'name'
    },
    {
      label: '课程',
      field: 'subject',

    },
    {
      label: '班主任',
      field: 'teacher',
      align: 'left',
    },
  ],
  handleOption: {
    edit: {
      text: '编辑', //按钮文字， null= 取消文字
      icon: 'icon-edit', //按钮图标
      // size:'default',
      disabled: (index, row) => {
        if (row.name == '李四') return true
        return false
      }// 是否禁用
    },
    remove: {},
    custom: [
      {
        text: '编辑', //按钮文字， null= 取消文字
        icon: 'icon-edit', //按钮图标
        disabled: (index, row) => {
          if (row.name == '李1四') return true
          return false
        },// 是否禁用
        emit: 'edit'
      },
      {
        text: '编辑', //按钮文字， null= 取消文字
        icon: 'icon-edit', //按钮图标
        disabled: (index, row) => {
          if (row.name == '李四') return true
          return false
        },
        emit: 'edit'
      }
    ]
  },
  paginationOption: {
    currentPage: 1,
    pageSize: 20,
    total: 1000
  }

}
