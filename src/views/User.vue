<template>
  <div class="user">
    <div class="box" @click="$router.push('/edit')">
      <div class="title">
        <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      </div>
      <div class="content">
        <p class="name">
          <span class="iconfont iconxingbienv" v-if="info.gender === 0"></span>
          <span class="iconfont iconxingbienan" v-else></span>
          {{ info.nickname }}
        </p>
        <p class="time">{{ info.create_date | date }}</p>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <div class="nav">
      <hm-bar>
        <!-- 这里是默认插槽 -->
        我的关注
        <!-- #是v-slot:的语法糖 -->
        <template #content>关注的用户</template>
      </hm-bar>
      <hm-bar>
        我的跟帖
        <template #content>跟帖/回复</template>
      </hm-bar>
      <hm-bar>
        我的收藏
        <template #content>文章/视频</template>
      </hm-bar>
      <hm-bar @click="$router.push('/edit')">
        设置
        <template #content></template>
      </hm-bar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: ''
    }
  },
  methods: {
    // clickFn() {
    //   // 注册事件然后提供事件处理程序 跳转编辑可以写上面
    //   this.$router.push('/edit')
    // }
  },
  // 获取数据
  async created() {
    const userId = localStorage.getItem('userId')
    // const token = localStorage.getItem('token')
    // // 获取到id然后发送请求拿到用户数据然后渲染
    // const res = await this.$axios.get(`/user/${userId}`, {
    //   // 发送请求里面必须携带token也必须用这个请求头  不需要token验证的页面带着不影响
    //   headers: {
    //     Authorization: token
    //   }
    // })
    // console.log(res)
    // 判断状态码200就获取数据渲染 401就提示然后跳转login 删除userId和token
    const res = await this.$axios.get(`/user/${userId}`)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.info = data
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  .box {
    display: flex;
    height: 120px;
    border-bottom: 5px solid #ccc;
    align-items: center;
    padding: 0 20px;
    .title {
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .content {
      flex: 1;
      padding-left: 20px;
      font-size: 14px;
      color: #333;
      .name {
        margin-bottom: 10px;
        .iconxingbienv {
          color: #f23ebf;
        }
        .iconxingbienan {
          color: #80bbe4;
        }
      }
      .time {
        color: #999;
      }
    }
  }
  .nav {
    padding-left: 20px;
  }
}
</style>
