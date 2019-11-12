<template>
  <div class="app_container">
    <!-- 设置头部公共部分 -->
    <mt-header fixed title="Vue">
      <mt-button icon="back" slot="left" @click="goto" v-show="this.$route.path!=='/home'">返回</mt-button>
    </mt-header>

    <!-- 将路由在主模板上渲染 -->
    <transition name="my" mode="out-in">
      <router-view></router-view>
    </transition>

    <!-- 跳转路由，tabbar -->
    <nav class="mui-bar my-bar-tab">
      <router-link class="my-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="my-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="my-tab-item" to="/cart">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">{{this.$store.getters.getAllNum}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="my-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>

export default {
  name: "app",
  methods: {
    goto(){
      // history.back(-1);
      this.$router.go(-1);
    }
  },
};
</script>

<style lang="less">
.mui-bar .my-bar-tab {
  z-index: 10;
}

.my-enter {
  opacity: 0;
  transform: translateX(100%);
}

.my-enter-active,
.my-leave-active {
  transition: all 0.8s;
  position: absolute;
}

.my-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.app_container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow: hidden;
}

.my-bar-tab
{
    bottom: 0;

    display: table;

    width: 100%;
    height: 50px;
    padding: 0;

    table-layout: fixed;

    border-top: 0;
    border-bottom: 0;

    -webkit-touch-callout: none;
}
.my-bar-tab .my-tab-item
{
    display: table-cell;
    overflow: hidden;

    width: 1%;
    height: 50px;

    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;

    color: #929292;
}
.my-bar-tab .my-tab-item.mui-active
{
    color: #007aff;
}
.my-bar-tab .my-tab-item .mui-icon
{
    top: 3px;

    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.my-bar-tab .my-tab-item .mui-icon ~ .mui-tab-label
{
    font-size: 11px;

    display: block;
    overflow: hidden;

    text-overflow: ellipsis;
}
.my-bar-tab .my-tab-item .mui-icon:active
{
    background: none;
}
.my-tab-item.mui-plus-hidden, .my-tab-item.mui-wechat-hidden
{
    display: table-cell !important;
}

.mui-plus .my-tab-item.mui-plus-visible, .mui-wechat .my-tab-item.mui-wechat-visible
{
    display: table-cell !important;
}
</style>