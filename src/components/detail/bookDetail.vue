<template>
	<div class="right">
		<div class="bookDetailContent">
			<div v-if="loadding"><h1>loadding...</h1></div>
			<div class="jumbotron" v-if="showContent">
			  	<div class="media">
		          <div class="media-left media-middle leftImg">
		            <img :src="conData.image" alt="conData.alt_title">
		          </div>
		          <div class="media-body">
		            <h5>书名:&nbsp;{{conData.title}}</h5>
		            <h5>作者:&nbsp;<span v-for="i of conData.author">{{i}}</span></h5>
		            <h5>翻译:&nbsp;<span v-for="i of conData.translator">{{i}}</span></h5>
		            <h5>出版社:&nbsp;{{conData.publisher}}</h5>
		            <h5>分类:&nbsp;{{conData.series | hundleEmpty}}</h5>
		          </div>
		        </div>
		        <br>
		        <span class="label label-default">关键字</span>
		        	<span class="label label-info" v-for="tag in conData.tags">{{tag.title}}</span>
		        <br>
		        <br>
		        <span class="label label-default">相关信息</span>
		        <p>	
			        <span class="label label-info">{{conData.binding}}</span>
			        <span class="label label-info">isbn10 {{conData.isbn10}}</span>
			        <span class="label label-info">isbn13 {{conData.isbn13}}</span>
			        <span class="label label-info">价格 {{conData.price}}</span>
		        </p>
		        <span class="label label-default">作者简介</span>
		        <br>
		        <p>{{conData.author_intro}}</p>
		        <br>
				<span class="label label-default">概述</span>
				<br>
		        <p>{{conData.summary}}</p>
		        <br>
		        <span class="label label-default">目录</span>
				<br>
		        <p>{{conData.catalog}}</p>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	
	export default{
		data:function(){
			return {
				conData:'',
				loadding:true,
				showContent:false
			}
		},
		beforeRouteEnter:function(to,from,next){
			next(function(vm){
				//如果存在路由中存在id,就请求数据
				if(to.params.id){
					vm.getBookData(to.params.id);
				}else{  //如果不存在id,显示loadding,隐藏showContent
					vm.$data.showContent = false;
					vm.$data.loadding = true;
				}
			});
		},
		methods:{
			getBookData: function(text) {
				//向豆瓣api请求数据
				let url = "https://api.douban.com/v2/book/" + text;
				this.$http.jsonp(url).then(
					function(response) { //success
						this.$data.conData = response.data;
						this.$data.showContent = true;
						this.$data.loadding = false;
					},
					function(response) { //error
						console.log(response);
					}
				);
			},
		},
		filters: {
			hundleEmpty: function(value) { //处理不存在,如果存在就返回一个数组
				if (value) {
					return value.title;
				} else {
					return "";
				}
			}
		}
	}
</script>

<style type="text/css">
	.leftImg{
	    width: 1500px;
	}
	.leftImg img{
		width: 100%;
		height: 100%;
	}
	.bookDetailContent{
		overflow: auto;
	}
</style>