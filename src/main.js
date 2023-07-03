import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Router from 'vue-router'

import router from './router/router'
import VueXStore from './store'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Router)

Vue.config.productionTip = false

const app = new Vue({
  store: VueXStore,
  router: router,
  render: h => h(App),
})

app.$mount('#app');