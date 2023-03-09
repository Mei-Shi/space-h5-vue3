<template>
  <div class="home">
    <header class="home-header wrap" :class="{ active: state.headerScroll }">
      <router-link to="./category"
        ><i class="spicon spicon-caidan_o"></i
      ></router-link>
      <div class="header-search">
        <span class="app-name">space商城</span>
        <i class="spicon-31sousuo"></i>
        <router-link class="search-title" to="./product-list"
          >山河无恙，人间皆安</router-link
        >
      </div>
      <router-link class="login" to="./login" v-if="!state.isLogin"
        >登录</router-link
      >
      <router-link class="login" to="./user" v-else>
        <i class="spicon spicon-wode1"></i>
      </router-link>
    </header>
    <swiper :list="state.swiperList"></swiper>
  </div>
  <div class="category-list">
    <div
      v-for="item in state.categoryList"
      v-bind:key="item.categoryId"
      @click="tips"
    >
      <img :src="item.imgUrl" />
      <span>{{ item.name }}</span>
    </div>
  </div>
  <div class="good">
    <header class="good-header">新品上线</header>
    <div class="good-box">
      <div
        class="good-item"
        v-for="item in state.newGoodses"
        :key="item.goodsId"
        @click="goToDetail(item)"
      >
        <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
        <div class="good-desc">
          <div class="title">{{ item.goodsName }}</div>
          <div class="price">¥ {{ item.sellingPrice }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="good">
    <header class="good-header">热门商品</header>
    <div class="good-box">
      <div
        class="good-item"
        v-for="item in state.hots"
        :key="item.goodsId"
        @click="goToDetail(item)"
      >
        <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
        <div class="good-desc">
          <div class="title">{{ item.goodsName }}</div>
          <div class="price">¥ {{ item.sellingPrice }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="good" :style="{ paddingBottom: '100px' }">
    <header class="good-header">最新推荐</header>
    <div class="good-box">
      <div
        class="good-item"
        v-for="item in state.recommends"
        :key="item.goodsId"
        @click="goToDetail(item)"
      >
        <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
        <div class="good-desc">
          <div class="title">{{ item.goodsName }}</div>
          <div class="price">¥ {{ item.sellingPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { getLocal } from "@/common/js/utils";
import { getHome } from "@/service/home";
import { showLoadingToast, closeToast, showToast } from "vant";
const router = useRouter();
const state = reactive({
  isLogin: false, // 是否已登录
  swiperList: [], // 轮播图列表
  hots: [], // 新品上线
  newGoodses: [], // 热门商品
  recommends: [], // 最新推荐
  headerScroll: false, // 滚动透明判断
  categoryList: [
    {
      name: "space超市",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png",
      categoryId: 100001,
    },
    {
      name: "space服饰",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png",
      categoryId: 100003,
    },
    {
      name: "全球购",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png",
      categoryId: 100002,
    },
    {
      name: "space生鲜",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png",
      categoryId: 100004,
    },
    {
      name: "space到家",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png",
      categoryId: 100005,
    },
    {
      name: "充值缴费",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png",
      categoryId: 100006,
    },
    {
      name: "9.9元拼",
      imgUrl: "https://s.yezgea02.com/1604041127880/9.9%402x.png",
      categoryId: 100007,
    },
    {
      name: "领劵",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png",
      categoryId: 100008,
    },
    {
      name: "省钱",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png",
      categoryId: 100009,
    },
    {
      name: "全部",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png",
      categoryId: 100010,
    },
  ],
});
onMounted(async () => {
  const token = getLocal("token");
  if (token) {
    state.isLogin = true;
  }
  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
  });
  const { data } = await getHome();
  state.swiperList = data.carousels;
  state.newGoodses = data.newGoodses;
  state.hots = data.hotGoodses;
  state.recommends = data.recommendGoodses;
  closeToast();
});
// 必须要等到页面DOM渲染结束后再执行下面的方法，否则无效
nextTick(() => {
  document.addEventListener("scroll", () => {
    let scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    scrollTop > 100
      ? (state.headerScroll = true)
      : (state.headerScroll = false);
  });
});
const goToDetail = (item) => {
  router.push({ path: `/product/${item.goodsId}` });
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.home {
  .home-header {
    position: fixed;
    left: 0;
    top: 0;
    .wh(100%, 50px);
    .fj();
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    font-size: 15px;
    color: #fff;
    z-index: 10000;
    &.active {
      background: @primary;
      .spicon {
        color: #fff;
      }
      .login {
        color: #fff;
      }
    }
    i {
      text-align: center;
      font-family: "iconfont" !important;
      font-size: 22px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      color: @primary;
    }

    .header-search {
      display: flex;
      .wh(74%, 30px);
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 20px;
      .app-name {
        padding: 0 5px;
        color: @primary;
        font-size: 20px;
        font-weight: bold;
        border-right: 1px solid #666;
      }
      .spicon-31sousuo {
        padding: 0 6px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
        line-height: 21px;
      }
    }
    .login {
      color: @primary;
      line-height: 52px;
      .spicon-wode1 {
        text-align: center;
        font-family: "iconfont" !important;
        font-size: 22px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        vertical-align: -3px;
      }
    }
  }
}
.category-list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 13px;
  div {
    display: flex;
    flex-direction: column;
    width: 20%;
    text-align: center;
    img {
      .wh(36px, 36px);
      margin: 13px auto 8px auto;
    }
  }
}

.good {
  .good-header {
    background: #f9f9f9;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: @primary;
    font-size: 16px;
    font-weight: 500;
  }
  .good-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .good-item {
      box-sizing: border-box;
      width: 50%;
      border-bottom: 1px solid #e9e9e9;
      padding: 10px 0;
      img {
        display: block;
        width: 120px;
        margin: 0 auto;
      }
      .good-desc {
        text-align: center;
        font-size: 14px;
        padding: 10px 0;
        .title {
          color: #222333;
        }
        .price {
          color: @primary;
        }
      }
      &:nth-child(2n + 1) {
        border-right: 1px solid #e9e9e9;
      }
    }
  }
}
</style>