<template>
  <div class="box">
    <!-- 主体区域 -->

    <!-- 个人信息 -->
    <div class="personal-msg">
      <div class="box-left">
        <van-image
          class="img"
          round
          fit="cover"
          :src="require('../assets/images/image/liuyifei.jpeg')"
        />
      </div>
      <div class="box-right">
        <ul>
          <li>
            <span class="name">姑姑 </span><span class="vip"> 钻石会员</span>
            <van-icon class="settings" color="#fff" name="setting-o" />
          </li>
          <li class="id">
            <span>ID: 2</span>
            <van-icon class="edit" name="edit" />
          </li>
        </ul>
      </div>
    </div>

    <!-- 账号信息 -->
    <div class="account-msg">
      <ul class="account-uls">
        <li>
          <span style="color: #aeadab">我的余额</span><span>9999999</span>
        </li>
        <li class="line1"></li>
        <li><span style="color: #aeadab">当前佣金</span><span>0.00</span></li>
        <li class="line2"></li>
        <li><span style="color: #aeadab">优惠券</span><span>99</span></li>
      </ul>
    </div>

    <!-- 我的订单 -->
    <div class="order-msg">
      <van-cell title="我的订单" is-link value="全部订单" />
      <div class="handle">
        <ul class="handle-uls">
          <li v-for="(item, index) in handleImg" :key="index">
            <van-image class="handle-img" :src="item.img" />
            <span class="handle-title">{{ item.title }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 我的服务 -->
    <div class="my-service">
      <van-cell value="我的服务" />
      <div class="service">
        <ul class="service-uls">
          <li v-for="(item, index) in serviceImg" :key="index">
            <van-image class="service-img" :src="item.img" />
            <span>{{ item.title }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyView",
  data() {
    return {
      handleImg: [
        { img: require("../assets/images/image/1.png"), title: "待付款" },
        { img: require("../assets/images/image/2.png"), title: "待发货" },
        { img: require("../assets/images/image/3.png"), title: "待收货" },
        { img: require("../assets/images/image/4.png"), title: "待评价" },
        { img: require("../assets/images/image/5.png"), title: "售后/退款" },
      ],
      serviceImg: [
        { img: require("../assets/images/image/a.png"), title: "会员中心" },
        { img: require("../assets/images/image/b.png"), title: "砍价记录" },
        { img: require("../assets/images/image/c.png"), title: "我的推广" },
        { img: require("../assets/images/image/d.png"), title: "我的余额" },
        { img: require("../assets/images/image/e.png"), title: "地址信息" },
        { img: require("../assets/images/image/f.png"), title: "我的收藏" },
        { img: require("../assets/images/image/g.png"), title: "优惠券" },
        { img: require("../assets/images/image/h.png"), title: "联系客服" },
      ],
    };
  },
};
</script>

<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  background: url("../assets/images/image/bag3.png") no-repeat top/100%
    rgb(243, 240, 240);
}
/* 个人信息 */
.personal-msg {
  width: 90vw;
  display: flex;
  margin: 0 auto;
  padding-top: 15px;
  margin-bottom: 14px;
}
.box-left {
}
.box-left .img {
  border: 1px solid #fff;
  width: 15vw;
  height: 15vw;
}
.box-right {
  margin-left: 20px;
  line-height: 13vw;
}
.box-right li {
  height: 5vh;
}
.box-right .name {
  color: #fff;
}
.box-right .vip {
  margin-left: 10px;
  padding: 0px 5px 0px 20px;
  border-radius: 10px;
  color: #fff;
  font-size: 12px;
  background-color: #b6281c;
}
.box-right .settings {
  margin-left: 120px;
}
.box-right .id {
  line-height: 13px;
  color: rgb(212, 186, 186);
  font-size: 13px;
}
.box-right .edit {
  margin-left: 5px;
}
/* 账户信息 */
.account-msg {
  background-color: #fff;
  width: 95vw;
  margin: 10px auto;
  border-radius: 5px;
  height: 10vh;
}
.account-uls {
  display: flex;
  justify-content: space-around;
}
.account-uls .line1 {
  margin-top: 13px;
  height: 3vh;
  border-left: 1px solid #ccc;
}
.account-uls .line2 {
  margin-top: 13px;
  height: 3vh;
  border-left: 1px solid #ccc;
}
.account-uls li {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10px;
}

/* 我的订单 */
.order-msg {
  overflow: hidden;
  width: 95vw;
  margin: 0 auto;
  height: 17vh;
  background-color: #fff;
  border-radius: 10px;
}

.order-msg .handle .handle-uls {
  text-align: center;
  display: flex;
  justify-content: space-around;
}
.order-msg .handle .handle-img {
  margin-left: 20px;
  text-align: center;
  width: 8vw;
  height: 8vw;
}
.order-msg .handle .handle-title {
  font-size: 12px;
  line-height: 40px;
}
.order-msg .handle .handle-uls li {
  display: flex;
  flex-direction: column;
  width: 25vw;
  /* width: 25vw;
  height: 10vw; */
}

/* 我的服务 */
.my-service {
  overflow: hidden;
  width: 95vw;
  margin: 10px auto;
  height: 23vh;
  background-color: #fff;
  border-radius: 10px;
}
.service .service-uls {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.service .service-uls .service-img {
  margin-left: 20px;
  text-align: center;
  width: 8vw;
  height: 8vw;
}
.service .service-uls li {
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 20vw;
}
.service .service-uls span {
  font-size: 12px;
}
</style>
