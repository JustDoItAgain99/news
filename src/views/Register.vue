<template>
  <div class="register">
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.username"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="user.nickname"
        label="昵称"
        placeholder="昵称"
        :rules="rules.nickname"
      />
      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <div class="tips">
      如果有账号，请点击这里 <router-link to="./login">登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: { username: '', password: '', nickname: '' },
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
        ],
        nickname: [
          { required: true, message: '请填写密码' },
          {
            trigger: 'onChange',
            message: '数字6位数',
            pattern: /^\d{6}$/
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      const res = await this.$axios.post('/register', this.user)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: {
            username: this.user.username,
            password: this.user.password
          }
        })
      } else {
        this.$toast.fail(message)
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
