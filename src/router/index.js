import Vue from "vue";
import VueRouter from "vue-router";
import index from "@/views/index";
import home from "@/views/home";
import login from "@/views/login";
import goods from "@/views/goods";
import thanks from "@/views/thanks";
import goodsDetail from "@/views/goodsDetail";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: index, //路由
    redirect: "/home",
    children: [
      {
        path: "home",
        component: home,
      },
      {
        path: "goods",
        component: goods,
      },
      {
        path: "thanks",
        component: thanks,
      },
      {
        path: "/goodsDetail",
        name: "goodsDetail",
        component: goodsDetail,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
