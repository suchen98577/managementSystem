import member from "@/utils/axios/member";
export default {
  state: {
    memberlist: []
  },
  getters: {
    getmemberlist(state) {
      return state.memberlist;
    }
  },
  mutations: {
    changememberlist(state, payload) {
      state.memberlist = payload;
    }
  },
  actions: {
    changememberlistSync(context) {
      member.list().then(res => {
        if (res.data.code == 200) {
          context.commit("changememberlist", res.data.list);
        }
      });
    }
  },
  namespaced: true
};
