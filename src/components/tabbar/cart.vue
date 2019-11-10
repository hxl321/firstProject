<template>
  <div>
    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <div class="mui-switch mui-switch-blue mui-switch-mini mui-active">
                <div class="mui-switch-handle"></div>
            </div>
            
					</div>
					</div>
				</div>
			</div>
  </div>
</template>

<script>
export default {
  name:'cart',
  data(){
    return{
      id:[87,88,89],
      cartList:[]
    }
  },
  created(){
    this.getCarts();
  },
  methods: {
    getCarts(){
      this.$axios.get(`/api/goods/getshopcarlist/87,88,89`).then(res=>{
        console.log(res);
      })
    }
  },
}
</script>

<style lang="">
  
</style>