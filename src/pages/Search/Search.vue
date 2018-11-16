<template>
  <section class="search">
      <HeaderTop :title="'搜索'" />
      <form action="" class="searchShop">
        <input type="search" class="searchInput" placeholder="请输入商家名称" />
        <input type="submit" value="提交" class="searchBtn" />
      </form>
      
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
.search{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.searchShop{
  margin-top: 45px;
  padding: 12px 8px;
}
.searchInput{
    background-color: #f2f2f2;
    width: 79%;
    float: left;
    height: 35px;
    font-size: 14px;
    font-weight: bold;
    border:4px solid #f2f2f2;
    padding: 0 4px;
    outline: none;
    box-sizing: border-box;
    color:#333;
  }
  .searchBtn{
    float: right;
    border:4px solid #02a774;
    background-color: #02a774;
    color:#fff;
    height: 35px;
    box-sizing: border-box;
    padding: 0 5px;
    width: 18%;
    font-size: 16px;
    font-weight: bold;
    border-radius: 2px;
  }
</style>