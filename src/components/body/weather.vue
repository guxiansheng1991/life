<template>
	<div class="col-md-9 right">
    <div class="jumbotron">
      <div class="container">
        <h1>天气预报</h1>
        
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
        this.$store.state.routerActive='weather';
      }
    }
</script>

<style type="text/css">

</style>