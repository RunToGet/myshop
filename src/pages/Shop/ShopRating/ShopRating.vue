<template>
  <div class="ShopRating">
    <div class="content">
          <div class="rating_score">
          <div class="rating_score_left">
              <div class="total_score">4.2</div>
              <div class="total_score_title">综合评分</div>
              <div class="total_score_desc">高于周边商家99%</div>
          </div>
          <div class="rating_score_right">
              <div class="star_rating_wrapper">
                  <div class="star_rating">
                      <span class="star_item star_on"></span>
                      <span class="star_item star_on"></span>
                      <span class="star_item star_on"></span>
                      <span class="star_item star_on"></span>
                      <span class="star_item star_on"></span>
                  </div>
                  <p class="star_rating_text">服务态度<span class="star_rating_score">4.1</span></p>
              </div> 
              <div class="star_rating_wrapper">
                  <div class="star_rating">
                      <span class="star_item star_on"></span>
                      <span class="star_item star_on"></span>
                      <span class="star_item star_on"></span>
                      <span class="star_item star_half"></span>
                      <span class="star_item star_off"></span>
                  </div>
                  <p class="star_rating_text">商品评分<span class="star_rating_score">4.3</span></p>
              </div>
              <div class="deliver_time_title">送达时间<span class="deliver_time_ave">28分钟</span></div> 
          </div>
      </div>
      <div class="split"></div>
      <div class="rating_select">
          <div class="satisfy_group">
              <span class="all" :class="ratingType==-1 ? 'active' : ''" @click="choseRatings(-1)">全部{{shopRatings.length}}</span>
              <span class="satisfy" :class="ratingType==0 ? 'active' : ''"  @click="choseRatings(0)">满意{{goodRatings.length}}</span>
              <span class="unsatisfy" :class="ratingType==1 ? 'active' : ''"  @click="choseRatings(1)">不满意{{badRatings.length}}</span>
          </div>
          <div class="has_content" @click="hasContent = !hasContent">
              <span class="iconfont icon-check-circle-fill" :class="hasContent?'active':''"></span>
              只看有内容的评价
          </div>
      </div>
      <div class="rating_comment">
          <ul class="comment_list">
              <li class="comment_item" v-for="(rating,index) in ratingSelected" :key="index">
                  <div class="customer_avatar"><img :src="rating.avatar" alt=""></div>
                  <div class="comment_content">
                      <h4 class="customer_name">{{rating.username}}</h4>
                      <div class="customer_star_wrapper">
                          <div class="customer_star_rating">
                              <span class="star_item on"></span>
                              <span class="star_item on"></span>
                              <span class="star_item on"></span>
                              <span class="star_item half"></span>
                              <span class="star_item off"></span>
                          </div>
                          <div class="customer_deliver_time">{{rating.deliveryTime}}</div>
                      </div>
                      <p class="customer_rating_text">{{rating.text}}</p>
                      <div class="suggest">
                          <span v-for="(food,index) in rating.recommend" :key="index">{{food}}</span>
                      </div>
                      <div class="customer_rating_time">{{rating.rateTime}}</div>
                  </div>
              </li>
          </ul>
      </div>
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
        hasContent:true,
        ratingType:-1,
      };
    },

    components: {},

    computed: {
      ...mapState(['shopRatings']),
      
      //筛选评论
      ratingSelected(){
        let ratings = []
        if(this.ratingType==-1){
          ratings = this.shopRatings
        }else if(this.ratingType==0){
          ratings = this.goodRatings
        }else if(this.ratingType==1){
          ratings = this.badRatings
        }
        if(this.hasContent){
          ratings = ratings.filter(item=>item.text!='')
        }
        return ratings
      },
      goodRatings(){
        return this.shopRatings.filter(item=>item.rateType==0)
      },
      badRatings(){
        return this.shopRatings.filter(item=>item.rateType!==0)
      }
    },

    beforeMount() {},

    mounted() {
      this.$store.dispatch('getRatings',()=>{
        this.$nextTick(()=>{
            this._initScroll()
        })
      })
    },

    methods: {
      _initScroll(){
          this.ratingScroll = new BScroll('.ShopRating',{
                    click:true
          })
          console.log(this.ratingScroll)
      },
      choseRatings(type){   //type:  2:全部  1:满意   0:不满意
        this.ratingType = type;
      }
    },

    watch: {}

  }

