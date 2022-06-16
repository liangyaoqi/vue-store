<template>
  <!-- 商品详情 -->
  <div class="details">
    <!-- <h2>商品详情页{{ detaid }}</h2> -->
    <van-swipe @change="onChange" v-if="detailsList">
      <van-swipe-item
        v-for="(item, index) in detailsList.slider_image"
        :key="index"
      >
        <van-image :src="item" alt="" fit="cover" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/ {{ currentCount }}
        </div>
      </template>
    </van-swipe>

    <!-- 主要内容 -->
    <div class="content">
      <div class="price iconfont">
        <span>￥{{ detailsList.price }}</span>
        <!-- <i>￥{{ detailsList.vip_price }}</i> -->
      </div>
      <h3>{{ detailsList.store_name }}</h3>
      <ul>
        <li>原价:{{ detailsList.ot_price }}</li>
        <li>库存:{{ detailsList.stock }}</li>
        <li>销量:{{ detailsList.fsales }}</li>
      </ul>
    </div>

    <!-- 用户评价 -->
    <div class="con">
      <h2>用户评价(0)</h2>
      <div><span>0%</span>好评率 <van-icon class="arrow" name="arrow" /></div>
    </div>

    <!-- 优品推荐 -->
    <div class="recommends">
      <h3 class="title">优品推荐</h3>
      <van-swipe class="my-swipe" :autoplay="3000" @change="onange">
        <van-swipe-item v-for="(b, item) in 3" :key="item" class="recommend">
          <div
            v-for="i in recommend[b - 1]"
            :key="i.id"
            :src="b"
            class="recommend-item"
          >
            <div class="boxs">
              <router-link
                tag="img"
                :src="i.image"
                alt=""
                :to="`/details/${i.id}`"
              />
              <h3>{{ i.store_name }}</h3>
              <h4>￥{{ i.price }}</h4>
            </div>
          </div>
        </van-swipe-item>
        <!-- 指示器 -->
        <!-- <div class="dot">
                    <span
                        v-for="i in recommend.length"
                        :key="i"
                        :style="{
                            backgroundColor: i == bannerIndex ? 'rgba(233,51,35)' : '',
                        }"
                    ></span>
                </div> -->
      </van-swipe>
    </div>

    <!-- 产品介绍 -->
    <!-- <div class="introduce">产品介绍</div>
        <div class="descs">
            <div v-html="desc" class="abc"></div>
        </div> -->

    <!-- 底部加入购物车 -->
    <van-goods-action class="cart">
      <van-goods-action-icon color="#7d6f6a" icon="service-o" text="客服" />
      <van-goods-action-icon
        color="#ff5000"
        v-if="showLick"
        @click="dellike"
        icon="like"
        text="取消收藏"
      />
      <van-goods-action-icon
        color="#7d6f6a"
        v-else
        @click="addlike"
        icon="like-o"
        text="收藏"
      />
      <van-goods-action-icon
        color="#7d6f6a"
        to="/cart"
        icon="shopping-cart-o"
        text="购物车"
        :badge="number"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addCart"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="loadingCart"
      />
    </van-goods-action>

    <!-- 购物车弹出 -->
    <!-- 
             v-show:  是否显示商品规格
             sku   商品的sku数据  object
             goods 商品信息       object
             @buy-clicked 下单
             @add-cart 购物车
         -->
    <van-sku
      v-model="show"
      ref="product"
      :sku="sku"
      :goods="goods"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      detailsList: {},
      current: 0,
      currentCount: 0,
      recommend: [], // 推荐部分的数据
      desc: "", // 产品介绍数据
      bannerIndex: 0, // 指示器
      number: "", // 在购物车中的商品件数

      // 购物车数据
      show: false, // 是否显示商品规格
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          // 这里一个对象就是一个规格类目
          {
            k: "颜色", //属性名称
            k_id: "1", //属性的ID值 唯一 在当前产品里面唯一
            v: [
              //颜色属性可用值列表
              {
                id: "30349", //属性ID
                name: "红色", //属性名
                //属性图片，默认只有第一行属性有
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-1.png",
              },
              {
                id: "1215",
                name: "白色",
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-1.png",
              },
            ],
            k_s: "s1", //属性的k_s值 对应list里面组合键名
          },
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        // list: [
        //     {
        //         id: 2259, // skuId
        //         s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
        //         s2: "1", // 规格类目 k_s 为 s2 的对应规格值 id
        //         price: 100, // 价格（单位分）
        //         stock_num: 110, // 当前 sku 组合对应的库存
        //     },
        // ],

        price: "", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        // properties: [],
        // messages: [
        //     {
        //         // 商品留言
        //         datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
        //         multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
        //         name: "留言", // 留言名称
        //         type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
        //         required: "1", // 是否必填 '1' 表示必填
        //         placeholder: "", // 可选值，占位文本
        //         extraDesc: "", // 可选值，附加描述文案
        //     },
        // ],
        hide_stock: false, // 是否隐藏剩余库存
      },

      goods: {
        // 商品信息 图片
        // 数据结构见下方文档
        picture: "https://img01.yzcdn.cn/1.jpg",
      },
      goodsId: 1,
      messageConfig: {
        // 数据结构见下方文档
      },
      showLick: false, // 是否显示收藏
    };
  },
  props: {
    detaid: {
      type: String,
      retutn: 0,
    },
  },
  computed: {
    ...mapState(["catList"]),
  },
  methods: {
    // 初始化数据
    getDetailsList(id) {
      // console.log(this.axios);
      this.axios.get(`/product/detail/${id}`).then((re) => {
        console.log(re);
        this.detailsList = re.storeInfo;
        this.currentCount = re.storeInfo.slider_image.length;

        // 推荐部分
        // this.recommend = re.good_list;
        let a = re.good_list.splice(0, 6);
        let b = re.good_list.splice(6, 12);
        let c = re.good_list;
        this.recommend.push(a);
        this.recommend.push(b);
        this.recommend.push(c);

        // 产品介绍
        this.desc = re.storeInfo.description;

        // 获取商品规格
        let productValue = re.productValue;

        // 尺码,颜色与 大小
        let arrs = re.productAttr;
        let id = 1;
        let idobj = {}; // id对象
        let ssk = 1;
        this.sku.list = []; // 清空之前的数据
        if (productValue == "") {
          // 如果没有数据
          this.goods.picture = this.detailsList.slider_image[0]; //商品的图片拿到第一张
          this.sku.tree = []; // 清空sku.tree
          this.sku.price = this.detailsList.price; // 获取价格
          // 重制sku
          this.sku.list.push({
            id: undefined,
            // price: re.priceName,
            price: this.detailsList.price * 100, // 价格
            s1: undefined, // 在sku下tree的 k_s 商品的一条规格 尺码 类目所对应的s1
            s2: undefined, // 在sku下tree的 k_s 商品的一条规格 颜色 类目所对应的s2
            stock_num: re.storeInfo.stock, //库存
            goods_id: this.detaid, // 商品id
            imgUrl: this.detailsList.slider_image[0], // 图片
          });
        } else {
          this.goods.picture = productValue[Object.keys(productValue)[0]].image;
          // 循环产品属性 组装购物车的属性tree
          // 逐一处理 码,颜色与 大小
          this.sku.tree = arrs.map((atr, ads) => {
            // 逐一处理 衣服的大小
            let va = atr.attr_value.map((at, index) => {
              // id自增
              id++;
              // id中的attr
              idobj[at.attr] = id;
              let attrs = {
                id: id,
                name: at.attr,
              };

              // 当此时的衣服的型号只有一个时
              if (ads < 1) {
                attrs.imgUrl =
                  productValue[Object.keys(productValue)[index]].image;
              }
              return attrs;
            });

            // 组合键名
            var ks = "s" + ssk;
            ssk++;
            return {
              k: atr.attr_name, // 颜色
              k_id: atr.attr_name, // 属性的id值
              v: va, // 颜色可用值列表
              k_s: ks, // 组合键名
            };
          });

          // 循环产品属性结合,组装sku 列表  productValue 商品的id 尺码 库存 价格...
          for (let key in productValue) {
            let v = productValue[key]; // 商品的每一项
            // console.log(v);
            let keys = key.split(",");
            this.sku.list.push({
              // 商品的种类
              id: v.unique, // 商品的唯一标识
              price: v.price * 100, // 价格
              s1: idobj[keys[0]], // 尺码
              s2: idobj[keys[1]], // 颜色
              stock_num: v.stock, //库存
              goods_id: v.product_id, //商品的id
              imgUrl: v.image, // 商品的图片
            });
          }
        }
      });
    },
    // 轮播图切换
    onChange(index) {
      this.current = index;
    },
    // 指示器
    onange(index) {
      this.bannerIndex = index;
    },
    ...mapMutations(["getCat", "del"]),

    // 显示购物车
    addCart() {
      // this.show = true;
    },
    // 下单显示购物车
    loadingCart() {
      // this.show = true;
    },

    // 下单
    onBuyClicked(data) {
      // 跳转到下单页面
      this.$router.push(`/orders/cat`);
      console.log(data);
      console.log("下单");
      let title = null; // 商品标题
      let da = null; // 放到vueX的数据
      this.$nextTick(() => {
        this.axios
          .get(`/product/detail/${data.selectedSkuComb.goods_id}`)
          .then((re) => {
            console.log(re);
            title = re.storeInfo.store_name;
            da = {
              id: data.selectedSkuComb.goods_id, // 商品id
              count: data.selectedNum, // 数量
              imgs: data.selectedSkuComb.imgUrl,
              title: title,
              price: data.selectedSkuComb.price / 100, // 价格
              check: true, // 是否选中
            };

            // 去重,计算数量
            this.catList.filter((item, index) => {
              if (item.id == da.id) {
                item.count += da.count;
                da = item;
                this.del(index);
                return item;
              }
            });

            // 将加入购物车的数据传到vuex中
            this.getCat(da);
          });
      });
    },
    // 加入购物车
    onAddCartClicked(data) {
      console.log("添加购物车", data);
      this.$toast.success("加入购物车成功");
      let title = null; // 商品标题
      let da = null; // 放到vueX的数据
      this.$nextTick(() => {
        this.axios
          .get(`/product/detail/${data.selectedSkuComb.goods_id}`)
          .then((re) => {
            console.log(re);
            title = re.storeInfo.store_name;
            da = {
              id: data.selectedSkuComb.goods_id, // 商品id
              count: data.selectedNum, // 数量
              imgs: data.selectedSkuComb.imgUrl,
              title: title,
              price: data.selectedSkuComb.price / 100, // 价格
              check: false, // 是否选中
            };

            // 去重,计算数量
            this.catList.filter((item, index) => {
              if (item.id == da.id) {
                item.count += da.count;
                da = item;
                this.del(index);
                return item;
              }
            });

            // 将加入购物车的数据传到vuex中
            this.getCat(da);

            // 获取购物车的件数
            this.getnumber();
          });
      });
    },
    // 本页面的轮播切换商品详情
    reset(id) {
      this.getDetailsList(id);
    },
    // 页面加载,获取购物车中的件数
    // getnumber() {
    //     if (this.catList.length == 0) return;

    //     let nums = 0;
    //     this.catList.forEach((item) => {
    //         nums += parseInt(item.count);
    //     });
    //     this.number = nums;
    // },

    // 添加收藏
    addlike() {
      this.showLick = true;
      this.axios
        .post("/collect/add", { category: "product", id: this.detaid })
        .then((re) => {
          if (re.status == 200) {
            this.$toast("添加收藏成功");
          }
        });
    },
    // 删除收藏
    dellike() {
      this.showLick = false;
      this.axios
        .post("/collect/del", { category: "product", id: this.detaid })
        .then((re) => {
          if (re.status == 200) {
            this.$toast("取消收藏成功");
          }
        });
    },
  },
  watch: {
    // id改变 动态获取数据
    detaid() {
      this.getDetailsList(this.detaid);
    },
  },
  created() {
    console.log(this.detaid);
    // 页面加载,初始化数据
    this.getDetailsList(this.detaid);

    // 获取购物车的件数
    // this.getnumber();
  },
};
</script>

