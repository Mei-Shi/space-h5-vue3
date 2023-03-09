<template>
  <div class="user-box">
    <simple-header :name="'我的'"></simple-header>
    <div class="user-info">
      <div class="info">
        <img src="https://s.yezgea02.com/1604040746310/aaaddd.png" />
        <div class="user-desc">
          <span>昵称：{{ state.user.nickName }}</span>
          <span>登录名：{{ state.user.loginName }}</span>
          <span class="name">个性签名：{{ state.user.introduceSign }}</span>
        </div>
      </div>
    </div>
    <ul class="user-list">
      <li class="van-hairline--bottom" @click="goTo('/order')">
        <span>我的订单</span>
        <van-icon name="arrow" />
      </li>
      <li class="van-hairline--bottom" @click="goTo('/setting')">
        <span>账号管理</span>
        <van-icon name="arrow" />
      </li>
      <li
        class="van-hairline--bottom"
        @click="goTo('/address', { from: 'mine' })"
      >
        <span>地址管理</span>
        <van-icon name="arrow" />
      </li>
      <li @click="goTo('/about')">
        <span>关于我们</span>
        <van-icon name="arrow" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { getUserInfo } from "@/service/user";
import { useRouter } from "vue-router";
const router = useRouter();
const state = reactive({
  user: {},
});
onMounted(async () => {
  const { data } = await getUserInfo();
  state.user = data;
});
const goTo = (r, query) => {
  router.push({ path: r, query: query || {} });
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.user-box {
  .user-info {
    width: 94%;
    margin: 10px;
    height: 115px;
    background: linear-gradient(90deg, @primary, #518a4e);
    box-shadow: 0 2px 5px #326e28;
    border-radius: 6px;
    margin-top: 50px;
    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;
      .boxSizing();
      img {
        .wh(60px, 60px);
        border-radius: 50%;
        margin-top: 4px;
      }
      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;
        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }
  .user-list {
    padding: 0 20px;
    margin-top: 20px;
    li {
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .van-icon-arrow {
        margin-top: 13px;
      }
    }
  }
}
</style>