<template>
  <header class="simple-header">
    <i class="spicon spicon-arrow-left-bold" @click="goBack"></i>
    <div class="simple-header-title">{{ props.name }}</div>
    <i class="spicon spicon-gengduo"></i>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
});
const goBack = () => {
  router.back();
};
</script>


<style lang="less" scoped>
@import "../common/style/mixin";
.simple-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  .fj();
  .wh(100%, 44px);
  line-height: 44px;
  padding: 0 10px;
  .boxSizing();
  color: #252525;
  background: #fff;
  border-bottom: 1px solid #dcdcdc;
  .simple-header-title {
    font-size: 14px;
  }
  i {
    text-align: center;
    font-family: "iconfont" !important;
    font-size: 18px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
  }
}
</style>