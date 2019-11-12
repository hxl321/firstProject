// 封装axios
// 导入 axios
import axios from 'axios'
// 创建一个http/axios对象
let baseURL = 'http://www.liulongbin.top:3005/'
// 开发环境与生产环境的公共地址一般是不同的，需要进行判断，我们这里是开发环境
console.log(process.env.NODE_ENV);
const $axios = axios.create({
    baseURL: baseURL
})

// 封装get
export const get = function (url, params) {
    params = params || {};
    return new Promise(function (resolve, reject) {
        $axios.get(url, { params: params })
            .then(res => {
                if (res.data.status === 0) {
                    //操作数据
                    resolve(res.data);
                } else {
                    alert('no');
                }
            }).catch(err => {
                // 请求失败
                reject(err);
                alert('网络异常');
            })
    })
}
// 封装post
export const post=function(url ,params={}){
    return new Promise((resolve,reject)=>{
        $axios.post(url,params).then(res=>{
            if(res.data.status===0){
                resolve(res);
            }
        }).catch(err=>{
            reject(err);
            alert('网络异常');
        })
    })
}