<style lang="scss" scoped>
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.details {
  margin-bottom: 100px;
  background: #f5f5f5;
  // 商品的主要那内容
  .content {
    background: #fff;
    padding: 10px 0;
    width: 100vw;
    display: flex;
    flex-direction: column;
    // margin-left: 10px;
    justify-content: space-around;
    .price {
      width: 100%;
      margin-bottom: 10px;
      // margin-left: 10px;
      span {
        color: red;
        font-size: 22px;
        font-weight: 700;
        margin-left: 10px;
      }
      i {
        font-size: 14px;
        font-weight: 700;
        margin-left: 10px;
        position: relative;
        &::after {
          content: "";
          width: 23px;
          height: 10.5px;
          // background: url("../assets/image/vip.png") no-repeat center center / cover;
          position: absolute;
          right: -42%;
          top: 50%;
          transform: translate(0, -50%);
        }
      }
      position: relative;
      &::after {
        content: "\e667";
        width: 20px;
        height: 20px;
        position: absolute;
        right: 20px;
        top: 20%;
      }
    }
    h3 {
      width: 345.2px;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 10px;
      margin-left: 10px;
      height: 41.6px;
      line-height: 22.6px;
    }
    ul {
      display: flex;
      width: 100vw;
      margin-top: 20px;
      margin-bottom: 5px;
      // padding: 0 10px;
      justify-content: space-between;
      li {
        font-size: 12px;
        color: gray;
        &:nth-child(1) {
          margin-left: 10px;
        }
        &:nth-child(3) {
          margin-right: 10px;
        }
      }
    }
  }

  //用户评价
  .con {
    width: 100%;
    display: flex;
    align-items: center;
    background: #fff;
    margin: 10px 0;
    // padding: 0 10px;
    justify-content: space-between;
    color: black;
    height: 43px;
    font-size: 14px;
    h2 {
      margin-left: 10px;
    }
    div {
      color: gray;
      margin-right: 10px;
      span {
        color: red;
      }
    }
  }

  // 优品推荐
  .recommends {
    background: #fff;
    .title {
      padding: 20px 0 5px 0;
      text-align: center;
      color: #f45122;
      font-size: 14px;
      position: relative;
      &::before {
        content: "";
        width: 15px;
        height: 15px;
        // background: url("../assets/image/tui.png") no-repeat center center/cover;
        position: absolute;
        left: 60%;
        top: 68%;
        transform: translate(0, -50%);
      }
      &::after {
        content: "";
        width: 15px;
        height: 15px;
        // background: url("../assets/image/tui.png") no-repeat center center/cover;
        position: absolute;
        right: 60%;
        top: 68%;
        transform: translate(0, -50%);
      }
    }
    .recommend {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-around;
      .recommend-item {
        .boxs {
          width: 107.5px;
          border-radius: 12px;
          margin-top: 10px;
          padding-bottom: 20px;
          img {
            width: 107.5px;
            height: 107.5px;
            border-radius: 3px;
          }
          h3 {
            margin-top: 10px;
            font-size: 14px;
            width: 107.5px;
            overflow: hidden;
            word-break: keep-all; /* 不换行 */
            white-space: nowrap; /* 不换行 */
            overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
            text-overflow: ellipsis; /* 溢出时显示省略标记...；需与overflow:hidden;一起使用*/
          }
          h4 {
            font-size: 12px;
            color: red;
          }
        }
      }
      position: relative;
      // 指示器
      .dot {
        position: absolute;
        bottom: 0%;
        left: 0%;
        width: 10px !important;
        height: 10px !important;
        // transform: translate(-50%, 0);
        span {
          width: 10px !important;
          height: 10px !important;
          background: red;
          border-radius: 50%;
          border: 1px solid red;
        }
      }
    }
  }
  .van-sku-row {
    display: flex;
  }

  // 产品介绍
  .introduce {
    height: 43px;
    line-height: 43px;
    background: #fff;
    font-size: 16px;
    text-align: center;
    margin: 10px 0;
    box-sizing: border-box;
  }
  .descs {
    height: auto;
    width: 100vw;
    overflow-x: hidden;
    width: 100vw !important;
    position: relative;
    padding-bottom: 30px;
    background: #f5f5f5;
    font-size: 14px !important;
    box-sizing: border-box;
  }
  ::v-deep .abc img {
    width: 100vw !important;
  }
  ::v-deep .content {
    width: 100vw !important;
  }
  ::v-deep .abc {
    width: 100vw !important;
  }
  ::v-deep .abc span {
    word-wrap: break-word !important;
    width: 100vw !important;
  }
  // 购物车
  .cart {
    width: 100vw !important;
    position: fixed;
    bottom: 6%;
  }
}
</style>
