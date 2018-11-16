<template>
 <section class="msite">
    <HeaderTop :title="address.name">
        <router-link to="/search" slot="left" class="left">
            <i class="iconfont icon-tubiao08"></i>
        </router-link>
        <router-link :to="link_to" slot="right" class="right">
            <span v-if="userInfo._id" class="iconfont icon-home"></span>
            <span v-else>登录|注册</span>
        </router-link>
    </HeaderTop>
    <MsiteNav />
    <!-- <nav class="msite_nav">
       <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" style="width:100%" v-for="(foodCategory,index) in foodCategorys" :key="index">
                    <a href="javascript:;" class="msite_nav_item" v-for="(category,index) in foodCategory" :key="index">
                        <img :src="base_url+category.image_url" alt="category.description" class="nav_item_img">
                        <p class="nav_item_title">{{category.title}}</p>
                    </a>
                </div>
           </div>
           <div class="swiper-pagination"></div>
       </div>
    </nav> -->
    <div class="msite_shop_list">
        <div class="shop_list_header">附近商家</div>
        <div class="shop_container">
            <ul>
                <li v-for="(shop,index) in shops" :key="index" @click="IntoShop(shop)">
                    <a href="javascript:;" class="shop_item">
                        <div class="shop_left"><img class="shop_pic" :src="shopImg_base_url+shop.image_path" alt=""></div>
                        <div class="shop_right">
                            <section class="shop_derail_header">
                                <div>品牌</div>
                                <h4>{{shop.name}}</h4>
                                <ul>
                                    <li v-for="(support,index) in shop.supports" :key="index">{{support.icon_name}}</li>
                                </ul>
                            </section>
                            <section class="shop_rating_order">
                                <div class="shop_rating_order_left">
                                    <div class="star">
                                        <span class="star_item" :class="item" v-for="(item,index) in ratingArr(shop.rating)" :key="index"></span>
                                        <!-- <span class="star_item on"></span> -->
                                        <!-- <span class="star_item on"></span> -->
                                        <!-- <span class="star_item half"></span> -->
                                        <!-- <span class="star_item off"></span> -->
                                    </div>
                                    <div class="rating">{{shop.rating}}</div>
                                    <div class="order_num">月售{{shop.recent_order_num}}单</div>
                               </div>
                               <div class="shop_rating_order_right">{{shop.delivery_mode.text}}</div>
                            </section>
                            <section class="shop_distance">
                                <div class="distance_fee">￥{{shop.float_minimum_order_amount}}起送/配送费约￥{{shop.float_delivery_fee}}</div>
                            </section>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
 </section>
</template>

<script>
//引入头部组件
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue"
//引入轮播图组件
import MsiteNav from "../../components/MsiteNav/MsiteNav.vue"

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
        ...mapState(['address','userInfo','categorys','shops']),
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
        MsiteNav
    },

    mounted(){
        //获取位置详情，这个应该在app.vue中执行
        // this.$store.dispatch('getAddress')
        //获取轮播图的数据
        this.$store.dispatch('getFoodTypeList')
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
/* shop_list */
.shop_item{
    display: block;
    padding: 15px 8px;
    overflow: hidden;
}
.shop_left{
    float: left;
    box-sizing: border-box;
    height: 75px;
    width: 23%;
    padding-right: 10px;
}
.shop_pic {
    width: 100%;
    height: 100%;
}
.shop_right{
    float: right;
    width: 77%;
    text-align: left;
}
.shop_derail_header div{
    /* float: left; */
    display: inline-block;
    padding: 2px;
    color: black;
    font-weight: 500;
    font-size: 10px;
    background-color: #ffd930;
    margin-right: 5px;
    vertical-align: 2px;
}
.shop_derail_header h4{
    display: inline-block;
    color: #333;
    font-weight: 700;
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.shop_derail_header ul{
    float: right;
    line-height: 19px;
}
.shop_derail_header ul li{
    float: left;
    font-size: 10px;
    padding: 0 2px;
    border:1px solid #f1f1f1;
}
.shop_rating_order{
    overflow: hidden;
    width: 100%;
    margin-top:18px;
    margin-bottom: 8px;
}
.shop_rating_order_left{
    float: left;
}
.star,.rating,.order_num{
    display: inline-block;
}
.star .star_item{
    display: inline-block;
    width: 10px;
    height: 10px; 
}
.star{
    margin-right: 5px;
}
.star .on{
    background: url("./images/star_on.png");
    background-size: 10px 10px;
}
.star .half{
    background: url("./images/star_half.png");
    background-size: 10px 10px;
}
.star .off{
    background: url("./images/star_off.png");
    background-size: 10px 10px;
}
.rating{
    font-size: 12px;
    color: #ff6000;
    margin-right: 5px;
}
.order_num{
    font-size: 12px;
    color:#333;
}
.shop_rating_order_right{
    float: right;
    color:#02a774;
    font-size: 10px;
    border: 1px solid #02a774;
}
.distance_fee{
    font-size: 12px;
    color:#666;
}
</style>