import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/reset.css";
import store from "./store";
import "./plugin/axios";

import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
