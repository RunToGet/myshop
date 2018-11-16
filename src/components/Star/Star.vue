<template>
    <div class="star" :class="`star-${size}`">
        <span class="star_item" :class="item" v-for="(item,index) in starArr" :key="index"></span>
    </div>
</template>

<script>
    export default {
        props:{
            size:Number,
            score:Number
        },
        computed:{
            // 将星级评分的类放到一个数组中，遍历出来实现评分
            starArr(){
                const {score} = this
                const starArr = [];
                let onNum = Math.floor(score)
                for(let i=0;i<onNum;i++){
                    starArr.push('on')
                }
                if(score*10-onNum*10>=5){    //这里乘以10 的原因是javascript的小数计算不准确，可能会有0.00000001这样的误差
                    starArr.push('half')
                }
                while(starArr.length<5){
                    starArr.push('off')
                }
                return starArr
            }
        },
        mounted(){

        }
    }
</script>

<style>
.star{
    display: inline-block;
    margin-right: 5px;
}
.star .star_item{
    display: inline-block;
}
.star-24 .star_item{
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-size: 10px 10px;
}
.star-24 .star_item:last-child{
    margin-right: 0;
}
.star-24 .on{
    background-image: url("./images/star24_on@2x.png");
}
.star-24 .half{
    background-image: url("./images/star24_half@2x.png");
}
.star-24 .off{
    background-image: url("./images/star24_off@2x.png");
}
.star-36 .star_item{
    width: 15px;
    height: 15px;
    margin-right: 6px;
    background-size: 15px 15px;
}
.star-36 .on{
    background-image: url("./images/star36_on@2x.png")
}
.star-36 .half{
    background-image: url("./images/star36_half@2x.png")
}
.star-36 .off{
    background-image: url("./images/star36_off@2x.png")
}
.star-48 .star_item{
    width: 20px;
    height: 20px;
    background-size: 20px 20px;
}
.star-48 .on{
    background-image: url("./images/star48_on@2x.png")
}
.star-48 .half{
    background-image: url("./images/star48_half@2x.png")
}
.star-48 .off{
    background-image: url("./images/star48_off@2x.png")
}
</style>