## Vue电商

### 首页

 1.顶部通栏
 2.轮播图
 3.六宫格渲染，新闻资讯, 图文分享, 商品购买, 跳转到对应的列表

 4.底部页签，Tabbar渲染, 点击tabbar跳转对应的页面,通过vue的动画机制实现，页面跳转时右近左出过渡效果，其中底部购物车小图标使用mui的扩展图标，如下样式 mui-icon mui-icon-extra mui-icon-extra-cart，

注意：底部标签页使用的route-link跳转时，在进入其他页面如新闻列表时底部的跳转会失效，解决将底部的mui封装样式.mui-tab-item 复制，改成自己的样式



### 新闻资讯

#### 新闻列表

1. 渲染页面

   页面渲染时，实现加载更多的功能，为加载更多按钮，绑定点击事件，在事件中，请求下一页数据
   点击加载更多 ，让 pageIndex++，然后重新调用 this.getComments() 方法 重新获取最新一页的数据
   为了防止 新数据 覆盖老数据的情况，我们在 点击加载更多的时候，每当获取到新数据，使用数组的拼接 concat

2. 格式化时间---使用moment.js

   moment.js：<http://momentjs.cn/> ，下载npm install moment

```
import moment from 'moment';
Vue.filter('dataFormat',function(data,pramas){
    return moment(data).format(pramas);
})
```



#### 新闻详情

1.根据id渲染页面新闻详情页

2.评论，使用封装的组件，并传递id，具体见评论模块



### 图片分享

#### 图片列表

1. 点击首页的图文分享, 跳转到图文列表

2. 图文列表渲染

   渲染图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的 组件 lazy-load
   根据lazy-load的使用文档<http://mint-ui.github.io/docs/#/zh-cn2/lazyload> 

   ```
   import { Lazyload } from 'mint-ui';
   
   Vue.use(Lazyload);
   
   <div id="container">
     <ul>
       <li v-for="item in list">
         <img v-lazy.container="item">
       </li>
     </ul>
   </div>
   ```

3. 图文导航栏横向区域滚动

   该模块主要使用mui的横向区域滚动，页面结构使用，mint-ui的Navbar结构，该结构，通过id值，点击导航上的选项，显示对应的选项数据

   ```
    <!--1.页面结构 -->
   <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
         <div class="mui-scroll">
           <!--区域滚动内容： 图片列表导航 -->
           <mt-navbar v-model="active">
             <mt-tab-item v-for="item in categorys" :key="item.id" :id="item.id">{{item.title}}</mt-tab-item>
           </mt-navbar>
         </div>
       </div>
    
     <!--2.在  mounted()中初始化-->
       mounted() {
       mui(".mui-scroll-wrapper").scroll({
         deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
       });
     }
   ```

   

4. 点击导航栏显示对应的图文列表

    有于页面结构使用的是mint-ui的Navbar结构，因此需要使用watch来监听active的改变，改变就重新请求数据进行渲染。

   ```
    watch: {
       // 要监听的数据：监听处理函数
       active: function(newVal, oldVal) {
         // console.log(newVal, oldVal);
         if (newVal !== oldVal) {
           this.getImgList();
         }
       }
     }
   ```

   

#### 图片详情

1.点击图文列表的某一列通过id渲染对应的图文详情

2.点击图片放大预览功能

这里使用 插件 vue-preview 这个缩略图插件：<https://www.npmjs.com/package/vue-preview> 
获取到所有的图片列表，然后通过v-for 指令渲染数据
注意： img标签上的class不能去掉
注意： 每个 图片数据对象中，必须有 w 和 h ，src，msrc 属性

3.评论功能，使用公共封装的评论组件



### 评论

评论---点击发表. 非空校验, 点击加载更多按钮显示下一页，时间格式化

#### 获取评论

单独封装一个 comment.vue 评论子组件，在需要使用 comment 组件的 页面中 ，先手动导入 comment 组件，注册为自己的子组件`import comment from './comment.vue'`
在父组件中，使用 comments 属性，将刚才导入 comment 组件 ，注册为自己的 子组件
将注册子组件时候的，注册名称，以标签形式，在页面中 引用即可，因为每个评论是针对不同的新闻资讯所有使用组件时需要通过父组件通过v-bind来传递id



#### 发表评论

利用vue的v-model，把文本框做双向数据绑定，为发表按钮绑定一个事件
校验评论内容是否为空，如果为空，则Toast提示用户 评论内容不能为空
通过 vue-resouer 发送一个请求，把评论内容提交给服务器
当发表评论成功后，重新刷新列表，以查看最新的评论，缺点是每次调用getCommnet只会得到后几页的数据，无法看到最新的数据

所以进行相应的优化，当评论成功后，在客服端 ，手动拼接出一个 最新的评论对象，然后调用 数组 的 unshfit 方法，把最新的评论追加到data中comments的开头，就能完美实现刷新评论列表的需求



### 商品展示

#### 商品列表

1. 点击首页的商品购买跳转到商品列表页面
2. 渲染商品
3. 完成商品购买中的商品列表功能模块(包含加载更多的功能效果)



#### 商品详情

1.完成商品购买中的商品详情模块, 包含轮播图

2.小球飞到购物车,设置商品数量的最大限度.以及添加购物车商品微标数量增加

3.点击图文介绍进入对应的图文详情

4.点击商品评论进入对应的商品评论



### 购物车















10制作顶部滑动条的坑们：
需要借助于 MUI 中的 tab-top-webview-main.html
需要把 slider 区域的 mui-fullscreen 类去掉
滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下：
导入 mui.js
调用官方提供的 方式 去初始化：
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
我们在初始化 滑动条 的时候，导入的 mui.js ，但是，控制台报错： Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode
经过我们合理的推测，觉得，可能是 mui.js 中用到了 'caller', 'callee', and 'arguments' 东西，但是， webpack 打包好的 bundle.js 中，默认是启用严格模式的，所以，这两者冲突了；
解决方案： 1. 把 mui.js 中的 非严格 模式的代码改掉；但是不现实； 2. 把 webpack 打包时候的严格模式禁用掉；
最终，我们选择了 plan B 移除严格模式： 使用这个插件 babel-plugin-transform-remove-strict-mode
刚进入 图片分享页面的时候， 滑动条无法正常工作， 经过我们认真的分析，发现， 如果要初始化 滑动条，必须要等 DOM 元素加载完毕，所以，我们把 初始化 滑动条 的代码，搬到了 mounted 生命周期函数中；
当 滑动条 调试OK后，发现， tabbar 无法正常工作了，这时候，我们需要把 每个 tabbar 按钮的 样式中 mui-tab-item 重新改一下名字；
获取所有分类，并渲染 分类列表；











