<template>
  <div>
    <div class="mui-media-body">
      <h3>{{imgInfo.title}}</h3>
      <p class="mui-ellipsis">
        <span>发表时间:{{imgInfo.add_time | dataFormat('YYYY-MM-D h:mm:ss')}}</span>
        <span>点击次数:{{imgInfo.click}}</span>
      </p>
    </div>
    <div class="imglist">
      <!-- <li v-for="(item,i) in imgList" :key="i"><a href="">
                <img :src="item.src" alt="">
      </a></li>-->
      <vue-preview :slides="imgList"></vue-preview>
    </div>
    <div class="mui-content-padded">
      <p v-html="imgInfo.content"></p>
    </div>
    <comment :id="id"></comment>
  </div>
</template>
<script>
import comment from "../subcomments/comment.vue";
export default {
  name: "imgInfo",
  data() {
    return {
      id: this.$route.params.id,
      imgList: [],
      imgInfo: {}
    };
  },
  created() {
    this.getImgInfo();
  },
  methods: {
    getImgInfo() {
      this.$axios.get(`/api/getthumimages/${this.id}`).then(res => {
        console.log(res);
        if (res.data.status === 0) {
          this.imgList = res.data.message;
          res.data.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc = item.src;
          });
        }
      });
      this.$axios.get(`/api/getimageInfo/${this.id}`).then(res => {
        console.log(res);
        if (res.data.status === 0) {
          this.imgInfo = res.data.message[0];
        }
      });
    }
  },
  components: {
    comment
  }
};
</script>

<style lang="less" scoped>
.imglist {
  width: 100%;
  padding-left: 20px;
}
.mui-media-body {
  h3 {
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    color: red;
  }
  .mui-ellipsis {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    color: #26afff;
    border-bottom: 1px solid #eee;
    padding: 10px;
  }
}
.mui-content-padded {
  p {
    text-indent: 2em;
  }
}
</style>