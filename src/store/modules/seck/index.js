import seck from "@/utils/axios/seck"
export default{
      state:{
            secklist:[]
      },
      getters:{
            getsecklist(state){
                  return state.secklist
            }
      },
      mutations:{
            changesecklist(state,payload){
                  state.secklist=payload
            }
      },
      actions:{
            changesecklistSync({commit}){
                  seck.list().then(res=>{
                        if(res.data.code==200){
                              commit("changesecklist",res.data.list)
                        }
                  })
            }
      },
      namespaced:true
}