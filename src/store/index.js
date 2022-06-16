import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { cateAll: [] },
  getters: {},
  mutations: {
    setCateAll(state, payload) {
      state.cateAll.push(payload);
    },
    clear(state) {
      console.log(1);
      state.cateAll = state.cateAll.filter((x) => x.number != 0);
    },
    takeOrder(state) {
      console.log(1);
      state.cateAll = [];
    },
  },
  actions: {},
  modules: {},
});
