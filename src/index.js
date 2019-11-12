
import Vue from 'vue'
import App from './app.vue'
import router from './router.js'

// 导入mui 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
// 导入自己的样式
import './css/app.less'

// 导入mint-ui
import MuitUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MuitUI);

// 挂载mui js
import mui from "./lib/mui/js/mui.js";
Vue.prototype.mui = mui;

// 导入 axios
import axios from 'axios'
// 设置公共的路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'
Vue.prototype.$axios = axios;
// Indicator加载提示框
import { Indicator } from 'mint-ui';

// 1.设置axios请求拦截器
axios.interceptors.request.use(
  config=>{//请求成功的回调函数
    // 显示加载提示框
    Indicator.open();
    // console.log(config);
    // config 请求体的配置项
    return config;

},err=>{//请求失败的回调函数
    return Promise.error(err);
})

// 2.响应拦截器
axios.interceptors.response.use(
  response=>{//响应成功
    Indicator.close();
    // console.log(response);
    // response 请求成功的数据
    return response;
},err=>{//处理失败的函数
    return Promise.reject(err);
})

import {get,post} from './utils/api.js'
Vue.prototype.$http={
  get,
  post
}

// 缩略图
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)

// 全局配置时间格式化
import moment from 'moment';
Vue.filter('dataFormat', function (data, pramas) {
  return moment(data).format(pramas);
})

// 导入vuex
import Vuex from 'vuex'
Vue.use(Vuex);

// 页面初始化时取数据
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

const store = new Vuex.Store({
  state: {
    cart
  },
  mutations: {
    // 1.点击进入购物车将信息存储到cart中
    addToCart(state, goods) {
      console.log(goods);
      // 1.若之前有对应的商品，只需要更新数据
      let flag = true;
      state.cart.some(item => {
        if (item.id == goods.id) {
          item.count += parseInt(goods.count);
          flag = false;
          return true;
        }
      });
      // 2.没有对应的商品，直接使用push添加商品
      if (flag) {
        state.cart.push(goods);
      }
      // 存数据
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    // 通过id删除，cart，更新缓存
    delCart(state,id){
      state.cart=state.cart.filter(item=>{
        return item.id!=id;
      });
      console.log('刪除成功');
      localStorage.setItem('cart', JSON.stringify(state.cart));
      cart = JSON.parse(localStorage.getItem('cart') || '[]');
    },
    // 通过id更新购物车中对应商品的数量，更新缓存
    updateCountById(state,obj){
      // console.log("更改数量"+obj.count);
      state.cart.forEach(item=>{
        if(item.id==obj.id){
          item.count=parseInt(obj.count);
          // console.log(item);
        }
      });
      // console.dir("更改数量"+state.cart);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    // 更新仓库的状态
    updateSelected(state,obj){
       state.cart.forEach(item=>{
        if(item.id==obj.id){
          item.selected=obj.selected;
        }
      });
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  },
  getters: {
    getAllNum(state){
      let allNum=0;
      state.cart.forEach(item=>{
        allNum+=item.count;
      });
      return allNum;
    },
    getCountById(state){
      let num={};
       state.cart.forEach(item=>{
          num[item.id]=item.count;
      })
      return num;
    },
    getGoodsSelected(state){
        let sel={};
        state.cart.forEach(item=>{
          sel[item.id]=item.selected;
      })
      return sel;
    }    
  }
})

new Vue({
  el: '#app',
  data: {},
  render: createEle => createEle(App),
  // 将路由挂载到实例上
  router,
  store
})