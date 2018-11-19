import Vue from 'vue'
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import store from './store'

// Vue.use(MintUI)

//加载mockServer
import './mock/mockServer.js'

import {Header,Tabbar, TabItem } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);


// 注册全局组件标签,这个是在全局都可以使用
import  {Button} from 'mint-ui'
Vue.component(Button.name,Button)

new Vue({
  el:"#app",
  render:h => h(App),
  router,
  store
})