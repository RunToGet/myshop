<template>
 <div class="profile">
   <HeaderTop title="我的" />
   <div class="profile_header">
        <router-link :to="link_to" class="to_login">
              <div class="login_avatar"><i class="iconfont icon-avatar"></i></div>
              <div class="login_text">
                  <div class="login_userName" v-if="userInfo._id">{{userInfo.name || userInfo.phone}}</div>
                  <div class="login_submit" v-else>登录/注册</div>
                  <div class="login_phone" v-if="!userInfo.phone"><span class="iconfont icon-shouji"></span>暂无绑定手机号</div>
                  <div class="login_phone" v-else>暂无用户名</div>
              </div>
              <div class="arrow"><span class="iconfont icon-arrow-right"></span></div>
        </router-link>
   </div>
   <div class="login_info_data">
        <div class="info_balance">
            <p><span>0.00</span>元</p>
            <div>我的余额</div>
        </div>
        <div class="info_discount">
            <p><span>0</span>个</p>
            <div>我的优惠</div>
        </div>
        <div class="info_score">
            <p><span>0</span>分</p>
            <div>我的积分</div>
        </div>
   </div>
   <section class="my_order">
      <div class="my_order_title"><span class="iconfont icon-dingdan"></span>我的订单</div>
      <div class="more"><span class="iconfont icon-arrow-right"></span></div>
   </section>
      <section class="my_score">
      <div class="my_score_title"><span class="iconfont icon-jifen"></span>积分商城</div>
      <div class="more"><span class="iconfont icon-arrow-right"></span></div>
   </section>
      <section class="my_member">
      <div class="my_member_title"><span class="iconfont icon-VIP"></span>Mint外卖会员卡</div>
      <div class="more"><span class="iconfont icon-arrow-right"></span></div>
   </section>
      <section class="my_service">
      <div class="my_service_title"><span class="iconfont icon-lianxikefu"></span>服务中心</div>
      <div class="more"><span class="iconfont icon-arrow-right"></span></div>
   </section>
   <button class="quit" @click="logout" v-if="userInfo._id">退出登录</button>
 </div>
</template>

<script>
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    import {mapState} from 'vuex'

    export default{
      
      computed:{
        ...mapState(['userInfo']),
        link_to(){
          if(this.userInfo._id){
            return '/userinfo'
          }else{
            return '/login'
          }
        }
      },
      methods:{
        // 登录
        // login(){
        //   this.$router.push('/login')
        // },

        // 退出登录
        logout(){
          if(confirm("确认退出吗")){
            this.$store.dispatch('logout')
          }
          
        }
      },
      components:{
        HeaderTop
      }
    }
</script>

<style>
.profile{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.profile_header{
  margin-top:45px;
  width: 100%;
  height: 100px;
  background-color: #02a774;
  border-top:1px solid #fff;
  padding: 20px 10px;
  box-sizing: border-box;
  position: relative;
}
.login_avatar{
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #e4e4e4;
  text-align: center;
  overflow: hidden;
  vertical-align:top;
  /* line-height: 60px; */
}
.login_avatar>i{
  font-size: 60px;
  /* color: #ccc; */
}
.login_text{
  float: left;
  margin-left: 15px;
  padding-top:10px; 
}
.login_submit,.login_userName{
  font-size: 18px;
  color: #fff;
  font-weight:bold;
  margin-bottom: 10px;
}
.login_phone{
  font-size: 16px;
  color: #fff;
  /* font-weight:bold; */
}
.arrow{
  position: absolute;
  right: 5%;
  top:50%;
  transform: translateY(-50%);
}
.arrow>span{
  color: #fff;
}
.login_info_data{
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 10px;
  /* height: ; */
}
.info_balance,.info_discount,.info_score{
  float: left;
  height: 100%;
  width: 33%;
  padding: 10px 20px;
  box-sizing: border-box;
}
.info_balance p,.info_discount p,.info_score p{
  margin-bottom: 10px;
  text-align: center;
  font-size: 14px;
}
.info_balance div,.info_discount div,.info_score div{
  font-size: 14px;
  color:#666;
  text-align: center;
}
.info_balance span,.info_discount span,.info_score span{
  font-size: 30px;
  font-weight: bold;
}
.info_balance span{
  color:orange;
}
.info_discount span{
  color: #ff5f3e;
}
.info_score span{
  color: #6ac20b;
}
.my_order{
  border-top:1px solid #e8e8e8;
}
.my_order,.my_score,.my_member,.my_service{
  position: relative;
  width: 100%;
  padding:10px 0px 10px 15px; 
}
.my_order_title,.my_score_title,.my_member_title,.my_service_title{
  font-size: 16px;
  color: #666;
}
.my_order_title span,.my_score_title span,.my_member_title span,.my_service_title span{
  font-size: 24px;
  margin-right: 5px;
}
.my_order_title span{
  color:#02a774;
}
.my_score_title span{
  color:#ff5f3e;
}
.my_member_title span{
  color:#f90;
}
.my_service_title span{
  color:#02a774;
}
.more{
  position: absolute;
  top:50%;
  right:5%;
  transform: translateY(-50%); 
}
.to_login{
  display: block;
  overflow: hidden;
}
.quit{
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #fff;
  background-color: #ef4f4f;
  outline: none;
  border: none;
  border-radius: 5px;
  font-size: 18px;
}
</style>