<template>
  <div class="user-eidt">
    <hm-header>编辑</hm-header>
    <div class="avator">
      <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>
    <div class="navbar">
      <hm-bar @click="shownickename">
        昵称
        <template #content>{{ info.nickname }}</template>
      </hm-bar>
      <hm-bar @click="showpsd">
        密码
        <template #content>***</template>
      </hm-bar>
      <hm-bar @click="showGenderFn">
        性别
        <template #content>{{ info.gender === 1 ? '男' : '女' }}</template>
      </hm-bar>
    </div>
    <!-- 显示修改模态框 -->
    <van-dialog
      v-model="show"
      @confirm="edituser"
      title="修改昵称"
      show-cancel-button
    >
      <van-field v-model="nickname" placeholder="请输入新昵称" />
    </van-dialog>
    <van-dialog
      v-model="showpsw"
      @confirm="editpsd"
      title="修改密码"
      show-cancel-button
    >
      <van-field v-model="password" placeholder="请输入新密码" />
    </van-dialog>

    <!-- <van-dialog
        v-model="showgenDer"
        @confirm="edditgender"
        title="修改性别"
        show-cancel-button
      >
        <van-field v-model="gender" placeholder="请输入性别" />
      </van-dialog> -->
    <van-dialog
      v-model="showGender"
      title="修改性别"
      show-cancel-button
      @confirm="edditgender"
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: '',
      show: false,
      nickname: '',
      password: '',
      showpsw: false,
      showGender: false,
      gender: 1
    }
  },
  created() {
    this.getusermsg()
  },
  methods: {
    shownickename() {
      this.show = true
      this.nickname = this.info.nickname
    },
    showpsd() {
      this.showpsw = true
      this.password = this.info.password
    },
    showGenderFn() {
      this.showGender = true
      this.gender = this.info.gender
    },
    async editAll(data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getusermsg()
      } else {
        this.$toast.fail(message)
      }
    },
    async edditgender() {
      this.editAll({ gender: this.gender })
      // const userId = localStorage.getItem('userId')
      // const res = await this.$axios.post(`/user_update/${userId}`, {
      //   gender: this.gender
      // })
      // const { statusCode, message } = res.data
      // if (statusCode === 200) {
      //   this.$toast.success(message)
      //   this.getusermsg()
      // } else {
      //   this.$toast.fail(message)
      // }
    },
    async editpsd() {
      this.editAll({ password: this.password })
      // const userId = localStorage.getItem('userId')
      // const res = await this.$axios.post(`/user_update/${userId}`, {
      //   password: this.password
      // })
      // const { statusCode, message } = res.data
      // if (statusCode === 200) {
      //   this.$toast.success(message)
      //   this.getusermsg()
      // } else {
      //   this.$toast.fail(message)
      // }
    },
    async edituser() {
      this.editAll({ nickname: this.nickname })
      // const userId = localStorage.getItem('userId')
      // const res = await this.$axios.post(`/user_update/${userId}`, {
      //   nickname: this.nickname
      // })
      // const { statusCode, message } = res.data
      // if (statusCode === 200) {
      //   this.$toast.success(message)
      //   this.getusermsg()
      // } else {
      //   this.$toast.fail(message)
      // }
    },
    async getusermsg() {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)

      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
        // console.log(res)
      }
    },
    async afterRead(file) {
      const fd = new FormData()
      fd.append('file', file.file)
      const res = await this.$axios.post('/upload', fd)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.editAll({
          head_img: data.url
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-eidt {
  .avator {
    text-align: center;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
  .navbar {
    padding-left: 20px;
  }
}
</style>
