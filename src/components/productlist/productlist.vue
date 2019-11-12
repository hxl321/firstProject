<template>
  <div>
    <ul class="product">
      <!-- <router-link :to="'/home/productInfo/'+item.id" class="p_info" v-for="item in pList" :key="item.id"> -->
      <div  class="p_info" @click="goDesc(item.id)" v-for="item in pList" :key="item.id">
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
      </div>
      <!-- </router-link> -->
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
    // 编程导航，路由除了可以使用route-link来实现跳转，也可以通过js编程导航来实现
    goDesc(id){
      // $route是路由参数对象 ，params获取地址后以/拼接的参数 , query获取？之后的参数
      // $router路由导航对象：相当于js的来实现路由的前进、后退、跳转
      // 方法一
      // this.$router.push('/home/productInfo/'+id);
      // 方法二
      // this.$router.push({path:'/home/productInfo/'+id});
      // 方法三：根据路由名来跳转{path:'/home/productInfo/:id',component:productInfo,name:'goodsInfo'},
      this.$router.push({name:'goodsInfo',params:{id:id}});
      // 方法三中params中id键名与变量名相同可以简写：this.$router.push({name:'goodsInfo',params:{id}})
    },
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
  box-shadow: 0px 0px 8px 0px #bfb3b2;
  .p_pic {
    width: 100%;
    min-height: 202px;
    background: #fff;
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
    background:  #eee;
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