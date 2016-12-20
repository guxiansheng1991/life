<template>
  <div id="app">
    <!-- 导航  开始 -->
    <my-nav></my-nav>
    <!-- 导航  结束 -->

    <!-- 主题body  开始 -->
    <my-body></my-body>
    <!-- 主题body  结束 -->
  </div>
</template>

<script>

import base from './assets/css/base.css';

/*var bootstrapCss=require('../node_modules/bootstrap/dist/css/bootstrap.css');
var jQuery=require("expose-loader?jQuery!jquery");
console.log(window.jQuery);
var bootstrap=require('expose-loader?bootstrap!bootstrap');
var bootstrapCss=require('../node_modules/bootstrap/dist/css/bootstrap.css');
var jQuery=require('../node_modules/jquery/dist/jquery.js');
window.jQuery=jQuery;
var bootstrap=require('../node_modules/bootstrap/dist/js/bootstrap.js');*/

/*require("bootstrap-webpack");
require("bootstrap-webpack!./bootstrap.config.js");*/

import Nav from './components/nav.vue';
import Body from './components/body.vue';

export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  components:{
    'my-nav':Nav,
    'my-body':Body
  }
}
</script>

<style>

</style>
