<template>
  <section class="order">
    <HeaderTop :title="'订单列表'" />
    <div class="order_no_login">
        <img src="../../../static/images/person.png" alt="">
        <h3>登录后查看外卖订单</h3>
        <button>立即登录</button>
    </div>
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'

  export default{
    components:{
      HeaderTop
    }
  }
</script>

<style>
.order_no_login{
  padding-top: 140px;
  text-align: center;
  margin:0 auto;
  width: 60%;
}
.order_no_login>img{
  width: 100%;
  height: 30%;
  display: block;
}
.order_no_login>h3{
  font-size: 17px;
  color:#6a6a6a;
  /* line-height: 24px; */
  padding: 10px 0;
}
.order_no_login>button{
  font-size: 14px;
  color:#fff;
  background-color: #02a774;
  outline: none;
  border:0;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>