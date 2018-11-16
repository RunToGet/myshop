<template>
  <div class="shop">
        <ShopHeader/>
        <div class="tab_menu">
            <router-link to="/shop/goods" replace><span :class="$route.path.includes('goods')?'on':''">&nbsp;点餐&nbsp;</span></router-link>
            <router-link to="/shop/ratings" replace><span :class="$route.path.includes('ratings')?'on':''">&nbsp;评价&nbsp;</span></router-link>
            <router-link to="/shop/info" replace><span :class="$route.path.includes('info')?'on':''">&nbsp;商家&nbsp;</span></router-link>
        </div>
        <keep-alive>
        <router-view></router-view>
        </keep-alive>   
  </div>
</template>

<script>
    import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
    import {mapState} from 'vuex'
  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {
        ShopHeader,
    },

    computed: {
        ...mapState(['shopInfo'])
    },

    beforeMount() {},

    mounted() {
        this.$store.dispatch('getShopInfo')
    },

    methods: {},

    watch: {}

  }

</script>
<style>
    .shop{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .tab_menu{
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e8e8e8;
        box-sizing: border-box;
    }
    .tab_menu>a{
        display: block;
        float: left;
        width: 33.3333333%;
        text-align: center;
    }
    .tab_menu>a>span{
        font-size: 15px;
        display: inline-block;
        height: 40px;
        box-sizing: border-box;
    }
    .tab_menu span.on{
        border-bottom:2px solid #02a774;
    }

    
</style>