<template>
  <div class="cmt_container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入" maxlength="100" v-model="content"></textarea>
    <mt-button type="primary" size="large" @click="setComment">发表评论</mt-button>
    <div class="list">
      <div class="list_item" v-for="(item,i) in cmtlist" :key="item.id">
        <div class="item_title">
          <span>第{{i+1}}楼：{{item.user_name}}</span>
          <span>发表时间：{{item.add_time | dataFormat('YYYY-MM-D')}}</span>
        </div>
        <div class="item_content">{{item.content}}</div>
      </div>
    </div>
	<mt-button type='danger' size="large" plain @click="getmore">加载更多</mt-button>

  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "comment",
  data() {
    return {
      content: "",
      pageindex: 1,
      cmtlist: []
    };
  },
  created() {
    this.getComments();
  },
  props: ["id"],
  methods: {
    getComments() {
      this.$axios
        .get(`api/getcomments/${this.id}?pageindex=${this.pageindex}`)
        .then(res => {
          //   console.log(res);
          if (res.status === 200) {
            this.cmtlist =this.cmtlist.concat(res.data.message);
          }
        });
    },
    setComment() {
      if (!this.content.trim()) {
        return Toast("内容不能为空");
      }
      this.$axios
        .post(`/api/postcomment/${this.id}`, {
          content: this.content.trim()
        })
        .then(res => {
          //   console.log(res);
          this.content = "";
          if (res.status === 200) {
            // console.log(res.data.message);
			      Toast(res.data.message);
			      this.getComments();
          }
        });
	},
	getmore(){
		this.pageindex++;
		this.getComments();
	}
  }
};
</script>

<style scoped>
.cmt_container h3{
	font-size:24px;
	padding-left: 20px;
	color:#666;
}

.item_title {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.item_content {
  margin-left: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
}
</style>