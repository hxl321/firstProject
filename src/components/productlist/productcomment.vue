<template>
  <div>
    <!-- 商品评论 -->
    <comment :id='id'></comment>
  </div>
</template>

<script>
import comment from "../subcomments/comment.vue";
export default {
  name: "productcomment",
  data() {
    return {
      id: this.$route.params.id
    };
  },
  components: {
    comment
  }
};
</script>

<style lang="less" scoped>
</style>