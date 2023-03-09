<template>
  <router-view></router-view>
  <NavBar v-if="state.isShow" />
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const needNavList = ["home", "category", "cart", "user"]; //需要导航的页面
const state = reactive({
  isShow: true, //是否显示导航
});
router.beforeEach((to, from) => {
  if (needNavList.includes(to.name)) {
    state.isShow = true;
  } else {
    state.isShow = false;
  }
});
</script>


<style lang="less" scoped>
@import "./common/style/mixin";
html,
body {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
