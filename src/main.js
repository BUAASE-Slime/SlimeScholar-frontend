import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

// import diy font
import './styles/font.css'

Vue.config.productionTip = false

// mount axios globally
Vue.prototype.$axios = axios;
// read data from public/global.json and mount it globally
axios.get('./global.json').then((data) => {
  Vue.prototype.GLOBAL = data.data;
  axios.defaults.baseURL = data.data.backUrl;
})
// element UI
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
