<template>
  <div>
    <!-- 商品詳情 -->
    <!-- 轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,i) in imgList" :key="i">
              <img :src="item.src" alt />
            </mt-swipe-item>
          </mt-swipe>-->
          <banner :banner="imgList" :flag="false"></banner>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header" style="color:#26afff">{{pInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="p_price">
            市场价:
            <span class="oldprice">￥{{pInfo.market_price}}</span>
            销售价:
            <span class="newprice">￥{{pInfo.sell_price}}</span>
          </div>
          <div style="margin:10px 0;">
            购买数量：
            <number :maxnum="pInfo.stock_quantity" :num="1" @getCount="getCount"></number>
            <!-- <div
              class="mui-numbox"
              data-numbox-step="1"
              data-numbox-min="1"
              :data-numbox-max="pInfo.stock_quantity"
            >
              <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
              <input class="mui-numbox-input" type="number" />
              <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
            </div>-->
          </div>
          <div>
            <button type="button" class="mui-btn mui-btn-primary">立即购买</button>
            <button type="button" class="mui-btn mui-btn-danger" @click="goCart">加入购物车</button>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{pInfo.goods_no}}</p>
          <p>库存情况:{{pInfo.stock_quantity}}</p>
          <p>上架时间:{{pInfo.add_time | dataFormat('YYYY-MM-D h:mm:ss')}}</p>
        </div>
      </div>
    </div>
    <div class="my_btn">
      <router-link
        :to="'/home/productdesc/'+pInfo.id"
        tag="button"
        class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined"
      >图文介绍</router-link>
      <router-link
        :to="'/home/productcomment/'+pInfo.id"
        tag="button"
        class="mui-btn mui-btn-danger mui-btn-block mui-btn-outlined"
      >商品评论</router-link>
    </div>

    <transition @before-enter="beforeenter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="flag" @transitionend="transitionEnd"></div>
    </transition>

  </div>
</template>

<script>
import banner from "../subcomments/banner.vue";
import number from "../subcomments/number.vue";
export default {
  name: "productinfo",
  data() {
    return {
      id: this.$route.params.id,
      pInfo: {},
      imgList: [],
      flag: false,
      isShow: false,
      count:'1'
    };
  },
  created() {
    this.getinfo();
  },
  methods: {
    getinfo() {
      this.$axios.get(`/api/goods/getinfo/${this.id}`).then(res => {
        console.log(res);
        if (res.data.status === 0) {
          this.pInfo = res.data.message[0];
        }
      });
      this.$axios.get(`/api/getthumimages/${this.id}`).then(res => {
        console.log(res);
        if (res.data.status === 0) {
          // 解决问题1：当前imgList的轮播图属性不一致
          res.data.message.forEach(item => {
            item.img = item.src;
          });
          this.imgList = res.data.message;
        }
      });
    },
    // 获取子组件中的数量
    getCount(count) {
        this.count=count;
    },
    // 点击进入购物车
    goCart() {
      if (this.isShow) {
        return false;
      }
      this.flag = !this.flag;

      let goodsList = {
        id: this.id,
        count: parseInt(this.count),
        price:this.pInfo.sell_price,
        selected:false,
        maxnum:this.pInfo.stock_quantity
        // :maxnum="pInfo.stock_quantity"
      };
      this.$store.commit("addToCart", goodsList);
    },
    beforeenter(el) {
      // if (this.isShow) {
      //   return false;
      // }
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
  },
  components: {
    banner,
    number
  }
};
</script>

<style lang="less" scoped>
.p_price {
  // background: #eee;
  margin: 0 -10px;
  padding: 5px 10px;
  span {
    padding: 0 10px;
  }
  .newprice {
    color: red;
    font-size: 16px;
  }
  .oldprice {
    color: #333;
    text-decoration: line-through;
    font-size: 12px;
  }
}
.my_btn {
  padding: 10px;
}
.ball {
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  z-index: 99999;
  top: 460px;
  left: 160px;
}
</style>
