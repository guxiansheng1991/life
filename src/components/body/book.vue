<template>
	<div class="col-md-9 right">
      <h1 class="page-header">图书大全</h1>
      <div class="row">
        <div class="col-lg-6 col-lg-offset-6 col-sm-12">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="请输入图书信息" v-model="searchText">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" @click="search">搜索</button>
            </span>
          </div>
        </div>
      </div>
      
      <!-- 展示图书信息 -->
      <div class="row preShow" v-if="loadding">
        <div class="col-lg-12">
            <img src="../../assets/image/shu.jpg">
        </div>
      </div>
      
      <!-- 展示搜索得到的信息 -->
      <div class="row" v-if="showContent">
        <div class="media item" v-for="item of conData" >
          <a class="media-left media-middle leftImg" :href="'#/bookDetail/'+item.id">
            <img :src="item.image" alt="item.alt_title">
          </a>
          <div class="media-body">
            <h5>书名:&nbsp;{{item.title}}</h5>
            <h5>作者:&nbsp;<span v-for="i of item.author">{{i}}</span></h5>
            <h5>翻译:&nbsp;<span v-for="i of item.translator">{{i}}</span></h5>
            <h5>出版社:&nbsp;{{item.publisher}}</h5>
            <h5>分类:&nbsp;{{item.series | hundleEmpty}}</h5>
          </div>
        </div>
      </div>
      <!-- 子路由出口 -->
      <router-view></router-view>
    </div>
</template>

<script type="text/javascript">
  
    export default{
      data: function() {
        return {
            showContent:false,
            searchText:'',
            conData:''
        }
      },
      computed:{
        loadding:function(){
          if(this.$data.conData){
            return false;
          }else{
            return true;
          }
        }
      },
      watch: {
          '$route' (to, from) {
              if(!to.params.bookName){
                //当bookName不存在的时候,回复book路由的页面,此时修改的loadding是计算属性,需要改变他的依赖conData,触发loadding重新计算
                this.$data.conData="";
              }
          },
      },
      beforeRouteEnter:function(to,from,next){
        next(function(vm){
          //这里处理的情况是当bookName存在的时候,要请求列表数据
          if(to.params.bookName){
            vm.getBookData(to.params.bookName);
          }
        });
      },
      beforeCreate: function() {
        this.$store.state.routerActive='book';
      },
      methods:{
        search:function(){
          if(this.$data.searchText.trim()){
            //请求列表数据
            this.getBookData(this.$data.searchText.trim());
            //向路由添加bookName参数
            this.changeRoute(this.$data.searchText.trim());
          }else{
            alert("请输入搜索信息");
          }
        },
        getBookData:function(text){
            //向豆瓣api请求数据
            let url="https://api.douban.com/v2/book/search?q="+text+"&count=10";
            this.$http.jsonp(url).then(
              function(response){  //success
                this.$data.conData=response.data.books;
                this.$data.showContent=true;
                this.$data.loadding=false;
              },
              function(response){  //error
                console.log(response);
              }
            );
        },
        //动态的改变路由,改变视图,显示detail,隐藏列表,同时在监控$route中回退是修改changeHideList
        changeRoute:function(bookName){
            //防止加载不出来的时候,路由已经改变,但是页面并没有切换,造成 1/1/news_id 的错误
            if(!this.$router.history.current.params.bookName){
                this.$router.push({ path:"/book/"+bookName });
            }else{
                this.$router.replace({ path:"/book/"+bookName });
            }
        },
        //改变视图,显示detail,隐藏列表
        changeShowContent:function(flag){
            this.$data.showContent=false;
        },
        //显示和隐藏展示信息
        changeLoadding:function(flag){
            this.$data.loadding=flag;
        }
      },
      filters:{
        hundleEmpty:function(value){  //处理不存在,如果存在就返回一个数组
          if(value){
            return value.title;
          }else{
            return "";
          }
        }
      }
    }
</script>

<style type="text/css">
  .preShow{
    height: 60%;
  }
  .preShow img{
    width: 60%;
    height: 60%;
    margin-top: 10%;
    margin-left: 20%;
  }
  .item{
    background-color: #FFFFCC;
  }
  .leftImg{
    width: 1000px;
  }
</style>