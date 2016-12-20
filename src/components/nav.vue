<template>
	<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">My Life</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right hidden-lg hidden-md">
            <li :class="{active:navRouterActive=='worldNews'}"><router-link to="/worldNews/1"><a href="#">国际新闻</a></router-link></li>
            <li :class="{active:navRouterActive=='weather'}"><router-link to="/weather/1"><a href="#">天气预报</a></router-link></li>
            <li :class="{active:navRouterActive=='book'}"><router-link to="/book"><a href="#">图书大全</a></router-link></li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script type="text/javascript">
	export default{
		name:'nav',
    computed:{
      navRouterActive:function(){
        return this.$store.state.routerActive;
      }
    },
	}
</script>