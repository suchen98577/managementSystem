import axios from "./axios"
const cate={
    //商品分类添加
    add(data){
        return axios.post("/cateadd",data)
    },
    //商品分类列表
    list(params){
        return axios.get("/catelist",{
            params
        })
    },
    //商品分类详情
    info(params){
        return axios.get("/cateinfo",{
            params
        })
    },
    //商品分类修改
    edit(data){
        return axios.post("/cateedit",data)
    },
    //商品分类删除
    delete(data){
      return  axios.post("/catedelete",data)
    }
}

export default cate