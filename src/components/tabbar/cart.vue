<template>
  <div> 
    <div class="mui-card" v-for="item in cartList" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner p_Info">
          <div class="btn">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="changeSelected(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
          </div>
          <div class="p_pic">
            <img :src="item.thumb_path" alt />
          </div>
          <div class="p_xq">
            <p class="p_name">{{item.title}}</p>
            <p class="red">￥{{item.sell_price}}</p>
            <!-- 加減組件 -->
            <cart-num :maxnum="item.maxnum" :num="item.cou" :pid="item.id" @updateCount="updateCount"></cart-num>
            <a href="#" @click="del(item.id)">删除</a>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>总计(不含运费)</p>
          <p>
            已勾选商品
            <span class="red">{{getAllprice.selectedNum}}</span> 件,
            总价<span class="red">￥{{getAllprice.allPrice}}</span> 
          </p>
          <button type="button" class="goPay mui-btn mui-btn-danger">去结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartNum from "../subcomments/cartnum.vue";
export default {
  name: "cart",
  data() {
    return {
      ids: [],
      cartList: []
    };
  },
  created() {
    this.getCarts();
    // console.log(this.$store.state.cart);
  },
  methods: {
    getCarts() {
      this.getIds();
      console.log(this.ids);
      if(!this.ids.length) {
        this.cartList=[];
        return false;
      }
      this.$axios.get(`/api/goods/getshopcarlist/${this.ids.join(',')}`).then(res => {
        console.log(res);
        if (res.data.status == 0) {
          this.cartList = res.data.message;
          this.cartList.forEach(item => {
            this.$store.state.cart.forEach(data => {
              if (item.id == data.id) {
                item.cou = data.count;
                item.selected = data.selected;
                item.maxnum=data.maxnum;
              }
            });
          });
        }
      });
    },
    getIds(){
       this.ids=[];
       this.$store.state.cart.forEach(item=>{
          this.ids.push(item.id);
      })
    },
    // 
    del(id){
      this.$store.commit('delCart',id);
      this.getCarts();
    },
    changeSelected(id,changeSel){
        this.$store.commit('updateSelected',{id:id,selected:changeSel});
    },
    updateCount(obj){
      this.$store.commit('updateCountById',obj);
    }
  },
  components: {
    cartNum
  },
  computed: {
    // 计算总价与选中件数
    getAllprice() {
      let selectedNum=0;
      let allPrice = 0;
      this.$store.state.cart.forEach(item=>{
        if(item.selected){
          selectedNum++;
          allPrice+=(item.price*item.count);
        }
      })
      return {
        selectedNum:selectedNum,
        allPrice:allPrice
        };
    }
  }
};
</script>

<style lang="less" scoped>
.p_Info {
  height: 200px;
  overflow: hidden;
  .btn {
    width: 50px;
    float: left;
    margin: 60px 0;
  }
  .p_pic {
    width: 40%;
    height: 100%;
    float: left;
    overflow: hidden;
    text-align: center;
    img {
      height: 100%;
    }
  }
  .p_xq {
    padding-left: 10px;
    width: 40%;
    float: left;
  }
}
.goPay {
  position: absolute;
  right: 20px;
  top: 30px;
}
.red{
 color:red;
}
 

</style>