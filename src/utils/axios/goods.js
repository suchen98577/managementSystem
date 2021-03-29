import axios from "./axios"
const goods={
    //商品添加
    add(data){
        return axios.post("/goodsadd",data)
    },
    //商品总数
    list(params){
        return axios.get("/goodscount",{
            params
        })
    },
    //商品列表
    list(params){
        return axios.get("/goodslist",{
            params
        })
    },
    //商品详情
    info(params){
        return axios.get("/goodsinfo",{
            params
        })
    },
    //商品修改
    edit(data){
        return axios.post("/goodsedit",data)
    },
    //商品删除
    delete(data){
      return  axios.post("/goodsdelete",data)
    }
}

export default goods