## Vue电商

### 首页

 1.顶部通栏
 2.轮播图
 3.六宫格渲染，新闻资讯, 图文分享, 商品购买, 跳转到对应的列表

 4.底部页签，Tabbar渲染, 点击tabbar跳转对应的页面,通过vue的动画机制实现，页面跳转时右近左出过渡效果，其中底部购物车小图标使用mui的扩展图标，如下样式 mui-icon mui-icon-extra mui-icon-extra-cart

### 新闻资讯

#### 新闻列表

1. 渲染页面

   

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

2.评论，使用封装的组件，并传递id，具体见评论模块，其中页面渲染时，实现加载更多的功能，为加载更多按钮，绑定点击事件，在事件中，请求下一页数据 ，让 pageIndex++，然后重新调用 this.getComments() 方法，重新获取最新一页的数据，为了防止 新数据 覆盖老数据的情况，我们在 点击加载更多的时候，每当获取到新数据，使用数组的拼接 concat



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

   注意1：添加区域滚动之后会

   报错：mui.js:3493 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
       at Function.Class.extend (mui.js:3493)

   解决方法移除严格模式

   方式一：在`.babelrc`中添加:ignore

   方式二：[babel-plugin-transform-remove-strict-mode](https://github.com/genify/babel-plugin-transform-remove-strict-mode)

   ```
   {
     "presets":["env","stage-0"],
     "plugins":["transform-runtime",["component", [
       {
         "libraryName": "mint-ui",
         "style": true
       }
     ]], ["transform-remove-strict-mode"]]
    
     // 方式二使用先下载 npm install babel-plugin-transform-remove-strict-mode
     //在.babelrc的配置plugins中添加transform-remove-strict-mode
    
    
    // 忽略严格模式方式一ignore
     // "ignore": [
     //   "./src/lib/mui/js/mui.js"
     // ]
   
   }
   ```

   注意2：添加之后会发现底部标签页使用的route-link跳转时，在进入其他页面如新闻列表时底部的跳转会失效，解决将底部的mui封装样式.mui-tab-item 复制，改成自己的样式

   

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

   改造，除了route-link可以跳转页面，还可以通过编程导航 ，使用$router导航对象跳转。



#### 商品详情

1.完成商品购买中的商品详情模块, 包含轮播图

将这里的轮播图与home页的轮播图封装车公共的组件，其中，需要注意商品详情页的轮播图样式与home中轮播图样式不同，home页的img需要设置width：100%，而商品详情页不需要，解决方式由父组件向子组件传递一个参数，作为表记，来判断是否使用添加一个width：100%的类。

```
//父组件
<banner :banner="imgList" :flag="false"></banner>

//banner.vue组件,根据flag判断
<img :src="item.img" :class="{width:flag}"/>

//样式如下
// 设置home与商品详情页的banner样式不一致的
.mint-swipe .mint-swipe-items-wrap {
  height: 200px;
  text-align: center;
  img{
    // width: 100%;
    height: 100%;
  }
}
// home需要width 而商品详情不需要
.width{
    width: 100%;
}
```

2.小球飞到购物车

通过vue通过的过渡&动画，结合JavaScript 钩子 

```
 <transition @before-enter="beforeenter" @enter="enter" @after-enter="afterEnter">
    <div class="ball" v-show="flag" @transitionend="transitionEnd"></div>
 </transition>
```

在小球做运动的时候，使用到getBoundingClientRect() 的方法来获取，页面元素的left、top等值，来计算小球移动到，购物车上徽标的距离，除此通过一个isShow来作为一个开关阀，优化小球动画未完成而导致多次触发，小球动画的事件。

```
methods: {
 	// 点击进入购物车
    goCart() {
      if (this.isShow) {
        return false;
      }
      this.flag = !this.flag;
    },
    beforeenter(el) {
      this.isShow = true;
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetHeight;
      // getBoundingClientRect()获取坐标
      // 获取购物车上的数字坐标
      console.log(document.querySelector(".mui-badge").getBoundingClientRect());
      let badge = document.querySelector(".mui-badge").getBoundingClientRect();
      // 获取小球的坐标
      let ball = el.getBoundingClientRect();
      // 求差
      let x = badge.left - ball.left;
      let y = badge.top - ball.top;

      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.transition = "all 1s cubic-bezier(0, -0.32, 0.9, 0.07)";
      done();
    },
    afterEnter() {
      this.flag = !this.flag;
    },
    transitionEnd() {
      this.isShow = false;
    }
 }
```



3.设置商品数量的最大限度，以及添加购物车商品微标数量增加

​      封装数字输入框，注意数字输入框记得初始化

4.点击图文介绍进入对应的图文详情

5.点击商品评论进入对应的商品评论



<<<<<<< HEAD
### 购物车

​	通过vuex仓库存储公共数据，使用本地缓存localStorage来缓存数据

​    1.如果组件想直接从state中获取数据，通过this.$store.state.属性名  访问
    2.如果组件想修改数据，或是操作数据更多业务时，通过使用mutations提供的方法，
        通过this.$store.commit('方法名',传递给方法的唯一参数)来触发
    3.如果只想针对state中的数据进行计算 包装等，推荐使用getters，通过this.$store.getters.方法名 来调用

### 通过真机预览项目

  电脑与手机的连接同一个wifi，在package.json 配置中增加 --host 自己的主机ip



