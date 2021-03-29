import axios from "./axios"
const member={
    //会员列表
    list(params){
        return axios.get("/memberlist",{
            params
        })
    },
    //会员详情
    info(params){
        return axios.get("/memberinfo",{
            params
        })
    },
    //会员修改
    edit(data){
        return axios.post("/memberedit",data)
    },
}

export default member