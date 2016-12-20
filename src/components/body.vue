<template>
	<div class="container-fluid con">
      <div class="row my-row">
      	<!-- 左侧导航 开始 -->
        <my-left></my-left>
        <!-- 左侧导航 结束 -->

        <!-- 右侧主题 开始 -->
        <router-view></router-view>
        <!-- 右侧主题 结束 -->
      </div>
    </div>
</template>

<script type="text/javascript">
	import Left from './body/bodyLeft.vue';
	import WorldNews from './body/worldNews.vue';

	export default{
		components:{
			'my-left':Left,
			'world-news':WorldNews
		}
	}
</script>