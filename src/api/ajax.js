/**
 * 
 * @param {*} url 请求路径
 * @param {*} data 请求数据
 * @param {*} type 请求类型
 */
import axios from 'axios'
export default function ajax(url,data,type){
    url = url || ""
    data = data || {}
    type = type || 'GET'
    let promise
    if(type=='GET'){ 
        let dataStr = ''
        if(Object.keys(data).length!==0){
            for(let key in data){
                dataStr += key + '=' + data[key] + '&'
            }
            dataStr = dataStr.substring(0,dataStr.lastIndexOf('&'))
            url = url + '?' + dataStr
        }
        promise = axios.get(url)
    }else{
        promise = axios.post(url,data)
    }
    return promise
    // if(promise.data.code==0){
    //     return promise.data.data
    // }else{
    //     return promise
    // }
    
}