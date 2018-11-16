<template>
  <div class="shopHeader">
      <div class="shop_pic"></div>
      <div class="shop_content" @click="show_brief_content">
          <div class="shop_logo"><img :src="shopInfo.avatar" alt=""></div>
          <div class="shop_brand">
              <span class="brand">品牌</span>
              <span class="name">{{shopInfo.name}}</span>
              <i class="arrow"></i>
          </div>
          <div class="shop_detail">
              <span class="rating">{{shopInfo.score}}</span>
              <span class="count">月售{{shopInfo.sellCount}}单</span>
              <span class="deliver_type">&nbsp;&nbsp;{{shopInfo.deliveryTime}}约分钟</span>
              <span class="deliver_distance">距离{{shopInfo.distance}}</span>
          </div>
      </div>
       <div class="shop_discount" @click="show_shop_discount_detail">
           <span v-if="shopInfo.supports">
                <span class="icon">{{shopInfo.supports[0].name}}</span>
                <span class="text">{{shopInfo.supports[0].content}}</span>
                <span class="discount">{{shopInfo.supports.length}}个优惠<i class="arrow"></i></span>
            </span>
       </div>
        <div class="brief_content_wrapper" v-show="showContent">
            <div class="brief_content_mask"></div>
            <div class="brief_content">
                <h2><span class="brand">品牌</span><span class="name">{{shopInfo.name}}</span></h2>
                <ul>
                    <li>
                        <div class="item_data">{{shopInfo.score}}</div>
                        <div class="item">评分</div>
                    </li>
                     <li>
                        <div class="item_data">{{shopInfo.sellCount}}单</div>
                        <div class="item">月售</div>
                    </li>
                     <li>
                        <div class="item_data">{{shopInfo.description}}</div>
                        <div class="item">约{{shopInfo.deliveryTime}}分钟</div>
                    </li>
                     <li>
                        <div class="item_data">{{shopInfo.deliveryPrice}}元</div>
                        <div class="item">配送费用</div>
                    </li>
                     <li>
                        <div class="item_data">{{shopInfo.distance}}</div>
                        <div class="item">距离</div>
                    </li>
                </ul>
                <div class="notice">
                    <span class="line line_left"></span>
                    公告
                    <span class="line line_right"></span>
                </div>
                <p>{{shopInfo.bulletin}}</p>
                <div class="close" @click="hide_brief_content">
                    <span class="iconfont icon-addresssearchclosedp"></span>
                </div>
            </div>
        </div>
        <div class="shop_discount_detail" v-show="showDiscount">
            <div class="discount_detail_mask"></div>
           <div class="discount_content">
               <div class="close" @click="hide_shop_discount_detail"><span class="iconfont icon-addresssearchclosedp"></span></div>
                <h2 class="discount_title">优惠活动</h2>
                <ul class="discount_item_wrapper">
                    <li class="discount_item" v-for="(item,index) in shopInfo.supports" :key="index">
                        <span class="icon" :class="otherClass(index)">{{item.name}}</span>
                        <span class="item_text">{{item.content}}</span>
                    </li>
                </ul>
           </div>
           
        </div>
  </div>
</template>

<script>
    import {mapState} from 'vuex'
