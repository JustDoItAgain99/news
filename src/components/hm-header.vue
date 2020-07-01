<template>
  <div class="hm-header">
    <!-- 分三个部分 左右各固定中间内容自适应 文字用默认插槽 左边那个注册点击事件然后回退一页 -->
    <div class="back iconfont iconjiantou" @click="$router.back()"></div>
    <div class="title"><slot></slot></div>
    <div class="reserved"></div>
  </div>
</template>

<script>
// 通用头部组件
export default {}
</script>

<style lang="less" socped>
.hm-header {
  display: flex;
  text-align: center;
  .back {
    width: 40px;
    height: 40px;
    padding-top: 10px;
  }
  .title {
    flex: 1;
    line-height: 40px;
    font-weight: 700;
  }
  .reserved {
    width: 40px;
    height: 40px;
    text-align: right;
    padding-right: 10px;
  }
}
</style>
