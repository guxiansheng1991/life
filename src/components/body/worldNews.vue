<template>
    <div class="col-md-9 right">
        <h3 class="page-header">
            <ul class="nav nav-pills" role="tablist">
              <li role="presentation" :class="{active:newTableNum==1}"><a href="#/worldNews/1">头条</a></li>
              <li role="presentation" :class="{active:newTableNum==2}"><a href="#/worldNews/2">娱乐</a></li>
              <li role="presentation" :class="{active:newTableNum==3}"><a href="#/worldNews/3">军事</a></li>
              <li role="presentation" :class="{active:newTableNum==4}"><a href="#/worldNews/4">汽车</a></li>
              <li role="presentation" :class="{active:newTableNum==5}"><a href="#/worldNews/5">财经</a></li>
              <li role="presentation" :class="{active:newTableNum==6}"><a href="#/worldNews/6">笑话</a></li>
              <li role="presentation" :class="{active:newTableNum==7}"><a href="#/worldNews/7">体育</a></li>
              <li role="presentation" :class="{active:newTableNum==8}"><a href="#/worldNews/8">科技</a></li>
            </ul>
        </h3>

        <div v-if="showLoading"><h1>loading...</h1></div>
        <div v-if="hideList" class="row">
          <div class="col-sm-6 col-md-4" v-for="item of newsList.data">
            <div @click="changeRoute(item)" class="thumbnail box">
              <img :src="item.top_image" class="img-responsive">
              <div class="caption">
                <h3>{{item.title}}</h3>
                <p>{{item.digest}}...<br></p>
                <p  style="text-align: right;">------{{item.source}}</p  style="text-align: right;">
              </div>
            </div>
          </div>
        </div>

        <router-view></router-view>
    </div>
</template>

<script type="text/javascript">

    export default{
      data:function(){
        return {
            newTableNum:this.$store.state.tableNum,
            newsList:[],
            showLoading:true,
            hideList:true, //不显示detail
        }
      },
      watch: {
          '$route' (to, from) {
              // 对路由变化作出响应,(当路由有动态的参数的时候,beforeRouteEnter钩子是不会被调用的,这时候需要使用监控,也是官方推荐的方法.)
            //这里处理的情况是当路由回退的时候,changeHideList为true,即显示list
            if(!to.params.news_id){
                 this.changeHideList(true);
            }
            if (to.params.tableNum) {
                this.newTableNum = to.params.tableNum;
            } else {
                this.newTableNum = 1;
            }
            this.$store.state.tableNum=this.newTableNum;
          },

          //当newTableNum变化的时候,进行数据的请求
          'newTableNum':function(newVal,oldVal){  
                this.getNews(newVal,10);
          },
      },
      beforeCreate: function() {
        this.$store.state.routerActive='worldNews';
      },
      beforeRouteEnter :function(to,from,next){
        next(function(vm){
            //从其他路由进入这个路由的时候,路由参数没有,这样数据无法获取,视图的active样式也没有起作用,这里设置
            if (!to.params.tableNum) {  
                vm.$data.newTableNum = 1;
                vm.$store.state.tableNum=1;
            }
        });
      },
      created:function(){
        this.getNews(1,10);
      },
      methods:{
        getNews:function(tableNum,pageSize){
            let url="http://api.dagoogle.cn/news/get-news?tableNum="+tableNum+"&pagesize="+pageSize+"&justList=1";
            this.$http.jsonp(url).then(
                function(response){  //success
                    this.$data.newsList=response.data;
                    if(this.$data.newsList.data.length>0){ 
                        this.changeLoadingState(false)
                    }else {
                        this.changeLoadingState(true);
                    }
                },
                function(response){  //error
                    console.log(response);
                }
            );
        },
        //改变loading显示的状态
        changeLoadingState:function(flag){
            this.$data.showLoading=flag;
        },
        changeHideList:function(flag){
            this.$data.hideList=flag;
        },
        //动态的改变路由,改变视图,显示detail,隐藏列表,同时在监控$route中回退是修改changeHideList
        changeRoute:function(item){
            //防止加载不出来的时候,路由已经改变,但是页面并没有切换,造成 1/1/news_id 的错误
            if(!this.$router.history.current.params.news_id){
                let currentTableNum=this.$router.history.current.params.tableNum;
                this.$router.push({ path:currentTableNum.toString()+"/"+item.news_id.toString() });
                //改变视图,显示detail,隐藏列表
                this.changeHideList(false);
                //修改$store中的newsId,让newsId状态修改为现在的news_id的状态
                this.$store.state.newsId=this.$router.history.current.params.news_id;
            }
        }
      }
    }
</script>

<style type="text/css">
    .box{
        cursor: pointer;
        height: 450px;
    }
    .box:hover{
        box-shadow: 5px 5px 5px #ccc;
    }
    img{
        max-width: 100%;
        max-height: 200px;
    }
</style>