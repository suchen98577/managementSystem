import specs from "@/utils/axios/specs"
export default{
      state:{
            specslist:[]
      },
      getters:{
            getspecslist(state){
                  return state.specslist
            }
      },
      mutations:{
            changespecslist(state,payload){
                  state.specslist=payload
            }
      },
      actions:{
            changespecslistSync({commit}){
                  specs.list().then(res=>{
                        if(res.data.code==200){
                              commit("changespecslist",res.data.list)
                        }
                  })
            }
      },
      namespaced:true
}