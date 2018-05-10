// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'lib-flexible/flexible'
import Vue from 'vue'
import App from './App'
import router from './router'
import filters from './filters'
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
