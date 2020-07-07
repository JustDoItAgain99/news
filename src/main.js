import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import {
  Button,
  Field,
  Form,
  Toast,
  Dialog,
  RadioGroup,
  Radio,
  CellGroup,
  Cell,
  Uploader
} from 'vant'
import './less/common.less'
import './less/iconfont.less'
import router from './router/index'
import HmHeader from './components/hm-header.vue'
import HmLogo from './components/hm-logo.vue'
import HmBar from './components/hm-bar.vue'
import axios from 'axios'
import moment from 'moment'

// 把axios放到vue原型里  方便全局使用
Vue.prototype.$axios = axios
// axios 配置默认基地址
axios.defaults.baseURL = 'http://localhost:3000'
// 引入vant的组件然后还有2个less 下面是使用组件和挂载路由
Vue.config.productionTip = false

Vue.use(Uploader)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Form)
Vue.use(Button)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Dialog)

// axios的请求拦截器
axios.interceptors.request.use(function(config) {
  // 只要浏览器发送请求都能拦截到
  // console.log('试试')
  // 给每个请求带上请求头
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// axios 的响应拦截器
axios.interceptors.response.use(function(res) {
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 判断是否是401状态码和这个错误信息  因为账号密码错误的状态码也是401
    // 跳转到登录页面 然后删除token userId 还有提示
    Toast.fail(message)
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }
  return res
})

Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-bar', HmBar)

// 过滤器
Vue.filter('date', function(input) {
  return moment(input).format('YYYY-MM-DD')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
