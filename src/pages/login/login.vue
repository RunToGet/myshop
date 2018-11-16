<template>
  <div class="login">
    <div class="login_header">
        <h2>我的外卖</h2>
        <div class="login_types">
            <a class="login_types_message" :class="{on:loginType}" @click="loginType=true">短信登录</a>
            <a class="login_types_username" :class="{on:!loginType}" @click="loginType=false">密码登录</a>
        </div>
    </div>
    <div class="login_body">
        <form action="">
            <div class="message_login" v-show="loginType">
                <section class="message_login_phone">
                    <input type="text" placeholder="手机号" v-model="phone">
                    <button class="getCode" :class="{fColor:isDisabled}" :disabled=!isDisabled @click.prevent="getCode">
                        {{countDown ? '已发送'+countDown+'s' : '获取验证码'}}
                    </button>
                </section>
                <section class="message_login_code">
                    <input type="text" placeholder="验证码" v-model="code">
                </section>
            </div>
            <div class="username_login" v-show="!loginType">
                <section class="username_input">
                    <input type="text" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="pwd_input">
                    <input type="password" name="" id="" placeholder="密码" v-show="!show_pwd" v-model="pwd">
                    <input type="text" placeholder="显示密码" v-show="show_pwd" v-model="pwd">
                        <div class="pwd_toggle_btn" :class="show_pwd?'':'pwd_toggle_btn2'" @click="show_pwd=!show_pwd">
                            <span class="pwd_toggle" :class="show_pwd?'_right':'_left'"></span>
                            abc
                        </div>
                </section>
                <section class="captcha_input">
                    <input type="text" placeholder="验证码" v-model="captcha">
                    <!-- <img src="./images/captcha.svg" alt=""> -->
                    <img src="http://localhost:4000/captcha" alt="" @click="refreshCaptcha" ref="captcha">
                </section>
            </div>
            <p class="userTips">温馨提示：未注册myshop外卖的手机号，登录时将自动注册，且代表已同意<a class="userAgreement" href="javascript:;">《用户服务协议》</a></p>
            <button class="login_btn" @click.prevent="login">登录</button>
            <a href="javascript:;" class="about">关于我们</a>
        </form>
    </div>
    <div class="back_btn" @click="$router.back()"><span class="iconfont icon-arrow-right"></span></div>
  </div>
</template>

<script>
import {reqMessageCode,loginByPhone,loginByName} from '../../api/index.js'

  export default {
    name:'',
    props:[''],
    data () {
      return {
          loginType:false,   //true代表短信登录，false代表密码登录
          show_pwd:false,
          phone:'',      //手机号
          code:'',     //手机验证码
          pwd:'',
          countDown:0,   //计数器
          name:'',      //用户名
          pwd:'',      //用户mima
          captcha:'',   //验证码
      };
    },

    computed: {
        isDisabled(){
            return (/^1\d{10}$/).test(this.phone)
        }
    },

    beforeMount() {},

    mounted() {},

    methods: {
        
        //获取手机验证码
       async getCode(){
           console.log(this.timeId)
           if(!this.timeId){
               this.countDown = 10;
               this.timeId = setInterval(()=>{
                   this.countDown--;
                   if(this.countDown<=0){
                       clearInterval(this.timeId)
                       this.timeId = null
                   }
               },1000)
               const result = await reqMessageCode(this.phone)
                if(result.data.code==1){
                    alert("发送失败")
                    this.countDown=0
                    clearInterval(this.timeId)
                    this.timeId = null
                }
           }
        },

        login(){
            if(this.loginType){                    //手机号登录
                this.loginByPhoneAndCode()    
            }else{    //用户名登录
                this.loginByNameAndPwd()
            }   
            
        },

        //通过手机号登录
        async loginByPhoneAndCode(){
            // 判断手机号必须是11位
            if(!/^1\d{10}$/.test(this.phone)){
                alert("手机号不正确")
                return
            }
            //判断验证码必须是六位
            if(!/^\d{6}$/.test(this.code)){
                alert("验证码必须是6位")
                return
            }
            const result = await loginByPhone(this.phone,this.code) 
            console.log(result)
            if(result.data.code){
                alert(result.data.msg)
            }else{
                this.$store.dispatch('getUserInfo',result.data.data)
                this.$router.back()
            }
        },
        //通过用户名登录
        async loginByNameAndPwd(){
            const {name,pwd,captcha} = this
            if(name===""){
                alert("请输入用户名")
                return
            }else if(pwd===""){
                alert("请输入密码")
            }else if(captcha===""){
                alert("验证码错误")
                this.refreshCaptcha()
            }else{
                const result = await loginByName({name:name,pwd:pwd,captcha:captcha})
                // console.log(result)
                if(result.data.code===1){
                    alert(result.data.msg)
                    this.refreshCaptcha()
                }else{
                    //将用户数据保存到vuex,跳转到上一页
                    // console.log()
                    this.refreshCaptcha()
                    this.$store.dispatch('getUserInfo',result.data.data)
                    this.$router.back()
                    
                }
            }
        },

        //动态刷新验证码
        refreshCaptcha(){
            this.$refs.captcha.src = "http://localhost:4000/captcha?"+Date.now()
        },
    },

    watch: {},

    omponents: {}
  }