</script>
<style>
.ShopRating{
  position: absolute;
  top:211px;
  bottom: 0;
  /* display: flex; */
  overflow: hidden;
}
  .rating_score{
    width: 100%;
    height: 118px;
    padding: 18px 0;
    box-sizing: border-box;
  }
  .rating_score_left{
    float: left;
    width: 137px;
    height: flex;
    text-align: center;
    padding: 6px 0;
    border-right: 1px solid rgba(7,17,27,0.1);
  }
  .rating_score_left .total_score{
    font-size: 24px;
    color:#f90;
    margin-bottom: 6px;
    line-height: 30px;
  }
  .rating_score_left .total_score_title{
    font-size: 12px;
    color:#07111b;
    line-height: 12px;
    margin-bottom: 8px;
  }
  .rating_score_left .total_score_desc{
    font-size: 12px;
    line-height: 12px;
    color: #93999f;
  }
  .rating_score_right{
    float: left;
    padding: 6px 0 6px 24px;
  }
  .star_rating_wrapper{
    overflow: hidden;
    margin-bottom: 8px;
  }
  .star_rating{
    float: left;
    margin:0 12px;
  }
  .star_rating_text{
    float: left;
  }
  .star_item{
    display: inline-block;
    width: 15px;
    height: 15px;
    /* margin-right: 6px; */
   
  }
   .star_item:last-child{
     margin-right: 0px;
   }
  .star_on{
    background: url('./images/star36_on@2x.png');
    background-size:cover; 
  }
  .star_half{
    background: url('./images/star36_half@2x.png');
    background-size:cover; 
  }
  .star_off{
    background: url('./images/star36_off@2x.png');
    background-size:cover; 
  }
  .star_rating_text{
    font-size: 12px;
    line-height: 15px;
  }
  .star_rating_score{
    color:#f90;
  }
  .deliver_time_title{
    font-size: 12px;
  }
  .deliver_time_title .deliver_time_ave{
    margin-left: 15px;
    color:#666;
  }
  .split{
    width: 100%;
    height: 18px;
    border-top:1px solid rgba(7,17,27,0.1);
    border-bottom:1px solid rgba(7,17,27,0.1);
    background: #f3f5f7;
    box-sizing: border-box;
  }
  .rating_select{
    padding: 18px 18px 12px 18px;
    border-bottom: 1px solid rgba(77,85,93,0.2)
  }
  .satisfy_group{
    margin-bottom: 18px;
  }
  .satisfy_group span{
    display: inline-block;
    padding: 8px 12px;
    background-color:rgba(77,85,93,0.2);
    margin-right: 5px;
    color:#4d555d;
    font-size: 12px;
  }
  .satisfy_group span.active{
    background-color: #02a774;
    color: #fff;
  }
  .has_content{
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    color:#93999f;
  }
  .has_content span{
    font-size: 24px;
    vertical-align: -4px;
  }
  .has_content span.active{
    color:#02a774;
  }
  .rating_comment{
    padding: 0 18px;
  }
  .comment_item{
    margin:18px 0;
    overflow: hidden;
    position: relative;
  }
  .customer_avatar{
    width: 28px;
    /* height: 122px; */
    margin-right: 12px;
    float: left;
  }
  .customer_avatar img{
    width: 28px;
    /* height: 28px; */
    border-radius: 50%;
  }
  .comment_content{
    font-size: 12px;
    margin-left: 40px
  }
  .comment_content .customer_name{
    /* display: inline-block; */
    margin-bottom: 4px;
  }
  .comment_content .customer_star_wrapper{
    margin-bottom: 6px;
  }
  .customer_star_rating{
    display: inline-block;
    margin-right: 5px;
    
  }
   .customer_star_rating .star_item{
     width: 10px;
     height: 10px;
     display: inline-block;
     /* background: red; */
   }
  .customer_star_rating .star_item.on{
    background: url('./images/star24_on@2x.png');
    background-size: cover;
  }
  .customer_star_rating .star_item.half{
    background: url('./images/star24_half@2x.png');
    background-size: cover;
  }
  .customer_star_rating .star_item.off{
    background: url('./images/star24_off@2x.png');
    background-size: cover;
  }
  .customer_deliver_time{
    display: inline-block;
  }
  .customer_rating_text{
    /* display: inline-block; */
    margin-bottom: 8px;
    color:#07111b;
    line-height: 18px;
  }
  .suggest span{
    display: inline-block;
    padding: 2px 5px;
    border:1px solid #ccc;
    color:#666; 
    margin-bottom: 6px;
  }
  .customer_rating_time{
    position: absolute;
    top:0;
    right: 0;
  }
</style>