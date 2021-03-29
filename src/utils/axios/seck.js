import axios from "./axios";
const seck = {
  //秒杀添加
  add(data) {
    return axios.post("/seckadd", data);
  },
  //秒杀列表
  list(params) {
    return axios.get("/secklist", {
      params
    });
  },
  //秒杀详情
  info(params) {
    return axios.get("/seckinfo", {
      params
    });
  },
  //秒杀修改
  edit(data) {
    return axios.post("/seckedit", data);
  },
  //秒杀删除
  delete(data) {
    return axios.post("/seckdelete", data);
  },
  //秒杀获取分类商品
  getcategoods(params) {
    return axios.get("/getcategoods", { params });
  }
};

export default seck;
