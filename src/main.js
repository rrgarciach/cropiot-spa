import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import BootstrapVue from 'bootstrap-vue';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.component('icon', Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
