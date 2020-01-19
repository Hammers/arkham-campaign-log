import Vue from 'vue';
import VueRouter from "vue-router";

import App from './App.vue';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/store'
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
