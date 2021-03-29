import cate from "@/utils/axios/cate"
export default{
      state:{
            catelist:[]
      },
      getters:{
            getcatelist(state){
                  return state.catelist
            }
      },
      mutations:{
            changecatelist(state,payload){
                  state.catelist=payload
            }
      },
      actions:{
            changecatelistSync({commit}){
                  cate.list({istree:1}).then(res=>{
                        if(res.data.code==200){
                              commit("changecatelist",res.data.list)
                        }
                  })
            }
      },
      namespaced:true
}