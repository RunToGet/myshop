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

//引入swiper插件和样式
// import Swiper from "swiper";
// import "swiper/dist/css/swiper.min.css";

    
import {mapState} from 'vuex'
  
export default {
  data(){
      return {
          base_url:'https://fuss10.elemecdn.com',
          shopImg_base_url:'http://owoccema2.bkt.clouddn.com/show/MintShop/',
      }
  },  

    computed:{
        ...mapState(['address','userInfo','shops']),
        link_to(){
            if(this.userInfo._id){
                return '/userinfo'
            }else{
                return '/login'
            }
        },

        foodCategorys(){
            let newCategorys = []
            let temArr = []
            for(let i=0;i<this.categorys.length;i++){
                if(temArr.length==0){
                    newCategorys.push(temArr)
                }
                temArr.push(this.categorys[i])
                if(temArr.length>=8){
                    //下面两种方法都可以将数组的长度重置，但是注意引用类型的区别，导致newCategorys中的小数组中数据会改变
                    //   temArr.length = 0
                    temArr = []
                }
            }  
            return newCategorys
        },
    },

    methods:{
        ratingArr(score){
            let tempArr = []
            let fullSize = Math.floor(score)
            for(let i=0;i<fullSize;i++){
                tempArr.push('on')
            }
            if(score*10-fullSize*10>=5){
                tempArr.push('half')
            }
            for(let i=tempArr.length;i<5;i++){
                tempArr.push('off')
            }
            return tempArr 
        },
        
        IntoShop(shop){
            this.$router.push('/shop')
        }
    },

    watch:{
      foodCategorys(value){
          this.$nextTick(()=>{
              new Swiper('.swiper-container',{
                  loop:true,
                  pagination:{
                      el:'.swiper-pagination'
                  }
              })
          })
      }  
    },

    components: {
        HeaderTop,
        MsiteNav,
        ShopList
    },

    mounted(){
        //获取位置详情，这个应该在app.vue中执行
        // this.$store.dispatch('getAddress')
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
.msite_shop_list{
    margin-top: 10px;
    border-top:1px solid #e8e8e8;
}
.shop_list_header{
    padding: 10px 10px 0 10px;
    font-size: 14px;
    line-height: 20px;
    color: #999;
}
</style>