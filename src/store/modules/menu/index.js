import menu from "../../../utils/axios/menu";

export default {
  state: {
    menulist: []
  },
  getters: {
    getMenulist(state) {
      return state.menulist;
    }
  },
  mutations: {
    changeMenulist(state, payload) {
      state.menulist = payload;
    }
  },
  actions: {
    changeMenulistSync({ commit }) {
      menu.list({ istree: 1 }).then(res => {
        if (res.data.code == 200) {
          commit("changeMenulist", res.data.list);
        }
      });
    }
  },
  namespaced: true
};
