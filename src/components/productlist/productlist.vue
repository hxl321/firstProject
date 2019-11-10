<template>
  <div>
    <ul class="product">
      <router-link :to="'/home/productInfo/'+item.id" class="p_info" v-for="item in pList" :key="item.id">
        <div class="p_pic">
          <a href="#">
            <img :src="item.img_url" alt />
          </a>
        </div>
        <div class="p_name">{{item.title}}</div>
        <div class="p_price">
          <span class="newPrice">{{item.sell_price}}</span>
          <span class="oldPrice">{{item.market_price}}</span>
        </div>
        <div class="p_num">
          <span>热卖中</span>
          <span>剩余数量:{{item.stock_quantity}}</span>
        </div>
      </router-link>
    </ul>
    <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  name: "productlist",
  data() {
    return {
      pageindex: 1,
      pList: []
    };
  },
  created() {
    this.getPeoducts();
  },
  methods: {
    getPeoducts() {
      this.$axios.get(`/api/getgoods?pageindex=${this.pageindex}`).then(res => {
        console.log(res);
        if (res.data.status === 0) {
          this.pList = this.pList.concat(res.data.message);
        }
      });
    },
    getmore() {
      this.pageindex++;
      this.getPeoducts();
    }
  }
};
</script>

<style lang="less" scoped>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
  margin-bottom: 20px;
}
.p_info {
  width: 46%;
  float: left;
  margin-left: 3%;
  margin-top: 15px;
  padding: 10px 10px 0 10px;
  box-shadow: 0px 0px 8px 0px #a09191;
  .p_pic {
    width: 100%;
    min-height: 202px;
    background: #eee;
    img {
      display: block;
      width: 100%;
    }
  }
  .p_name {
    padding: 5px 0;
    font-size: 16px;
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .p_price {
    background: #eee;
    margin: 0 -10px;
    padding: 5px 10px;
    .newPrice {
      color: red;
      font-size: 14px;
    }
    .oldPrice {
      color: #333;
      text-decoration: line-through;
      font-size: 12px;
    }
  }
  .p_num {
    background: #eee;
    margin: 0 -10px;
    padding: 5px 10px;
    color: #333;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }
}
</style>