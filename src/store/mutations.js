
import {
    GET_ADDRESS,
    GET_FOOD_LIST_TYPE,
    GET_SHOPS,
    GET_USER_INFO,
    RESET_USER_INFO,
    GET_SHOP_GOODS,
    GET_SHOP_INFO,
    GET_SHOP_RATINGS,
    GET_FOOD_LIST,
    CHANGE_TOTAL,
    REMOVE_FOOD
} from './mutation_types.js'

export default {
    //获取位置信息
    [GET_ADDRESS](state,{data}){
        state.address = data
    },
    //获取用户信息
    [GET_USER_INFO](state,{data}){
        state.userInfo = data
    },
    // 重置用户信息
    [RESET_USER_INFO](state){
        state.userInfo = {}
    },
    // 获取食物列表
    [GET_FOOD_LIST_TYPE](state,{data}){
        state.categorys = data
    },
    // 获取附近商家
    [GET_SHOPS](state,{data}){
        state.shops = data
    },
    //获取商品信息
    [GET_SHOP_GOODS](state,{data}){
        state.shopGoods = data
    },
    //获取商家评论
    [GET_SHOP_RATINGS](state,{data}){
        state.shopRatings = data
    },
    //获取商家信息
    [GET_SHOP_INFO](state,{data}){
        state.shopInfo = data
    },
    //获取点餐信息
    [GET_FOOD_LIST](state,{data}){
        // console.log(data)
        for(let i=0;i<state.foodList.length;i++){
            console.log(i)
            if(state.foodList[i]["name"] == data.name){
                if(data.flag){
                    state.foodList[i]["num"]++
                }else{
                    console.log('在这里')
                    state.foodList[i]["num"]--
                    if(state.foodList[i]["num"]==0){
                        state.foodList.splice(i,1)
                    }
                }
                return
            }
        }
        let item = {name:data.name,num:1,food:data.food}
        state.foodList.push(item)
    },

}