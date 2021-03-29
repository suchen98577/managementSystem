import Vue from "vue";
import App from "./App";
import router from "./router";
//elementui
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';
//axios
// import axios from 'axios'
// Vue.prototype.axios=axios;

import $ from "jquery"
Vue.prototype.$=$;
import store from './store'

//全局css和js
import "./assets/css/reset.css"
import "./assets/js/rem"

//全局组件
import gComponent from "./common";
for (let attr in gComponent) {
  Vue.component(attr,gComponent[attr]);
}
//全局过滤器 
import gFilter from "./filter"
for(let attr in gFilter){
  Vue.filter(attr,gFilter[attr])
}

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
})