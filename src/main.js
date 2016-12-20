import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import vueResource from 'vue-resource';
Vue.use(vueResource);
Vue.http.options.xhr = {withCredentials: true};

import routes from './assets/js/routes.js';
let router=new VueRouter({
	routes:routes
});

import Vuex from 'vuex';
Vue.use(Vuex);
let store=new Vuex.Store({
	state:{
		routerActive:'worldNews',
		tableNum:1,
		newsId:0,
		bookId:0
	}
});

new Vue({
  el: '#app',
  router:router,
  store:store,
  render: h => h(App)
})
