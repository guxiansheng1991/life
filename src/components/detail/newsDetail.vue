<template>
	<div>
		<div v-if="showLoading"><h1>loading...</h1></div>
		<div class="panel panel-default" v-else>
		  <div class="panel-body">
		    <h1>{{newsData.title}}</h1>
		    <p style="text-align: right;">------{{newsData.edit_time | changeToLocalTime}}</p>
		    <img v-if="newsData.text_image0" :src="newsData.text_image0" class="img-responsive" :alt="newsData.title">
		    <div v-html="newsData.content"></div>
		    <p style="text-align: right;">------{{newsData.source}}</p>
		  </div>
		</div>
	</div>
</template>

<script type="text/javascript">
	
	export default{
		data:function(){
			return {
				currentNewId:this.$store.state.newsId,
				currentTableNum:this.$store.state.tableNum,
				newsData:'',
				showLoading:true,
			}
		},
		created :function(){
	        this.getNews(this.$data.currentTableNum,this.$data.currentNewId);
      	},
		methods:{
			getNews:function(currentTableNum,currentNewId){
	            let url="http://api.dagoogle.cn/news/single-news?tableNum="+this.$data.currentTableNum+"&news_id="+this.$data.currentNewId;
	            this.$http.jsonp(url).then(
	                function(response){  //success
	                	this.$data.showLoading=false;
	                	this.$data.newsData=response.data.data;
	                	console.log(this.$data.newsData);
	                },
	                function(response){  //error
	                    console.log(response);
	                }
	            );
	        },
		},
		filters:{
			changeToLocalTime:function(value){
				let newDate=new Date();
				newDate.setTime(value*1000);
				return newDate.toLocaleString();
			}
		}
	}
</script>