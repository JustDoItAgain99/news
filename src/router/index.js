import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import UserEdit from '../views/User-edit.vue'
// 导入views的组件 使用路由 创建规则 导出router 出口在app.vue
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/user', component: User, name: 'user' },
    { path: '/edit', component: UserEdit, name: 'edit' }
  ]
})
const pages = ['/user', '/edit']
router.beforeEach(function(to, from, next) {
  // 路由导航卫士  三个参数 去哪 从哪来 交给别人 最后一个用next()
  // 判断是否有token有就放行 没有就跳转回登录
  const token = localStorage.getItem('token')
  if (pages.includes(to.path)) {
    // 跳转地址是否是需要带token的 没有就放行
    if (token) {
      // 判断是否有token
      next() // 放行
    } else {
      // 跳转页面
      router.push('/login')
    }
  } else {
    next()
  }
})
export default router
