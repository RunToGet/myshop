// 计算属性
export default{
    // 添加进购物车的食物列表的总价格
    totalPrice(state){
        if(state.foodList.length>0){
            let totalPrice = 0;
           for(let i=0;i<state.foodList.length;i++){
                totalPrice += state.foodList[i].food.price *state.foodList[i].num
           }
           return totalPrice
        }else{
            return 0
        }
    },
    // 添加进购物车的食物列表的总数量
    totalNum(state){
        if(state.foodList.length>0){
            let totalNum = 0;
            for(let i=0;i<state.foodList.length;i++){
                totalNum += state.foodList[i].num
            }
            return totalNum
        }else{
            return 0
        }
    }
}