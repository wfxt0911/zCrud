<template>
  <div>
      <Crud
          ref="crud" :data="tableList"
          v-bind="option" >
        <div slot="header">
          <el-button-group>
            <el-button size="small" type="primary"  @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
          </el-button-group>
        </div>
      </Crud>
    </div>
  </template>



  <script>

  import {crudOptions} from './crud.js'
  export default {
    name: 'testPage',
    components:{},
    data(){
      return {
        option:{},
        tableList:[
          {
          createDate:'2023-03-09',
          status:'0',
          province:'广东'
        },{
          createDate:'2023-03-08',
          status:'0',
          province:'江西'
        },{
          createDate:'2023-03-09',
          status:'0',
          province:'湖南'
        },{
          createDate:'2023-03-19',
          status:'0',
          province:'吉林'
        },{
          createDate:'2023-03-29',
          status:'0',
          province:'海南'
        },

      ]
      }
    },
    created(){
     this.option= this.getCrudOptions()
    },
    methods: {
      getCrudOptions () { return crudOptions(this) },
      addRow(){
        this.$refs.crud.showDialog({mode:'add'})
      }
    }
  }
  </script>
