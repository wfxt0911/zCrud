# zCrud

> 🍢 您相信吗？实现下面的新增、查询、编辑、删除、批量删除、分页等功能只需要一个组件？

> 🏀 zCrud是使用elementUI框架进行二次封装，主要js变量来配置你需要好的html，除了可以使用elementUI的官方组件进行表单项的配置，你也可以使用你`自己封装的组件`， 也就是zCrud组件封装了新增、查询、编辑、删除、批量删除、分页等功能到一个组件；同时高达10+多项的配置，可以满足较多场景下的需求


![dd](https://img-blog.csdnimg.cn/c155a33cd46343058bdf2cc1b7249123.jpeg#pic_center)

> 🍖 带你看下vue的template标签有什么内容?

```html
<template>
  <div class='z-crud-demo hidden-container'>
    <zCrud ref="zCrud" v-bind="options" @save="save" @search="search" @search-reset="searchReset" @remove="remove"
      @multiple-remove="multipleRemove" @pagination-size-change="paginationSizeChange"
      @pagination-current-change="paginationcurrentChange" @before-edit="beforeEdit">
      <!-- 插槽格式化文案 -->
      <template #category="{ row }">{{ categoryFormat(row.category) }}</template>
    </zCrud>
  </div>
</template>
```

> ⏳ 此项目是直接用mock模拟的数据；点击编辑按钮的时候需要从事件中拿到id进行接口请求到表单数据

> 🍧 怎么启动项目

```shell
  npm i
  npm run dev
```