</script>
<style>
.login{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.login_header{
    margin:15% auto 5%;
    text-align: center;
}
.login_header h2{
    color:#02a774;
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 40px;
}
.login_types .login_types_message,.login_types .login_types_username{
    font-size: 14px;
    font-weight: bold;
}
.login_types .login_types_message{
    margin-right: 10%;

}
.login_types_message.on,.login_types_username.on{
    color:#02a774;
    border-bottom: 2px solid #02a774;
    padding-bottom:2px;
}
.login_body{
    text-align: center;
    margin:0 auto;
}
.login_body input{
    border:1px solid #ccc;
    
    /* height: 48px; */
    text-indent: 10px;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    font-size: 14px;
    color:#666;
    box-sizing: border-box;
    /* outline: #02a774; */
    outline: none;
}
.login_body input:focus{
    border-color: #02a774;
}
.userTips{
    width: 80%;
    margin: 0 auto;
    font-size: 14px;
    color:#666;
    margin-bottom: 20px;
    line-height: 20px;
    text-align: left;
}
.userTips>a{
    color:#02a774;
}
.login_btn{
    display: block;
    width: 80%;
    border-radius: 5px;
    outline: none;
    height: 40px;
    margin:0 auto;
    box-sizing: border-box;
    border: none;
    color:#fff;
    background-color: #4cd96f;
    font-size: 16px;
    margin-bottom: 10px;
}
.about{
    font-size: 12px;
}
.message_login_phone,.message_login_code{
    position: relative;
    width: 80%;
    margin:0 auto;
    box-sizing: border-box;
    height: 48px;
    margin-bottom: 5%;
}
.getCode{
    position: absolute;
    font-size: 14px;
    width: 30%;
    bottom:50%;
    transform: translateY(50%);
    right: 5%;
    border:none;
    outline: none;
    background-color: #fff;
    color:#ccc;
}
.username_input,.pwd_input,.captcha_input{
    width: 80%;
    height: 50px;
    margin:0 auto 5%;
    position: relative;
}
.captcha_input input{
    width: 100%;
    height: 100%;
}
.captcha_input img{
    position: absolute;
    top:0;
    right: 0;
}
.pwd_toggle_btn{
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    right:5%;
    border:1px solid #ccc;
    width: 50px;
    height: 20px;
    line-height: 18px;
    border-radius: 25px;
    background-color: #02a774;
    color: #fff;
    font-size: 10px;
    transition: all 0.2s;
    text-align: left;
    text-indent: 6px;
}
.pwd_toggle_btn2{
    background-color: #fff;
}
.pwd_toggle_btn span{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #ccc;
    position: absolute;
    background-color: #fff;
    top:-1px;
    right: 0;
    transition: all .2s ease-in;
}
._right{
    /* right:0 */
    transform: translateX(0px)
}
._left{
    /* left:0 */
    transform: translateX(-30px)
}
.back_btn{
    position: absolute;
    top:2%;
    left: 2%;
    transform: rotate(180deg)
}
.back_btn span{
    font-size: 32px;
}
.fColor{
    color:#000;
}
</style>