import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import { Button, Field, Form, Toast } from 'vant'
import './less/common.less'
import './less/iconfont.less'
import router from './router/index'
import HmHeader from './components/hm-header.vue'
import HmLogo from './components/hm-logo.vue'
import axios from 'axios'
// 把axios放到vue原型里  方便全局使用
Vue.prototype.$axios = axios
// axios 配置默认基地址
axios.defaults.baseURL = 'http://localhost:3000'
// 引入vant的组件然后还有2个less 下面是使用组件和挂载路由
Vue.config.productionTip = false

Vue.use(Form)
Vue.use(Button)
Vue.use(Field)
Vue.use(Toast)

Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
