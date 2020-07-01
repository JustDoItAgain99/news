import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
// 导入views的组件 使用路由 创建规则 导出router 出口在app.vue
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' }
  ]
})
export default router
