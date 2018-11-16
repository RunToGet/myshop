<template>
    <div class="msite_shop_list">
        <div class="shop_list_header">附近商家</div>
        <div class="shop_container">
            <ul>
                <li v-for="(shop,index) in shops" :key="index" @click="$router.push('/shop')">
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
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data(){
            return {
                shopImg_base_url:'http://owoccema2.bkt.clouddn.com/show/MintShop/',
            }
        },
        computed:{
            ...mapState(['shops'])
        }
    }
</script>

<style>
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