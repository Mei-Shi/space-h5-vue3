<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#518a4e">
    <van-swipe-item v-for="(item, index) in list" :key="index">
      <img :src="item.carouselUrl" alt="" @click="goTo(item.redirectUrl)" />
    </van-swipe-item>
  </van-swipe>
</template>

<script setup>
// 通过 defineProps，获取父组件传入的参数
const props = defineProps({
  list: {
    type: Array,
    default: "",
  },
});
// 打开链接的方法
const goTo = (url) => {
  window.open(url);
};
</script>

<style lang='less' scoped>
.my-swipe {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
