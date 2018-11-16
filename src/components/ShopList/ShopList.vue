<template>
        <div class="shop_container">
            <ul v-if="shops.length">
                <li v-for="(shop,index) in shops" :key="index" @click="$router.push('/shop')">
                    <div href="javascript:;" class="shop_item">
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
                                    <!-- Star组件 -->
                                    <Star :score="shop.rating" :size="24"  />    
                                    <div class="rating">{{shop.rating}}</div>
                                    <div class="order_num">月售{{shop.recent_order_num}}单</div>
                               </div>
                               <div class="shop_rating_order_right">{{shop.delivery_mode.text}}</div>
                            </section>
                            <section class="shop_distance">
                                <div class="distance_fee">￥{{shop.float_minimum_order_amount}}起送/配送费约￥{{shop.float_delivery_fee}}</div>
                            </section>
                        </div>
                    </div>
                </li>
            </ul>
            <ul v-else>
                <li v-for="item in 6" :key="item">
                    <img src="./images/shop_back.svg" alt="">
                </li>
            </ul>
        </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Star from "../../components/Star/Star.vue"
    export default {
        data(){
            return {
                shopImg_base_url:'http://owoccema2.bkt.clouddn.com/show/MintShop/',
            }
        },
        computed:{
            ...mapState(['shops'])
        },
        components:{
            Star
        }
    }
</script>

<style>

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
.rating,.order_num{
    display: inline-block;
}
</style>