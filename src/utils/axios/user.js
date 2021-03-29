import axios from "./axios"
const user={
    //用户添加
    add(data){
        return axios.post("/useradd",data)
    },
    //用户总数
    count(params){
          return axios.get("/usercount",{
                params
          })
    },
    //用户列表
    list(params){
        return axios.get("/userlist",{
            params
        })
    },
    //用户详情
    info(params){
        return axios.get("/userinfo",{
            params
        })
    },
    //用户修改
    edit(data){
        return axios.post("/useredit",data)
    },
    //用户删除
    delete(data){
      return  axios.post("/userdelete",data)
    },
    //用户登录
    login(data){
      return  axios.post("/userlogin",data)
    },
}

export default user