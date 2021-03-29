import axios from "./axios"
const menu={
    //菜单添加
    add(data){
        return axios.post("/menuadd",data)
    },
    //菜单列表
    list(params){
        return axios.get("/menulist",{
            params
        })
    },
    //菜单详情
    info(params){
        return axios.get("/menuinfo",{
            params
        })
    },
    //菜单修改
    edit(data){
        return axios.post("/menuedit",data)
    },
    //菜单删除
    delete(data){
        return axios.post("/menudelete",data)
    },
}
export default menu