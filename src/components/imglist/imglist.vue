<template>
  <mt-tab-container-item>
    <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
      <div class="mui-scroll">
        <!-- 图片列表 -->
        <mt-navbar v-model="active">
          <mt-tab-item v-for="item in categorys" :key="item.id" :id="item.id">{{item.title}}</mt-tab-item>
        </mt-navbar>
      </div>
    </div>

    <!-- tab-container -->
    <mt-tab-container v-model="active">
      <mt-tab-container-item :id="item.id" v-for="item in categorys" :key="item.id">
        <div v-for="data in imgList" :key="data.id">
          <router-link :to="'/home/imglist/imgInfo/'+data.id" class="imgList" tag='div'>
          <!-- <div class="imgList" > -->
            <!-- v-lazy="item" -->
            <img v-lazy="data.img_url" :alt="data.title"/>
            <p>{{data.zhaiyao}}</p>
          <!-- </div> -->
          </router-link>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </mt-tab-container-item>
</template>

<script>
import { TabContainer, TabContainerItem, Cell } from "mint-ui";
// import mui from "../../lib/mui/js/mui.js";

export default {
  name: "imglist",
  data() {
    return {
      active: 0,
      categorys: [],
      imgList: []
    };
  },
  created() {
    this.getCategory();
    this.getImgList();
  },
  mounted() {
    this.mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getCategory() {
      this.$axios.get("/api/getimgcategory").then(res => {
          console.log(res);
        if (res.data.status === 0) {
          this.categorys = res.data.message;
          this.categorys.unshift({id:0,title:'全部'});
          // this.active = res.data.message[0].id;
          console.log(this.active);
        }
      });
    },
    getImgList() {
      // console.log(this.active);
      console.log(`/api/getimages/${this.active}`);
      this.$axios.get(`/api/getimages/${this.active}`).then(res => {
        this.imgList = res.data.message;
        // console.log(this.imgList);
      });
    }
  },
  watch: {
    // 要监听的数据：监听处理函数
    active: function(newVal, oldVal) {
      // console.log(newVal, oldVal);
      if (newVal !== oldVal) {
        this.getImgList();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.mui-scroll {
  .mint-tab-item {
    color: #666;
    padding: 10px 20px;
  }
}
.mint-cell-title {
  display: none;
}
.imgList {
  width: 100%;
  padding: 20px 5%;
  position: relative;
  img {
    width: 100%;
  }
  // 设置懒加载样式
  img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
  p {
    background: rgba(0, 0, 0, 0.3);
    width: 90%;
    color: #fff;
    position: absolute;
    bottom: 15px;
    left: 5%;
    text-indent: 2em;
    padding: 10px;
  }
}
</style>