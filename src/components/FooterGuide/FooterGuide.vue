<template>
    <!-- <router-link to="/msite">首页</router-link>
    <router-link to="/search">搜索</router-link>
    <router-link to="/order">订单</router-link>
    <router-link to="/profile">我的</router-link> -->
    <mt-tabbar class="mt-tabbar">
        <mt-tab-item id="首页">
            <router-link to="/msite" :class="{on:isCurrent('/msite')}">
                <div class="footer_icon"><span class="iconfont icon-mifan"></span></div>
                <span>首页</span>
            </router-link>
        </mt-tab-item>
        <mt-tab-item id="搜索">
            <router-link to="/search" :class="{on:isCurrent('/search')}">
                <div class="footer_icon"><span class="iconfont icon-fangdajing"></span></div>
                <span>搜索</span>
            </router-link>
        </mt-tab-item>
        <mt-tab-item id="订单">
            <router-link to="/order" :class="{on:isCurrent('/order')}">
                <div class="footer_icon"><span class="iconfont icon-icon-"></span></div>
                <span>订单</span>
            </router-link>
        </mt-tab-item>
        <mt-tab-item id="我的">
            <router-link to="/profile" :class="{on:isCurrent('/profile')}">
                <div class="footer_icon"><span class="iconfont icon-home"></span></div>
                <span>我的</span>
            </router-link>
        </mt-tab-item>
        <!-- <mt-tab-item id="外卖"><router-link to="/search"><span class="iconfont icon-mifan"></span>搜索</router-link></mt-tab-item>
        <mt-tab-item id="外卖"><router-link to="/order"><span class="iconfont icon-mifan"></span>订单</router-link></mt-tab-item>
        <mt-tab-item id="外卖"><router-link to="/profile"><span class="iconfont icon-mifan"></span>我的</router-link></mt-tab-item> -->
    </mt-tabbar>

</template>

<script>
export default{
    methods:{
        isCurrent(path){
            return this.$route.path === path
        }
    }
}
</script>

<style>
.mt-tabbar{
    height: 50px;
    position: fixed;
}
.mint-tab-item{
    padding-top:15px;
    padding-bottom: 0;
}
.mint-tab-item-label{
    line-height: 1;
}
.mint-tab-item-label a{
    display: block;
    text-decoration: none;
    border-right: 1px solid #ccc
}
.mint-tab-item-label :last-child a{
    border-right: none;
}
.on{
    color:#02a774;
}
</style>