export default {
  name: "",
  props: [""],
  data() {
    return {
        showDiscount:false,
        showContent:false

    };
  },

  components: {},

  computed: {
      ...mapState(['shopInfo'])
  },

  beforeMount() {},

  mounted() {},

  methods: {
      show_shop_discount_detail(){
          this.showDiscount = true
      },
      hide_shop_discount_detail(){
          this.showDiscount = false
      },
      show_brief_content(){
          this.showContent = true
      },
      hide_brief_content(){
          this.showContent = false
      },
      otherClass(index){
          if(index==0){
              return 'new_user'
          }else if(index==1){
              return 'hot'
          }else{
              return ''
          }
      }
  },

  watch: {}
};
</script>
<style>
.shopHeader {
  width: 100%;
  overflow: hidden;
}
.shop_pic {
  width: 100%;
  height: 50px;
  background: url("https://fuss10.elemecdn.com/f/5c/ead54394c3de198d3e6d3e9111bbfpng.png");
  background-size: cover;
  background-repeat: no-repeat;
  padding: 5px 10px;
  box-sizing: border-box;
  /* backdrop-filter: 0.5; */
  opacity: 0.8;
}
.shop_content {
  width: 100%;
  position: relative;
}
.shop_logo {
  width: 100%;
  position: absolute;
  width: 66px;
  height: 66px;
  top:0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
}
.shop_logo img {
  width: 100%;
  height: 100%;
}
.shop_content {
  padding: 40px 0 10px 0;
}
.shop_brand {
  text-align: center;
  height: 24px;
  line-height: 24px;
  /* margin-top: 30px; */
}
.brand {
  display: inline-block;
  width: 36px;
  height: 18px;
  line-height: 18px;
  /* margin-bottom: 3px; */
  vertical-align: 3px;
  margin-right: 10px;
  /* background: yellow; */
  background-image: linear-gradient(90deg, #fff100, #ffe339);
  font-size: 12px;
  color: #6a3709;
  font-weight: bold;
  text-align: center;
}
.name {
  font-size: 22px;
  font-weight: 700;
  color: #333;
  /* margin-right: 10px; */
}
.shop_brand .arrow {
  display: inline-block;
  border: 6px solid #fff;
  border-left-color: #333;
  vertical-align: 2px;
}
.shop_detail {
  height: 12px;
  margin-top: 10px;
  font-size: 12px;
  text-align: center;
}
.shop_detail span {
  margin-right: 10px;
  color: #333;
}
.shop_discount {
  
  margin: 0 auto;
  text-align: center;
  /* transform: translateX(-50%); */
  /* display: inline-block; */
  height: 25px;
  line-height: 25px;
  padding: 0 auto;
}
.shop_discount>span{
    display: inline-block;
    padding: 0 5px;
    border: 1px solid #e8e8e8;
    height: 100%;
    box-sizing: border-box;
}
.shop_discount span {
  font-size: 12px;
  color: #666;
}
.shop_discount .icon {
  display: inline-block;
  width: 25px;
  height: 13px;
  line-height: 13px;
  background-color: #70bc46;
  font-size: 10px;
  font-weight: bold;
  color: #fff;
  margin-right: 5px;
}
.shop_discount .text{
    margin-right: 20px;
}
.shop_discount .discount .arrow{
    display: inline-block;
    border:5px solid #fff;
    border-left-color:#666;
    margin-left: 5px; 
}

.brief_content_mask{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.45;
    z-index: 999;
}
.brief_content{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    margin: 0 auto;
    width: 90%;
    /* height:300px; */
    background-color:#fff;
    opacity: 1;
    z-index: 1000;
    border-radius: 5px;
    padding: 25px 20px;
    box-sizing: border-box;
}
.brief_content h2{
    text-align: center;
    margin-bottom: 20px;
}
.brief_content ul{
    overflow: hidden;
}
.brief_content ul li{
    float: left;
    width: 20%;
    text-align: center;
}
.brief_content .item{
    font-size: 12px;
    color:#666;
}
.brief_content .item_data{
    font-size: 14px;
    font-weight: 600;
    color:#333;
    margin-bottom: 8px;
}
.brief_content .notice{
    font-size: 12px;
    color:#666;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
.notice .line{
    display: inline-block;
    width: 20px;
    height: 1px;
    vertical-align: 4px;
    
    /* background-color: #000; */
    /* border-top:1px solid #000; */
}
.line.line_right{
    background: linear-gradient(to left,#fff,#000);
}
.line.line_left{
    background: linear-gradient(to right,#fff,#000);
}
.brief_content p{
    font-size: 14px;
    color: #666;
}
.brief_content_wrapper .close{
    /* position: absolute; */
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    border:1px solid #fff;
    color:#fff;
    /* background-color: red; */
    position: absolute;
    left: 50%;
    bottom: -60px;
    transform: translateX(-50%);
}
.shop_discount_detail{
    position: absolute;
    width: 100%;
    height: 100%;
    /* background-color: #fff; */
    top:0;
    left:0;
    overflow: hidden;
    z-index: 999;
}
.discount_detail_mask{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
    background-color:#000;
    opacity: 0.45; 
}
.discount_content{
    width: 100%;
    height: 240px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
    padding: 20px 30px;
    box-sizing: border-box;
}
.discount_content h2{
    font-size: 20px;
    color: #333;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
}
.discount_item_wrapper{
    height: 160px;
    overflow-y: auto;
}
.discount_item_wrapper .discount_item{
    margin-bottom: 15px;
}
.discount_item_wrapper .discount_item:last-child{
    margin-bottom: 0;
}
.discount_item span{
    font-size: 13px;
    /* display: inline-block; */
}
.discount_item .icon{
    display: inline-block;
    line-height: 18px;
    text-align: center;
    width: 36px;
    height: 18px;
    background-color: #f1884f;
    color:#fff;
    font-weight: 400;
    border-radius: 5px;
    margin-right: 10px;
}
.discount_item .new_user{
    background-color: #70bc46;
}
.discount_item .hot{
    background-color: #f07373;
}
.discount_content .close{
    position: absolute;
    top:0;
    right: 0;
    width: 30px;
    height: 30px;
    /* background-color: red; */
    line-height: 45px;
}
.discount_content .close span{
    font-size: 18px;
    font-weight: 600;
    color: #333;
}
</style>