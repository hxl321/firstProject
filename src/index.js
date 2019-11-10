
import Vue from 'vue'
import App from './app.vue'
import router from './router.js'

// 导入mui
import  './lib/mui/css/mui.min.css'
import  './lib/mui/css/icons-extra.css'
// 导入自己的样式
import './css/app.less'

// 导入mui
import MuitUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MuitUI)

// 导入 axios
import axios from 'axios'
// 设置公共的路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'
Vue.prototype.$axios = axios;

import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)

// 全局配置

import moment from 'moment';
Vue.filter('dataFormat',function(data,pramas){
    return moment(data).format(pramas);
})

new Vue({
  el:'#app',
  data:{},
  render:createEle => createEle(App),
  // 将路由挂载到实例上
  router
})