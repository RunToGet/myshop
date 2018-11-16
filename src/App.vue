<template>
   <div id="app">
      <router-view></router-view>
      <FooterGuide v-show="$route.meta.showFooter" />
   </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide";

export default {
  components: {
    FooterGuide
  },
  mounted() {
    //获取地理信息位置
    this.$store.dispatch('getAddress')
  },
};
</script>

<style>
#app{
  height: 100%;
  /* overflow: hidden; */
}
</style>