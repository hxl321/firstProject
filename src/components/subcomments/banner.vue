<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in banner" :key="item.id" >
        <img :src="item.img" :class="{width:flag}"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  name: "banner",
  props: ["banner","flag"]
};
</script>

<style lang="less" scoped>
// 设置home与商品详情页的banner样式不一致的
.mint-swipe .mint-swipe-items-wrap {
  height: 200px;
  text-align: center;
  img{
    // width: 100%;
    height: 100%;
  }
}
// home需要width 而商品详情不需要
.width{
    width: 100%;
}
</style>