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
  import Crud from '@/components/Crud/d2-crud.vue' //上文的crudOptions配置
  import {crudOptions} from './crud.js'
  export default {
    name: 'testPage',
    components:{Crud},
    data(){
      return {
        option:{},
        tableList:[]
      }
    },
    created(){
     this.option= this.getCrudOptions()
    },
    methods: {
      getCrudOptions () { return crudOptions(this) },
      addRow(){
        console.log( this.$refs);
        this.$refs.crud.showDialog('add')
      }
    }
  }
  </script>