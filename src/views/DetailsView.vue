<template>
  <div>
    <h3 style="text-align: center">详情页面</h3>
    <div class="detail-box">
      <div class="details" v-for="(item, index) in dataDetails" :key="index">
        <div class="details-top">
          <van-image class="detail-img" :src="item.image"></van-image>
        </div>
        <div class="details-bottom">
          <!-- 商品标题 -->
          <h3>{{ item.store_name }}</h3>
          <!-- 商品价格 -->
          <h4>¥{{ item.price }}</h4>
          <!-- 加入购物车 -->
          <van-button
            @click="add(item)"
            class="add"
            color="linear-gradient(to right,#ff6034,#ee0a24)"
          >
            加入购物车
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "DetailView",
  data() {
    return {
      dataDetails: [
        {
          id: 8,
          store_name:
            "【AppleiPhone8】AppleiPhone8(A1863)256GB深空灰色移动联通电信4G手机",
          image: require("../assets/images/image3/deta1.jpg"),
          price: "18666.00",
        },
        {
          id: 75,
          store_name:
            "奥克斯空调立式大2匹家用定频圆筒柜机空调冷暖二级能效 wifi智能",
          image: require("../assets/images/image3/deta2.jpg"),
          price: "2899.00",
        },
        {
          id: 74,
          store_name:
            "小黄鸭5.6KG迷你洗衣机全自动家用波轮宝宝小型加热洗烘干一体机",
          image: require("../assets/images/image3/deta3.jpg"),
          price: "1399.00",
        },
        {
          id: 73,
          store_name:
            "尔给polo衫短袖日系运动休闲套装女2020年夏宽松韩版学生两件套",
          image: require("../assets/images/image3/deta4.jpg"),
          price: "210.00",
        },
        {
          id: 69,
          store_name: "【官方正品】CHANEL 香奈儿邂逅系列香水 粉色柔情 持久淡香",
          image: require("../assets/images/image3/deta5.jpg"),
          price: "1200.00",
        },
        {
          id: 67,
          store_name:
            "【官方正品】TOM FORD汤姆福特烈焰幻魅唇膏 TF口红黑管16 80",
          image: require("../assets/images/image3/deta6.jpg"),
          price: "398.00",
        },
        {
          id: 66,
          store_name:
            "中国风棉麻t恤男装中式短袖麻料盘扣中袖上衣大码亚麻T恤夏季宽松",
          image: require("../assets/images/image3/deta7.jpg"),
          price: "0.10",
        },
        {
          id: 65,
          store_name:
            "男裤2019春夏新款男士休闲裤男韩版弹力修身小脚裤男装裤子青年潮",
          image: require("../assets/images/image3/deta8.jpg"),
          price: "289.00",
        },
        {
          id: 63,
          store_name: "MCM 2019新品 MILLIE VISETOS 女士中号印花斜挎包信封包",
          image: require("../assets/images/image3/deta9.jpg"),
          price: "3689.00",
        },
        {
          id: 62,
          store_name:
            "春季2020年春秋装时尚上衣洋气雪纺衬衫女装新款打底春款女士小衫",
          image: require("../assets/images/image3/deta10.jpg"),
          price: "326.00",
        },
      ],
    };
  },
  methods: {
    ...mapMutations(["setCateAll"]),
    add(item) {
      // console.log(item);

      var show = true;
      if (this.cateAll.length > 0) {
        for (var i = 0; i < this.cateAll.length; i++) {
          if (this.cateAll[i].id == item.id) {
            show = false;
            this.$toast("该商品已经加入购物车");
          }
        }
      }

      if (show) {
        item.number = 1;
        this.setCateAll(item);
        this.$toast("加入购物车成功");
      }
    },
  },
  computed: {
    ...mapState(["cateAll"]),
  },
  created() {
    console.log(this.cateAll);
  },
};
</script>

<style scoped>
.detail-box {
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(243, 240, 240);
  margin-bottom: 7vh;
}
.details {
  overflow: hidden;
  width: 47vw;
  text-align: center;
  background-color: #fff;
  margin: 0 auto;
  margin-bottom: 10px;
  border-radius: 10px;
  height: 43vh;
}
.detail-img {
  border-radius: 10px;
  width: 45vw;
  height: 24vh;
}
.details-bottom h3 {
  margin: 0 auto;
  width: 40vw;
  overflow: hidden;
  white-space: nowrap;
  /* 文字溢出隐藏 */
  text-overflow: ellipsis;
  margin-top: 10px;
}
.details-bottom h4 {
  margin-top: 10px;
  color: red;
  margin-bottom: 10px;
}
.details-bottom .add {
  width: 30vw;
  height: 6vh;
  margin: 0 auto;
  border-radius: 50px;
}
</style>
