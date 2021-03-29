import axios from "./axios";
const banner = {
  //轮播图添加
  add(data) {
    return axios.post("/banneradd", data);
  },
  //轮播图列表
  list(params) {
    return axios.get("/bannerlist", {
      params
    });
  },
  //轮播图详情
  info(params) {
    return axios.get("/bannerinfo", {
      params
    });
  },
  //轮播图修改
  edit(data) {
    return axios.post("/banneredit", data);
  },
  //轮播图删除
  delete(data) {
    return axios.post("/bannerdelete", data);
  }
};

export default banner;
