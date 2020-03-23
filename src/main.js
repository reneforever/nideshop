import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

//引入lazyload
import {Lazyload} from 'vant'
Vue.use(Lazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
