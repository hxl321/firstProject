<template>
  <div>
    <div class="mui-content-padded">
       <div class="mui-media-body">
            <h3>{{news.title}}</h3>
            <p class="mui-ellipsis">
                <span>发表时间:{{news.add_time | dataFormat('YYYY-MM-D h:mm:ss')}}</span>
                <span>点击次数:{{news.click}}</span>
            </p>
        </div> 
        <p v-html="news.content"></p>
    </div>
    <comment :id="id"></comment>
  </div>
</template>
<script>
import comment from '../subcomments/comment.vue';
export default {
  name: "newdetil",
  data() {
    return {
        news:{},
        id:this.$route.params.id
    };
  },
  created() {
    this.getNew();
  },
  methods: {
    getNew() {
      let id = this.$route.params.id;
      this.$axios.get("/api/getnew/" + id).then(res => {
        console.log(res);
        if(res.status===200){
            this.news=res.data.message[0];
        }
      });
    }
  },
   components:{
      comment
  }
};
</script>

<style lang="less" scoped>
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
    border-bottom:1px solid #eee; 
  }
}
.mui-content-padded{
    p{
      text-indent: 2em;
    }
}
</style>