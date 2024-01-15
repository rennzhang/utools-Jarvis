import { createRouter, createWebHashHistory } from "vue-router";
// 引入路由

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: "首页",
      path: "/",
      redirect: "/home",
    },
    {
      name: "主页",
      path: "/home",
      component: () => import("@/pages/home/index.vue"),
    },
    {
      name: "cURL2Func 模板配置",
      path: "/template",
      component: () => import("@/pages/template/index.vue"),
    },
  ],
});

export default router;
