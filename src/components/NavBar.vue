<template>
  <div class="nav-bar van-hairline--top">
    <ul class="nav-list">
      <router-link class="nav-list-item active" to="home">
        <i class="spicon spicon-shouye"></i>
        <span>首页</span>
      </router-link>
      <router-link class="nav-list-item" to="category">
        <i class="spiocn spicon-sort"></i>
        <span>分类</span>
      </router-link>
      <router-link class="nav-list-item" to="cart">
        <!-- <i
          class="spiocn spicon-gouwuche"
          :badge="!cart.count ? '' : cart.count"
        ></i> -->
        <van-icon
          class="spiocn spicon-gouwuche"
          :badge="!cart.count ? '' : cart.count"
        />

        <span>购物车</span>
      </router-link>
      <router-link class="nav-list-item" to="user">
        <i class="spiocn spicon-wode1"></i>
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useCartStore } from "@/stores/cart";
import { getLocal } from "@/common/js/utils";
const cart = useCartStore();
onMounted(() => {
  const token = getLocal("token");
  if (token) {
    cart.updateCart();
  }
});
</script>
<style lang="less" scoped>
@import "../common/style/mixin";
.nav-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 5px 0;
  z-index: 1000;
  background: #fff;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  .nav-list {
    width: 100%;
    .fj();
    flex-direction: row;
    padding: 0;
    .nav-list-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      color: #666;
      &.router-link-active {
        color: @primary;
      }
      i {
        text-align: center;
        font-family: "iconfont" !important;
        font-size: 22px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
      }
      span {
        font-size: 12px;
      }
      .spicon-gouwuche {
        text-align: center;
        margin: auto auto;
      }
    }
  }
}
</style>