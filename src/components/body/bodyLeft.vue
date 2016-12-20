<template>
	<div class="hidden-xs hidden-sm col-md-2 left">
      <ul class="nav nav-tabs-justified">
        <li :class="{active:leftRouterActive=='worldNews'}"><router-link to="/worldNews/1"><a href="#">国际新闻</a></router-link></li>
        <li :class="{active:leftRouterActive=='weather'}"><router-link to="/weather/1"><a href="#">天气预报</a></router-link></li>
        <li :class="{active:leftRouterActive=='book'}"><router-link to="/book"><a href="#">图书大全</a></router-link></li>
      </ul>
    </div>
</template>

<script type="text/javascript">
	
	export default{
		data:function(){
			return {
				
			}
		},
		computed:{
			leftRouterActive:function(){
				return this.$store.state.routerActive;
			}
		},
		beforeCreate:function(){
			// this.leftRouterActive='worldNews';
		}
	}
</script>