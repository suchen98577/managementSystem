import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import menu from "./modules/menu";
import role from "./modules/role";
import user from "./modules/user";
import cate from "./modules/cate";
import specs from "./modules/specs";
import goods from "./modules/goods";
import member from "./modules/member";
import banner from "./modules/banner";
import seck from "./modules/seck";
import presistedstate from "vuex-persistedstate";

// 创建仓库
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    menu,
    role,
    user,
    cate,
    specs,
    goods,
    member,
    banner,
    seck
  },
  plugins: [presistedstate({ storage: window.sessionStorage })]
});
