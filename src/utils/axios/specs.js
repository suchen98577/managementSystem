import axios from "./axios"
const specs={
    //商品规格添加
    add(data){
        return axios.post("/specsadd",data)
    },
    //商品规格总数
    count(params){
        return axios.get("/specscount",{
            params
        })
    },
    //商品规格列表
    list(params){
        return axios.get("/specslist",{
            params
        })
    },
    //商品规格详情
    info(params){
        return axios.get("/specsinfo",{
            params
        })
    },
    //商品规格修改
    edit(data){
        return axios.post("/specsedit",data)
    },
    //商品规格删除
    delete(data){
      return  axios.post("/specsdelete",data)
    }
}

export default specs