import zCrud from './z-crud.vue'
const install = (Vue, options) => {
  Vue.component('zCrud', zCrud)
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default Object.assign(zCrud, { install })
