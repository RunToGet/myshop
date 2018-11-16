
import Vue from 'vue'
import VueRouter from 'vue-router'

import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Search from '../pages/Search/Search.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/login/login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRating from '../pages/Shop/ShopRating/ShopRating.vue'

Vue.use(VueRouter)

export default new VueRouter({
    // mode:'history',    //去掉地址中的哈希  -----不懂
    routes:[
        {
            path:'/msite',
            component:Msite,
            meta:{
                showFooter:true
            }
        },
        {
            path:'/order',
            component:Order,
            meta:{
                showFooter:true
            }
        },
        {
            path:'/search',
            component:Search,
            meta:{
                showFooter:true
            }
        },
        {
            path:'/profile',
            component:Profile,
            meta:{
                showFooter:true
            }
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/shop',
            component:Shop,
            children:[
                {
                    path:'/shop/goods',
                    component:ShopGoods
                },
                {
                    path:'/shop/info',
                    component:ShopInfo
                },
                {
                    path:'/shop/ratings',
                    component:ShopRating
                },
                {
                    path:'',
                    redirect:'/shop/goods'
                }
            ]
        },
        {
            path:'/',
            redirect:'/msite'
        }
    ]
})