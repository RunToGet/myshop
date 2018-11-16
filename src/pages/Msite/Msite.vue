<template>
    <section class="msite">
        <!-- 头部组件 -->
        <HeaderTop :title="address.name">
            <router-link to="/search" slot="left" class="left">
                <i class="iconfont icon-tubiao08"></i>
            </router-link>
            <router-link :to="link_to" slot="right" class="right">
                <span v-if="userInfo._id" class="iconfont icon-home"></span>
                <span v-else>登录|注册</span>
            </router-link>
        </HeaderTop>
        <!-- 轮播图组件 -->
        <MsiteNav />
        <!-- 食物列表组件 -->
        <div class="msite_shop_list">
            <div class="shop_list_header">附近商家</div>
            <ShopList />
        </div>
    </section>
</template>

<script>
//引入头部组件
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue"
//引入轮播图组件
import MsiteNav from "../../components/MsiteNav/MsiteNav.vue"
//引入食物列表组件
import ShopList from "../../components/ShopList/ShopList.vue"

import {mapState} from 'vuex'
  
export default {
    data(){
        return {
            
        }
    },  

    computed:{
        ...mapState(['address','userInfo']),
        link_to(){
            if(this.userInfo._id){
                return '/userinfo'
            }else{
                return '/login'
            }
        },
    },

    methods:{

    },

    components: {
        HeaderTop,
        MsiteNav,
        ShopList
    },

    mounted(){
        // vuex中获取数据的方法放在路由组件中，如果这个数据仅在当前页面使用
        //获取轮播图的数据
        this.$store.dispatch('getCategorys')
        //获取附近商家数据
        this.$store.dispatch('getShops')
    }
};
</script>

<style>
.msite{
    width: 100%;
    margin-bottom: 50px;
}
.left {
  position: absolute;
  left: 15px;
  top: 50%;
  font-size: 25px;
  transform: translateY(-50%);
  color: #fff;
}
.left .iconfont {
  font-size: 25px;
}
.right {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  font-size: 14px;
}
/* 商家列表 */
.msite_shop_list::before{
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #e4e4e4;
}
/* .msite_shop_list::before {
    content: '';
    position: absolute;
    z-index: 200;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background-color: #e4e4e4;
} */
.msite_shop_list{
    margin-top: 10px;
    background-color: #fff;
    /* border-top:1px solid #e8e8e8; */
}
.shop_list_header{
    padding: 10px 10px 0 10px;
    font-size: 14px;
    line-height: 20px;
    color: #999;
}
</style>