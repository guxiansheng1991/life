<template>
	<div class="col-md-9 right">
      <h1 class="page-header">历史上的今天</h1>
      <div class="row placeholders">
        <div class="col-xs-6 col-sm-3 placeholder">
          <img data-src="holder.js/200x200/auto/sky" class="img-responsive" alt="Generic placeholder thumbnail">
          <h4>Label</h4>
          <span class="text-muted">Something else</span>
        </div>
      </div>
    </div>
</template>

<script type="text/javascript">
  
    export default{
      data: function() {
        return {
          
        }
      },
      beforeCreate: function() {
        this.$store.state.routerActive='historyToday';
      }
    }
</script>