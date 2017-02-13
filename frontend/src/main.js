/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎12 ‏‎15:42:53
 * @modify date 2017‎-0‎2-09 ‏‎22:27:16
*/

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './routes'
import store from './store'
import axios from './store/axios'
import commoncomponents from './commonComponents'
import directives from './directive'
import filters from './filters'

commoncomponents(Vue)
directives(Vue)
filters(Vue)
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  template: '<App/>',
  components: { App },
  router: router,
  store: store
}).$mount('#app')
