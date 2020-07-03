<template>
  <div class="login">
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <div class="tips">
      如果没有账号，请点击这里
      <router-link to="./register">注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // 获取到路由中的参数，赋值给username和password
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  },
  data() {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请填写用户名和手机号' },
          {
            trigger: 'onChange',
            message: '数字3-6位数',
            pattern: /^\d{3,6}$/
          }
        ],
        password: [
          { required: true, message: '请填写密码' },
          {
            trigger: 'onChange',
            message: '数字3-6位数',
            pattern: /^\d{3,6}$/
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      console.log(res.data)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.$toast(message)
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        this.$router.push('/user')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tips {
  font-size: 14px;
  text-align: right;
  padding-right: 10px;
  a {
    color: skyblue;
  }
}
</style>
