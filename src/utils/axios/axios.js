import axios from "axios"
import router from "../../router"
import store from "../../store"
//配置
const http=axios.create({
    baseURL:'/api'
})

//配置axios拦截器
//请求拦截器，常用来操作请求头
http.interceptors.request.use(req=>{
    //登录不做拦截，除了登陆之外的要拦截，加上token字段
    let token=store.state.userInfo?store.state.userInfo.token:"";
    req.headers.authorization =token
    return req
})
//响应拦截器，一般用于全局拦截错误，或者针对返回值进行封装
http.interceptors.response.use(res=>{
    if(res.data.code==403){
        //强制调转到登录
        router.push("/login")
    }
    return res;
})

export default http
