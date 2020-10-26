import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { FormValidateDirective } from './directives';
import "@/assets/jquery/jquery.js";
import "@/assets/fomantic-ui/dist/semantic.min.js";
Vue.config.productionTip = false;

Vue.directive('formValidate', FormValidateDirective);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
