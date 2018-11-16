<template>
    <nav class="msite_nav">
       <div v-if="foodCategorys.length" class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" style="width:100%" v-for="(foodCategory,index) in foodCategorys" :key="index">
                    <a href="javascript:;" class="msite_nav_item" v-for="(category,index) in foodCategory" :key="index">
                        <img :src="base_url+category.image_url" alt="category.description" class="nav_item_img">
                        <p class="nav_item_title">{{category.title}}</p>
                    </a>
                </div>
           </div>
           <div class="swiper-pagination"></div>
       </div>
       <!-- 在网络未加载出来的时候能够显示一张结构图，有利于用户体验 -->
       <div v-else>
           <img src="./images/msite_back.svg" alt="">
       </div>
    </nav>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'
    import {mapState} from 'vuex'
    export default {
        data(){
            return{
                base_url:'https://fuss10.elemecdn.com',
            }
        },
        computed:{
            ...mapState(['categorys']),
            foodCategorys(){
                const {categorys} = this
                let foodCategorys = []
                let tempArr = []
                for(let i=0;i<categorys.length;i++){
                    if(tempArr.length===8){
                        tempArr = []
                    }
                    if(tempArr.length===0){
                        foodCategorys.push(tempArr)
                    }
                    tempArr.push(categorys[i])
                }
                return foodCategorys
            }
        },
        watch:{
            categorys(value){
                this.$nextTick(()=>{
                    new Swiper('.swiper-container',{
                        autoplay:true,
                        // loop:true,
                        pagination:{
                            el:'.swiper-pagination',
                            // clickable:true
                        }
                    })
                })
            },
        }        
    }
</script>

<style>
.msite_nav {
  position: relative;
  width: 100%;
  height: 200px;
  /* background: pink; */
  margin-top: 45px;
  background-color: #fff;
}
.msite_nav_item {
  width: 25%;
  height: 100px;
  display: block;
  overflow: hidden;
  text-align: center;
  position: relative;
  float: left;
}
.nav_item_img {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}
.nav_item_title {
  color: #666;
  font-size: 14px;
}
.msite_nav .swiper-container{
    width: 100%;
    height: 100%;
}
</style>