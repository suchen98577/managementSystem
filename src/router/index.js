import Vue from "vue";
import Router from "vue-router";
import store from "../store";

Vue.use(Router);

export const menuArray = [
  {
    path: "",
    component: () => import("@/components/views/charts"),
    name: "3D地球"
  },
  {
    path: "/menu",
    component: () => import("@/components/views/menu/menu"),
    name: "菜单管理"
  },
  {
    path: "/role",
    component: () => import("@/components/views/role/role"),
    name: "角色管理"
  },
  {
    path: "/user",
    component: () => import("@/components/views/user/user"),
    name: "管理员管理"
  },
  {
    path: "/cate",
    component: () => import("@/components/views/cate/cate"),
    name: "商品分类管理"
  },
  {
    path: "/specs",
    component: () => import("@/components/views/specs/specs"),
    name: "商品规格管理"
  },
  {
    path: "/goods",
    component: () => import("@/components/views/goods/goods"),
    name: "商品管理"
  },
  {
    path: "/member",
    component: () => import("@/components/views/member/member"),
    name: "会员管理"
  },
  {
    path: "/banner",
    component: () => import("@/components/views/banner/banner"),
    name: "轮播图管理"
  },
  {
    path: "/seck",
    component: () => import("@/components/views/seck/seck"),
    name: "秒杀活动"
  },
  {
    path: "/map",
    component: () => import("@/components/pages/map"),
    name: "百度地图"
  },
];

const router = new Router({
  routes: [
    {
      path: "/login",
      component: () => import("@/components/pages/login")
    },
    {
      path: "/index",
      component: () => import("@/components/pages/index"),
      children: menuArray
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
});
//路由前置守卫
router.beforeEach((to, from, next) => {
  let userInfo = store.state.userInfo;
  //判断用户是否登陆
  if (userInfo) {
    //用户已登录,判断访问的路径是否合法
    userInfo.menus_url.push("/map");
    userInfo.menus_url.push("/index");
    userInfo.menus_url.push("/login");
    if (userInfo.menus_url.includes(to.path)) {
      next();
    } else {
      //路径非法,强制跳转到首页
      alert("没有权限访问该页面");
      next("/index");
    }
  } else {
    //用户没有登陆,判断要登陆的是否为登陆界面
    if (to.path == "/login") {
      next();
    } else {
      alert("请登录");
      next("/login");
    }
  }
});

export default router;
