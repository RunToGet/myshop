<template>
    <div class="ShopCart_wrapper">
        <div class="ShopCart">
            <div class="shopCart_content">
                <div class="content_left" @click="toggleDetail">
                    <div class="shopCart_icon">
                        <div class="cart_wrapper" :class="totalNum>0?'has_num':''"><span class="iconfont icon-cart"></span></div>
                        <i class="goods_num" v-show="totalNum>0">{{totalNum}}</i>
                    </div>
                    <div class="shopCart_total">
                        <p class="total_price">￥{{totalPrice}}</p>
                        <p class="deliver_fee">另需配送费￥4元</p>
                    </div>
                </div>
                <div class="content_right">
                    <div class="pay_btn enough" v-show="totalPrice>=20">去结算</div>
                    <div class="pay_btn not_enough" v-show="totalPrice<20">还差￥{{20-totalPrice}}元起送</div>
                </div>
            </div>
            <div class="shopCart_list"  v-show="showDetail">
                <div class="list_header">
                    <h2>购物车</h2>
                    <span>清空</span>
                </div>
                <div class="list_content">
                    <ul>
                        <li class="list_content_item" v-for="(food,index) in foodList" :key="index">
                            <span class="title">{{food.name}}</span>
                            <span class="price">￥{{food.food.price}}</span>
                            <div class="cartControl"><cartControl :food=food /></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-show="showDetail" class="ShopCartMask" @click="closeDetail"></div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapState,mapGetters} from 'vuex'
import cartControl from '../CartControl/CartControl.vue'
  export default {
    name:'',
    props:[''],
    data () {
      return {
          showDetail:false
      };
    },

    components: {
        cartControl
    },

    computed: {
        ...mapState(['total','foodList']),
        ...mapGetters(['totalPrice','totalNum']),
    },

    beforeMount() {},

    mounted() {
        
    },

    methods: {
        toggleDetail(){
            if(this.foodList.length>0){
                this.showDetail = !this.showDetail
            }
            this.list_content_scroll = new BScroll('.list_content',{
                click:true
            })
            // console.log(list_content_scroll)
        },
        closeDetail(){
            this.showDetail = false
        }
    },

    watch: {}

  }

</script>
<style>
/* 购物车列表开始 */
.shopCart_list{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    transform: translateY(-100%);
    background-color: #fff;
    z-index: -1;
}
.shopCart_list .list_header{
    height: 40px;
    padding: 0 18px;
    border-bottom: 1px solid #ccc;
    line-height: 40px;
}
.list_header h2{
    font-size: 14px;
    float: left;
}
.list_header span{
    /* display: inline-block; */
    float: right;
    font-size: 12px;
    color: #00a0dc;
}
.list_content{
    padding: 0 18px;
    max-height: 217px;
    overflow: hidden;
}
.list_content_item{
    position: relative;
    width: 100%;
    height: 48px;
    padding: 12px;
    box-sizing: border-box;
    line-height: 24px;
    border-bottom: 1px solid #ccc;
}
.list_content_item .title{
    font-size: 14px;
    color: #07111b;
}
.list_content_item .price{
    position: absolute;
    right:84px;
    margin-right: 10px;
}
.list_content_item .cartControl{
    width: 84px;
    height: 36px;
    /* background: red; */
    position: absolute;
    top:50%;
    right:0;
    transform: translateY(-50%);
    line-height: 36px;
}

/* 购物车列表结束 */
    .ShopCart_wrapper{
        width: 100%;
        height: 100%;
    }
    .ShopCartMask{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.35;
    }
    .ShopCart{
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 999;
    }
    .shopCart_content{
        height: 48px;
        width: 100%;
        background-color: #141d27;
        float: left;
    }
    .content_left{
        width: 75%;
        float: left;
    }
    .content_right{
        width: 25%;
        float: left;
    }
 
    .shopCart_icon{
        width: 56px;
        height: 56px;
        float: left;
        position: relative;
        bottom: 8px;
        background-color:#141d27;
        padding: 6px; 
        margin:0 12px;
        box-sizing: border-box;
        border-radius: 50%;
        text-align: center;
        vertical-align: middle;       
    }
    .shopCart_icon .cart_wrapper{
        background-color: #2b333b;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        line-height: 44px;
    }
    .shopCart_icon .cart_wrapper.has_num{
       background-color: #02a774;     
    }
    .shopCart_icon span{
        color: rgba(255, 255, 255, .45);
        font-size: 24px;
    }
    .shopCart_icon .has_num span{
        color:#fff;
    }
    .goods_num{
        display: inline-block;
        width: 24px;
        height: 16px;
        border-radius: 10px;
        background-color: red;
        position: absolute;
        top:0;
        right: 0;
        font-style: normal;
        color:#fff;
        font-weight: bold;
        font-size: 14px;
        line-height: 16px;
    }
    .shopCart_total{
        margin-top: 5px;
        color:#fff;
    }
    .total_price{
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
    }
    .deliver_fee{
        font-size: 12px;
        font-weight: normal;
        color: rgba(255, 255, 255, .45)
    }
    .pay_btn{
        width: 100%;
        height: 48px;
        background-color: #00b43c;
        float: left;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        color:#fff;
    }
    .enough{
       background-color: #00b43c; 
    }
    .not_enough{
        background-color: #2b333b;
    }
    
</style>