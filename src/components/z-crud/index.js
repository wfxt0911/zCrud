import zCrud from './z-crud.vue'


const install = (Vue, options) => {
  if (options) {
    Vue.prototype.$zCrudSize = options.size ? options.size : null
  } else {
    Vue.prototype.$zCrudSize = null
  }
  Vue.component('zCrud', zCrud)
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default Object.assign(zCrud, { install })
