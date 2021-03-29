import banner from "@/utils/axios/banner"
export default{
      state:{
            bannerlist:[]
      },
      getters:{
            getbannerlist(state){
                  return state.bannerlist
            }
      },
      mutations:{
            changebannerlist(state,payload){
                  state.bannerlist=payload
            }
      },
      actions:{
            changebannerlistSync({commit}){
                  banner.list().then(res=>{
                        if(res.data.code==200){
                              commit("changebannerlist",res.data.list)
                        }
                  })
            }
      },
      namespaced:true
}