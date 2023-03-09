<template>
  <div class="login">
    <simple-header
      :name="state.type == 'login' ? '登录' : '注册'"
      :back="'/home'"
    ></simple-header>
    <img src="/space.png" alt="" class="logo" />
    <div v-if="state.type == 'login'" class="login-body login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="state.username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="state.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          center
          clearable
          label="验证码"
          placeholder="输入验证码"
          v-model="state.verify"
        >
          <template #button>
            <vue-image-verify ref="verifyRef"></vue-image-verify>
          </template>
        </van-field>
        <div style="margin: 16px">
          <div class="link-register" @click="toggle('register')">立即注册</div>
          <van-button round block color="#518a4e" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
    <div v-else class="login-body register">
      <van-form @submit="onSubmit">
        <van-field
          v-model="state.username1"
          name="username1"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="state.password1"
          type="password"
          name="password1"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          center
          clearable
          label="验证码"
          placeholder="输入验证码"
          v-model="state.verify"
        >
          <template #button>
            <vue-image-verify ref="verifyRef"></vue-image-verify>
          </template>
        </van-field>
        <div style="margin: 16px">
          <div class="link-login" @click="toggle('login')">已有登录账号</div>
          <van-button round block color="#518a4e" native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { showFailToast, showSuccessToast } from "vant";
import { login, register } from "@/service/user";
import md5 from "js-md5";
import { setLocal } from "@/common/js/utils";
const verifyRef = ref(null);
const state = reactive({
  username: "",
  password: "",
  username1: "",
  password1: "",
  type: "login",
  imgCode: "",
  verify: "",
});

const toggle = (v) => {
  state.type = v;
  state.verify = "";
};

const onSubmit = async (values) => {
  state.imgCode = verifyRef.value.state.imgCode || "";
  if (state.verify.toLowerCase() != state.imgCode.toLocaleLowerCase()) {
    showFailToast("验证码有误");
    return;
  }
  if (state.type == "login") {
    const { data } = await login({
      loginName: values.username,
      passwordMd5: md5(values.password),
    });
    setLocal("token", data);
    //需要刷新页面，否则axios.js文件里的token不会被重置
    window.location.href = "/";
  } else {
    await register({
      loginName: values.username1,
      password: values.password1,
    });
    showSuccessToast("注册成功");
    state.type = "login";
    state.verify = "";
  }
};
</script>

<style lang="less" scoped>
.login {
  .logo {
    width: 230px;
    height: 80px;
    display: block;
    margin: 80px auto 20px;
  }
  .login-body {
    padding: 0 20px;
  }
  .login {
    .link-register {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
    }
  }
  .register {
    .link-login {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
    }
  }
  .verify-bar-area {
    margin-top: 24px;
    .verify-left-bar {
      border-color: #1baeae;
    }
    .verify-move-block {
      background-color: #1baeae;
      color: #fff;
    }
  }
  .verify {
    > div {
      width: 100%;
    }
    display: flex;
    justify-content: center;
    .cerify-code-panel {
      margin-top: 16px;
    }
    .verify-code {
      width: 40% !important;
      float: left !important;
    }
    .verify-code-area {
      float: left !important;
      width: 54% !important;
      margin-left: 14px !important;
      .varify-input-code {
        width: 90px;
        height: 38px !important;
        border: 1px solid #e9e9e9;
        padding-left: 10px;
        font-size: 16px;
      }
      .verify-change-area {
        line-height: 44px;
      }
    }
  }
}
</style>