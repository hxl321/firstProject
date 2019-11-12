<template>
    <div class="mui-numbox" data-numbox-step="1" data-numbox-min="1" :data-numbox-max="maxnum">
      <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
      <input class="mui-numbox-input" type="number" @change="getNum" ref="numBox" :value="num"/>
      <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
</template>

<script>
export default {
  name: "number",
  props: ["maxnum","num","pid"],
  mounted(){
    //   console.log(this.maxnum);//undefined
     this.mui('.mui-numbox').numbox();
  },
  watch: {
    //  解决maxmun的异步获取时，未获取，使用watch监听一旦获取就立刻设置值
      "maxnum":function(newVal, oldVal){
          this.mui('.mui-numbox').numbox().setOption('max',newVal);
      }
  },
  methods: {
      getNum(){
        //   在元素值设置ref属性值，在js中可以通过this.$refs来获取对应的dom对象
          // console.log(this.$refs.numBox);
          console.log('改变数据');
          this.$emit('updateCount',{id:this.pid,count:this.$refs.numBox.value});
      }
  },
};
</script>
<style lang="less" scoped>
</style>