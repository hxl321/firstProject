<template>
  <div>
    <!-- 商品詳情 -->
    <!-- 轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,i) in imgList" :key="i">
              <img :src="item.src" alt />
            </mt-swipe-item>
          </mt-swipe>
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
            <div
              class="mui-numbox"
              data-numbox-step="1"
              data-numbox-min="1"
              :data-numbox-max="pInfo.stock_quantity"
            >
              <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
              <input class="mui-numbox-input" type="number" />
              <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
            </div>
          </div>
          <div>
            <button type="button" class="mui-btn mui-btn-primary">立即购买</button>
            <button type="button" class="mui-btn mui-btn-danger">加入购物车</button>
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
    <div class='my_btn'>
          <router-link :to="'/home/productdesc/'+pInfo.id" tag='button' class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">图文介绍</router-link>
          <router-link :to="'/home/productcomment/'+pInfo.id" tag='button' class="mui-btn mui-btn-danger mui-btn-block mui-btn-outlined">商品评论</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "productinfo",
  data() {
    return {
      id: this.$route.params.id,
      pInfo: {},
      imgList: []
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
          this.imgList = res.data.message;
        }
      });
    }
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
.my_btn{
    padding:10px;
}

</style>
