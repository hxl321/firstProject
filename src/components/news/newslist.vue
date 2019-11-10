<<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(item,i) in newslist" :key="item.id">
                <router-link :to="'/home/newslist/newdetil/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h3>{{item.title}}</h3>
                        <p class="mui-ellipsis">
                            <span>发表时间:{{item.add_time | dataFormat('YYYY-MM-D')}}</span>    
                            <span>点击次数:{{item.click}}</span> 
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<<script>
export default {
    name:'newlist',
    data(){
        return {
            newslist:[]
        }
    },
    created(){
        this.getNewList();
    },
    methods: {
        getNewList(){
            this.$axios.get('/api/getnewslist').then(res=>{
                console.log(res.data.message);
                if(res.status === 200){
                    this.newslist=res.data.message;
                    console.log(this.newslist)
                }
            })
        }
    },
}
</script>

<style lang="less" scoped>
.mui-media-body {
  h3 {
    font-size: 14px;
  }
  p {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    color: #26afff;
  }
}
</style>
