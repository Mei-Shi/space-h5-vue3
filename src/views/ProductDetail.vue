<template>
  <div class="product-detail">
    <simple-header :name="'商品详情'"></simple-header>
    <div class="detail-content">
      <div class="detail-swipe-wrap">
        <van-swipe class="my-swipe" indicator-color="#518a4e">
          <van-swipe-item
            v-for="(item, index) in state.detail.goodsCarouselList"
            :key="index"
          >
            <img :src="item" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-info">
        <div class="product-title">
          {{ state.detail.goodsName }}
        </div>
        <div class="product-desc">免邮费 顺丰快递</div>
        <div class="product-price">
          <span>¥{{ state.detail.sellingPrice }}</span>
        </div>
      </div>
      <div class="product-intro">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div
          class="product-content"
          v-html="state.detail.goodsDetailContent"
        ></div>
      </div>
    </div>
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon
        icon="cart-o"
        :badge="!cart.count ? '' : cart.count"
        @click="goTo()"
        text="购物车"
      />
      <van-action-bar-button
        type="warning"
        @click="handleAddCart"
        text="加入购物车"
      />
      <van-action-bar-button type="danger" @click="goToCart" text="立即购买" />
    </van-action-bar>
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <!--通过 cart.count 获取购物车的数量，赋值给模板-->
      <van-action-bar-icon
        icon="cart-o"
        :badge="!cart.count ? '' : cart.count"
        @click="goTo()"
        text="购物车"
      />
      <van-action-bar-button
        type="warning"
        @click="handleAddCart"
        text="加入购物车"
      />
      <van-action-bar-button type="danger" @click="goToCart" text="立即购买" />
    </van-action-bar>
  </div>
</template>

<script setup>
import { reactive, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDetail } from "@/service/goods";
import { addCart } from "@/service/cart";
import { showSuccessToast } from "vant";
import { useCartStore } from "@/stores/cart";
const router = useRouter();
const route = useRoute();
const cart = useCartStore();
const state = reactive({
  detail: {
    goodsCarouselList: [],
  },
});
onMounted(async () => {
  const { id } = route.params;
  const { data } = await getDetail(id);
  state.detail = data;
  state.detail = data;
  cart.updateCart(); // 每次进入详情页的时候，默认更新一次购物车状态数据
});
const goBack = () => {
  router.back();
};
const goTo = () => {
  router.push({ path: "/cart" });
};
const handleAddCart = async () => {
  const { data, resultCode } = await addCart({
    goodsCount: 1,
    goodsId: state.detail.goodsId,
  });
  if (resultCode == 200) showSuccessToast("添加成功");
  cart.updateCart(); // 每次添加成功，更新一次购物车状态数据
};
const goToCart = async () => {
  // 前往购物车页面，此时还未创建购物车页面，先作占位
  const { data, resultCode } = await addCart({
    goodsCount: 1,
    goodsId: state.detail.goodsId,
  });
  cart.updateCart(); // 前往购物车页面前，再更新一次状态
  router.push({ path: "/cart" });
};
</script>

<style lang="less">
@import "../common/style/mixin";
.product-detail {
  .detail-header {
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
    .product-name {
      font-size: 14px;
    }
  }
  .detail-content {
    margin-top: 44px;
    .detail-swipe-wrap {
      .my-swipe .van-swipe-item {
        img {
          width: 100%;
          // height: 300px;
        }
      }
    }
    .product-info {
      padding: 0 10px;
      .product-title {
        font-size: 18px;
        text-align: left;
        color: #333;
      }
      .product-desc {
        font-size: 14px;
        text-align: left;
        color: #999;
        padding: 5px 0;
      }
      .product-price {
        .fj();
        span:nth-child(1) {
          color: #f63515;
          font-size: 22px;
        }
        span:nth-child(2) {
          color: #999;
          font-size: 16px;
        }
      }
    }
    .product-intro {
      width: 100%;
      ul {
        .fj();
        width: 100%;
        margin: 10px 0;
        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          font-size: 15px;
          border-right: 1px solid #999;
          box-sizing: border-box;
          &:last-child {
            border-right: none;
          }
        }
      }
      .product-content {
        padding: 0 20px;
        img {
          width: 100%;
        }
      }
    }
  }
  .van-goods-action-button--warning {
    background: linear-gradient(to right, #6bd86d, @primary);
  }
  .van-goods-action-button--danger {
    background: linear-gradient(to right, #45b03a, #0d7627);
  }
}
</style>