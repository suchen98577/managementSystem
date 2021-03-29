import axios from "./axios"
const role={
    //角色添加
    add(data){
        return axios.post("/roleadd",data)
    },
    //角色列表
    list(params){
        return axios.get("/rolelist",{
            params
        })
    },
    //角色详情
    info(params){
        return axios.get("/roleinfo",{
            params
        })
    },
    //角色修改
    edit(data){
        return axios.post("/roleedit",data)
    },
    //角色删除
    delete(data){
        return axios.post("/roledelete",data)
    },
}
export default role