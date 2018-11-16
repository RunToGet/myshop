
import {
    reqAddress,  //1、根据经纬度获取位置详情
    reqFoodTypeList, //2、获取食品分类列表
    reqShopList,  //3、根据经纬度获取商铺列表
    reqShopListByGeohashAndKeyword,  //4、根据经纬度和关键字搜索商铺列表
    reqCaptcha,  //5、获取一次性验证码
    loginByName,  //6、用户名密码登陆
    reqMessageCode,  //7、发送短信验证码
    loginByPhone,  //8、手机号验证码登陆
    reqUserInfo,  //9、根据会话获取用户信息
    reqLogout,  //10、用户登出
    reqShopGoods,  //11、获取商家食品列表
    reqShopInfo,  //12、获取商家信息
    reqShopRatings  //13、获取商家评论列表
} from '../api'

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

export default{
    //获取位置信息
    async getAddress({commit,state}){
        const geohash = state.latitude+','+state.longitude
        const result = await reqAddress(geohash)
        // console.log(result)
        if(result.data.code==0){
            const data = result.data.data
            commit(GET_ADDRESS,{data})
        }
       
    },

    //获取食物分类列表
    async getCategorys({commit}){
        const result = await reqFoodTypeList()
        // console.log(result)
        if(result.data.code==0){
            const data = result.data.data
            commit(GET_FOOD_LIST_TYPE,{data})
        }
    },

    //获取附近商家
    async getShops({commit,state}){
        console.log(state.latitude)
        console.log(state.longitude)
        const geohash = {latitude:state.latitude,longitude:state.longitude}
        const result = await reqShopList(geohash)
        // console.log(result)
        if(result.data.code==0){
            const data = result.data.data
            commit(GET_SHOPS,{data})
        }
    },

    // 登录获取用户数据保存到vuex中
    getUserInfo({commit},data){
        commit(GET_USER_INFO,{data})
    },
    //退出登录
    async logout({commit}){
        const result = await reqLogout()
        if(result.data.code==0){
            commit(RESET_USER_INFO)
        }
    },


    // 获取商家食品信息
    async getGoods({commit},callback){
        const result = await reqShopGoods()
        if(result.data.code==0){
            const data = result.data.data
            commit(GET_SHOP_GOODS,{data})
            callback && callback()
        }
    },

    //获取评论信息
    async getRatings({commit},callback){
        const result = await reqShopRatings()
        if(result.data.code==0){
            const data = result.data.data
            commit(GET_SHOP_RATINGS,{data})
            callback && callback()
        }  
    },

    //获取商家信息
    async getShopInfo({commit}){
        const result = await reqShopInfo()
        if(result.data.code==0){
            const data = result.data.data
            commit(GET_SHOP_INFO,{data})
        }
    },

    //购买食物列表
    orderFood({commit},data){
        // console.log(data)
        commit(GET_FOOD_LIST,{data})
    },


//获取手机验证码
    // getCode({commit}){
        
    // }
}

