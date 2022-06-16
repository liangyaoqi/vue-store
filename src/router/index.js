import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView";
import DetailsView from "../views/DetailsView";
import CarView from "../views/CarView";
import StoreDetatil from "../views/DetailsView2";
import MyView from "../views/MyView";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  routes: [
    {
      name: "home",
      path: "/",
      component: HomeView,
    },
    {
      name: "detail",
      path: "/detali",
      component: DetailsView,
    },
    {
      name: "car",
      path: "/car",
      component: CarView,
    },
    {
      name: "storedetail",
      path: "/store/:detaid",
      props: true,
      component: StoreDetatil,
    },
    {
      name: "storedetail",
      path: "/my",
      component: MyView,
    },
  ],
});
export default router;
