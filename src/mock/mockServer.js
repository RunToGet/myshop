/**
 * 使用mockjs提供mock数据接口
 */
import data from './data.json'
import Mock from 'mockjs'

//返回goods的接口
Mock.mock('/goods',{code:0,data:data.goods})
//返回info的接口
Mock.mock('/info',{code:0,data:data.info})
//返回rating的接口
Mock.mock('/ratings',{code:0,data:data.ratings})