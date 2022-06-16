<template>
  <div>
    <ul class="uls">
      <li @click="tab(1)">
        <router-link :class="{ active: index == 1 }" to="/"> 首页</router-link>
      </li>
      <li @click="tab(2)">
        <router-link :class="{ active: index == 2 }" to="/detali"
          >详情</router-link
        >
      </li>
      <li @click="tab(3)">
        <router-link :class="{ active: index == 3 }" to="/car"
          >购物车</router-link
        >
      </li>
      <li @click="tab(4)">
        <router-link :class="{ active: index == 4 }" to="/my">我的</router-link>
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {
      index: 1,
    };
  },
  created() {
    var ins = localStorage.getItem("index");
    this.index = ins;
  },
  methods: {
    tab(ins) {
      this.index = ins;
      localStorage.setItem("index", this.index);
    },
  },
};
</script>

<style scoped>
.uls {
  z-index: 999;
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 7vh;
  background: black;
}
.uls li {
  flex: 1;
  line-height: 7vh;
  text-align: center;
}
.uls li a {
  color: white;
  display: block;
}
.uls li a.active {
  color: red;
}
</style>
