<template>
  <div class="shop_info">
      <div>
        <section class="deliver_info">
            <h2 class="shop_info_title">配送信息</h2>
            <div class="shop_info_content">
                <div class="deliver_text">
                    <span class="deliver_brand">{{shopInfo.description}}</span>
                    由商家配送提供配送，约{{shopInfo.deliveryTime}}分钟送达，距离{{shopInfo.distance}}
                </div>
                <div class="deliver_fee2">配送费￥{{shopInfo.deliveryPrice}}</div>
            </div>
        </section>
        <div class="split"></div>
        <section class="activity_and_service">
            <h2 class="shop_info_title">活动与服务</h2>
            <div class="shop_info_content">
                <ul class="shop_discount_wrapper">
                    <li class="shop_discount_item" v-for="(item,index) in shopInfo.supports" :key="index">
                        <span class="discount_item_icon" :class="otherClass(index)">{{item.name}}</span>
                        <span class="discount_item_text">{{item.content}}</span>
                    </li>
                </ul>
            </div>
        </section>
        <div class="split"></div>
        <section class="shop_photo">
            <h2 class="shop_info_title">商家实景</h2>
            <div class="shop_info_content">
                <div class="pic_wrapper">
                    <ul class="pic_list">
                        <li class="pic_item" v-for="(pics,index) in shopInfo.pics" :key="index"><img :src="pics" alt=""></li>
                    </ul>
                </div>
            </div>
        </section>
        <div class="split"></div>
        <section class="shop_infomation">
            <h2 class="shop_info_title">商家信息</h2>
            <div class="shop_info_content">
                <div class="shop_info_wrapper">
                    <ul class="shop_info_list">
                        <li class="shop_info_item">
                            <span class="item_title">品类</span>
                            <span class="item_content">{{shopInfo.category}}</span>
                        </li>
                        <li class="shop_info_item">
                            <span class="item_title">商家电话</span>
                            <span class="item_content">{{shopInfo.phone}}</span>
                        </li>
                        <li class="shop_info_item">
                            <span class="item_title">地址</span>
                            <span class="item_content">{{shopInfo.address}}</span>
                        </li>
                        <li class="shop_info_item">
                            <span class="item_title">营业时间</span>
                            <span class="item_content">{{shopInfo.workTime}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
      </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {mapState} from 'vuex'
  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {},

    computed: {
        ...mapState(['shopInfo'])
    },

    beforeMount() {},

    mounted() {
        this.$nextTick(()=>{
            this._initScroll()
            this._initWiper()
        })
    },

    methods: {
        _initScroll(){
            this.scroll = new BScroll('.shop_info',{})
            console.log(this.scroll)
        },
        _initWiper(){
            this.wiper = new BScroll('.pic_wrapper',{
                scrollX: true
            })
            console.log(this.wiper)
        },
        otherClass(index){
            if(index==0){
                return 'first_order'
            }else if(index==1){
                return 'enough_reduce'
            }else{
                return ''
            }
        }

    },

    watch: {

    }

  }

</script>
<style>
.shop_info{
  position: absolute;
  top:211px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
}
.deliver_info,.activity_and_service,.shop_photo,.shop_infomation{
  width: 100%;
  box-sizing: border-box;
  padding: 16px 14px 14px 14px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.shop_info_title{
  font-size: 16px;
  font-weight: bold;
}
.shop_info_content{
  width: 100%;
  margin-top: 15px;
  overflow: hidden;
}
.deliver_text{
  font-size: 14px;
  line-height: 18px;
  color:#666;
  margin-bottom: 8px;
}
.deliver_text .deliver_brand{
  display: inline-block;
  width: 55px;
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
  text-align: center;
  font-size: 12px;
  border-radius: 5px;
  background-color: #0097ff;
  color:#fff;
}
.deliver_fee2{
  color:#666;
  font-size: 12px;
}
.split{
  width: 100%;
  height: 18px;
  border-top:1px solid rgba(7,17,27,0.1);
  border-bottom: 1px solid rgba(7,17,27,0.1);
  box-sizing: border-box;
  background-color: #f3f5f7;
}
.shop_discount_item{
  height: 18px;
  line-height: 18px;
  margin-bottom: 12px;
}
.shop_discount_item span{
  font-size: 13px;
  color:#666;
}
.shop_discount_item .discount_item_icon{
  display: inline-block;
  width: 36px;
  height: 18px;
  line-height: 18px;
  background-color: #f1884f;
  font-size: 12px;
  text-align: center;
  color: #fff;
  border-radius: 3px;
  margin-right: 5px;
}
.shop_discount_item .first_order{
  background-color: #70bc46;
}
.shop_discount_item .enough_reduce{
  background-color: #f07373;
}
.pic_list{
  overflow: hidden;
  width: 630px;
}
.pic_item{
  float: left;
  margin-right: 6px;
}
.pic_item img{
  width: 120px;
  height: 90px;
}
.shop_info_item{
  height: 16px;
  padding: 16px 12px 16px 0;
  /* box-sizing: border-box; */
  overflow: hidden;
  border-bottom: 1px solid #e8e8e8;
}
.shop_info_item:last-child{
  border-bottom: none;
  padding-bottom: 0;
}
.item_title{
  float: left;
  color:#333;
  font-size: 14px;
  font-weight: bold;
}
.item_content{
  float: right;
  font-size: 14px;
  color:#666;
}
</style>