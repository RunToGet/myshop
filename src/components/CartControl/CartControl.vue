<template>
    <div class="cartcontrol_wrapper">
        <span class="minus iconfont icon-offline" v-show="number>0" @click="reduce"></span>
        <span class="food_num" v-show="number>0">{{number}}</span>
        <span class="plus iconfont icon-addition_fill" @click="add"></span>
    </div>
</template>

<script>

    import {mapState,mapGetters} from 'vuex'
  export default {
    name:'',
    props:{
        food:{
            type:Object
        }
    },
    data () {
      return {
          num:0
      };
    },

    components: {},

    computed: {
        ...mapState(['foodList']),
        number(){
            for(let i=0;i<this.foodList.length;i++){
                if(this.foodList[i].name ==this.food.name){
                    console.log(i)
                    console.log(this.foodList.length)
                    console.log(this.foodList[i].name)
                    console.log(this.food.name)
                    return this.foodList[i].num
                    break;
                }
            }
            return 0;
        }
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
        add(){
            this.$store.dispatch('orderFood',{food:this.food,name:this.food.name,flag:true})
        },
        reduce(){
             this.$store.dispatch('orderFood',{food:this.food,name:this.food.name,flag:false})
        }
    },

    watch: {}

  }

</script>
<style>
.cartcontrol_wrapper{
  width: 84px;
  height: 36px;
  line-height: 36px;
}
.cartcontrol_wrapper .minus{
  display:block;
  padding: 6px;
  line-height: 24px;
  font-size: 24px;
  color: #02a774;
  float: left;
}
.cartcontrol_wrapper .plus{
  display:block;
  padding: 6px;
  line-height: 24px;
  font-size: 24px;
  color: #02a774;
  float:right;
}
</style>