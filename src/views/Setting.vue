<template>
  <div class="seting-box">
    <simple-header :name="'账号管理'"></simple-header>
    <div class="input-item">
      <van-field v-model="state.nickName" label="昵称" />
      <van-field v-model="state.introduceSign" label="个性签名" />
      <van-field v-model="state.password" type="password" label="修改密码" />
    </div>
    <van-button
      round
      class="save-btn"
      color="#518a4e"
      type="primary"
      @click="save"
      block
      >保存</van-button
    >
    <van-button
      round
      class="save-btn"
      color="#518a4e"
      type="primary"
      @click="handleLogout"
      block
      >退出登录</van-button
    >
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import md5 from "js-md5";
import { getUserInfo, EditUserInfo, logout } from "@/service/user";
import { setLocal } from "@/common/js/utils";
import { showSuccessToast } from "vant";
import { useRouter } from "vue-router";
const router = useRouter();
const state = reactive({
  nickName: "",
  introduceSign: "",
  password: "",
});

onMounted(async () => {
  const { data } = await getUserInfo();
  state.nickName = data.nickName;
  state.introduceSign = data.introduceSign;
});
const save = async () => {
  const params = {
    introduceSign: state.introduceSign,
    nickName: state.nickName,
  };
  if (state.password) {
    params.passwordMd5 = md5(state.password);
  }
  await EditUserInfo(params);
  showSuccessToast("保存成功");
  setTimeout(() => {
    router.push({ path: "user" });
  }, 3000);
};
const handleLogout = async () => {
  const { resultCode } = await logout();
  if (resultCode == 200) {
    setLocal("token", "");
    window.location.href = "/home";
  }
};
</script>

<style lang="less" scoped>
.seting-box {
  .save-btn {
    width: 80%;
    margin: 20px auto;
  }
  .input-item {
    margin-top: 50px;
  }
}
</style>
