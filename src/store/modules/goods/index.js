import goods from "@/utils/axios/goods"
export default{
      state:{
            goodslist:[]
      },
      getters:{
            getgoodslist(state){
                  return state.goodslist
            }
      },
      mutations:{
            changegoodslist(state,payload){
                  state.goodslist=payload
            }
      },
      actions:{
            changegoodslistSync({commit}){
                  goods.list().then(res=>{
                        if(res.data.code==200){
                              commit("changegoodslist",res.data.list)
                        }
                  })
            }
      },
      namespaced:true
}