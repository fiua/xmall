import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: true, //用户登录
    userinfo: {}, //用户的信息
    cartlist: [], //购物车
    showcart: false, //购物车的显示和隐藏
  },
  mutations: {
    SHOWCART(state, { showcart }) {
      state.showcart = showcart;
    },
  },
  actions: {},
  modules: {},
});
