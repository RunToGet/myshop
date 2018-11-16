<template>
    <header class="header_top">
        <slot name="left"></slot>
        <span class="header_top_title">
            <span class="header_top_title_text ellipsis">{{title}}</span>
        </span>
        <slot name="right"></slot>
    </header>       
</template>
<script>
    export default{
        props:{
            title:{
                type:String
            }
        }
    }
</script>
<style>
    .header_top{
        background-color: #02a774;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: 45px;
    }
    .header_top_title{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        width: 50%;
        color: #fff;
        text-align: center;
    }
    .header_top_title_text{
        display: block;
        font-size: 20px;
    }
    .ellipsis{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

</style>


