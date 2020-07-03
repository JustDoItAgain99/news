<template>
  <div class="bar" @click="fn">
    <div class="title"><slot></slot></div>
    <div class="content"><slot name="content"></slot></div>
    <div class="arrow iconfont iconjiantou1"></div>
  </div>
</template>

<script>
export default {
  methods: {
    fn() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.bar {
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  padding-right: 20px;
  line-height: 50px;
  font-size: 16px;
  .content {
    flex: 1;
    text-align: right;
    color: #999;
  }
  .arrow {
    padding-left: 10px;
    font-size: 16px;
  }
}
</style>
