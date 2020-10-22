import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
const jquery = require('jquery');

// (window as any).$ = (window as any).jQuery = jquery;
// const formantic = require('src/assets/fomantic-ui/dist/semantic.min.js');
console.log('MAIN');
import "@/assets/jquery/jquery.js";
import "@/assets/fomantic-ui/dist/semantic.min.js";
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
