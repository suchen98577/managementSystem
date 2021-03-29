import user from "@/utils/axios/user";
export default {
  state: {
    userlist: [],
    count: 0
  },
  getters: {
    getuserlist(state) {
      return state.userlist;
    },
    getcount(state) {
      return state.count;
    }
  },
  mutations: {
    changeuserlist(state, payload) {
      state.userlist = payload;
    },
    changecount(state, payload) {
      state.count = payload;
    }
  },
  actions: {
    changeuserlistSync(context, params) {
      user.list(params).then(res => {
        if (res.data.code == 200) {
          let { page, size } = params;
          context.commit("changeuserlist", res.data.list);
          if (res.data.list == null) res.data.list = [];
          //做删除的判断，如果当前删除的是最后一项，就让其page-1
          if (page > 1 && res.data.list.length == 0) {
            context.commit("changeuserlist", res.data.list);
            context.dispatch("changeuserlistSync", {
              page: page - 1,
              size: 5
            });
          }
          //做添加的判断，如果添加到下一页，则page+1
        }
      });
    },
    changecountSync({ commit }) {
      user.count().then(res => {
        if (res.data.code == 200) {
          commit("changecount", res.data.list[0].total);
        }
      });
    }
  },
  namespaced: true
};
