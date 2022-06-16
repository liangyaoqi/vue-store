<template>
  <div>
    <h3 class="title">首页</h3>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in banner" :key="index"
        ><van-image fit="cover" :src="item.image"
      /></van-swipe-item>
    </van-swipe>

    <ol class="ols">
      <li v-for="(item, index) in home" :key="index">
        <van-image class="homeLi" :src="item.imgs" fit="cover"></van-image>
        <span>{{ item.title }}</span>
      </li>
    </ol>

    <!-- 精品推荐 -->
    <div class="recomment">
      <van-cell title="精品推荐" is-link value="内容" />
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in bastBanner" :key="index"
          ><van-image class="recomment-img" fit="cover" :src="item.imagess"
        /></van-swipe-item>
      </van-swipe>
    </div>

    <div
      @click="change(item.id)"
      class="box"
      v-for="(item, index) in recomment"
      :key="index"
    >
      <div class="box-left">
        <van-image class="homeLi" :src="item.image" fit="cover" />
      </div>
      <div class="box-right">
        <h3>{{ item.store_name }}</h3>
        <h4 style="color: red">&yen;{{ item.ot_price }}</h4>
        <ul>
          <!-- vip价格 -->
          <li>
            &yen;{{ item.price }} vip
            <span>已售{{ item.sales }}{{ item.unit_name }}</span>
          </li>

          <li><van-icon name="cart-circle-o" /></li>
        </ul>
      </div>
    </div>
    <div class="holder"></div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      // 首页banner
      banner: [
        { image: require("../assets/images/banner1.jpg") },
        { image: require("../assets/images/banner2.jpg") },
        { image: require("../assets/images/banner3.jpg") },
      ],
      // 8个内容数据
      home: [
        {
          imgs: require("../assets/images/image/home1.png"),
          title: "商品分类",
        },
        {
          imgs: require("../assets/images/image/home2.png"),
          title: "领取优惠卷",
        },
        {
          imgs: require("../assets/images/image/home3.png"),
          title: "行业咨询",
        },
        {
          imgs: require("../assets/images/image/home4.png"),
          title: "我要签到",
        },
        {
          imgs: require("../assets/images/image/home5.png"),
          title: "我的收藏",
        },
        {
          imgs: require("../assets/images/image/home6.png"),
          title: "秒杀活动",
        },
        {
          imgs: require("../assets/images/image/home7.png"),
          title: "地址列表",
        },
        {
          imgs: require("../assets/images/image/home8.png"),
          title: "订单列表",
        },
      ],
      // 精品推荐数据
      recomment: [
        {
          id: 8,
          image: require("../assets/images/image2/recomment1.jpg"),
          store_name:
            "【AppleiPhone8】AppleiPhone8(A1863)256GB深空灰色移动联通电信4G手机",
          cate_id: "2",
          price: "18666.00",
          ot_price: "18666.00",
          sales: "784",
          unit_name: "件",
          activity: [],
          vip_price: "18479.34",
        },
        {
          id: 74,
          image: require("../assets/images/image2/recomment2.jpg"),
          store_name:
            "小黄鸭5.6KG迷你洗衣机全自动家用波轮宝宝小型加热洗烘干一体机",
          cate_id: "31",
          price: "1399.00",
          ot_price: "1699.00",
          sales: "880",
          unit_name: "",
          activity: [],
          vip_price: "1385.01",
        },
        {
          id: 73,
          image: require("../assets/images/image2/recomment3.jpg"),
          store_name:
            "尔给polo衫短袖日系运动休闲套装女2020年夏宽松韩版学生两件套",
          cate_id: "49",
          price: "210.00",
          ot_price: "599.00",
          sales: "615",
          unit_name: "套",
          activity: [],
          vip_price: "207.90",
        },
        {
          id: 67,
          image: require("../assets/images/image2/recomment4.jpg"),
          store_name:
            "【官方正品】TOM FORD汤姆福特烈焰幻魅唇膏 TF口红黑管16 80",
          cate_id: "46",
          price: "398.00",
          ot_price: "400.00",
          sales: "392",
          unit_name: "件",
          activity: [],
          vip_price: "394.02",
        },
        {
          id: 62,
          image: require("../assets/images/image2/recomment5.jpg"),
          store_name:
            "春季2020年春秋装时尚上衣洋气雪纺衬衫女装新款打底春款女士小衫",
          cate_id: "44",
          price: "326.00",
          ot_price: "380.00",
          sales: "598",
          unit_name: "件",
          activity: [],
          vip_price: "322.74",
        },
        {
          id: 61,
          image: require("../assets/images/image2/recomment6.jpg"),
          store_name:
            "春季牛仔女士短外套女春秋装女装2019新款春款2020年新品网红衣服",
          cate_id: "44",
          price: "100.00",
          ot_price: "100.00",
          sales: "1164",
          unit_name: "件",
          activity: [],
          vip_price: "0.00",
        },
        {
          id: 58,
          image: require("../assets/images/image2/recomment7.jpg"),
          store_name:
            "耐克 NIKE AIR ZOOM PEGASUS 36 FLR 女子跑步鞋 CD9465 CD9465-199",
          cate_id: "49",
          price: "568.00",
          ot_price: "580.00",
          sales: "377",
          unit_name: "双",
          activity: [],
          vip_price: "562.32",
        },
        {
          id: 57,
          image: require("../assets/images/image2/recomment8.jpg"),
          store_name: "AJ1 AIR JORDAN 1 SE 男子运动鞋 852542 852542-146",
          cate_id: "49",
          price: "999.00",
          ot_price: "800.00",
          sales: "399",
          unit_name: "双",
          activity: [],
          vip_price: "989.01",
        },
      ],
      // 精品推荐 banner
      bastBanner: [
        { imagess: require("../assets/images/image2/recommentBanner1.jpg") },
        { imagess: require("../assets/images/image2/recommentBanner2.jpg") },
      ],
    };
  },
  methods: {
    change(id) {
      console.log(id);
      this.$router.push(`/store/${id}`);
    },
  },
};
</script>

<style scoped>
.title {
  text-align: center;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  /* line-height: 150px; */
  text-align: center;
  /* background-color: #39a9ed;
   */
}
.ols {
  display: flex;
  width: 100vw;
  /* 开启自动换行 */
  flex-wrap: wrap;
}
.ols li {
  width: 25vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ols li .homeLi {
  width: 60%;
  height: 50%;
}
.ols li span {
  font-size: 14px;
  margin-top: 5px;
}
.box {
  display: flex;
  width: 92vw;
  margin: 0 auto;
}

.box-left .homeLi {
  width: 25vw;
  height: 15vh;
  border-radius: 10%;
  overflow: hidden;
}

.box-right {
  line-height: 5vh;
  margin-left: 10px;
  position: relative;
  /* display:flex;
        justify-content: space-between;
        flex-direction: column; */
}

.box-right ul span {
  color: rgb(82, 79, 79);
}

.box-right ul {
  display: flex;
}

.box-right ul li:last-child {
  margin-left: 20px;
  position: absolute;
  right: 2px;
  color: red;
}
.box-right h3 {
  overflow: hidden;
  white-space: nowrap;
  /* 文字溢出隐藏 */
  text-overflow: ellipsis;
  width: 63vw;
}
.recomment-img {
  width: 92vw;
  height: 24vh;
}
.more {
  color: #ccc;
  font-size: 15px;
}
/* 占位 */
.holder {
  height: 7vh;
  width: 100vw;
}
</style>
