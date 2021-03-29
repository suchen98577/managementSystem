import role from "@/utils/axios/role"
export default{
      state:{
            rolelist:[]
      },
      getters:{
            getrolelist(state){
                  return state.rolelist
            }
      },
      mutations:{
            changerolelist(state,payload){
                  state.rolelist=payload
            }
      },
      actions:{
            changerolelistSync({commit}){
                  role.list().then(res=>{
                        if(res.data.code==200){
                              commit("changerolelist",res.data.list)
                        }
                  })
            }
      },
      namespaced:true
}