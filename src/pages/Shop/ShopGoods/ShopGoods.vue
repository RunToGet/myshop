<template>
    <div class="ShopGoods">
          <div class="menu_wrapper">
              <ul>
                  <li class="menu_item" :class="currentIndex===index?'current':''" v-for="(good,index) in shopGoods" :key="index"  @click="choseType(index)">{{good.name}}</li>
              </ul>
          </div>
          <div class="food_wrapper">
              <ul class="food_types">
                  <li class="food_types_item" v-for="(good,index) in shopGoods" :key="index">
                    <h2 class="food_types_name">{{good.name}}</h2>
                    <ul class="food_items_wrapper">
                        <li class="food_item" v-for="(food,index) in good.foods" :key="index">
                            <div class="food_icon"><img :src="food.icon" alt=""></div>
                            <div class="food_content">
                                <h3 class="food_name">{{food.name}}</h3>
                                <div class="food_desc">{{food.description}}</div>
                                <div class="extra">
                                    <span class="month_sold">月售{{food.sellCount}}份</span>
                                    <span class="food_rating">好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">￥{{food.price}}</div>
          
                               <div class="cartControl_wrapper">
                                   <CartControl :food=food />
                               </div>
                            </div>
                        </li>
                    </ul>
                  </li>
              </ul>
          </div>
          <ShopCart />
      </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import {mapState} from 'vuex'
  export default {
    name:'',
    props:[''],
    data () {
      return {
        currentIndex:0,
        scrollY
      };
    },

    components: {
        ShopCart,
        CartControl
    },

    computed: {
        ...mapState(['shopGoods']),
        foodDistanceArr(){
          const foodDistanceArr = []
          let tits = document.querySelectorAll('.food_types_item')
          // console.log(tits)
          for(let i=0;i<tits.length;i++){
            // console.log(tits[i].offsetHeight)
            // console.log(tits.length)
            let temp = 0;
            for(let j=0;j<=i;j++){
                temp+=tits[j].offsetHeight
            }
            foodDistanceArr.push(temp)
          }
          return foodDistanceArr
        }
    },

    beforeMount() {},

    mounted() {
      this.$store.dispatch('getGoods',() =>{
          this.$nextTick(()=>{
              this._initScroll()
          })
      })  
    },

    methods: {
      // 菜单和食品列表初始化滚动实例
        _initScroll(){
            this.menuScroll = new BScroll('.menu_wrapper',{
                click:true,
                scrollY:true,
                probeType:2
            })
            this.foodScroll = new BScroll('.food_wrapper',{
                click:true,
                scrollY:true,
                probeType:2,
            })
            this.foodScroll.on('scroll',({x,y})=>{
              this.scrollY = Math.floor(Math.abs(y))
              // console.log(this.scrollY)
                 for(let i=0;i<this.foodDistanceArr.length;i++){
                if(this.scrollY!=0&&this.scrollY<this.foodDistanceArr[i]){
                  this.currentIndex = i
                  console.log(this.currentIndex)
                  return;
                }
              }

            })
            this.foodScroll.on('scrollEnd',({x,y})=>{
              this.scrollY = Math.floor(Math.abs(y))
              // console.log(this.scrollY,'end')  
              // console.log(this.foodDistanceArr)
              for(let i=0;i<this.foodDistanceArr.length;i++){
                if(this.scrollY!=0&&this.scrollY<this.foodDistanceArr[i]){
                  this.currentIndex = i
                  // console.log(this.foodDistanceArr.length,this.foodDistanceArr[8])
                  return;
                }else{
                  this.currentIndex = 0;
                }
              }
            })
        },
        choseType(index){
          // console.log(index)
          this.currentIndex=index
          this.foodScroll.scrollTo(0,-this.foodDistanceArr[this.currentIndex],500,'easing')
        },
    },

    watch: {}

  }

</script>
<style>
.ShopGoods{
    position: absolute;
    top:211px;
    bottom: 48px;
    overflow: hidden;
    z-index: 0;
    /* display: flex; */
}
.menu_wrapper{
  width: 80px;
  float: left;
  background-color: #f3f5f7;
  height: 100%;

}
.menu_item:first-child{
  margin-top: -1px;
}
.menu_item{
  line-height: 54px;
  height: 54px;
  text-align: center;
  font-size: 12px;
  color: #333;
  margin: 0 12px;
  border-bottom: 1px solid #e8e8e8;
  box-sizing: border-box;
}
.menu_item.current{
  color: #02a774;
  background-color: #fff;
}
.food_wrapper{
  margin-left: 80px;
  height: 100%;
}

.food_types_name{
  height: 26px;
  line-height: 26px;
  padding-left: 18px;
  box-sizing: border-box;
  font-size: 12px;
  color: #93999f;
  background-color: #f3f5f7;
  border-left: 2px solid #d9dde1;
}
.food_items_wrapper .food_item{
  position: relative;
  display: flex;
  margin: 18px;
  padding-bottom:18px;
  border-bottom: 1px solid #e8e8e8; 
}
.food_items_wrapper .food_item:last-child{
  /* padding-bottom: 0; */
  margin-bottom: 0;
}
.food_icon{
  width: 57px;
  height: 79px;
  margin-right: 10px;
}
.food_icon img{
  width: 57px;
  height: 57px;
}
.food_name{
  margin:2px 0 8px 0;
  font-size: 14px;
  height: 14px;
  line-height: 14px;
  color:#07111b;
}
.food_desc{
  line-height: 12px;
  margin-bottom: 8px;
  font-size: 10px;
  color:#93999f;
}
.extra{
  height: 12px;
  line-height: 12px;
}
.extra span{
  font-size: 10px;
  color:#93999f;
}
.extra .month_sold{
  margin-right: 10px;
}
.price{
  line-height: 25px;
  color: red;
}
.cartControl_wrapper{
  position: absolute;
  right: 0;
  bottom: 12px;
}
</style>