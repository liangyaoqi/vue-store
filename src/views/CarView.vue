<template>
  <div class="box">
    <h3 style="text-align: center">购物车</h3>
    <div v-if="cate.length > 0">
      <div class="cars" v-for="(item, index) in cate" :key="index">
        <div class="car-box-left">
          <van-image class="car-img" :src="item.image" />
        </div>
        <div class="car-box-right">
          <h3 class="title">{{ item.store_name }}</h3>
          <h4>属性：默认</h4>
          <ul class="car-ul">
            <li>¥{{ item.price }}</li>
            <li>
              <span @click="subCarNumber(item.id)">-</span>
              <span>{{ item.number }}</span>
              <span @click="addCarNumber(item.id)">+</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <van-image :src="require('../assets/images/cateBj.png')"></van-image>
    </div>
    <!-- 下单按钮 -->
    <div class="order">
      <van-button @click="order" type="warning">立即下单</van-button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "CarView",
  data() {
    return {
      cate: [
        // {
        //   id: 62,
        //   store_name:
        //     "春季2020年春秋装时尚上衣洋气雪纺村衫女装新款打底春款女士小衫",
        //   image: require("../assets/images/image3/deta10.jpg"),
        //   price: "326.00",
        //   number: 1,
        // },
      ],
    };
  },
  computed: {
    ...mapState(["cateAll"]),
  },
  created() {
    this.cate = this.cateAll;
  },
  methods: {
    ...mapMutations(["clear", "takeOrder"]),
    subCarNumber(id) {
      console.log(id);
      this.cate = this.cate.map((x) => {
        if (x.id == id) {
          if (x.number == 0) {
            return x;
          }
          x.number -= 1;
          return x;
        } else {
          return x;
        }
      });
      this.cate = this.cate.filter((x) => x.number != 0);

      // 清理vuex中的数据
      this.clear();
    },
    addCarNumber(id) {
      // this.cate.forEach((item, index) => {
      //   if (item.id == id) {
      //     item.number++;
      //     this.cate.splice(index, 1, item);
      //   }
      // });
      this.cate = this.cate.map((x) => {
        if (x.id == id) {
          x.number++;
          return x;
        }
        return x;
      });
      console.log(this.cate);
    },
    order() {
      this.cate = [];

      this.takeOrder();
    },
  },
};
</script>

<style scoped>
.box {
  /* height: 20vh; */
  width: 100vw;
  height: 100vh;
  background-color: rgb(240, 238, 238);
  position: absolute;
}
.cars {
  margin-bottom: 6px;
  overflow: hidden;
  display: flex;
  background-color: #fff;
}
.car-box-left {
  margin-left: 5px;
}
.car-box-right {
  margin-left: 5px;
}
.car-box-left .car-img {
  width: 20vw;
  height: 12vh;
}
.car-box-right h3 {
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  /* 文字溢出隐藏 */
  text-overflow: ellipsis;
  width: 70vw;
}
.car-ul li {
  text-align: center;
  font-weight: 300;
  display: flex;
}
.car-box-right h4 {
  font-weight: 300;
}
.car-box-right .car-ul {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.car-ul li span {
  text-align: center;
  border: 1px solid rgb(155, 150, 150);
  border-collapse: collapse;
  width: 20px;
  display: block;
  height: 20px;
  margin: 0px -1px -1px 0px;
}
.box .order {
  position: fixed;
  bottom: 7vh;
  right: 0;
}
</style>
